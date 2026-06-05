<template>
  <div id="app-root">
    <AppHeader v-if="!isAdminRoute" />
    <main>
      <router-view v-slot="{ Component }">
        <transition name="page" mode="out-in">
          <component :is="Component" />
        </transition>
      </router-view>
    </main>
    <AppFooter v-if="!isAdminRoute" />
  </div>
</template>

<script setup>
import { computed, onMounted } from "vue"
import { useRoute } from "vue-router"
import AppHeader from "@/components/AppHeader.vue"
import AppFooter from "@/components/AppFooter.vue"
import { loadSite } from "@/services/content.js"

onMounted(loadSite)
const route = useRoute()
const isAdminRoute = computed(() => route.path.startsWith("/admin"))
</script>

<style>
.page-enter-active,
.page-leave-active {
  transition: opacity 0.3s ease;
}

.page-enter-from,
.page-leave-to {
  opacity: 0;
}
</style>
