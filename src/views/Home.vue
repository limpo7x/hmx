<template>
  <div class="home">
    <section class="hero">
      <img class="hero-image" src="/home-redesign/hero-operations.png" alt="企业级软件交付与运维场景" />
      <div class="hero-overlay"></div>
      <div class="hero-motion" aria-hidden="true">
        <span class="motion-line line-a"></span>
        <span class="motion-line line-b"></span>
        <span class="motion-node node-a"></span>
        <span class="motion-node node-b"></span>
      </div>
      <div class="container hero-content">
        <div class="hero-copy">
          <span class="hero-kicker">企业数字化交付伙伴</span>
          <h1>让复杂的业务更高效，用技术创造可持续价值</h1>
          <p>
            宏梦线专注互联网软件研发与企业数字化转型，提供从咨询、设计、开发到云端部署和持续运维的一站式解决方案。
          </p>
          <div class="hero-actions">
            <router-link to="/contact" class="btn-primary">免费咨询</router-link>
            <router-link to="/capabilities" class="btn-outline">了解能力</router-link>
          </div>
        </div>

        <div class="hero-live-panel" aria-label="项目交付实时能力">
          <span class="status-dot">交付系统在线</span>
          <div class="live-grid">
            <div>
              <strong>99.9%</strong>
              <em>服务可用性</em>
            </div>
            <div>
              <strong>24h</strong>
              <em>需求响应</em>
            </div>
            <div>
              <strong>6+</strong>
              <em>核心行业</em>
            </div>
          </div>
        </div>

        <div class="service-bar">
          <router-link
            v-for="item in heroServices"
            :key="item.title"
            :to="item.path"
            class="service-item"
          >
            <span class="service-mark">{{ item.mark }}</span>
            <span>
              <strong>{{ item.title }}</strong>
              <em>{{ item.desc }}</em>
            </span>
          </router-link>
        </div>
      </div>
    </section>

    <section class="proof-strip">
      <div class="container proof-grid">
        <div v-for="item in proofStats" :key="item.label" class="proof-item">
          <strong>{{ item.value }}</strong>
          <span>{{ item.label }}</span>
          <p>{{ item.desc }}</p>
        </div>
      </div>
    </section>

    <section class="logo-strip">
      <div class="container">
        <span>他们信任宏梦线</span>
        <div class="logo-row" aria-label="客户行业代表">
          <b v-for="logo in trustLogos" :key="logo">{{ logo }}</b>
        </div>
      </div>
    </section>

    <section class="topic-strip" v-if="topics.length">
      <div class="container">
        <router-link class="topic-card" :to="`/topics/${topics[0].id}`">
          <img v-if="topics[0].imageUrl" :src="topics[0].imageUrl" :alt="topics[0].title" />
          <div class="topic-copy">
            <span>专题发布</span>
            <strong>{{ topics[0].title }}</strong>
            <p>{{ topics[0].subtitle }}</p>
          </div>
          <em>查看详情</em>
        </router-link>
      </div>
    </section>

    <section class="section capability-section">
      <div class="container">
        <SectionTitle
          tag="核心能力"
          title="以业务为核心的全周期技术服务"
          subtitle="从早期规划到上线后的稳定运营，帮助企业构建安全、稳定、可扩展的数字化系统。"
        />
        <div class="cap-grid">
          <router-link
            v-for="(cap, i) in capabilityShowcase"
            :key="cap.title"
            :to="cap.path"
            class="cap-card dynamic-card fade-in"
            :ref="el => cardRefs[i] = el"
          >
            <img :src="cap.image" :alt="cap.title" />
            <div class="cap-body">
              <span>{{ cap.tag }}</span>
              <h3>{{ cap.title }}</h3>
              <p>{{ cap.desc }}</p>
              <em>了解更多</em>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <section class="section solution-section">
      <div class="container split-section">
        <div class="section-copy fade-in">
          <span class="section-eyebrow">解决方案</span>
          <h2>深入行业场景，交付可落地的数字化方案</h2>
          <p>围绕业务流程、用户体验、数据资产和系统稳定性，帮助不同类型组织完成从想法到上线的闭环。</p>
          <router-link to="/solutions" class="text-link">查看全部方案</router-link>
        </div>
        <div class="solution-list">
          <router-link
            v-for="item in solutionHighlights"
            :key="item.title"
            to="/solutions"
            class="solution-row dynamic-card fade-in"
          >
            <span>{{ item.index }}</span>
            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <section class="section testimonial-section">
      <div class="container">
        <SectionTitle
          tag="客户评价"
          title="用稳定交付赢得长期信任"
          subtitle="客户关心的不只是上线，更是系统能否持续服务业务增长。"
        />
        <div class="testimonial-slider">
          <div class="testimonial-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
            <article class="testimonial-card dynamic-card" v-for="item in testimonialHighlights" :key="item.name">
              <p class="testimonial-text">“{{ item.content }}”</p>
              <div class="testimonial-footer">
                <div>
                  <strong>{{ item.name }}</strong>
                  <span>{{ item.company }}</span>
                </div>
                <b>{{ item.metric }}</b>
              </div>
            </article>
          </div>
        </div>
        <div class="slider-dots">
          <button
            v-for="(item, i) in testimonialHighlights"
            :key="item.name"
            :class="{ active: i === currentSlide }"
            :aria-label="`查看第 ${i + 1} 条客户评价`"
            @click="currentSlide = i"
          ></button>
        </div>
      </div>
    </section>

    <section class="section news-section">
      <div class="container">
        <SectionTitle
          tag="新闻资讯"
          title="最新动态与技术观察"
          subtitle="关注企业数字化、云原生、数据智能和项目交付的实践经验。"
        />
        <div class="news-grid">
          <router-link :to="`/news/${a.id}`" class="news-card dynamic-card fade-in" v-for="a in displayArticles" :key="a.id">
            <span class="news-category">{{ a.category }}</span>
            <h3>{{ a.title }}</h3>
            <p>{{ a.summary }}</p>
            <time>{{ a.date }}</time>
          </router-link>
        </div>
        <div class="section-more">
          <router-link to="/news" class="text-link">查看全部文章</router-link>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container cta-inner">
        <span>准备开始一个可靠的数字化项目？</span>
        <h2>把复杂需求讲清楚，剩下的交给专业团队。</h2>
        <p>告诉我们你的业务目标，我们会给出清晰的技术路径、周期评估和落地建议。</p>
        <router-link to="/contact" class="btn-primary">立即咨询</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue"
import SectionTitle from "@/components/SectionTitle.vue"
import { api } from "@/services/content.js"

const currentSlide = ref(0)
const cardRefs = ref([])
const articles = ref([])
const topics = ref([])
let observer = null
let autoSlide = null

const heroServices = [
  { mark: "01", title: "网站建设", desc: "官网 / 门户 / 电商平台", path: "/capabilities" },
  { mark: "02", title: "移动应用", desc: "iOS / Android / 小程序", path: "/capabilities" },
  { mark: "03", title: "企业系统", desc: "ERP / CRM / OA / 数据台", path: "/capabilities" },
  { mark: "04", title: "云端运维", desc: "上云部署 / DevOps / 监控", path: "/capabilities" },
  { mark: "05", title: "AI与数据", desc: "数据分析 / 智能应用", path: "/capabilities" }
]

const proofStats = [
  { value: "200+", label: "专业团队成员", desc: "多角色协作，稳定交付保障" },
  { value: "500+", label: "成功交付案例", desc: "覆盖多行业，经验沉淀丰富" },
  { value: "98%", label: "客户满意度", desc: "长期合作，口碑值得信赖" }
]

const trustLogos = ["中国中铁", "越秀集团", "广汽集团", "OPPO", "ZTE 中兴", "海大集团"]

const capabilityShowcase = [
  {
    tag: "Strategy",
    title: "数字化咨询与规划",
    desc: "梳理业务场景与痛点，制定可落地的数字化路线图与实施策略。",
    image: "/home-redesign/cap-consulting.png",
    path: "/capabilities"
  },
  {
    tag: "Engineering",
    title: "软件定制开发",
    desc: "高质量交付复杂业务系统、平台与应用，支撑稳定增长与持续迭代。",
    image: "/home-redesign/cap-development.png",
    path: "/capabilities"
  },
  {
    tag: "Cloud",
    title: "云计算与运维",
    desc: "提供云架构设计、迁移、DevOps 与 7x24 运维保障。",
    image: "/home-redesign/cap-cloud.png",
    path: "/capabilities"
  },
  {
    tag: "Data",
    title: "AI与数据智能",
    desc: "构建数据中台与智能应用，释放数据价值，驱动业务智能决策。",
    image: "/home-redesign/cap-ai-data.png",
    path: "/capabilities"
  },
  {
    tag: "Experience",
    title: "移动应用与全端体验",
    desc: "打造高性能移动应用与小程序，提升用户体验与业务触达能力。",
    image: "/home-redesign/cap-mobile.png",
    path: "/capabilities"
  },
  {
    tag: "Security",
    title: "系统集成与安全",
    desc: "提供系统集成、接口对接与安全防护，保障企业数据与业务安全。",
    image: "/home-redesign/cap-security.png",
    path: "/capabilities"
  }
]

const solutionHighlights = [
  { index: "01", title: "智慧电商", desc: "全渠道电商平台、会员营销、订单履约与数据分析一体化建设。" },
  { index: "02", title: "智慧政务", desc: "行政审批、数据共享、便民服务平台与政务信息化系统。" },
  { index: "03", title: "智慧教育", desc: "在线教育平台、教务管理、直播教学与数字化学习体验。" },
  { index: "04", title: "企业数字化", desc: "办公协同、客户管理、业务中台和数据资产建设。" }
]

const testimonialHighlights = [
  {
    name: "张总",
    company: "某电商平台",
    content: "宏梦线帮助我们完成了核心交易系统升级，上线后系统稳定性和用户体验都有明显提升。",
    metric: "转化率提升 30%"
  },
  {
    name: "李经理",
    company: "某教育科技集团",
    content: "从需求沟通到项目交付，团队响应很快，也能把复杂业务拆解成清晰的技术方案。",
    metric: "流程效率提升 50%"
  },
  {
    name: "王总监",
    company: "某金融机构",
    content: "数据分析平台上线后，业务团队可以实时洞察运营状态，决策效率提升非常明显。",
    metric: "报表周期缩短 80%"
  }
]

const fallbackArticles = [
  { id: 1, title: "企业数字化转型的关键路径", date: "2026-01-12", category: "行业洞察", summary: "从业务流程、数据资产和系统架构三个层面，拆解数字化项目的落地重点。" },
  { id: 2, title: "云原生架构如何提升系统稳定性", date: "2025-12-18", category: "技术分享", summary: "通过弹性伸缩、可观测性和自动化运维，构建可持续演进的技术底座。" },
  { id: 3, title: "定制软件项目如何控制交付风险", date: "2025-11-26", category: "交付实践", summary: "用阶段化目标、原型验证和持续反馈，让复杂项目更可控。" }
]

const displayArticles = computed(() => {
  const validArticles = articles.value.filter(item => item?.title && item?.summary)
  return (validArticles.length ? validArticles : fallbackArticles).slice(0, 3)
})

onMounted(async () => {
  articles.value = await api.get("/api/articles").catch(() => fallbackArticles)
  topics.value = await api.get("/api/topics").catch(() => [])

  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
        observer.unobserve(entry.target)
      }
    })
  }, { threshold: 0.15 })

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el))

  autoSlide = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % testimonialHighlights.length
  }, 5000)
})

onUnmounted(() => {
  observer?.disconnect()
  clearInterval(autoSlide)
})
</script>

<style scoped>
.home {
  background: #FFFFFF;
  color: var(--text);
}

.hero {
  position: relative;
  min-height: 760px;
  display: flex;
  align-items: stretch;
  overflow: hidden;
  color: #FFFFFF;
}

.hero-image {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.hero-overlay {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(90deg, rgba(4, 13, 30, 0.94) 0%, rgba(7, 22, 45, 0.82) 43%, rgba(7, 21, 39, 0.35) 76%, rgba(7, 21, 39, 0.58) 100%),
    linear-gradient(180deg, rgba(2, 8, 23, 0.12) 0%, rgba(2, 8, 23, 0.82) 100%);
}

.hero-motion {
  position: absolute;
  inset: 0;
  overflow: hidden;
  pointer-events: none;
}

.hero-motion::before {
  content: "";
  position: absolute;
  inset: 0;
  opacity: 0.16;
  background-image:
    linear-gradient(rgba(96, 165, 250, 0.18) 1px, transparent 1px),
    linear-gradient(90deg, rgba(96, 165, 250, 0.18) 1px, transparent 1px);
  background-size: 72px 72px;
  animation: grid-drift 28s linear infinite;
}

.motion-line {
  position: absolute;
  height: 2px;
  background: linear-gradient(90deg, transparent, rgba(96, 165, 250, 0.95), rgba(16, 185, 129, 0.72), transparent);
  filter: blur(0.2px);
  transform-origin: left center;
}

.line-a {
  top: 30%;
  left: -18%;
  width: 58%;
  animation: hero-scan-a 6s ease-in-out infinite;
}

.line-b {
  right: -20%;
  bottom: 26%;
  width: 48%;
  animation: hero-scan-b 7.4s ease-in-out infinite 1.2s;
}

.motion-node {
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 999px;
  background: #60A5FA;
  box-shadow: 0 0 28px rgba(96, 165, 250, 0.9);
}

.node-a {
  top: 24%;
  right: 28%;
  animation: float-soft 4.8s ease-in-out infinite;
}

.node-b {
  bottom: 30%;
  right: 16%;
  background: #10B981;
  box-shadow: 0 0 28px rgba(16, 185, 129, 0.9);
  animation: float-soft 5.8s ease-in-out infinite 0.8s;
}

.hero-content {
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  min-height: 760px;
  padding-top: 112px;
  padding-bottom: 48px;
}

.hero-copy {
  max-width: 760px;
}

.hero-kicker,
.section-eyebrow {
  display: inline-block;
  margin-bottom: 18px;
  color: #93C5FD;
  font-size: 15px;
  font-weight: 700;
}

.hero-copy h1 {
  max-width: 760px;
  margin-bottom: 22px;
  font-size: 58px;
  line-height: 1.16;
  font-weight: 800;
  letter-spacing: 0;
}

.hero-copy p {
  max-width: 640px;
  margin-bottom: 36px;
  color: rgba(255, 255, 255, 0.86);
  font-size: 18px;
  line-height: 1.8;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  gap: 16px;
}

.hero-live-panel {
  position: absolute;
  right: 24px;
  top: 164px;
  width: 300px;
  padding: 18px;
  border: 1px solid rgba(147, 197, 253, 0.24);
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.55);
  box-shadow: 0 22px 60px rgba(2, 8, 23, 0.34);
  backdrop-filter: blur(16px);
  animation: float-soft 6.4s ease-in-out infinite;
}

.hero-live-panel .status-dot {
  color: rgba(255, 255, 255, 0.82);
  font-size: 13px;
  font-weight: 800;
}

.live-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 12px;
  margin-top: 16px;
}

.live-grid div {
  padding-top: 12px;
  border-top: 1px solid rgba(255, 255, 255, 0.14);
}

.live-grid strong,
.live-grid em {
  display: block;
}

.live-grid strong {
  color: #FFFFFF;
  font-size: 22px;
  line-height: 1.1;
}

.live-grid em {
  margin-top: 6px;
  color: rgba(255, 255, 255, 0.58);
  font-style: normal;
  font-size: 11px;
}

.btn-primary,
.btn-outline {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 28px;
  border-radius: 8px;
  font-size: 15px;
  font-weight: 700;
  transition: transform var(--transition), box-shadow var(--transition), background var(--transition), border-color var(--transition);
}

.btn-primary {
  color: #FFFFFF;
  background: #0B63F6;
  box-shadow: 0 14px 30px rgba(11, 99, 246, 0.34);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 18px 38px rgba(11, 99, 246, 0.42);
}

.btn-outline {
  color: #FFFFFF;
  border: 1px solid rgba(255, 255, 255, 0.46);
  background: rgba(255, 255, 255, 0.08);
}

.btn-outline:hover {
  border-color: #FFFFFF;
  background: rgba(255, 255, 255, 0.16);
}

.service-bar {
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  gap: 0;
  margin-top: 78px;
  overflow: hidden;
  border: 1px solid rgba(255, 255, 255, 0.22);
  border-radius: 8px;
  background: rgba(15, 23, 42, 0.66);
  backdrop-filter: blur(14px);
  animation: service-rise 0.9s ease both 0.15s;
}

.service-item {
  display: flex;
  gap: 14px;
  min-height: 96px;
  padding: 22px 18px;
  border-right: 1px solid rgba(255, 255, 255, 0.16);
  transition: background var(--transition);
}

.service-item:last-child {
  border-right: none;
}

.service-item:hover {
  background: rgba(37, 99, 235, 0.28);
}

.service-mark {
  color: #60A5FA;
  font-size: 13px;
  font-weight: 800;
}

.service-item strong,
.service-item em {
  display: block;
  font-style: normal;
}

.service-item strong {
  margin-bottom: 6px;
  font-size: 15px;
}

.service-item em {
  color: rgba(255, 255, 255, 0.68);
  font-size: 12px;
  line-height: 1.5;
}

.proof-strip {
  padding: 44px 0;
  background: #FFFFFF;
  border-bottom: 1px solid var(--border);
}

.proof-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
}

.proof-item {
  padding: 0 42px;
  border-right: 1px solid var(--border);
}

.proof-item:last-child {
  border-right: none;
}

.proof-item strong {
  display: block;
  margin-bottom: 6px;
  color: #0B63F6;
  font-size: 44px;
  line-height: 1;
}

.proof-item span {
  display: block;
  margin-bottom: 6px;
  color: var(--text);
  font-size: 16px;
  font-weight: 700;
}

.proof-item p {
  color: var(--text-secondary);
  font-size: 13px;
}

.logo-strip {
  padding: 32px 0;
  background: #FFFFFF;
  border-bottom: 1px solid var(--border);
}

.logo-strip .container {
  display: grid;
  grid-template-columns: 140px 1fr;
  gap: 24px;
  align-items: center;
}

.logo-strip span {
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 700;
}

.logo-row {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 22px;
  align-items: center;
}

.logo-row b {
  color: #64748B;
  font-size: 18px;
  font-weight: 800;
  text-align: center;
}

.topic-strip {
  padding: 18px 0;
  background: #F8FAFC;
  border-bottom: 1px solid var(--border);
}

.topic-card {
  min-height: 104px;
  display: grid;
  grid-template-columns: 150px 1fr auto;
  gap: 18px;
  align-items: center;
  padding: 14px 18px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: #FFFFFF;
  transition: border-color var(--transition), transform var(--transition);
}

.topic-card:hover {
  border-color: #0B63F6;
  transform: translateY(-1px);
}

.topic-card img {
  width: 150px;
  height: 76px;
  object-fit: cover;
  border-radius: 6px;
  background: var(--bg-gray);
}

.topic-copy span {
  display: block;
  margin-bottom: 4px;
  color: #0B63F6;
  font-size: 12px;
  font-weight: 800;
}

.topic-copy strong {
  display: block;
  margin-bottom: 3px;
  color: var(--text);
  font-size: 18px;
}

.topic-copy p {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.5;
}

.topic-card em {
  color: #0B63F6;
  font-style: normal;
  font-weight: 800;
  white-space: nowrap;
}

.section {
  padding: 96px 0;
}

.capability-section,
.testimonial-section {
  background: #F8FAFC;
}

.cap-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.cap-card {
  overflow: hidden;
  border: 1px solid #DDE5F0;
  border-radius: 8px;
  background: #FFFFFF;
  transition: transform var(--transition), border-color var(--transition), box-shadow var(--transition);
}

.cap-card:hover {
  transform: translateY(-4px);
  border-color: #93C5FD;
  box-shadow: 0 18px 38px rgba(15, 23, 42, 0.10);
}

.cap-card img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.cap-body {
  padding: 24px;
}

.cap-body span {
  display: block;
  margin-bottom: 10px;
  color: #0B63F6;
  font-size: 12px;
  font-weight: 800;
  text-transform: uppercase;
}

.cap-body h3 {
  margin-bottom: 10px;
  color: var(--text);
  font-size: 20px;
}

.cap-body p {
  min-height: 72px;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.7;
}

.cap-body em {
  display: inline-block;
  margin-top: 18px;
  color: #0B63F6;
  font-style: normal;
  font-size: 14px;
  font-weight: 800;
}

.split-section {
  display: grid;
  grid-template-columns: 0.84fr 1.16fr;
  gap: 72px;
  align-items: start;
}

.section-copy {
  position: sticky;
  top: 112px;
}

.section-copy h2 {
  margin-bottom: 18px;
  color: var(--text);
  font-size: 40px;
  line-height: 1.25;
}

.section-copy p {
  margin-bottom: 28px;
  color: var(--text-secondary);
  font-size: 16px;
  line-height: 1.8;
}

.text-link {
  display: inline-flex;
  align-items: center;
  color: #0B63F6;
  font-weight: 800;
}

.text-link::after {
  content: "";
  width: 18px;
  height: 1px;
  margin-left: 10px;
  background: currentColor;
  transition: width var(--transition);
}

.text-link:hover::after {
  width: 28px;
}

.solution-list {
  border-top: 1px solid var(--border);
}

.solution-row {
  display: grid;
  grid-template-columns: 58px 1fr;
  gap: 22px;
  padding: 28px 0;
  border-bottom: 1px solid var(--border);
  transition: padding-left var(--transition);
}

.solution-row:hover {
  padding-left: 12px;
}

.solution-row span {
  color: #0B63F6;
  font-size: 14px;
  font-weight: 800;
}

.solution-row h3 {
  margin-bottom: 8px;
  color: var(--text);
  font-size: 22px;
}

.solution-row p {
  color: var(--text-secondary);
  font-size: 15px;
  line-height: 1.7;
}

.testimonial-slider {
  overflow: hidden;
  border-radius: 8px;
}

.testimonial-track {
  display: flex;
  transition: transform 0.5s ease;
}

.testimonial-card {
  min-width: 100%;
  padding: 44px;
  border: 1px solid #DDE5F0;
  border-radius: 8px;
  background: #FFFFFF;
}

.testimonial-text {
  margin-bottom: 30px;
  color: var(--text);
  font-size: 22px;
  line-height: 1.8;
}

.testimonial-footer {
  display: flex;
  align-items: end;
  justify-content: space-between;
  gap: 24px;
}

.testimonial-footer strong,
.testimonial-footer span {
  display: block;
}

.testimonial-footer strong {
  margin-bottom: 4px;
  color: var(--text);
  font-size: 16px;
}

.testimonial-footer span {
  color: var(--text-secondary);
  font-size: 14px;
}

.testimonial-footer b {
  color: #0B63F6;
  font-size: 24px;
}

.slider-dots {
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 24px;
}

.slider-dots button {
  width: 32px;
  height: 4px;
  border: none;
  border-radius: 99px;
  background: #CBD5E1;
  cursor: pointer;
  transition: background var(--transition), width var(--transition);
}

.slider-dots button.active {
  width: 46px;
  background: #0B63F6;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.news-card {
  min-height: 238px;
  display: flex;
  flex-direction: column;
  padding: 28px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: #FFFFFF;
  transition: transform var(--transition), border-color var(--transition);
}

.news-card:hover {
  transform: translateY(-3px);
  border-color: #93C5FD;
}

.news-category {
  width: fit-content;
  margin-bottom: 18px;
  padding: 4px 10px;
  border-radius: 4px;
  color: #0B63F6;
  background: #DBEAFE;
  font-size: 12px;
  font-weight: 800;
}

.news-card h3 {
  margin-bottom: 12px;
  color: var(--text);
  font-size: 19px;
  line-height: 1.45;
}

.news-card p {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.7;
}

.news-card time {
  margin-top: auto;
  padding-top: 22px;
  color: #94A3B8;
  font-size: 13px;
}

.section-more {
  margin-top: 36px;
  text-align: center;
}

.cta-section {
  padding: 86px 0;
  color: #FFFFFF;
  background: linear-gradient(135deg, #0B3B86 0%, #0B63F6 100%);
}

.cta-inner {
  max-width: 840px;
  text-align: center;
}

.cta-inner span {
  display: block;
  margin-bottom: 14px;
  color: #BFDBFE;
  font-size: 14px;
  font-weight: 800;
}

.cta-inner h2 {
  margin-bottom: 14px;
  font-size: 36px;
  line-height: 1.28;
}

.cta-inner p {
  margin-bottom: 32px;
  color: rgba(255, 255, 255, 0.84);
  font-size: 16px;
}

.cta-inner .btn-primary {
  background: #FFFFFF;
  color: #0B63F6;
  box-shadow: none;
}

@keyframes hero-scan-a {
  0%, 100% { transform: translateX(0) rotate(-12deg); opacity: 0; }
  18%, 70% { opacity: 1; }
  52% { transform: translateX(210%) rotate(-12deg); }
}

@keyframes hero-scan-b {
  0%, 100% { transform: translateX(0) rotate(14deg); opacity: 0; }
  20%, 74% { opacity: 0.9; }
  56% { transform: translateX(-210%) rotate(14deg); }
}

@keyframes service-rise {
  from { opacity: 0; transform: translateY(22px); }
  to { opacity: 1; transform: translateY(0); }
}

.fade-in {
  opacity: 0;
  transform: translateY(24px);
  transition: opacity 0.6s ease, transform 0.6s ease;
}

.fade-in.visible {
  opacity: 1;
  transform: translateY(0);
}

@media (max-width: 980px) {
  .hero,
  .hero-content {
    min-height: auto;
  }

  .hero-content {
    padding-top: 120px;
  }

  .hero-copy h1 {
    font-size: 42px;
  }

  .hero-live-panel {
    position: relative;
    top: auto;
    right: auto;
    width: 100%;
    max-width: 420px;
    margin-top: 32px;
  }

  .service-bar,
  .proof-grid,
  .cap-grid,
  .news-grid,
  .split-section {
    grid-template-columns: 1fr;
  }

  .service-item {
    border-right: none;
    border-bottom: 1px solid rgba(255, 255, 255, 0.16);
  }

  .service-item:last-child {
    border-bottom: none;
  }

  .proof-item {
    padding: 24px 0;
    border-right: none;
    border-bottom: 1px solid var(--border);
  }

  .proof-item:last-child {
    border-bottom: none;
  }

  .logo-strip .container,
  .logo-row {
    grid-template-columns: 1fr;
  }

  .logo-row b {
    text-align: left;
  }

  .section-copy {
    position: static;
  }
}

@media (max-width: 768px) {
  .hero-copy h1 {
    font-size: 34px;
  }

  .hero-copy p,
  .section-copy p {
    font-size: 15px;
  }

  .hero-actions {
    flex-direction: column;
    align-items: stretch;
  }

  .service-bar {
    margin-top: 52px;
  }

  .hero-live-panel {
    max-width: none;
  }

  .topic-card {
    grid-template-columns: 1fr;
  }

  .topic-card img {
    width: 100%;
    height: 140px;
  }

  .section {
    padding: 64px 0;
  }

  .section-copy h2,
  .cta-inner h2 {
    font-size: 28px;
  }

  .testimonial-card {
    padding: 28px;
  }

  .testimonial-text {
    font-size: 18px;
  }

  .testimonial-footer {
    align-items: start;
    flex-direction: column;
  }
}
</style>
