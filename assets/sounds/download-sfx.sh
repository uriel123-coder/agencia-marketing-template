#!/bin/bash

# ============================================================
# download-sfx.sh — Descargador de SFX para Agencia Marketing
# ============================================================

SFX_DIR="$(dirname "$0")/sfx"

echo "============================================"
echo " Creando estructura de carpetas SFX..."
echo "============================================"

mkdir -p "$SFX_DIR/whoosh"
mkdir -p "$SFX_DIR/impact"
mkdir -p "$SFX_DIR/positive"
mkdir -p "$SFX_DIR/branding"

echo "Carpetas creadas:"
echo "  $SFX_DIR/whoosh    -> transiciones y swipes"
echo "  $SFX_DIR/impact    -> booms, hits, reveals"
echo "  $SFX_DIR/positive  -> success, celebration, chimes"
echo "  $SFX_DIR/branding  -> sonidos de marca recurrentes"
echo ""

# ============================================================
# PIXABAY — Sin registro, uso comercial libre
# ============================================================

echo "============================================"
echo " Terminos recomendados en Pixabay SFX"
echo " https://pixabay.com/sound-effects/"
echo "============================================"
echo ""
echo "  WHOOSH / TRANSICIONES:"
echo "    -> whoosh"
echo "    -> swoosh"
echo "    -> air swipe"
echo "    -> transition swipe"
echo "    -> paper swipe"
echo ""
echo "  IMPACT / REVEAL:"
echo "    -> cinematic impact"
echo "    -> bass boom"
echo "    -> deep hit"
echo "    -> dramatic hit"
echo "    -> thunder impact"
echo ""
echo "  POSITIVE / CELEBRACION:"
echo "    -> success"
echo "    -> achievement"
echo "    -> level up"
echo "    -> sparkle"
echo "    -> cash register"
echo ""
echo "  BRANDING / TENSION:"
echo "    -> riser"
echo "    -> suspense"
echo "    -> logo sting"
echo "    -> notification"
echo "    -> heartbeat"
echo ""

# ============================================================
# FREESOUND — API con registro gratuito
# ============================================================

echo "============================================"
echo " Freesound.org — URL de busqueda por API"
echo "============================================"
echo ""
echo "  Formato base:"
echo "  https://freesound.org/apiv2/search/text/?query=[TERMINO]&filter=duration:[0+TO+5]&fields=id,name,previews&token=[TU_API_KEY]"
echo ""
echo "  Ejemplos listos para usar (reemplaza TU_API_KEY):"
echo ""
echo "  Whoosh:"
echo "  https://freesound.org/apiv2/search/text/?query=whoosh&filter=duration:[0+TO+3]&fields=id,name,previews&token=TU_API_KEY"
echo ""
echo "  Boom/Impact:"
echo "  https://freesound.org/apiv2/search/text/?query=cinematic+impact&filter=duration:[0+TO+5]&fields=id,name,previews&token=TU_API_KEY"
echo ""
echo "  Obtén tu API key gratis en: https://freesound.org/apiv2/apply"
echo ""

# ============================================================
# INSTRUCCIONES DE USO
# ============================================================

echo "============================================"
echo " INSTRUCCIONES DE USO"
echo "============================================"
echo ""
echo "  1. Descarga manual desde Pixabay (sin API key necesaria):"
echo "     -> Ve a https://pixabay.com/sound-effects/"
echo "     -> Busca el termino deseado"
echo "     -> Descarga el MP3"
echo "     -> Mueve el archivo a la carpeta correspondiente:"
echo "         sfx/whoosh/    -> transiciones"
echo "         sfx/impact/    -> golpes y reveals"
echo "         sfx/positive/  -> celebracion y logros"
echo "         sfx/branding/  -> identidad sonora"
echo ""
echo "  2. Descarga directa con curl (si tienes URL):"
echo "     curl -L \"[URL_DIRECTA_DEL_MP3]\" -o sfx/whoosh/nombre.mp3"
echo ""
echo "  3. Descarga desde MyInstants:"
echo "     curl -L \"https://www.myinstants.com/media/sounds/[nombre].mp3\" -o sfx/impact/nombre.mp3"
echo ""
echo "  4. Para usar en Remotion:"
echo "     -> Copia los archivos a public/sounds/ en el proyecto Remotion"
echo "     -> Usa staticFile('sounds/nombre.mp3') en el componente"
echo "     -> Aplica volumenes segun sfx-catalog.md:"
echo "         voiceover: 1.0 | music: 0.15 | sfx-transition: 0.7 | sfx-impact: 0.9"
echo ""
echo "============================================"
echo " SFX folder structure ready at: $SFX_DIR"
echo "============================================"
