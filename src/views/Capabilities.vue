<template>
  <div class="page capability-page">
    <section class="kinetic-page-hero">
      <div class="container hero-grid">
        <div>
          <span class="page-kicker">核心能力 / Capability System</span>
          <h1>把咨询、设计、研发和运维串成一条可靠交付链路</h1>
          <p>围绕企业关键业务场景，提供从系统规划、定制开发、云端部署到数据智能的全周期技术服务。</p>
        </div>
        <div class="hero-panel">
          <div class="metric-grid">
            <div class="metric-chip"><strong>6</strong><span>核心服务模块</span></div>
            <div class="metric-chip"><strong>24h</strong><span>需求响应机制</span></div>
            <div class="metric-chip"><strong>7x24</strong><span>运维保障</span></div>
            <div class="metric-chip"><strong>500+</strong><span>项目经验沉淀</span></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-gray">
      <div class="container">
        <SectionTitle tag="服务能力" title="覆盖数字化项目关键环节" subtitle="每个能力模块都能独立交付，也能组合成完整的企业级解决方案。" center />
        <div class="cap-grid">
          <router-link v-for="item in capabilityShowcase" :key="item.title" to="/contact" class="cap-card dynamic-card">
            <img :src="item.image" :alt="item.title" />
            <div class="cap-body">
              <span class="status-dot">{{ item.tag }}</span>
              <h3>{{ item.title }}</h3>
              <p>{{ item.desc }}</p>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <section class="section tech-section">
      <div class="container">
        <SectionTitle tag="技术栈" title="稳定、开放、可持续演进的技术底座" subtitle="根据项目体量、团队能力和后续运维成本选择合适技术组合。" center />
        <div class="tech-grid">
          <div class="tech-cat dynamic-card" v-for="cat in techStack" :key="cat.name">
            <h3>{{ cat.name }}</h3>
            <div class="tech-tags">
              <span v-for="item in cat.items" :key="item">{{ item }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-gray">
      <div class="container">
        <SectionTitle tag="服务流程" title="从需求到上线，每一步都可视化推进" subtitle="用清晰阶段、明确产物和持续反馈，把复杂项目做得更可控。" center />
        <div class="process-line">
          <div class="process-step dynamic-card" v-for="(step, i) in processSteps" :key="step.title">
            <span>{{ String(i + 1).padStart(2, "0") }}</span>
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <span>需要判断你的项目该怎么做？</span>
        <h2>先把业务目标讲清楚，我们给你拆成可执行方案。</h2>
        <router-link to="/contact" class="btn-primary">预约能力评估</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import SectionTitle from "@/components/SectionTitle.vue"

const capabilityShowcase = [
  { tag: "Strategy", title: "数字化咨询与规划", desc: "梳理业务流程、系统边界和项目优先级，形成清晰的建设路线图。", image: "/home-redesign/cap-consulting.png" },
  { tag: "Engineering", title: "软件定制开发", desc: "交付复杂业务系统、平台应用、门户、电商和管理后台。", image: "/home-redesign/cap-development.png" },
  { tag: "Mobile", title: "移动应用开发", desc: "覆盖 App、小程序、H5 与多端体验一致性建设。", image: "/home-redesign/cap-mobile.png" },
  { tag: "Cloud", title: "云计算与DevOps", desc: "提供云架构设计、自动化部署、监控告警和持续运维。", image: "/home-redesign/cap-cloud.png" },
  { tag: "Data", title: "AI与数据智能", desc: "建设数据分析、智能推荐、知识库和业务洞察能力。", image: "/home-redesign/cap-ai-data.png" },
  { tag: "Security", title: "系统集成与安全", desc: "打通存量系统、接口和权限体系，保障业务连续与数据安全。", image: "/home-redesign/cap-security.png" }
]

const techStack = [
  { name: "前端体验", items: ["Vue", "React", "TypeScript", "Vite", "Nuxt", "可视化大屏"] },
  { name: "后端服务", items: ["Java", "Go", "Node.js", "Python", "MySQL", "Redis"] },
  { name: "移动与多端", items: ["iOS", "Android", "Flutter", "小程序", "H5", "鸿蒙生态"] },
  { name: "云与运维", items: ["Docker", "Kubernetes", "Nginx", "Prometheus", "Grafana", "CI/CD"] },
  { name: "AI与数据", items: ["知识库", "数据中台", "BI分析", "推荐系统", "智能客服", "搜索引擎"] }
]

const processSteps = [
  { title: "需求澄清", desc: "明确目标、角色、流程和系统边界。" },
  { title: "方案设计", desc: "输出架构、原型、周期和交付计划。" },
  { title: "体验设计", desc: "把复杂流程转化成清晰可用的界面。" },
  { title: "迭代研发", desc: "分阶段开发、联调、验收和优化。" },
  { title: "测试上线", desc: "覆盖功能、安全、性能和部署验证。" },
  { title: "持续运维", desc: "监控、巡检、应急响应和持续迭代。" }
]
</script>

<style scoped>
.cap-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.cap-card {
  border: 1px solid #DDE5F0;
  background: #FFFFFF;
}

.cap-card img {
  width: 100%;
  aspect-ratio: 16 / 9;
  object-fit: cover;
}

.cap-body {
  padding: 24px;
}

.cap-body h3 {
  margin: 14px 0 10px;
  font-size: 20px;
}

.cap-body p {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.7;
}

.tech-section {
  background:
    radial-gradient(circle at 82% 20%, rgba(37, 99, 235, 0.08), transparent 30%),
    #FFFFFF;
}

.tech-grid {
  display: grid;
  gap: 18px;
}

.tech-cat {
  display: grid;
  grid-template-columns: 170px 1fr;
  gap: 24px;
  align-items: center;
  padding: 24px;
  border: 1px solid var(--border);
  background: #FFFFFF;
}

.tech-cat h3 {
  color: #0B63F6;
  font-size: 18px;
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.tech-tags span {
  padding: 7px 13px;
  border: 1px solid #DDE5F0;
  border-radius: 999px;
  background: #F8FAFC;
  color: var(--text-secondary);
  font-size: 13px;
  transition: transform var(--transition), color var(--transition), border-color var(--transition);
}

.tech-tags span:hover {
  transform: translateY(-2px);
  border-color: #93C5FD;
  color: #0B63F6;
}

.process-line {
  position: relative;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 16px;
}

.process-line::before {
  content: "";
  position: absolute;
  left: 8%;
  right: 8%;
  top: 34px;
  height: 2px;
  background: linear-gradient(90deg, #0B63F6, #38BDF8, #10B981);
  opacity: 0.38;
}

.process-step {
  position: relative;
  z-index: 1;
  min-height: 212px;
  padding: 24px;
  border: 1px solid #DDE5F0;
  background: #FFFFFF;
}

.process-step span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 42px;
  margin-bottom: 22px;
  border-radius: 999px;
  color: #FFFFFF;
  background: #0B63F6;
  font-weight: 800;
  box-shadow: 0 0 0 8px #EFF6FF;
}

.process-step h3 {
  margin-bottom: 10px;
  font-size: 17px;
}

.process-step p {
  color: var(--text-secondary);
  font-size: 13px;
  line-height: 1.7;
}

.cta-section {
  padding: 86px 0;
  text-align: center;
  color: #FFFFFF;
  background: linear-gradient(135deg, #0B3B86 0%, #0B63F6 100%);
}

.cta-section span {
  display: block;
  margin-bottom: 12px;
  color: #BFDBFE;
  font-weight: 800;
}

.cta-section h2 {
  max-width: 780px;
  margin: 0 auto 28px;
  font-size: 32px;
  line-height: 1.35;
}

.btn-primary {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 48px;
  padding: 0 28px;
  border-radius: 8px;
  color: #0B63F6;
  background: #FFFFFF;
  font-weight: 800;
  transition: transform var(--transition), box-shadow var(--transition);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 32px rgba(255, 255, 255, 0.22);
}

@media (max-width: 980px) {
  .cap-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .process-line {
    grid-template-columns: repeat(3, 1fr);
  }

  .process-line::before {
    display: none;
  }
}

@media (max-width: 768px) {
  .cap-grid,
  .tech-cat,
  .process-line {
    grid-template-columns: 1fr;
  }
}
</style>
