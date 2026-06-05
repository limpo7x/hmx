<template>
  <div class="admin-shell">
    <section class="login-panel" v-if="!authed">
      <form class="login-card" @submit.prevent="login">
        <h1>管理后台</h1>
        <p>请输入管理员账号进入 CMS。</p>
        <label>账号<input v-model="loginForm.username" autocomplete="username" required /></label>
        <label>密码<input v-model="loginForm.password" type="password" autocomplete="current-password" required /></label>
        <button class="btn-primary" type="submit">登录</button>
        <span class="error" v-if="error">{{ error }}</span>
      </form>
    </section>

    <template v-else>
      <aside class="sidebar">
        <div class="brand">宏梦线 CMS</div>
        <button v-for="tab in tabs" :key="tab.id" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">
          {{ tab.label }}
        </button>
        <button class="logout" @click="logout">退出登录</button>
      </aside>

      <main class="main">
        <div class="topbar">
          <h1>{{ currentTab?.label }}</h1>
          <router-link to="/">返回前台</router-link>
        </div>

        <section v-if="activeTab === 'dashboard'" class="dashboard">
          <div class="stats">
            <div class="stat"><span>今日 PV</span><strong>{{ stats.todayPv || 0 }}</strong></div>
            <div class="stat"><span>总 PV</span><strong>{{ stats.totalPv || 0 }}</strong></div>
            <div class="stat"><span>留言</span><strong>{{ messages.length }}</strong></div>
            <div class="stat"><span>专题</span><strong>{{ topics.length }}</strong></div>
          </div>
          <div class="panel chart-panel">
            <h2>近 14 天 PV 趋势</h2>
            <svg class="line-chart" viewBox="0 0 700 220" preserveAspectRatio="none">
              <polyline :points="chartPoints" fill="none" stroke="#2563EB" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
              <circle v-for="point in chartDots" :key="point.x + '-' + point.y" :cx="point.x" :cy="point.y" r="4" fill="#2563EB" />
            </svg>
            <div class="chart-labels">
              <span v-for="row in stats.pvTrend || []" :key="row.date">{{ row.date }}</span>
            </div>
          </div>
          <div class="panel">
            <h2>热门页面</h2>
            <div class="bar-row" v-for="row in stats.topPages || []" :key="row.path">
              <span>{{ row.path }}</span>
              <div><i :style="{ width: barWidth(row.count) }"></i></div>
              <strong>{{ row.count }}</strong>
            </div>
          </div>
        </section>

        <section v-if="activeTab === 'topics'" class="panel split">
          <div>
            <button class="btn-primary" @click="newTopic">新建专题</button>
            <table>
              <thead><tr><th>专题</th><th>状态</th><th>上线</th><th>下线</th><th>备注</th><th>操作</th></tr></thead>
              <tbody>
                <tr v-for="item in topics" :key="item.id">
                  <td>{{ item.title }}</td><td>{{ item.status === "published" ? "已发布" : "草稿" }}</td>
                  <td>{{ item.startsAt || "-" }}</td><td>{{ item.endsAt || "-" }}</td><td>{{ item.note || "-" }}</td>
                  <td><button class="btn-small" @click="editTopic(item)">编辑</button><button class="btn-danger" @click="deleteTopic(item.id)">删除</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <form class="editor" v-if="topicForm" @submit.prevent="saveTopic">
            <h2>{{ topicForm.id ? "编辑专题" : "新建专题" }}</h2>
            <input v-model="topicForm.title" placeholder="专题标题" required />
            <input v-model="topicForm.subtitle" placeholder="专题副标题，用于首页窄条展示" />
            <input v-model="topicForm.imageUrl" placeholder="前台展示图片 URL" />
            <div class="inline-form tight">
              <input type="file" accept="image/*" @change="onTopicFile" />
              <button class="btn-small" type="button" @click="uploadTopicImage">上传专题图片</button>
            </div>
            <input v-model="topicForm.link" placeholder="点击跳转链接，可选" />
            <div class="form-grid">
              <label>上线时间<input v-model="topicForm.startsAt" type="datetime-local" /></label>
              <label>下线时间<input v-model="topicForm.endsAt" type="datetime-local" /></label>
            </div>
            <select v-model="topicForm.status"><option value="draft">草稿</option><option value="published">已发布</option></select>
            <div class="rich-tools">
              <button type="button" @click="format('bold')">加粗</button>
              <button type="button" @click="format('italic')">斜体</button>
              <button type="button" @click="format('insertUnorderedList')">列表</button>
            </div>
            <div ref="topicEditor" class="rich-editor" contenteditable @input="syncTopicContent"></div>
            <textarea v-model="topicForm.note" rows="3" placeholder="备注：填写内部说明、上下线原因或运营注意事项"></textarea>
            <button class="btn-primary">保存专题</button>
          </form>
        </section>

        <section v-if="activeTab === 'messages'" class="panel">
          <table>
            <thead><tr><th>姓名</th><th>公司</th><th>邮箱</th><th>状态</th><th>日期</th><th>备注</th><th>操作</th></tr></thead>
            <tbody>
              <tr v-for="item in messages" :key="item.id">
                <td>{{ item.name }}</td><td>{{ item.company || "-" }}</td><td>{{ item.email }}</td>
                <td><span class="badge" :class="item.status">{{ messageStatus[item.status] || item.status }}</span></td>
                <td>{{ dateOnly(item.created_at) }}</td><td>{{ item.note || "-" }}</td>
                <td><button class="btn-small" @click="editMessage(item)">回复</button></td>
              </tr>
            </tbody>
          </table>
          <form class="editor" v-if="messageForm.id" @submit.prevent="saveMessage">
            <h2>回复留言：{{ messageForm.name }}</h2>
            <p>{{ messageForm.content }}</p>
            <select v-model="messageForm.status"><option value="pending">未回复</option><option value="replied">已回复</option><option value="assigned">已分配</option></select>
            <textarea v-model="messageForm.reply" rows="4" placeholder="回复内容"></textarea>
            <textarea v-model="messageForm.note" rows="3" placeholder="备注：记录跟进人、沟通情况或后续动作"></textarea>
            <button class="btn-primary">保存回复</button>
          </form>
        </section>

        <section v-if="activeTab === 'articles'" class="panel split">
          <div>
            <button class="btn-primary" @click="newArticle">新建文章</button>
            <table>
              <thead><tr><th>标题</th><th>分类</th><th>状态</th><th>日期</th><th>备注</th><th>操作</th></tr></thead>
              <tbody>
                <tr v-for="item in articles" :key="item.id">
                  <td>{{ item.title }}</td><td>{{ item.category }}</td><td>{{ item.status === "published" ? "已发布" : "草稿" }}</td><td>{{ item.date || "-" }}</td><td>{{ item.note || "-" }}</td>
                  <td><button class="btn-small" @click="editArticle(item)">编辑</button><button class="btn-danger" @click="deleteArticle(item.id)">删除</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <form class="editor" v-if="articleForm" @submit.prevent="saveArticle">
            <h2>{{ articleForm.id ? "编辑文章" : "新建文章" }}</h2>
            <input v-model="articleForm.title" placeholder="标题" required />
            <input v-model="articleForm.category" placeholder="分类" />
            <select v-model="articleForm.status"><option value="draft">草稿</option><option value="published">已发布</option></select>
            <textarea v-model="articleForm.summary" rows="2" placeholder="摘要"></textarea>
            <textarea v-model="articleForm.content" rows="10" placeholder="正文，支持基础 HTML"></textarea>
            <textarea v-model="articleForm.note" rows="3" placeholder="备注：记录选题来源、审核意见或发布说明"></textarea>
            <button class="btn-primary">保存文章</button>
          </form>
        </section>

        <section v-if="activeTab === 'cases'" class="panel split">
          <div>
            <button class="btn-primary" @click="newCase">新建案例</button>
            <table>
              <thead><tr><th>名称</th><th>客户</th><th>行业</th><th>状态</th><th>备注</th><th>操作</th></tr></thead>
              <tbody>
                <tr v-for="item in cases" :key="item.id">
                  <td>{{ item.title }}</td><td>{{ item.client }}</td><td>{{ item.industry }}</td><td>{{ item.status === "published" ? "已发布" : "草稿" }}</td><td>{{ item.note || "-" }}</td>
                  <td><button class="btn-small" @click="editCase(item)">编辑</button><button class="btn-danger" @click="deleteCase(item.id)">删除</button></td>
                </tr>
              </tbody>
            </table>
          </div>
          <form class="editor" v-if="caseForm" @submit.prevent="saveCase">
            <h2>{{ caseForm.id ? "编辑案例" : "新建案例" }}</h2>
            <input v-model="caseForm.title" placeholder="案例名称" required />
            <input v-model="caseForm.client" placeholder="客户" />
            <input v-model="caseForm.industry" placeholder="行业" />
            <select v-model="caseForm.status"><option value="draft">草稿</option><option value="published">已发布</option></select>
            <textarea v-model="caseForm.desc" rows="4" placeholder="案例描述"></textarea>
            <input v-model="caseForm.tagsText" placeholder="标签，用逗号分隔" />
            <textarea v-model="caseForm.resultsText" rows="4" placeholder="项目成果，每行一条"></textarea>
            <input v-model="caseForm.link" placeholder="链接，可选" />
            <textarea v-model="caseForm.note" rows="3" placeholder="备注：记录客户授权、脱敏情况或展示注意事项"></textarea>
            <button class="btn-primary">保存案例</button>
          </form>
        </section>

        <section v-if="activeTab === 'categories'" class="panel">
          <form class="inline-form" @submit.prevent="saveCategory">
            <select v-model="categoryForm.type"><option value="article">文章</option><option value="case">案例</option></select>
            <input v-model="categoryForm.name" placeholder="分类名称" required />
            <input v-model="categoryForm.note" placeholder="备注：分类用途或运营说明" />
            <button class="btn-primary">新增分类</button>
          </form>
          <table>
            <thead><tr><th>类型</th><th>名称</th><th>备注</th><th>排序</th><th>操作</th></tr></thead>
            <tbody>
              <tr v-for="item in categories" :key="item.id">
                <td>{{ item.type === "article" ? "文章" : "案例" }}</td><td>{{ item.name }}</td><td>{{ item.note || "-" }}</td><td>{{ item.sort_order }}</td>
                <td><button class="btn-danger" @click="deleteCategory(item.id)">删除</button></td>
              </tr>
            </tbody>
          </table>
        </section>

        <section v-if="activeTab === 'settings'" class="panel">
          <form class="editor wide" @submit.prevent="saveSite">
            <div class="form-grid">
              <input v-model="siteForm.name" placeholder="网站名称" />
              <input v-model="siteForm.fullName" placeholder="公司全称" />
              <input v-model="siteForm.phone" placeholder="电话" />
              <input v-model="siteForm.email" placeholder="邮箱" />
              <input v-model="siteForm.address" placeholder="地址" />
              <input v-model="siteForm.icp" placeholder="备案号" />
              <input v-model="siteForm.icpUrl" placeholder="备案链接" />
              <input v-model="siteForm.bannerImage" placeholder="Banner 图片 URL" />
            </div>
            <textarea v-model="siteForm.slogan" rows="2" placeholder="首页主标题"></textarea>
            <textarea v-model="siteForm.description" rows="4" placeholder="公司简介"></textarea>
            <textarea v-model="siteForm.note" rows="3" placeholder="备注：记录站点信息变更原因或负责人"></textarea>
            <button class="btn-primary">保存站点设置</button>
          </form>
        </section>

        <section v-if="activeTab === 'media'" class="panel">
          <form class="inline-form" @submit.prevent="uploadMedia">
            <input type="file" accept="image/*" @change="onFile" />
            <input v-model="mediaNote" placeholder="备注：图片用途、授权或替换说明" />
            <button class="btn-primary">上传图片</button>
          </form>
          <div class="media-grid">
            <figure v-for="item in media" :key="item.id">
              <img :src="item.url" :alt="item.original_name" />
              <figcaption>{{ item.url }}<br />{{ item.note || "无备注" }}</figcaption>
            </figure>
          </div>
        </section>

        <section v-if="activeTab === 'audit'" class="panel">
          <table>
            <thead><tr><th>时间</th><th>管理员</th><th>动作</th><th>对象</th><th>详情</th></tr></thead>
            <tbody>
              <tr v-for="item in auditLogs" :key="item.id">
                <td>{{ item.created_at }}</td><td>{{ item.username || "-" }}</td><td>{{ item.action }}</td><td>{{ item.target_type }} #{{ item.target_id }}</td><td>{{ item.detail }}</td>
              </tr>
            </tbody>
          </table>
        </section>

        <p class="error" v-if="error">{{ error }}</p>
      </main>
    </template>
  </div>
</template>

<script setup>
import { computed, nextTick, onMounted, reactive, ref } from "vue"
import { api, loadSite } from "@/services/content.js"

const authed = ref(false)
const activeTab = ref("dashboard")
const error = ref("")
const loginForm = reactive({ username: "admin", password: "" })
const siteForm = reactive({})
const categoryForm = reactive({ type: "article", name: "", note: "" })
const messageForm = reactive({})
const articles = ref([])
const cases = ref([])
const topics = ref([])
const messages = ref([])
const categories = ref([])
const media = ref([])
const auditLogs = ref([])
const stats = ref({})
const articleForm = ref(null)
const caseForm = ref(null)
const topicForm = ref(null)
const topicEditor = ref(null)
const selectedFile = ref(null)
const selectedTopicFile = ref(null)
const mediaNote = ref("")

const tabs = [
  { id: "dashboard", label: "数据概览" },
  { id: "topics", label: "专题发布" },
  { id: "messages", label: "留言管理" },
  { id: "articles", label: "文章管理" },
  { id: "cases", label: "案例管理" },
  { id: "categories", label: "分类管理" },
  { id: "settings", label: "站点设置" },
  { id: "media", label: "媒体库" },
  { id: "audit", label: "审计日志" }
]
const currentTab = computed(() => tabs.find(t => t.id === activeTab.value))
const messageStatus = { pending: "未回复", replied: "已回复", assigned: "已分配" }

const chartDots = computed(() => {
  const rows = stats.value.pvTrend || []
  if (!rows.length) return []
  const max = Math.max(...rows.map(row => row.count), 1)
  return rows.map((row, index) => ({
    x: rows.length === 1 ? 350 : (index / (rows.length - 1)) * 680 + 10,
    y: 200 - (row.count / max) * 170
  }))
})
const chartPoints = computed(() => chartDots.value.map(point => `${point.x},${point.y}`).join(" "))

onMounted(async () => {
  try {
    await api.get("/api/auth/me")
    authed.value = true
    await loadAll()
  } catch {
    authed.value = false
  }
})

async function login() {
  error.value = ""
  try {
    await api.post("/api/auth/login", loginForm)
    authed.value = true
    await loadAll()
  } catch (err) {
    error.value = err.message
  }
}

async function logout() {
  await api.post("/api/auth/logout", {})
  authed.value = false
}

async function loadAll() {
  const [site, msg, art, cs, topicList, cat, med, logs, statData] = await Promise.all([
    api.get("/api/admin/site"),
    api.get("/api/admin/messages"),
    api.get("/api/admin/articles"),
    api.get("/api/admin/cases"),
    api.get("/api/admin/topics"),
    api.get("/api/admin/categories"),
    api.get("/api/admin/media"),
    api.get("/api/admin/audit-logs"),
    api.get("/api/admin/stats")
  ])
  Object.assign(siteForm, site)
  messages.value = msg
  articles.value = art
  cases.value = cs
  topics.value = topicList
  categories.value = cat
  media.value = med
  auditLogs.value = logs
  stats.value = statData
}

const dateOnly = (value) => String(value || "").slice(0, 10)
const barWidth = (count) => {
  const max = Math.max(...(stats.value.topPages || []).map(row => row.count), 1)
  return `${Math.max(8, (count / max) * 100)}%`
}

function editMessage(item) {
  Object.assign(messageForm, item)
}

async function saveMessage() {
  await api.patch(`/api/admin/messages/${messageForm.id}`, { status: messageForm.status, reply: messageForm.reply, note: messageForm.note })
  Object.keys(messageForm).forEach(key => delete messageForm[key])
  await loadAll()
}

function newTopic() {
  topicForm.value = { title: "", subtitle: "", imageUrl: "", link: "", content: "", status: "draft", startsAt: "", endsAt: "", note: "" }
  nextTick(() => { if (topicEditor.value) topicEditor.value.innerHTML = "" })
}

function editTopic(item) {
  topicForm.value = { ...item }
  nextTick(() => { if (topicEditor.value) topicEditor.value.innerHTML = item.content || "" })
}

function syncTopicContent(event) {
  topicForm.value.content = event.currentTarget.innerHTML
}

function format(command) {
  document.execCommand(command, false, null)
  if (topicEditor.value) topicForm.value.content = topicEditor.value.innerHTML
}

function onTopicFile(event) {
  selectedTopicFile.value = event.target.files?.[0] || null
}

async function uploadTopicImage() {
  if (!selectedTopicFile.value) return
  const form = new FormData()
  form.append("file", selectedTopicFile.value)
  form.append("note", topicForm.value.note || "专题展示图片")
  const result = await api.post("/api/admin/media", form)
  topicForm.value.imageUrl = result.url
  selectedTopicFile.value = null
  await loadAll()
}

async function saveTopic() {
  if (topicEditor.value) topicForm.value.content = topicEditor.value.innerHTML
  const item = topicForm.value
  if (item.id) await api.put(`/api/admin/topics/${item.id}`, item)
  else await api.post("/api/admin/topics", item)
  topicForm.value = null
  await loadAll()
}

async function deleteTopic(id) {
  if (!confirm("确定删除这个专题吗？")) return
  await api.delete(`/api/admin/topics/${id}`)
  await loadAll()
}

function newArticle() {
  articleForm.value = { title: "", category: "公司动态", summary: "", content: "", status: "draft", note: "" }
}

function editArticle(item) {
  articleForm.value = { ...item }
}

async function saveArticle() {
  const item = articleForm.value
  if (item.id) await api.put(`/api/admin/articles/${item.id}`, item)
  else await api.post("/api/admin/articles", item)
  articleForm.value = null
  await loadAll()
}

async function deleteArticle(id) {
  if (!confirm("确定删除这篇文章吗？")) return
  await api.delete(`/api/admin/articles/${id}`)
  await loadAll()
}

function newCase() {
  caseForm.value = { title: "", client: "", industry: "", desc: "", tagsText: "", resultsText: "", status: "draft", link: "", note: "" }
}

function editCase(item) {
  caseForm.value = { ...item, tagsText: (item.tags || []).join(","), resultsText: (item.results || []).join("\n") }
}

async function saveCase() {
  const item = {
    ...caseForm.value,
    tags: String(caseForm.value.tagsText || "").split(",").map(s => s.trim()).filter(Boolean),
    results: String(caseForm.value.resultsText || "").split("\n").map(s => s.trim()).filter(Boolean)
  }
  if (item.id) await api.put(`/api/admin/cases/${item.id}`, item)
  else await api.post("/api/admin/cases", item)
  caseForm.value = null
  await loadAll()
}

async function deleteCase(id) {
  if (!confirm("确定删除这个案例吗？")) return
  await api.delete(`/api/admin/cases/${id}`)
  await loadAll()
}

async function saveCategory() {
  await api.post("/api/admin/categories", categoryForm)
  categoryForm.name = ""
  categoryForm.note = ""
  await loadAll()
}

async function deleteCategory(id) {
  await api.delete(`/api/admin/categories/${id}`)
  await loadAll()
}

async function saveSite() {
  await api.put("/api/admin/site", siteForm)
  await loadSite()
  await loadAll()
}

function onFile(event) {
  selectedFile.value = event.target.files?.[0] || null
}

async function uploadMedia() {
  if (!selectedFile.value) return
  const form = new FormData()
  form.append("file", selectedFile.value)
  form.append("note", mediaNote.value)
  const result = await api.post("/api/admin/media", form)
  siteForm.bannerImage ||= result.url
  selectedFile.value = null
  mediaNote.value = ""
  await loadAll()
}
</script>

<style scoped>
.admin-shell { min-height: 100vh; background: #F8FAFC; color: #1E293B; }
.login-panel { min-height: 100vh; display: grid; place-items: center; padding: 24px; }
.login-card, .panel, .editor { background: #fff; border: 1px solid #E2E8F0; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,.08); }
.login-card { width: min(420px, 100%); padding: 32px; display: grid; gap: 16px; }
.login-card h1 { font-size: 26px; }
.login-card p { color: #64748B; }
label { display: grid; gap: 6px; font-weight: 600; font-size: 14px; }
input, textarea, select { width: 100%; padding: 10px 12px; border: 1px solid #CBD5E1; border-radius: 6px; background: #fff; font: inherit; }
.sidebar { position: fixed; inset: 0 auto 0 0; width: 220px; background: #0F172A; padding: 24px 16px; display: flex; flex-direction: column; gap: 6px; }
.brand { color: #fff; font-weight: 800; font-size: 18px; margin-bottom: 18px; padding: 0 8px; }
.sidebar button { text-align: left; border: 0; border-radius: 6px; padding: 11px 12px; color: #CBD5E1; background: transparent; cursor: pointer; }
.sidebar button.active, .sidebar button:hover { background: #2563EB; color: #fff; }
.sidebar .logout { margin-top: auto; color: #FCA5A5; }
.main { margin-left: 220px; padding: 28px 36px; }
.topbar { display: flex; align-items: center; justify-content: space-between; margin-bottom: 24px; }
.topbar h1 { font-size: 24px; }
.topbar a { color: #2563EB; font-weight: 600; }
.dashboard { display: grid; gap: 18px; }
.stats { display: grid; grid-template-columns: repeat(4, 1fr); gap: 18px; }
.stat { background: #fff; border: 1px solid #E2E8F0; border-radius: 8px; padding: 22px; }
.stat span { color: #64748B; font-size: 13px; }
.stat strong { display: block; font-size: 32px; margin-top: 6px; }
.panel { padding: 22px; overflow-x: auto; }
.split { display: grid; grid-template-columns: minmax(0, 1.2fr) minmax(380px, .8fr); gap: 20px; align-items: start; }
table { width: 100%; border-collapse: collapse; margin-top: 16px; }
th, td { text-align: left; padding: 12px 10px; border-bottom: 1px solid #E2E8F0; font-size: 14px; vertical-align: top; }
th { color: #64748B; background: #F8FAFC; }
.editor { padding: 18px; display: grid; gap: 12px; }
.editor h2, .panel h2 { font-size: 18px; }
.editor.wide { max-width: 960px; }
.form-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 12px; }
.inline-form { display: flex; gap: 10px; align-items: center; margin-bottom: 16px; }
.inline-form.tight { margin-bottom: 0; }
.btn-primary, .btn-small, .btn-danger { border: 0; border-radius: 6px; padding: 10px 14px; font-weight: 700; cursor: pointer; }
.btn-primary { background: #2563EB; color: #fff; }
.btn-small { background: #DBEAFE; color: #1E40AF; margin-right: 6px; }
.btn-danger { background: #FEE2E2; color: #B91C1C; }
.badge { display: inline-block; padding: 3px 10px; border-radius: 999px; font-size: 12px; font-weight: 700; background: #F1F5F9; }
.badge.pending { background: #FEF3C7; color: #92400E; }
.badge.replied { background: #DCFCE7; color: #166534; }
.badge.assigned { background: #DBEAFE; color: #1E40AF; }
.error { color: #DC2626; font-weight: 700; }
.media-grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); gap: 16px; }
.media-grid figure { border: 1px solid #E2E8F0; border-radius: 8px; overflow: hidden; background: #fff; }
.media-grid img { width: 100%; aspect-ratio: 16 / 10; object-fit: cover; }
.media-grid figcaption { padding: 8px; font-size: 12px; color: #64748B; overflow-wrap: anywhere; }
.rich-tools { display: flex; gap: 8px; }
.rich-tools button { border: 1px solid #CBD5E1; background: #F8FAFC; border-radius: 6px; padding: 6px 10px; cursor: pointer; }
.rich-editor { min-height: 160px; padding: 12px; border: 1px solid #CBD5E1; border-radius: 6px; background: #fff; line-height: 1.7; outline: none; }
.line-chart { width: 100%; height: 240px; margin-top: 12px; background: linear-gradient(#F8FAFC 1px, transparent 1px) 0 0 / 100% 44px; border: 1px solid #E2E8F0; border-radius: 8px; }
.chart-labels { display: flex; justify-content: space-between; gap: 8px; margin-top: 8px; font-size: 11px; color: #64748B; overflow: hidden; }
.bar-row { display: grid; grid-template-columns: 180px 1fr 50px; gap: 12px; align-items: center; margin-top: 12px; }
.bar-row div { height: 10px; background: #E2E8F0; border-radius: 999px; overflow: hidden; }
.bar-row i { display: block; height: 100%; background: #2563EB; }
@media (max-width: 900px) {
  .sidebar { position: static; width: auto; }
  .main { margin-left: 0; padding: 20px; }
  .stats, .split, .form-grid { grid-template-columns: 1fr; }
  .inline-form { flex-direction: column; align-items: stretch; }
  .bar-row { grid-template-columns: 1fr; }
}
</style>
