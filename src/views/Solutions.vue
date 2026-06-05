<template>
  <div class="page">
    <section class="page-hero">
      <div class="container">
        <h1>解决方案</h1>
        <p>深入行业场景，提供针对性的数字化解决方案</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="solution-list">
          <div class="solution-item" v-for="(sol, i) in solutions" :key="i" :class="{ reverse: i % 2 === 1 }">
            <div class="solution-item-icon">
              <span v-if="sol.icon === 'cart'">🛒</span>
              <span v-else-if="sol.icon === 'gov'">🏛️</span>
              <span v-else-if="sol.icon === 'edu'">🎓</span>
              <span v-else-if="sol.icon === 'med'">🏥</span>
              <span v-else-if="sol.icon === 'park'">🏢</span>
              <span v-else>💼</span>
            </div>
            <div class="solution-item-content">
              <h2>{{ sol.title }}</h2>
              <p>{{ sol.desc }}</p>
              <ul class="solution-features">
                <li v-for="f in solutionFeatures[sol.icon]" :key="f">{{ f }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <h2>找到适合您的解决方案了吗？</h2>
        <p>立即联系我们，我们为您量身定制专属方案</p>
        <router-link to="/contact" class="btn-primary">获取定制方案</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { solutions } from "@/data/site.js"

const solutionFeatures = {
  cart: ["B2B/B2C/B2B2C多模式支持", "多端统一（PC、H5、小程序、App）", "智能营销与数据分析", "ERP/WMS对接"],
  gov: ["一网通办政务服务", "数据共享交换平台", "智能审批系统", "便民服务移动端"],
  edu: ["在线直播互动教学", "智能题库与作业系统", "教务管理一体化", "学情分析与个性化推荐"],
  med: ["在线问诊与预约挂号", "电子病历管理", "智能分诊导诊", "药品配送管理"],
  park: ["园区综合管理平台", "物联网设备集成", "智慧安防与能耗管理", "企业服务门户"],
  corp: ["企业协同办公平台", "数据中台建设", "CRM与营销自动化", "业务流程数字化"]
}
</script>

<style scoped>
.page-hero {
  padding: 140px 0 60px;
  background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
  text-align: center;
}

.page-hero h1 { font-size: 40px; font-weight: 800; margin-bottom: 12px; }
.page-hero p { font-size: 17px; color: var(--text-secondary); }

.solution-list {
  display: flex;
  flex-direction: column;
  gap: 40px;
}

.solution-item {
  display: grid;
  grid-template-columns: 200px 1fr;
  gap: 40px;
  align-items: center;
  padding: 40px;
  background: var(--bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transition: transform var(--transition);
}

.solution-item:hover {
  transform: translateY(-2px);
}

.solution-item.reverse {
  direction: rtl;
}

.solution-item.reverse .solution-item-content {
  direction: ltr;
}

.solution-item-icon {
  font-size: 64px;
  text-align: center;
  direction: ltr;
}

.solution-item-content h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 12px;
}

.solution-item-content p {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 16px;
}

.solution-features {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.solution-features li {
  font-size: 14px;
  color: var(--text);
  padding-left: 20px;
  position: relative;
}

.solution-features li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: var(--primary);
  font-weight: 700;
}

.cta-section {
  padding: 80px 0;
  text-align: center;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
}

.cta-section h2 { font-size: 32px; font-weight: 800; margin-bottom: 12px; }
.cta-section p { font-size: 17px; opacity: 0.9; margin-bottom: 32px; }

.btn-primary {
  display: inline-block;
  padding: 14px 32px;
  background: white;
  color: var(--primary);
  border: none;
  border-radius: var(--radius-sm);
  font-size: 16px;
  font-weight: 600;
  transition: transform var(--transition), box-shadow var(--transition);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(255, 255, 255, 0.35);
}

@media (max-width: 768px) {
  .page-hero h1 { font-size: 30px; }
  .solution-item {
    grid-template-columns: 1fr;
    gap: 20px;
    padding: 28px;
  }
  .solution-item.reverse { direction: ltr; }
  .solution-item-icon { font-size: 48px; }
  .solution-features { grid-template-columns: 1fr; }
}
</style>
