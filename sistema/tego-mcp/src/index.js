#!/usr/bin/env node
/**
 * TEGO MCP Server — Acceso directo al contenido Cover Styl' de la plataforma TEGO
 *
 * Uso: El token se obtiene visitando el link de cp-auth y copiando el token de la URL.
 * Los tokens expiran — hay que renovarlos desde TEGO.
 */

import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import {
  CallToolRequestSchema,
  ListToolsRequestSchema,
} from "@modelcontextprotocol/sdk/types.js";
import https from "https";
import http from "http";
import fs from "fs";
import path from "path";

const TEGO_BASE = "https://app.tego.eu";
const SCREEN_ID = "1770918158191x389104696989057000";
const CDN_BASE = "https://9fa065300794941566c22766e3246c87.cdn.bubble.io";

// Token se puede pasar por env o como argumento en cada llamada
let SESSION_TOKEN = process.env.TEGO_TOKEN || "";

// ─── HTTP helper ────────────────────────────────────────────────────
function fetchJSON(url, token = "") {
  return new Promise((resolve, reject) => {
    const headers = { "User-Agent": "Mozilla/5.0 (TEGO-MCP/1.0)" };
    if (token) headers["Authorization"] = `Bearer ${token}`;
    const mod = url.startsWith("https") ? https : http;
    mod.get(url, { headers }, (res) => {
      let data = "";
      res.on("data", (c) => (data += c));
      res.on("end", () => {
        try { resolve(JSON.parse(data)); }
        catch { resolve({ raw: data }); }
      });
    }).on("error", reject);
  });
}

function downloadFile(url, destPath) {
  return new Promise((resolve, reject) => {
    const mod = url.startsWith("https") ? https : http;
    const file = fs.createWriteStream(destPath);
    mod.get(url, (res) => {
      if (res.statusCode === 301 || res.statusCode === 302) {
        file.close();
        fs.unlinkSync(destPath);
        return downloadFile(res.headers.location, destPath).then(resolve).catch(reject);
      }
      res.pipe(file);
      file.on("finish", () => file.close(() => resolve(destPath)));
    }).on("error", (e) => { fs.unlinkSync(destPath); reject(e); });
  });
}

// ─── Parsear el init data público ────────────────────────────────────
async function getScreenData() {
  const url = `${TEGO_BASE}/api/1.1/init/data?location=${encodeURIComponent(
    `${TEGO_BASE}/social-screen-app/${SCREEN_ID}?tab=1`
  )}`;
  return fetchJSON(url);
}

// ─── Extraer IDs de contenido del init data ──────────────────────────
function extractContentIds(initData) {
  const data = initData?.data || {};
  const ids = [];
  for (const [key, val] of Object.entries(data)) {
    if (Array.isArray(val)) {
      for (const item of val) {
        if (typeof item === "string" && item.includes("__LOOKUP__")) {
          const id = item.split("__LOOKUP__")[1];
          if (id) ids.push({ field: key, id });
        }
      }
    }
  }
  return ids;
}

// ─── Obtener detalle de contenido con token ──────────────────────────
async function getContentDetail(contentId, token) {
  const url = `${TEGO_BASE}/api/1.1/obj/Content/${contentId}`;
  return fetchJSON(url, token);
}

// ─── Buscar contenido por tipo usando la data pública ─────────────────
async function listContentFromPublicData() {
  const data = await getScreenData();
  const ids = extractContentIds(data);

  // Agrupar por field para dar contexto
  const grouped = {};
  for (const { field, id } of ids) {
    const category = field.includes("video") ? "video"
      : field.includes("image") ? "image"
      : field.includes("download") ? "download"
      : "content";
    if (!grouped[category]) grouped[category] = [];
    grouped[category].push(id);
  }

  return {
    total: ids.length,
    user_info: {
      company: data?.data?.company_text,
      email: data?.data?.email_text,
      premium: data?.data?.premium_boolean,
      total_videos: data?.data?.total_video_number,
      total_downloads: data?.data?.total_download_number,
    },
    content_ids: ids,
    grouped,
  };
}

// ─── Construir URL de descarga directa desde CDN de Tego ─────────────
function buildCdnUrl(fileRef) {
  // Los archivos en Tego CDN siguen el patrón: f{ID}/{nombre}
  if (fileRef.startsWith("http")) return fileRef;
  return `${CDN_BASE}/${fileRef}`;
}

// ─── Fetch contenido con token freshed ───────────────────────────────
async function fetchContentWithToken(token, contentId) {
  // Intenta varios endpoints de Bubble/Tego
  const endpoints = [
    `${TEGO_BASE}/api/1.1/obj/Content/${contentId}`,
    `${TEGO_BASE}/api/1.1/obj/custom_content/${contentId}`,
    `${TEGO_BASE}/api/1.1/obj/Video/${contentId}`,
    `${TEGO_BASE}/api/1.1/obj/Media/${contentId}`,
  ];

  for (const url of endpoints) {
    try {
      const result = await fetchJSON(url, token);
      if (!result.error_class && !result.statusCode) return { url, result };
    } catch {}
  }
  return null;
}

// ─── MCP Server ──────────────────────────────────────────────────────
const server = new Server(
  { name: "tego-coverstyl", version: "1.0.0" },
  { capabilities: { tools: {} } }
);

server.setRequestHandler(ListToolsRequestSchema, async () => ({
  tools: [
    {
      name: "tego_list_content",
      description: "Lista todo el contenido disponible en TEGO para Cover Styl' (videos, imágenes, downloads). No requiere token.",
      inputSchema: { type: "object", properties: {} },
    },
    {
      name: "tego_set_token",
      description: "Guarda el token de sesión de TEGO para poder descargar contenido. Obtener el token desde el link cp-auth.",
      inputSchema: {
        type: "object",
        properties: {
          token: { type: "string", description: "Token de TEGO (de la URL cp-auth)" },
        },
        required: ["token"],
      },
    },
    {
      name: "tego_get_content",
      description: "Obtiene los detalles de un item de contenido específico de TEGO usando su ID.",
      inputSchema: {
        type: "object",
        properties: {
          content_id: { type: "string" },
          token: { type: "string", description: "Token (opcional si ya se guardó con tego_set_token)" },
        },
        required: ["content_id"],
      },
    },
    {
      name: "tego_download_content",
      description: "Descarga un asset de TEGO (video, imagen) a la carpeta de entregables.",
      inputSchema: {
        type: "object",
        properties: {
          url: { type: "string", description: "URL directa del asset (CDN de TEGO)" },
          filename: { type: "string", description: "Nombre del archivo a guardar" },
          dest_folder: {
            type: "string",
            description: "Carpeta destino relativa al proyecto (default: brain1/entregables/videos/clips/tego)",
          },
        },
        required: ["url", "filename"],
      },
    },
    {
      name: "tego_browse_categories",
      description: "Navega las categorías de contenido disponibles en la plataforma TEGO de Cover Styl'.",
      inputSchema: {
        type: "object",
        properties: {
          token: { type: "string", description: "Token de sesión de TEGO" },
        },
      },
    },
    {
      name: "tego_get_auth_url",
      description: "Devuelve instrucciones para obtener un token fresco de TEGO.",
      inputSchema: { type: "object", properties: {} },
    },
  ],
}));

server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    // ── tego_list_content ──────────────────────────────────────────
    if (name === "tego_list_content") {
      const result = await listContentFromPublicData();
      return {
        content: [
          {
            type: "text",
            text: JSON.stringify(result, null, 2),
          },
        ],
      };
    }

    // ── tego_set_token ─────────────────────────────────────────────
    if (name === "tego_set_token") {
      SESSION_TOKEN = args.token;
      return {
        content: [{ type: "text", text: `Token guardado. Expira en ~1 hora. Empresa: Cover Styl' / DIRECTED` }],
      };
    }

    // ── tego_get_auth_url ──────────────────────────────────────────
    if (name === "tego_get_auth_url") {
      return {
        content: [
          {
            type: "text",
            text: `Para obtener un token fresco de TEGO:

1. Ve a: https://app.tego.eu/cp-auth?customer_id=1027411
   (O pide a Mateo que regenere el link desde TEGO)

2. Cuando cargue la página, abre DevTools → Network → busca "init/data"
3. Copia el valor del header "Authorization: Bearer XXXX"
4. O extrae el token directamente de la URL del link cp-auth

Luego usa: tego_set_token con ese token.

NOTA: Los tokens expiran en ~1 hora. El contenido público (IDs de videos)
está siempre disponible con tego_list_content sin necesidad de token.`,
          },
        ],
      };
    }

    // ── tego_get_content ───────────────────────────────────────────
    if (name === "tego_get_content") {
      const token = args.token || SESSION_TOKEN;
      if (!token) {
        return {
          content: [{ type: "text", text: "Error: necesita token. Usa tego_set_token o pasa el token como argumento." }],
        };
      }
      const result = await fetchContentWithToken(token, args.content_id);
      if (!result) {
        return {
          content: [{ type: "text", text: `No se pudo acceder al contenido ${args.content_id}. Token puede estar expirado.` }],
        };
      }
      return {
        content: [{ type: "text", text: JSON.stringify(result, null, 2) }],
      };
    }

    // ── tego_download_content ──────────────────────────────────────
    if (name === "tego_download_content") {
      const baseDir = "/Users/urielnak/agencia de marketing";
      const destFolder = path.join(
        baseDir,
        args.dest_folder || "brain1/entregables/videos/clips/tego"
      );
      fs.mkdirSync(destFolder, { recursive: true });
      const destPath = path.join(destFolder, args.filename);

      await downloadFile(args.url, destPath);
      return {
        content: [{ type: "text", text: `Descargado: ${destPath}` }],
      };
    }

    // ── tego_browse_categories ─────────────────────────────────────
    if (name === "tego_browse_categories") {
      const token = args.token || SESSION_TOKEN;
      const screenData = await getScreenData();
      const data = screenData?.data || {};

      // Extraer info de categorías del init data
      const categories = {};
      for (const [key, val] of Object.entries(data)) {
        if (key.includes("categor") || key.includes("content") || key.includes("download")) {
          categories[key] = Array.isArray(val) ? `${val.length} items` : val;
        }
      }

      // Si hay token, intentar obtener categorías via API
      let apiCategories = null;
      if (token) {
        try {
          const catResult = await fetchJSON(`${TEGO_BASE}/api/1.1/obj/Categorie`, token);
          if (!catResult.error_class) apiCategories = catResult;
        } catch {}
      }

      return {
        content: [
          {
            type: "text",
            text: JSON.stringify({ public_data: categories, api_categories: apiCategories }, null, 2),
          },
        ],
      };
    }

    return { content: [{ type: "text", text: `Tool desconocida: ${name}` }] };
  } catch (error) {
    return { content: [{ type: "text", text: `Error: ${error.message}` }] };
  }
});

const transport = new StdioServerTransport();
await server.connect(transport);
