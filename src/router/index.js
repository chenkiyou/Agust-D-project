import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Works from '../views/Works.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
  },
  {
    path: '/works',
    name: 'Works',
    component: Works,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router