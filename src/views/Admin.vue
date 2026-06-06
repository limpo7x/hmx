<template>
  <div class="admin-root">
    <section v-if="!authed" class="login-view">
      <div class="login-orbit" aria-hidden="true"></div>
      <form class="login-card" @submit.prevent="login">
        <span class="eyebrow">CMS Control</span>
        <h1>管理后台</h1>
        <p>登录后可维护专题、文章、案例、留言和站点资料。</p>
        <label>
          <span>账号</span>
          <input v-model="loginForm.username" autocomplete="username" required />
        </label>
        <label>
          <span>密码</span>
          <input v-model="loginForm.password" type="password" autocomplete="current-password" required />
        </label>
        <button class="primary-action" type="submit">登录后台</button>
        <strong v-if="error" class="form-error">{{ error }}</strong>
      </form>
    </section>

    <template v-else>
      <aside class="admin-sidebar">
        <router-link class="brand-lockup" to="/">
          <span>宏梦线</span>
          <strong>Admin Studio</strong>
        </router-link>
        <nav>
          <button v-for="tab in tabs" :key="tab.id" :class="{ active: activeTab === tab.id }" @click="activeTab = tab.id">
            <span>{{ tab.icon }}</span>
            {{ tab.label }}
          </button>
        </nav>
        <button class="ghost-action logout" @click="logout">退出登录</button>
      </aside>

      <main class="admin-main">
        <header class="admin-topbar">
          <div>
            <span class="eyebrow">Back Office</span>
            <h1>{{ currentTab?.label }}</h1>
          </div>
          <div class="topbar-actions">
            <router-link to="/" class="ghost-action">返回前台</router-link>
            <button class="primary-action" @click="loadAll">刷新数据</button>
          </div>
        </header>

        <section v-if="activeTab === 'dashboard'" class="view-stack dashboard">
          <div class="metric-grid">
            <article class="metric-card">
              <span>今日 PV</span>
              <strong>{{ stats.todayPv || 0 }}</strong>
              <small>实时访问热度</small>
            </article>
            <article class="metric-card">
              <span>累计 PV</span>
              <strong>{{ stats.totalPv || 0 }}</strong>
              <small>全部页面访问</small>
            </article>
            <article class="metric-card">
              <span>留言线索</span>
              <strong>{{ messages.length }}</strong>
              <small>{{ pendingMessages }} 条待处理</small>
            </article>
            <article class="metric-card">
              <span>专题活动</span>
              <strong>{{ topics.length }}</strong>
              <small>{{ publishedTopics }} 个已发布</small>
            </article>
          </div>

          <div class="content-grid two">
            <section class="panel-card chart-card">
              <div class="panel-heading">
                <div>
                  <span class="eyebrow">Traffic</span>
                  <h2>近 14 天访问趋势</h2>
                </div>
              </div>
              <svg class="line-chart" viewBox="0 0 700 240" preserveAspectRatio="none">
                <defs>
                  <linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1">
                    <stop offset="0%" stop-color="#2563EB" stop-opacity="0.28" />
                    <stop offset="100%" stop-color="#10B981" stop-opacity="0.02" />
                  </linearGradient>
                </defs>
                <polygon :points="chartArea" fill="url(#chartFill)" />
                <polyline :points="chartPoints" fill="none" stroke="#2563EB" stroke-width="4" stroke-linecap="round" stroke-linejoin="round" />
                <circle v-for="point in chartDots" :key="point.x + '-' + point.y" :cx="point.x" :cy="point.y" r="5" fill="#10B981" />
              </svg>
              <div class="chart-labels">
                <span v-for="row in stats.pvTrend || []" :key="row.date">{{ row.date.slice(5) }}</span>
              </div>
            </section>

            <section class="panel-card">
              <div class="panel-heading">
                <div>
                  <span class="eyebrow">Pages</span>
                  <h2>热门页面</h2>
                </div>
              </div>
              <div class="bar-list">
                <div class="bar-row" v-for="row in stats.topPages || []" :key="row.path">
                  <span>{{ row.path }}</span>
                  <i><b :style="{ width: barWidth(row.count) }"></b></i>
                  <strong>{{ row.count }}</strong>
                </div>
              </div>
            </section>
          </div>
        </section>

        <section v-if="activeTab === 'topics'" class="view-stack">
          <div class="panel-heading command-heading">
            <div>
              <span class="eyebrow">Topic Campaign</span>
              <h2>专题发布</h2>
            </div>
            <button class="primary-action" @click="newTopic">新建专题</button>
          </div>
          <div class="content-grid split">
            <section class="panel-card table-card">
              <table>
                <thead>
                  <tr><th>专题</th><th>状态</th><th>上线</th><th>亮点</th><th>操作</th></tr>
                </thead>
                <tbody>
                  <tr v-for="item in topics" :key="item.id">
                    <td><strong>{{ item.title }}</strong><small>{{ item.subtitle }}</small></td>
                    <td><span class="status-pill" :class="item.status">{{ item.status === 'published' ? '已发布' : '草稿' }}</span></td>
                    <td>{{ item.startsAt || '-' }}</td>
                    <td>{{ (item.highlights || []).length }}</td>
                    <td class="table-actions">
                      <button class="text-action" @click="editTopic(item)">编辑</button>
                      <button class="danger-action" @click="deleteTopic(item.id)">删除</button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </section>

            <form v-if="topicForm" class="panel-card editor-card" @submit.prevent="saveTopic">
              <div class="panel-heading">
                <div>
                  <span class="eyebrow">{{ topicForm.id ? 'Edit' : 'Create' }}</span>
                  <h2>{{ topicForm.id ? '编辑专题' : '新建专题' }}</h2>
                </div>
              </div>
              <div class="form-grid two">
                <label><span>专题标题</span><input v-model="topicForm.title" required /></label>
                <label><span>发布状态</span><select v-model="topicForm.status"><option value="draft">草稿</option><option value="published">已发布</option></select></label>
              </div>
              <label><span>副标题</span><input v-model="topicForm.subtitle" /></label>
              <label><span>展示图 URL</span><input v-model="topicForm.imageUrl" /></label>
              <div class="upload-strip">
                <input type="file" accept="image/*" @change="onTopicFile" />
                <button class="ghost-action" type="button" @click="uploadTopicImage">上传专题图</button>
              </div>
              <label><span>跳转链接</span><input v-model="topicForm.link" /></label>
              <div class="form-grid two">
                <label><span>上线时间</span><input v-model="topicForm.startsAt" type="datetime-local" /></label>
                <label><span>下线时间</span><input v-model="topicForm.endsAt" type="datetime-local" /></label>
              </div>
              <label>
                <span>专题正文</span>
                <RichTextEditor v-model="topicForm.content" placeholder="输入专题详情正文" />
              </label>
              <label>
                <span>活动亮点</span>
                <textarea v-model="topicForm.highlightsText" rows="5" placeholder="每行一个亮点，可写成：标题：说明"></textarea>
              </label>
              <label>
                <span>内部备注</span>
                <RichTextEditor v-model="topicForm.note" placeholder="记录上线原因、运营事项或内部说明" :min-height="108" />
              </label>
              <button class="primary-action">保存专题</button>
            </form>
          </div>
        </section>

        <section v-if="activeTab === 'messages'" class="view-stack">
          <section class="panel-card table-card">
            <div class="panel-heading">
              <div><span class="eyebrow">Leads</span><h2>留言管理</h2></div>
            </div>
            <table>
              <thead><tr><th>姓名</th><th>公司</th><th>邮箱</th><th>状态</th><th>备注</th><th>操作</th></tr></thead>
              <tbody>
                <tr v-for="item in messages" :key="item.id">
                  <td>{{ item.name }}</td><td>{{ item.company || '-' }}</td><td>{{ item.email }}</td>
                  <td><span class="status-pill" :class="item.status">{{ messageStatus[item.status] || item.status }}</span></td>
                  <td>{{ plainText(item.note) || '-' }}</td>
                  <td><button class="text-action" @click="editMessage(item)">跟进</button></td>
                </tr>
              </tbody>
            </table>
          </section>
          <form v-if="messageForm.id" class="panel-card editor-card compact" @submit.prevent="saveMessage">
            <div class="panel-heading"><div><span class="eyebrow">Reply</span><h2>回复 {{ messageForm.name }}</h2></div></div>
            <p class="message-copy">{{ messageForm.content }}</p>
            <label><span>状态</span><select v-model="messageForm.status"><option value="pending">未回复</option><option value="replied">已回复</option><option value="assigned">已分配</option></select></label>
            <label><span>回复内容</span><RichTextEditor v-model="messageForm.reply" placeholder="输入回复内容" /></label>
            <label><span>跟进备注</span><RichTextEditor v-model="messageForm.note" placeholder="记录跟进人、沟通进展或下一步动作" :min-height="108" /></label>
            <button class="primary-action">保存回复</button>
          </form>
        </section>

        <section v-if="activeTab === 'articles'" class="view-stack">
          <div class="panel-heading command-heading"><div><span class="eyebrow">Content</span><h2>文章管理</h2></div><button class="primary-action" @click="newArticle">新建文章</button></div>
          <div class="content-grid split">
            <section class="panel-card table-card">
              <table>
                <thead><tr><th>标题</th><th>分类</th><th>状态</th><th>日期</th><th>备注</th><th>操作</th></tr></thead>
                <tbody>
                  <tr v-for="item in articles" :key="item.id">
                    <td><strong>{{ item.title }}</strong><small>{{ item.summary }}</small></td><td>{{ item.category }}</td>
                    <td><span class="status-pill" :class="item.status">{{ item.status === 'published' ? '已发布' : '草稿' }}</span></td>
                    <td>{{ item.date }}</td><td>{{ plainText(item.note) || '-' }}</td>
                    <td class="table-actions"><button class="text-action" @click="editArticle(item)">编辑</button><button class="danger-action" @click="deleteArticle(item.id)">删除</button></td>
                  </tr>
                </tbody>
              </table>
            </section>
            <form v-if="articleForm" class="panel-card editor-card" @submit.prevent="saveArticle">
              <div class="panel-heading"><div><span class="eyebrow">{{ articleForm.id ? 'Edit' : 'Create' }}</span><h2>{{ articleForm.id ? '编辑文章' : '新建文章' }}</h2></div></div>
              <div class="form-grid two">
                <label><span>标题</span><input v-model="articleForm.title" required /></label>
                <label><span>分类</span><input v-model="articleForm.category" /></label>
              </div>
              <label><span>摘要</span><textarea v-model="articleForm.summary" rows="3"></textarea></label>
              <label><span>正文</span><RichTextEditor v-model="articleForm.content" placeholder="输入文章正文" /></label>
              <div class="form-grid two">
                <label><span>状态</span><select v-model="articleForm.status"><option value="draft">草稿</option><option value="published">已发布</option></select></label>
                <label><span>发布日期</span><input v-model="articleForm.date" type="date" /></label>
              </div>
              <label><span>内部备注</span><RichTextEditor v-model="articleForm.note" placeholder="文章维护备注" :min-height="108" /></label>
              <button class="primary-action">保存文章</button>
            </form>
          </div>
        </section>

        <section v-if="activeTab === 'cases'" class="view-stack">
          <div class="panel-heading command-heading"><div><span class="eyebrow">Cases</span><h2>案例管理</h2></div><button class="primary-action" @click="newCase">新建案例</button></div>
          <div class="content-grid split">
            <section class="panel-card table-card">
              <table>
                <thead><tr><th>案例</th><th>客户</th><th>行业</th><th>状态</th><th>操作</th></tr></thead>
                <tbody>
                  <tr v-for="item in cases" :key="item.id">
                    <td><strong>{{ item.title }}</strong><small>{{ plainText(item.desc) }}</small></td><td>{{ item.client }}</td><td>{{ item.industry }}</td>
                    <td><span class="status-pill" :class="item.status">{{ item.status === 'published' ? '已发布' : '草稿' }}</span></td>
                    <td class="table-actions"><button class="text-action" @click="editCase(item)">编辑</button><button class="danger-action" @click="deleteCase(item.id)">删除</button></td>
                  </tr>
                </tbody>
              </table>
            </section>
            <form v-if="caseForm" class="panel-card editor-card" @submit.prevent="saveCase">
              <div class="panel-heading"><div><span class="eyebrow">{{ caseForm.id ? 'Edit' : 'Create' }}</span><h2>{{ caseForm.id ? '编辑案例' : '新建案例' }}</h2></div></div>
              <div class="form-grid two">
                <label><span>案例标题</span><input v-model="caseForm.title" required /></label>
                <label><span>客户名称</span><input v-model="caseForm.client" /></label>
              </div>
              <div class="form-grid two">
                <label><span>行业</span><input v-model="caseForm.industry" /></label>
                <label><span>状态</span><select v-model="caseForm.status"><option value="draft">草稿</option><option value="published">已发布</option></select></label>
              </div>
              <label><span>案例说明</span><RichTextEditor v-model="caseForm.desc" placeholder="输入案例说明" /></label>
              <label><span>结果数据</span><textarea v-model="caseForm.resultsText" rows="4" placeholder="每行一个结果"></textarea></label>
              <label><span>标签</span><input v-model="caseForm.tagsText" placeholder="用逗号分隔" /></label>
              <label><span>内部备注</span><RichTextEditor v-model="caseForm.note" placeholder="案例维护备注" :min-height="108" /></label>
              <button class="primary-action">保存案例</button>
            </form>
          </div>
        </section>

        <section v-if="activeTab === 'categories'" class="view-stack">
          <div class="panel-heading command-heading"><div><span class="eyebrow">Taxonomy</span><h2>分类管理</h2></div><button class="primary-action" @click="newCategory">新建分类</button></div>
          <div class="content-grid split slim">
            <section class="panel-card table-card">
              <table>
                <thead><tr><th>类型</th><th>名称</th><th>排序</th><th>备注</th><th>操作</th></tr></thead>
                <tbody>
                  <tr v-for="item in categories" :key="item.id">
                    <td>{{ item.type }}</td><td>{{ item.name }}</td><td>{{ item.sortOrder }}</td><td>{{ item.note || '-' }}</td>
                    <td class="table-actions"><button class="text-action" @click="editCategory(item)">编辑</button><button class="danger-action" @click="deleteCategory(item.id)">删除</button></td>
                  </tr>
                </tbody>
              </table>
            </section>
            <form v-if="categoryForm" class="panel-card editor-card compact" @submit.prevent="saveCategory">
              <div class="panel-heading"><div><span class="eyebrow">{{ categoryForm.id ? 'Edit' : 'Create' }}</span><h2>{{ categoryForm.id ? '编辑分类' : '新建分类' }}</h2></div></div>
              <label><span>类型</span><select v-model="categoryForm.type"><option value="article">文章</option><option value="case">案例</option><option value="topic">专题</option></select></label>
              <label><span>名称</span><input v-model="categoryForm.name" required /></label>
              <label><span>排序</span><input v-model.number="categoryForm.sortOrder" type="number" /></label>
              <label><span>备注</span><textarea v-model="categoryForm.note" rows="3"></textarea></label>
              <button class="primary-action">保存分类</button>
            </form>
          </div>
        </section>

        <section v-if="activeTab === 'settings'" class="view-stack">
          <form class="panel-card editor-card wide" @submit.prevent="saveSite">
            <div class="panel-heading"><div><span class="eyebrow">Site</span><h2>站点设置</h2></div></div>
            <div class="form-grid two">
              <label><span>站点名称</span><input v-model="siteForm.name" /></label>
              <label><span>联系电话</span><input v-model="siteForm.phone" /></label>
            </div>
            <label><span>一句话介绍</span><textarea v-model="siteForm.description" rows="3"></textarea></label>
            <label><span>标语</span><input v-model="siteForm.slogan" /></label>
            <div class="form-grid two">
              <label><span>邮箱</span><input v-model="siteForm.email" /></label>
              <label><span>地址</span><input v-model="siteForm.address" /></label>
            </div>
            <button class="primary-action">保存站点设置</button>
          </form>
        </section>

        <section v-if="activeTab === 'media'" class="view-stack">
          <section class="panel-card">
            <div class="panel-heading">
              <div><span class="eyebrow">Assets</span><h2>媒体资源</h2></div>
              <div class="upload-strip"><input type="file" accept="image/*" @change="onMediaFile" /><button class="primary-action" @click="uploadMedia">上传图片</button></div>
            </div>
            <div class="media-grid">
              <article v-for="item in media" :key="item.id" class="media-card">
                <img :src="item.url" :alt="item.alt || item.filename" />
                <strong>{{ item.filename }}</strong>
                <span>{{ item.url }}</span>
              </article>
            </div>
          </section>
        </section>

        <section v-if="activeTab === 'audit'" class="view-stack">
          <section class="panel-card table-card">
            <div class="panel-heading"><div><span class="eyebrow">Logs</span><h2>操作日志</h2></div></div>
            <table>
              <thead><tr><th>时间</th><th>动作</th><th>对象</th><th>详情</th></tr></thead>
              <tbody>
                <tr v-for="item in logs" :key="item.id">
                  <td>{{ item.created_at }}</td><td>{{ item.action }}</td><td>{{ item.entity }} #{{ item.entity_id }}</td><td>{{ item.detail || '-' }}</td>
                </tr>
              </tbody>
            </table>
          </section>
        </section>
      </main>
    </template>
  </div>
</template>

<script setup>
import { computed, defineComponent, h, nextTick, onMounted, ref, watch } from "vue"
import { api } from "@/services/content.js"

const RichTextEditor = defineComponent({
  name: "RichTextEditor",
  props: {
    modelValue: { type: String, default: "" },
    placeholder: { type: String, default: "输入内容" },
    minHeight: { type: Number, default: 156 }
  },
  emits: ["update:modelValue"],
  setup(props, { emit }) {
    const editor = ref(null)
    const actions = [
      ["bold", "B"],
      ["italic", "I"],
      ["underline", "U"],
      ["insertUnorderedList", "•"],
      ["insertOrderedList", "1."],
      ["formatBlock", "H2", "h2"],
      ["formatBlock", "引用", "blockquote"]
    ]
    const sync = () => emit("update:modelValue", editor.value?.innerHTML || "")
    const run = (item) => {
      document.execCommand(item[0], false, item[2] || null)
      sync()
      nextTick(() => editor.value?.focus())
    }
    watch(() => props.modelValue, (value) => {
      if (editor.value && editor.value.innerHTML !== (value || "")) editor.value.innerHTML = value || ""
    })
    onMounted(() => {
      if (editor.value) editor.value.innerHTML = props.modelValue || ""
    })
    return () => h("div", { class: "rtf" }, [
      h("div", { class: "rtf-toolbar" }, actions.map((item) => h("button", {
        type: "button",
        title: item[1],
        onMousedown: (event) => event.preventDefault(),
        onClick: () => run(item)
      }, item[1]))),
      h("div", {
        ref: editor,
        class: "rtf-editor",
        contenteditable: "true",
        "data-placeholder": props.placeholder,
        style: { minHeight: `${props.minHeight}px` },
        onInput: sync,
        onBlur: sync
      })
    ])
  }
})

const tabs = [
  { id: "dashboard", label: "数据概览", icon: "01" },
  { id: "topics", label: "专题发布", icon: "02" },
  { id: "messages", label: "留言管理", icon: "03" },
  { id: "articles", label: "文章管理", icon: "04" },
  { id: "cases", label: "案例管理", icon: "05" },
  { id: "categories", label: "分类管理", icon: "06" },
  { id: "settings", label: "站点设置", icon: "07" },
  { id: "media", label: "媒体资源", icon: "08" },
  { id: "audit", label: "操作日志", icon: "09" }
]

const authed = ref(false)
const error = ref("")
const activeTab = ref("dashboard")
const loginForm = ref({ username: "", password: "" })
const stats = ref({})
const messages = ref([])
const articles = ref([])
const cases = ref([])
const topics = ref([])
const categories = ref([])
const media = ref([])
const logs = ref([])
const siteForm = ref({})
const topicForm = ref(null)
const articleForm = ref(null)
const caseForm = ref(null)
const categoryForm = ref(null)
const messageForm = ref({})
const topicFile = ref(null)
const mediaFile = ref(null)

const messageStatus = { pending: "未回复", replied: "已回复", assigned: "已分配" }
const currentTab = computed(() => tabs.find((tab) => tab.id === activeTab.value))
const pendingMessages = computed(() => messages.value.filter((item) => item.status === "pending").length)
const publishedTopics = computed(() => topics.value.filter((item) => item.status === "published").length)
const maxPv = computed(() => Math.max(...(stats.value.pvTrend || []).map((row) => row.count), 1))
const chartDots = computed(() => (stats.value.pvTrend || []).map((row, index, arr) => {
  const x = arr.length <= 1 ? 350 : 28 + index * (644 / (arr.length - 1))
  const y = 212 - (row.count / maxPv.value) * 176
  return { x, y }
}))
const chartPoints = computed(() => chartDots.value.map((point) => `${point.x},${point.y}`).join(" "))
const chartArea = computed(() => chartDots.value.length ? `28,224 ${chartPoints.value} 672,224` : "")

function textToLines(value) {
  return String(value || "").split(/\r?\n/).map((line) => line.trim()).filter(Boolean)
}

function listToText(value) {
  return Array.isArray(value) ? value.join("\n") : ""
}

function plainText(value) {
  return String(value || "").replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").trim()
}

function barWidth(count) {
  const max = Math.max(...(stats.value.topPages || []).map((row) => row.count), 1)
  return `${Math.max(8, Math.round((count / max) * 100))}%`
}

async function login() {
  error.value = ""
  try {
    await api.post("/api/auth/login", loginForm.value)
    authed.value = true
    await loadAll()
  } catch (err) {
    error.value = err.message || "登录失败"
  }
}

async function logout() {
  await api.post("/api/auth/logout", {})
  authed.value = false
}

async function loadAll() {
  const [site, msg, art, cs, topicList, cat, med, auditRows, statData] = await Promise.all([
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
  siteForm.value = site || {}
  messages.value = msg
  articles.value = art
  cases.value = cs
  topics.value = topicList
  categories.value = cat
  media.value = med
  logs.value = auditRows
  stats.value = statData
}

function newTopic() {
  topicForm.value = { title: "", subtitle: "", imageUrl: "", link: "", content: "", highlightsText: "", status: "draft", startsAt: "", endsAt: "", note: "" }
}

function editTopic(item) {
  topicForm.value = { ...item, highlightsText: listToText(item.highlights) }
}

async function saveTopic() {
  const item = { ...topicForm.value, highlights: textToLines(topicForm.value.highlightsText) }
  delete item.highlightsText
  if (item.id) await api.put(`/api/admin/topics/${item.id}`, item)
  else await api.post("/api/admin/topics", item)
  topicForm.value = null
  await loadAll()
}

async function deleteTopic(id) {
  if (!confirm("确认删除这个专题？")) return
  await api.delete(`/api/admin/topics/${id}`)
  await loadAll()
}

function onTopicFile(event) {
  topicFile.value = event.target.files?.[0] || null
}

async function uploadTopicImage() {
  if (!topicFile.value) return
  const result = await uploadFile(topicFile.value)
  if (topicForm.value) topicForm.value.imageUrl = result.url
}

function editMessage(item) {
  messageForm.value = { ...item }
}

async function saveMessage() {
  await api.patch(`/api/admin/messages/${messageForm.value.id}`, messageForm.value)
  messageForm.value = {}
  await loadAll()
}

function newArticle() {
  articleForm.value = { title: "", category: "公司动态", summary: "", content: "", status: "draft", date: "", note: "" }
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
  if (!confirm("确认删除这篇文章？")) return
  await api.delete(`/api/admin/articles/${id}`)
  await loadAll()
}

function newCase() {
  caseForm.value = { title: "", client: "", industry: "", desc: "", resultsText: "", tagsText: "", status: "draft", link: "", note: "", date: "" }
}

function editCase(item) {
  caseForm.value = { ...item, resultsText: listToText(item.results), tagsText: Array.isArray(item.tags) ? item.tags.join(", ") : "" }
}

async function saveCase() {
  const item = {
    ...caseForm.value,
    results: textToLines(caseForm.value.resultsText),
    tags: String(caseForm.value.tagsText || "").split(/[,，]/).map((tag) => tag.trim()).filter(Boolean)
  }
  delete item.resultsText
  delete item.tagsText
  if (item.id) await api.put(`/api/admin/cases/${item.id}`, item)
  else await api.post("/api/admin/cases", item)
  caseForm.value = null
  await loadAll()
}

async function deleteCase(id) {
  if (!confirm("确认删除这个案例？")) return
  await api.delete(`/api/admin/cases/${id}`)
  await loadAll()
}

function newCategory() {
  categoryForm.value = { type: "article", name: "", sortOrder: 0, note: "" }
}

function editCategory(item) {
  categoryForm.value = { ...item }
}

async function saveCategory() {
  const item = categoryForm.value
  if (item.id) await api.put(`/api/admin/categories/${item.id}`, item)
  else await api.post("/api/admin/categories", item)
  categoryForm.value = null
  await loadAll()
}

async function deleteCategory(id) {
  if (!confirm("确认删除这个分类？")) return
  await api.delete(`/api/admin/categories/${id}`)
  await loadAll()
}

async function saveSite() {
  await api.put("/api/admin/site", siteForm.value)
  await loadAll()
}

function onMediaFile(event) {
  mediaFile.value = event.target.files?.[0] || null
}

async function uploadMedia() {
  if (!mediaFile.value) return
  await uploadFile(mediaFile.value)
  mediaFile.value = null
  await loadAll()
}

async function uploadFile(file) {
  const formData = new FormData()
  formData.append("file", file)
  return api.upload("/api/admin/media", formData)
}

onMounted(async () => {
  try {
    await api.get("/api/auth/me")
    authed.value = true
    await loadAll()
  } catch {
    authed.value = false
  }
})
</script>

<style scoped>
.admin-root {
  min-height: 100vh;
  color: #111827;
  background:
    linear-gradient(120deg, rgba(37, 99, 235, 0.08), transparent 34%),
    linear-gradient(180deg, #F7FAFC 0%, #EEF4F7 100%);
}

.login-view {
  position: relative;
  display: grid;
  min-height: 100vh;
  place-items: center;
  overflow: hidden;
  padding: 28px;
  color: #FFFFFF;
  background: #07111F;
}

.login-view::before {
  position: absolute;
  inset: 0;
  content: "";
  opacity: 0.45;
  background-image:
    linear-gradient(rgba(255,255,255,0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255,255,255,0.08) 1px, transparent 1px);
  background-size: 48px 48px;
  animation: admin-grid 18s linear infinite;
}

.login-orbit {
  position: absolute;
  width: 520px;
  height: 520px;
  border: 1px solid rgba(16, 185, 129, 0.32);
  border-radius: 50%;
  animation: spin-slow 14s linear infinite;
}

.login-orbit::before {
  position: absolute;
  top: 44px;
  left: 118px;
  width: 14px;
  height: 14px;
  content: "";
  border-radius: 999px;
  background: #10B981;
  box-shadow: 0 0 30px #10B981;
}

.login-card {
  position: relative;
  z-index: 1;
  width: min(430px, 100%);
  padding: 34px;
  border: 1px solid rgba(255, 255, 255, 0.18);
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.78);
  box-shadow: 0 28px 80px rgba(0, 0, 0, 0.38);
  backdrop-filter: blur(18px);
}

.login-card h1,
.admin-topbar h1,
.panel-heading h2 {
  margin: 0;
  letter-spacing: 0;
}

.login-card p {
  margin: 12px 0 24px;
  color: rgba(255, 255, 255, 0.68);
}

.eyebrow {
  display: inline-flex;
  margin-bottom: 8px;
  color: #2563EB;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: 0;
  text-transform: uppercase;
}

.login-card .eyebrow {
  color: #34D399;
}

.admin-sidebar {
  position: fixed;
  inset: 0 auto 0 0;
  z-index: 10;
  display: flex;
  width: 248px;
  flex-direction: column;
  gap: 22px;
  padding: 24px 18px;
  color: #E5EDF7;
  background: #07111F;
  box-shadow: 18px 0 50px rgba(15, 23, 42, 0.18);
}

.brand-lockup {
  display: grid;
  gap: 4px;
  padding: 12px 12px 18px;
  color: #FFFFFF;
}

.brand-lockup span {
  font-size: 20px;
  font-weight: 900;
}

.brand-lockup strong {
  color: #7DD3FC;
  font-size: 12px;
}

.admin-sidebar nav {
  display: grid;
  gap: 6px;
}

.admin-sidebar button,
.primary-action,
.ghost-action,
.text-action,
.danger-action,
.rtf-toolbar button {
  border: 0;
  cursor: pointer;
  font: inherit;
}

.admin-sidebar nav button {
  display: flex;
  align-items: center;
  gap: 10px;
  min-height: 44px;
  padding: 0 12px;
  border-radius: 8px;
  color: rgba(229, 237, 247, 0.72);
  background: transparent;
  text-align: left;
  transition: color 0.2s ease, background 0.2s ease, transform 0.2s ease;
}

.admin-sidebar nav button span {
  display: grid;
  width: 26px;
  height: 26px;
  place-items: center;
  border-radius: 8px;
  color: #93C5FD;
  background: rgba(255, 255, 255, 0.08);
  font-size: 11px;
  font-weight: 900;
}

.admin-sidebar nav button.active,
.admin-sidebar nav button:hover {
  color: #FFFFFF;
  background: rgba(37, 99, 235, 0.28);
  transform: translateX(3px);
}

.logout {
  margin-top: auto;
}

.admin-main {
  min-height: 100vh;
  margin-left: 248px;
  padding: 30px;
}

.admin-topbar,
.panel-heading,
.command-heading {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 18px;
}

.admin-topbar {
  margin-bottom: 24px;
}

.topbar-actions,
.table-actions,
.upload-strip {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.primary-action,
.ghost-action {
  display: inline-flex;
  min-height: 42px;
  align-items: center;
  justify-content: center;
  padding: 0 18px;
  border-radius: 8px;
  font-weight: 800;
  transition: transform 0.2s ease, box-shadow 0.2s ease, background 0.2s ease;
}

.primary-action {
  color: #FFFFFF;
  background: linear-gradient(135deg, #2563EB, #0891B2);
  box-shadow: 0 14px 28px rgba(37, 99, 235, 0.22);
}

.ghost-action {
  color: #0F172A;
  background: #FFFFFF;
  border: 1px solid #DDE7EF;
}

.primary-action:hover,
.ghost-action:hover,
.text-action:hover {
  transform: translateY(-1px);
}

.view-stack {
  display: grid;
  gap: 20px;
}

.metric-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 16px;
}

.metric-card,
.panel-card {
  border: 1px solid rgba(148, 163, 184, 0.24);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.86);
  box-shadow: 0 18px 50px rgba(15, 23, 42, 0.08);
}

.metric-card {
  position: relative;
  overflow: hidden;
  padding: 22px;
}

.metric-card::after {
  position: absolute;
  inset: auto -20px -36px auto;
  width: 128px;
  height: 128px;
  content: "";
  border-radius: 50%;
  background: rgba(16, 185, 129, 0.14);
  animation: pulse-halo 3.8s ease-in-out infinite;
}

.metric-card span,
label span {
  color: #64748B;
  font-size: 13px;
  font-weight: 800;
}

.metric-card strong {
  display: block;
  margin: 10px 0 6px;
  font-size: 34px;
  line-height: 1;
}

.metric-card small,
td small {
  display: block;
  color: #64748B;
  font-size: 12px;
  line-height: 1.55;
}

.content-grid {
  display: grid;
  gap: 20px;
}

.content-grid.two {
  grid-template-columns: minmax(0, 1.35fr) minmax(340px, 0.65fr);
}

.content-grid.split {
  grid-template-columns: minmax(0, 1fr) minmax(420px, 0.65fr);
  align-items: start;
}

.content-grid.slim {
  grid-template-columns: minmax(0, 1fr) minmax(360px, 0.45fr);
}

.panel-card {
  padding: 22px;
}

.table-card {
  overflow: auto;
}

.chart-card {
  min-height: 340px;
}

.line-chart {
  width: 100%;
  height: 240px;
  margin-top: 18px;
}

.chart-labels {
  display: flex;
  justify-content: space-between;
  gap: 8px;
  color: #94A3B8;
  font-size: 11px;
}

.bar-list {
  display: grid;
  gap: 16px;
  margin-top: 22px;
}

.bar-row {
  display: grid;
  grid-template-columns: minmax(90px, 1fr) minmax(120px, 1.2fr) 44px;
  align-items: center;
  gap: 12px;
  color: #334155;
  font-size: 13px;
}

.bar-row i {
  height: 8px;
  overflow: hidden;
  border-radius: 999px;
  background: #E2E8F0;
}

.bar-row b {
  display: block;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(90deg, #2563EB, #10B981);
}

table {
  width: 100%;
  border-collapse: collapse;
  min-width: 720px;
}

th,
td {
  padding: 14px 12px;
  border-bottom: 1px solid #E6EDF3;
  text-align: left;
  vertical-align: top;
}

th {
  color: #64748B;
  font-size: 12px;
  text-transform: uppercase;
}

td {
  color: #1F2937;
  font-size: 14px;
}

.status-pill {
  display: inline-flex;
  min-width: 58px;
  justify-content: center;
  padding: 5px 9px;
  border-radius: 999px;
  color: #475569;
  background: #E2E8F0;
  font-size: 12px;
  font-weight: 800;
}

.status-pill.published,
.status-pill.replied {
  color: #047857;
  background: #D1FAE5;
}

.status-pill.pending,
.status-pill.draft {
  color: #B45309;
  background: #FEF3C7;
}

.status-pill.assigned {
  color: #1D4ED8;
  background: #DBEAFE;
}

.text-action,
.danger-action {
  padding: 6px 0;
  color: #2563EB;
  background: transparent;
  font-weight: 800;
}

.danger-action {
  color: #DC2626;
}

.editor-card {
  display: grid;
  gap: 16px;
}

.editor-card.compact {
  max-width: 760px;
}

.editor-card.wide {
  max-width: 960px;
}

.form-grid {
  display: grid;
  gap: 14px;
}

.form-grid.two {
  grid-template-columns: repeat(2, minmax(0, 1fr));
}

label {
  display: grid;
  gap: 8px;
}

input,
select,
textarea {
  width: 100%;
  border: 1px solid #D7E1EA;
  border-radius: 8px;
  background: #FFFFFF;
  color: #111827;
  font: inherit;
  outline: none;
  transition: border 0.2s ease, box-shadow 0.2s ease;
}

input,
select {
  height: 44px;
  padding: 0 12px;
}

textarea {
  min-height: 108px;
  padding: 12px;
  resize: vertical;
}

input:focus,
select:focus,
textarea:focus,
.rtf:focus-within {
  border-color: #2563EB;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
}

.rtf {
  overflow: hidden;
  border: 1px solid #D7E1EA;
  border-radius: 8px;
  background: #FFFFFF;
}

.rtf-toolbar {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  padding: 8px;
  border-bottom: 1px solid #E6EDF3;
  background: #F8FAFC;
}

.rtf-toolbar button {
  min-width: 34px;
  height: 30px;
  border-radius: 8px;
  color: #1E293B;
  background: #FFFFFF;
  font-weight: 900;
}

.rtf-toolbar button:hover {
  background: #DBEAFE;
}

.rtf-editor {
  padding: 13px 14px;
  outline: none;
  line-height: 1.8;
}

.rtf-editor:empty::before {
  content: attr(data-placeholder);
  color: #94A3B8;
}

.rtf-editor :deep(h2) {
  margin: 0.6em 0 0.35em;
  font-size: 22px;
}

.rtf-editor :deep(blockquote) {
  margin: 10px 0;
  padding: 10px 14px;
  border-left: 3px solid #2563EB;
  background: #EFF6FF;
}

.message-copy {
  margin: 0;
  padding: 14px;
  border-radius: 8px;
  color: #475569;
  background: #F8FAFC;
  line-height: 1.7;
}

.media-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
  gap: 16px;
  margin-top: 18px;
}

.media-card {
  display: grid;
  gap: 8px;
  padding: 10px;
  border: 1px solid #E2E8F0;
  border-radius: 8px;
  background: #FFFFFF;
}

.media-card img {
  width: 100%;
  aspect-ratio: 16 / 10;
  object-fit: cover;
  border-radius: 8px;
}

.media-card span {
  overflow: hidden;
  color: #64748B;
  font-size: 12px;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.form-error {
  display: block;
  margin-top: 14px;
  color: #FCA5A5;
}

@keyframes admin-grid {
  from { background-position: 0 0; }
  to { background-position: 48px 48px; }
}

@keyframes spin-slow {
  to { transform: rotate(360deg); }
}

@keyframes pulse-halo {
  0%, 100% { transform: scale(0.92); opacity: 0.65; }
  50% { transform: scale(1.08); opacity: 1; }
}

@media (max-width: 1080px) {
  .admin-sidebar {
    position: sticky;
    top: 0;
    width: auto;
    min-height: auto;
  }

  .admin-sidebar nav {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .admin-main {
    margin-left: 0;
  }

  .metric-grid,
  .content-grid.two,
  .content-grid.split,
  .content-grid.slim {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 720px) {
  .admin-main {
    padding: 18px;
  }

  .admin-topbar,
  .panel-heading,
  .command-heading,
  .topbar-actions {
    align-items: flex-start;
    flex-direction: column;
  }

  .metric-grid,
  .form-grid.two {
    grid-template-columns: 1fr;
  }

  .admin-sidebar nav {
    grid-template-columns: 1fr;
  }
}
</style>
