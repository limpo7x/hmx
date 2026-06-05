<template>
  <div class="page">
    <section class="page-hero">
      <div class="container">
        <h1>客户案例</h1>
        <p>500+成功案例，见证客户的数字化转型之路</p>
      </div>
    </section>

    <section class="section">
      <div class="container">
        <div class="case-grid">
          <div class="case-card" v-for="cs in cases" :key="cs.id">
            <div class="case-tags">
              <span v-for="tag in cs.tags" :key="tag">{{ tag }}</span>
            </div>
            <h3>{{ cs.title }}</h3>
            <p class="case-client">{{ cs.client }}</p>
            <p class="case-desc">{{ cs.desc }}</p>
            <div class="case-results">
              <h4>项目成果</h4>
              <ul>
                <li v-for="r in cs.results" :key="r">{{ r }}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="section section-gray">
      <div class="container">
        <SectionTitle tag="客户评价" title="他们的信任，我们的动力" center />
        <div class="testimonial-grid">
          <div class="testimonial-card" v-for="(t, i) in testimonials" :key="i">
            <div class="testimonial-stars">★★★★★</div>
            <p>"{{ t.content }}"</p>
            <div class="testimonial-author">
              <div class="testimonial-avatar">{{ t.name.charAt(0) }}</div>
              <div>
                <strong>{{ t.name }}</strong>
                <span>{{ t.company }}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="cta-section">
      <div class="container">
        <h2>想成为下一个成功案例吗？</h2>
        <p>立即联系我们，开启您的数字化转型之旅</p>
        <router-link to="/contact" class="btn-primary">立即咨询</router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { onMounted, ref } from "vue"
import SectionTitle from "@/components/SectionTitle.vue"
import { caseStudies, testimonials } from "@/data/site.js"
import { api } from "@/services/content.js"

const cases = ref(caseStudies)

onMounted(async () => {
  cases.value = await api.get("/api/cases").catch(() => caseStudies)
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

.case-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.case-card {
  background: var(--bg);
  padding: 32px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transition: transform var(--transition);
}

.case-card:hover {
  transform: translateY(-4px);
}

.case-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-bottom: 16px;
}

.case-tags span {
  padding: 3px 10px;
  font-size: 12px;
  font-weight: 600;
  color: var(--primary);
  background: var(--primary-light);
  border-radius: 4px;
}

.case-card h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 6px;
}

.case-client {
  font-size: 13px;
  color: var(--text-secondary);
  margin-bottom: 12px;
}

.case-desc {
  font-size: 14px;
  line-height: 1.7;
  color: var(--text-secondary);
  margin-bottom: 16px;
}

.case-results {
  padding-top: 16px;
  border-top: 1px solid var(--border);
}

.case-results h4 {
  font-size: 13px;
  font-weight: 600;
  color: #16A34A;
  margin-bottom: 8px;
}

.case-results li {
  font-size: 13px;
  color: var(--text);
  padding: 3px 0;
  padding-left: 16px;
  position: relative;
}

.case-results li::before {
  content: "✓";
  position: absolute;
  left: 0;
  color: #16A34A;
  font-weight: 700;
  font-size: 12px;
}

/* Testimonials */
.testimonial-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
}

.testimonial-card {
  background: var(--bg);
  padding: 32px;
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.testimonial-stars {
  color: #F59E0B;
  font-size: 16px;
  margin-bottom: 12px;
  letter-spacing: 2px;
}

.testimonial-card p {
  font-size: 15px;
  line-height: 1.7;
  color: var(--text);
  margin-bottom: 20px;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.testimonial-avatar {
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 14px;
}

.testimonial-author strong { display: block; font-size: 14px; }
.testimonial-author span { font-size: 12px; color: var(--text-secondary); }

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
  .case-grid { grid-template-columns: 1fr 1fr; }
  .testimonial-grid { grid-template-columns: 1fr; }
}

@media (max-width: 480px) {
  .case-grid { grid-template-columns: 1fr; }
}
</style>
