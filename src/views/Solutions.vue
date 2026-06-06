<template>
  <div class="page solutions-page">
    <section class="kinetic-page-hero">
      <div class="container hero-grid">
        <div>
          <span class="page-kicker">解决方案 / Industry Playbooks</span>
          <h1>把行业场景拆成系统、数据和体验三条清晰路径</h1>
          <p>针对电商、政务、教育、医疗、园区和企业管理场景，提供可以直接进入实施阶段的数字化方案。</p>
        </div>
        <div class="hero-panel">
          <div class="metric-grid">
            <div class="metric-chip"><strong>6</strong><span>行业场景</span></div>
            <div class="metric-chip"><strong>3</strong><span>交付路径</span></div>
            <div class="metric-chip"><strong>90天</strong><span>阶段化上线</span></div>
            <div class="metric-chip"><strong>1站式</strong><span>方案到运维</span></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <SectionTitle tag="场景方案" title="选择最接近你业务的数字化场景" subtitle="每个方案都围绕业务流程、系统集成、数据能力和用户体验展开。" center />
        <div class="solution-grid">
          <router-link v-for="item in solutions" :key="item.title" to="/contact" class="solution-card dynamic-card">
            <span class="solution-index">{{ item.index }}</span>
            <div>
              <h2>{{ item.title }}</h2>
              <p>{{ item.desc }}</p>
            </div>
            <ul>
              <li v-for="feature in item.features" :key="feature">{{ feature }}</li>
            </ul>
            <em>获取方案评估</em>
          </router-link>
        </div>
      </div>
    </section>

    <section class="section section-gray">
      <div class="container delivery-panel">
        <div class="delivery-copy">
          <span class="page-kicker">落地方式</span>
          <h2>不是只给方案，而是把上线路径一起交付</h2>
          <p>从需求诊断到版本规划，再到研发、上线和运维，我们用阶段化目标降低项目不确定性。</p>
        </div>
        <div class="delivery-steps">
          <div v-for="step in deliverySteps" :key="step.title" class="delivery-step dynamic-card">
            <strong>{{ step.title }}</strong>
            <span>{{ step.desc }}</span>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <h2>还不确定选哪类方案？</h2>
        <p>把你的业务场景发给我们，我们会帮你判断优先建设路径。</p>
        <router-link to="/contact" class="btn-primary">获取定制方案</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import SectionTitle from "@/components/SectionTitle.vue"

const solutions = [
  { index: "01", title: "智慧电商", desc: "构建全渠道交易、会员营销、订单履约和数据增长体系。", features: ["B2B/B2C/B2B2C", "多端统一", "营销工具", "ERP/WMS对接"] },
  { index: "02", title: "智慧政务", desc: "让审批、数据共享和便民服务进入统一在线流程。", features: ["一网通办", "数据交换", "智能审批", "移动便民"] },
  { index: "03", title: "智慧教育", desc: "覆盖在线学习、直播互动、教务管理和学情分析。", features: ["直播教学", "智能题库", "教务系统", "学情分析"] },
  { index: "04", title: "智慧医疗", desc: "连接问诊、预约、病历、药品和服务流程。", features: ["在线问诊", "预约挂号", "电子病历", "智能分诊"] },
  { index: "05", title: "智慧园区", desc: "整合园区运营、设备、安防、能耗和企业服务。", features: ["综合管理", "物联接入", "智慧安防", "能耗管理"] },
  { index: "06", title: "企业数字化", desc: "建设办公协同、客户管理、业务中台和数据资产。", features: ["协同办公", "CRM", "数据中台", "流程数字化"] }
]

const deliverySteps = [
  { title: "01 场景诊断", desc: "判断业务价值、系统边界和优先级。" },
  { title: "02 方案蓝图", desc: "输出功能地图、架构和交付计划。" },
  { title: "03 版本实施", desc: "按阶段研发、联调、验收和上线。" },
  { title: "04 持续增长", desc: "通过数据和运营反馈持续优化。" }
]
</script>

<style scoped>
.solution-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.solution-card {
  min-height: 360px;
  display: flex;
  flex-direction: column;
  padding: 28px;
  border: 1px solid #DDE5F0;
  background: #FFFFFF;
}

.solution-index {
  margin-bottom: 26px;
  color: #0B63F6;
  font-size: 13px;
  font-weight: 900;
}

.solution-card h2 {
  margin-bottom: 12px;
  font-size: 24px;
}

.solution-card p {
  margin-bottom: 22px;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.7;
}

.solution-card ul {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
  margin-top: auto;
}

.solution-card li {
  color: var(--text);
  font-size: 13px;
}

.solution-card li::before {
  content: "";
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-right: 8px;
  border-radius: 999px;
  background: #10B981;
  box-shadow: 0 0 12px rgba(16, 185, 129, 0.45);
}

.solution-card em {
  margin-top: 28px;
  color: #0B63F6;
  font-style: normal;
  font-weight: 800;
}

.delivery-panel {
  display: grid;
  grid-template-columns: 0.8fr 1.2fr;
  gap: 64px;
  align-items: center;
}

.delivery-copy .page-kicker {
  color: #0B63F6;
}

.delivery-copy h2 {
  margin-bottom: 16px;
  font-size: 38px;
  line-height: 1.28;
}

.delivery-copy p {
  color: var(--text-secondary);
  line-height: 1.8;
}

.delivery-steps {
  display: grid;
  gap: 16px;
}

.delivery-step {
  display: grid;
  grid-template-columns: 150px 1fr;
  gap: 24px;
  align-items: center;
  padding: 22px 24px;
  border: 1px solid #DDE5F0;
  background: #FFFFFF;
}

.delivery-step strong {
  color: #0B63F6;
}

.delivery-step span {
  color: var(--text-secondary);
  font-size: 14px;
}

.cta-section {
  padding: 84px 0;
  text-align: center;
  color: #FFFFFF;
  background: linear-gradient(135deg, #0B3B86 0%, #0B63F6 100%);
}

.cta-section h2 {
  margin-bottom: 12px;
  font-size: 34px;
}

.cta-section p {
  margin-bottom: 28px;
  color: rgba(255, 255, 255, 0.82);
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
}

@media (max-width: 980px) {
  .solution-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .delivery-panel {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 768px) {
  .solution-grid,
  .delivery-step {
    grid-template-columns: 1fr;
  }
}
</style>
