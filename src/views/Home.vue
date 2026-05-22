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

    <!-- 首页中间内容区域 -->
    <section class="content-grid">
      <!-- 左侧：热门歌曲 -->
      <section class="panel popular-panel">
        <div class="panel-header">
          <h2>Popular Tracks</h2>
          <a href="#">View all</a>
        </div>

        <div class="track-list">
          <div
            v-for="track in popularTracks"
            :key="track.id"
            class="track-item"
          >
            <img :src="track.cover" :alt="track.title" class="track-cover" />

            <div class="track-rank">
              {{ String(track.id).padStart(2, '0') }}
            </div>

            <div class="track-info">
              <h3>{{ track.title }}</h3>
              <p>{{ track.artist }}</p>
              <div class="track-progress">
                <span :style="{ width: track.progress }"></span>
              </div>
            </div>

            <span class="track-duration">{{ track.duration }}</span>

            <button class="small-play-btn">▶</button>
          </div>
        </div>
      </section>

      <!-- 中间：专辑区域 -->
      <section class="panel albums-panel">
        <div class="category-tabs">
          <button class="tab active">All</button>
          <button class="tab">Solo Work</button>
          <button class="tab">Mixtape</button>
          <button class="tab">Collaborations</button>
          <button class="tab">Soundtrack</button>
        </div>

        <div class="panel-header albums-title">
          <h2>Albums</h2>
          <a href="#">View all</a>
        </div>

        <div class="album-list">
          <article
            v-for="album in albums"
            :key="album.id"
            class="album-card"
          >
            <img :src="album.cover" :alt="album.title" />

            <div class="album-info">
              <h3>{{ album.title }}</h3>
              <p>{{ album.year }} · {{ album.type }}</p>
            </div>

            <button class="album-play-btn">▶</button>
          </article>
        </div>
      </section>

      <!-- 右侧：统计区域 -->
      <section class="panel stats-panel">
        <div class="panel-header">
          <h2>Timeline / Stats</h2>
          <a href="#">View all</a>
        </div>

        <div class="stats-content">
          <div class="stats-list">
            <div class="stats-row">
              <span>Tracks</span>
              <strong>97</strong>
            </div>

            <div class="stats-row">
              <span>Albums / Mixtapes</span>
              <strong>11</strong>
            </div>

            <div class="stats-row">
              <span>Collaborations</span>
              <strong>23</strong>
            </div>

            <div class="stats-row">
              <span>Years Active</span>
              <strong>2013 - Present</strong>
            </div>
          </div>

          <div class="plays-card">
            <p>Total Plays</p>
            <strong>87.6M</strong>
            <span>Across all platforms</span>

            <div class="fake-chart">
              <i style="height: 34%"></i>
              <i style="height: 58%"></i>
              <i style="height: 42%"></i>
              <i style="height: 76%"></i>
              <i style="height: 50%"></i>
              <i style="height: 67%"></i>
              <i style="height: 88%"></i>
            </div>

            <div class="chart-months">
              <span>Jan</span>
              <span>Feb</span>
              <span>Mar</span>
              <span>Apr</span>
              <span>May</span>
              <span>Jun</span>
            </div>
          </div>
        </div>
      </section>
    </section>
  </main>
</template>

<script setup>
import homeBanner from '../assets/images/home-banner.png'

import albumDday from '../assets/images/album-dday.png'
import albumAgustd from '../assets/images/album-agustd.png'
import albumD2 from '../assets/images/album-d2.png'
import albumTour from '../assets/images/album-tour-archive.png'

import trackHaegeum from '../assets/images/track-haegeum.png'
import trackDaechwita from '../assets/images/track-daechwita.png'
import trackPeople from '../assets/images/track-people-pt2.png'
import trackAmygdala from '../assets/images/track-amygdala.png'

const popularTracks = [
  {
    id: 1,
    title: 'Haegeum',
    artist: 'Agust D',
    duration: '3:41',
    cover: trackHaegeum,
    progress: '78%',
  },
  {
    id: 2,
    title: 'Daechwita',
    artist: 'Agust D',
    duration: '3:26',
    cover: trackDaechwita,
    progress: '70%',
  },
  {
    id: 3,
    title: 'People Pt.2',
    artist: 'Agust D',
    duration: '4:10',
    cover: trackPeople,
    progress: '63%',
  },
  {
    id: 4,
    title: 'Amygdala',
    artist: 'Agust D',
    duration: '4:05',
    cover: trackAmygdala,
    progress: '55%',
  },
]

const albums = [
  {
    id: 1,
    title: 'D-DAY',
    year: '2023',
    type: 'Album',
    cover: albumDday,
  },
  {
    id: 2,
    title: 'Agust D',
    year: '2016',
    type: 'Mixtape',
    cover: albumAgustd,
  },
  {
    id: 3,
    title: 'D-2',
    year: '2020',
    type: 'Mixtape',
    cover: albumD2,
  },
  {
    id: 4,
    title: 'TOUR ARCHIVE',
    year: '2023',
    type: 'Live Album',
    cover: albumTour,
  },
]
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
  object-position: center 10%;
}

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

/* 中间内容三栏布局 */
.content-grid {
  display: grid;
  grid-template-columns: 1fr 1.45fr 1.2fr;
  gap: 22px;
  margin-top: 22px;
}

.panel {
  border: 1px solid rgba(244, 217, 163, 0.16);
  border-radius: 20px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.025)),
    #090909;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.35);
}

.panel-header {
  height: 54px;
  padding: 0 18px;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.panel-header h2 {
  font-size: 18px;
  font-weight: 700;
  color: #f5ead4;
}

.panel-header a {
  color: #9d927f;
  font-size: 13px;
  text-decoration: none;
}

/* Popular Tracks */
.track-list {
  padding: 0 14px 14px;
}

.track-item {
  display: grid;
  grid-template-columns: 46px 32px 1fr auto 34px;
  align-items: center;
  gap: 12px;
  min-height: 66px;
  border-bottom: 1px solid rgba(244, 217, 163, 0.08);
}

.track-item:last-child {
  border-bottom: none;
}

.track-cover {
  width: 46px;
  height: 46px;
  border-radius: 10px;
  object-fit: cover;
}

.track-rank {
  color: #b9a77c;
  font-size: 14px;
  text-align: center;
}

.track-info h3 {
  font-size: 14px;
  color: #f5ead4;
  margin-bottom: 3px;
}

.track-info p {
  font-size: 12px;
  color: #9d927f;
  margin-bottom: 7px;
}

.track-progress {
  width: 100%;
  height: 3px;
  border-radius: 999px;
  background: rgba(244, 217, 163, 0.12);
  overflow: hidden;
}

.track-progress span {
  display: block;
  height: 100%;
  border-radius: 999px;
  background: #d8b76e;
}

.track-duration {
  color: #a69a84;
  font-size: 13px;
}

.small-play-btn,
.album-play-btn {
  border: 1px solid rgba(244, 217, 163, 0.3);
  background: rgba(255, 255, 255, 0.04);
  color: #f4d9a3;
  cursor: pointer;
}

.small-play-btn {
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

/* Albums */
.albums-panel {
  padding-bottom: 14px;
}

.category-tabs {
  display: flex;
  gap: 10px;
  padding: 14px 18px 4px;
}

.tab {
  height: 34px;
  padding: 0 20px;
  border-radius: 999px;
  border: 1px solid rgba(244, 217, 163, 0.12);
  background: rgba(255, 255, 255, 0.04);
  color: #c9b88f;
  cursor: pointer;
}

.tab.active {
  background: linear-gradient(135deg, #f7e7c0, #c79f5b);
  color: #15110a;
  font-weight: 700;
}

.albums-title {
  height: 48px;
}

.album-list {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
  padding: 0 18px;
}

.album-card {
  position: relative;
  min-height: 222px;
  border-radius: 16px;
  overflow: hidden;
  border: 1px solid rgba(244, 217, 163, 0.15);
  background: #0d0d0d;
}

.album-card img {
  width: 100%;
  height: 148px;
  object-fit: cover;
  display: block;
}

.album-info {
  padding: 12px 12px 14px;
}

.album-info h3 {
  font-size: 15px;
  color: #f5ead4;
  margin-bottom: 4px;
}

.album-info p {
  font-size: 12px;
  color: #9d927f;
}

.album-play-btn {
  position: absolute;
  right: 12px;
  bottom: 18px;
  width: 30px;
  height: 30px;
  border-radius: 50%;
}

/* Stats */
.stats-panel {
  padding-bottom: 14px;
}

.stats-content {
  display: grid;
  grid-template-columns: 0.95fr 1.05fr;
  gap: 14px;
  padding: 0 18px 18px;
}

.stats-list,
.plays-card {
  border: 1px solid rgba(244, 217, 163, 0.12);
  border-radius: 16px;
  background: rgba(255, 255, 255, 0.035);
  padding: 18px;
}

.stats-row {
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 13px 0;
  border-bottom: 1px solid rgba(244, 217, 163, 0.08);
}

.stats-row:last-child {
  border-bottom: none;
}

.stats-row span {
  color: #c9b88f;
  font-size: 13px;
}

.stats-row strong {
  color: #f5ead4;
  font-size: 14px;
}

.plays-card p {
  color: #c9b88f;
  font-size: 13px;
  margin-bottom: 6px;
}

.plays-card strong {
  display: block;
  font-size: 32px;
  color: #e8c989;
  margin-bottom: 2px;
}

.plays-card > span {
  color: #9d927f;
  font-size: 12px;
}

.fake-chart {
  height: 90px;
  display: flex;
  align-items: flex-end;
  gap: 10px;
  margin-top: 18px;
  padding-top: 14px;
  border-top: 1px solid rgba(244, 217, 163, 0.08);
}

.fake-chart i {
  flex: 1;
  display: block;
  border-radius: 999px 999px 0 0;
  background: linear-gradient(180deg, #f7e7c0, rgba(199, 159, 91, 0.35));
}

.chart-months {
  display: flex;
  justify-content: space-between;
  margin-top: 8px;
  color: #9d927f;
  font-size: 11px;
}

/* 响应式 */
@media (max-width: 1200px) {
  .content-grid {
    grid-template-columns: 1fr;
  }

  .album-list {
    grid-template-columns: repeat(4, 1fr);
  }
}

@media (max-width: 900px) {
  .site-header {
    height: auto;
    padding: 24px 0;
    flex-wrap: wrap;
  }

  .nav-menu {
    order: 3;
    width: 100%;
    justify-content: center;
    flex-wrap: wrap;
  }

  .header-actions {
    width: 100%;
  }

  .search-box {
    flex: 1;
  }

  .hero-content {
    width: 70%;
    padding-left: 40px;
  }

  .hero-title {
    font-size: 58px;
  }

  .quote-card {
    display: none;
  }

  .album-list {
    grid-template-columns: repeat(2, 1fr);
  }

  .stats-content {
    grid-template-columns: 1fr;
  }
}
</style>