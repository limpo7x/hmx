# 部署说明

## 宝塔 Node 项目环境变量

生产环境必须设置：

```text
NODE_ENV=production
HOST=127.0.0.1
PORT=8787
JWT_SECRET=至少32位随机字符串
ADMIN_USERNAME=admin
ADMIN_PASSWORD=至少12位强密码
```

`NODE_ENV=production` 下如果缺少 `JWT_SECRET` 或 `ADMIN_PASSWORD`，服务会拒绝启动，避免默认密码上线。

## 从 GitHub 拉取部署

在宝塔“终端”执行：

```bash
cd /www/wwwroot
curl -fsSL https://raw.githubusercontent.com/limpo7x/hmx/main/scripts/bt-deploy.sh | bash
```

如果服务器无法访问 GitHub，可以上传 `pomer-release.zip` 到 `/www/wwwroot/pomer.cn` 后解压，再执行：

```bash
cd /www/wwwroot/pomer.cn
npm ci
npm run build
npm prune --omit=dev
```

## 推荐访问方式

不要把 `8787` 暴露到公网。宝塔站点使用反向代理：

```text
http://127.0.0.1:8787
```

公网只放行 `80` 和 `443`，并开启 HTTPS 与强制 HTTPS。

宝塔站点反向代理建议：

```text
域名：pomer.cn, www.pomer.cn
目标 URL：http://127.0.0.1:8787
发送域名：$host
```

## 必备备份

上线后需要定期备份：

```text
server/data/site.db
server/uploads/
```

`site.db` 是 CMS 数据库，`uploads` 是后台上传图片。迁移或重装服务器前必须一起保留。
