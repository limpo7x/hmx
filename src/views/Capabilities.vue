<template>
  <div class="page">
    <section class="page-hero">
      <div class="container">
        <h1>核心能力</h1>
        <p>深耕互联网软件开发，以技术驱动商业创新</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <SectionTitle tag="服务能力" title="全方位技术服务" center />
        <div class="cap-grid">
          <div class="cap-card" v-for="(cap, i) in capabilities" :key="i">
            <div class="cap-icon">
              <span v-if="cap.icon === 'web'">🌐</span>
              <span v-else-if="cap.icon === 'mobile'">📱</span>
              <span v-else-if="cap.icon === 'system'">⚙️</span>
              <span v-else-if="cap.icon === 'cloud'">☁️</span>
              <span v-else-if="cap.icon === 'ai'">🤖</span>
              <span v-else>🎨</span>
            </div>
            <h3>{{ cap.title }}</h3>
            <p>{{ cap.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-gray">
      <div class="container">
        <SectionTitle tag="技术栈" title="技术实力" center />
        <div class="tech-grid">
          <div class="tech-cat" v-for="cat in techStack" :key="cat.name">
            <h3>{{ cat.name }}</h3>
            <div class="tech-tags">
              <span v-for="t in cat.items" :key="t">{{ t }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <SectionTitle tag="服务流程" title="标准化服务流程" subtitle="从需求到交付，全程透明可控" center />
        <div class="process">
          <div class="process-step" v-for="(step, i) in processSteps" :key="i">
            <div class="process-num">{{ String(i + 1).padStart(2, "0") }}</div>
            <h3>{{ step.title }}</h3>
            <p>{{ step.desc }}</p>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <h2>准备好开启您的数字化之旅了吗？</h2>
        <p>立即联系我们，获取免费的项目咨询和技术方案</p>
        <router-link to="/contact" class="btn-primary">立即咨询</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import SectionTitle from "@/components/SectionTitle.vue"
import { capabilities } from "@/data/site.js"

const techStack = [
  { name: "前端技术", items: ["Vue.js", "React", "TypeScript", "Webpack", "Vite", "Next.js", "Nuxt.js", "Tailwind CSS"] },
  { name: "后端技术", items: ["Java/Spring Boot", "Go", "Python/Django", "Node.js", "MySQL", "PostgreSQL", "Redis", "MongoDB"] },
  { name: "移动开发", items: ["iOS/Swift", "Android/Kotlin", "Flutter", "React Native", "Uni-App", "微信小程序", "鸿蒙"] },
  { name: "云与运维", items: ["AWS", "阿里云", "Docker", "Kubernetes", "Jenkins", "Nginx", "Prometheus", "Grafana"] },
  { name: "AI与数据", items: ["TensorFlow", "PyTorch", "LangChain", "Hadoop", "Spark", "Flink", "Elasticsearch"] }
]

const processSteps = [
  { title: "需求沟通", desc: "深入了解业务场景，梳理核心需求，明确项目目标和范围" },
  { title: "方案设计", desc: "输出技术方案、架构设计和原型图，确保方案可行性" },
  { title: "UI/UX设计", desc: "以用户为中心进行界面设计，打造美观易用的产品体验" },
  { title: "迭代开发", desc: "采用敏捷开发模式，分阶段交付，持续收集反馈优化" },
  { title: "测试上线", desc: "全面测试保障质量，平稳部署上线，确保系统稳定运行" },
  { title: "运维支持", desc: "7x24小时运维保障，定期系统巡检，持续迭代升级" }
]
</script>

<style scoped>
.page-hero {
  padding: 140px 0 60px;
  background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
  text-align: center;
}

.page-hero h1 {
  font-size: 40px;
  font-weight: 800;
  margin-bottom: 12px;
}

.page-hero p {
  font-size: 17px;
  color: var(--text-secondary);
}

.cap-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.cap-card {
  background: var(--bg);
  padding: 32px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transition: transform var(--transition), box-shadow var(--transition);
}

.cap-card:hover {
  transform: translateY(-4px);
  box-shadow: var(--shadow-lg);
}

.cap-icon { font-size: 32px; margin-bottom: 16px; }
.cap-card h3 { font-size: 18px; font-weight: 700; margin-bottom: 10px; }
.cap-card p { font-size: 14px; color: var(--text-secondary); line-height: 1.7; }

.tech-grid {
  display: grid;
  gap: 28px;
}

.tech-cat h3 {
  font-size: 16px;
  font-weight: 700;
  margin-bottom: 12px;
  color: var(--primary);
}

.tech-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tech-tags span {
  padding: 6px 14px;
  font-size: 13px;
  background: var(--bg);
  border: 1px solid var(--border);
  border-radius: 100px;
  color: var(--text-secondary);
}

.process {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 32px 24px;
}

.process-step {
  text-align: center;
  padding: 28px 20px;
  background: var(--bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.process-num {
  font-size: 36px;
  font-weight: 800;
  color: var(--primary-light);
  margin-bottom: 12px;
}

.process-step h3 {
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 8px;
}

.process-step p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
}

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

.cta-section {
  padding: 80px 0;
  text-align: center;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
}

.cta-section h2 { font-size: 32px; font-weight: 800; margin-bottom: 12px; }
.cta-section p { font-size: 17px; opacity: 0.9; margin-bottom: 32px; }

@media (max-width: 768px) {
  .page-hero h1 { font-size: 30px; }
  .cap-grid { grid-template-columns: 1fr; }
  .process { grid-template-columns: 1fr 1fr; }
}

@media (max-width: 480px) {
  .process { grid-template-columns: 1fr; }
}
</style>
