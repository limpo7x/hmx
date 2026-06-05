import { createRouter, createWebHashHistory } from "vue-router"

const routes = [
  {
    path: "/",
    name: "Home",
    component: () => import("@/views/Home.vue")
  },
  {
    path: "/capabilities",
    name: "Capabilities",
    component: () => import("@/views/Capabilities.vue")
  },
  {
    path: "/solutions",
    name: "Solutions",
    component: () => import("@/views/Solutions.vue")
  },
  {
    path: "/cases",
    name: "Cases",
    component: () => import("@/views/Cases.vue")
  },
  {
    path: "/news",
    name: "News",
    component: () => import("@/views/News.vue")
  },
  {
    path: "/news/:id",
    name: "NewsDetail",
    component: () => import("@/views/NewsDetail.vue")
  },
  {
    path: "/contact",
    name: "Contact",
    component: () => import("@/views/Contact.vue")
  },
  {
    path: "/admin",
    name: "Admin",
    component: () => import("@/views/Admin.vue")
  },
  {
    path: "/:pathMatch(.*)*",
    redirect: "/"
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior() {
    return { top: 0 }
  }
})

router.afterEach((to) => {
  const payload = JSON.stringify({ path: to.fullPath })
  if (navigator.sendBeacon) {
    navigator.sendBeacon("/api/pv", new Blob([payload], { type: "application/json" }))
  } else {
    fetch("/api/pv", { method: "POST", headers: { "Content-Type": "application/json" }, body: payload, keepalive: true }).catch(() => {})
  }
})

export default router
