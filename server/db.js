import Database from "better-sqlite3"
import bcrypt from "bcryptjs"
import fs from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const dataDir = path.join(__dirname, "data")
fs.mkdirSync(dataDir, { recursive: true })

export const db = new Database(path.join(dataDir, "site.db"))
db.pragma("journal_mode = WAL")

const now = () => new Date().toISOString()
const json = (value) => JSON.stringify(value ?? [])
const defaultTopicHighlights = [
  "免费试用：新老客户可先用 1 个月智能体沙箱环境，低成本验证效果。",
  "老客户 5 折：历史合作客户搭建任一智能体服务，可享专属折扣。",
  "一年维护赠送：成功搭建客户赠送模型巡检、故障响应和小版本升级。",
  "全周期交付：覆盖 LLM 部署、安全合规、业务智能体搭建与流程智能化。"
]

export function initDb() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS admins (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL UNIQUE,
      password_hash TEXT NOT NULL,
      created_at TEXT NOT NULL,
      last_login_at TEXT
    );
    CREATE TABLE IF NOT EXISTS messages (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      company TEXT,
      email TEXT NOT NULL,
      phone TEXT,
      content TEXT NOT NULL,
      status TEXT NOT NULL DEFAULT 'pending',
      reply TEXT,
      note TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS articles (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      category TEXT NOT NULL,
      summary TEXT,
      content TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      note TEXT,
      published_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS cases (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      client TEXT,
      industry TEXT,
      description TEXT,
      results TEXT,
      tags TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      link TEXT,
      note TEXT,
      published_at TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS categories (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      type TEXT NOT NULL,
      name TEXT NOT NULL,
      note TEXT,
      sort_order INTEGER NOT NULL DEFAULT 0,
      UNIQUE(type, name)
    );
    CREATE TABLE IF NOT EXISTS site_settings (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS media_assets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL,
      original_name TEXT NOT NULL,
      url TEXT NOT NULL,
      mime TEXT NOT NULL,
      size INTEGER NOT NULL,
      note TEXT,
      uploaded_by INTEGER,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS topics (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL,
      subtitle TEXT,
      image_url TEXT,
      link TEXT,
      content TEXT,
      status TEXT NOT NULL DEFAULT 'draft',
      starts_at TEXT,
      ends_at TEXT,
      note TEXT,
      created_at TEXT NOT NULL,
      updated_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS page_views (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      path TEXT NOT NULL,
      referrer TEXT,
      user_agent TEXT,
      ip TEXT,
      created_at TEXT NOT NULL
    );
    CREATE TABLE IF NOT EXISTS audit_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      admin_id INTEGER,
      action TEXT NOT NULL,
      target_type TEXT NOT NULL,
      target_id TEXT,
      detail TEXT,
      created_at TEXT NOT NULL
    );
  `)

  seedAdmin()
  migrateColumns()
  seedSettings()
  seedCategories()
  seedContent()
  seedTopics()
}

function addColumn(table, column, definition) {
  const columns = db.prepare(`PRAGMA table_info(${table})`).all().map((row) => row.name)
  if (!columns.includes(column)) db.prepare(`ALTER TABLE ${table} ADD COLUMN ${column} ${definition}`).run()
}

function migrateColumns() {
  addColumn("articles", "note", "TEXT")
  addColumn("cases", "note", "TEXT")
  addColumn("categories", "note", "TEXT")
  addColumn("media_assets", "note", "TEXT")
  addColumn("messages", "note", "TEXT")
  addColumn("topics", "highlights", "TEXT")
  db.prepare("UPDATE topics SET highlights = ? WHERE highlights IS NULL OR highlights = '' OR highlights = '[]'")
    .run(json(defaultTopicHighlights))
}

function seedAdmin() {
  const exists = db.prepare("SELECT id FROM admins LIMIT 1").get()
  const username = process.env.ADMIN_USERNAME || "admin"
  const password = process.env.ADMIN_PASSWORD || "ChangeMe123!"
  if (exists) {
    if (process.env.ADMIN_PASSWORD) {
      db.prepare("UPDATE admins SET username = ?, password_hash = ? WHERE id = ?")
        .run(username, bcrypt.hashSync(password, 10), exists.id)
    }
    return
  }
  db.prepare("INSERT INTO admins (username, password_hash, created_at) VALUES (?, ?, ?)")
    .run(username, bcrypt.hashSync(password, 10), now())
}

function setDefault(key, value) {
  db.prepare("INSERT OR IGNORE INTO site_settings (key, value) VALUES (?, ?)")
    .run(key, JSON.stringify(value))
}

function seedSettings() {
  setDefault("site", {
    name: "宏梦线",
    fullName: "西安宏梦线网络科技有限公司",
    slogan: "以技术驱动商业，用代码编织梦想",
    description: "宏梦线是一家专注互联网软件开发的科技公司，致力于为企业提供高质量的网站建设、移动应用开发、企业管理系统及数字化解决方案。",
    phone: "400-888-9999",
    email: "contact@hongmengxian.com",
    address: "西安市高新区科技路88号",
    icp: "陕ICP备2025060218号-1",
    icpUrl: "https://beian.miit.gov.cn/",
    social: { wechat: "#", weibo: "#", zhihu: "#" },
    bannerImage: "",
    note: ""
  })
}

function seedCategories() {
  const categories = [
    ["article", "公司动态", 1], ["article", "行业洞察", 2], ["article", "产品动态", 3], ["article", "技术分享", 4],
    ["case", "电子商务", 1], ["case", "在线教育", 2], ["case", "金融科技", 3], ["case", "智能制造", 4], ["case", "政务服务", 5], ["case", "医疗健康", 6]
  ]
  const stmt = db.prepare("INSERT OR IGNORE INTO categories (type, name, sort_order) VALUES (?, ?, ?)")
  categories.forEach((item) => stmt.run(...item))
}

function seedContent() {
  const articleCount = db.prepare("SELECT COUNT(*) AS count FROM articles").get().count
  if (!articleCount) {
    const stmt = db.prepare(`INSERT INTO articles
      (title, category, summary, content, status, note, published_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, 'published', '', ?, ?, ?)`)
    const items = [
      ["宏梦线荣获2024年度科技创新奖", "公司动态", "宏梦线凭借持续的技术创新与项目交付能力获此殊荣。", "宏梦线在2024年度科技创新评选中脱颖而出，凭借自主研发能力和多个行业标杆项目，荣获年度科技创新奖。\n\n未来我们将继续深耕企业数字化、云原生与数据智能领域，为客户创造更稳定、更长期的技术价值。", "2024-12-15"],
      ["数字化转型白皮书发布", "行业洞察", "聚焦企业数字化转型的最新趋势与实践路径。", "宏梦线联合多家行业机构发布《2025企业数字化转型白皮书》，系统分析企业在数字化转型中面临的挑战、投入重点和落地路径。", "2024-12-01"],
      ["DreamStack 2.0 微服务框架发布", "产品动态", "新版本支持云原生架构、智能监控与可视化编排。", "DreamStack 2.0 在性能、易用性和扩展性方面均有提升，帮助开发团队缩短交付周期，并增强系统稳定性。", "2024-11-15"]
    ]
    items.forEach(([title, category, summary, content, date]) => stmt.run(title, category, summary, content, date, now(), now()))
  }

  const caseCount = db.prepare("SELECT COUNT(*) AS count FROM cases").get().count
  if (!caseCount) {
    const stmt = db.prepare(`INSERT INTO cases
      (title, client, industry, description, results, tags, status, link, note, published_at, created_at, updated_at)
      VALUES (?, ?, ?, ?, ?, ?, 'published', '', '', ?, ?, ?)`)
    const items = [
      ["某电商平台系统重构", "国内TOP50电商企业", "电子商务", "将原有单体架构升级为微服务架构，支撑千万级日访问量。", ["响应时间降低60%", "运维成本降低40%", "上线首月GMV增长25%"], ["电商", "系统重构", "高并发"], "2024-12-15"],
      ["某教育集团在线教学平台", "知名K12教育集团", "在线教育", "搭建集直播、录播、题库和教务于一体的在线教育平台。", ["支持10万+学生在线学习", "直播延迟控制在3秒内", "教务流程效率提升50%"], ["教育", "直播", "SaaS"], "2024-11-20"],
      ["某金融机构数据分析中台", "股份制商业银行", "金融科技", "建设企业级数据分析中台，实现多源数据融合与实时洞察。", ["数据处理效率提升80%", "报表生成从2天缩短至1小时", "支撑10+业务部门"], ["金融", "大数据", "AI"], "2024-10-28"]
    ]
    items.forEach(([title, client, industry, description, results, tags, date]) => stmt.run(title, client, industry, description, json(results), json(tags), date, now(), now()))
  }
}

function seedTopics() {
  const topicCount = db.prepare("SELECT COUNT(*) AS count FROM topics").get().count
  if (topicCount) return
  db.prepare(`INSERT INTO topics
    (title, subtitle, image_url, link, content, status, starts_at, ends_at, note, created_at, updated_at)
    VALUES (?, ?, ?, ?, ?, 'published', ?, ?, ?, ?, ?)`)
    .run(
      "企业数字化转型专题",
      "聚焦企业官网、管理系统、数据智能与云运维的一体化落地方案。",
      "",
      "#/solutions",
      "<p>围绕企业数字化转型的核心场景，提供从咨询、设计、开发到运维的全周期服务。</p>",
      "2026-01-01T00:00",
      "2027-01-01T00:00",
      "默认专题，可在后台专题发布中编辑或下线。",
      now(),
      now()
    )
}

export function readSetting(key) {
  const row = db.prepare("SELECT value FROM site_settings WHERE key = ?").get(key)
  return row ? JSON.parse(row.value) : null
}

export function writeSetting(key, value) {
  db.prepare("INSERT INTO site_settings (key, value) VALUES (?, ?) ON CONFLICT(key) DO UPDATE SET value = excluded.value")
    .run(key, JSON.stringify(value))
}

export function audit(adminId, action, targetType, targetId, detail = "") {
  db.prepare("INSERT INTO audit_logs (admin_id, action, target_type, target_id, detail, created_at) VALUES (?, ?, ?, ?, ?, ?)")
    .run(adminId || null, action, targetType, String(targetId ?? ""), detail, now())
}

export { now, json }
