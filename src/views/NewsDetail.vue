<template>
  <div class="page article-page">
    <section class="kinetic-page-hero article-hero">
      <div class="container">
        <span class="page-kicker">{{ article?.category || "技术观察" }}</span>
        <h1>{{ article?.title || "文章不存在" }}</h1>
        <p>{{ article?.date || "" }} · 宏梦线观点库</p>
      </div>
    </section>

    <section class="section">
      <div class="container article-layout" v-if="article">
        <article class="article-content glass-card rich-content" v-html="articleContentHtml"></article>
        <router-link to="/news" class="back-link dynamic-card">返回资讯列表</router-link>
      </div>

      <div class="container not-found" v-else>
        <p>文章不存在</p>
        <router-link to="/news" class="back-link">返回资讯列表</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed, onMounted, ref } from "vue"
import { useRoute } from "vue-router"
import { api } from "@/services/content.js"

const route = useRoute()
const fallbackArticles = [
  { id: 1, title: "企业数字化转型的关键路径", date: "2026-01-12", category: "行业洞察", summary: "从业务流程、数据资产和系统架构三个层面，拆解数字化项目的落地重点。", content: "企业数字化并不是简单上线一套系统，而是围绕业务流程、数据资产和组织协同进行持续建设。\n\n一个可靠的数字化项目通常需要先明确业务目标，再判断哪些流程应该系统化，哪些数据需要被沉淀，哪些体验会直接影响转化和效率。\n\n宏梦线更关注可落地的技术路径：先做清楚，再做稳定，最后持续优化。" },
  { id: 2, title: "云原生架构如何提升系统稳定性", date: "2025-12-18", category: "技术分享", summary: "通过弹性伸缩、可观测性和自动化运维，构建可持续演进的技术底座。", content: "云原生架构的价值不只在部署方式，更在于让系统具备弹性、可观测和快速恢复能力。\n\n通过容器化、自动化部署、日志监控和告警机制，团队可以更快发现问题，也能更稳地支撑业务增长。\n\n对企业来说，技术底座稳定，业务创新才有空间。" },
  { id: 3, title: "定制软件项目如何控制交付风险", date: "2025-11-26", category: "交付实践", summary: "用阶段化目标、原型验证和持续反馈，让复杂项目更可控。", content: "定制软件项目的风险往往来自需求不清、边界变化和反馈滞后。\n\n更稳妥的方式是把项目拆成明确阶段，用原型验证关键流程，用可演示版本持续校准方向。\n\n当目标、产物和节奏都清楚时，复杂项目也可以变得可控。" }
]

const article = ref(fallbackArticles.find(a => a.id === Number(route.params.id)))

const articleContentHtml = computed(() => {
  if (!article.value) return ""
  const content = String(article.value.content || article.value.summary || "")
  if (/<\/?[a-z][\s\S]*>/i.test(content)) return content
  return content
    .split(/\n{2,}/)
    .map((paragraph) => paragraph.trim())
    .filter(Boolean)
    .map((paragraph) => `<p>${escapeHtml(paragraph).replace(/\n/g, "<br>")}</p>`)
    .join("")
})

function escapeHtml(value) {
  return String(value).replace(/[&<>"']/g, (char) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "\"": "&quot;",
    "'": "&#39;"
  })[char])
}

onMounted(async () => {
  article.value = await api.get(`/api/articles/${route.params.id}`).catch(() => article.value)
})
</script>

<style scoped>
.article-hero h1 {
  max-width: 900px;
}

.article-layout {
  max-width: 860px;
}

.article-content {
  padding: 42px;
  border-color: #DDE5F0;
  background: #FFFFFF;
}

.article-content :deep(p) {
  margin-bottom: 24px;
  color: var(--text);
  font-size: 17px;
  line-height: 2;
}

.article-content :deep(p:last-child) {
  margin-bottom: 0;
}

.article-content :deep(h2),
.article-content :deep(h3) {
  margin: 28px 0 14px;
  color: var(--text);
  line-height: 1.35;
}

.article-content :deep(ul),
.article-content :deep(ol) {
  margin: 0 0 24px 24px;
  color: var(--text);
  line-height: 2;
}

.article-content :deep(blockquote) {
  margin: 24px 0;
  padding: 16px 20px;
  border-left: 4px solid #0B63F6;
  background: #F8FAFC;
  color: var(--text-secondary);
}

.article-content :deep(a) {
  color: #0B63F6;
  text-decoration: underline;
}

.back-link {
  display: inline-flex;
  margin-top: 34px;
  padding: 13px 20px;
  border: 1px solid #DDE5F0;
  border-radius: 8px;
  color: #0B63F6;
  background: #FFFFFF;
  font-weight: 800;
}

.not-found {
  text-align: center;
  color: var(--text-secondary);
}

@media (max-width: 768px) {
  .article-content {
    padding: 26px;
  }

  .article-content :deep(p) {
    font-size: 15px;
  }
}
</style>
