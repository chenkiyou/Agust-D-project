<template>
  <main class="home-page">
    <!-- 顶部导航栏 -->
    <header class="site-header">
      <!-- 左侧 Logo -->
      <div class="logo">
        <div class="logo-title">Agust D</div>
        <div class="logo-subtitle">fan project archive</div>
      </div>

      <!-- 中间导航 -->
      <nav class="nav-menu">
        <a class="nav-item active" href="#">Home</a>
        <a class="nav-item" href="#">Works</a>
        <a class="nav-item" href="#">Favorites</a>
        <a class="nav-item" href="#">Community</a>
        <a class="nav-item" href="#">Admin</a>
      </nav>

      <!-- 右侧搜索和登录 -->
      <div class="header-actions">
        <div class="search-box">
          <input type="text" placeholder="Search tracks, albums..." />
          <span class="search-icon">⌕</span>
        </div>

        <button class="login-btn">Login</button>
      </div>
    </header>
  </main>
</template>

<script setup>
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  width: 100%;
  background: #050505;
  color: #f5ead4;
  padding: 0 32px;
}

/* 顶部导航栏 */
.site-header {
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

/* 左侧 Logo */
.logo {
  width: 220px;
}

.logo-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 34px;
  letter-spacing: 3px;
  color: #f4d9a3;
  line-height: 1;
}

.logo-subtitle {
  margin-top: 4px;
  font-size: 13px;
  letter-spacing: 4px;
  color: #b9a77c;
}

/* 中间导航 */
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

.nav-item.active {
  color: #f4d9a3;
}

.nav-item.active::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -14px;
  width: 44px;
  height: 2px;
  background: #f4d9a3;
  transform: translateX(-50%);
}

/* 右侧区域 */
.header-actions {
  display: flex;
  align-items: center;
  gap: 20px;
}

.search-box {
  width: 310px;
  height: 44px;
  border: 1px solid rgba(244, 217, 163, 0.25);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  display: flex;
  align-items: center;
  padding: 0 16px;
}

.search-box input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: #f5ead4;
  font-size: 14px;
}

.search-box input::placeholder {
  color: #8d8474;
}

.search-icon {
  color: #b9a77c;
  font-size: 18px;
}

.login-btn {
  height: 44px;
  padding: 0 28px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #f7e7c0, #c79f5b);
  color: #15110a;
  font-weight: 700;
  cursor: pointer;
  transition: transform 0.3s, box-shadow 0.3s;
}

.login-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 10px 30px rgba(199, 159, 91, 0.25);
}
</style>