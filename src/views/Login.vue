<template>
  <main class="login-page">
    <section class="login-card">
      <div class="login-left">
        <router-link to="/" class="back-home">‹ Back to Home</router-link>

        <div class="brand">
          <div class="brand-title">AGUST D</div>
          <div class="brand-subtitle">fan project archive</div>
        </div>

        <h1>Welcome Back</h1>
        <p>
          Sign in to manage your favorites, explore your archive, and continue
          your music journey.
        </p>

        <div class="demo-box">
          <span>Demo Account</span>
          <strong>Username: admin</strong>
          <strong>Password: 123456</strong>
        </div>
      </div>

      <div class="login-right">
        <div class="form-header">
          <h2>{{ isRegister ? 'Create Account' : 'Sign In' }}</h2>
          <p>
            {{
              isRegister
                ? 'Create a new archive account.'
                : 'Use your account to access personal features.'
            }}
          </p>
        </div>

        <form class="login-form" @submit.prevent="handleSubmit">
          <label>
            Username
            <input
              v-model="form.username"
              type="text"
              placeholder="Enter username"
            />
          </label>

          <label>
            Password
            <input
              v-model="form.password"
              type="password"
              placeholder="Enter password"
            />
          </label>

          <label v-if="isRegister">
            Confirm Password
            <input
              v-model="form.confirmPassword"
              type="password"
              placeholder="Confirm password"
            />
          </label>

          <p v-if="message" class="message" :class="{ success: isSuccess }">
            {{ message }}
          </p>

          <button class="submit-btn" type="submit">
            {{ isRegister ? 'Register' : 'Login' }}
          </button>
        </form>

        <div class="switch-mode">
          <span>
            {{ isRegister ? 'Already have an account?' : "Don't have an account?" }}
          </span>
          <button @click="toggleMode">
            {{ isRegister ? 'Sign in' : 'Create one' }}
          </button>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const isRegister = ref(false)
const message = ref('')
const isSuccess = ref(false)

const form = reactive({
  username: '',
  password: '',
  confirmPassword: '',
})

function toggleMode() {
  isRegister.value = !isRegister.value
  message.value = ''
  isSuccess.value = false
  form.username = ''
  form.password = ''
  form.confirmPassword = ''
}

function handleSubmit() {
  message.value = ''
  isSuccess.value = false

  if (!form.username.trim()) {
    message.value = '请输入用户名'
    return
  }

  if (!form.password.trim()) {
    message.value = '请输入密码'
    return
  }

  if (isRegister.value) {
    if (form.password !== form.confirmPassword) {
      message.value = '两次输入的密码不一致'
      return
    }

    message.value = '注册成功，请登录'
    isSuccess.value = true
    isRegister.value = false
    form.password = ''
    form.confirmPassword = ''
    return
  }

  if (form.username === 'admin' && form.password === '123456') {
    localStorage.setItem(
      'agust_user',
      JSON.stringify({
        username: form.username,
        role: 'admin',
      }),
    )

    message.value = '登录成功，正在返回首页...'
    isSuccess.value = true

    setTimeout(() => {
      router.push('/')
    }, 700)

    return
  }

  message.value = '用户名或密码错误'
}
</script>

<style scoped>
.login-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at 20% 20%, rgba(199, 159, 91, 0.16), transparent 28%),
    radial-gradient(circle at 78% 70%, rgba(216, 183, 110, 0.12), transparent 24%),
    #050505;
  color: #f5ead4;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 40px;
}

.login-card {
  width: min(1080px, 100%);
  min-height: 640px;
  border: 1px solid rgba(244, 217, 163, 0.18);
  border-radius: 30px;
  overflow: hidden;
  display: grid;
  grid-template-columns: 1.05fr 0.95fr;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.06), rgba(255, 255, 255, 0.018)),
    rgba(8, 8, 8, 0.96);
  box-shadow: 0 34px 100px rgba(0, 0, 0, 0.55);
}

.login-left {
  position: relative;
  padding: 54px;
  background:
    linear-gradient(90deg, rgba(5, 5, 5, 0.92), rgba(5, 5, 5, 0.56)),
    url('../assets/images/home-banner.png') center / cover;
}

.back-home {
  color: #c9b88f;
  text-decoration: none;
  font-size: 14px;
}

.back-home:hover {
  color: #f4d9a3;
}

.brand {
  margin-top: 80px;
  margin-bottom: 54px;
}

.brand-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 44px;
  letter-spacing: 4px;
  color: #f4d9a3;
  line-height: 1;
}

.brand-subtitle {
  margin-top: 8px;
  color: #b9a77c;
  letter-spacing: 4px;
  font-size: 13px;
}

.login-left h1 {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 64px;
  line-height: 0.96;
  color: #f7e7c0;
  margin-bottom: 22px;
}

.login-left p {
  max-width: 440px;
  color: #c9b88f;
  font-size: 16px;
  line-height: 1.75;
}

.demo-box {
  position: absolute;
  left: 54px;
  bottom: 54px;
  width: 310px;
  border: 1px solid rgba(244, 217, 163, 0.16);
  border-radius: 18px;
  background: rgba(8, 8, 8, 0.72);
  padding: 18px;
  display: grid;
  gap: 8px;
}

.demo-box span {
  color: #c79f5b;
  font-size: 13px;
  letter-spacing: 2px;
}

.demo-box strong {
  color: #f5ead4;
  font-size: 14px;
}

.login-right {
  padding: 64px 54px;
  display: flex;
  flex-direction: column;
  justify-content: center;
}

.form-header {
  margin-bottom: 34px;
}

.form-header h2 {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 42px;
  color: #f7e7c0;
  margin-bottom: 10px;
}

.form-header p {
  color: #9d927f;
  font-size: 15px;
}

.login-form {
  display: grid;
  gap: 20px;
}

.login-form label {
  color: #d8c7a4;
  font-size: 14px;
  display: grid;
  gap: 9px;
}

.login-form input {
  height: 48px;
  border: 1px solid rgba(244, 217, 163, 0.18);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.035);
  color: #f5ead4;
  outline: none;
  padding: 0 18px;
}

.login-form input::placeholder {
  color: #766e60;
}

.message {
  min-height: 22px;
  color: #e28a8a;
  font-size: 14px;
}

.message.success {
  color: #d8b76e;
}

.submit-btn {
  height: 50px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #f7e7c0, #c79f5b);
  color: #15110a;
  font-weight: 800;
  cursor: pointer;
  margin-top: 4px;
}

.switch-mode {
  margin-top: 24px;
  display: flex;
  justify-content: center;
  gap: 8px;
  color: #9d927f;
  font-size: 14px;
}

.switch-mode button {
  border: none;
  background: transparent;
  color: #f4d9a3;
  cursor: pointer;
  font-weight: 700;
}

@media (max-width: 900px) {
  .login-page {
    padding: 24px;
  }

  .login-card {
    grid-template-columns: 1fr;
  }

  .login-left {
    min-height: 420px;
  }

  .demo-box {
    position: static;
    margin-top: 40px;
  }
}
</style>