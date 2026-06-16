#!/bin/bash
# ─────────────────────────────────────────────────────────────────────
# TTS — Text-to-Speech para videos de marketing
# Usa Microsoft Edge Neural Voices (GRATIS, muy natural, sin cuenta)
#
# USO:
#   ./sistema/tts.sh "Tu texto aquí" nombre-salida.mp3
#   ./sistema/tts.sh "Tu texto" output.mp3 --voz dalia     # mujer MX
#   ./sistema/tts.sh "Tu texto" output.mp3 --voz jorge     # hombre MX
#   ./sistema/tts.sh "Tu texto" output.mp3 --voz alvaro    # hombre ES
#   ./sistema/tts.sh "Tu texto" output.mp3 --voz elvira    # mujer ES
#
# VOCES DISPONIBLES (español, muy naturales):
#   dalia   → es-MX-DaliaNeural   (mujer México - RECOMENDADA para reels)
#   jorge   → es-MX-JorgeNeural   (hombre México - profesional y cálido)
#   alvaro  → es-ES-AlvaroNeural  (hombre España - europeo premium)
#   elvira  → es-ES-ElviraNeural  (mujer España)
#   ximena  → es-ES-XimenaNeural  (mujer España - joven)
#
# INTEGRACIÓN CON REMOTION:
#   La salida .mp3 se pone en brain1/entregables/videos/[proyecto]/public/
#   En Remotion: <Audio src={staticFile("voiceover.mp3")} />
# ─────────────────────────────────────────────────────────────────────

TEXT="${1}"
OUTPUT="${2:-voiceover.mp3}"
VOZ_ARG=""

# Parse --voz flag
for i in "$@"; do
  case $i in
    --voz=*) VOZ_ARG="${i#*=}" ;;
    --voz) shift; VOZ_ARG="$1" ;;
  esac
done

# Seleccionar voz
case "${VOZ_ARG:-dalia}" in
  dalia)  VOICE="es-MX-DaliaNeural" ;;
  jorge)  VOICE="es-MX-JorgeNeural" ;;
  alvaro) VOICE="es-ES-AlvaroNeural" ;;
  elvira) VOICE="es-ES-ElviraNeural" ;;
  ximena) VOICE="es-ES-XimenaNeural" ;;
  *)      VOICE="$VOZ_ARG" ;;
esac

if [ -z "$TEXT" ]; then
  echo "USO: ./sistema/tts.sh \"texto\" salida.mp3 [--voz dalia|jorge|alvaro|elvira|ximena]"
  exit 1
fi

# Asegurar que la ruta de salida es absoluta o relativa correctamente
if [[ "$OUTPUT" != /* ]]; then
  OUTPUT="$(pwd)/$OUTPUT"
fi

echo "🎙️  Generando voz con $VOICE..."
edge-tts --voice "$VOICE" --text "$TEXT" --write-media "$OUTPUT"

if [ $? -eq 0 ]; then
  SIZE=$(ls -lh "$OUTPUT" | awk '{print $5}')
  echo "✅ Audio listo: $OUTPUT ($SIZE)"
  echo ""
  echo "Para usar en Remotion:"
  echo "  cp \"$OUTPUT\" brain1/entregables/videos/[proyecto]/public/voiceover.mp3"
  echo "  En Remotion: <Audio src={staticFile(\"voiceover.mp3\")} />"
else
  echo "❌ Error al generar audio"
  exit 1
fi
