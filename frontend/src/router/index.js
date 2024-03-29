import { createRouter, createWebHistory } from 'vue-router'
import Signup from '../views/Signup.vue'
import Profil from '../views/Profil.vue'
import Memes from '../views/Memes.vue'
import EditUser from '../views/EditUser.vue'
import EditPublication from '../views/EditPublication.vue'
import EditComment from '../views/EditComment.vue'

const routes = [
  {
    path: '/',
    name: 'Signup',
    component: Signup
  },
  {
    path: '/profil/:id',
    name: 'Profil',
    component: Profil
  },
  {
    path: '/memes',
    name: 'Memes',
    component: Memes
  },
  {
    path: '/editUser',
    name: 'EditUser',
    component: EditUser
  },
  {
    path: '/editPublication/:postId',
    name: 'EditPublication',
    component: EditPublication
  },
  {
    path: '/editComment/:id',
    name: 'EditComment',
    component: EditComment
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
  history: createWebHistory(),
  routes
})

export default router
