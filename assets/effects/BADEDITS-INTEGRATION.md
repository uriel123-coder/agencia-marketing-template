# BadEdits — Integracion con el Sistema de Agencia

## Que es BadEdits

BadEdits (badedits.com) es un plugin para Adobe Premiere Pro y Adobe After Effects especializado en efectos de edicion para contenido viral de redes sociales. Fue creado por creadores de contenido para creadores de contenido — no para editores de cine tradicional.

Sus caracteristicas principales:
- Efectos preconfigurados listos para usar (drag and drop)
- Optimizados para formato vertical 9:16 (Reels, TikTok, Shorts)
- Enfocados en retener atencion: transiciones rapidas, texto impactante, overlays cinematograficos
- Actualizacion constante con los efectos que estan virales en ese momento
- Exportacion en formatos con canal alfa para composicion

BadEdits es herramienta de Adobe (de pago, requiere licencia). Lo que hace este documento es:
1. Mapear los efectos de BadEdits a sus equivalentes HTML/CSS/Remotion que podemos hacer sin Adobe
2. Documentar como integrar clips de BadEdits (exportados desde Adobe) dentro de nuestros videos de Remotion o HyperFrames cuando tengamos acceso a la herramienta

---

## Tabla de equivalencias — BadEdits vs nuestro sistema

### Transiciones de corte

| Efecto BadEdits | Equivalente en nuestro sistema | Archivo / Tecnica |
|----------------|-------------------------------|-------------------|
| Smash Cut | Corte seco entre clips en Remotion | `<TransitionSeries>` sin easing |
| Whip Pan | CSS transform translateX rapido + motion blur | `assets/effects/transitions/whip-pan.html` |
| Zoom Punch | Scale spring en Remotion (1 a 1.3 en 8 frames) | `spring({ from: 1, to: 1.3, durationInFrames: 8 })` |
| Flash Transition | Overlay blanco/negro en 3 frames | CSS `animation: flash 0.1s` |
| Blur Transition | CSS filter blur de entrada y salida | `filter: blur(20px)` con transicion |
| J-Cut / L-Cut | Audio offset en Remotion AudioProps | `startFrom` y `endAt` con overlap |

### Overlays cinematograficos

| Efecto BadEdits | Equivalente en nuestro sistema | Implementacion |
|----------------|-------------------------------|----------------|
| Film Grain | CSS noise overlay con SVG feTurbulence | `assets/effects/overlays/film-grain.html` |
| Light Leak | Gradiente radial animado en HyperFrames | CSS radial-gradient con keyframes |
| VHS / Scan Lines | CSS repeating-linear-gradient + glitch | `assets/effects/overlays/scanlines.html` |
| Color Grade (LUT) | CSS filter hue-rotate + saturate + brightness | Ajustes de CSS filter por escena |
| Vignette | CSS radial-gradient de negro a transparente | `box-shadow: inset 0 0 200px rgba(0,0,0,0.7)` |
| Anamorphic Flare | SVG path animado con gradiente naranja/azul | Componente SVG en Remotion |

### Texto y tipografia animada

| Efecto BadEdits | Equivalente en nuestro sistema | Herramienta |
|----------------|-------------------------------|-------------|
| Word by Word Reveal | Kinetic typography en HyperFrames | Split por spans + animation-delay |
| Scale Pop | Spring scale en Remotion | `spring({ from: 0, to: 1 })` |
| Glitch Text | CSS text-shadow con offset RGB + animation | CSS keyframes con translate y color |
| Stroke Reveal | SVG stroke-dashoffset animation | HyperFrames SVG path |
| CountUp | JavaScript countUp library | `window.countUp` en HyperFrames |
| Highlight Word | CSS background-clip text + animation | Gradiente que barre el texto |
| Title Slam | Scale + rotation en spring Remotion | Spring con overshoot |

### Efectos especiales de tendencia

| Efecto BadEdits | Equivalente en nuestro sistema | Notas |
|----------------|-------------------------------|-------|
| Ken Burns (zoom lento) | CSS transform scale con duration largo | Muy efectivo para fotos estaticas |
| Parallax Scroll | Transform translateY diferenciado por capa | HyperFrames con multiple layers |
| Split Screen | CSS grid 2 columnas con clips sincronizados | Remotion con dos `<Video>` lado a lado |
| Picture in Picture | CSS position absolute + border-radius | Overlay de video pequeno sobre principal |
| Text Behind Subject | Rotoscopia / masking | Requiere After Effects; en nuestro sistema usar Remotion + imagen PNG con fondo removido |
| Bokeh Background | CSS backdrop-filter blur en layers | `backdrop-filter: blur(15px)` en capa inferior |

---

## Flujo A: Exportar desde BadEdits/Adobe para usar en Remotion

Cuando tenemos acceso a Adobe Premiere Pro con BadEdits instalado y queremos combinar esos efectos con nuestro pipeline de Remotion.

### Paso 1: Preparar el asset en Adobe

En Adobe Premiere Pro con BadEdits:
1. Crear una nueva secuencia de 1080x1920 (vertical)
2. Aplicar el efecto de BadEdits deseado (ej: Film Grain overlay, Light Leak, VHS)
3. Configurar la duracion del clip de efecto (ej: 30 segundos)
4. Asegurarse de que el clip de efecto tiene fondo transparente (si es overlay)

### Paso 2: Exportar con canal alfa

En Adobe Media Encoder o Export Settings de Premiere:
```
Formato:        QuickTime
Codec de video: Apple ProRes 4444
Canal alfa:     Si (Include Alpha)
Resolucion:     1080 x 1920
Frame rate:     30 fps (o 24 fps para look cinematografico)
Audio:          Ninguno (solo video)

Nombre del archivo: [nombre-efecto]-alpha.mov
Destino:            assets/effects/overlays/ o la carpeta correcta
```

El resultado es un archivo .mov con canal transparente donde los pixeles negros/oscuros son opacos y las areas sin efecto son transparentes.

### Paso 3: Usar el overlay en Remotion

```tsx
// En tu composicion de Remotion
import { Video, useVideoConfig, useCurrentFrame } from 'remotion';

export const VideoConBadEdits: React.FC = () => {
  const { width, height } = useVideoConfig();
  
  return (
    <div style={{ width, height, position: 'relative' }}>
      
      {/* 1. Video principal de fondo (Pexels u otro) */}
      <Video
        src={staticFile('clips/pexels/mi-clip.mp4')}
        style={{ position: 'absolute', width: '100%', height: '100%', objectFit: 'cover' }}
      />
      
      {/* 2. Overlay de BadEdits con ProRes 4444 (canal alfa) */}
      <Video
        src={staticFile('../../assets/effects/overlays/film-grain-alpha.mov')}
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          mixBlendMode: 'screen', // o 'overlay', 'multiply' segun el efecto
          opacity: 0.7,
        }}
      />
      
      {/* 3. Texto animado encima */}
      <div style={{ position: 'absolute', /* ... */ }}>
        {/* Tu contenido animado */}
      </div>
      
    </div>
  );
};
```

Blend modes recomendados segun tipo de overlay:
- Film Grain: `screen` u `overlay` con opacidad 0.3-0.5
- Light Leak: `screen` con opacidad 0.6-0.8
- VHS Scanlines: `multiply` con opacidad 0.4-0.6
- Color Grade: `normal` con opacidad 1 (ya tiene el grado de color)
- Anamorphic Flare: `screen` con opacidad 0.5-0.9

---

## Flujo B: Usar assets de BadEdits en HyperFrames

Para motion graphics puros donde queremos agregar un overlay exportado de BadEdits.

### Paso 1: Exportar desde Adobe en formato WebM

Si el destino es HyperFrames (HTML), exportar en WebM con canal alfa:
```
Formato:        WebM
Codec:          VP9
Canal alfa:     Si
Resolucion:     1080 x 1920
Frame rate:     30 fps
Bitrate:        8-10 Mbps para buena calidad

Nombre:         [efecto]-alpha.webm
Destino:        assets/effects/overlays/
```

### Paso 2: Integrar en composition.html

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    .scene { position: relative; width: 1080px; height: 1920px; }
    
    /* El video de overlay de BadEdits */
    .badedits-overlay {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      mix-blend-mode: screen;
      opacity: 0.6;
      z-index: 10;
      pointer-events: none;
    }
    
    /* El contenido principal debajo */
    .content-layer {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      z-index: 5;
    }
    
    /* El texto encima de todo */
    .text-layer {
      position: absolute;
      top: 0; left: 0;
      width: 100%; height: 100%;
      z-index: 20;
    }
  </style>
</head>
<body>
  <div class="scene">
    <!-- Capa base: imagen o video de fondo -->
    <div class="content-layer">
      <img src="background.jpg" style="width:100%;height:100%;object-fit:cover;">
    </div>
    
    <!-- Overlay de BadEdits exportado como WebM con alfa -->
    <video class="badedits-overlay" autoplay muted loop>
      <source src="../../assets/effects/overlays/film-grain-alpha.webm" type="video/webm">
    </video>
    
    <!-- Texto animado encima -->
    <div class="text-layer">
      <h1 class="animated-title">Tu texto aqui</h1>
    </div>
  </div>
</body>
</html>
```

---

## Mejores efectos de BadEdits para contenido de arquitectura e interiores

Esta seccion es especifica para el tipo de contenido que mas producimos: renovaciones, interiores, antes/despues de espacios.

### Top 5 efectos que elevan el contenido de arquitectura

**1. Film Grain cinematografico**
Por que funciona: da la textura de "revista de diseno" al footage. Hace que clips normales se vean como editoriales de Architectural Digest.
Configuracion ideal: opacidad 25-35%, blend mode `overlay`, con una leve viñeta negra alrededor.
Equivalente HTML: `assets/effects/overlays/film-grain.html`

**2. Anamorphic Lens Flare**
Por que funciona: los espacios bien iluminados (que queremos mostrar) naturalmente tienen reflexos de luz. El lens flare valida que el espacio es luminoso y de calidad.
Configuracion ideal: activar en el primer frame del "despues" de la transformacion, blend mode `screen`, opacidad 60-80%.
Momento de uso: primeros 1.5s del video o en la revelacion del antes/despues.

**3. Slow Zoom (Ken Burns)**
Por que funciona: las fotos estaticas de espacios cobran vida con un zoom lento de 3-5%. Simula el movimiento de camara de un drone o dolly muy lento.
Configuracion ideal: zoom de 100% a 108% en 5-8 segundos, o zoom de 110% a 100% (zoom out).
Equivalente CSS: `animation: kenburns 8s ease-out forwards` con `transform: scale(1) to scale(1.08)`

**4. Color Grade "Warm Luxury"**
Por que funciona: los espacios de diseno de alto nivel siempre se presentan en paleta calida (dorados, cremas, marrones). Un grade calido hace que cualquier espacio se vea mas premium.
Ajustes CSS equivalentes:
```css
filter: 
  brightness(1.05)
  contrast(1.1)
  saturate(0.9)
  sepia(0.15)
  hue-rotate(5deg);
```

**5. Wipe con efecto polvo (Antes/Despues)**
Por que funciona: la transicion de antes a despues es el momento mas impactante del video. Un wipe con particulas de polvo o luz da un efecto de "magia" a la transformacion.
Implementacion en Remotion: `TransitionSeries` con `wipe` timing + particle overlay en la transicion.
Duracion ideal: 0.5-0.8 segundos para el wipe. Mas lento = mas dramatico pero puede perder atencion.

### Paleta de efectos por tipo de espacio

**Cocinas:**
```
Overlay:     warm light leak (dorado/naranja) + film grain
Transiciones: wipe con polvo para antes/despues
Texto:       blanco sobre gradiente oscuro en la parte inferior
Color grade: +contrast, +warmth, -cyan
```

**Banos/Spa:**
```
Overlay:     viñeta azul-fria muy suave + film grain
Transiciones: fade desde blanco (limpieza visual)
Texto:       negro sobre fondo blanco o tipografia serif
Color grade: +brightness, +cyan leve, -saturation
```

**Salas y areas sociales:**
```
Overlay:     luz de tarde (golden hour) + film grain
Transiciones: dolly zoom o wipe diagonal
Texto:       crema/beige sobre fondos oscuros
Color grade: +warmth extremo, +shadows levemente azules, high contrast
```

**Fachadas y exteriores:**
```
Overlay:     cielo dramatico + film grain + viñeta
Transiciones: zoom out desde detalle + corte a fachada completa
Texto:       blanco bold con sombra sobre imagenes de exteriores
Color grade: +clarity, +dehaze, tonos azul-gris para modernidad
```

---

## Notas importantes sobre licencias y derechos

- Los efectos exportados de BadEdits con tu licencia pueden ser usados en videos comerciales para clientes (verificar terminos actuales en badedits.com)
- Los videos generados con estos efectos son de tu propiedad
- Los overlays de film grain y elementos de BadEdits NO pueden redistribuirse como archivos separados a terceros
- Para videos de clientes: el costo de BadEdits se puede incluir como parte del fee de produccion
- Si no tienes acceso a BadEdits, todos los efectos de esta tabla tienen equivalentes funcionales en el sistema (CSS/GSAP/Remotion) que no requieren Adobe
