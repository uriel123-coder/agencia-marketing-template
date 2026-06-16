# Orquestador — Sistema Completo de Skills Conectados

> **Regla maestra:** Cada skill es campeón en una cosa. El orquestador define quién hace qué
> y cómo se pasan el trabajo entre sí. Nunca duplicar trabajo entre skills.

---

## MAPA DE ESPECIALIDADES — 300+ Skills

```
CAPA 1 — INVESTIGACIÓN (siempre primero)
├── /last30days          → tendencias reales: Reddit/X/TikTok/YouTube últimos 30 días
├── /instagram-research  → investigación específica de Instagram
├── /social-trend-monitor→ hashtags y formatos subiendo ahora
├── /deep-research       → investigación profunda multi-fuente con verificación
└── Apify MCP            → scraping: Google Maps / Instagram / LinkedIn leads

CAPA 2 — ESTRATEGIA Y PSICOLOGÍA
├── /marketing-psychology → disparador emocional correcto (FOMO, autoridad, urgencia)
├── /customer-research    → perfil profundo del cliente ideal
├── /competitor-profiling → análisis de competencia para diferenciarse
├── /content-strategy     → pilares de contenido y calendario editorial
└── /brand-strategist     → posicionamiento y voz de marca

CAPA 3 — HOOKS Y COPY
├── /viral-hook-creator   → 18 patrones de hooks + trigger words
├── /viral-tiktok-hooks   → hooks específicos video corto
├── /hook-writing         → ganchos con psicología de Schwartz (5 niveles)
├── /copywriting          → cuerpo completo de contenido
├── /ad-creative          → creativos paid media
└── /ads-copywriter       → copy específico para anuncios

CAPA 4 — ASSETS VISUALES
├── Pexels API            → footage real y fotos HD (SIEMPRE PRIMERO)
├── /higgsfield-generate  → video IA / avatar / imagen consistente
│   ├── Seedance 2.0      → video cinematográfico desde texto
│   ├── Nano Banana Pro   → persona/brand consistente (mismo rostro)
│   ├── Cast/Soul V2      → avatar presentador IA
│   ├── Kling 3.0         → video alta calidad alternativo
│   ├── Image-to-Video    → animar fotos existentes
│   └── brain_activity    → Virality Predictor (solo análisis final)
└── /removebg             → remover fondos para compositing

CAPA 5 — AUDIO
├── ElevenLabs MCP        → voiceover profesional (voz en off)
├── Pixabay Music API     → música libre de derechos (sin copyright strikes)
└── Freesound API         → SFX: whoosh transiciones, impacto reveal

CAPA 6 — PRODUCCIÓN (aquí está el split CRÍTICO)
│
├── 🎬 REMOTION (React) — Para VIDEOS con footage real
│   ├── Cuándo: reel con personas reales, clips Pexels, antes/después
│   ├── Fortaleza: spring animations, timing preciso, audio sync, film grain
│   ├── Path: brain1/entregables/videos/coverstyl-reel/
│   ├── Render: cd [proyecto] && npx remotion render
│   └── Skills que lo alimentan: Pexels clips → ElevenLabs audio → Remotion
│
├── ✨ HYPERFRAMES (HeyGen) — Para ANIMACIONES y motion graphics PUROS
│   ├── Cuándo: texto animado, datos, infografía en movimiento, slides animados
│   ├── Fortaleza: HTML/CSS/JS → video, countUp, scroll, partículas, sans footage
│   ├── Render: hyperframes render composicion.html --fps 30 --output video.mp4
│   ├── Skills: /gsap-greensock, /framer-motion, /motion-one, /anime-js
│   └── Combinar con: FFmpeg para agregar audio después
│
├── 📸 open-carrusel — Para CARRUSELES Instagram
│   ├── Path: brain1/tools/open-carrusel/
│   ├── Uso: cd tools/open-carrusel && npm run dev → chat en UI → export PNG
│   └── Skills que lo alimentan: /instagram-carousel, /copywriting
│
└── 🎨 HTML posts — Para POSTS 1080×1080
    ├── Path: brain1/entregables/posts/
    └── Skills: /brand-consistency, /brand-marketing

CAPA 7 — PUBLICACIÓN Y DISTRIBUCIÓN
├── /social-publisher     → publicar automáticamente en múltiples redes
├── /instagram-automation → automatizar publicaciones y engagement Instagram
├── /twitter-x-automation → Twitter/X programado
├── /linkedin-automation  → LinkedIn posts automáticos
├── /youtube-automation   → YouTube uploads y metadata
├── /tiktok-marketing     → estrategia y publicación TikTok
├── /facebook-meta-ads    → Meta Ads Manager
└── Composio MCP          → conectar todos: Instagram/WhatsApp/Slack/HubSpot/etc.

CAPA 8 — VERIFICACIÓN (nunca entregar sin esto)
├── /higgsfield-generate --model brain_activity → Virality Predictor (score /100)
└── virality checklist de viral-frameworks.md

CAPA 9 — ANÁLISIS Y OPTIMIZACIÓN
├── /analytics            → métricas y KPIs
├── /google-analytics     → tráfico web
├── /google-search-console→ SEO performance
├── /meta-ads             → rendimiento campañas Meta
├── /seo-optimizer        → optimización orgánica
└── /saas-metrics         → métricas de negocio SaaS
```

---

## ÁRBOL DE DECISIÓN — ¿Qué produzco?

```
¿Es video?
├── ¿Tiene footage real (personas, espacios, cámara)?
│   └── → REMOTION (brain1/entregables/videos/)
├── ¿Es animación de texto, datos, infografía, motion graphics puros?
│   └── → HYPERFRAMES + skills GSAP/Framer/Motion
├── ¿Es video con avatar IA o persona generada?
│   └── → Higgsfield Cast/Soul → luego Remotion para overlays
└── ¿Es video corto educativo sin persona?
    └── → HyperFrames solo, o Remotion con título card scenes

¿No es video?
├── ¿Carrusel Instagram?
│   └── → open-carrusel
├── ¿Post 1080×1080?
│   └── → HTML + Pexels imagen
└── ¿Presentación / propuesta?
    └── → /canva-branded-presentation o /ppt-visual
```

---

## PIPELINES COMPLETOS

### 🎬 REEL 30s con footage real (máximo impacto)
```
1. /last30days [industria]  →  qué hooks funcionan HOY
2. /marketing-psychology    →  disparador emocional correcto
3. /viral-hook-creator      →  3-5 opciones de hook, elegir el más fuerte
4. /copywriting             →  script con timing exacto por escena
   Formato: [0-1.5s] HOOK / [1.5-6s] PROBLEMA / [6-22s] SOLUCIÓN / [22-30s] CTA
5. Pexels API               →  descargar 4-5 clips portrait 9:16
   → guardar: brain1/entregables/videos/[nombre]/public/clips/
6. ElevenLabs MCP           →  voiceover del script
   → voz "Rachel" (autoridad) o "Bella" (energética)
   → guardar: .../public/audio/voiceover.mp3
7. Pixabay Music            →  música por mood (inspiring/cinematic/upbeat)
   → guardar: .../public/audio/bg-music.mp3
8. Freesound                →  whoosh + impact SFX
   → guardar: .../public/audio/sfx/
9. REMOTION                 →  ensamblar todo
   Mezcla: voiceover 1.0 · música 0.15 · SFX 0.7
10. /higgsfield brain_activity → Virality Predictor → si < 70 revisar hook
```

### ✨ MOTION GRAPHICS / ANIMACIÓN PURA (sin footage)
```
1. /last30days [tema]       →  datos y estadísticas resonando
2. /copywriting             →  texto de cada escena, datos clave
3. HyperFrames              →  HTML con CSS + GSAP/Motion → MP4
   Skills de apoyo: /gsap-greensock, /scroll-animations, /entrance-animations
4. Pixabay Music + Freesound →  audio
5. FFmpeg                   →  mezclar video + audio
   ffmpeg -i video.mp4 -i bg.mp3 -filter_complex "[1]volume=0.15[m];[0][m]amix" out.mp4
```

### 📸 CARRUSEL (más guardado y compartido)
```
1. /last30days [tema]       →  ángulo sin explotar
2. /viral-hook-creator      →  hook Slide 1 que NO revela todo
3. /copywriting             →  copy slide por slide (micro-hook en cada uno)
4. open-carrusel            →  diseñar en UI → export PNG 1080×1080
5. Pexels / Nano Banana Pro →  imágenes consistentes entre slides
```

### 📱 POST 1080×1080
```
1. Pexels API               →  imagen que detiene el scroll (buscar PRIMERO)
2. /viral-hook-creator      →  hook basado en la imagen elegida
3. /copywriting             →  caption: hook → problema → valor → CTA (8-12 hashtags)
4. HTML 1080×1080           →  texto sobre imagen, máx 7 palabras, contraste 4.5:1
```

### 🤖 PUBLICACIÓN AUTOMÁTICA (Composio + social-publisher)
```
1. Contenido listo en brain1/entregables/
2. /social-publisher        →  programar en Instagram/TikTok/LinkedIn/X
3. Composio MCP             →  WhatsApp Business notificación al equipo
4. /notion-automation       →  registrar en calendario de contenido
5. /sheets-automation       →  actualizar métricas en Google Sheets
```

### 🎯 PAID MEDIA (ads)
```
1. /ad-creative             →  creativos para la campaña
2. /facebook-meta-ads       →  configurar en Meta Ads Manager
3. /google-ads-manager      →  si aplica Google Ads
4. Composio → Meta MCP      →  lanzar campañas directamente
5. /analytics               →  monitorear rendimiento
```

### 👥 BÚSQUEDA DE CLIENTES (Brain 2)
```
1. Apify MCP → Google Maps Scraper → leads por giro + ciudad
2. /competitor-profiling    →  qué hace la competencia que les funciona
3. /cold-email              →  secuencia personalizada por vertical
4. Composio → HubSpot       →  registrar leads automáticamente
5. Composio → WhatsApp      →  primer contacto directo
6. brain2/entregables/prospectos/
```

---

## SPLIT REMOTION vs HYPERFRAMES — REGLA DEFINITIVA

| Situación | Usar |
|-----------|------|
| Footage real de personas/espacios | **REMOTION** |
| Before/after con video real | **REMOTION** |
| Spring animations sobre clips Pexels | **REMOTION** |
| Audio sync preciso (voiceover + música) | **REMOTION** |
| Texto cinético puro (sin video fondo) | **HYPERFRAMES** |
| Infografía animada, countUp, datos | **HYPERFRAMES** |
| Motion logo reveal, intro branding | **HYPERFRAMES** |
| Slides animadas tipo presentación | **HYPERFRAMES** |
| Remotion ya no tiene los clips disponibles | **HYPERFRAMES** como fallback |

---

## REGLAS DE ORQUESTACIÓN

1. **/last30days siempre primero** — no crear sin saber qué está trending HOY
2. **Pexels antes de Higgsfield** — footage real = más autenticidad y gratis
3. **Remotion para footage real / HyperFrames para animaciones puras** — no al revés
4. **ElevenLabs + música = +35% watch time** vs solo subtítulos
5. **Virality Predictor antes de entregar cualquier video** — si falla el hook, rehacer
6. **/social-publisher después de cualquier contenido** — dejar programado, no manual
7. **Composio para automatización cross-platform** — un post → múltiples redes
8. **Apify para leads en masa / WebSearch para un prospecto específico**

---

## AUDIO — REGLAS DE MEZCLA

```
Voiceover (ElevenLabs):   vol 1.0  — protagonista, siempre audible
Música (Pixabay):         vol 0.12-0.18 — fondo, nunca compite con voz
SFX whoosh transición:    vol 0.6-0.8 — puntual, dura < 1s
SFX impacto/reveal:       vol 0.9 — momento más importante del video
ASMR (sin voiceover):     vol 0.8 — formato satisfying sin narración
```

---

## CUÁNDO USAR CADA MODELO HIGGSFIELD

| Modelo | Usar cuando |
|--------|-------------|
| Seedance 2.0 | Video cinematográfico desde texto — exterior, espacios, movimiento |
| Nano Banana Pro | Consistencia de personaje — misma cara en múltiples piezas |
| Cast | Persona IA hablando a cámara — UGC, testimonio, presentador |
| Soul V2 | Avatar con personalidad definida — serie con mismo presentador |
| Kling 3.0 | Alta calidad cuando Seedance no disponible |
| Image-to-Video | Animar foto de producto o espacio existente |
| brain_activity | SOLO análisis — Virality Predictor al final |

---

## SKILLS POR CATEGORÍA — REFERENCIA RÁPIDA

### Investigación
`/last30days` `/instagram-research` `/social-trend-monitor` `/deep-research`
`/customer-research` `/competitor-profiling` `/social-media-trends-research`

### Hooks y Copy
`/viral-hook-creator` `/viral-tiktok-hooks` `/hook-writing`
`/copywriting` `/ad-creative` `/ads-copywriter`

### Estrategia
`/content-strategy` `/marketing-psychology` `/brand-strategist`
`/marketing-ideas` `/launch` `/lead-magnets` `/cro`

### Diseño y Animación
`/brand-consistency` `/brand-marketing` `/brand-guidelines-generator`
`/framer-motion` `/gsap-greensock` `/motion-one` `/anime-js` `/lottie-bodymovin`
`/entrance-animations` `/scroll-animations` `/micro-interactions`
`/after-effects` `/video-motion-graphics` `/web-motion-design`

### Motion Design (Principios Disney — dylantarre)
`/squash-stretch-mastery` `/anticipation-mastery` `/follow-through-overlapping`
`/timing-mastery` `/slow-in-out-mastery` `/arc-mastery`
`/exaggeration-mastery` `/appeal-mastery` `/staging-mastery`

### Video Production
`/remotion-video-creation` `/hyperframes` `/hyperframes-cli`
`/higgsfield-generate` `/kling-video` `/efecto-social-media`

### Publicación
`/social-publisher` `/instagram-automation` `/twitter-x-automation`
`/linkedin-automation` `/youtube-automation` `/tiktok-marketing`
`/facebook-meta-ads` Composio MCP

### Automatización
`/notion-automation` `/sheets-automation` `/slack-workflows`
`/gmail-workflows` `/whatsapp-automation` `/manychat`
`/zapier` `/n8n-workflow`

### Business/Brain 2
`/proposal-writer` `/cold-email` `/sales-enablement` `/pricing`
`/analytics` `/seo-optimizer` `/canva-branded-presentation`
`/emails` `/mailchimp-automation` `/hubspot`

---

## SEÑALES DE QUE ALGO ESTÁ MAL

| Síntoma | Causa | Solución |
|---------|-------|---------|
| Hook score < 50 | Primeros 1.5s sin tensión | Cambiar hook — hooks-library Categoría 1 o 5 |
| Watch time < 40% | Sin micro-hooks | Dato/zoom/texto nuevo cada 3-5 segundos |
| 0 comentarios | Sin pregunta ni controversia | Terminar con pregunta abierta |
| 0 guardados | Sin valor real | Agregar al menos 1 tip accionable |
| Reach bajo | Hashtags saturados | /last30days para hashtags emergentes |
| Video "parece presentación" | Motion graphics SIN footage real | Agregar clip Pexels como fondo, MG encima |
