<template>
  <main class="community-page">
    <!-- 顶部导航栏 -->
    <AppHeader />

    <!-- 页面头部 -->
    <section class="community-hero">
      <div>
        <p class="page-kicker">COMMUNITY SPACE</p>
        <h1>
          Share the Moment,<br />
          Keep the Story.
        </h1>
        <p class="page-desc">
          A fan-made space for sharing thoughts, favorite lyrics, archive notes,
          and memories inspired by Agust D's music.
        </p>
      </div>

      <div class="community-summary">
        <div>
          <strong>{{ posts.length }}</strong>
          <span>Posts</span>
        </div>
        <div>
          <strong>{{ topicTags.length }}</strong>
          <span>Topics</span>
        </div>
        <div>
          <strong>{{ currentUser ? 'Online' : 'Guest' }}</strong>
          <span>Status</span>
        </div>
      </div>
    </section>

    <!-- 主体内容 -->
    <section class="community-layout">
      <!-- 左侧主区域 -->
      <div class="community-main">
        <!-- 发布动态 -->
        <section class="composer-card">
          <div class="composer-header">
            <div class="avatar">
              {{ currentUser ? currentUser.username.slice(0, 1).toUpperCase() : 'G' }}
            </div>

            <div>
              <h2>Share something with the archive</h2>
              <p>
                {{
                  currentUser
                    ? 'Write a post about your favorite work, lyric, or memory.'
                    : 'Login first to publish a community post.'
                }}
              </p>
            </div>
          </div>

          <textarea
            v-model="newPost"
            placeholder="What do you want to share today?"
          ></textarea>

          <div class="composer-actions">
            <div class="tag-select">
              <button
                v-for="tag in topicTags"
                :key="tag"
                :class="{ active: selectedTag === tag }"
                @click="selectedTag = tag"
              >
                #{{ tag }}
              </button>
            </div>

            <button class="publish-btn" @click="publishPost">
              Publish
            </button>
          </div>

          <p v-if="message" class="message" :class="{ success: isSuccess }">
            {{ message }}
          </p>
        </section>

        <!-- 动态列表 -->
        <section class="post-list">
          <article
            v-for="post in filteredPosts"
            :key="post.id"
            class="post-card"
          >
            <div class="post-top">
              <div class="avatar">
                {{ post.author.slice(0, 1).toUpperCase() }}
              </div>

              <div class="post-meta">
                <h3>{{ post.author }}</h3>
                <p>{{ post.time }} · #{{ post.tag }}</p>
              </div>

              <button
                v-if="currentUser && post.author === currentUser.username"
                class="delete-btn"
                @click="deletePost(post.id)"
              >
                Delete
              </button>
            </div>

            <p class="post-content">
              {{ post.content }}
            </p>

            <div class="post-actions">
              <button @click="likePost(post.id)">
                ♥ {{ post.likes }}
              </button>
              <button>💬 {{ post.comments }}</button>
              <button>↗ Share</button>
            </div>
          </article>

          <div v-if="filteredPosts.length === 0" class="empty-state">
            <h2>No posts found</h2>
            <p>Try another keyword or topic.</p>
          </div>
        </section>
      </div>

      <!-- 右侧侧边栏 -->
      <aside class="community-sidebar">
        <section class="side-panel">
          <h2>Trending Topics</h2>

          <div class="topic-list">
            <button
              v-for="tag in topicTags"
              :key="tag"
              :class="{ active: selectedTag === tag }"
              @click="selectedTag = tag"
            >
              <span>#{{ tag }}</span>
              <strong>{{ getTagCount(tag) }}</strong>
            </button>
          </div>
        </section>

        <section class="side-panel">
          <h2>Community Rules</h2>

          <ul class="rules-list">
            <li>Respect every fan and artist.</li>
            <li>Do not post harmful or offensive content.</li>
            <li>Keep discussion related to music and archive topics.</li>
            <li>This is a fan-made educational project.</li>
          </ul>
        </section>

        <section class="side-panel quote-panel">
          <span class="quote-mark">“</span>
          <p>
            Music connects memories, emotions, and people across different
            moments.
          </p>
          <strong>— Archive Note</strong>
        </section>
      </aside>
    </section>
  </main>
</template>

<script setup>
import AppHeader from '../components/AppHeader.vue'
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const router = useRouter()

const currentUser = ref(null)
const searchKeyword = ref('')
const newPost = ref('')
const selectedTag = ref('All')
const message = ref('')
const isSuccess = ref(false)

const topicTags = ['All', 'D-DAY', 'Lyrics', 'Stage', 'Archive', 'Memory']

const defaultPosts = [
  {
    id: 1,
    author: 'archive_admin',
    tag: 'D-DAY',
    time: 'Pinned post',
    content:
      'Welcome to the AGUST D fan project archive community. Share your favorite tracks, performances, and archive notes here.',
    likes: 128,
    comments: 24,
  },
  {
    id: 2,
    author: 'music_fan',
    tag: 'Lyrics',
    time: '2 hours ago',
    content:
      'Amygdala feels like one of the most emotional pieces in the archive. The storytelling and visual tone are unforgettable.',
    likes: 76,
    comments: 12,
  },
  {
    id: 3,
    author: 'stage_memory',
    tag: 'Stage',
    time: 'Yesterday',
    content:
      'The D-DAY stage archive has such strong energy. I like how the live performance changes the feeling of each track.',
    likes: 94,
    comments: 18,
  },
  {
    id: 4,
    author: 'golden_archive',
    tag: 'Archive',
    time: '3 days ago',
    content:
      'I hope this platform can collect tracks, albums, performances, photos, and written notes in one clean archive.',
    likes: 52,
    comments: 8,
  },
]

const posts = ref([])

onMounted(() => {
  const savedUser = localStorage.getItem('agust_user')
  const savedPosts = localStorage.getItem('agust_community_posts')

  if (savedUser) {
    currentUser.value = JSON.parse(savedUser)
  }

  if (savedPosts) {
    posts.value = JSON.parse(savedPosts)
  } else {
    posts.value = defaultPosts
    localStorage.setItem('agust_community_posts', JSON.stringify(defaultPosts))
  }
})

const filteredPosts = computed(() => {
  const keyword = searchKeyword.value.trim().toLowerCase()

  return posts.value.filter((post) => {
    const matchTag =
      selectedTag.value === 'All' || post.tag === selectedTag.value

    const matchSearch =
      keyword === '' ||
      post.author.toLowerCase().includes(keyword) ||
      post.tag.toLowerCase().includes(keyword) ||
      post.content.toLowerCase().includes(keyword)

    return matchTag && matchSearch
  })
})

function publishPost() {
  message.value = ''
  isSuccess.value = false

  if (!currentUser.value) {
    message.value = '请先登录后再发布动态'
    setTimeout(() => {
      router.push('/login')
    }, 700)
    return
  }

  if (!newPost.value.trim()) {
    message.value = '请输入发布内容'
    return
  }

  const post = {
    id: Date.now(),
    author: currentUser.value.username,
    tag: selectedTag.value === 'All' ? 'Archive' : selectedTag.value,
    time: 'Just now',
    content: newPost.value.trim(),
    likes: 0,
    comments: 0,
  }

  posts.value.unshift(post)
  localStorage.setItem('agust_community_posts', JSON.stringify(posts.value))

  newPost.value = ''
  message.value = '发布成功'
  isSuccess.value = true
}

function likePost(id) {
  const targetPost = posts.value.find((post) => post.id === id)

  if (!targetPost) {
    return
  }

  targetPost.likes += 1
  localStorage.setItem('agust_community_posts', JSON.stringify(posts.value))
}

function deletePost(id) {
  posts.value = posts.value.filter((post) => post.id !== id)
  localStorage.setItem('agust_community_posts', JSON.stringify(posts.value))
}

function getTagCount(tag) {
  if (tag === 'All') {
    return posts.value.length
  }

  return posts.value.filter((post) => post.tag === tag).length
}

function handleLogout() {
  localStorage.removeItem('agust_user')
  currentUser.value = null
  router.push('/')
}
</script>

<style scoped>
.community-page {
  min-height: 100vh;
  background:
    radial-gradient(circle at 74% 18%, rgba(199, 159, 91, 0.12), transparent 28%),
    #050505;
  color: #f5ead4;
  padding: 0 32px 56px;
}

/* Header */
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
.community-hero {
  margin-top: 24px;
  min-height: 280px;
  border: 1px solid rgba(244, 217, 163, 0.14);
  border-radius: 26px;
  background:
    radial-gradient(circle at 78% 28%, rgba(199, 159, 91, 0.18), transparent 28%),
    linear-gradient(135deg, rgba(255, 255, 255, 0.05), rgba(255, 255, 255, 0.018)),
    #090909;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 36px;
  padding: 46px 64px;
  box-shadow: 0 24px 70px rgba(0, 0, 0, 0.42);
}

.page-kicker {
  color: #c79f5b;
  font-size: 14px;
  letter-spacing: 6px;
  margin-bottom: 16px;
}

.community-hero h1 {
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 58px;
  line-height: 1;
  color: #f7e7c0;
  margin-bottom: 16px;
}

.page-desc {
  max-width: 640px;
  color: #c9b88f;
  font-size: 16px;
  line-height: 1.7;
}

.community-summary {
  width: 260px;
  border: 1px solid rgba(244, 217, 163, 0.14);
  border-radius: 20px;
  background: rgba(255, 255, 255, 0.035);
  padding: 22px;
  display: grid;
  gap: 16px;
}

.community-summary div {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.community-summary strong {
  color: #f4d9a3;
  font-size: 24px;
}

.community-summary span {
  color: #b9a77c;
  font-size: 13px;
}

/* Layout */
.community-layout {
  margin-top: 24px;
  display: grid;
  grid-template-columns: 1fr 320px;
  gap: 24px;
}

.community-main {
  display: grid;
  gap: 22px;
}

.composer-card,
.post-card,
.side-panel {
  border: 1px solid rgba(244, 217, 163, 0.14);
  border-radius: 22px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.018)),
    #090909;
  box-shadow: 0 22px 64px rgba(0, 0, 0, 0.34);
}

/* Composer */
.composer-card {
  padding: 24px;
}

.composer-header {
  display: flex;
  align-items: center;
  gap: 16px;
  margin-bottom: 18px;
}

.avatar {
  width: 46px;
  height: 46px;
  border-radius: 50%;
  background: linear-gradient(135deg, #f7e7c0, #c79f5b);
  color: #15110a;
  font-weight: 800;
  display: flex;
  align-items: center;
  justify-content: center;
}

.composer-header h2 {
  color: #f5ead4;
  font-size: 20px;
  margin-bottom: 5px;
}

.composer-header p {
  color: #9d927f;
  font-size: 14px;
}

.composer-card textarea {
  width: 100%;
  min-height: 130px;
  border: 1px solid rgba(244, 217, 163, 0.16);
  border-radius: 18px;
  background: rgba(255, 255, 255, 0.035);
  color: #f5ead4;
  outline: none;
  resize: vertical;
  padding: 16px;
  font-family: inherit;
  line-height: 1.7;
}

.composer-card textarea::placeholder {
  color: #827869;
}

.composer-actions {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-top: 16px;
}

.tag-select {
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
}

.tag-select button {
  height: 32px;
  padding: 0 14px;
  border: 1px solid rgba(244, 217, 163, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.035);
  color: #b9a77c;
  cursor: pointer;
}

.tag-select button.active {
  background: linear-gradient(135deg, #f7e7c0, #c79f5b);
  color: #15110a;
  font-weight: 700;
}

.publish-btn {
  height: 38px;
  padding: 0 28px;
  border: none;
  border-radius: 999px;
  background: linear-gradient(135deg, #f7e7c0, #c79f5b);
  color: #15110a;
  font-weight: 800;
  cursor: pointer;
}

.message {
  margin-top: 12px;
  color: #e28a8a;
  font-size: 14px;
}

.message.success {
  color: #d8b76e;
}

/* Posts */
.post-list {
  display: grid;
  gap: 18px;
}

.post-card {
  padding: 22px;
}

.post-top {
  display: flex;
  align-items: center;
  gap: 14px;
}

.post-meta {
  flex: 1;
}

.post-meta h3 {
  color: #f5ead4;
  font-size: 16px;
  margin-bottom: 4px;
}

.post-meta p {
  color: #9d927f;
  font-size: 13px;
}

.delete-btn {
  height: 32px;
  padding: 0 14px;
  border: 1px solid rgba(244, 217, 163, 0.18);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.035);
  color: #c9b88f;
  cursor: pointer;
}

.post-content {
  color: #d8c7a4;
  line-height: 1.8;
  margin: 18px 0;
}

.post-actions {
  display: flex;
  gap: 14px;
}

.post-actions button {
  height: 32px;
  padding: 0 14px;
  border: 1px solid rgba(244, 217, 163, 0.12);
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.03);
  color: #c9b88f;
  cursor: pointer;
}

.post-actions button:hover {
  color: #15110a;
  background: linear-gradient(135deg, #f7e7c0, #c79f5b);
}

/* Sidebar */
.community-sidebar {
  display: grid;
  gap: 22px;
  height: fit-content;
  position: sticky;
  top: 20px;
}

.side-panel {
  padding: 22px;
}

.side-panel h2 {
  color: #f5ead4;
  font-size: 20px;
  margin-bottom: 16px;
}

.topic-list {
  display: grid;
  gap: 10px;
}

.topic-list button {
  height: 38px;
  border: none;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.035);
  color: #b9a77c;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 16px;
  cursor: pointer;
}

.topic-list button.active,
.topic-list button:hover {
  color: #15110a;
  background: linear-gradient(135deg, #f7e7c0, #c79f5b);
}

.rules-list {
  display: grid;
  gap: 12px;
  padding-left: 18px;
  color: #b9a77c;
  font-size: 14px;
  line-height: 1.6;
}

.quote-panel {
  background:
    radial-gradient(circle at 82% 70%, rgba(216, 183, 110, 0.2), transparent 36%),
    linear-gradient(180deg, rgba(255, 255, 255, 0.055), rgba(255, 255, 255, 0.018)),
    #090909;
}

.quote-mark {
  display: block;
  color: #d8b76e;
  font-family: Georgia, 'Times New Roman', serif;
  font-size: 42px;
  line-height: 1;
}

.quote-panel p {
  color: #d8c7a4;
  line-height: 1.7;
  margin: 8px 0 14px;
}

.quote-panel strong {
  color: #c79f5b;
  font-size: 13px;
}

.empty-state {
  min-height: 220px;
  border: 1px solid rgba(244, 217, 163, 0.14);
  border-radius: 22px;
  background: #090909;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.empty-state h2 {
  color: #f7e7c0;
  font-size: 32px;
  margin-bottom: 10px;
}

.empty-state p {
  color: #b9a77c;
}

/* Responsive */
@media (max-width: 1180px) {
  .community-layout {
    grid-template-columns: 1fr;
  }

  .community-sidebar {
    position: static;
    grid-template-columns: repeat(3, 1fr);
  }
}

@media (max-width: 900px) {
  .community-page {
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

  .community-hero {
    flex-direction: column;
    align-items: flex-start;
    padding: 38px;
  }

  .community-hero h1 {
    font-size: 44px;
  }

  .community-summary {
    width: 100%;
  }

  .community-sidebar {
    grid-template-columns: 1fr;
  }

  .composer-actions {
    align-items: flex-start;
    flex-direction: column;
  }
}
</style>