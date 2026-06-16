# Sistema de Agencia de Marketing

Template limpio para arrancar un proyecto nuevo desde cero.

## Setup en 5 pasos

```bash
# 1. Clonar
git clone https://github.com/uriel123-coder/agencia-marketing-template nombre-cliente
cd nombre-cliente

# 2. Configurar API keys
cp .env.example .env
# Editar .env con tus keys

# 3. Llenar contexto del cliente
# Editar context/empresa.md con datos del cliente

# 4. Instalar skills
npx skills add mvanhorn/last30days-skill
npx skills add dkyazzentwatwa/chatgpt-skills@mcp-builder
npx skills add aradotso/trending-skills@agent-browser-automation
npx skills add nexu-io/open-design@web-design-guidelines

# 5. Conectar Composio (publicación automática)
# Ver sistema/COMPOSIO-SETUP.md
```

## Estructura

```
context/
├── empresa.md          ← LLENAR PRIMERO (datos del cliente)
├── recursos.md         ← Arsenal de herramientas (no tocar)
├── orquestador.md      ← Cómo se conectan las tools
├── hooks-library.md    ← Biblioteca de hooks virales
├── viral-frameworks.md ← Frameworks de viralidad
└── feedback.md         ← Aprendizajes (se llena solo)

brain1/entregables/     ← Posts, reels, carruseles, videos (vacío)
brain2/entregables/     ← Propuestas, reportes, leads (vacío)
assets/effects/         ← Overlays, transitions, intros reutilizables
sistema/               ← Scripts TTS, check conexiones, Composio setup
```

## Flujo de producción

1. Claude lee `context/empresa.md` → entiende al cliente
2. Lee `context/recursos.md` → sabe qué tools usar
3. Lee `context/hooks-library.md` + `viral-frameworks.md` → hooks virales
4. Crea el entregable y lo guarda en `brain1/entregables/[tipo]/`

## Skills (instalar con npx skills add)

| Skill | Para qué |
|-------|----------|
| `mvanhorn/last30days-skill` | Tendencias reales últimos 30 días (Reddit, TikTok, X, YouTube) |
| `dkyazzentwatwa/chatgpt-skills@mcp-builder` | Construir y conectar servidores MCP |
| `aradotso/trending-skills@agent-browser-automation` | Claude navega páginas y prueba por ti |
| `nexu-io/open-design@web-design-guidelines` | Audita diseños contra 100+ estándares |

## Composio — Conectar Instagram, WhatsApp y más

Composio conecta Claude con 250+ herramientas via MCP.

### 1. Obtener API Key
Ve a **https://app.composio.dev** → Settings → API Keys → copiar key

### 2. Agregar a Claude Code
Edita (o crea) `~/.claude/.mcp.json`:
```json
{
  "mcpServers": {
    "composio": {
      "type": "sse",
      "url": "https://mcp.composio.dev/composio/mcp?apiKey=TU_KEY_AQUI"
    }
  }
}
```
Reinicia Claude Code — ya aparecen las tools de Composio.

### 3. Conectar cada herramienta
En **https://app.composio.dev → Integrations** → busca Instagram / WhatsApp / Notion → Connect → OAuth

Top integraciones para agencia: Instagram · WhatsApp Business · LinkedIn · Google Sheets · HubSpot · Mailchimp · Slack · Airtable

> Instrucciones completas: `sistema/COMPOSIO-SETUP.md`
