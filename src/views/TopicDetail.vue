<template>
  <div class="page topic-detail">
    <section class="topic-hero">
      <div class="topic-bg" aria-hidden="true"></div>
      <div class="container topic-hero-grid">
        <div class="topic-copy">
          <span class="page-kicker">专题发布 / Featured Topic</span>
          <h1>{{ topicTitle }}</h1>
          <p>{{ topicSubtitle }}</p>
          <div class="topic-actions">
            <router-link to="/contact" class="btn-primary">预约专题咨询</router-link>
            <router-link to="/solutions" class="btn-outline">查看解决方案</router-link>
          </div>
        </div>

        <div class="topic-visual hero-panel">
          <img v-if="topic?.imageUrl" :src="topic.imageUrl" :alt="topicTitle" />
          <div v-else class="topic-fallback">
            <span>AI</span>
            <strong>Agent</strong>
          </div>
          <div class="topic-live">
            <span class="status-dot">专题进行中</span>
            <strong>{{ activeWindow }}</strong>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-gray">
      <div class="container topic-layout">
        <main class="topic-main">
          <article class="topic-content glass-card">
            <span class="content-label">专题介绍</span>
            <div v-if="topic?.content" class="rich-content" v-html="topic.content"></div>
            <div v-else class="rich-content">
              <p>本专题聚焦企业 AI 智能体搭建，从知识库、业务流程、工具调用到上线运维，帮助企业判断智能体项目如何落地。</p>
            </div>
          </article>

          <section class="topic-section">
            <span class="content-label">活动亮点</span>
            <div class="highlight-grid">
              <div class="highlight-card dynamic-card" v-for="item in highlights" :key="item.title">
                <span>{{ item.index }}</span>
                <h3>{{ item.title }}</h3>
                <p>{{ item.desc }}</p>
              </div>
            </div>
          </section>

          <section class="topic-section">
            <span class="content-label">搭建路径</span>
            <div class="build-flow">
              <div class="flow-step" v-for="step in buildSteps" :key="step.title">
                <strong>{{ step.title }}</strong>
                <p>{{ step.desc }}</p>
              </div>
            </div>
          </section>
        </main>

        <aside class="topic-aside">
          <div class="aside-card dynamic-card">
            <span class="status-dot">后台数据同步</span>
            <dl>
              <div>
                <dt>专题状态</dt>
                <dd>{{ topic?.status === "published" ? "已发布" : "预览" }}</dd>
              </div>
              <div>
                <dt>上线时间</dt>
                <dd>{{ formatDate(topic?.startsAt) }}</dd>
              </div>
              <div>
                <dt>下线时间</dt>
                <dd>{{ formatDate(topic?.endsAt) }}</dd>
              </div>
            </dl>
          </div>

          <div class="aside-card cta-card dynamic-card">
            <h2>想把 AI 智能体接入你的业务？</h2>
            <p>留下需求，我们帮你判断知识库、流程自动化和系统集成的优先级。</p>
            <router-link to="/contact" class="btn-primary">获取搭建建议</router-link>
          </div>
        </aside>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <h2>从专题了解方法，从咨询开始落地</h2>
        <p>我们会结合你的业务流程、数据基础和系统现状，给出更具体的智能体建设路径。</p>
        <router-link to="/contact" class="btn-primary">立即咨询</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { api } from "@/services/content.js"

const route = useRoute()
const topic = ref(null)

const topicTitle = computed(() => topic.value?.title || "企业AI智能体搭建专题活动")
const topicSubtitle = computed(() => topic.value?.subtitle || "从知识库到业务流程自动化，打造可落地的企业级智能体。")

const activeWindow = computed(() => {
  const start = formatDate(topic.value?.startsAt)
  const end = formatDate(topic.value?.endsAt)
  if (start === "-" && end === "-") return "长期开放"
  return `${start} - ${end}`
})

const defaultHighlights = [
  { index: "01", title: "知识库智能问答", desc: "把制度、产品、案例和文档接入智能体，让员工和客户更快获得答案。" },
  { index: "02", title: "业务流程自动化", desc: "让智能体连接审批、工单、CRM、订单等系统，处理重复流程。" },
  { index: "03", title: "工具调用与系统集成", desc: "通过接口、插件和权限控制，让智能体安全访问企业能力。" },
  { index: "04", title: "上线运维与持续优化", desc: "从提示词、知识更新、日志监控到效果评估，形成可运营闭环。" }
]

const highlights = computed(() => {
  const custom = Array.isArray(topic.value?.highlights) ? topic.value.highlights : []
  if (!custom.length) return defaultHighlights
  return custom.map((line, index) => {
    const text = String(line || "").trim()
    const separator = text.includes("：") ? "：" : text.includes(":") ? ":" : ""
    const title = separator ? text.split(separator).shift().trim() : `活动亮点 ${index + 1}`
    const desc = separator ? text.split(separator).slice(1).join(separator).trim() : text
    return { index: String(index + 1).padStart(2, "0"), title, desc }
  })
})

const buildSteps = [
  { title: "场景诊断", desc: "确定智能体要解决的问题、服务对象和业务边界。" },
  { title: "知识与流程梳理", desc: "整理知识来源、工具接口、权限角色和关键流程。" },
  { title: "原型验证", desc: "快速搭建可演示智能体，验证问答质量与流程可行性。" },
  { title: "集成上线", desc: "接入企业系统，配置监控、日志、安全和持续优化机制。" }
]

function formatDate(value) {
  if (!value) return "-"
  return String(value).replace("T", " ").slice(0, 16)
}

onMounted(async () => {
  topic.value = await api.get(`/api/topics/${route.params.id}`).catch(() => null)
})
</script>

<style scoped>
.topic-hero {
  position: relative;
  overflow: hidden;
  padding: 148px 0 86px;
  color: #FFFFFF;
  background: linear-gradient(135deg, #020817, #07162D 58%, #0B3B86);
}

.topic-bg,
.topic-bg::before,
.topic-bg::after {
  position: absolute;
  inset: 0;
  content: "";
  pointer-events: none;
}

.topic-bg {
  background:
    radial-gradient(circle at 74% 22%, rgba(56, 189, 248, 0.25), transparent 30%),
    radial-gradient(circle at 22% 78%, rgba(16, 185, 129, 0.16), transparent 26%);
}

.topic-bg::before {
  opacity: 0.2;
  background-image:
    linear-gradient(rgba(255, 255, 255, 0.08) 1px, transparent 1px),
    linear-gradient(90deg, rgba(255, 255, 255, 0.08) 1px, transparent 1px);
  background-size: 58px 58px;
  animation: grid-drift 22s linear infinite;
}

.topic-bg::after {
  top: 26%;
  left: -20%;
  height: 2px;
  width: 58%;
  background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.95), rgba(16, 185, 129, 0.7), transparent);
  animation: scan-line 5.8s ease-in-out infinite;
}

.topic-hero-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 0.95fr) minmax(360px, 0.8fr);
  gap: 72px;
  align-items: center;
}

.topic-copy h1 {
  max-width: 760px;
  margin-bottom: 20px;
  font-size: 50px;
  line-height: 1.18;
}

.topic-copy p {
  max-width: 620px;
  color: rgba(255, 255, 255, 0.78);
  font-size: 17px;
  line-height: 1.8;
}

.topic-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
  margin-top: 34px;
}

.btn-primary,
.btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 26px;
  border-radius: 8px;
  font-weight: 800;
  transition: transform var(--transition), box-shadow var(--transition), background var(--transition);
}

.btn-primary {
  color: #FFFFFF;
  background: #0B63F6;
  box-shadow: 0 16px 34px rgba(11, 99, 246, 0.34);
}

.btn-outline {
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.36);
  background: rgba(255, 255, 255, 0.08);
}

.btn-primary:hover,
.btn-outline:hover {
  transform: translateY(-2px);
}

.topic-visual {
  padding: 16px;
}

.topic-visual img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
  border-radius: 8px;
}

.topic-fallback {
  display: grid;
  place-items: center;
  aspect-ratio: 16 / 9;
  border-radius: 8px;
  background:
    radial-gradient(circle at 70% 30%, rgba(56, 189, 248, 0.34), transparent 35%),
    linear-gradient(135deg, #0F172A, #0B3B86);
}

.topic-fallback span,
.topic-fallback strong {
  display: block;
  color: #FFFFFF;
}

.topic-fallback span {
  font-size: 52px;
  font-weight: 900;
}

.topic-fallback strong {
  margin-top: -18px;
  color: #93C5FD;
}

.topic-live {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 16px;
  padding: 16px;
  border: 1px solid rgba(255, 255, 255, 0.14);
  border-radius: 8px;
  background: rgba(255, 255, 255, 0.08);
}

.topic-live strong {
  color: #FFFFFF;
  font-size: 13px;
}

.topic-layout {
  display: grid;
  grid-template-columns: minmax(0, 1fr) 340px;
  gap: 36px;
  align-items: start;
}

.topic-main,
.topic-section {
  display: grid;
  gap: 24px;
}

.topic-section {
  margin-top: 34px;
}

.topic-content,
.aside-card {
  padding: 32px;
  border-color: #DDE5F0;
  background: #FFFFFF;
}

.content-label {
  display: inline-flex;
  margin-bottom: 16px;
  color: #0B63F6;
  font-size: 13px;
  font-weight: 900;
}

.rich-content {
  color: var(--text);
  font-size: 16px;
  line-height: 2;
}

.rich-content :deep(p) {
  margin-bottom: 18px;
}

.highlight-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 18px;
}

.highlight-card {
  padding: 26px;
  border: 1px solid #DDE5F0;
  background: #FFFFFF;
}

.highlight-card span {
  color: #0B63F6;
  font-size: 13px;
  font-weight: 900;
}

.highlight-card h3 {
  margin: 18px 0 10px;
  font-size: 20px;
}

.highlight-card p,
.flow-step p,
.aside-card p {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.75;
}

.build-flow {
  border-top: 1px solid #DDE5F0;
}

.flow-step {
  display: grid;
  grid-template-columns: 160px 1fr;
  gap: 24px;
  padding: 22px 0;
  border-bottom: 1px solid #DDE5F0;
}

.flow-step strong {
  color: #0B63F6;
}

.topic-aside {
  position: sticky;
  top: 104px;
  display: grid;
  gap: 18px;
}

.aside-card dl {
  display: grid;
  gap: 16px;
  margin-top: 22px;
}

.aside-card dt {
  color: var(--text-secondary);
  font-size: 12px;
}

.aside-card dd {
  margin-top: 4px;
  color: var(--text);
  font-weight: 800;
}

.cta-card {
  color: #FFFFFF;
  border-color: rgba(147, 197, 253, 0.26);
  background: linear-gradient(135deg, #020817, #0B3B86);
}

.cta-card h2 {
  margin-bottom: 12px;
  font-size: 24px;
  line-height: 1.35;
}

.cta-card p {
  color: rgba(255, 255, 255, 0.74);
  margin-bottom: 22px;
}

.cta-card .btn-primary {
  width: 100%;
}

.cta-section {
  padding: 84px 0;
  color: #FFFFFF;
  text-align: center;
  background: linear-gradient(135deg, #0B3B86 0%, #0B63F6 100%);
}

.cta-section h2 {
  margin-bottom: 12px;
  font-size: 34px;
}

.cta-section p {
  max-width: 680px;
  margin: 0 auto 28px;
  color: rgba(255, 255, 255, 0.82);
}

.cta-section .btn-primary {
  color: #0B63F6;
  background: #FFFFFF;
  box-shadow: none;
}

@media (max-width: 980px) {
  .topic-hero-grid,
  .topic-layout {
    grid-template-columns: 1fr;
  }

  .topic-aside {
    position: static;
  }
}

@media (max-width: 768px) {
  .topic-hero {
    padding: 118px 0 60px;
  }

  .topic-copy h1 {
    font-size: 32px;
  }

  .topic-actions,
  .topic-live {
    align-items: stretch;
    flex-direction: column;
  }

  .highlight-grid,
  .flow-step {
    grid-template-columns: 1fr;
  }
}
</style>
