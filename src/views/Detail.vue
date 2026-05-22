<template>
  <main class="detail-page">
    <!-- 顶部导航栏 -->
    <header class="site-header">
      <div class="logo">
        <div class="logo-title">AGUST D</div>
        <div class="logo-subtitle">fan project archive</div>
      </div>

      <nav class="nav-menu">
        <router-link class="nav-item" to="/">Home</router-link>
        <router-link class="nav-item active" to="/works">Works</router-link>
        <a class="nav-item" href="#">Favorites</a>
        <a class="nav-item" href="#">Community</a>
      </nav>

      <div class="header-actions">
        <div class="top-search">
          <input type="text" placeholder="Search tracks, albums..." />
          <span>⌕</span>
        </div>

        <button class="login-btn">Login</button>
      </div>
    </header>

    <!-- 返回按钮 -->
    <div class="back-row">
      <router-link to="/works" class="back-link">‹ Back to Works</router-link>
    </div>

    <!-- 详情主体 -->
    <section class="detail-hero">
      <div class="cover-panel">
        <img :src="work.cover" :alt="work.title" />

        <button class="cover-play-btn">▶</button>
      </div>

      <div class="detail-content">
        <p class="detail-kicker">{{ work.type }} · {{ work.year }}</p>

        <h1>{{ work.title }}</h1>

        <p class="artist-name">{{ work.artist }}</p>

        <p class="detail-desc">
          {{ work.description }}
        </p>

        <div class="action-row">
          <button class="primary-btn">▶ Play All</button>
          <button class="outline-btn">♡ Add to Favorites</button>
          <button class="circle-btn">···</button>
        </div>

        <div class="meta-grid">
          <div>
            <span>Total Plays</span>
            <strong>{{ work.plays }}</strong>
          </div>

          <div>
            <span>Rating</span>
            <strong>{{ work.rating }}</strong>
          </div>

          <div>
            <span>Category</span>
            <strong>{{ work.category }}</strong>
          </div>

          <div>
            <span>Mood</span>
            <strong>{{ work.mood }}</strong>
          </div>
        </div>
      </div>

      <aside class="side-card">
        <h3>Archive Notes</h3>
        <p>
          This detail page presents the selected work with visual information,
          metadata, track list, and related archive content.
        </p>

        <div class="note-line">
          <span>Released</span>
          <strong>{{ work.year }}</strong>
        </div>

        <div class="note-line">
          <span>Artist</span>
          <strong>{{ work.artist }}</strong>
        </div>

        <div class="note-line">
          <span>Collection</span>
          <strong>Music Archive</strong>
        </div>
      </aside>
    </section>

    <!-- 歌曲列表 / Tracklist -->
    <section class="detail-body">
      <div class="track-panel">
        <div class="section-title">
          <h2>Tracklist</h2>
          <span>{{ work.tracks.length }} tracks</span>
        </div>

        <div class="track-table">
          <div
            v-for="track in work.tracks"
            :key="track.id"
            class="detail-track"
          >
            <span class="track-no">{{ track.id }}</span>

            <div>
              <strong>{{ track.title }}</strong>
              <p>{{ work.artist }}</p>
            </div>

            <span class="track-time">{{ track.duration }}</span>

            <button class="track-play">▶</button>
          </div>
        </div>
      </div>

      <div class="related-panel">
        <div class="section-title">
          <h2>Related Works</h2>
          <span>More from archive</span>
        </div>

        <div class="related-list">
          <article
            v-for="item in relatedWorks"
            :key="item.id"
            class="related-card"
          >
            <img :src="item.cover" :alt="item.title" />

            <div>
              <h3>{{ item.title }}</h3>
              <p>{{ item.year }} · {{ item.type }}</p>
            </div>

            <router-link :to="`/works/${item.id}`">View</router-link>
          </article>
        </div>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute } from 'vue-router'

import albumDday from '../assets/images/album-dday.png'
import albumAgustd from '../assets/images/album-agustd.png'
import albumD2 from '../assets/images/album-d2.png'
import albumTour from '../assets/images/album-tour-archive.png'

import trackHaegeum from '../assets/images/track-haegeum.png'
import trackDaechwita from '../assets/images/track-daechwita.png'
import trackPeople from '../assets/images/track-people-pt2.png'
import trackAmygdala from '../assets/images/track-amygdala.png'

const route = useRoute()

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
    rating: '4.9',
    cover: albumDday,
    description:
      'A powerful album archive with intense sound, personal storytelling, and a strong visual identity. This work represents a complete chapter of Agust D’s music journey.',
    tracks: [
      { id: '01', title: 'Haegeum', duration: '3:41' },
      { id: '02', title: 'Daechwita', duration: '3:26' },
      { id: '03', title: 'Amygdala', duration: '4:05' },
      { id: '04', title: 'Snooze', duration: '4:10' },
      { id: '05', title: 'Life Goes On', duration: '3:32' },
    ],
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
    rating: '4.9',
    cover: albumAgustd,
    description:
      'The beginning of the Agust D archive and personal narrative, carrying raw energy, sharp lyrics, and a dark emotional tone.',
    tracks: [
      { id: '01', title: 'Agust D', duration: '3:02' },
      { id: '02', title: 'Give It To Me', duration: '2:45' },
      { id: '03', title: 'The Last', duration: '4:06' },
      { id: '04', title: 'Tony Montana', duration: '3:30' },
    ],
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
    rating: '4.8',
    cover: albumD2,
    description:
      'A second chapter with sharp emotion and experimental sound, balancing confidence, reflection, and artistic growth.',
    tracks: [
      { id: '01', title: 'Moonlight', duration: '2:43' },
      { id: '02', title: 'Daechwita', duration: '3:26' },
      { id: '03', title: 'People', duration: '3:17' },
      { id: '04', title: 'Dear My Friend', duration: '4:52' },
    ],
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
    rating: '4.9',
    cover: albumTour,
    description:
      'A live stage archive that collects performance memories, dramatic lighting, and concert atmosphere into one visual music experience.',
    tracks: [
      { id: '01', title: 'D-DAY Live Intro', duration: '2:20' },
      { id: '02', title: 'Haegeum Live', duration: '3:48' },
      { id: '03', title: 'Daechwita Live', duration: '3:34' },
      { id: '04', title: 'The Last Live', duration: '4:20' },
    ],
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
    rating: '4.9',
    cover: trackHaegeum,
    description:
      'A bold single blending tradition, rhythm, and freedom. The visual tone combines classical symbolism with modern energy.',
    tracks: [
      { id: '01', title: 'Haegeum', duration: '3:41' },
      { id: '02', title: 'Haegeum Instrumental', duration: '3:41' },
    ],
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
    rating: '4.9',
    cover: trackDaechwita,
    description:
      'A dramatic and iconic work with royal visual energy, strong percussion, and a powerful performance identity.',
    tracks: [
      { id: '01', title: 'Daechwita', duration: '3:26' },
      { id: '02', title: 'Daechwita Stage Ver.', duration: '3:32' },
    ],
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
    rating: '4.8',
    cover: trackPeople,
    description:
      'A reflective piece about people, distance, and memory, with a softer emotional direction and late-night atmosphere.',
    tracks: [
      { id: '01', title: 'People Pt.2', duration: '3:34' },
      { id: '02', title: 'People Pt.2 Live', duration: '3:40' },
    ],
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
    rating: '4.8',
    cover: trackAmygdala,
    description:
      'A dark emotional work exploring memory, pain, and inner conflict through cinematic visual expression.',
    tracks: [
      { id: '01', title: 'Amygdala', duration: '4:05' },
      { id: '02', title: 'Amygdala Live', duration: '4:12' },
    ],
  },
]

const currentId = computed(() => Number(route.params.id))

const work = computed(() => {
  return works.find((item) => item.id === currentId.value) || works[0]
})

const relatedWorks = computed(() => {
  return works.filter((item) => item.id !== work.value.id).slice(0, 4)
})
</script>

<style scoped>
.detail-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at 72% 18%, rgba(199, 159, 91, 0.14), transparent 28%),
    #050505;
  color: #f5ead4;
  padding: 0 32px 56px;
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
}

/* Back */
.back-row {
  padding: 22px 0 18px;
}

.back-link {
  color: #c9b88f;
  text-decoration: none;
  font-size: 14px;
}

.back-link:hover {
  color: #f4d9a3;
}

/* Detail hero */
.detail-hero {
  display: grid;
  grid-template-columns: 360px 1fr 320px;
  gap: 28px;
  align-items: stretch;
}

.cover-panel,
.detail-content,
.side-card,
.track-panel,
.related-panel {
  border: 1px solid rgba(244, 217, 163, 0.14);
  border-radius: 24px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.018)),
    rgba(8, 8, 8, 0.92);
  box-shadow: 0 22px 64px rgba(0, 0, 0, 0.36);
}

.cover-panel {
  position: relative;
  overflow: hidden;
  min-height: 470px;
}

.cover-panel img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.cover-panel::after {
  content: '';
  position: absolute;
  inset: 0;
  background: linear-gradient(180deg, transparent 50%, rgba(5, 5, 5, 0.72));
}

.cover-play-btn {
  position: absolute;
  right: 22px;
  bottom: 22px;
  z-index: 2;
  width: 52px;
  height: 52px;
  border: 1px solid rgba(244, 217, 163, 0.36);
  border-radius: 50%;
  background: rgba(5, 5, 5, 0.72);
  color: #f4d9a3;
  cursor: pointer;
}

.detail-content {
  padding: 42px;
}

.detail-kicker {
  color: #c79f5b;
  letter-spacing: 4px;
  font-size: 13px;
  margin-bottom: 14px;
  text-transform: uppercase;
}

.detail-content h1 {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 72px;
  line-height: 0.95;
  color: #f7e7c0;
  margin-bottom: 10px;
}

.artist-name {
  color: #d8b76e;
  font-size: 22px;
  margin-bottom: 24px;
}

.detail-desc {
  max-width: 720px;
  color: #c9b88f;
  font-size: 16px;
  line-height: 1.8;
  margin-bottom: 30px;
}

.action-row {
  display: flex;
  align-items: center;
  gap: 14px;
  margin-bottom: 34px;
}

.primary-btn,
.outline-btn,
.circle-btn {
  height: 46px;
  border-radius: 999px;
  cursor: pointer;
}

.primary-btn {
  padding: 0 28px;
  border: none;
  background: linear-gradient(135deg, #f7e7c0, #c79f5b);
  color: #15110a;
  font-weight: 700;
}

.outline-btn {
  padding: 0 26px;
  border: 1px solid rgba(244, 217, 163, 0.28);
  background: rgba(255, 255, 255, 0.035);
  color: #f5ead4;
}

.circle-btn {
  width: 46px;
  border: 1px solid rgba(244, 217, 163, 0.18);
  background: rgba(255, 255, 255, 0.035);
  color: #f5ead4;
}

.meta-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 14px;
}

.meta-grid div {
  border: 1px solid rgba(244, 217, 163, 0.1);
  border-radius: 16px;
  padding: 18px;
  background: rgba(255, 255, 255, 0.03);
}

.meta-grid span {
  display: block;
  color: #9d927f;
  font-size: 12px;
  margin-bottom: 8px;
}

.meta-grid strong {
  color: #f4d9a3;
  font-size: 18px;
}

.side-card {
  padding: 26px;
}

.side-card h3 {
  color: #f7e7c0;
  font-size: 22px;
  margin-bottom: 14px;
}

.side-card p {
  color: #b9a77c;
  font-size: 14px;
  line-height: 1.7;
  margin-bottom: 22px;
}

.note-line {
  display: flex;
  justify-content: space-between;
  padding: 14px 0;
  border-top: 1px solid rgba(244, 217, 163, 0.08);
}

.note-line span {
  color: #9d927f;
}

.note-line strong {
  color: #f5ead4;
}

/* Body */
.detail-body {
  margin-top: 28px;
  display: grid;
  grid-template-columns: 1.4fr 0.8fr;
  gap: 28px;
}

.track-panel,
.related-panel {
  padding: 26px;
}

.section-title {
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 18px;
}

.section-title h2 {
  color: #f5ead4;
  font-size: 22px;
}

.section-title span {
  color: #9d927f;
  font-size: 13px;
}

.detail-track {
  display: grid;
  grid-template-columns: 42px 1fr 70px 38px;
  align-items: center;
  gap: 14px;
  min-height: 64px;
  border-bottom: 1px solid rgba(244, 217, 163, 0.08);
}

.detail-track:last-child {
  border-bottom: none;
}

.track-no {
  color: #d8b76e;
}

.detail-track strong {
  color: #f5ead4;
}

.detail-track p {
  color: #9d927f;
  font-size: 13px;
  margin-top: 3px;
}

.track-time {
  color: #c9b88f;
}

.track-play {
  width: 34px;
  height: 34px;
  border: 1px solid rgba(244, 217, 163, 0.25);
  border-radius: 50%;
  background: transparent;
  color: #f4d9a3;
  cursor: pointer;
}

.related-list {
  display: grid;
  gap: 14px;
}

.related-card {
  display: grid;
  grid-template-columns: 68px 1fr auto;
  gap: 14px;
  align-items: center;
  border: 1px solid rgba(244, 217, 163, 0.08);
  border-radius: 16px;
  padding: 10px;
  background: rgba(255, 255, 255, 0.025);
}

.related-card img {
  width: 68px;
  height: 68px;
  object-fit: cover;
  border-radius: 12px;
}

.related-card h3 {
  color: #f5ead4;
  font-size: 15px;
  margin-bottom: 4px;
}

.related-card p {
  color: #9d927f;
  font-size: 12px;
}

.related-card a {
  color: #f4d9a3;
  font-size: 13px;
  text-decoration: none;
}

/* Responsive */
@media (max-width: 1280px) {
  .detail-hero {
    grid-template-columns: 320px 1fr;
  }

  .side-card {
    grid-column: 1 / -1;
  }

  .meta-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 900px) {
  .detail-page {
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
  }

  .top-search {
    width: 100%;
  }

  .detail-hero,
  .detail-body {
    grid-template-columns: 1fr;
  }

  .cover-panel {
    min-height: 360px;
  }

  .detail-content {
    padding: 30px;
  }

  .detail-content h1 {
    font-size: 52px;
  }
}

@media (max-width: 620px) {
  .meta-grid {
    grid-template-columns: 1fr;
  }

  .action-row {
    flex-wrap: wrap;
  }

  .detail-track {
    grid-template-columns: 34px 1fr 38px;
  }

  .track-time {
    display: none;
  }
}
</style>