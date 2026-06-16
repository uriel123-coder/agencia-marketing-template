# Flujo de Producción de Video — Sistema Completo

Guía paso a paso para producir cualquier video desde cero hasta listo para publicar. Seguir en orden. No saltarse pasos.

---

## PASO 1 — PRE-CHECKS (antes de todo)

```bash
# Verificar que las herramientas estén disponibles
bash sistema/check-conexiones.sh

# Si el script no existe aún, verificar manualmente:
which hyperframes       # debe responder con ruta
which ffmpeg            # debe responder con ruta
edge-tts --version      # debe mostrar versión
```

Leer los archivos de contexto en este orden:
1. `context/empresa.md` — quiénes somos, para quién producimos
2. `context/recursos.md` — qué herramientas y tokens tenemos disponibles
3. `context/hooks-library.md` — hooks disponibles por categoría
4. `context/viral-frameworks.md` — qué hace viral el contenido
5. `context/feedback.md` — qué ha funcionado y qué no en campañas anteriores

Si falta información en empresa.md: asumir lo más razonable, producir, mencionar supuestos al final.

---

## PASO 2 — ANALISIS DE SOLICITUD

Responder estas preguntas antes de escribir una sola palabra:

**Sobre el video:**
- Plataforma de destino: Instagram Reels / TikTok / YouTube Shorts / Facebook
- Duración objetivo: 15s / 30s / 60s / 90s
- Tipo: educativo / emocional / transformacion / urgencia / humor / testimonio
- ¿Tiene persona en pantalla? Si/No → determina si usar Higgsfield Cast

**Sobre el objetivo:**
- ¿Qué quiero que sienta el espectador al terminar?
- ¿Qué acción quiero que tome (CTA)?
- ¿Es awareness, consideracion o conversion?

**Sobre la audiencia:**
- ¿Que nivel de consciencia tiene? (Unaware / Problem-aware / Solution-aware / Product-aware / Most-aware)
- ¿Qué están viendo en su feed ahora mismo?
- ¿Qué los haría parar de hacer scroll?

**Sobre la herramienta de producción:**
| Situacion | Herramienta |
|-----------|-------------|
| Footage real de Pexels + transiciones + audio | Remotion |
| Motion graphics puros, sin footage, texto animado | HyperFrames |
| Video con persona IA hablando | Higgsfield Cast → luego Remotion |
| Antes/despues con wipe cinematografico | Remotion (TransitionSeries) |
| Infografia animada, datos, numeros | HyperFrames (countUp, GSAP) |

---

## PASO 3 — INVESTIGACION (siempre antes de escribir)

### Tendencias actuales
Buscar que esta viral HOY en la industria del cliente:
- Reddit: `/r/[industria]` — posts con mas upvotes de la semana
- TikTok: hashtags de la industria — videos con mas interaccion
- YouTube Shorts: buscar "[industria] shorts" — ver formatos que funcionan
- Instagram Reels: buscar por hashtag — ver estructura de los mas virales

### Preguntas a responder con la investigacion:
1. ¿Qué formato de hook esta funcionando esta semana?
2. ¿Qué tema esta generando mas comentarios y shares?
3. ¿Qué hace el video mas viral de la categoria?
4. ¿Qué angulo NO esta usando la competencia?

### Investigacion de competencia (opcional pero recomendado):
- Buscar 3 competidores directos en Instagram/TikTok
- Identificar su video con mas engagement
- Analizar: hook, estructura, duracion, efectos visuales
- Encontrar el gap que podemos explotar

---

## PASO 4 — ESCRITURA DEL SCRIPT

### La curva de atencion — estructura obligatoria

```
ZONA CRITICA                    ZONA DE ENGANCHE              ZONA DE CONVERSION
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
 0s    1.5s    3s    5s    7s    10s    13s    16s    19s    22s    25s    27s    30s
 │      │      │     │     │     │      │      │      │      │      │      │      │
 ██████████████░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░░
 HOOK        SETUP  M-HOOK 1    M-HOOK 2   SOLUCION       PRUEBA  CTA
 MAX         ↑↑     ↑↑          ↑↑         ↑↑             ↑       ↑
             recuperar          recuperar  mantener        cerrar  convertir
             losers             losers
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ZONA DE PELIGRO: 5-15s → aqui se van el 60% de espectadores si no hay micro-hook
```

### Estructura de 30 segundos — zona por zona

#### [0-1.5s] HOOK MAXIMO — Lo mas importante del video
Regla: Si en 1.5 segundos no hay enganche, el video no sirve. Sin excepciones.

Tipos de hook mas efectivos:
- **Provocacion**: "El error que cometes cada vez que [accion comun]"
- **Contraintuitivo**: "No hagas esto aunque todos te digan que si"
- **Resultado directo**: "Asi transformamos [espacio] en 72 horas por $X"
- **Curiosidad extrema**: "Nadie te dijo esto sobre [tema que les importa]"
- **Identidad**: "Si tienes [problema especifico], esto es para ti"
- **Numero sorpresivo**: "El 87% de [personas] comete este error"

Formato para video con persona:
```
VISUAL 0-1.5s: [que se ve exactamente — el escenario, la accion, el texto en pantalla]
AUDIO 0-1.5s:  "[primera frase exacta — max 8 palabras, alto impacto]"
TEXTO OVERLAY: [misma frase o complemento visual — max 5 palabras]
```

#### [1.5-5s] SETUP — Amplificar el dolor o la curiosidad
- Desarrollar el problema que mencionaste en el hook
- Hacer que el espectador se sienta identificado
- NO revelar la solucion todavia
- Crear tension: "y lo peor es que..."

```
VISUAL 1.5-5s: [como se ve el problema — puede ser footage, texto, o persona]
AUDIO 1.5-5s:  "[frase que profundiza el dolor o la curiosidad]"
RITMO: corte cada 2-2.5 segundos para mantener atencion
```

#### [5-10s] MICRO-HOOK 1 — Recuperar a los que iban a salir
El 40% de los espectadores intentan salir en este punto. Necesitas un gancho nuevo.

Tecnicas de micro-hook:
- Mostrar el resultado final brevemente (revelar el "despues")
- Hacer una pregunta rethorica inesperada
- Cambio drastico de ritmo o musica
- Texto en pantalla con estadistica impactante
- Corte a un angulo completamente diferente

```
VISUAL 5-10s:  [cambio de escena o angulo — no mas de lo mismo]
AUDIO 5-10s:   "[mini-hook — promesa de lo que viene]"
EFECTO: transicion o cut que llame la atencion
```

#### [10-15s] MICRO-HOOK 2 — La zona de mayor abandono
Este es el punto mas critico. Si el video sobrevive aqui, llega al final.

Tecnicas:
- Revelar una parte del proceso que nadie esperaba
- Dato o numero sorprendente
- Cambio de tono: de serio a emocional o viceversa
- Mostrar el detalle que hace la diferencia
- Pausa dramatica + silencio + frase clave

```
VISUAL 10-15s: [lo mas visualmente impresionante del proceso]
AUDIO 10-15s:  "[la revelacion o el momento de sorpresa]"
EFECTO: zoom lento o slow motion para enfatizar
```

#### [15-22s] SOLUCION — El valor real del video
Aqui viene el contenido prometido. El espectador que llego hasta aqui merece la recompensa.

- Entregar lo que prometiste en el hook
- Ser especifico, no vago
- Mostrar el proceso o resultado de forma clara
- Cada frase debe aportar valor tangible

```
VISUAL 15-22s: [mostrar la solucion, el resultado, el proceso — footage de calidad]
AUDIO 15-22s:  "[explicacion clara y concisa del valor — sin relleno]"
SUBTITULOS: obligatorios — 85% ve sin audio
```

#### [22-27s] PRUEBA — La evidencia que vuelve creible
Sin prueba, todo es publicidad. Con prueba, es contenido.

Tipos de prueba:
- Antes y despues visual
- Numero especifico (no "mucho", sino "340%")
- Testimonio en texto
- Logo de cliente reconocible
- Certificacion o premio
- Reaccion de cliente real

```
VISUAL 22-27s: [la evidencia mas fuerte — el "wow" visual]
AUDIO 22-27s:  "[el numero, el resultado, la validacion]"
```

#### [27-30s] CTA — La accion especifica
Una sola accion. No dos. No tres. Una.

Formatos de CTA efectivos:
- "Escríbenos hoy, cotización gratis en 24 horas"
- "Guarda este video para cuando lo necesites"
- "Comenta [palabra] y te enviamos el catálogo"
- "Link en bio — primera consulta sin costo"

```
VISUAL 27-30s: [texto grande del CTA + datos de contacto o URL]
AUDIO 27-30s:  "[frase de CTA — breve, directa, con urgencia si aplica]"
EFECTO: outro con logo animado y redes sociales
```

### Template de script completo

```markdown
# SCRIPT: [titulo del video]
Plataforma: [Instagram/TikTok/YouTube]
Duracion: [30s/60s]
Objetivo: [awareness/consideracion/conversion]
CTA final: [accion especifica]

---

## HOOK [0-1.5s]
VISUAL:  
AUDIO:   
OVERLAY: 

## SETUP [1.5-5s]
VISUAL:  
AUDIO:   
NOTA:    

## MICRO-HOOK 1 [5-10s]
VISUAL:  
AUDIO:   
EFECTO:  

## MICRO-HOOK 2 [10-15s]
VISUAL:  
AUDIO:   
EFECTO:  

## SOLUCION [15-22s]
VISUAL:  
AUDIO:   
SUBTITULOS: si

## PRUEBA [22-27s]
VISUAL:  
AUDIO:   

## CTA [27-30s]
VISUAL:  
AUDIO:   
EFECTO:  outro

---
NOTAS DE PRODUCCION:
- Musica: [genero/mood — energia alta/media/baja]
- Colores dominantes: [hex o descripcion]
- Tipografia: [estilo — bold/minimalista/script]
- Aspect ratio: 1080x1920 (9:16)
```

---

## PASO 5 — SELECCION DE EFECTOS

Consultar `assets/effects/ATTENTION-CURVE.md` para mapa de efectos por zona.

### Reglas de seleccion:

**Transiciones:** maximo 3 tipos diferentes por video. Repetir = coherencia visual.

**Overlays:** film grain siempre (da calidad cinematografica). Agregar segun industria:
- Arquitectura/interior: lens flare suave, viñeta
- Lifestyle/moda: bokeh, particulas
- Tecnologia: glitch sutil, scanlines
- Gastronomia: warmth overlay, viñeta dorada

**Texto animado:**
- Hook: scale + fade desde centro (impacto maximo)
- Datos/numeros: countUp (contar desde 0 hasta el numero)
- Subtitulos: typewriter o fade simple (no distraer)
- CTA: entrance desde abajo con bounce suave

**Lower thirds:**
- Nombre de cliente: estilo noticiero con linea lateral
- Dato clave: fondo semitransparente + texto bold
- URL/contacto: slide desde abajo en los ultimos 5s

### Combinaciones probadas por tipo de video:

**Transformacion / Antes-Despues:**
```
Intro:     flash + logo 0.5s
Antes:     footage con overlay de viñeta + film grain
Transicion: wipe vertical con efecto polvo
Despues:   footage bright + lens flare en entrada
Texto:     countUp para el precio o tiempo
Outro:     fade + CTA + datos de contacto
```

**Educativo / Proceso:**
```
Hook:      zoom out desde detalle + texto kinetic
Pasos:     corte limpio cada paso + lower third con numero
Datos:     countUp + highlight de texto
Resultado: slow motion + musica sube
CTA:       texto grande animado + fade out
```

**Emocional / Testimonial:**
```
Apertura:  fade desde negro lento
Persona:   sin efectos pesados — dejar respirar
Momentos: cortes suaves + musica emocional
Dato:      texto simple, fade suave
Cierre:    logo + musica baja gradualmente
```

---

## PASO 6 — RECOPILACION DE ASSETS

### Buscar video en Pexels (automatico)
```bash
# Videos verticales (Reels/TikTok)
curl -H "Authorization: [TOKEN_PEXELS]" \
  "https://api.pexels.com/videos/search?query=[termino]&per_page=10&orientation=portrait&size=large"

# Fotos
curl -H "Authorization: [TOKEN_PEXELS]" \
  "https://api.pexels.com/v1/search?query=[termino]&per_page=20&orientation=portrait"

# Descargar video
curl -o "brain1/entregables/videos/clips/pexels/[nombre].mp4" "[URL_HD]"
```

Terminos de busqueda por industria:
- Arquitectura/interior: "luxury interior design", "modern apartment", "kitchen remodel"
- Restaurante: "restaurant dining", "food plating", "chef kitchen"
- Tecnologia: "startup office", "coding developer", "business technology"
- Fitness: "gym workout", "healthy lifestyle", "fitness training"
- Moda: "fashion editorial", "clothing lifestyle", "model style"

### Generar voz en off
```bash
# Con edge-tts (gratuito)
edge-tts --voice es-MX-JorgeNeural --text "[script completo]" \
  --write-media "assets/sounds/sfx/voiceover-[proyecto].mp3"

# Voces disponibles en español:
# es-MX-JorgeNeural (hombre, neutral)
# es-MX-DaliaNeural (mujer, calida)
# es-ES-AlvaroNeural (hombre, formal)
# es-ES-ElviraNeural (mujer, profesional)
```

### Generar persona IA (si aplica)
```
/higgsfield-generate [descripcion cinematografica del presenter]
--model cast
"[persona descripcion fisicamente], habla directamente a camara, dice: '[script exacto]'"

Guardar link o descargar a: brain1/entregables/videos/clips/higgsfield/
```

### Musica de fondo
Opciones libres de derechos:
- `assets/sounds/music/` — revisar lo que ya tenemos
- Pixabay Music (gratuito, sin copyright)
- YouTube Audio Library (buscar por mood/BPM)
- Epidemic Sound (si hay suscripcion)

---

## PASO 7 — PRODUCCION

### Opcion A: HyperFrames (motion graphics puros)

Usar cuando: no hay footage real, todo es animacion de texto y graficos.

```bash
# Crear composition.html en assets/templates/hyperframes/
# O usar plantilla existente y modificar

# Render
hyperframes render composition.html \
  --fps 30 \
  --width 1080 \
  --height 1920 \
  --output "brain1/entregables/videos/renders/[nombre]-$(date +%m%Y).mp4"

# Con audio
hyperframes render composition.html \
  --fps 30 --width 1080 --height 1920 \
  --audio "assets/sounds/sfx/voiceover.mp3" \
  --output "brain1/entregables/videos/renders/[nombre]-$(date +%m%Y).mp4"
```

Estructura basica de composition.html:
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    body { width: 1080px; height: 1920px; overflow: hidden; background: #000; }
    /* Importar fuentes de assets/fonts/ */
    /* Definir keyframes de animacion */
  </style>
</head>
<body>
  <!-- Escenas del video -->
  <!-- Cada escena tiene su timing con animation-delay -->
</body>
</html>
```

### Opcion B: Remotion (footage real + transiciones)

Usar cuando: hay clips de Pexels, personas reales, transiciones cinematograficas.

```bash
# Navegar al proyecto base
cd "brain1/entregables/videos/coverstyl-reel"

# Para nuevo proyecto: duplicar el base
cp -r "../coverstyl-reel" "../[nuevo-proyecto]"
cd "../[nuevo-proyecto]"

# Instalar dependencias si es proyecto nuevo
npm install

# Reemplazar clips en src/
# Editar el script en src/Root.tsx o el archivo de composicion principal

# Preview
npm run dev
# Abrir http://localhost:3000

# Render final
npx remotion render src/index.ts [NombreComposicion] \
  "../../renders/[nombre]-$(date +%m%Y).mp4"
```

Componentes de Remotion mas usados:
```tsx
import { useCurrentFrame, useVideoConfig, interpolate, spring } from 'remotion';
import { TransitionSeries, linearTiming, springTiming } from '@remotion/transitions';
import { fade, wipe, slide } from '@remotion/transitions/fade';

// Spring animation para entrada de texto
const opacity = spring({ frame, fps, from: 0, to: 1, durationInFrames: 15 });
const scale = spring({ frame, fps, from: 0.8, to: 1, durationInFrames: 20 });
```

### Post-produccion con ffmpeg

```bash
# Agregar musica de fondo al video renderizado
ffmpeg -i "renders/video-sin-audio.mp4" \
       -i "assets/sounds/music/track.mp3" \
       -filter_complex "[1:a]volume=0.3[music];[0:a][music]amix=inputs=2:duration=first" \
       -c:v copy \
       "brain1/entregables/videos/renders/[nombre]-FINAL-$(date +%m%Y).mp4"

# Agregar subtitulos quemados
ffmpeg -i "renders/video.mp4" \
       -vf "subtitles=subtitulos.srt:force_style='FontSize=48,Bold=1,PrimaryColour=&HFFFFFF'" \
       "renders/[nombre]-subtitled-$(date +%m%Y).mp4"

# Comprimir para Instagram (max 50MB recomendado)
ffmpeg -i "renders/video-FINAL.mp4" \
       -vcodec libx264 -crf 23 -preset medium \
       -acodec aac -b:a 128k \
       "renders/[nombre]-compressed-$(date +%m%Y).mp4"

# Verificar duracion y tamaño
ffprobe -v quiet -print_format json -show_format "renders/[nombre]-FINAL.mp4" | \
  python3 -c "import sys,json; d=json.load(sys.stdin)['format']; print(f'Duracion: {float(d[\"duration\"]):.1f}s | Tamaño: {int(d[\"size\"])/1024/1024:.1f}MB')"
```

### Guardar entregable final

```bash
# Nomenclatura: [tipo]-[descripcion]-[MMYYYY].[ext]
# Ejemplos:
# reel-transformacion-cocina-062026.mp4
# post-oferta-verano-062026.mp4
# carrusel-proceso-diseno-062026.html

# Mover a carpeta correcta
mv "renders/video-FINAL.mp4" \
   "brain1/entregables/videos/renders/reel-[descripcion]-$(date +%m%Y).mp4"

# Crear archivo de caption al lado
cat > "brain1/entregables/videos/renders/reel-[descripcion]-$(date +%m%Y)-CAPTION.md" << 'EOF'
# Caption para publicar

[Hook del caption — igual que el hook del video]

[Cuerpo — 2-3 lineas de valor]

[CTA]

Hashtags:
[hashtags relevantes — 15-20]
EOF
```

---

## CHECKLIST FINAL — Antes de entregar

Correr este checklist en orden. Si algo falla, corregir antes de entregar.

### Video
- [ ] Duracion correcta (30s ±2s para Reels, 60s ±3s para TikTok largo)
- [ ] Resolucion 1080x1920 (9:16 vertical)
- [ ] Sin barras negras ni contenido cortado
- [ ] Audio audible y balanceado (voz +3dB sobre musica)
- [ ] Subtitulos presentes (85% ve sin audio)
- [ ] Ultimo frame tiene CTA visible

### Curva de atencion
- [ ] Hook en los primeros 1.5s — claro, impactante, sin introduccion
- [ ] Micro-hook entre 5-10s — cambio de ritmo o revelacion
- [ ] Micro-hook entre 10-15s — el punto mas critico superado
- [ ] CTA especifico y unico al final

### Calidad visual
- [ ] Texto legible sobre cualquier fondo (contraste minimo 4.5:1)
- [ ] Maximo 7 palabras por texto en pantalla
- [ ] Efectos visuales coherentes con la identidad de marca
- [ ] No hay efectos que distraigan del mensaje principal
- [ ] Colores de marca presentes en al menos 2 elementos visuales

### Virality check (del archivo viral-frameworks.md)
- [ ] Hay un elemento inesperado o contraintuitivo
- [ ] El espectador siente algo (urgencia / curiosidad / esperanza / miedo)
- [ ] Hay un motivo para guardar o compartir
- [ ] El hook no da todo — deja algo que descubrir

### Archivos
- [ ] Video guardado en `brain1/entregables/videos/renders/`
- [ ] Nombre con formato: `[tipo]-[descripcion]-[MMYYYY].mp4`
- [ ] Caption guardado como archivo .md al lado
- [ ] Clips de Pexels guardados en `clips/pexels/` para reutilizar
