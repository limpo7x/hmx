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
  background: var(--bg);
  padding: 40px;
  border-radius: var(--radius);
  box-shadow: var(--shadow-lg);
}

.form-row {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
}

.form-group {
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
  padding: 12px 16px;
  border: 1px solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--bg-gray);
  color: var(--text);
  font-size: 15px;
  transition: border-color var(--transition), box-shadow var(--transition);
  outline: none;
  resize: vertical;
}

.form-group input:focus,
.form-group textarea:focus {
  border-color: var(--primary);
  box-shadow: 0 0 0 3px var(--primary-light);
  background: var(--bg);
}

.submit-btn {
  width: 100%;
  padding: 14px;
  background: linear-gradient(135deg, var(--primary), var(--primary-dark));
  color: white;
  border: none;
  border-radius: var(--radius-sm);
  font-size: 16px;
  font-weight: 600;
  cursor: pointer;
  transition: opacity var(--transition), transform var(--transition);
}

.submit-btn:hover {
  opacity: 0.9;
  transform: translateY(-1px);
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
