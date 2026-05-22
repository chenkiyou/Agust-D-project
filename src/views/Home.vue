<template>
  <main class="home-page">
    <!-- 顶部导航栏 -->
    <header class="site-header">
      <div class="logo">
        <div class="logo-title">AGUST D</div>
        <div class="logo-subtitle">fan project archive</div>
      </div>

      <nav class="nav-menu">
        <a class="nav-item active" href="#">Home</a>
        <a class="nav-item" href="#">Works</a>
        <a class="nav-item" href="#">Favorites</a>
        <a class="nav-item" href="#">Community</a>
        <a class="nav-item" href="#">Admin</a>
      </nav>

      <div class="header-actions">
        <div class="search-box">
          <input type="text" placeholder="Search tracks, albums..." />
          <span class="search-icon">⌕</span>
        </div>

        <button class="login-btn">Login</button>
      </div>
    </header>

    <!-- 首页大横幅 -->
    <section class="hero-banner">
      <img class="hero-bg" :src="homeBanner" alt="AGUST D Music Archive" />

      <div class="hero-mask"></div>

      <div class="hero-content">
        <p class="hero-kicker">BORN TO BURN.</p>

        <h1 class="hero-title">
          AGUST D
          <span>Music Archive</span>
        </h1>

        <p class="hero-desc">
          Explore the music, stories, and artistry of Agust D.
        </p>

        <div class="hero-buttons">
          <button class="primary-btn">Explore Collection <span>›</span></button>
          <button class="secondary-btn">▶ Play Intro</button>
        </div>
      </div>

      <div class="quote-card">
        <span class="quote-mark">“</span>
        <p>
          I write to express<br />
          the things I can’t say<br />
          out loud.
        </p>
        <strong>— Agust D</strong>
        <div class="wave-line">········▮▮▮▮▮········</div>
      </div>
    </section>
  </main>
</template>

<script setup>
import homeBanner from '../assets/images/home-banner.png'
</script>

<style scoped>
.home-page {
  min-height: 100vh;
  width: 100%;
  background: #050505;
  color: #f5ead4;
  padding: 0 32px 60px;
}

/* 顶部导航栏 */
.site-header {
  height: 88px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 32px;
}

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
}

/* Hero 大横幅 */
.hero-banner {
  position: relative;
  min-height: 390px;
  border: 1px solid rgba(244, 217, 163, 0.22);
  border-radius: 28px;
  overflow: hidden;
  background: #070707;
  box-shadow: 0 30px 80px rgba(0, 0, 0, 0.48);
}

.hero-bg {
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 20%;
}

/* 遮罩：让左边文字更清楚 */
.hero-mask {
  position: absolute;
  inset: 0;
  background:
    linear-gradient(
      90deg,
      rgba(5, 5, 5, 0.96) 0%,
      rgba(5, 5, 5, 0.82) 28%,
      rgba(5, 5, 5, 0.32) 58%,
      rgba(5, 5, 5, 0.56) 100%
    );
}

.hero-content {
  position: relative;
  z-index: 2;
  width: 48%;
  padding: 52px 0 48px 90px;
}

.hero-kicker {
  color: #c79f5b;
  font-size: 14px;
  letter-spacing: 8px;
  margin-bottom: 18px;
}

.hero-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 78px;
  line-height: 0.92;
  color: #f7e7c0;
  letter-spacing: 2px;
  margin-bottom: 18px;
}

.hero-title span {
  display: block;
  font-size: 42px;
  font-style: italic;
  font-weight: 400;
  letter-spacing: 1px;
  color: #e8c989;
  margin-top: 4px;
}

.hero-desc {
  font-size: 18px;
  color: #e1d3b8;
  margin-bottom: 26px;
}

.hero-buttons {
  display: flex;
  align-items: center;
  gap: 16px;
}

.primary-btn,
.secondary-btn {
  height: 48px;
  padding: 0 26px;
  border-radius: 999px;
  font-size: 15px;
  cursor: pointer;
}

.primary-btn {
  border: none;
  background: linear-gradient(135deg, #f7e7c0, #c79f5b);
  color: #15110a;
  font-weight: 700;
}

.primary-btn span {
  margin-left: 10px;
  font-size: 22px;
}

.secondary-btn {
  border: 1px solid rgba(244, 217, 163, 0.3);
  background: rgba(255, 255, 255, 0.04);
  color: #f5ead4;
}

.quote-card {
  position: absolute;
  z-index: 3;
  right: 82px;
  top: 72px;
  width: 250px;
  padding: 24px;
  border-radius: 22px;
  background: rgba(15, 14, 12, 0.84);
  border: 1px solid rgba(244, 217, 163, 0.18);
  backdrop-filter: blur(16px);
  box-shadow: 0 26px 60px rgba(0, 0, 0, 0.45);
}

.quote-mark {
  display: block;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 40px;
  color: #e8c989;
  line-height: 1;
}

.quote-card p {
  color: #f5ead4;
  font-size: 18px;
  line-height: 1.55;
  margin: 6px 0 12px;
}

.quote-card strong {
  font-size: 14px;
  color: #d9c9aa;
  font-weight: 400;
}

.wave-line {
  margin-top: 20px;
  color: #d8b76e;
  letter-spacing: 2px;
  font-size: 13px;
}

/* 简单适配 */
@media (max-width: 1100px) {
  .site-header {
    height: auto;
    padding: 24px 0;
    flex-wrap: wrap;
  }

  .nav-menu {
    order: 3;
    width: 100%;
    justify-content: center;
  }

  .hero-content {
    width: 65%;
    padding-left: 48px;
  }

  .hero-title {
    font-size: 64px;
  }

  .quote-card {
    right: 36px;
  }
}
</style>