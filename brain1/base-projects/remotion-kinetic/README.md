# Remotion — Kinetic Typography Base

Video de motion graphics con kinetic typography. Base para cualquier reel de texto animado.

## Setup
```bash
cd brain1/base-projects/remotion-kinetic
npm install
npm run dev        # preview en browser
```

## Render
```bash
npx remotion render KineticReel out/video.mp4
```

## Personalizar
- `src/Composition.tsx` — editar colores, textos, timing
- `public/voiceover.mp3` — agregar audio (opcional)
- Descomenta `<Audio src={staticFile("voiceover.mp3")}/>` para activar voz

## Para nuevo proyecto
Duplicar esta carpeta a `brain1/entregables/videos/[nombre-proyecto]/`
