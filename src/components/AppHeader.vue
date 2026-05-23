<template>
  <header class="site-header">
    <!-- 左侧 Logo -->
    <div class="logo">
      <div class="logo-title">AGUST D</div>
      <div class="logo-subtitle">fan project archive</div>
    </div>

    <!-- 中间导航 -->
    <nav class="nav-menu">
      <router-link class="nav-item" to="/">Home</router-link>
      <router-link class="nav-item" to="/works">Works</router-link>
      <router-link class="nav-item" to="/favorites">Favorites</router-link>
      <router-link class="nav-item" to="/community">Community</router-link>

      <router-link
        v-if="currentUser && currentUser.role === 'admin'"
        class="nav-item"
        to="/admin"
      >
        Admin
      </router-link>
    </nav>

    <!-- 右侧搜索和登录状态 -->
    <div class="header-actions">
      <div class="top-search">
        <input
          v-model="searchKeyword"
          type="text"
          placeholder="Search tracks, albums..."
        />
        <span>⌕</span>
      </div>

      <div v-if="currentUser" class="user-actions">
        <span class="user-name">Hi, {{ currentUser.username }}</span>
        <button class="logout-btn" @click="handleLogout">Logout</button>
      </div>

      <router-link v-else class="login-btn" to="/login">Login</router-link>
    </div>
  </header>
</template>

<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentUser = ref(null)
const searchKeyword = ref('')

onMounted(() => {
  loadUser()
})

function loadUser() {
  const savedUser = localStorage.getItem('agust_user')

  if (savedUser) {
    currentUser.value = JSON.parse(savedUser)
  }
}

function handleLogout() {
  localStorage.removeItem('agust_user')
  currentUser.value = null
  router.push('/')
}
</script>

<style scoped>
.site-header {
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  border-bottom: 1px solid rgba(244, 217, 163, 0.08);
}

/* Logo */
.logo {
  width: 220px;
  flex-shrink: 0;
}

.logo-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 30px;
  letter-spacing: 3px;
  color: #f4d9a3;
  line-height: 1;
}

.logo-subtitle {
  margin-top: 4px;
  color: #b9a77c;
  font-size: 12px;
  letter-spacing: 3px;
}

/* Navigation */
.nav-menu {
  display: flex;
  align-items: center;
  gap: 34px;
}

.nav-item {
  position: relative;
  color: #d8d1c2;
  text-decoration: none;
  font-size: 15px;
  transition: color 0.3s;
}

.nav-item:hover {
  color: #f4d9a3;
}

.nav-item.router-link-active {
  color: #f4d9a3;
}

.nav-item.router-link-active::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -18px;
  width: 44px;
  height: 2px;
  background: #f4d9a3;
  transform: translateX(-50%);
}

/* Right actions */
.header-actions {
  display: flex;
  align-items: center;
  gap: 18px;
}

.top-search {
  width: 300px;
  height: 42px;
  border: 1px solid rgba(244, 217, 163, 0.18);
  border-radius: 999px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: rgba(255, 255, 255, 0.035);
}

.top-search input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: #f5ead4;
  font-size: 14px;
}

.top-search input::placeholder {
  color: #827869;
}

.top-search span {
  color: #d8b76e;
}

.login-btn {
  height: 42px;
  padding: 0 28px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #f7e7c0, #c79f5b);
  color: #15110a;
  font-weight: 700;
  cursor: pointer;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

.user-actions {
  height: 42px;
  display: flex;
  align-items: center;
  gap: 12px;
}

.user-name {
  height: 42px;
  padding: 0 18px;
  border: 1px solid rgba(244, 217, 163, 0.18);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.035);
  color: #f5ead4;
  display: inline-flex;
  align-items: center;
  font-size: 14px;
}

.logout-btn {
  height: 42px;
  padding: 0 22px;
  border: 1px solid rgba(244, 217, 163, 0.28);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  color: #f4d9a3;
  font-weight: 700;
  cursor: pointer;
}

.logout-btn:hover {
  color: #15110a;
  background: linear-gradient(135deg, #f7e7c0, #c79f5b);
}

/* Responsive */
@media (max-width: 1100px) {
  .site-header {
    height: auto;
    flex-wrap: wrap;
    padding: 20px 0;
  }

  .nav-menu {
    order: 3;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }

  .header-actions {
    width: 100%;
    flex-wrap: wrap;
  }

  .top-search {
    flex: 1;
    min-width: 240px;
  }
}

@media (max-width: 620px) {
  .header-actions {
    align-items: stretch;
    flex-direction: column;
  }

  .top-search {
    width: 100%;
  }

  .user-actions {
    width: 100%;
  }

  .user-name,
  .logout-btn,
  .login-btn {
    flex: 1;
    justify-content: center;
  }
}
</style>