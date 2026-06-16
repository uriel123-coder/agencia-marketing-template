# HyperFrames — Motion Graphic Kinético (Base)

Template de motion graphic con GSAP donde texto y objeto 3D son UNA composición integrada.
El texto aparece encima, debajo y al lado del objeto — no es texto sobre fondo.

## Setup rápido
```bash
npm install @hyperframes/cli -g   # una sola vez
```

## Preview en browser
Abrir `composition.html` directo en Chrome — el timeline se autoplayea.

## Render a video
```bash
hyperframes render composition.html --fps 30 --width 1080 --height 1920 --output video.mp4
```

## Personalizar

### 1. Cambiar el objeto hero
En `composition.html`, reemplazar:
```html
<div class="product">💵</div>
```
Por la imagen del producto del cliente:
```html
<img src="producto.png" style="width:600px; object-fit:contain">
```

### 2. Cambiar los textos
Buscar los divs con clase `text-line-top`, `text-line-bottom`, `text-main` y editar el texto.

### 3. Cambiar colores de marca
En el CSS, buscar:
```css
.accent { color: #d2e823 !important; }   /* ← color de marca */
background: #0a0a0a;                      /* ← fondo */
```

### 4. Ajustar timing
En el script GSAP, los números después de la coma en cada `.to()` son el tiempo en segundos.

## Para nuevo proyecto
Duplicar esta carpeta a `brain1/entregables/motion-graphics/[nombre]/`

## Diferencia con posts/carruseles
- Post = imagen estática con texto encima
- Motion graphic = texto y objeto SE MUEVEN JUNTOS — el texto usa `mix-blend-mode: difference`
  para "pasar" a través del objeto, creando la ilusión de integración 3D
