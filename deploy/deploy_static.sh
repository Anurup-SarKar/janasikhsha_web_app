#!/usr/bin/env bash
# Simple deployment script for jpkindia.org static Vite build
# Usage (first time as root or via sudo):
#   sudo bash deploy/deploy_static.sh --domain jpkindia.org --with-cert
# Subsequent updates (no config changes, just content):
#   sudo bash deploy/deploy_static.sh --update-only

set -euo pipefail
DOMAIN="jpkindia.org"
WITH_CERT=0
UPDATE_ONLY=0

while [[ $# -gt 0 ]]; do
  case "$1" in
    --domain) DOMAIN="$2"; shift 2;;
    --with-cert) WITH_CERT=1; shift;;
    --update-only) UPDATE_ONLY=1; shift;;
    *) echo "Unknown arg: $1"; exit 1;;
  esac
done

PROJECT_ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DIST_DIR="$PROJECT_ROOT/dist"
NGINX_CONF_AVAIL="/etc/nginx/sites-available/${DOMAIN%%:*}"
NGINX_CONF_ENABLED="/etc/nginx/sites-enabled/${DOMAIN%%:*}"
WEB_ROOT="/home/jpkindia/janasikhsha_web_app/dist"

if [[ $UPDATE_ONLY -eq 0 ]]; then
  echo "==> Building project (Vite)"
  (cd "$PROJECT_ROOT" && npm run build)
else
  if [[ ! -d "$DIST_DIR" ]]; then
    echo "dist/ missing; cannot --update-only. Run without --update-only first." >&2
    exit 1
  fi
fi

if [[ $UPDATE_ONLY -eq 0 ]]; then
  echo "==> Writing HTTP nginx config to $NGINX_CONF_AVAIL"
  cat > "$NGINX_CONF_AVAIL" <<CONF
server {
  listen 80;
  server_name ${DOMAIN} www.${DOMAIN};
  root ${WEB_ROOT};
  index index.html;
  location / { try_files $uri /index.html; }
  access_log /var/log/nginx/${DOMAIN}.access.log;
  error_log  /var/log/nginx/${DOMAIN}.error.log;
}
CONF
  ln -sf "$NGINX_CONF_AVAIL" "$NGINX_CONF_ENABLED"
  echo "==> Testing nginx config"
  nginx -t
  echo "==> Reloading nginx"
  systemctl reload nginx
fi

if [[ $WITH_CERT -eq 1 ]]; then
  if ! command -v certbot >/dev/null 2>&1; then
    echo "Installing certbot (snap)";
    apt update && apt install -y snapd || true
    snap install core && snap refresh core
    snap install --classic certbot
    ln -sf /snap/bin/certbot /usr/bin/certbot
  fi
  echo "==> Obtaining/renewing certificate via certbot"
  certbot --nginx -d "$DOMAIN" -d "www.$DOMAIN" --redirect --non-interactive --agree-tos -m admin@${DOMAIN} || {
    echo "Certbot failed" >&2; exit 1; }
fi

echo "==> Deployment complete"
