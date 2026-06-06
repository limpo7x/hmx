<template>
  <form class="contact-form" @submit.prevent="handleSubmit">
    <div class="form-row">
      <div class="form-group">
        <label>姓名 *</label>
        <input type="text" v-model="form.name" placeholder="请输入您的姓名" required />
      </div>
      <div class="form-group">
        <label>公司</label>
        <input type="text" v-model="form.company" placeholder="请输入您的公司名称" />
      </div>
    </div>
    <div class="form-row">
      <div class="form-group">
        <label>邮箱 *</label>
        <input type="email" v-model="form.email" placeholder="请输入您的邮箱" required />
      </div>
      <div class="form-group">
        <label>电话</label>
        <input type="tel" v-model="form.phone" placeholder="请输入您的联系电话" />
      </div>
    </div>
    <div class="form-group">
      <label>需求描述 *</label>
      <textarea v-model="form.message" placeholder="请描述您的项目需求、预算范围和时间要求..." rows="5" required></textarea>
    </div>
    <button type="submit" class="submit-btn" :disabled="submitted">
      {{ submitted ? "已提交" : "提交咨询" }}
    </button>
    <p class="form-success" v-if="submitted">感谢您的咨询，我们会尽快与您联系！</p>
    <p class="form-error" v-if="errorMsg">{{ errorMsg }}</p>
  </form>
</template>

<script setup>
import { reactive, ref } from "vue"
import { api } from "@/services/content.js"

const form = reactive({
  name: "",
  company: "",
  email: "",
  phone: "",
  message: ""
})

const submitted = ref(false)
const errorMsg = ref("")

async function handleSubmit() {
  errorMsg.value = ""
  try {
    await api.post("/api/messages", form)
    submitted.value = true
    Object.assign(form, { name: "", company: "", email: "", phone: "", message: "" })
  } catch (error) {
    errorMsg.value = error.message
  }
}
</script>

<style scoped>
.contact-form {
  position: relative;
  overflow: hidden;
  background: var(--bg);
  padding: 40px;
  border: 1px solid #DDE5F0;
  border-radius: 8px;
  box-shadow: 0 24px 70px rgba(15, 23, 42, 0.12);
}

.contact-form::before {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(120deg, rgba(37, 99, 235, 0.1), transparent 34%, rgba(16, 185, 129, 0.08));
}

.form-row {
  position: relative;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
  position: relative;
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  font-size: 14px;
  font-weight: 600;
  color: var(--text);
  margin-bottom: 6px;
}

.form-group input,
.form-group textarea {
  width: 100%;
  padding: 13px 16px;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: #F8FAFC;
  color: var(--text);
  font-size: 15px;
  transition: border-color var(--transition), box-shadow var(--transition), background var(--transition), transform var(--transition);
  outline: none;
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: #0B63F6;
  box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.12);
  background: var(--bg);
  transform: translateY(-1px);
}

.submit-btn {
  position: relative;
  overflow: hidden;
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, #0B63F6, #1E40AF);
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 16px;
  font-weight: 800;
  cursor: pointer;
  transition: opacity var(--transition), transform var(--transition), box-shadow var(--transition);
}

.submit-btn::after {
  content: "";
  position: absolute;
  inset: 0;
  background: linear-gradient(110deg, transparent, rgba(255, 255, 255, 0.2), transparent);
  transform: translateX(-120%);
  transition: transform 0.6s ease;
}

.submit-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 16px 30px rgba(37, 99, 235, 0.28);
}

.submit-btn:hover::after {
  transform: translateX(120%);
}

.submit-btn:disabled {
  opacity: 0.6;
  cursor: default;
  transform: none;
}

.form-success {
  margin-top: 16px;
  text-align: center;
  color: #16A34A;
  font-weight: 600;
  font-size: 15px;
}

.form-error {
  margin-top: 16px;
  text-align: center;
  color: #DC2626;
  font-weight: 600;
  font-size: 15px;
}

@media (max-width: 600px) {
  .form-row {
    grid-template-columns: 1fr;
  }

  .contact-form {
    padding: 24px;
  }
}
</style>
