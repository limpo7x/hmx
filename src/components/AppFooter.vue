<template>
  <footer class="footer">
    <div class="footer-main container">
      <div class="footer-brand">
        <div class="footer-logo">
          <span class="footer-logo-icon">M</span>
          <span>{{ site.name }}</span>
        </div>
        <p class="footer-desc">{{ site.description }}</p>
      </div>

      <div class="footer-links">
        <div class="footer-col">
          <h4>快速导航</h4>
          <router-link v-for="link in navLinks" :key="link.path" :to="link.path">{{ link.label }}</router-link>
        </div>
        <div class="footer-col">
          <h4>联系我们</h4>
          <span>电话：{{ site.phone }}</span>
          <span>邮箱：{{ site.email }}</span>
          <span>地址：{{ site.address }}</span>
        </div>
        <div class="footer-col">
          <h4>关注我们</h4>
          <a :href="site.social.wechat">微信</a>
          <a :href="site.social.weibo">微博</a>
          <a :href="site.social.zhihu">知乎</a>
        </div>
      </div>
    </div>

    <div class="footer-bottom">
      <div class="container">
        <p>&copy; {{ year }} {{ site.fullName }} All Rights Reserved.</p>
        <p><a :href="site.icpUrl" target="_blank" rel="noopener noreferrer">{{ site.icp }}</a></p>
      </div>
    </div>
  </footer>
</template>

<script setup>
import { computed } from "vue"
import { navLinks } from "@/data/site.js"
import { contentState } from "@/services/content.js"

const site = computed(() => contentState.site)
const year = new Date().getFullYear()
</script>

<style scoped>
.footer {
  background: var(--bg-dark);
  color: #CBD5E1;
}

.footer-main {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 60px;
  padding-top: 60px;
  padding-bottom: 40px;
}

.footer-brand {
  max-width: 320px;
}

.footer-logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 20px;
  font-weight: 700;
  color: white;
  margin-bottom: 16px;
}

.footer-logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  border-radius: 8px;
  font-size: 18px;
}

.footer-desc {
  font-size: 14px;
  line-height: 1.8;
  color: #94A3B8;
}

.footer-links {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 40px;
}

.footer-col h4 {
  color: white;
  font-size: 15px;
  margin-bottom: 16px;
  font-weight: 600;
}

.footer-col a,
.footer-col span {
  display: block;
  font-size: 14px;
  color: #94A3B8;
  margin-bottom: 10px;
  transition: color var(--transition);
}

.footer-col a:hover {
  color: var(--primary-light);
}

.footer-bottom {
  border-top: 1px solid rgba(255, 255, 255, 0.08);
  padding: 20px 0;
}

.footer-bottom .container {
  display: flex;
  justify-content: space-between;
  font-size: 13px;
  color: #64748B;
}

@media (max-width: 768px) {
  .footer-main {
    grid-template-columns: 1fr;
    gap: 40px;
  }

  .footer-links {
    grid-template-columns: 1fr 1fr;
  }

  .footer-bottom .container {
    flex-direction: column;
    gap: 8px;
    text-align: center;
  }
}

@media (max-width: 480px) {
  .footer-links {
    grid-template-columns: 1fr;
  }
}
</style>
