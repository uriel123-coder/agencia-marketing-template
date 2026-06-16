# Composio MCP — Guia de Configuracion

Composio conecta Claude Code con mas de 250 herramientas (Instagram, WhatsApp, Slack, Notion, HubSpot, etc.) a traves de un servidor MCP.

---

## Paso 1 — Obtener tu API Key de Composio

1. Ve a **https://app.composio.dev**
2. Crea una cuenta gratuita (puedes entrar con Google)
3. En el dashboard, ve a **Settings > API Keys**
4. Copia tu API Key (empieza con algo como `sk-composio-...`)

---

## Paso 2 — Reemplazar el placeholder en .mcp.json

El archivo ya esta creado en `~/.claude/.mcp.json`. Solo necesitas reemplazar el placeholder:

Abre el archivo:
```
~/.claude/.mcp.json
```

Cambia:
```
COMPOSIO_API_KEY_HERE
```

Por tu key real. El resultado debe verse asi:
```json
{
  "mcpServers": {
    "composio": {
      "type": "sse",
      "url": "https://mcp.composio.dev/composio/mcp?apiKey=sk-composio-tu-key-aqui"
    }
  }
}
```

---

## Paso 3 — Conectar las integraciones en Composio

Cada herramienta requiere autenticacion individual en el dashboard de Composio:

1. En **https://app.composio.dev**, ve a **Integrations**
2. Busca la herramienta que quieres conectar (ej. Instagram)
3. Haz clic en **Connect** y sigue el flujo OAuth
4. Una vez conectada, ya estara disponible en Claude

---

## Top 10 integraciones para agencia de marketing

| # | Herramienta | Uso en la agencia |
|---|-------------|-------------------|
| 1 | **Instagram** | Publicar posts, reels, stories directamente desde Claude |
| 2 | **WhatsApp Business** | Enviar mensajes a clientes, responder leads automaticamente |
| 3 | **Slack** | Enviar reportes, notificaciones de campanas al equipo |
| 4 | **Notion** | Crear bases de datos de clientes, calendarios de contenido |
| 5 | **Google Sheets** | Registrar metricas, listas de leads, reportes de campanas |
| 6 | **HubSpot** | CRM: crear contactos, deals, trackear pipeline de ventas |
| 7 | **Mailchimp** | Crear y enviar campanas de email marketing |
| 8 | **LinkedIn** | Publicar contenido B2B, conectar con prospectos |
| 9 | **Facebook Pages** | Publicar en paginas de clientes, gestionar anuncios |
| 10 | **Airtable** | Gestionar proyectos de clientes, tracking de entregables |

---

## Como usar Composio desde Claude

Una vez configurado, Claude puede usar las herramientas directamente en la conversacion. Ejemplos:

### Publicar en Instagram
```
"Publica este post en Instagram: [caption] con [imagen]"
```

### Agregar lead al CRM
```
"Agrega este lead a HubSpot: nombre, email, empresa, nota de calificacion"
```

### Enviar reporte por Slack
```
"Envia al canal #reportes en Slack el resumen de campana de este mes"
```

### Crear hoja de seguimiento
```
"Crea una hoja en Google Sheets con las metricas de los ultimos 30 dias"
```

### Enviar campana de email
```
"Crea y envia una campana en Mailchimp a la lista [nombre] con este asunto y contenido"
```

---

## Nota sobre herramientas ya disponibles

Las siguientes ya estan disponibles via plugins de claude.ai y NO necesitan Composio:
- Gmail
- Google Calendar
- Google Drive
- Notion (version basica)
- Canva
- Vercel

Composio es complementario y agrega principalmente: Instagram, WhatsApp, LinkedIn, HubSpot, Mailchimp, Facebook, Airtable, Slack y cientos mas.

---

## Soporte

- Documentacion: https://docs.composio.dev
- Estado del servicio: https://status.composio.dev
- Comunidad: https://discord.gg/composio
