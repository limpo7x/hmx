<template>
  <div class="page">
    <section class="article-hero">
      <div class="container">
        <span class="news-category">{{ article?.category }}</span>
        <h1>{{ article?.title }}</h1>
        <div class="article-meta">
          <span>{{ article?.date }}</span>
          <span>宏梦线</span>
        </div>
      </div>
    </section>

    <section class="section">
      <div class="container article-body" v-if="article">
        <div class="article-content">
          <p v-for="(paragraph, index) in formattedContent" :key="index">{{ paragraph }}</p>
        </div>

        <div class="article-nav">
          <router-link to="/news" class="link-arrow">← 返回资讯列表</router-link>
        </div>
      </div>

      <div class="container" v-else>
        <p class="not-found">文章不存在</p>
        <div style="text-align:center;margin-top:20px">
          <router-link to="/news" class="link-arrow">返回资讯列表</router-link>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { newsArticles } from "@/data/site.js"
import { api } from "@/services/content.js"

const route = useRoute()
const article = ref(newsArticles.find(a => a.id === Number(route.params.id)))

const formattedContent = computed(() => {
  if (!article.value) return []
  return String(article.value.content || "")
    .split("\n\n")
    .filter(Boolean)
    .map(p => p.replace(/\n/g, "\n"))
})

onMounted(async () => {
  article.value = await api.get(`/api/articles/${route.params.id}`).catch(() => article.value)
})
</script>

<style scoped>
.article-hero {
  padding: 140px 0 50px;
  background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
}

.article-hero h1 {
  font-size: 34px;
  font-weight: 800;
  line-height: 1.4;
  margin: 16px 0;
  max-width: 800px;
}

.news-category {
  display: inline-block;
  padding: 4px 14px;
  font-size: 13px;
  font-weight: 600;
  color: var(--primary);
  background: var(--primary-light);
  border-radius: 4px;
}

.article-meta {
  display: flex;
  gap: 20px;
  font-size: 14px;
  color: var(--text-secondary);
}

.article-body {
  max-width: 780px;
  margin: 0 auto;
}

.article-content {
  font-size: 16px;
  line-height: 2;
  color: var(--text);
}

.article-content :deep(p) {
  margin-bottom: 24px;
}

.article-nav {
  margin-top: 60px;
  padding-top: 30px;
  border-top: 1px solid var(--border);
}

.link-arrow {
  font-size: 15px;
  font-weight: 600;
  color: var(--primary);
}

.link-arrow:hover {
  text-decoration: underline;
}

.not-found {
  text-align: center;
  font-size: 18px;
  color: var(--text-secondary);
  padding: 60px 0;
}

@media (max-width: 768px) {
  .article-hero h1 { font-size: 26px; }
  .article-content { font-size: 15px; }
}
</style>
