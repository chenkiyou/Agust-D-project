<template>
  <main class="favorites-page">
    <!-- 顶部导航栏 -->
    <AppHeader />

    <!-- 未登录提示 -->
    <section v-if="!currentUser" class="login-required">
      <h1>Login Required</h1>
      <p>You need to sign in before viewing your favorite works.</p>
      <router-link to="/login" class="primary-btn">Go to Login</router-link>
    </section>

    <!-- 已登录收藏页面 -->
    <template v-else>
      <section class="favorites-hero">
        <div>
          <p class="page-kicker">PERSONAL ARCHIVE</p>
          <h1>My Favorite Works</h1>
          <p class="page-desc">
            Collect your favorite albums, tracks, performances, and archive
            moments in one place.
          </p>
        </div>

        <div class="favorite-summary">
          <strong>{{ favoriteWorks.length }}</strong>
          <span>Saved Works</span>
        </div>
      </section>

      <!-- 没有收藏 -->
      <section v-if="favoriteWorks.length === 0" class="empty-state">
        <h2>No favorites yet</h2>
        <p>
          Go to the Works page and click the heart icon to add works to your
          favorites.
        </p>
        <router-link to="/works" class="primary-btn">Explore Works</router-link>
      </section>

      <!-- 收藏列表 -->
      <section v-else class="favorites-grid">
        <article
          v-for="work in favoriteWorks"
          :key="work.id"
          class="favorite-card"
        >
          <div class="cover-wrap">
            <img :src="work.cover" :alt="work.title" />
            <button class="play-btn">▶</button>
          </div>

          <div class="card-body">
            <div class="title-row">
              <div>
                <h3>{{ work.title }}</h3>
                <p>{{ work.artist }}</p>
              </div>

              <button class="remove-btn" @click="removeFavorite(work.id)">
                ♥
              </button>
            </div>

            <div class="meta-row">
              <span>{{ work.type }}</span>
              <i>·</i>
              <span>{{ work.year }}</span>
              <i>·</i>
              <span>{{ work.plays }}</span>
            </div>

            <p class="desc">
              {{ work.description }}
            </p>

            <router-link class="details-btn" :to="`/works/${work.id}`">
              View Details
            </router-link>
          </div>
        </article>
      </section>
    </template>
  </main>
</template>

<script setup>
import { works } from '../data/works'
import AppHeader from '../components/AppHeader.vue'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'



const router = useRouter()

const currentUser = ref(null)
const favoriteIds = ref([])



onMounted(() => {
  const savedUser = localStorage.getItem('agust_user')
  const savedFavorites = localStorage.getItem('agust_favorites')

  if (savedUser) {
    currentUser.value = JSON.parse(savedUser)
  }

  if (savedFavorites) {
    favoriteIds.value = JSON.parse(savedFavorites)
  }
})

const favoriteWorks = computed(() => {
  return works.filter((work) => favoriteIds.value.includes(work.id))
})

function removeFavorite(id) {
  favoriteIds.value = favoriteIds.value.filter((itemId) => itemId !== id)
  localStorage.setItem('agust_favorites', JSON.stringify(favoriteIds.value))
}

function handleLogout() {
  localStorage.removeItem('agust_user')
  currentUser.value = null
  router.push('/')
}
</script>

<style scoped>
.favorites-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at 74% 18%, rgba(199, 159, 91, 0.12), transparent 28%),
    #050505;
  color: #f5ead4;
  padding: 0 32px 56px;
}

.primary-btn {
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

/* Hero */
.favorites-hero {
  margin-top: 24px;
  min-height: 260px;
  border: 1px solid rgba(244, 217, 163, 0.14);
  border-radius: 26px;
  background:
    radial-gradient(circle at 78% 28%, rgba(199, 159, 91, 0.18), transparent 28%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.018)),
    #090909;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 46px 64px;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.42);
}

.page-kicker {
  color: #c79f5b;
  font-size: 14px;
  letter-spacing: 6px;
  margin-bottom: 16px;
}

.favorites-hero h1,
.login-required h1 {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 58px;
  color: #f7e7c0;
  margin-bottom: 16px;
}

.page-desc {
  max-width: 580px;
  color: #c9b88f;
  font-size: 16px;
  line-height: 1.7;
}

.favorite-summary {
  width: 220px;
  height: 150px;
  border: 1px solid rgba(244, 217, 163, 0.14);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.035);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.favorite-summary strong {
  font-size: 52px;
  color: #f4d9a3;
}

.favorite-summary span {
  color: #b9a77c;
}

/* Empty and login required */
.login-required,
.empty-state {
  min-height: 420px;
  border: 1px solid rgba(244, 217, 163, 0.14);
  border-radius: 26px;
  background:
    linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.018)),
    #090909;
  margin-top: 28px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.empty-state h2 {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 46px;
  color: #f7e7c0;
  margin-bottom: 14px;
}

.login-required p,
.empty-state p {
  color: #b9a77c;
  margin-bottom: 24px;
}

/* Favorites grid */
.favorites-grid {
  margin-top: 24px;
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;
}

.favorite-card {
  border: 1px solid rgba(244, 217, 163, 0.15);
  border-radius: 22px;
  overflow: hidden;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.018)),
    #090909;
  box-shadow: 0 22px 64px rgba(0, 0, 0, 0.34);
}

.cover-wrap {
  position: relative;
  height: 210px;
  overflow: hidden;
}

.cover-wrap img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center 38%;
}

.play-btn {
  position: absolute;
  right: 16px;
  bottom: 16px;
  width: 42px;
  height: 42px;
  border: 1px solid rgba(244, 217, 163, 0.35);
  border-radius: 50%;
  background: rgba(5, 5, 5, 0.72);
  color: #f4d9a3;
  cursor: pointer;
}

.card-body {
  padding: 18px;
}

.title-row {
  display: flex;
  justify-content: space-between;
  gap: 16px;
}

.title-row h3 {
  color: #f5ead4;
  font-size: 20px;
  margin-bottom: 4px;
}

.title-row p {
  color: #9d927f;
  font-size: 13px;
}

.remove-btn {
  width: 34px;
  height: 34px;
  border: 1px solid rgba(244, 217, 163, 0.22);
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.035);
  color: #f4d9a3;
  cursor: pointer;
}

.meta-row {
  display: flex;
  gap: 8px;
  color: #b9a77c;
  font-size: 13px;
  margin: 12px 0;
}

.desc {
  color: #b9a77c;
  font-size: 14px;
  line-height: 1.6;
  min-height: 66px;
}

.details-btn {
  width: 100%;
  height: 36px;
  margin-top: 16px;
  border: 1px solid rgba(244, 217, 163, 0.38);
  border-radius: 999px;
  color: #f4d9a3;
  text-decoration: none;
  display: flex;
  align-items: center;
  justify-content: center;
}

.details-btn:hover {
  color: #15110a;
  background: linear-gradient(135deg, #f7e7c0, #c79f5b);
}

@media (max-width: 1200px) {
  .favorites-grid {
    grid-template-columns: repeat(3, 1fr);
  }

  .favorites-hero {
    flex-direction: column;
    align-items: flex-start;
    gap: 26px;
  }
}

@media (max-width: 900px) {
  .favorites-page {
    padding: 0 18px 40px;
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
    flex-wrap: wrap;
  }

  .header-actions {
    width: 100%;
    flex-wrap: wrap;
  }

  .top-search {
    width: 100%;
  }

  .favorites-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .favorites-hero h1,
  .login-required h1 {
    font-size: 44px;
  }
}

@media (max-width: 620px) {
  .favorites-grid {
    grid-template-columns: 1fr;
  }
}
</style>