<template>
  <header class="header" :class="{ scrolled: isScrolled, open: menuOpen }">
    <div class="header-inner container">
      <router-link to="/" class="logo">
        <span class="logo-icon">M</span>
        <span class="logo-text">{{ site.name }}</span>
      </router-link>

      <nav class="nav" :class="{ active: menuOpen }">
        <router-link
          v-for="link in navLinks"
          :key="link.path"
          :to="link.path"
          class="nav-link"
          :class="{ active: isActive(link.path) }"
          @click="menuOpen = false"
        >
          {{ link.label }}
        </router-link>
      </nav>

      <button class="menu-btn" @click="menuOpen = !menuOpen" :aria-label="menuOpen ? '关闭菜单' : '打开菜单'">
        <span></span>
        <span></span>
        <span></span>
      </button>
    </div>
  </header>
</template>

<script setup>
import { computed, ref, onMounted, onUnmounted } from "vue"
import { useRoute } from "vue-router"
import { navLinks } from "@/data/site.js"
import { contentState } from "@/services/content.js"

const route = useRoute()
const menuOpen = ref(false)
const isScrolled = ref(false)
const site = computed(() => contentState.site)

function isActive(path) {
  if (path === "/") return route.path === "/"
  return route.path.startsWith(path)
}

function onScroll() {
  isScrolled.value = window.scrollY > 20
}

onMounted(() => window.addEventListener("scroll", onScroll))
onUnmounted(() => window.removeEventListener("scroll", onScroll))
</script>

<style scoped>
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
  height: var(--header-height);
  background: rgba(255, 255, 255, 0.92);
  backdrop-filter: blur(12px);
  border-bottom: 1px solid transparent;
  transition: border-color var(--transition), box-shadow var(--transition);
}

.header.scrolled {
  border-bottom-color: var(--border);
  box-shadow: 0 1px 4px rgba(0, 0, 0, 0.06);
}

.header-inner {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
}

.logo {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 20px;
  color: var(--primary);
  z-index: 1001;
}

.logo-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  border-radius: 8px;
  font-size: 18px;
  font-weight: 800;
}

.nav {
  display: flex;
  gap: 32px;
}

.nav-link {
  font-size: 15px;
  color: var(--text-secondary);
  transition: color var(--transition);
  position: relative;
  padding: 4px 0;
}

.nav-link:hover,
.nav-link.active {
  color: var(--primary);
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background: var(--primary);
  border-radius: 1px;
  transition: width var(--transition);
}

.nav-link.active::after {
  width: 100%;
}

.menu-btn {
  display: none;
  flex-direction: column;
  gap: 5px;
  background: none;
  border: none;
  cursor: pointer;
  padding: 4px;
  z-index: 1001;
}

.menu-btn span {
  display: block;
  width: 24px;
  height: 2px;
  background: var(--text);
  border-radius: 1px;
  transition: transform var(--transition), opacity var(--transition);
}

.menu-btn.open span:nth-child(1) {
  transform: translateY(7px) rotate(45deg);
}

.menu-btn.open span:nth-child(2) {
  opacity: 0;
}

.menu-btn.open span:nth-child(3) {
  transform: translateY(-7px) rotate(-45deg);
}

@media (max-width: 768px) {
  .menu-btn {
    display: flex;
  }

  .nav {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: var(--bg);
    flex-direction: column;
    align-items: center;
    justify-content: center;
    gap: 28px;
    opacity: 0;
    pointer-events: none;
    transition: opacity var(--transition);
  }

  .nav.active {
    opacity: 1;
    pointer-events: auto;
  }

  .nav-link {
    font-size: 20px;
  }
}
</style>
