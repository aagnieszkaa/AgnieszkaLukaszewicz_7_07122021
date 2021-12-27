import { createRouter, createWebHashHistory } from 'vue-router'
import Signup from '../views/Signup.vue'
import Profil from '../views/Profil.vue'
import Memes from '../views/Memes.vue'

const routes = [
  {
    path: '/',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/profil',
    name: 'Profil',
    component: Profil
  },
  {
    path: '/memes',
    name: 'Memes',
    component: Memes
  }


  
  /*{
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ /* '../views/About.vue')
  }*/
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
