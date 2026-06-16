# Sistema de Agencia de Marketing — Cerebro Maestro

## ANTES DE CUALQUIER TAREA — SIEMPRE

```
1. Leer context/empresa.md
2. Leer context/recursos.md → saber con qué herramientas cuento
3. Leer context/orquestador.md → cómo se conectan las herramientas entre sí
4. Leer context/hooks-library.md → tener hooks disponibles
5. Leer context/viral-frameworks.md → saber qué hace viral el contenido
6. Leer context/feedback.md → aplicar lo aprendido
7. Ejecutar. No preguntar lo obvio. Entregar completo.
```

**Verificar estado del sistema antes de producción compleja:**
```bash
bash sistema/check-conexiones.sh
```

**Si falta info en empresa.md:** asumir lo más razonable, ejecutar, mencionar supuestos al final.
**Regla absoluta:** Nunca entregar lista de "lo que debería tener". Entregar el producto terminado.

---

## REGLA CRÍTICA — REMOTION vs HYPERFRAMES vs MOTION GRAPHICS

| Producir | Herramienta | Por qué |
|----------|-------------|---------|
| Reel con footage real (Pexels/personas) | **REMOTION** | Spring animations + audio sync + film grain |
| Video con antes/después real | **REMOTION** | TransitionSeries + wipe/fade profesional |
| **Motion graphic kinético** (texto + objeto 3D integrados) | **HYPERFRAMES Colton** | GSAP timeline, Three.js 3D, texto envuelve objetos |
| Infografía animada, datos en movimiento | **HYPERFRAMES** | CSS keyframes, sin necesidad de clips |
| Avatar IA / persona generada | **Higgsfield Cast** → luego Remotion | Cast genera, Remotion ensambla |
| Animaciones vectoriales/Lottie | **LottieLab** | Figma→Lottie→MP4, logos animados, overlays |

**⚠️ MOTION GRAPHICS ≠ POST/CARRUSEL:**
- Motion graphic = texto cinético que INTERACTÚA con objetos en la escena (texto aparece desde atrás de un producto, lo rodea, reacciona al movimiento)
- Un post con texto animado encima NO es motion graphic
- Referencia: TikTok de billetes 3D con "cuando el dinero deja de ser el problema" — texto y objeto son UNA composición

**HyperFrames Colton:** `github.com/coltonjosephdean-rgb/Hyperframes-colton.ai.dean`
**HyperFrames estándar:** `hyperframes render composition.html --fps 30 --width 1080 --height 1920`

---

## ROUTING — A qué Brain va cada solicitud

| Solicitud | Brain | Skills principales |
|-----------|-------|--------------------|
| post, reel, carrusel, story, video, ad | Brain 1 | viral-hooks + psychology + copywriting |
| campaña completa, lanzamiento | Brain 1 + 2 | todos |
| presentación, propuesta, cotización | Brain 2 | proposal-writer + canva |
| buscar clientes, prospectos, leads | Brain 2 | cold-email + web search |
| reporte, análisis, métricas | Brain 2 | analytics |
| estrategia de contenido, calendario | Brain 1 | content-strategy |
| tendencias, qué está viral | Brain 1 | social-trend-monitor |
| video con IA, avatar, UGC | Brain 1 | higgsfield-generate |

---

## BRAIN 1 — MARKETING CREATIVO

### Flujo universal para cualquier entregable de contenido:

```
PASO 1 — INTELIGENCIA (siempre primero)
  → /last30days [industria]: ¿qué está trending AHORA con data real (Reddit, X, TikTok, YouTube)?
  → /social-trend-monitor: tendencias por plataforma
  → /marketing-psychology: ¿qué disparador emocional usar?
  → /customer-research: ¿quién exactamente va a ver esto?

PASO 2 — HOOK (lo más importante)
  → Leer hooks-library.md → seleccionar categoría correcta
  → Leer viral-frameworks.md → seleccionar framework
  → /hook-writing: hooks con 5 niveles de consciencia (Schwartz) + 8 disparadores psicológicos
    · Definir awareness stage del cliente ideal (unaware / problem-aware / solution-aware...)
    · Pedir formato video: SPOKEN + VISUAL + TEXT OVERLAY juntos
  → /viral-hook-creator: complementar con 18 patrones probados
  → /viral-tiktok-hooks: si es video
  → Elegir el hook más fuerte basado en psicología del cliente ideal

PASO 3 — CONTENIDO
  → /copywriting: desarrollar el cuerpo completo
  → /ad-creative: si es paid media
  → /social: ajustar para la plataforma específica

PASO 4 — VISUAL / PRODUCCIÓN
  → Buscar imagen/video en Pexels automáticamente (SIEMPRE PRIMERO)
  → REEL con footage real → REMOTION (brain1/entregables/videos/coverstyl-reel/)
      Duplicar proyecto → reemplazar clips Pexels → ajustar copy → render
  → MOTION GRAPHICS puros (sin footage) → HyperFrames
      hyperframes render composition.html --fps 30 --height 1920
      Skills de apoyo: /gsap-greensock /framer-motion /motion-one /entrance-animations
  → Si necesita voz en off: ElevenLabs MCP → voiceover.mp3 → integrar en Remotion/Audio
  → Si necesita persona IA: /higgsfield-generate Cast/Soul → luego Remotion lo ensambla
  → Si necesita imagen estática con persona consistente: /higgsfield-generate nano-banana-pro
  → Si es carrusel: open-carrusel (brain1/tools/open-carrusel) → npm run dev
  → Para publicar automáticamente: /social-publisher o Composio MCP

PASO 5 — VERIFICACIÓN VIRAL
  → Aplicar Virality Checklist de viral-frameworks.md
  → Si hay video: /higgsfield-generate --model brain_activity --video [ruta] → Virality Predictor
  → Si hay video de competencia a analizar: /claude-video-vision [ruta_o_url]
  → Corregir lo que falle en el checklist

PASO 6 — ENTREGA
  → Guardar en brain1/entregables/[tipo]/[nombre-fecha].[ext]
  → Incluir caption completo con hashtags
```

### Estándares de calidad por formato:

**POST (1080×1080)**
- Hook visual: imagen que detiene el scroll en 0.5s
- Texto en imagen: máximo 7 palabras, contraste 4.5:1 mínimo
- Caption: hook → problema → valor → CTA
- Siempre con imagen real de Pexels o generada con Higgsfield

**CARRUSEL (1080×1080 × 4-10 slides)**
- Slide 1: hook que NO revela todo, fuerza a deslizar
- Slides 2-N: valor real, micro-hook en cada slide
- Último slide: CTA con datos de contacto
- Ritmo visual: alternar fondos claros y oscuros

**REEL / TIKTOK (1080×1920)**
- 0-1.5s: hook visual + texto grande en pantalla
- Subtítulos siempre (85% ve sin audio)
- Corte cada 2-3 segundos
- Loop si es posible
- Script generado primero, luego producción
- Para actores/personas: usar Higgsfield Soul/Cast

**SCRIPT para VIDEO CON PERSONA**
```
[0-1.5s] HOOK VISUAL: [descripción exacta de qué se ve]
[0-1.5s] HOOK AUDIO: "[primera línea exacta que dice la persona]"
[1.5-7s] TENSIÓN: [desarrollar el problema o curiosidad]
[7-20s] CONTENIDO: [el valor/información]
[20-27s] PRUEBA: [resultado o evidencia]
[27-30s] CTA: "[acción específica]"
NOTAS DE DIRECCIÓN: [tono, emoción, velocidad, gestos]
PROMPT HIGGSFIELD: [prompt exacto para generar el video]
```

---

## BRAIN 2 — OPERACIONES / CCO

### Flujo para entregables de negocio:

```
PASO 1 — CONTEXTO
  → Leer empresa.md
  → Entender objetivo: ¿para quién es? ¿qué debe lograr?

PASO 2 — ESTRATEGIA
  → /pricing si hay precios involucrados
  → /competitor-profiling si necesita posicionamiento
  → /cro si es landing page o embudo

PASO 3 — CREACIÓN
  → /proposal-writer para propuestas
  → /canva-branded-presentation para presentaciones
  → /cold-email para outreach
  → Apify MCP para scraping de leads: Google Maps, Instagram, LinkedIn (requiere APIFY_TOKEN)
  → WebSearch como fallback para encontrar prospectos

PASO 4 — ENTREGA
  → brain2/entregables/[tipo]/[nombre-fecha].[ext]
```

### Cómo encontrar clientes:
```
1. WebSearch: "[giro] [ciudad] site:google.com/maps" o directamente en Maps
2. Construir lista: nombre empresa, contacto, por qué son buenos prospectos
3. /cold-email: crear secuencia personalizada para cada tipo
4. Guardar en brain2/entregables/prospectos/
```

---

## HIGGSFIELD — Guía de uso

### Para generar video desde texto:
```
/higgsfield-generate [descripción cinematográfica detallada] --model seedance
```

### Para animar una foto (image-to-video):
```
/higgsfield-generate --image [ruta/URL de imagen] [descripción del movimiento]
```

### Para video con persona IA (UGC/presenter):
```
/higgsfield-generate [descripción] --model cast
"Una persona [descripción] habla a cámara: '[script exacto]'"
```

### Para predecir qué tan viral es un video:
```
/higgsfield-generate --model brain_activity --video [ruta/URL]
```

### Prompts cinematográficos base para esta agencia:
```
Estilo arquitectónico/interior:
"Cinematic slow dolly shot through a modern [space], luxury finishes, 
warm golden light, shallow depth of field, 4K quality, film grain"

Persona presentando producto:
"Young professional [descripción] holds [producto], direct eye contact, 
confidence, modern apartment background, natural lighting, documentary style"

Transformación:
"Time-lapse of [space] being transformed, before-to-after reveal, 
dramatic lighting change, cinematic grade, satisfying transition"
```

---

## PEXELS — Búsqueda automática

Siempre que necesite imágenes o video, yo las busco y descargo.

```python
# Fotos
GET https://api.pexels.com/v1/search?query=[termino]&per_page=10&orientation=portrait
Header: Authorization: asgkpbqyPLclOGMmJOCIVKGDF3x4eDfqyoMrJ00HeAkRBDAyHUNVnn9x

# Videos
GET https://api.pexels.com/videos/search?query=[termino]&per_page=5&orientation=portrait
```

Términos útiles por industria:
- Interior/deco: "luxury interior", "modern kitchen", "apartment design", "architectural details"
- Restaurante: "restaurant interior", "food photography", "chef cooking", "dining experience"
- Moda: "fashion editorial", "model wearing", "clothing details", "lifestyle fashion"
- Tecnología: "startup office", "person on laptop", "technology business", "digital work"
- Salud/fitness: "gym workout", "healthy lifestyle", "wellness spa", "fitness training"

---

## ESTRUCTURA DE ENTREGABLES

```
brain1/entregables/
├── posts/          → 1080×1080 HTML
├── carruseles/     → HTML con slides
├── reels/          → Script MD + proyecto Remotion
├── videos/         → Proyecto Remotion o link Higgsfield
└── campanas/       → Carpeta con todos los assets de la campaña

brain2/entregables/
├── presentaciones/ → PDF o link Canva
├── propuestas/     → MD o PDF
├── reportes/       → MD con análisis
└── prospectos/     → CSV o MD con lista de leads
```

**Nomenclatura:** `[tipo]-[descripcion]-[MMYYYY].[ext]`

---

## REGLAS GLOBALES

1. **Leer los 5 archivos de context/ antes de crear** — sin esto el contenido es genérico
2. **Hook primero, siempre** — ningún entregable empieza aburrido
3. **Gen Z rule:** si en 1.5s no hay enganche, no sirve — revisarlo antes de entregar
4. **Psicología del consumidor** — cada decisión creativa tiene un "por qué" científico
5. **Buscar recursos yo mismo** — Pexels, Higgsfield, trends — no esperar a que me den todo
6. **Virality checklist** — correr el checklist antes de entregar cualquier video/reel
7. **Contraste siempre** — texto legible sobre cualquier fondo, sin excepción
8. **Entregable = listo para publicar** — no borradores
9. **Fallback inteligente** — si una herramienta falla, usar la siguiente sin detenerse
10. **Guardar ordenado** — carpeta correcta, nombre descriptivo
