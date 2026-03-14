#!/bin/bash
# ============================================================
# DEPLOY-CHECKLISTE – ClaudiaConen.com
# Automatisierte Sicherheitsprüfung vor jedem Deploy
# ============================================================

set -e

PROJECT_DIR="/opt/einstein/projects/ClaudiaConen.com-bolt"
DEPLOY_BRANCH="main"
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color
BOLD='\033[1m'

ERRORS=0
WARNINGS=0

log_ok()   { echo -e "  ${GREEN}✓${NC} $1"; }
log_warn() { echo -e "  ${YELLOW}⚠${NC} $1"; WARNINGS=$((WARNINGS + 1)); }
log_fail() { echo -e "  ${RED}✗${NC} $1"; ERRORS=$((ERRORS + 1)); }
log_info() { echo -e "  ${BLUE}ℹ${NC} $1"; }
header()   { echo -e "\n${BOLD}[$1]${NC}"; }

echo -e "${BOLD}═══════════════════════════════════════════${NC}"
echo -e "${BOLD}  DEPLOY-CHECKLISTE – ClaudiaConen.com${NC}"
echo -e "${BOLD}═══════════════════════════════════════════${NC}"
echo -e "  Zeitpunkt: $(date '+%Y-%m-%d %H:%M:%S')"

cd "$PROJECT_DIR"

# ── 1. Branch prüfen ──────────────────────────────────────
header "1/7 Branch prüfen"

CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
if [ "$CURRENT_BRANCH" = "$DEPLOY_BRANCH" ]; then
  log_ok "Auf Branch: ${BOLD}$CURRENT_BRANCH${NC}"
else
  log_fail "Aktueller Branch: ${BOLD}$CURRENT_BRANCH${NC} (erwartet: ${BOLD}$DEPLOY_BRANCH${NC})"
  log_info "Wechsle mit: git checkout $DEPLOY_BRANCH"
fi

# ── 2. Remote-Stand prüfen ────────────────────────────────
header "2/7 Remote-Stand prüfen"

git fetch origin --quiet 2>/dev/null || log_warn "Konnte Remote nicht erreichen"

LOCAL_HASH=$(git rev-parse HEAD)
REMOTE_HASH=$(git rev-parse "origin/$CURRENT_BRANCH" 2>/dev/null || echo "unknown")

if [ "$REMOTE_HASH" = "unknown" ]; then
  log_warn "Remote-Branch '$CURRENT_BRANCH' nicht gefunden"
elif [ "$LOCAL_HASH" = "$REMOTE_HASH" ]; then
  log_ok "Lokal und Remote sind synchron"
else
  BEHIND=$(git rev-list --count HEAD.."origin/$CURRENT_BRANCH" 2>/dev/null || echo 0)
  AHEAD=$(git rev-list --count "origin/$CURRENT_BRANCH"..HEAD 2>/dev/null || echo 0)
  if [ "$BEHIND" -gt 0 ]; then
    log_fail "Lokal ist ${BOLD}$BEHIND Commits hinter${NC} Remote – git pull nötig!"
  fi
  if [ "$AHEAD" -gt 0 ]; then
    log_warn "Lokal ist ${BOLD}$AHEAD Commits vor${NC} Remote – git push nötig?"
  fi
fi

# ── 3. Uncommitted Changes ───────────────────────────────
header "3/7 Uncommitted Changes prüfen"

STAGED=$(git diff --cached --name-only | wc -l)
UNSTAGED=$(git diff --name-only | wc -l)
UNTRACKED=$(git ls-files --others --exclude-standard | wc -l)

if [ "$STAGED" -eq 0 ] && [ "$UNSTAGED" -eq 0 ] && [ "$UNTRACKED" -eq 0 ]; then
  log_ok "Working Directory ist sauber"
else
  [ "$STAGED" -gt 0 ]    && log_warn "$STAGED staged Dateien (nicht committet)"
  [ "$UNSTAGED" -gt 0 ]  && log_warn "$UNSTAGED geänderte Dateien (nicht staged)"
  [ "$UNTRACKED" -gt 0 ] && log_info "$UNTRACKED ungetrackte Dateien"
  log_info "Diese Änderungen sind NICHT im Build enthalten, falls nicht committet!"
fi

# ── 4. Letzter Commit ────────────────────────────────────
header "4/7 Letzter Commit"

LAST_COMMIT=$(git log -1 --format="%h %s (%cr)")
log_info "Letzter Commit: $LAST_COMMIT"

LAST_COMMIT_DATE=$(git log -1 --format="%ci")
COMMIT_AGE_HOURS=$(( ($(date +%s) - $(date -d "$LAST_COMMIT_DATE" +%s)) / 3600 ))

if [ "$COMMIT_AGE_HOURS" -gt 24 ]; then
  log_warn "Letzter Commit ist ${BOLD}${COMMIT_AGE_HOURS}h alt${NC} – sicher dass das aktuell ist?"
else
  log_ok "Commit ist aktuell (${COMMIT_AGE_HOURS}h alt)"
fi

# ── 5. Fresh Build ────────────────────────────────────────
header "5/7 Fresh Build"

# Alten dist/ löschen
if [ -d "dist" ]; then
  DIST_AGE=$(stat -c %Y dist/index.html 2>/dev/null || echo 0)
  if [ "$DIST_AGE" -gt 0 ]; then
    DIST_AGE_MIN=$(( ($(date +%s) - $DIST_AGE) / 60 ))
    log_info "Alter dist/ gefunden (${DIST_AGE_MIN} Minuten alt) – wird gelöscht"
  fi
  rm -rf dist
  log_ok "Alter dist/ gelöscht"
fi

log_info "Starte Build..."
BUILD_START=$(date +%s)

if npm run build 2>&1 | tee /tmp/claudiaconen-build.log; then
  BUILD_DURATION=$(( $(date +%s) - BUILD_START ))
  log_ok "Build erfolgreich (${BUILD_DURATION}s)"

  # Build-Output prüfen
  if [ -f "dist/index.html" ]; then
    FILE_COUNT=$(find dist -type f | wc -l)
    DIST_SIZE=$(du -sh dist | cut -f1)
    log_ok "dist/ enthält ${BOLD}$FILE_COUNT Dateien${NC} ($DIST_SIZE)"
  else
    log_fail "dist/index.html nicht gefunden nach Build!"
  fi
else
  log_fail "Build fehlgeschlagen! Siehe /tmp/claudiaconen-build.log"
fi

# Build-Warnings prüfen
BUILD_WARNINGS=$(grep -ci "warning" /tmp/claudiaconen-build.log 2>/dev/null || echo 0)
BUILD_ERRORS=$(grep -ci "error" /tmp/claudiaconen-build.log 2>/dev/null || echo 0)

[ "$BUILD_WARNINGS" -gt 0 ] && log_warn "$BUILD_WARNINGS Warnings im Build-Log"
[ "$BUILD_ERRORS" -gt 0 ]   && log_fail "$BUILD_ERRORS Errors im Build-Log"

# ── 6. Sitemap prüfen ────────────────────────────────────
header "6/7 Sitemap prüfen"

if [ -f "dist/sitemap.xml" ]; then
  SITEMAP_URLS=$(grep -c "<url>" dist/sitemap.xml 2>/dev/null || echo 0)
  log_ok "Sitemap vorhanden mit ${BOLD}$SITEMAP_URLS URLs${NC}"
  if [ "$SITEMAP_URLS" -lt 40 ]; then
    log_warn "Weniger als 40 URLs – erwartet sind ~47+"
  fi
else
  log_fail "Keine sitemap.xml im Build!"
fi

# ── 7. Zusammenfassung ───────────────────────────────────
header "7/7 Zusammenfassung"

GIT_TAG="deploy-$(date '+%Y-%m-%d-%H%M')"

echo ""
if [ "$ERRORS" -gt 0 ]; then
  echo -e "  ${RED}${BOLD}✗ DEPLOY BLOCKIERT${NC} – $ERRORS Fehler, $WARNINGS Warnungen"
  echo -e "  ${RED}Bitte Fehler beheben bevor deployed wird!${NC}"
  echo ""
  exit 1
elif [ "$WARNINGS" -gt 0 ]; then
  echo -e "  ${YELLOW}${BOLD}⚠ DEPLOY MÖGLICH MIT VORBEHALT${NC} – $WARNINGS Warnungen"
  echo ""
  echo -e "  Fortfahren mit Deploy? [j/N]"
  read -r CONFIRM
  if [ "$CONFIRM" != "j" ] && [ "$CONFIRM" != "J" ]; then
    echo -e "  ${RED}Deploy abgebrochen.${NC}"
    exit 1
  fi
else
  echo -e "  ${GREEN}${BOLD}✓ ALLE CHECKS BESTANDEN${NC} – Bereit zum Deploy!"
fi

echo ""
echo -e "  ${BLUE}Deploy starten...${NC}"

# Deploy mit Netlify CLI
if command -v netlify &> /dev/null; then
  echo ""
  echo -e "  ${BOLD}Netlify Deploy (Production)${NC}"
  netlify deploy --prod --dir=dist --site=96c2c663-47d9-4b6a-817d-f985594484e6

  # Git-Tag setzen
  git tag "$GIT_TAG" 2>/dev/null && log_ok "Git-Tag gesetzt: $GIT_TAG" || log_warn "Git-Tag konnte nicht gesetzt werden"

  echo ""
  echo -e "  ${GREEN}${BOLD}═══════════════════════════════════════${NC}"
  echo -e "  ${GREEN}${BOLD}  DEPLOY ERFOLGREICH ✓${NC}"
  echo -e "  ${GREEN}${BOLD}  Tag: $GIT_TAG${NC}"
  echo -e "  ${GREEN}${BOLD}  URL: https://claudiaconen.com${NC}"
  echo -e "  ${GREEN}${BOLD}═══════════════════════════════════════${NC}"
else
  log_fail "Netlify CLI nicht installiert!"
  log_info "Installieren mit: npm install -g netlify-cli"
  log_info "Alternativ: Build ist in dist/ bereit für manuellen Upload"
  exit 1
fi
