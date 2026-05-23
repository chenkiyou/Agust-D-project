<template>
  <main class="admin-page">
    <!-- 没有权限时显示 -->
    <section v-if="!isAdmin" class="no-permission">
      <h1>Admin Access Required</h1>
      <p>You need to login as admin before entering the management dashboard.</p>
      <router-link to="/login" class="primary-btn">Go to Login</router-link>
    </section>

    <!-- 管理员后台 -->
    <section v-else class="admin-shell">
      <!-- 左侧侧边栏 -->
      <aside class="admin-sidebar">
        <div class="admin-brand">
          <div class="brand-title">AGUST D</div>
          <div class="brand-subtitle">admin dashboard</div>
        </div>

      <nav class="admin-menu">
        <p class="menu-label">ADMIN</p>

        <button class="active">Dashboard</button>
        <button>Works Management</button>
        <button>Community Posts</button>
        <button>Users</button>
        <button>Settings</button>

        <p class="menu-label site-label">SITE</p>

        <router-link class="admin-link" to="/">Back to Home</router-link>
        <router-link class="admin-link" to="/works">Works Page</router-link>
        <router-link class="admin-link" to="/community">Community</router-link>
      </nav>

        <div class="admin-user">
          <div class="avatar">
            {{ currentUser.username.slice(0, 1).toUpperCase() }}
          </div>

          <div>
            <strong>{{ currentUser.username }}</strong>
            <span>{{ currentUser.role }}</span>
          </div>
        </div>

        <button class="logout-btn" @click="handleLogout">Logout</button>
      </aside>

      <!-- 右侧主内容 -->
      <section class="admin-main">
        <!-- 顶部 -->
        <header class="admin-header">
          <div>
            <p class="page-kicker">MANAGEMENT CENTER</p>
            <h1>Works Dashboard</h1>
            <span>
              Manage music archive works, update content, and maintain the
              platform data.
            </span>
          </div>

          <div class="header-actions">
            <router-link to="/" class="outline-link">View Site</router-link>
            <button class="primary-btn" @click="openAddForm">+ Add Work</button>
          </div>
        </header>

        <!-- 统计卡片 -->
        <section class="stats-grid">
          <div class="stat-card">
            <span>Total Works</span>
            <strong>{{ adminWorks.length }}</strong>
          </div>

          <div class="stat-card">
            <span>Albums</span>
            <strong>{{ albumCount }}</strong>
          </div>

          <div class="stat-card">
            <span>Singles</span>
            <strong>{{ singleCount }}</strong>
          </div>

          <div class="stat-card">
            <span>Admin Role</span>
            <strong>{{ currentUser.role }}</strong>
          </div>
        </section>

        <!-- 表单区域 -->
        <section v-if="showForm" class="form-panel">
          <div class="form-header">
            <h2>{{ editingId ? 'Edit Work' : 'Add New Work' }}</h2>
            <button @click="closeForm">×</button>
          </div>

          <form class="work-form" @submit.prevent="submitWork">
            <label>
              Title
              <input v-model="form.title" type="text" placeholder="Work title" />
            </label>

            <label>
              Artist
              <input v-model="form.artist" type="text" placeholder="Artist" />
            </label>

            <label>
              Year
              <input v-model="form.year" type="number" placeholder="2024" />
            </label>

            <label>
              Type
              <select v-model="form.type">
                <option>Solo Work</option>
                <option>Mixtape</option>
                <option>Collaboration</option>
                <option>Soundtrack</option>
              </select>
            </label>

            <label>
              Plays
              <input v-model="form.plays" type="text" placeholder="12.4M" />
            </label>

            <label>
              Rating
              <input v-model="form.rating" type="text" placeholder="4.9" />
            </label>

            <label class="full">
              Description
              <textarea
                v-model="form.description"
                placeholder="Write a short archive description..."
              ></textarea>
            </label>

            <p v-if="message" class="message">{{ message }}</p>

            <div class="form-actions full">
              <button class="outline-btn" type="button" @click="closeForm">
                Cancel
              </button>
              <button class="primary-btn" type="submit">
                {{ editingId ? 'Save Changes' : 'Create Work' }}
              </button>
            </div>
          </form>
        </section>

        <!-- 作品管理表格 -->
        <section class="table-panel">
          <div class="table-header">
            <div>
              <h2>Works Management</h2>
              <p>Manage archive works stored in localStorage.</p>
            </div>

            <div class="table-search">
              <input
                v-model="searchKeyword"
                type="text"
                placeholder="Search work..."
              />
              <span>⌕</span>
            </div>
          </div>

          <div class="table-wrap">
            <table>
              <thead>
                <tr>
                  <th>Work</th>
                  <th>Type</th>
                  <th>Year</th>
                  <th>Plays</th>
                  <th>Rating</th>
                  <th>Status</th>
                  <th class="actions-col">Actions</th>
                </tr>
              </thead>

              <tbody>
                <tr v-for="work in filteredWorks" :key="work.id">
                  <td>
                    <div class="work-cell">
                      <img :src="work.cover" :alt="work.title" />

                      <div>
                        <strong>{{ work.title }}</strong>
                        <span>{{ work.artist }}</span>
                      </div>
                    </div>
                  </td>

                  <td>{{ work.type }}</td>
                  <td>{{ work.year }}</td>
                  <td>{{ work.plays }}</td>
                  <td>☆ {{ work.rating }}</td>
                  <td>
                    <span class="status-pill">Published</span>
                  </td>
                  <td>
                    <div class="action-buttons">
                      <button @click="editWork(work)">Edit</button>
                      <button class="danger" @click="deleteWork(work.id)">
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>

            <div v-if="filteredWorks.length === 0" class="empty-state">
              No works found.
            </div>
          </div>
        </section>
      </section>
    </section>
  </main>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'

import albumDday from '../assets/images/album-dday.png'
import albumAgustd from '../assets/images/album-agustd.png'
import albumD2 from '../assets/images/album-d2.png'
import albumTour from '../assets/images/album-tour-archive.png'

import trackHaegeum from '../assets/images/track-haegeum.png'
import trackDaechwita from '../assets/images/track-daechwita.png'
import trackPeople from '../assets/images/track-people-pt2.png'
import trackAmygdala from '../assets/images/track-amygdala.png'

const router = useRouter()

const currentUser = ref(null)
const adminWorks = ref([])
const showForm = ref(false)
const editingId = ref(null)
const searchKeyword = ref('')
const message = ref('')

const defaultWorks = [
  {
    id: 1,
    title: 'D-DAY',
    artist: 'Agust D',
    year: 2023,
    type: 'Solo Work',
    plays: '12.4M',
    rating: '4.9',
    cover: albumDday,
    description: 'A powerful album archive with intense sound and storytelling.',
  },
  {
    id: 2,
    title: 'Agust D',
    artist: 'Agust D',
    year: 2016,
    type: 'Mixtape',
    plays: '36.8M',
    rating: '4.9',
    cover: albumAgustd,
    description: 'The beginning of the Agust D archive and personal narrative.',
  },
  {
    id: 3,
    title: 'D-2',
    artist: 'Agust D',
    year: 2020,
    type: 'Mixtape',
    plays: '28.7M',
    rating: '4.8',
    cover: albumD2,
    description: 'A second chapter with sharp emotion and experimental sound.',
  },
  {
    id: 4,
    title: 'Agust D TOUR D-DAY',
    artist: 'Agust D',
    year: 2023,
    type: 'Soundtrack',
    plays: '8.7M',
    rating: '4.9',
    cover: albumTour,
    description: 'Live stage memories collected as a visual music archive.',
  },
  {
    id: 5,
    title: 'Haegeum',
    artist: 'Agust D',
    year: 2023,
    type: 'Solo Work',
    plays: '15.2M',
    rating: '4.9',
    cover: trackHaegeum,
    description: 'A bold single blending tradition, rhythm, and freedom.',
  },
  {
    id: 6,
    title: 'Daechwita',
    artist: 'Agust D',
    year: 2020,
    type: 'Solo Work',
    plays: '21.3M',
    rating: '4.9',
    cover: trackDaechwita,
    description: 'A dramatic and iconic work with royal visual energy.',
  },
  {
    id: 7,
    title: 'People Pt.2',
    artist: 'Agust D',
    year: 2023,
    type: 'Collaboration',
    plays: '17.6M',
    rating: '4.8',
    cover: trackPeople,
    description: 'A reflective piece about people, distance, and memory.',
  },
  {
    id: 8,
    title: 'Amygdala',
    artist: 'Agust D',
    year: 2023,
    type: 'Solo Work',
    plays: '9.3M',
    rating: '4.8',
    cover: trackAmygdala,
    description: 'A dark emotional work exploring memory, pain, and inner conflict.',
  },
]

const form = reactive({
  title: '',
  artist: '',
  year: '',
  type: 'Solo Work',
  plays: '',
  rating: '',
  description: '',
})

onMounted(() => {
  const savedUser = localStorage.getItem('agust_user')
  const savedWorks = localStorage.getItem('agust_admin_works')

  if (savedUser) {
    currentUser.value = JSON.parse(savedUser)
  }

  if (savedWorks) {
    adminWorks.value = JSON.parse(savedWorks)
  } else {
    adminWorks.value = defaultWorks
    saveWorks()
  }
})

const isAdmin = computed(() => {
  return currentUser.value && currentUser.value.role === 'admin'
})

const filteredWorks = computed(() => {
  const keyword = searchKeyword.value.trim().toLowerCase()

  if (!keyword) {
    return adminWorks.value
  }

  return adminWorks.value.filter((work) => {
    return (
      work.title.toLowerCase().includes(keyword) ||
      work.artist.toLowerCase().includes(keyword) ||
      work.type.toLowerCase().includes(keyword) ||
      String(work.year).includes(keyword)
    )
  })
})

const albumCount = computed(() => {
  return adminWorks.value.filter((work) => work.type === 'Mixtape').length
})

const singleCount = computed(() => {
  return adminWorks.value.filter((work) => work.type === 'Solo Work').length
})

function saveWorks() {
  localStorage.setItem('agust_admin_works', JSON.stringify(adminWorks.value))
}

function openAddForm() {
  resetForm()
  showForm.value = true
}

function closeForm() {
  showForm.value = false
  resetForm()
}

function resetForm() {
  editingId.value = null
  message.value = ''
  form.title = ''
  form.artist = ''
  form.year = ''
  form.type = 'Solo Work'
  form.plays = ''
  form.rating = ''
  form.description = ''
}

function submitWork() {
  message.value = ''

  if (!form.title.trim()) {
    message.value = '请输入作品标题'
    return
  }

  if (!form.artist.trim()) {
    message.value = '请输入作者'
    return
  }

  if (!form.year) {
    message.value = '请输入年份'
    return
  }

  if (editingId.value) {
    const target = adminWorks.value.find((item) => item.id === editingId.value)

    if (target) {
      target.title = form.title
      target.artist = form.artist
      target.year = Number(form.year)
      target.type = form.type
      target.plays = form.plays || '0'
      target.rating = form.rating || '0'
      target.description = form.description
    }
  } else {
    adminWorks.value.unshift({
      id: Date.now(),
      title: form.title,
      artist: form.artist,
      year: Number(form.year),
      type: form.type,
      plays: form.plays || '0',
      rating: form.rating || '0',
      cover: albumDday,
      description: form.description || 'New archive work description.',
    })
  }

  saveWorks()
  closeForm()
}

function editWork(work) {
  editingId.value = work.id
  showForm.value = true
  message.value = ''

  form.title = work.title
  form.artist = work.artist
  form.year = work.year
  form.type = work.type
  form.plays = work.plays
  form.rating = work.rating
  form.description = work.description
}

function deleteWork(id) {
  const confirmed = window.confirm('确定要删除这个作品吗？')

  if (!confirmed) {
    return
  }

  adminWorks.value = adminWorks.value.filter((work) => work.id !== id)
  saveWorks()
}

function handleLogout() {
  localStorage.removeItem('agust_user')
  currentUser.value = null
  router.push('/')
}
</script>

<style scoped>
.admin-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at 78% 18%, rgba(199, 159, 91, 0.12), transparent 28%),
    #050505;
  color: #f5ead4;
}

/* No permission */
.no-permission {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
  text-align: center;
  padding: 32px;
}

.no-permission h1 {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 58px;
  color: #f7e7c0;
}

.no-permission p {
  color: #b9a77c;
  font-size: 16px;
}

.primary-btn,
.outline-link,
.outline-btn {
  height: 42px;
  padding: 0 24px;
  border-radius: 999px;
  text-decoration: none;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
}

.primary-btn {
  border: none;
  background: linear-gradient(135deg, #f7e7c0, #c79f5b);
  color: #15110a;
  font-weight: 800;
}

.outline-link,
.outline-btn {
  border: 1px solid rgba(244, 217, 163, 0.28);
  background: rgba(255, 255, 255, 0.035);
  color: #f5ead4;
}

/* Shell */
.admin-shell {
  min-height: 100vh;
  display: grid;
  grid-template-columns: 280px 1fr;
}

/* Sidebar */
.admin-sidebar {
  border-right: 1px solid rgba(244, 217, 163, 0.1);
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.012)),
    #070707;
  padding: 28px;
  display: flex;
  flex-direction: column;
}

.admin-brand {
  margin-bottom: 42px;
}

.brand-title {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 34px;
  color: #f4d9a3;
  letter-spacing: 3px;
}

.brand-subtitle {
  margin-top: 6px;
  color: #b9a77c;
  font-size: 12px;
  letter-spacing: 3px;
}

.admin-menu {
  display: grid;
  gap: 12px;
}

.admin-menu button {
  height: 42px;
  border: none;
  border-radius: 999px;
  background: transparent;
  color: #b9a77c;
  text-align: left;
  padding: 0 18px;
  cursor: pointer;
}

.admin-menu button.active,
.admin-menu button:hover {
  background: rgba(244, 217, 163, 0.12);
  color: #f5ead4;
}

.menu-label {
  color: #c79f5b;
  font-size: 12px;
  letter-spacing: 2px;
  margin: 6px 0 4px;
}

.site-label {
  margin-top: 28px;
}

.admin-link {
  height: 42px;
  border-radius: 999px;
  color: #b9a77c;
  text-decoration: none;
  display: flex;
  align-items: center;
  padding: 0 18px;
  font-size: 14px;
}

.admin-link:hover {
  background: rgba(244, 217, 163, 0.12);
  color: #f5ead4;
}

.admin-user {
  margin-top: auto;
  border: 1px solid rgba(244, 217, 163, 0.12);
  border-radius: 18px;
  padding: 16px;
  display: flex;
  gap: 12px;
  align-items: center;
  background: rgba(255, 255, 255, 0.03);
}

.avatar {
  width: 42px;
  height: 42px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f7e7c0, #c79f5b);
  color: #15110a;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.admin-user strong {
  display: block;
  color: #f5ead4;
  margin-bottom: 4px;
}

.admin-user span {
  color: #b9a77c;
  font-size: 12px;
}

.logout-btn {
  margin-top: 14px;
  height: 42px;
  border: 1px solid rgba(244, 217, 163, 0.22);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.035);
  color: #f4d9a3;
  cursor: pointer;
}

/* Main */
.admin-main {
  padding: 30px;
  overflow: auto;
}

.admin-header {
  border: 1px solid rgba(244, 217, 163, 0.14);
  border-radius: 24px;
  background:
    radial-gradient(circle at 78% 24%, rgba(199, 159, 91, 0.14), transparent 28%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.018)),
    #090909;
  padding: 34px;
  display: flex;
  justify-content: space-between;
  gap: 30px;
}

.page-kicker {
  color: #c79f5b;
  font-size: 13px;
  letter-spacing: 5px;
  margin-bottom: 12px;
}

.admin-header h1 {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 52px;
  color: #f7e7c0;
  margin-bottom: 10px;
}

.admin-header span {
  color: #b9a77c;
  line-height: 1.7;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 14px;
  flex-shrink: 0;
}

/* Stats */
.stats-grid {
  margin-top: 22px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 18px;
}

.stat-card {
  border: 1px solid rgba(244, 217, 163, 0.12);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.035);
  padding: 22px;
}

.stat-card span {
  display: block;
  color: #9d927f;
  font-size: 13px;
  margin-bottom: 12px;
}

.stat-card strong {
  color: #f4d9a3;
  font-size: 34px;
}

/* Form */
.form-panel,
.table-panel {
  margin-top: 22px;
  border: 1px solid rgba(244, 217, 163, 0.14);
  border-radius: 22px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.045), rgba(255, 255, 255, 0.014)),
    #090909;
  padding: 24px;
}

.form-header,
.table-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 24px;
  margin-bottom: 20px;
}

.form-header h2,
.table-header h2 {
  color: #f5ead4;
  font-size: 22px;
  margin-bottom: 6px;
}

.table-header p {
  color: #9d927f;
  font-size: 13px;
}

.form-header button {
  width: 36px;
  height: 36px;
  border: 1px solid rgba(244, 217, 163, 0.18);
  border-radius: 50%;
  background: transparent;
  color: #f5ead4;
  cursor: pointer;
}

.work-form {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 18px;
}

.work-form label {
  display: grid;
  gap: 8px;
  color: #d8c7a4;
  font-size: 14px;
}

.work-form input,
.work-form select,
.work-form textarea,
.table-search input {
  border: 1px solid rgba(244, 217, 163, 0.16);
  border-radius: 14px;
  background: rgba(255, 255, 255, 0.035);
  color: #f5ead4;
  outline: none;
  padding: 0 14px;
  font-family: inherit;
}

.work-form input,
.work-form select {
  height: 42px;
}

.work-form textarea {
  min-height: 90px;
  padding-top: 12px;
  resize: vertical;
}

.full {
  grid-column: 1 / -1;
}

.message {
  color: #e28a8a;
  font-size: 14px;
}

.form-actions {
  display: flex;
  justify-content: flex-end;
  gap: 12px;
}

/* Table */
.table-search {
  width: 300px;
  height: 42px;
  border: 1px solid rgba(244, 217, 163, 0.16);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.035);
  display: flex;
  align-items: center;
  padding: 0 14px;
}

.table-search input {
  flex: 1;
  height: 100%;
  border: none;
  background: transparent;
}

.table-search span {
  color: #d8b76e;
}

.table-wrap {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th {
  color: #9d927f;
  font-size: 12px;
  font-weight: 400;
  text-align: left;
  padding: 14px 12px;
  border-bottom: 1px solid rgba(244, 217, 163, 0.1);
}

td {
  color: #d8c7a4;
  font-size: 14px;
  padding: 14px 12px;
  border-bottom: 1px solid rgba(244, 217, 163, 0.06);
}

.work-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.work-cell img {
  width: 52px;
  height: 52px;
  border-radius: 12px;
  object-fit: cover;
}

.work-cell strong {
  display: block;
  color: #f5ead4;
  margin-bottom: 4px;
}

.work-cell span {
  color: #9d927f;
  font-size: 12px;
}

.status-pill {
  height: 28px;
  padding: 0 12px;
  border-radius: 999px;
  background: rgba(216, 183, 110, 0.12);
  color: #f4d9a3;
  display: inline-flex;
  align-items: center;
  font-size: 12px;
}

.actions-col {
  width: 160px;
}

.action-buttons {
  display: flex;
  gap: 8px;
}

.action-buttons button {
  height: 30px;
  padding: 0 12px;
  border: 1px solid rgba(244, 217, 163, 0.16);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.035);
  color: #f4d9a3;
  cursor: pointer;
}

.action-buttons button.danger {
  color: #e28a8a;
}

.empty-state {
  padding: 34px;
  text-align: center;
  color: #b9a77c;
}

/* Responsive */
@media (max-width: 1100px) {
  .admin-shell {
    grid-template-columns: 1fr;
  }

  .admin-sidebar {
    position: static;
    border-right: none;
    border-bottom: 1px solid rgba(244, 217, 163, 0.1);
  }

  .stats-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .work-form {
    grid-template-columns: 1fr;
  }

  .admin-header {
    flex-direction: column;
  }
}

@media (max-width: 700px) {
  .admin-main {
    padding: 18px;
  }

  .stats-grid {
    grid-template-columns: 1fr;
  }

  .table-header {
    flex-direction: column;
    align-items: flex-start;
  }

  .table-search {
    width: 100%;
  }
}
</style>