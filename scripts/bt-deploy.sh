#!/usr/bin/env bash
set -euo pipefail

APP_DIR="${APP_DIR:-/www/wwwroot/pomer.cn}"
REPO_URL="${REPO_URL:-https://github.com/limpo7x/hmx.git}"

mkdir -p "$APP_DIR"

if [ -d "$APP_DIR/.git" ]; then
  cd "$APP_DIR"
  git fetch origin main
  git reset --hard origin/main
else
  tmp_dir="$(mktemp -d)"
  git clone --depth 1 --branch main "$REPO_URL" "$tmp_dir"
  find "$APP_DIR" -mindepth 1 \
    ! -name ".user.ini" \
    ! -path "$APP_DIR/server/data" \
    ! -path "$APP_DIR/server/data/*" \
    ! -path "$APP_DIR/server/uploads" \
    ! -path "$APP_DIR/server/uploads/*" \
    -exec rm -rf {} +
  shopt -s dotglob
  cp -a "$tmp_dir"/* "$APP_DIR"/
  rm -rf "$tmp_dir"
  cd "$APP_DIR"
fi

npm ci
npm run build
npm prune --omit=dev

mkdir -p "$APP_DIR/server/data" "$APP_DIR/server/uploads"

cat <<'EOF'

部署文件已准备完成。

请在宝塔 Node 项目中配置：
  项目目录: /www/wwwroot/pomer.cn
  启动文件: server/index.js
  启动命令: npm start
  端口: 8787

生产环境变量必须设置：
  NODE_ENV=production
  HOST=127.0.0.1
  PORT=8787
  JWT_SECRET=至少32位随机字符串
  ADMIN_USERNAME=admin
  ADMIN_PASSWORD=至少12位强密码

EOF
