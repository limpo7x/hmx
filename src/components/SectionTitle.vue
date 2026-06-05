<template>
  <div class="section-title" :class="{ center: center }">
    <span class="section-tag" v-if="tag">{{ tag }}</span>
    <h2 class="section-heading">{{ title }}</h2>
    <p class="section-sub" v-if="subtitle">{{ subtitle }}</p>
  </div>
</template>

<script setup>
defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, default: "" },
  tag: { type: String, default: "" },
  center: { type: Boolean, default: true }
})
</script>

<style scoped>
.section-title {
  margin-bottom: 56px;
}

.section-title.center {
  text-align: center;
}

.section-tag {
  display: inline-block;
  padding: 4px 16px;
  font-size: 13px;
  font-weight: 600;
  color: var(--primary);
  background: var(--primary-light);
  border-radius: 100px;
  margin-bottom: 16px;
  letter-spacing: 0.5px;
}

.section-heading {
  font-size: 36px;
  font-weight: 800;
  color: var(--text);
  line-height: 1.3;
}

.section-sub {
  margin-top: 16px;
  font-size: 17px;
  color: var(--text-secondary);
  max-width: 560px;
  margin-left: auto;
  margin-right: auto;
  line-height: 1.7;
}

@media (max-width: 768px) {
  .section-heading {
    font-size: 28px;
  }

  .section-sub {
    font-size: 15px;
  }
}
</style>
