#!/bin/bash
# ============================================================
# INSTALL ALL SKILLS — Sistema de Agencia de Marketing
# Instala los 3400+ skills del sistema completo
# Uso: bash sistema/install-skills.sh
# ============================================================

echo ""
echo "🧠 Instalando skills del sistema de agencia..."
echo "   Esto puede tardar 2-3 minutos."
echo ""

# ── BLOQUE 1: Skills masivos de aplicaciones (3073 skills)
echo "▸ Aplicaciones e integraciones (3073 skills)..."
npx skills add membranedev/application-skills

# ── BLOQUE 2: Animación y motion (144 skills)
echo "▸ Principios de animación (144 skills)..."
npx skills add dylantarre/animation-principles

# ── BLOQUE 3: Office y productividad (137 skills)
echo "▸ Office y productividad (137 skills)..."
npx skills add claude-office-skills/skills

# ── BLOQUE 4: Marketing especializado
echo "▸ Marketing skills (kostja94)..."
npx skills add kostja94/marketing-skills

echo "▸ Marketing skills (coreyhaines31)..."
npx skills add coreyhaines31/marketingskills

echo "▸ Marketing skills (marcolang)..."
npx skills add marcolang/marketing-skills

# ── BLOQUE 5: Video y motion graphics
echo "▸ HyperFrames (HeyGen) — motion graphics..."
npx skills add heygen-com/hyperframes

echo "▸ Cinematic script writer..."
npx skills add praveenspeaks/cinematic-script-writer

echo "▸ Motion graphics creativo..."
npx skills add motion-team/creative-strategy-skills

echo "▸ Efecto plugin (animaciones)..."
npx skills add pablostanley/efecto-plugin

# ── BLOQUE 6: IA y generación
echo "▸ Higgsfield AI (video IA)..."
npx skills add higgsfield-ai/skills

echo "▸ Canva skills..."
npx skills add canva-sdks/canva-claude-skills

# ── BLOQUE 7: Investigación y tendencias
echo "▸ Trends y research..."
npx skills add aradotso/trending-skills

echo "▸ SERP downloaders..."
npx skills add serpdownloaders/skills

# ── BLOQUE 8: Productividad y agencia
echo "▸ Everything Claude Code..."
npx skills add affaan-m/everything-claude-code

echo "▸ Content OS integrado..."
npx skills add drshailesh88/integrated_content_os

echo "▸ Smith skills..."
npx skills add yangliu2060/smith--skills

echo "▸ Founder skills..."
npx skills add ognjengt/founder-skills

echo "▸ Gonzalochale skills..."
npx skills add gonzalochale/skills

# ── BLOQUE 9: Diseño web
echo "▸ Web design guidelines (Vercel)..."
npx skills add nexu-io/open-design

# ── BLOQUE 10: Refly AI
echo "▸ Refly AI..."
npx skills add refly-ai/refly-skills

echo "▸ MCP Builder..."
npx skills add dkyazzentwatwa/chatgpt-skills

echo ""
echo "✅ Instalación completa — +3400 skills disponibles"
echo ""
echo "Skills curadas del sistema (instalar individualmente si faltan):"
echo "  npx skills add mvanhorn/last30days-skill"
echo ""
