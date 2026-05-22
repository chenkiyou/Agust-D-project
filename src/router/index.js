import { createRouter, createWebHistory } from 'vue-router'

import Home from '../views/Home.vue'
import Works from '../views/Works.vue'
import Detail from '../views/Detail.vue'
import Login from '../views/Login.vue'

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
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router