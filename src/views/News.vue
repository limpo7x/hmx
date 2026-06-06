<template>
  <div class="page news-page">
    <section class="kinetic-page-hero">
      <div class="container hero-grid">
        <div>
          <span class="page-kicker">新闻资讯 / Insights</span>
          <h1>关注企业数字化、云原生和项目交付的实践观察</h1>
          <p>用更清晰的技术文章、行业洞察和项目复盘，帮助你判断下一步数字化建设方向。</p>
        </div>
        <div class="hero-panel">
          <div class="metric-grid">
            <div class="metric-chip"><strong>{{ articles.length }}</strong><span>文章收录</span></div>
            <div class="metric-chip"><strong>{{ categories.length }}</strong><span>内容栏目</span></div>
            <div class="metric-chip"><strong>Weekly</strong><span>持续更新</span></div>
            <div class="metric-chip"><strong>Tech</strong><span>技术观察</span></div>
          </div>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="news-tabs">
          <button :class="{ active: activeTab === 'all' }" @click="activeTab = 'all'">全部</button>
          <button
            v-for="cat in categories"
            :key="cat"
            :class="{ active: activeTab === cat }"
            @click="activeTab = cat"
          >{{ cat }}</button>
        </div>

        <div class="news-list">
          <router-link
            :to="`/news/${article.id}`"
            class="news-item dynamic-card"
            v-for="article in filteredNews"
            :key="article.id"
          >
            <div>
              <span class="news-category">{{ article.category }}</span>
              <h3>{{ article.title }}</h3>
              <p>{{ article.summary }}</p>
              <time>{{ article.date }}</time>
            </div>
            <em>阅读</em>
          </router-link>
        </div>

        <div class="news-empty" v-if="filteredNews.length === 0">
          <p>暂无相关文章</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue"
import { api } from "@/services/content.js"

const activeTab = ref("all")
const articles = ref([
  { id: 1, title: "企业数字化转型的关键路径", date: "2026-01-12", category: "行业洞察", summary: "从业务流程、数据资产和系统架构三个层面，拆解数字化项目的落地重点。" },
  { id: 2, title: "云原生架构如何提升系统稳定性", date: "2025-12-18", category: "技术分享", summary: "通过弹性伸缩、可观测性和自动化运维，构建可持续演进的技术底座。" },
  { id: 3, title: "定制软件项目如何控制交付风险", date: "2025-11-26", category: "交付实践", summary: "用阶段化目标、原型验证和持续反馈，让复杂项目更可控。" }
])

const categories = computed(() => [...new Set(articles.value.map(a => a.category).filter(Boolean))])

const filteredNews = computed(() => {
  if (activeTab.value === "all") return articles.value
  return articles.value.filter(a => a.category === activeTab.value)
})

onMounted(async () => {
  const payload = await api.get("/api/articles").catch(() => null)
  if (Array.isArray(payload) && payload.length) articles.value = payload
})
</script>

<style scoped>
.news-tabs {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  margin-bottom: 36px;
}

.news-tabs button {
  min-height: 40px;
  padding: 0 18px;
  border: 1px solid #DDE5F0;
  border-radius: 999px;
  background: #FFFFFF;
  color: var(--text-secondary);
  cursor: pointer;
  transition: transform var(--transition), color var(--transition), background var(--transition), border-color var(--transition);
}

.news-tabs button:hover {
  transform: translateY(-2px);
  border-color: #93C5FD;
  color: #0B63F6;
}

.news-tabs button.active {
  border-color: #0B63F6;
  color: #FFFFFF;
  background: #0B63F6;
}

.news-list {
  display: grid;
  gap: 18px;
}

.news-item {
  display: grid;
  grid-template-columns: 1fr auto;
  gap: 32px;
  align-items: center;
  padding: 30px 34px;
  border: 1px solid #DDE5F0;
  background: #FFFFFF;
}

.news-category {
  display: inline-flex;
  margin-bottom: 12px;
  padding: 4px 10px;
  border-radius: 999px;
  color: #0B63F6;
  background: #DBEAFE;
  font-size: 12px;
  font-weight: 800;
}

.news-item h3 {
  margin-bottom: 10px;
  font-size: 22px;
  line-height: 1.4;
}

.news-item p {
  max-width: 760px;
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.7;
}

.news-item time {
  display: block;
  margin-top: 14px;
  color: #94A3B8;
  font-size: 13px;
}

.news-item em {
  color: #0B63F6;
  font-style: normal;
  font-weight: 900;
}

.news-empty {
  padding: 60px 0;
  text-align: center;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .news-item {
    grid-template-columns: 1fr;
  }
}
</style>
