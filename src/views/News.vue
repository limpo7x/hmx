<template>
  <div class="page">
    <section class="page-hero">
      <div class="container">
        <h1>新闻资讯</h1>
        <p>了解宏梦线的最新动态与技术分享</p>
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
            class="news-item"
            v-for="article in filteredNews"
            :key="article.id"
          >
            <div class="news-item-content">
              <span class="news-category">{{ article.category }}</span>
              <h3>{{ article.title }}</h3>
              <p>{{ article.summary }}</p>
              <span class="news-date">{{ article.date }}</span>
            </div>
            <div class="news-item-arrow">→</div>
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
import { newsArticles } from "@/data/site.js"
import { api } from "@/services/content.js"

const activeTab = ref("all")
const articles = ref(newsArticles)
const categories = computed(() => [...new Set(articles.value.map(a => a.category))])

const filteredNews = computed(() => {
  if (activeTab.value === "all") return articles.value
  return articles.value.filter(a => a.category === activeTab.value)
})

onMounted(async () => {
  articles.value = await api.get("/api/articles").catch(() => newsArticles)
})
</script>

<style scoped>
.page-hero {
  padding: 140px 0 60px;
  background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
  text-align: center;
}

.page-hero h1 { font-size: 40px; font-weight: 800; margin-bottom: 12px; }
.page-hero p { font-size: 17px; color: var(--text-secondary); }

.news-tabs {
  display: flex;
  gap: 12px;
  margin-bottom: 40px;
  flex-wrap: wrap;
}

.news-tabs button {
  padding: 8px 20px;
  border: 1px solid var(--border);
  border-radius: 100px;
  background: var(--bg);
  color: var(--text-secondary);
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all var(--transition);
}

.news-tabs button:hover {
  border-color: var(--primary);
  color: var(--primary);
}

.news-tabs button.active {
  background: var(--primary);
  border-color: var(--primary);
  color: white;
}

.news-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.news-item {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 28px 32px;
  background: var(--bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transition: transform var(--transition), box-shadow var(--transition);
}

.news-item:hover {
  transform: translateX(6px);
  box-shadow: var(--shadow-lg);
}

.news-category {
  display: inline-block;
  padding: 2px 10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--primary);
  background: var(--primary-light);
  border-radius: 4px;
  margin-bottom: 8px;
}

.news-item-content h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 8px;
}

.news-item-content p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.6;
}

.news-date {
  display: inline-block;
  margin-top: 8px;
  font-size: 13px;
  color: #94A3B8;
}

.news-item-arrow {
  font-size: 24px;
  color: var(--text-secondary);
  flex-shrink: 0;
  margin-left: 24px;
}

.news-empty {
  text-align: center;
  padding: 60px 0;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .page-hero h1 { font-size: 30px; }
  .news-item { padding: 20px 24px; }
  .news-item-arrow { display: none; }
}
</style>
