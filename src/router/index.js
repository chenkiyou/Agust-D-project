import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Works from '../views/Works.vue'
import Detail from '../views/Detail.vue'

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
  {
    path: '/works/:id',
    name: 'Detail',
    component: Detail,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router