#!/bin/bash
# ============================================================
# CHECK DE CONEXIONES — Agencia de Marketing
# Corre: bash sistema/check-conexiones.sh
# ============================================================

source "$(dirname "$0")/../.env" 2>/dev/null

GREEN='\033[0;32m'
RED='\033[0;31m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m'

ok()  { echo -e "  ${GREEN}✅ $1${NC}"; }
err() { echo -e "  ${RED}❌ $1${NC}"; }
warn(){ echo -e "  ${YELLOW}⚠️  $1${NC}"; }
info(){ echo -e "  ${BLUE}ℹ️  $1${NC}"; }

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  AGENCIA DE MARKETING — Estado de Conexiones"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"

# PEXELS
echo ""
echo "📸 PEXELS (fotos/videos HD)"
if [ -n "$PEXELS_API_KEY" ]; then
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: $PEXELS_API_KEY" "https://api.pexels.com/v1/search?query=test&per_page=1")
  [ "$STATUS" = "200" ] && ok "Conectado — fotos y videos disponibles" || err "Key inválida (HTTP $STATUS)"
else
  err "PEXELS_API_KEY no configurada"
fi

# PIXABAY MUSIC
echo ""
echo "🎵 PIXABAY MUSIC (música libre de derechos)"
if [ -n "$PIXABAY_API_KEY" ]; then
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://pixabay.com/api/?key=$PIXABAY_API_KEY&q=music&per_page=3")
  [ "$STATUS" = "200" ] && ok "Conectado — música disponible" || err "Key inválida (HTTP $STATUS)"
else
  warn "No configurada — obtén gratis en pixabay.com/api/"
  info "→ https://pixabay.com/api/docs/"
fi

# FREESOUND
echo ""
echo "🔊 FREESOUND (SFX y efectos)"
if [ -n "$FREESOUND_API_KEY" ]; then
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" "https://freesound.org/apiv2/search/text/?query=whoosh&token=$FREESOUND_API_KEY")
  [ "$STATUS" = "200" ] && ok "Conectado — 500k+ SFX disponibles" || err "Key inválida (HTTP $STATUS)"
else
  warn "No configurada — obtén gratis en freesound.org"
  info "→ https://freesound.org/apiv2/apply/"
fi

# ELEVENLABS
echo ""
echo "🎙️  ELEVENLABS (voces IA)"
if [ -n "$ELEVENLABS_API_KEY" ]; then
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" -H "xi-api-key: $ELEVENLABS_API_KEY" "https://api.elevenlabs.io/v1/voices")
  [ "$STATUS" = "200" ] && ok "Conectado — voces disponibles" || err "Key inválida (HTTP $STATUS)"
else
  warn "No configurada — free tier: 10k chars/mes"
  info "→ https://elevenlabs.io/app/settings/api-keys"
fi

# APIFY
echo ""
echo "🕷️  APIFY (scraping de leads)"
if [ -n "$APIFY_TOKEN" ]; then
  STATUS=$(curl -s -o /dev/null -w "%{http_code}" -H "Authorization: Bearer $APIFY_TOKEN" "https://api.apify.com/v2/users/me")
  [ "$STATUS" = "200" ] && ok "Conectado — scraping disponible" || err "Token inválido (HTTP $STATUS)"
else
  warn "No configurado — free tier: \$5 créditos/mes"
  info "→ https://console.apify.com/settings/integrations"
fi

# HIGGSFIELD
echo ""
echo "🎬 HIGGSFIELD (video IA + Nano Banana Pro)"
if command -v higgsfield &>/dev/null; then
  AUTH_STATUS=$(higgsfield auth status 2>&1)
  echo "$AUTH_STATUS" | grep -qi "logged in\|authenticated\|token" && ok "Autenticado" || warn "Instalado pero no autenticado — corre: higgsfield auth login"
else
  warn "No instalado — corre: npm install -g @higgsfield/cli"
  info "→ Luego: higgsfield auth login"
fi

# HYPERFRAMES
echo ""
echo "🎞️  HYPERFRAMES (HTML → video / motion graphics)"
if command -v hyperframes &>/dev/null || npx hyperframes --version &>/dev/null 2>&1; then
  ok "Instalado — $(npx hyperframes --version 2>/dev/null)"
else
  err "No instalado — corre: npm install -g @hyperframes/cli"
fi

# FFMPEG
echo ""
echo "⚙️  FFMPEG (procesamiento de video/audio)"
if command -v ffmpeg &>/dev/null; then
  ok "Instalado — $(ffmpeg -version 2>&1 | head -1 | cut -d' ' -f3)"
else
  err "No instalado — corre: brew install ffmpeg"
fi

# OPEN-CARRUSEL
echo ""
echo "🖼️  OPEN-CARRUSEL (carruseles Instagram)"
CARRUSEL_PATH="$(dirname "$0")/../brain1/tools/open-carrusel"
if [ -f "$CARRUSEL_PATH/package.json" ]; then
  ok "Instalado en brain1/tools/open-carrusel — corre: npm run dev para abrir"
else
  err "No encontrado"
fi

# NODE / NPX
echo ""
echo "🟢 NODE.JS"
if command -v node &>/dev/null; then
  ok "Node $(node -v) | npm $(npm -v)"
else
  err "Node no instalado"
fi

# SKILLS INSTALADAS
echo ""
echo "🧠 SKILLS DE MARKETING"
SKILLS_COUNT=$(ls "$(dirname "$0")/../.agents/skills/" 2>/dev/null | wc -l | tr -d ' ')
ok "$SKILLS_COUNT skills instaladas en .agents/skills/"

echo ""
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo "  Para agregar keys: edita el archivo .env"
echo "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━"
echo ""
