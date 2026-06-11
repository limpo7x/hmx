<template>
  <div class="page contact-page">
    <section class="kinetic-page-hero">
      <div class="container hero-grid">
        <div>
          <span class="page-kicker">留言咨询 / Start a Project</span>
          <h1>把你的业务目标告诉我们，24小时内给出初步路径</h1>
          <p>无论是官网建设、系统定制、移动应用还是企业数字化升级，我们会先帮你把需求拆清楚。</p>
        </div>
        <div class="hero-panel">
          <div class="metric-grid">
            <div class="metric-chip"><strong>24h</strong><span>快速响应</span></div>
            <div class="metric-chip"><strong>1v1</strong><span>项目咨询</span></div>
            <div class="metric-chip"><strong>0元</strong><span>初步评估</span></div>
            <div class="metric-chip"><strong>NDA</strong><span>信息保密</span></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-gray">
      <div class="container contact-layout">
        <aside class="contact-info">
          <span class="status-dot">咨询通道在线</span>
          <h2>联系方式</h2>
          <p>我们会先了解你的目标、当前系统、预算范围和期望上线时间，再给出更清晰的建议。</p>

          <div class="info-list">
            <div class="info-item dynamic-card" v-for="item in contactItems" :key="item.label">
              <strong>{{ item.label }}</strong>
              <span>{{ item.value }}</span>
            </div>
          </div>
        </aside>

        <div class="contact-form-wrap">
          <ContactForm />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue"
import ContactForm from "@/components/ContactForm.vue"
import { contentState, loadSite } from "@/services/content.js"

const site = computed(() => contentState.site)
const contactItems = computed(() => [
  { label: "电话", value: site.value.phone || "400-888-9999" },
  { label: "邮箱", value: site.value.email || "contact@hongmengxian.com" },
  { label: "地址", value: site.value.address || "西安市高新区科技路 88 号" },
  { label: "工作时间", value: site.value.workTime || "周一至周五 9:00 - 18:00" }
])

onMounted(() => {
  if (!contentState.loaded) loadSite()
})
</script>

<style scoped>
.contact-layout {
  display: grid;
  grid-template-columns: 0.82fr 1.18fr;
  gap: 54px;
  align-items: start;
}

.contact-info {
  position: sticky;
  top: 108px;
  padding: 34px;
  border: 1px solid rgba(147, 197, 253, 0.26);
  border-radius: 8px;
  color: #FFFFFF;
  background:
    radial-gradient(circle at 82% 18%, rgba(56, 189, 248, 0.18), transparent 32%),
    linear-gradient(135deg, #020817, #07162D 62%, #0B3B86);
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.18);
}

.contact-info h2 {
  margin: 18px 0 12px;
  font-size: 30px;
}

.contact-info p {
  color: rgba(255, 255, 255, 0.72);
  line-height: 1.8;
}

.info-list {
  display: grid;
  gap: 14px;
  margin-top: 32px;
}

.info-item {
  padding: 18px;
  border: 1px solid rgba(255, 255, 255, 0.16);
  background: rgba(255, 255, 255, 0.08);
}

.info-item strong,
.info-item span {
  display: block;
}

.info-item strong {
  color: #93C5FD;
  font-size: 13px;
}

.info-item span {
  margin-top: 6px;
  color: #FFFFFF;
  font-size: 15px;
}

@media (max-width: 900px) {
  .contact-layout {
    grid-template-columns: 1fr;
  }

  .contact-info {
    position: static;
  }
}
</style>
