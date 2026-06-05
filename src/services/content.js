import { reactive } from "vue"
import { site as fallbackSite } from "@/data/site.js"

export const contentState = reactive({
  site: { ...fallbackSite },
  categories: [],
  loaded: false,
  error: ""
})

async function request(path, options = {}) {
  const response = await fetch(path, {
    headers: options.body instanceof FormData ? undefined : { "Content-Type": "application/json" },
    credentials: "include",
    ...options
  })
  if (!response.ok) {
    const payload = await response.json().catch(() => ({}))
    throw new Error(payload.error || `请求失败：${response.status}`)
  }
  return response.json()
}

export async function loadSite() {
  try {
    const payload = await request("/api/site")
    Object.assign(contentState.site, payload.site || {})
    contentState.categories = payload.categories || []
    contentState.loaded = true
    contentState.error = ""
  } catch (error) {
    contentState.loaded = true
    contentState.error = error.message
  }
  return contentState.site
}

export const api = {
  get: (path) => request(path),
  post: (path, body) => request(path, { method: "POST", body: body instanceof FormData ? body : JSON.stringify(body) }),
  put: (path, body) => request(path, { method: "PUT", body: JSON.stringify(body) }),
  patch: (path, body) => request(path, { method: "PATCH", body: JSON.stringify(body) }),
  delete: (path) => request(path, { method: "DELETE" })
}
