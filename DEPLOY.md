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

## 推荐访问方式

不要把 `8787` 暴露到公网。宝塔站点使用反向代理：

```text
http://127.0.0.1:8787
```

公网只放行 `80` 和 `443`，并开启 HTTPS 与强制 HTTPS。

## 必备备份

上线后需要定期备份：

```text
server/data/site.db
server/uploads/
```

`site.db` 是 CMS 数据库，`uploads` 是后台上传图片。迁移或重装服务器前必须一起保留。
