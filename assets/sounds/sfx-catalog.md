# Catálogo de SFX — Agencia de Marketing

## Cómo descargar desde MyInstants

MyInstants almacena los sonidos en URLs directas con el siguiente patrón:

```
https://www.myinstants.com/media/sounds/[nombre-del-sonido].mp3
```

Para encontrar el nombre exacto: entra a myinstants.com, busca el sonido, haz clic derecho en el botón "Play" e inspecciona el elemento — el atributo `data-url` o el `<source src="">` contiene la ruta directa al archivo MP3.

Descarga directa con curl:
```bash
curl -L "https://www.myinstants.com/media/sounds/[nombre].mp3" -o [nombre-local].mp3
```

---

## Tabla: Transiciones

| Nombre | URL / Fuente | Uso ideal |
|--------|-------------|-----------|
| Whoosh Fast | `myinstants.com/media/sounds/whoosh.mp3` | Entrada de texto en pantalla, slide change |
| Air Swoosh | `myinstants.com/media/sounds/air-swoosh.mp3` | Transición entre secciones en reel |
| Swipe Right | `myinstants.com/media/sounds/swipe-sound.mp3` | Carrusel deslizando a siguiente slide |
| Camera Shutter | `myinstants.com/media/sounds/camera-shutter.mp3` | Corte de foto a foto, post reveal |
| Page Turn | `myinstants.com/media/sounds/page-turn.mp3` | Carrusel tipo libro, presentaciones |
| Glitch Transition | `myinstants.com/media/sounds/glitch-sound.mp3` | Cuts estilo tech/digital, intros dinámicas |
| Zip By | `myinstants.com/media/sounds/zip-by.mp3` | Texto que entra volando desde un lado |

---

## Tabla: Impact / Reveal

| Nombre | URL / Fuente | Uso ideal |
|--------|-------------|-----------|
| Deep Boom | `myinstants.com/media/sounds/deep-boom.mp3` | Reveal de precio, número impactante |
| Cinematic Hit | `myinstants.com/media/sounds/cinematic-hit.mp3` | Primer frame del reel, hook visual |
| Bass Drop | `myinstants.com/media/sounds/bass-drop.mp3` | Momento de giro en el contenido |
| Punch Impact | `myinstants.com/media/sounds/punch-impact.mp3` | Estadística o dato sorprendente |
| Thunder Clap | `myinstants.com/media/sounds/thunder-clap.mp3` | Antes/después reveal |
| Sub Hit | `myinstants.com/media/sounds/sub-hit.mp3` | CTA final, llamada a la acción |

---

## Tabla: Positive / Celebration

| Nombre | URL / Fuente | Uso ideal |
|--------|-------------|-----------|
| Success Chime | `myinstants.com/media/sounds/success-chime.mp3` | Resultado logrado, testimonial positivo |
| Cash Register | `myinstants.com/media/sounds/cash-register.mp3` | Venta, ingreso, beneficio económico |
| Level Up | `myinstants.com/media/sounds/level-up.mp3` | Logro, transformación completada |
| Sparkle | `myinstants.com/media/sounds/sparkle.mp3` | Producto premium, lanzamiento exclusivo |

---

## Tabla: Tension / Anticipation

| Nombre | URL / Fuente | Uso ideal |
|--------|-------------|-----------|
| Suspense Riser | `myinstants.com/media/sounds/suspense-riser.mp3` | Antes de revelar el precio o la solución |
| Heartbeat | `myinstants.com/media/sounds/heartbeat.mp3` | Cuenta regresiva, oferta por tiempo limitado |
| Tension Build | `myinstants.com/media/sounds/tension-build.mp3` | Inicio de video problema → solución |

---

## Fuentes alternativas de SFX gratuitos

| Sitio | URL | Notas |
|-------|-----|-------|
| Freesound | https://freesound.org | Registro gratuito, licencias CC, API disponible |
| Zapsplat | https://zapsplat.com | Miles de SFX gratuitos con cuenta free |
| Pixabay Sound Effects | https://pixabay.com/sound-effects | Sin atribución, uso comercial permitido |
| Mixkit | https://mixkit.co/free-sound-effects | Gratuito sin registro, excelente calidad |
| BBC Sound Effects | https://sound-effects.bbcrewind.co.uk | Archivo histórico, uso no comercial |

---

## Reglas de mezcla de audio

Estas proporciones son para Remotion (`volume` prop) y cualquier editor de video:

| Canal | Volumen | Razón |
|-------|---------|-------|
| Voiceover (voz principal) | `1.0` | Siempre al 100% — es el mensaje |
| Música de fondo | `0.15` | Atmosférica, no compite con la voz |
| SFX de transición (whoosh, swipe) | `0.7` | Perceptible pero no distrae |
| SFX de impacto (boom, hit) | `0.9` | Debe sentirse pero no saturar |

### Ejemplo en Remotion:
```jsx
<Audio src={staticFile("sounds/voiceover.mp3")} volume={1.0} />
<Audio src={staticFile("sounds/bg-music.mp3")} volume={0.15} />
<Audio src={staticFile("sounds/whoosh.mp3")} volume={0.7} startFrom={30} />
<Audio src={staticFile("sounds/deep-boom.mp3")} volume={0.9} startFrom={90} />
```

### Regla de ducking:
Cuando hay voiceover + música, bajar la música a `0.08` en los frames donde habla la persona.
En Remotion usar `interpolate()` para hacer el fade automático.
