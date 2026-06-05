<template>
  <div class="page">
    <section class="page-hero">
      <div class="container">
        <h1>留言咨询</h1>
        <p>留下您的需求，我们将在24小时内与您联系</p>
      </div>
    </section>

    <section class="section">
      <div class="container contact-layout">
        <div class="contact-info">
          <h2>联系方式</h2>
          <p class="contact-intro">无论是项目合作还是技术咨询，我们都期待与您的交流。</p>

          <div class="info-item">
            <div class="info-icon">📞</div>
            <div>
              <strong>电话</strong>
              <span>{{ site.phone }}</span>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon">📧</div>
            <div>
              <strong>邮箱</strong>
              <span>{{ site.email }}</span>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon">📍</div>
            <div>
              <strong>地址</strong>
              <span>{{ site.address }}</span>
            </div>
          </div>

          <div class="info-item">
            <div class="info-icon">🕐</div>
            <div>
              <strong>工作时间</strong>
              <span>周一至周五 9:00 - 18:00</span>
            </div>
          </div>
        </div>

        <div class="contact-form-wrap">
          <ContactForm />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup>
import { computed } from "vue"
import ContactForm from "@/components/ContactForm.vue"
import { contentState } from "@/services/content.js"

const site = computed(() => contentState.site)
</script>

<style scoped>
.page-hero {
  padding: 140px 0 60px;
  background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%);
  text-align: center;
}

.page-hero h1 { font-size: 40px; font-weight: 800; margin-bottom: 12px; }
.page-hero p { font-size: 17px; color: var(--text-secondary); }

.contact-layout {
  display: grid;
  grid-template-columns: 1fr 1.2fr;
  gap: 60px;
  align-items: start;
}

.contact-info h2 {
  font-size: 28px;
  font-weight: 700;
  margin-bottom: 12px;
}

.contact-intro {
  font-size: 15px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 40px;
}

.info-item {
  display: flex;
  gap: 16px;
  margin-bottom: 24px;
}

.info-icon {
  font-size: 24px;
  flex-shrink: 0;
  width: 48px;
  height: 48px;
  background: var(--primary-light);
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.info-item strong {
  display: block;
  font-size: 14px;
  color: var(--text-secondary);
  margin-bottom: 2px;
}

.info-item span {
  font-size: 15px;
  color: var(--text);
  font-weight: 500;
}

@media (max-width: 768px) {
  .page-hero h1 { font-size: 30px; }
  .contact-layout {
    grid-template-columns: 1fr;
    gap: 40px;
  }
}
</style>
