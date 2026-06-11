<template>
  <div class="page cases-page">
    <section class="kinetic-page-hero">
      <div class="container hero-grid">
        <div>
          <span class="page-kicker">客户案例 / Proven Outcomes</span>
          <h1>用可量化的项目成果，证明技术交付价值</h1>
          <p>从交易平台、在线教育到数据分析中台，我们帮助客户把复杂系统建设成稳定增长的业务能力。</p>
        </div>
        <div class="hero-panel">
          <div class="metric-grid">
            <div class="metric-chip"><strong>500+</strong><span>成功案例</span></div>
            <div class="metric-chip"><strong>60%</strong><span>响应优化</span></div>
            <div class="metric-chip"><strong>40%</strong><span>成本降低</span></div>
            <div class="metric-chip"><strong>80%</strong><span>效率提升</span></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <SectionTitle tag="精选案例" title="真实场景里的系统升级与业务增长" subtitle="每个项目都围绕稳定性、效率、增长和长期运营能力展开。" center />
        <div class="case-grid">
          <article class="case-card dynamic-card" v-for="item in displayCases" :key="item.id">
            <div class="case-top">
              <span v-for="tag in item.tags" :key="tag">{{ tag }}</span>
            </div>
            <h3>{{ item.title }}</h3>
            <p class="case-client">{{ item.client }}</p>
            <p class="case-desc" v-html="item.desc"></p>
            <div class="case-results">
              <strong>项目成果</strong>
              <ul>
                <li v-for="result in item.results" :key="result">{{ result }}</li>
              </ul>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="section section-gray">
      <div class="container">
        <SectionTitle tag="客户声音" title="长期合作来自稳定交付" subtitle="他们看重的是团队能否持续响应、持续优化，并真正理解业务。" center />
        <div class="testimonial-grid">
          <article class="testimonial-card dynamic-card" v-for="item in testimonials" :key="item.name">
            <p>"{{ item.content }}"</p>
            <div>
              <strong>{{ item.name }}</strong>
              <span>{{ item.company }}</span>
            </div>
          </article>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <h2>想把你的项目做成下一个成功案例？</h2>
        <router-link to="/contact" class="btn-primary">聊聊项目目标</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import SectionTitle from "@/components/SectionTitle.vue"
import { api } from "@/services/content.js"

const fallbackCases = [
  { id: "fallback-1", title: "大型电商平台系统重构", client: "国内头部电商企业", tags: ["电商", "系统重构", "高并发"], desc: "将核心交易系统从单体架构升级为可扩展服务架构，支撑促销期间的高并发访问。", results: ["响应时间降低60%", "运维成本降低40%", "上线首月GMV增长25%"] },
  { id: "fallback-2", title: "教育集团在线学习平台", client: "K12教育科技集团", tags: ["教育", "直播", "SaaS"], desc: "搭建集直播、录播、题库、教务和学情分析于一体的在线学习平台。", results: ["支持10万学生在线学习", "直播延迟控制在3秒内", "教务效率提升50%"] },
  { id: "fallback-3", title: "金融机构数据分析中台", client: "股份制商业银行", tags: ["金融", "大数据", "AI"], desc: "建设企业级数据分析中台，实现多源数据融合、指标分析和实时业务洞察。", results: ["数据处理效率提升80%", "报表周期从3天缩短至1小时", "支撑10+业务部门"] }
]

const testimonials = [
  { name: "张总", company: "某电商平台", content: "宏梦线不仅懂技术，也理解交易业务的复杂度，系统上线后稳定性和体验都有明显提升。" },
  { name: "李经理", company: "某教育科技集团", content: "从需求沟通到项目交付，团队响应很快，能把复杂流程拆解成清晰的实施计划。" },
  { name: "王总监", company: "某金融机构", content: "数据平台让业务团队能实时洞察运营状态，技术实力和响应速度都让人放心。" }
]

const cases = ref([])
const displayCases = computed(() => cases.value.length ? cases.value : fallbackCases)

onMounted(async () => {
  try {
    cases.value = await api.get("/api/cases")
  } catch {
    cases.value = []
  }
})
</script>

<style scoped>
.case-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.case-card {
  min-height: 430px;
  display: flex;
  flex-direction: column;
  padding: 30px;
  border: 1px solid #DDE5F0;
  background: #FFFFFF;
}

.case-top {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  margin-bottom: 22px;
}

.case-top span {
  padding: 4px 10px;
  border-radius: 999px;
  color: #0B63F6;
  background: #DBEAFE;
  font-size: 12px;
  font-weight: 800;
}

.case-card h3 {
  margin-bottom: 8px;
  font-size: 22px;
  line-height: 1.35;
}

.case-client {
  margin-bottom: 16px;
  color: #0B63F6;
  font-size: 13px;
  font-weight: 800;
}

.case-desc {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.8;
}

.case-desc :deep(p) {
  margin: 0 0 10px;
}

.case-results {
  margin-top: auto;
  padding-top: 22px;
  border-top: 1px solid var(--border);
}

.case-results strong {
  display: block;
  margin-bottom: 12px;
  color: #10B981;
}

.case-results li {
  padding: 5px 0;
  color: var(--text);
  font-size: 13px;
}

.case-results li::before {
  content: "";
  display: inline-block;
  width: 7px;
  height: 7px;
  margin-right: 8px;
  border-radius: 999px;
  background: #10B981;
}

.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.testimonial-card {
  padding: 30px;
  border: 1px solid #DDE5F0;
  background: #FFFFFF;
}

.testimonial-card p {
  margin-bottom: 26px;
  color: var(--text);
  font-size: 16px;
  line-height: 1.8;
}

.testimonial-card strong,
.testimonial-card span {
  display: block;
}

.testimonial-card span {
  margin-top: 4px;
  color: var(--text-secondary);
  font-size: 13px;
}

.cta-section {
  padding: 84px 0;
  text-align: center;
  color: #FFFFFF;
  background: linear-gradient(135deg, #0B3B86 0%, #0B63F6 100%);
}

.cta-section h2 {
  margin-bottom: 28px;
  font-size: 34px;
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
  .case-grid,
  .testimonial-grid {
    grid-template-columns: 1fr;
  }
}
</style>
