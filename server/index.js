import express from "express"
import cookieParser from "cookie-parser"
import jwt from "jsonwebtoken"
import bcrypt from "bcryptjs"
import multer from "multer"
import sanitizeHtml from "sanitize-html"
import crypto from "node:crypto"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { audit, db, initDb, json, now, readSetting, writeSetting } from "./db.js"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const distDir = path.join(__dirname, "..", "dist")
const uploadDir = path.join(__dirname, "uploads")
const app = express()
const port = Number(process.env.PORT || 8787)
const isProduction = process.env.NODE_ENV === "production"
const host = process.env.HOST || (isProduction ? "127.0.0.1" : "0.0.0.0")
const jwtSecret = process.env.JWT_SECRET || (isProduction ? "" : "dev-secret-change-me")
const loginAttempts = new Map()
const captchaChallenges = new Map()
const authCookieOptions = { httpOnly: true, sameSite: "lax", secure: isProduction }
const captchaCookieOptions = { ...authCookieOptions, maxAge: 5 * 60 * 1000 }

if (isProduction) {
  if (!jwtSecret || jwtSecret.length < 32) {
    throw new Error("生产环境必须设置至少 32 位的 JWT_SECRET")
  }
  if (!process.env.ADMIN_PASSWORD || process.env.ADMIN_PASSWORD.length < 12) {
    throw new Error("生产环境必须设置至少 12 位的 ADMIN_PASSWORD")
  }
}

fs.mkdirSync(uploadDir, { recursive: true })
initDb()

app.set("trust proxy", 1)
app.use(express.json({ limit: "2mb" }))
app.use(cookieParser())
app.use("/uploads", express.static(uploadDir))

const storage = multer.diskStorage({
  destination: uploadDir,
  filename: (_req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase()
    cb(null, `${Date.now()}-${Math.random().toString(36).slice(2)}${ext}`)
  }
})
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (_req, file, cb) => cb(null, file.mimetype.startsWith("image/"))
})

const cleanText = (value, max = 2000) => String(value ?? "").trim().slice(0, max)
const cleanHtml = (value) => sanitizeHtml(String(value ?? ""), {
  allowedTags: [
    "p", "br", "strong", "b", "em", "i", "u", "s", "ol", "ul", "li", "blockquote",
    "a", "img", "h1", "h2", "h3", "h4", "h5", "h6", "span", "pre", "code",
    "table", "thead", "tbody", "tr", "th", "td", "hr"
  ],
  allowedAttributes: {
    "*": ["style"],
    a: ["href", "target", "rel"],
    img: ["src", "alt", "width", "height"]
  },
  allowedStyles: {
    "*": {
      color: [/^#[0-9a-f]{3,8}$/i, /^rgb\(/i, /^rgba\(/i],
      "background-color": [/^#[0-9a-f]{3,8}$/i, /^rgb\(/i, /^rgba\(/i],
      "text-align": [/^left$/, /^right$/, /^center$/, /^justify$/],
      "font-size": [/^\d+(px|em|rem|%)$/]
    }
  },
  allowedSchemes: ["http", "https", "mailto", "data"]
})
const toList = (value) => Array.isArray(value) ? value.map((v) => cleanText(v, 120)).filter(Boolean) : []
const parseList = (value) => {
  try { return JSON.parse(value || "[]") } catch { return [] }
}

const publicArticle = (row) => ({
  id: row.id,
  title: row.title,
  category: row.category,
  summary: row.summary,
  content: row.content,
  note: row.note || "",
  status: row.status,
  date: row.published_at || row.created_at.slice(0, 10)
})
const publicCase = (row) => ({
  id: row.id,
  title: row.title,
  client: row.client,
  industry: row.industry,
  desc: row.description,
  results: parseList(row.results),
  tags: parseList(row.tags),
  status: row.status,
  link: row.link,
  note: row.note || "",
  date: row.published_at || row.created_at.slice(0, 10)
})
const publicTopic = (row) => ({
  id: row.id,
  title: row.title,
  subtitle: row.subtitle,
  imageUrl: row.image_url,
  link: row.link,
  content: row.content,
  highlights: parseList(row.highlights),
  status: row.status,
  startsAt: row.starts_at,
  endsAt: row.ends_at,
  note: row.note || ""
})
const publicCategory = (row) => ({
  id: row.id,
  type: row.type,
  name: row.name,
  note: row.note || "",
  sortOrder: row.sort_order || 0
})

function sign(admin) {
  return jwt.sign({ id: admin.id, username: admin.username }, jwtSecret, { expiresIn: "12h" })
}

function createCaptchaText() {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789"
  return Array.from({ length: 5 }, () => chars[Math.floor(Math.random() * chars.length)]).join("")
}

function escapeSvg(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[char])
}

function captchaSvg(text) {
  const lines = Array.from({ length: 6 }, (_, index) => {
    const y = 16 + index * 8
    const color = index % 2 ? "#93C5FD" : "#86EFAC"
    return `<path d="M${8 + index * 4} ${y} C 48 ${y - 18}, 86 ${y + 20}, 142 ${y - 4}" stroke="${color}" stroke-width="1.4" fill="none" opacity="0.58"/>`
  }).join("")
  const chars = text.split("").map((char, index) => {
    const rotate = Math.round(Math.random() * 22 - 11)
    return `<text x="${20 + index * 24}" y="${42 + (index % 2) * 5}" transform="rotate(${rotate} ${20 + index * 24} 42)">${escapeSvg(char)}</text>`
  }).join("")
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" width="150" height="56" viewBox="0 0 150 56">
  <rect width="150" height="56" rx="8" fill="#EFF6FF"/>
  ${lines}
  <g fill="#0F172A" font-family="Arial, Helvetica, sans-serif" font-size="28" font-weight="800" letter-spacing="2">${chars}</g>
</svg>`
}

function pruneCaptchas() {
  const current = Date.now()
  for (const [id, item] of captchaChallenges) {
    if (item.expiresAt <= current) captchaChallenges.delete(id)
  }
}

function verifyCaptcha(req) {
  pruneCaptchas()
  const id = req.cookies.captcha_id
  const input = cleanText(req.body?.captcha, 12).toUpperCase()
  const item = id ? captchaChallenges.get(id) : null
  if (id) captchaChallenges.delete(id)
  return Boolean(item && item.expiresAt > Date.now() && input && input === item.answer)
}

function auth(req, res, next) {
  const raw = req.cookies.token || (req.headers.authorization || "").replace(/^Bearer\s+/i, "")
  if (!raw) return res.status(401).json({ error: "Unauthorized" })
  try {
    req.admin = jwt.verify(raw, jwtSecret)
    next()
  } catch {
    res.status(401).json({ error: "Unauthorized" })
  }
}

function rateLimitLogin(req, res, next) {
  const key = req.ip || "unknown"
  const current = Date.now()
  const windowMs = 10 * 60 * 1000
  const record = loginAttempts.get(key) || { count: 0, firstAt: current, lockedUntil: 0 }
  if (record.lockedUntil > current) {
    return res.status(429).json({ error: "登录尝试过多，请稍后再试" })
  }
  if (current - record.firstAt > windowMs) {
    record.count = 0
    record.firstAt = current
    record.lockedUntil = 0
  }
  req.loginAttempt = { key, record }
  next()
}

function recordLoginFailure(req) {
  const attempt = req.loginAttempt
  if (!attempt) return
  attempt.record.count += 1
  if (attempt.record.count >= 5) {
    attempt.record.lockedUntil = Date.now() + 10 * 60 * 1000
  }
  loginAttempts.set(attempt.key, attempt.record)
}

function clearLoginFailures(req) {
  const attempt = req.loginAttempt
  if (attempt) loginAttempts.delete(attempt.key)
}

app.get("/api/site", (_req, res) => {
  const site = readSetting("site")
  const categories = db.prepare("SELECT id, type, name, note, sort_order FROM categories ORDER BY type, sort_order, id").all()
  res.json({ site, categories: categories.map(publicCategory) })
})

app.get("/api/home", (_req, res) => {
  res.json(readSetting("home") || {})
})

app.post("/api/pv", (req, res) => {
  const pvPath = cleanText(req.body?.path || "/", 300) || "/"
  db.prepare("INSERT INTO page_views (path, referrer, user_agent, ip, created_at) VALUES (?, ?, ?, ?, ?)")
    .run(pvPath, cleanText(req.headers.referer, 300), cleanText(req.headers["user-agent"], 300), req.ip, now())
  res.status(201).json({ ok: true })
})

app.get("/api/topics", (_req, res) => {
  const current = now()
  const rows = db.prepare(`SELECT * FROM topics
    WHERE status = 'published'
      AND (starts_at IS NULL OR starts_at = '' OR starts_at <= ?)
      AND (ends_at IS NULL OR ends_at = '' OR ends_at >= ?)
    ORDER BY starts_at DESC, id DESC`).all(current, current)
  res.json(rows.map(publicTopic))
})

app.get("/api/topics/:id", (req, res) => {
  const current = now()
  const row = db.prepare(`SELECT * FROM topics
    WHERE id = ?
      AND status = 'published'
      AND (starts_at IS NULL OR starts_at = '' OR starts_at <= ?)
      AND (ends_at IS NULL OR ends_at = '' OR ends_at >= ?)`).get(req.params.id, current, current)
  if (!row) return res.status(404).json({ error: "Topic not found" })
  res.json(publicTopic(row))
})

app.get("/api/articles", (req, res) => {
  const includeDrafts = req.query.all === "1"
  const rows = db.prepare(`SELECT * FROM articles ${includeDrafts ? "" : "WHERE status = 'published'"} ORDER BY COALESCE(published_at, created_at) DESC, id DESC`).all()
  res.json(rows.map(publicArticle))
})

app.get("/api/articles/:id", (req, res) => {
  const row = db.prepare("SELECT * FROM articles WHERE id = ?").get(req.params.id)
  if (!row || row.status !== "published") return res.status(404).json({ error: "Article not found" })
  res.json(publicArticle(row))
})

app.get("/api/cases", (req, res) => {
  const includeDrafts = req.query.all === "1"
  const rows = db.prepare(`SELECT * FROM cases ${includeDrafts ? "" : "WHERE status = 'published'"} ORDER BY COALESCE(published_at, created_at) DESC, id DESC`).all()
  res.json(rows.map(publicCase))
})

app.post("/api/messages", (req, res) => {
  const body = req.body || {}
  const name = cleanText(body.name, 80)
  const email = cleanText(body.email, 120)
  const content = cleanText(body.message || body.content, 2000)
  if (!name || !email || !content) return res.status(400).json({ error: "姓名、邮箱和需求描述必填" })
  const result = db.prepare(`INSERT INTO messages (name, company, email, phone, content, status, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, 'pending', ?, ?)`)
    .run(name, cleanText(body.company, 120), email, cleanText(body.phone, 50), content, now(), now())
  audit(null, "create", "message", result.lastInsertRowid, "public contact form")
  res.status(201).json({ id: result.lastInsertRowid, ok: true })
})

app.get("/api/auth/captcha", (_req, res) => {
  pruneCaptchas()
  const id = crypto.randomUUID()
  const answer = createCaptchaText()
  captchaChallenges.set(id, { answer, expiresAt: Date.now() + 5 * 60 * 1000 })
  res.cookie("captcha_id", id, captchaCookieOptions)
  res.type("svg").send(captchaSvg(answer))
})

app.post("/api/auth/login", rateLimitLogin, (req, res) => {
  const username = cleanText(req.body?.username, 80)
  const password = String(req.body?.password || "")
  if (!verifyCaptcha(req)) {
    recordLoginFailure(req)
    res.clearCookie("captcha_id", authCookieOptions)
    return res.status(400).json({ error: "验证码错误或已过期" })
  }
  const admin = db.prepare("SELECT * FROM admins WHERE username = ?").get(username)
  if (!admin || !bcrypt.compareSync(password, admin.password_hash)) {
    recordLoginFailure(req)
    return res.status(401).json({ error: "账号或密码错误" })
  }
  clearLoginFailures(req)
  db.prepare("UPDATE admins SET last_login_at = ? WHERE id = ?").run(now(), admin.id)
  audit(admin.id, "login", "admin", admin.id)
  res.clearCookie("captcha_id", authCookieOptions)
  res.cookie("token", sign(admin), authCookieOptions)
  res.json({ id: admin.id, username: admin.username })
})

app.post("/api/auth/logout", (_req, res) => {
  res.clearCookie("token", authCookieOptions)
  res.json({ ok: true })
})

app.get("/api/auth/me", auth, (req, res) => res.json(req.admin))

app.get("/api/admin/stats", auth, (_req, res) => {
  const totalPv = db.prepare("SELECT COUNT(*) AS count FROM page_views").get().count
  const todayPv = db.prepare("SELECT COUNT(*) AS count FROM page_views WHERE date(created_at) = date('now')").get().count
  const messageCount = db.prepare("SELECT COUNT(*) AS count FROM messages").get().count
  const topicCount = db.prepare("SELECT COUNT(*) AS count FROM topics").get().count
  const pvTrend = db.prepare(`SELECT date(created_at) AS date, COUNT(*) AS count
    FROM page_views
    WHERE created_at >= datetime('now', '-13 days')
    GROUP BY date(created_at)
    ORDER BY date(created_at)`).all()
  const topPages = db.prepare("SELECT path, COUNT(*) AS count FROM page_views GROUP BY path ORDER BY count DESC LIMIT 8").all()
  res.json({ totalPv, todayPv, messageCount, topicCount, pvTrend, topPages })
})

app.get("/api/admin/messages", auth, (_req, res) => {
  res.json(db.prepare("SELECT * FROM messages ORDER BY created_at DESC, id DESC").all())
})

app.patch("/api/admin/messages/:id", auth, (req, res) => {
  const status = cleanText(req.body?.status, 40) || "pending"
  const reply = cleanHtml(req.body?.reply)
  db.prepare("UPDATE messages SET status = ?, reply = ?, note = ?, updated_at = ? WHERE id = ?")
    .run(status, reply, cleanHtml(req.body?.note), now(), req.params.id)
  audit(req.admin.id, "update", "message", req.params.id)
  res.json({ ok: true })
})

app.get("/api/admin/articles", auth, (_req, res) => {
  res.json(db.prepare("SELECT * FROM articles ORDER BY created_at DESC, id DESC").all().map(publicArticle))
})

app.post("/api/admin/articles", auth, (req, res) => {
  const item = articlePayload(req.body)
  const publishedAt = item.status === "published" ? (item.published_at || now().slice(0, 10)) : ""
  const result = db.prepare(`INSERT INTO articles (title, category, summary, content, status, note, published_at, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(item.title, item.category, item.summary, item.content, item.status, item.note, publishedAt, now(), now())
  audit(req.admin.id, "create", "article", result.lastInsertRowid)
  res.status(201).json({ id: result.lastInsertRowid })
})

app.put("/api/admin/articles/:id", auth, (req, res) => {
  const item = articlePayload(req.body)
  const old = db.prepare("SELECT published_at FROM articles WHERE id = ?").get(req.params.id)
  const publishedAt = item.status === "published" ? (old?.published_at || now().slice(0, 10)) : ""
  db.prepare("UPDATE articles SET title = ?, category = ?, summary = ?, content = ?, status = ?, note = ?, published_at = ?, updated_at = ? WHERE id = ?")
    .run(item.title, item.category, item.summary, item.content, item.status, item.note, publishedAt, now(), req.params.id)
  audit(req.admin.id, "update", "article", req.params.id)
  res.json({ ok: true })
})

app.delete("/api/admin/articles/:id", auth, (req, res) => {
  db.prepare("DELETE FROM articles WHERE id = ?").run(req.params.id)
  audit(req.admin.id, "delete", "article", req.params.id)
  res.json({ ok: true })
})

app.get("/api/admin/topics", auth, (_req, res) => {
  res.json(db.prepare("SELECT * FROM topics ORDER BY created_at DESC, id DESC").all().map(publicTopic))
})

app.post("/api/admin/topics", auth, (req, res) => {
  const item = topicPayload(req.body)
  const result = db.prepare(`INSERT INTO topics (title, subtitle, image_url, link, content, highlights, status, starts_at, ends_at, note, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(item.title, item.subtitle, item.imageUrl, item.link, item.content, json(item.highlights), item.status, item.startsAt, item.endsAt, item.note, now(), now())
  audit(req.admin.id, "create", "topic", result.lastInsertRowid)
  res.status(201).json({ id: result.lastInsertRowid })
})

app.put("/api/admin/topics/:id", auth, (req, res) => {
  const item = topicPayload(req.body)
  db.prepare("UPDATE topics SET title = ?, subtitle = ?, image_url = ?, link = ?, content = ?, highlights = ?, status = ?, starts_at = ?, ends_at = ?, note = ?, updated_at = ? WHERE id = ?")
    .run(item.title, item.subtitle, item.imageUrl, item.link, item.content, json(item.highlights), item.status, item.startsAt, item.endsAt, item.note, now(), req.params.id)
  audit(req.admin.id, "update", "topic", req.params.id)
  res.json({ ok: true })
})

app.delete("/api/admin/topics/:id", auth, (req, res) => {
  db.prepare("DELETE FROM topics WHERE id = ?").run(req.params.id)
  audit(req.admin.id, "delete", "topic", req.params.id)
  res.json({ ok: true })
})

app.get("/api/admin/cases", auth, (_req, res) => {
  res.json(db.prepare("SELECT * FROM cases ORDER BY created_at DESC, id DESC").all().map(publicCase))
})

app.post("/api/admin/cases", auth, (req, res) => {
  const item = casePayload(req.body)
  const publishedAt = item.status === "published" ? (item.published_at || now().slice(0, 10)) : ""
  const result = db.prepare(`INSERT INTO cases (title, client, industry, description, results, tags, status, link, note, published_at, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(item.title, item.client, item.industry, item.description, json(item.results), json(item.tags), item.status, item.link, item.note, publishedAt, now(), now())
  audit(req.admin.id, "create", "case", result.lastInsertRowid)
  res.status(201).json({ id: result.lastInsertRowid })
})

app.put("/api/admin/cases/:id", auth, (req, res) => {
  const item = casePayload(req.body)
  const old = db.prepare("SELECT published_at FROM cases WHERE id = ?").get(req.params.id)
  const publishedAt = item.status === "published" ? (old?.published_at || now().slice(0, 10)) : ""
  db.prepare("UPDATE cases SET title = ?, client = ?, industry = ?, description = ?, results = ?, tags = ?, status = ?, link = ?, note = ?, published_at = ?, updated_at = ? WHERE id = ?")
    .run(item.title, item.client, item.industry, item.description, json(item.results), json(item.tags), item.status, item.link, item.note, publishedAt, now(), req.params.id)
  audit(req.admin.id, "update", "case", req.params.id)
  res.json({ ok: true })
})

app.delete("/api/admin/cases/:id", auth, (req, res) => {
  db.prepare("DELETE FROM cases WHERE id = ?").run(req.params.id)
  audit(req.admin.id, "delete", "case", req.params.id)
  res.json({ ok: true })
})

app.get("/api/admin/categories", auth, (_req, res) => {
  res.json(db.prepare("SELECT * FROM categories ORDER BY type, sort_order, id").all().map(publicCategory))
})

app.post("/api/admin/categories", auth, (req, res) => {
  const type = cleanText(req.body?.type, 20)
  const name = cleanText(req.body?.name, 80)
  if (!["article", "case", "topic"].includes(type) || !name) return res.status(400).json({ error: "分类类型或名称无效" })
  const result = db.prepare("INSERT OR IGNORE INTO categories (type, name, note, sort_order) VALUES (?, ?, ?, ?)")
    .run(type, name, cleanText(req.body?.note, 500), Number(req.body?.sortOrder ?? req.body?.sort_order ?? 0))
  audit(req.admin.id, "create", "category", result.lastInsertRowid || name)
  res.status(201).json({ ok: true })
})

app.put("/api/admin/categories/:id", auth, (req, res) => {
  const type = cleanText(req.body?.type, 20)
  const name = cleanText(req.body?.name, 80)
  if (!["article", "case", "topic"].includes(type) || !name) return res.status(400).json({ error: "分类类型或名称无效" })
  db.prepare("UPDATE categories SET type = ?, name = ?, note = ?, sort_order = ? WHERE id = ?")
    .run(type, name, cleanText(req.body?.note, 500), Number(req.body?.sortOrder ?? req.body?.sort_order ?? 0), req.params.id)
  audit(req.admin.id, "update", "category", req.params.id)
  res.json({ ok: true })
})

app.delete("/api/admin/categories/:id", auth, (req, res) => {
  db.prepare("DELETE FROM categories WHERE id = ?").run(req.params.id)
  audit(req.admin.id, "delete", "category", req.params.id)
  res.json({ ok: true })
})

app.get("/api/admin/site", auth, (_req, res) => res.json(readSetting("site")))

app.get("/api/admin/home", auth, (_req, res) => res.json(readSetting("home") || {}))

app.put("/api/admin/home", auth, (req, res) => {
  const next = homePayload(req.body || {})
  writeSetting("home", next)
  audit(req.admin.id, "update", "site_settings", "home")
  res.json(next)
})

app.put("/api/admin/site", auth, (req, res) => {
  const current = readSetting("site") || {}
  const body = req.body || {}
  const next = {
    ...current,
    name: cleanText(body.name, 80),
    fullName: cleanText(body.fullName, 160),
    slogan: cleanText(body.slogan, 120),
    description: cleanText(body.description, 1000),
    phone: cleanText(body.phone, 80),
    email: cleanText(body.email, 120),
    address: cleanText(body.address, 200),
    icp: cleanText(body.icp, 80) || "陕ICP备2025060218号-1",
    icpUrl: cleanText(body.icpUrl, 200) || "https://beian.miit.gov.cn/",
    bannerImage: cleanText(body.bannerImage, 300),
    note: cleanHtml(body.note),
    social: body.social && typeof body.social === "object" ? body.social : current.social
  }
  writeSetting("site", next)
  audit(req.admin.id, "update", "site_settings", "site")
  res.json(next)
})

app.post("/api/admin/media", auth, upload.single("file"), (req, res) => {
  if (!req.file) return res.status(400).json({ error: "请选择图片文件" })
  const url = `/uploads/${req.file.filename}`
  const result = db.prepare(`INSERT INTO media_assets (filename, original_name, url, mime, size, note, uploaded_by, created_at)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)`)
    .run(req.file.filename, req.file.originalname, url, req.file.mimetype, req.file.size, cleanText(req.body?.note, 500), req.admin.id, now())
  audit(req.admin.id, "upload", "media", result.lastInsertRowid)
  res.status(201).json({ id: result.lastInsertRowid, url })
})

app.get("/api/admin/media", auth, (_req, res) => {
  res.json(db.prepare("SELECT * FROM media_assets ORDER BY created_at DESC, id DESC").all())
})

app.get("/api/admin/audit-logs", auth, (_req, res) => {
  res.json(db.prepare("SELECT l.*, a.username FROM audit_logs l LEFT JOIN admins a ON a.id = l.admin_id ORDER BY l.created_at DESC, l.id DESC LIMIT 100").all())
})

function articlePayload(body = {}) {
  const title = cleanText(body.title, 160)
  if (!title) throw new Error("标题必填")
  return {
    title,
    category: cleanText(body.category, 80) || "公司动态",
    summary: cleanText(body.summary, 500),
    content: cleanHtml(body.content),
    status: body.status === "published" ? "published" : "draft",
    note: cleanText(body.note, 500),
    published_at: cleanText(body.date || body.published_at, 20)
  }
}

function cleanListItems(value, mapper, limit = 12) {
  if (!Array.isArray(value)) return []
  return value.slice(0, limit).map(mapper).filter(Boolean)
}

function homePayload(body = {}) {
  const hero = body.hero || {}
  const livePanel = body.livePanel || {}
  const logos = body.logos || {}
  const capability = body.capability || {}
  const solutions = body.solutions || {}
  const testimonials = body.testimonials || {}
  const news = body.news || {}
  const cta = body.cta || {}
  return {
    hero: {
      image: cleanText(hero.image, 500),
      imageAlt: cleanText(hero.imageAlt, 160),
      kicker: cleanText(hero.kicker, 80),
      title: cleanText(hero.title, 160),
      subtitle: cleanText(hero.subtitle, 500),
      primaryText: cleanText(hero.primaryText, 40),
      primaryPath: cleanText(hero.primaryPath, 200),
      secondaryText: cleanText(hero.secondaryText, 40),
      secondaryPath: cleanText(hero.secondaryPath, 200)
    },
    livePanel: {
      status: cleanText(livePanel.status, 80),
      metrics: cleanListItems(livePanel.metrics, (item) => ({
        value: cleanText(item?.value, 40),
        label: cleanText(item?.label, 80)
      }), 6)
    },
    heroServices: cleanListItems(body.heroServices, (item) => ({
      mark: cleanText(item?.mark, 12),
      title: cleanText(item?.title, 80),
      desc: cleanText(item?.desc, 160),
      path: cleanText(item?.path, 200)
    }), 8),
    proofStats: cleanListItems(body.proofStats, (item) => ({
      value: cleanText(item?.value, 40),
      label: cleanText(item?.label, 80),
      desc: cleanText(item?.desc, 160)
    }), 6),
    logos: {
      title: cleanText(logos.title, 80),
      items: toList(logos.items).slice(0, 12)
    },
    capability: {
      tag: cleanText(capability.tag, 80),
      title: cleanText(capability.title, 160),
      subtitle: cleanText(capability.subtitle, 500),
      items: cleanListItems(capability.items, (item) => ({
        tag: cleanText(item?.tag, 60),
        title: cleanText(item?.title, 100),
        desc: cleanText(item?.desc, 300),
        image: cleanText(item?.image, 500),
        path: cleanText(item?.path, 200)
      }), 12)
    },
    solutions: {
      eyebrow: cleanText(solutions.eyebrow, 80),
      title: cleanText(solutions.title, 160),
      subtitle: cleanText(solutions.subtitle, 500),
      linkText: cleanText(solutions.linkText, 80),
      linkPath: cleanText(solutions.linkPath, 200),
      items: cleanListItems(solutions.items, (item) => ({
        index: cleanText(item?.index, 12),
        title: cleanText(item?.title, 100),
        desc: cleanText(item?.desc, 300)
      }), 8)
    },
    testimonials: {
      tag: cleanText(testimonials.tag, 80),
      title: cleanText(testimonials.title, 160),
      subtitle: cleanText(testimonials.subtitle, 500),
      items: cleanListItems(testimonials.items, (item) => ({
        name: cleanText(item?.name, 80),
        company: cleanText(item?.company, 120),
        content: cleanText(item?.content, 500),
        metric: cleanText(item?.metric, 80)
      }), 8)
    },
    news: {
      tag: cleanText(news.tag, 80),
      title: cleanText(news.title, 160),
      subtitle: cleanText(news.subtitle, 500),
      linkText: cleanText(news.linkText, 80)
    },
    cta: {
      kicker: cleanText(cta.kicker, 100),
      title: cleanText(cta.title, 160),
      subtitle: cleanText(cta.subtitle, 500),
      buttonText: cleanText(cta.buttonText, 60),
      buttonPath: cleanText(cta.buttonPath, 200)
    }
  }
}

function topicPayload(body = {}) {
  const title = cleanText(body.title, 160)
  if (!title) throw new Error("专题标题必填")
  return {
    title,
    subtitle: cleanText(body.subtitle, 300),
    imageUrl: cleanText(body.imageUrl || body.image_url, 500),
    link: cleanText(body.link, 500),
    content: cleanHtml(body.content),
    highlights: toList(body.highlights),
    status: body.status === "published" ? "published" : "draft",
    startsAt: cleanText(body.startsAt || body.starts_at, 40),
    endsAt: cleanText(body.endsAt || body.ends_at, 40),
    note: cleanHtml(body.note)
  }
}

function casePayload(body = {}) {
  const title = cleanText(body.title, 160)
  if (!title) throw new Error("案例名称必填")
  return {
    title,
    client: cleanText(body.client, 160),
    industry: cleanText(body.industry, 80),
    description: cleanHtml(body.desc || body.description),
    results: toList(body.results),
    tags: toList(body.tags),
    status: body.status === "published" ? "published" : "draft",
    link: cleanText(body.link, 300),
    note: cleanHtml(body.note),
    published_at: cleanText(body.date || body.published_at, 20)
  }
}

app.use((err, _req, res, _next) => {
  res.status(400).json({ error: err.message || "请求处理失败" })
})

if (fs.existsSync(distDir)) {
  app.use(express.static(distDir))
  app.get(/^(?!\/api|\/uploads).*/, (_req, res) => {
    res.sendFile(path.join(distDir, "index.html"))
  })
}

app.listen(port, host, () => {
  console.log(`CMS listening on http://${host}:${port}`)
})
