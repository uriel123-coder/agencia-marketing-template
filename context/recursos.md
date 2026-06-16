# Recursos del Sistema — Arsenal Completo

---

## HERRAMIENTAS DE VIDEO

### Higgsfield AI — `/higgsfield-generate`
- **Seedance 2.0** → Videos cinematográficos desde texto o imagen
- **Marketing Studio** → Ads con avatares, productos, hooks visuales
- **Virality Predictor** → Analiza cualquier video y predice qué tan viral es
- **Nano Banana Pro** → Consistencia de personaje, 4K
- **Soul V2 / Cinema / Cast** → Personas IA con identidad consistente
- **NECESITA:** `higgsfield auth login` (cuenta en higgsfield.ai)

### HyperFrames — Motion Graphics
- Escribe HTML/CSS/JS → renderiza video con headless browser → FFmpeg
- **Instalar:** `npm install @hyperframes/cli -g`
- **Uso:** `hyperframes render composition.html --fps 30 --output video.mp4`
- **Colton fork (recomendado):** `github.com/coltonjosephdean-rgb/Hyperframes-colton.ai.dean`
  - Aprende tu estilo de edición (feedback loop `/feedback`)
  - Incluye GSAP + Three.js para objetos 3D integrados

### Remotion — Videos programáticos React
- `npx remotion render KineticReel out.mp4`
- Preview: `cd [proyecto] && npm run dev`

### LottieLab — Animaciones vectoriales
- Figma → Lottie → MP4/WebM
- URL: lottielab.com
- Ideal para: logos animados, íconos en movimiento, overlays vectoriales

### DaVinci Resolve MCP
- Claude controla DaVinci vía MCP — 215+ herramientas
- **GitHub:** github.com/samuelgursky/davinci-resolve-mcp

---

## MOTION GRAPHICS REALES — Kinetic + Objetos 3D

**QUÉ ES motion graphics:** texto cinético que INTERACTÚA con objetos 3D en la misma composición.
Referencia: texto "cuando el dinero deja de ser el problema" que envuelve billetes 3D — texto y objeto son UNA sola escena.

**NO es:** texto animado encima de un fondo o imagen fija.

### Patrón de producción:
```
1. Definir objeto hero (producto 3D, objeto físico, texto gigante)
2. Asset: Pexels 3D render O Higgsfield Seedance O Three.js en código
3. GSAP timeline: objeto entra → texto aparece en capas → texto envuelve objeto
4. Audio: SFX de impacto en Mixkit.co
5. render: hyperframes render composition.html --fps 30 --height 1920
```

---

## IMÁGENES Y ASSETS VISUALES

### Pexels API
- Fotos: `GET https://api.pexels.com/v1/search?query=TERMINO&per_page=10`
- Videos portrait: `GET https://api.pexels.com/videos/search?query=TERMINO&orientation=portrait`
- Header: `Authorization: [PEXELS_API_KEY del .env]`

### Nano Banana Pro (via Higgsfield)
- Imágenes 4K con consistencia de personaje
- `/higgsfield-generate --model nano-banana-pro "[descripción]"`

---

## AUDIO Y VOCES

### edge-tts — Voces Microsoft Neural (GRATIS, SIN CUENTA)
- **Script:** `./sistema/tts.sh "texto" output.mp3 [--voz dalia|jorge]`
- Voces MX: `es-MX-DaliaNeural` (mujer) · `es-MX-JorgeNeural` (hombre)
- Directo: `edge-tts --voice es-MX-DaliaNeural --text "..." --write-media voz.mp3`

### ElevenLabs — Voces IA premium
- MCP: `npx @elevenlabs/mcp-server` (requiere API key)
- Skill: `npx skills add elevenlabs-voice-ai`

### Música y SFX gratis (sin copyright):
- **Mixkit.co** — gratis, sin copyright
- **Pixabay.com** — música libre
- **Uppbeat.io** — música para content creators
- **ncs.io** — música YouTube/IG
- **Chosic.com** — música libre

---

## FONDOS, OVERLAYS Y TEXTURAS

- needix.com — efectos y overlays
- texturelabs.org — texturas HD
- PremiumBeat.com — música + efectos
- es.vecteezy.com — vectores y fondos
- ShareAE.com — after effects templates

### Plantillas de Video:
- ShareAE.com · VFXdownload.com · pond5.com · gfxdownload.com

---

## INVESTIGACIÓN Y TENDENCIAS

### /last30days — Tendencias reales
- Busca en Reddit, X, YouTube, TikTok, Instagram en paralelo
- **Instalar:** `npx skills add mvanhorn/last30days-skill`

### Apify MCP — Scraping de leads
- Google Maps, Instagram, LinkedIn
- **MCP URL:** `https://mcp.apify.com` (requiere APIFY_TOKEN en .env)

---

## CARRUSELES

### open-carrusel
- Chat con Claude → export PNG Instagram-ready
- **GitHub:** github.com/Hainrixz/open-carrusel
- **Instalar:** `git clone https://github.com/Hainrixz/open-carrusel && npm run setup`

---

## PUBLICACIÓN AUTOMÁTICA — Composio

Composio conecta Claude con 250+ herramientas via MCP.
**Setup:** ver `sistema/COMPOSIO-SETUP.md`

Integraciones clave para agencia:
- Instagram — publicar posts/reels directamente
- WhatsApp Business — mensajes a clientes
- Google Sheets — reportes automáticos
- Notion — gestión de proyectos
- Slack — notificaciones del equipo

**URL:** https://app.composio.dev
**MCP config:** `~/.claude/.mcp.json` → agregar key de Composio
