<template>
  <div class="home">
    <!-- Hero Banner -->
    <section class="hero">
      <div class="hero-bg"></div>
      <div class="container hero-content">
          <div class="hero-text fade-in" ref="heroText">
          <h1>{{ site.slogan }}</h1>
          <p>{{ site.description }}</p>
          <div class="hero-actions">
            <router-link to="/contact" class="btn-primary">免费咨询</router-link>
            <router-link to="/capabilities" class="btn-outline">了解更多</router-link>
          </div>
        </div>
        <div class="hero-visual fade-in" ref="heroVisual">
          <div class="hero-card">
            <div class="hero-card-icon">&#60;/&#62;</div>
            <div class="hero-card-title">互联网软件开发</div>
            <div class="hero-card-stats">
              <div><strong>200+</strong><span>团队成员</span></div>
              <div><strong>500+</strong><span>成功案例</span></div>
              <div><strong>98%</strong><span>客户满意度</span></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <section class="topic-strip" v-if="topics.length">
      <div class="container">
        <a class="topic-card" :href="topics[0].link || '#'" :target="topics[0].link ? '_blank' : undefined" rel="noopener noreferrer">
          <img v-if="topics[0].imageUrl" :src="topics[0].imageUrl" :alt="topics[0].title" />
          <div class="topic-copy">
            <span>专题发布</span>
            <strong>{{ topics[0].title }}</strong>
            <p>{{ topics[0].subtitle }}</p>
          </div>
          <em>查看详情</em>
        </a>
      </div>
    </section>

    <!-- Capabilities -->
    <section class="section section-gray">
      <div class="container">
        <SectionTitle
          tag="核心能力"
          title="全方位技术服务"
          subtitle="深耕互联网软件领域，提供从咨询、设计到开发、运维的全周期服务"
        />
        <div class="cap-grid">
          <div class="cap-card fade-in" v-for="(cap, i) in capabilities" :key="i" :ref="el => cardRefs[i] = el">
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

    <!-- Solutions Preview -->
    <section class="section">
      <div class="container">
        <SectionTitle
          tag="解决方案"
          title="行业数字化解决方案"
          subtitle="深入行业场景，提供针对性的技术方案，助力企业数字化转型"
        />
        <div class="solution-grid">
          <div class="solution-card fade-in" v-for="(sol, i) in solutions.slice(0, 3)" :key="i">
            <div class="solution-card-icon">
              <span v-if="sol.icon === 'cart'">🛒</span>
              <span v-else-if="sol.icon === 'gov'">🏛️</span>
              <span v-else>🎓</span>
            </div>
            <h3>{{ sol.title }}</h3>
            <p>{{ sol.desc }}</p>
          </div>
        </div>
        <div class="section-more">
          <router-link to="/solutions" class="link-arrow">查看全部方案 →</router-link>
        </div>
      </div>
    </section>

    <!-- Testimonials -->
    <section class="section section-gray">
      <div class="container">
        <SectionTitle
          tag="客户评价"
          title="他们都在用宏梦线"
          subtitle="客户的信任是我们最大的动力"
        />
        <div class="testimonial-slider">
          <div class="testimonial-track" :style="{ transform: `translateX(-${currentSlide * 100}%)` }">
            <div class="testimonial-card" v-for="(t, i) in testimonials" :key="i">
              <div class="testimonial-stars">★★★★★</div>
              <p class="testimonial-text">"{{ t.content }}"</p>
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
        <div class="slider-dots">
          <button
            v-for="(t, i) in testimonials"
            :key="i"
            :class="{ active: i === currentSlide }"
            @click="currentSlide = i"
          ></button>
        </div>
      </div>
    </section>

    <!-- News Preview -->
    <section class="section">
      <div class="container">
        <SectionTitle
          tag="新闻资讯"
          title="最新动态"
          subtitle="了解宏梦线的最新新闻和技术分享"
        />
        <div class="news-grid">
          <router-link :to="`/news/${a.id}`" class="news-card fade-in" v-for="a in articles.slice(0, 3)" :key="a.id">
            <span class="news-category">{{ a.category }}</span>
            <h3>{{ a.title }}</h3>
            <p>{{ a.summary }}</p>
            <span class="news-date">{{ a.date }}</span>
          </router-link>
        </div>
        <div class="section-more">
          <router-link to="/news" class="link-arrow">查看全部文章 →</router-link>
        </div>
      </div>
    </section>

    <!-- CTA -->
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
import { computed, ref, onMounted, onUnmounted } from "vue"
import SectionTitle from "@/components/SectionTitle.vue"
import { capabilities, solutions, testimonials, newsArticles } from "@/data/site.js"
import { api, contentState } from "@/services/content.js"

const currentSlide = ref(0)
const cardRefs = ref([])
const articles = ref(newsArticles)
const topics = ref([])
const site = computed(() => contentState.site)
let observer = null
let autoSlide = null

onMounted(async () => {
  articles.value = await api.get("/api/articles").catch(() => newsArticles)
  topics.value = await api.get("/api/topics").catch(() => [])

  // Intersection Observer for fade-in
  observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible")
      }
    })
  }, { threshold: 0.15 })

  document.querySelectorAll(".fade-in").forEach(el => observer.observe(el))

  // Auto slide
  autoSlide = setInterval(() => {
    currentSlide.value = (currentSlide.value + 1) % testimonials.length
  }, 4000)
})

onUnmounted(() => {
  observer?.disconnect()
  clearInterval(autoSlide)
})
</script>

<style scoped>
/* Hero */
.hero {
  position: relative;
  min-height: 600px;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 120px 0 80px;
}

.hero-bg {
  position: absolute;
  inset: 0;
  background: linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 50%, #F0F9FF 100%);
}

.hero-bg::after {
  content: "";
  position: absolute;
  top: -50%;
  right: -20%;
  width: 600px;
  height: 600px;
  background: radial-gradient(circle, rgba(37, 99, 235, 0.08) 0%, transparent 70%);
  border-radius: 50%;
}

.hero-content {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 60px;
  align-items: center;
}

.hero-text h1 {
  font-size: 48px;
  font-weight: 800;
  line-height: 1.2;
  color: var(--text);
  margin-bottom: 20px;
}

.hero-text p {
  font-size: 18px;
  color: var(--text-secondary);
  line-height: 1.8;
  margin-bottom: 32px;
}

.hero-actions {
  display: flex;
  gap: 16px;
}

.btn-primary {
  display: inline-block;
  padding: 14px 32px;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: transform var(--transition), box-shadow var(--transition);
}

.btn-primary:hover {
  transform: translateY(-2px);
  box-shadow: 0 4px 16px rgba(37, 99, 235, 0.35);
}

.btn-outline {
  display: inline-block;
  padding: 14px 32px;
  background: transparent;
  color: var(--primary);
  border: 2px solid var(--primary);
  border-radius: var(--radius-sm);
  font-size: 16px;
  font-weight: 600;
  transition: background var(--transition), color var(--transition);
}

.btn-outline:hover {
  background: var(--primary);
  color: white;
}

.hero-visual {
  display: flex;
  justify-content: center;
}

.hero-card {
  background: white;
  border-radius: 16px;
  padding: 36px;
  box-shadow: 0 20px 60px rgba(37, 99, 235, 0.12);
  width: 100%;
  max-width: 380px;
}

.hero-card-icon {
  width: 56px;
  height: 56px;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  font-size: 20px;
  font-weight: 800;
  font-family: monospace;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 12px;
  margin-bottom: 20px;
}

.hero-card-title {
  font-size: 20px;
  font-weight: 700;
  margin-bottom: 24px;
}

.hero-card-stats {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 16px;
  padding-top: 20px;
  border-top: 1px solid var(--border);
}

.hero-card-stats div {
  text-align: center;
}

.hero-card-stats strong {
  display: block;
  font-size: 24px;
  color: var(--primary);
}

.hero-card-stats span {
  font-size: 12px;
  color: var(--text-secondary);
}

/* Capabilities Grid */
.topic-strip {
  background: #FFFFFF;
  border-top: 1px solid var(--border);
  border-bottom: 1px solid var(--border);
  padding: 18px 0;
}

.topic-card {
  min-height: 96px;
  display: grid;
  grid-template-columns: 132px 1fr auto;
  gap: 18px;
  align-items: center;
  padding: 12px 18px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: linear-gradient(90deg, #F8FAFC, #FFFFFF);
  transition: border-color var(--transition), transform var(--transition);
}

.topic-card:hover {
  border-color: var(--primary);
  transform: translateY(-1px);
}

.topic-card img {
  width: 132px;
  height: 72px;
  object-fit: cover;
  border-radius: 6px;
  background: var(--bg-gray);
}

.topic-copy span {
  display: block;
  color: var(--primary);
  font-size: 12px;
  font-weight: 700;
  margin-bottom: 4px;
}

.topic-copy strong {
  display: block;
  font-size: 18px;
  color: var(--text);
  margin-bottom: 3px;
}

.topic-copy p {
  color: var(--text-secondary);
  font-size: 14px;
  line-height: 1.5;
}

.topic-card em {
  color: var(--primary);
  font-style: normal;
  font-weight: 700;
  white-space: nowrap;
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

.cap-icon {
  font-size: 32px;
  margin-bottom: 16px;
}

.cap-card h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
}

.cap-card p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* Solutions Grid */
.solution-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.solution-card {
  background: var(--bg);
  padding: 32px;
  border-radius: var(--radius);
  border: 1px solid var(--border);
  transition: border-color var(--transition), transform var(--transition);
}

.solution-card:hover {
  border-color: var(--primary);
  transform: translateY(-2px);
}

.solution-card-icon {
  font-size: 36px;
  margin-bottom: 16px;
}

.solution-card h3 {
  font-size: 18px;
  font-weight: 700;
  margin-bottom: 10px;
}

.solution-card p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
}

/* Testimonials */
.testimonial-slider {
  overflow: hidden;
  border-radius: var(--radius);
}

.testimonial-track {
  display: flex;
  transition: transform 0.5s ease;
}

.testimonial-card {
  min-width: 100%;
  padding: 40px;
  background: var(--bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
}

.testimonial-stars {
  color: #F59E0B;
  font-size: 18px;
  margin-bottom: 16px;
  letter-spacing: 2px;
}

.testimonial-text {
  font-size: 16px;
  line-height: 1.8;
  color: var(--text);
  margin-bottom: 24px;
}

.testimonial-author {
  display: flex;
  align-items: center;
  gap: 12px;
}

.testimonial-avatar {
  width: 44px;
  height: 44px;
  border-radius: 50%;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: 700;
  font-size: 16px;
}

.testimonial-author strong {
  display: block;
  font-size: 15px;
}

.testimonial-author span {
  font-size: 13px;
  color: var(--text-secondary);
}

.slider-dots {
  display: flex;
  justify-content: center;
  gap: 8px;
  margin-top: 24px;
}

.slider-dots button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  border: none;
  background: var(--border);
  cursor: pointer;
  transition: background var(--transition), transform var(--transition);
}

.slider-dots button.active {
  background: var(--primary);
  transform: scale(1.3);
}

/* News Grid */
.news-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.news-card {
  display: block;
  padding: 28px;
  background: var(--bg);
  border-radius: var(--radius);
  box-shadow: var(--shadow);
  transition: transform var(--transition), box-shadow var(--transition);
}

.news-card:hover {
  transform: translateY(-4px);
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
  margin-bottom: 12px;
}

.news-card h3 {
  font-size: 17px;
  font-weight: 700;
  margin-bottom: 10px;
  line-height: 1.5;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-card p {
  font-size: 14px;
  color: var(--text-secondary);
  line-height: 1.7;
  margin-bottom: 12px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.news-date {
  font-size: 13px;
  color: #94A3B8;
}

.section-more {
  text-align: center;
  margin-top: 40px;
}

.link-arrow {
  font-size: 15px;
  font-weight: 600;
  color: var(--primary);
  transition: gap var(--transition);
}

.link-arrow:hover {
  text-decoration: underline;
}

/* CTA */
.cta-section {
  padding: 80px 0;
  text-align: center;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
}

.cta-section h2 {
  font-size: 32px;
  font-weight: 800;
  margin-bottom: 12px;
}

.cta-section p {
  font-size: 17px;
  opacity: 0.9;
  margin-bottom: 32px;
}

.cta-section .btn-primary {
  background: white;
  color: var(--primary);
}

.cta-section .btn-primary:hover {
  box-shadow: 0 4px 16px rgba(255, 255, 255, 0.35);
}

/* Responsive */
@media (max-width: 768px) {
  .hero-content {
    grid-template-columns: 1fr;
    gap: 40px;
    text-align: center;
  }

  .hero-text h1 {
    font-size: 32px;
  }

  .hero-text p {
    font-size: 16px;
  }

  .hero-actions {
    justify-content: center;
  }

  .cap-grid,
  .solution-grid,
  .news-grid {
    grid-template-columns: 1fr;
  }

  .topic-card {
    grid-template-columns: 1fr;
  }

  .topic-card img {
    width: 100%;
    height: 120px;
  }

  .cta-section h2 {
    font-size: 24px;
  }
}
</style>
