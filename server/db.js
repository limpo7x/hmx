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
const defaultHomeContent = {
  hero: {
    image: "/home-redesign/hero-operations.png",
    imageAlt: "企业级软件交付与运维场景",
    kicker: "企业数字化交付伙伴",
    title: "让复杂的业务更高效，用技术创造可持续价值",
    subtitle: "宏梦线专注互联网软件研发与企业数字化转型，提供从咨询、设计、开发到云端部署和持续运维的一站式解决方案。",
    primaryText: "免费咨询",
    primaryPath: "/contact",
    secondaryText: "了解能力",
    secondaryPath: "/capabilities"
  },
  livePanel: {
    status: "交付系统在线",
    metrics: [
      { value: "99.9%", label: "服务可用性" },
      { value: "24h", label: "需求响应" },
      { value: "6+", label: "核心行业" }
    ]
  },
  heroServices: [
    { mark: "01", title: "网站建设", desc: "官网 / 门户 / 电商平台", path: "/capabilities" },
    { mark: "02", title: "移动应用", desc: "iOS / Android / 小程序", path: "/capabilities" },
    { mark: "03", title: "企业系统", desc: "ERP / CRM / OA / 数据台", path: "/capabilities" },
    { mark: "04", title: "云端运维", desc: "上云部署 / DevOps / 监控", path: "/capabilities" },
    { mark: "05", title: "AI与数据", desc: "数据分析 / 智能应用", path: "/capabilities" }
  ],
  proofStats: [
    { value: "200+", label: "专业团队成员", desc: "多角色协作，稳定交付保障" },
    { value: "500+", label: "成功交付案例", desc: "覆盖多行业，经验沉淀丰富" },
    { value: "98%", label: "客户满意度", desc: "长期合作，口碑值得信赖" }
  ],
  logos: { title: "他们信任宏梦线", items: ["中国中铁", "越秀集团", "广汽集团", "OPPO", "ZTE 中兴", "海大集团"] },
  capability: {
    tag: "核心能力",
    title: "以业务为核心的全周期技术服务",
    subtitle: "从早期规划到上线后的稳定运营，帮助企业构建安全、稳定、可扩展的数字化系统。",
    items: [
      { tag: "Strategy", title: "数字化咨询与规划", desc: "梳理业务场景与痛点，制定可落地的数字化路线图与实施策略。", image: "/home-redesign/cap-consulting.png", path: "/capabilities" },
      { tag: "Engineering", title: "软件定制开发", desc: "高质量交付复杂业务系统、平台与应用，支持稳定增长与持续迭代。", image: "/home-redesign/cap-development.png", path: "/capabilities" },
      { tag: "Cloud", title: "云计算与运维", desc: "提供云架构设计、迁移、DevOps 与 7x24 运维保障。", image: "/home-redesign/cap-cloud.png", path: "/capabilities" },
      { tag: "Data", title: "AI与数据智能", desc: "构建数据中台与智能应用，释放数据价值，驱动业务智能决策。", image: "/home-redesign/cap-ai-data.png", path: "/capabilities" },
      { tag: "Experience", title: "移动应用与全端体验", desc: "打造高性能移动应用与小程序，提升用户体验与业务触达能力。", image: "/home-redesign/cap-mobile.png", path: "/capabilities" },
      { tag: "Security", title: "系统集成与安全", desc: "提供系统集成、接口对接与安全防护，保障企业数据与业务安全。", image: "/home-redesign/cap-security.png", path: "/capabilities" }
    ]
  },
  solutions: {
    eyebrow: "解决方案",
    title: "深入行业场景，交付可落地的数字化方案",
    subtitle: "围绕业务流程、用户体验、数据资产和系统稳定性，帮助不同类型组织完成从想法到上线的闭环。",
    linkText: "查看全部方案",
    linkPath: "/solutions",
    items: [
      { index: "01", title: "智慧电商", desc: "全渠道电商平台、会员营销、订单履约与数据分析一体化建设。" },
      { index: "02", title: "智慧政务", desc: "行政审批、数据共享、便民服务平台与政务信息化系统。" },
      { index: "03", title: "智慧教育", desc: "在线教育平台、教务管理、直播教学与数字化学习体验。" },
      { index: "04", title: "企业数字化", desc: "办公协同、客户管理、业务中台和数据资产建设。" }
    ]
  },
  testimonials: {
    tag: "客户评价",
    title: "用稳定交付赢得长期信任",
    subtitle: "客户关心的不只是上线，更是系统能否持续服务业务增长。",
    items: [
      { name: "张总", company: "某电商平台", content: "宏梦线帮助我们完成了核心交易系统升级，上线后系统稳定性和用户体验都有明显提升。", metric: "转化率提升 30%" },
      { name: "李经理", company: "某教育科技集团", content: "从需求沟通到项目交付，团队响应很快，也能把复杂业务拆解成清晰的技术方案。", metric: "流程效率提升 50%" },
      { name: "王总监", company: "某金融机构", content: "数据分析平台上线后，业务团队可以实时洞察运营状态，决策效率提升非常明显。", metric: "报表周期缩短 80%" }
    ]
  },
  news: {
    tag: "新闻资讯",
    title: "最新动态与技术观察",
    subtitle: "关注企业数字化、云原生、数据智能和项目交付的实践经验。",
    linkText: "查看全部文章"
  },
  cta: {
    kicker: "准备开始一个可靠的数字化项目？",
    title: "把复杂需求讲清楚，剩下的交给专业团队。",
    subtitle: "告诉我们你的业务目标，我们会给出清晰的技术路径、周期评估和落地建议。",
    buttonText: "立即咨询",
    buttonPath: "/contact"
  }
}

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
  seedHomeContent()
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

function seedHomeContent() {
  setDefault("home", defaultHomeContent)
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
