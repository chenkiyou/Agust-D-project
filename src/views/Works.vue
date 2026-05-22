<template>
  <main class="works-page">
    <!-- 顶部导航栏 -->
    <header class="site-header">
      <div class="logo">
        <div class="logo-title">AGUST D</div>
        <div class="logo-subtitle">fan project archive</div>
      </div>

      <nav class="nav-menu">
        <router-link class="nav-item" to="/">Home</router-link>
        <router-link class="nav-item active" to="/works">Works</router-link>
        <router-link class="nav-item" to="/favorites">Favorites</router-link>
        <router-link class="nav-item" to="/community">Community</router-link>
      </nav>

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

    <!-- 页面主体 -->
    <section class="library-shell">
      <!-- 左侧筛选栏 -->
      <aside class="filter-sidebar">
        <div class="filter-title">
          <span>FILTERS</span>
          <button>⌄</button>
        </div>

        <div class="filter-group">
          <div class="filter-group-title">
            <h3>Year</h3>
            <span>⌃</span>
          </div>

          <button class="filter-row active">
            <span>All Years</span>
            <strong>{{ works.length }}</strong>
          </button>
          <button class="filter-row">
            <span>2020s</span>
            <strong>6</strong>
          </button>
          <button class="filter-row">
            <span>2010s</span>
            <strong>2</strong>
          </button>
        </div>

        <div class="filter-group">
          <div class="filter-group-title">
            <h3>Type</h3>
            <span>⌃</span>
          </div>

          <button
            v-for="category in categories"
            :key="category"
            class="filter-row"
            :class="{ active: activeCategory === category }"
            @click="activeCategory = category"
          >
            <span>{{ category }}</span>
            <strong>{{ getCategoryCount(category) }}</strong>
          </button>
        </div>

        <div class="filter-group">
          <div class="filter-group-title">
            <h3>Mood</h3>
            <span>⌃</span>
          </div>

          <div class="mood-tags">
            <button
              v-for="mood in moods"
              :key="mood"
              :class="{ active: activeMood === mood }"
              @click="activeMood = mood"
            >
              {{ mood }}
            </button>
          </div>
        </div>

        <div class="filter-group">
          <div class="filter-group-title">
            <h3>Sort By</h3>
            <span>⌃</span>
          </div>

          <select v-model="sortType" class="sort-select">
            <option value="newest">Newest First</option>
            <option value="oldest">Oldest First</option>
            <option value="plays">Most Played</option>
          </select>
        </div>

        <div class="side-quote">
          <span>“</span>
          <p>
            I write to express<br />
            the things I can’t say<br />
            out loud.
          </p>
          <strong>— Agust D</strong>
          <div class="quote-wave">······▮▮▮▮▮······</div>
        </div>
      </aside>

      <!-- 右侧主内容 -->
      <section class="library-main">
        <!-- 顶部标题与统计 -->
        <div class="library-hero">
          <div>
            <h1>MUSIC LIBRARY</h1>
            <p>Explore the sound of Agust D</p>
          </div>

          <div class="library-stats">
            <div>
              <span>Total Tracks</span>
              <strong>97</strong>
            </div>
            <div>
              <span>Total Albums</span>
              <strong>12</strong>
            </div>
            <div>
              <span>Total Plays</span>
              <strong>87.6M</strong>
            </div>
            <div>
              <span>Favorites</span>
              <strong>4.2K</strong>
            </div>
          </div>
        </div>

        <!-- 搜索与分类 -->
        <div class="library-tools">
          <div class="main-search">
            <input
              v-model="searchKeyword"
              type="text"
              placeholder="Search by track, album, or keyword..."
            />
            <span>⌕</span>
          </div>

          <div class="view-switch">
            <button class="active">▦</button>
            <button>☰</button>
          </div>
        </div>

        <div class="category-tabs">
          <button
            v-for="category in categories"
            :key="category"
            class="category-btn"
            :class="{ active: activeCategory === category }"
            @click="activeCategory = category"
          >
            {{ category }}
          </button>
        </div>

        <!-- 作品卡片 -->
        <section class="works-grid">
          <article
            v-for="(work, index) in sortedWorks"
            :key="work.id"
            class="work-card"
          >
            <div class="cover-wrap">
              <img :src="work.cover" :alt="work.title" />
              <button class="play-btn">▶</button>
            </div>

            <div class="work-body">
              <div class="work-title-row">
                <span class="work-index">{{ index + 1 }}</span>
                <div>
                  <h3>{{ work.title }}</h3>
                  <p>{{ work.artist }}</p>
                </div>
              </div>

              <div class="work-meta">
                <span>{{ work.type }}</span>
                <i>·</i>
                <span>{{ work.year }}</span>
              </div>

              <div class="work-data">
                <span>▷ {{ work.plays }}</span>
                <span>☆ {{ work.rating }}</span>
               <button
                class="heart-btn"
                :class="{ active: isFavorite(work.id) }"
                @click="toggleFavorite(work.id)"
                >
                {{ isFavorite(work.id) ? '♥' : '♡' }}
                </button>
              </div>

              <router-link class="details-btn" :to="`/works/${work.id}`">
                     View Details
                </router-link>
            </div>
          </article>
        </section>

        <!-- 空状态 -->
        <div v-if="sortedWorks.length === 0" class="empty-state">
          No works found. Try another keyword or filter.
        </div>

        <!-- 分页 -->
        <div class="pagination">
          <button>‹ Prev</button>
          <button class="active">1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <span>...</span>
          <button>10</button>
          <button>Next ›</button>

          <p>Showing 1-{{ sortedWorks.length }} of {{ works.length }} works</p>
        </div>
      </section>
    </section>

    <!-- Footer -->
    <footer class="works-footer">
      <div class="footer-brand">
        <div>AGUST D</div>
        <span>fan project archive</span>
      </div>

      <nav>
        <router-link to="/">Home</router-link>
        <router-link to="/works">Works</router-link>
        <a href="#">Favorites</a>
        <a href="#">Community</a>
      </nav>

      <div class="footer-social">
        <a href="#">IG</a>
        <a href="#">X</a>
        <a href="#">YT</a>
        <a href="#">DC</a>
      </div>

      <p>
        This is a fan-made project for educational and non-profit purposes.
      </p>
    </footer>
  </main>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

import albumDday from '../assets/images/album-dday.png'
import albumAgustd from '../assets/images/album-agustd.png'
import albumD2 from '../assets/images/album-d2.png'
import albumTour from '../assets/images/album-tour-archive.png'

import trackHaegeum from '../assets/images/track-haegeum.png'
import trackDaechwita from '../assets/images/track-daechwita.png'
import trackPeople from '../assets/images/track-people-pt2.png'
import trackAmygdala from '../assets/images/track-amygdala.png'

const searchKeyword = ref('')
const activeCategory = ref('All')
const activeMood = ref('All')
const sortType = ref('newest')

const categories = ['All', 'Solo Work', 'Mixtape', 'Collaboration', 'Soundtrack']
const moods = ['All', 'Dark', 'Chill', 'Energetic', 'Reflective', 'Hopeful']

const currentUser = ref(null)
const router = useRouter()
const favoriteIds = ref([])

onMounted(() => {
  const savedUser = localStorage.getItem('agust_user')
  const savedFavorites = localStorage.getItem('agust_favorites')

if (savedFavorites) {
  favoriteIds.value = JSON.parse(savedFavorites)
}

  if (savedUser) {
    currentUser.value = JSON.parse(savedUser)
  }
})

function handleLogout() {
  localStorage.removeItem('agust_user')
  currentUser.value = null
}
const works = [
  {
    id: 1,
    title: 'D-DAY',
    artist: 'Agust D',
    year: 2023,
    type: 'Solo Work',
    category: 'Solo Work',
    mood: 'Energetic',
    plays: '12.4M',
    playsValue: 12.4,
    rating: '4.9',
    cover: albumDday,
  },
  {
    id: 2,
    title: 'Agust D',
    artist: 'Agust D',
    year: 2016,
    type: 'Mixtape',
    category: 'Mixtape',
    mood: 'Dark',
    plays: '36.8M',
    playsValue: 36.8,
    rating: '4.9',
    cover: albumAgustd,
  },
  {
    id: 3,
    title: 'D-2',
    artist: 'Agust D',
    year: 2020,
    type: 'Mixtape',
    category: 'Mixtape',
    mood: 'Reflective',
    plays: '28.7M',
    playsValue: 28.7,
    rating: '4.8',
    cover: albumD2,
  },
  {
    id: 4,
    title: 'Agust D TOUR D-DAY',
    artist: 'Agust D',
    year: 2023,
    type: 'Soundtrack',
    category: 'Soundtrack',
    mood: 'Energetic',
    plays: '8.7M',
    playsValue: 8.7,
    rating: '4.9',
    cover: albumTour,
  },
  {
    id: 5,
    title: 'Haegeum',
    artist: 'Agust D',
    year: 2023,
    type: 'Solo Work',
    category: 'Solo Work',
    mood: 'Energetic',
    plays: '15.2M',
    playsValue: 15.2,
    rating: '4.9',
    cover: trackHaegeum,
  },
  {
    id: 6,
    title: 'Daechwita',
    artist: 'Agust D',
    year: 2020,
    type: 'Solo Work',
    category: 'Solo Work',
    mood: 'Dark',
    plays: '21.3M',
    playsValue: 21.3,
    rating: '4.9',
    cover: trackDaechwita,
  },
  {
    id: 7,
    title: 'People Pt.2',
    artist: 'Agust D',
    year: 2023,
    type: 'Collaboration',
    category: 'Collaboration',
    mood: 'Chill',
    plays: '17.6M',
    playsValue: 17.6,
    rating: '4.8',
    cover: trackPeople,
  },
  {
    id: 8,
    title: 'Amygdala',
    artist: 'Agust D',
    year: 2023,
    type: 'Solo Work',
    category: 'Solo Work',
    mood: 'Reflective',
    plays: '9.3M',
    playsValue: 9.3,
    rating: '4.8',
    cover: trackAmygdala,
  },
]

const filteredWorks = computed(() => {
  const keyword = searchKeyword.value.trim().toLowerCase()

  return works.filter((work) => {
    const matchCategory =
      activeCategory.value === 'All' || work.category === activeCategory.value

    const matchMood =
      activeMood.value === 'All' || work.mood === activeMood.value

    const matchSearch =
      keyword === '' ||
      work.title.toLowerCase().includes(keyword) ||
      work.artist.toLowerCase().includes(keyword) ||
      work.type.toLowerCase().includes(keyword) ||
      String(work.year).includes(keyword)

    return matchCategory && matchMood && matchSearch
  })
})

const sortedWorks = computed(() => {
  const list = [...filteredWorks.value]

  if (sortType.value === 'oldest') {
    return list.sort((a, b) => a.year - b.year)
  }

  if (sortType.value === 'plays') {
    return list.sort((a, b) => b.playsValue - a.playsValue)
  }

  return list.sort((a, b) => b.year - a.year)
})
function isFavorite(id) {
  return favoriteIds.value.includes(id)
}

function toggleFavorite(id) {
  if (!currentUser.value) {
    router.push('/login')
    return
  }

  if (favoriteIds.value.includes(id)) {
    favoriteIds.value = favoriteIds.value.filter((itemId) => itemId !== id)
  } else {
    favoriteIds.value.push(id)
  }

  localStorage.setItem('agust_favorites', JSON.stringify(favoriteIds.value))
}
function getCategoryCount(category) {
  if (category === 'All') {
    return works.length
  }

  return works.filter((work) => work.category === category).length
}
</script>

<style scoped>
.works-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at 74% 18%, rgba(199, 159, 91, 0.12), transparent 28%),
    #050505;
  color: #f5ead4;
  padding: 0 32px 48px;
}

.heart-btn {
  margin-left: auto;
  border: none;
  background: transparent;
  color: #f4d9a3;
  cursor: pointer;
  font-size: 16px;
}

.heart-btn.active {
  color: #f7e7c0;
}

/* Header */
.site-header {
  height: 76px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 28px;
  border-bottom: 1px solid rgba(244, 217, 163, 0.08);
}

.logo {
  width: 220px;
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
}

.nav-item.active,
.nav-item:hover {
  color: #f4d9a3;
}

.nav-item.active::after {
  content: '';
  position: absolute;
  left: 50%;
  bottom: -18px;
  width: 44px;
  height: 2px;
  background: #f4d9a3;
  transform: translateX(-50%);
}

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

/* Shell */
.library-shell {
  min-height: calc(100vh - 76px);
  display: grid;
  grid-template-columns: 250px 1fr;
  gap: 28px;
  padding-top: 24px;
}

/* Sidebar */
.filter-sidebar {
  border: 1px solid rgba(244, 217, 163, 0.14);
  border-radius: 22px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.02)),
    rgba(10, 10, 10, 0.92);
  padding: 18px;
  height: fit-content;
  position: sticky;
  top: 20px;
}

.filter-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  color: #9d927f;
  font-size: 13px;
  letter-spacing: 2px;
  margin-bottom: 20px;
}

.filter-title button {
  border: none;
  background: transparent;
  color: #d8b76e;
}

.filter-group {
  padding: 14px 0;
  border-top: 1px solid rgba(244, 217, 163, 0.08);
}

.filter-group-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
}

.filter-group-title h3 {
  color: #f4d9a3;
  font-size: 14px;
}

.filter-group-title span {
  color: #d8b76e;
}

.filter-row {
  width: 100%;
  height: 34px;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: #b9a77c;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 14px;
  cursor: pointer;
}

.filter-row:hover,
.filter-row.active {
  background: rgba(244, 217, 163, 0.12);
  color: #f5ead4;
}

.filter-row strong {
  font-weight: 400;
}

.mood-tags {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.mood-tags button {
  height: 30px;
  padding: 0 13px;
  border: 1px solid rgba(244, 217, 163, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.035);
  color: #b9a77c;
  cursor: pointer;
}

.mood-tags button.active {
  background: linear-gradient(135deg, #f7e7c0, #c79f5b);
  color: #15110a;
  font-weight: 700;
}

.sort-select {
  width: 100%;
  height: 38px;
  border: 1px solid rgba(244, 217, 163, 0.14);
  border-radius: 999px;
  background: #0d0d0d;
  color: #f5ead4;
  padding: 0 14px;
  outline: none;
}

.side-quote {
  display: none;
  margin-top: 20px;
  padding: 20px;
  border: 1px solid rgba(244, 217, 163, 0.14);
  border-radius: 18px;
  background:
    radial-gradient(circle at 80% 65%, rgba(216, 183, 110, 0.18), transparent 36%),
    rgba(255, 255, 255, 0.035);
}

.side-quote span {
  display: block;
  color: #d8b76e;
  font-size: 34px;
  line-height: 1;
}

.side-quote p {
  color: #f5ead4;
  font-size: 14px;
  line-height: 1.55;
}

.side-quote strong {
  display: block;
  color: #c9b88f;
  font-size: 13px;
  margin-top: 10px;
}

.quote-wave {
  color: #d8b76e;
  margin-top: 12px;
  font-size: 12px;
  letter-spacing: 2px;
}

/* Main */
.library-main {
  border: 1px solid rgba(244, 217, 163, 0.12);
  border-radius: 24px;
  background:
    radial-gradient(circle at 74% 14%, rgba(216, 183, 110, 0.12), transparent 30%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.04), rgba(255, 255, 255, 0.012)),
    rgba(8, 8, 8, 0.92);
  padding: 30px;
  overflow: hidden;
}

.library-hero {
  display: flex;
  justify-content: space-between;
  gap: 28px;
  margin-bottom: 28px;
}

.library-hero h1 {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 52px;
  line-height: 0.95;
  color: #f7e7c0;
  letter-spacing: 2px;
}

.library-hero p {
  color: #d8b76e;
  font-size: 22px;
  font-style: italic;
  margin-top: 4px;
}

.library-stats {
  min-width: 430px;
  height: 82px;
  border: 1px solid rgba(244, 217, 163, 0.13);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.035);
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  align-items: center;
}

.library-stats div {
  padding: 0 18px;
  border-right: 1px solid rgba(244, 217, 163, 0.1);
}

.library-stats div:last-child {
  border-right: none;
}

.library-stats span {
  display: block;
  color: #9d927f;
  font-size: 11px;
  text-transform: uppercase;
  margin-bottom: 8px;
}

.library-stats strong {
  color: #f4d9a3;
  font-size: 21px;
}

.library-tools {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 18px;
  margin-bottom: 16px;
}

.main-search {
  width: 520px;
  height: 44px;
  border: 1px solid rgba(244, 217, 163, 0.16);
  border-radius: 999px;
  display: flex;
  align-items: center;
  padding: 0 16px;
  background: rgba(255, 255, 255, 0.035);
}

.main-search input {
  flex: 1;
  border: none;
  outline: none;
  background: transparent;
  color: #f5ead4;
}

.main-search input::placeholder {
  color: #827869;
}

.main-search span {
  color: #d8b76e;
}

.view-switch {
  display: flex;
  align-items: center;
  gap: 8px;
}

.view-switch button {
  width: 38px;
  height: 34px;
  border: 1px solid rgba(244, 217, 163, 0.14);
  border-radius: 12px;
  background: rgba(255, 255, 255, 0.035);
  color: #c9b88f;
  cursor: pointer;
}

.view-switch button.active {
  color: #15110a;
  background: linear-gradient(135deg, #f7e7c0, #c79f5b);
}

.category-tabs {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 22px;
}

.category-btn {
  height: 36px;
  padding: 0 22px;
  border: 1px solid rgba(244, 217, 163, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.04);
  color: #c9b88f;
  cursor: pointer;
}

.category-btn.active {
  color: #15110a;
  font-weight: 700;
  background: linear-gradient(135deg, #f7e7c0, #c79f5b);
}

/* Cards */
.works-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 20px;
}

.work-card {
  border: 1px solid rgba(244, 217, 163, 0.16);
  border-radius: 18px;
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.018)),
    #0a0a0a;
  box-shadow: 0 18px 54px rgba(0, 0, 0, 0.38);
  transition: 0.3s;
}

.work-card:hover {
  transform: translateY(-6px);
  border-color: rgba(244, 217, 163, 0.38);
}

.cover-wrap {
  position: relative;
  height: 190px;
  overflow: hidden;
}

.cover-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 38%;
  transition: 0.35s;
}

.work-card:hover .cover-wrap img {
  transform: scale(1.06);
}

.play-btn {
  position: absolute;
  right: 14px;
  bottom: 14px;
  width: 38px;
  height: 38px;
  border: 1px solid rgba(244, 217, 163, 0.35);
  border-radius: 50%;
  background: rgba(5, 5, 5, 0.72);
  color: #f4d9a3;
  cursor: pointer;
}

.work-body {
  padding: 14px 16px 16px;
}

.work-title-row {
  display: flex;
  gap: 10px;
  align-items: flex-start;
}

.work-index {
  color: #d8b76e;
  font-size: 13px;
  margin-top: 3px;
}

.work-title-row h3 {
  color: #f5ead4;
  font-size: 17px;
  margin-bottom: 3px;
}

.work-title-row p {
  color: #9d927f;
  font-size: 12px;
}

.work-meta {
  color: #9d927f;
  font-size: 12px;
  display: flex;
  gap: 7px;
  margin: 8px 0 10px 24px;
}

.work-data {
  display: flex;
  align-items: center;
  gap: 12px;
  color: #c9b88f;
  font-size: 12px;
  margin-left: 24px;
}

.work-data button {
  margin-left: auto;
  border: none;
  background: transparent;
  color: #f4d9a3;
  cursor: pointer;
}

.details-btn {
  width: 100%;
  height: 32px;
  margin-top: 14px;
  border: 1px solid rgba(244, 217, 163, 0.38);
  border-radius: 999px;
  background: transparent;
  color: #f4d9a3;
  cursor: pointer;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 13px;
}

.details-btn:hover {
  color: #15110a;
  background: linear-gradient(135deg, #f7e7c0, #c79f5b);
}

.empty-state {
  margin: 40px 0;
  text-align: center;
  color: #b9a77c;
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

/* Pagination */
.pagination {
  margin-top: 24px;
  min-height: 46px;
  border: 1px solid rgba(244, 217, 163, 0.1);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.025);
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
}

.pagination button {
  min-width: 34px;
  height: 32px;
  border: 1px solid rgba(244, 217, 163, 0.12);
  border-radius: 999px;
  background: transparent;
  color: #c9b88f;
  cursor: pointer;
  padding: 0 12px;
}

.pagination button.active {
  background: linear-gradient(135deg, #f7e7c0, #c79f5b);
  color: #15110a;
  font-weight: 700;
}

.pagination span {
  color: #9d927f;
}

.pagination p {
  margin-left: 26px;
  color: #827869;
  font-size: 12px;
}

/* Footer */
.works-footer {
  margin-top: 28px;
  border-top: 1px solid rgba(244, 217, 163, 0.1);
  display: grid;
  grid-template-columns: 1.2fr 1.8fr 1fr 2fr;
  gap: 24px;
  align-items: center;
  padding: 22px 24px 0;
  color: #9d927f;
}

.footer-brand div {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 26px;
  color: #f4d9a3;
  letter-spacing: 2px;
}

.footer-brand span {
  color: #b9a77c;
  font-size: 12px;
}

.works-footer nav {
  display: flex;
  gap: 28px;
}

.works-footer a {
  color: #9d927f;
  text-decoration: none;
  font-size: 13px;
}

.works-footer a:hover {
  color: #f4d9a3;
}

.footer-social {
  display: flex;
  gap: 10px;
}

.footer-social a {
  width: 30px;
  height: 30px;
  border: 1px solid rgba(244, 217, 163, 0.3);
  border-radius: 50%;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  color: #f5ead4;
  font-size: 10px;
  font-weight: 700;
}

.works-footer p {
  font-size: 12px;
  line-height: 1.6;
}

/* Responsive */
@media (max-width: 1400px) {
  .works-grid {
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  .library-hero {
    flex-direction: column;
  }

  .library-stats {
    width: 100%;
    min-width: 0;
  }
}

@media (max-width: 1100px) {
  .library-shell {
    grid-template-columns: 1fr;
  }

  .filter-sidebar {
    position: static;
  }

  .works-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  .site-header {
    height: auto;
    flex-wrap: wrap;
    padding: 20px 0;
  }

  .nav-menu {
    order: 3;
    width: 100%;
    justify-content: center;
  }
}

@media (max-width: 760px) {
  .works-page {
    padding: 0 16px 30px;
  }

  .library-main {
    padding: 20px;
  }

  .library-hero h1 {
    font-size: 42px;
  }

  .library-hero p {
    font-size: 22px;
  }

  .library-stats {
    grid-template-columns: repeat(2, 1fr);
    height: auto;
    padding: 12px 0;
  }

  .library-tools {
    flex-direction: column;
    align-items: stretch;
  }

  .main-search,
  .top-search {
    width: 100%;
  }

  .works-grid {
    grid-template-columns: 1fr;
  }

  .pagination {
    flex-wrap: wrap;
    border-radius: 22px;
    padding: 12px;
  }

  .pagination p {
    width: 100%;
    text-align: center;
    margin-left: 0;
  }

  .works-footer {
    grid-template-columns: 1fr;
  }

  .works-footer nav {
    flex-wrap: wrap;
  }
}
</style>