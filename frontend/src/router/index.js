import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    meta:{
      title: 'Accueil'
    }
  },
  {
    path: '/connexion',
    name: 'Connexion',
    meta:{
      title: 'Connexion'
    },
    component: () => import('../views/Connexion.vue')
  },
  {
    path: '/administration',
    name: 'Administration',
    meta:{
      title: 'Administration'
    },
    component: () => import('../views/Administration.vue')
  },
  {
    path: '/profil/:id',
    name: 'Profil',
    meta:{
      title: 'Profil'
    },
    component: () => import('../views/Profil.vue')
  },
  {
    path: '/postfeed',
    name: 'PostFeed',
    meta:{
      title: "Fil d'actualité"
    },
    component: () => import('../views/PostFeed.vue')
  },
  {
    path: '/:pathMatch(.*)',
    name: 'NotFound',
    meta:{
      title: "page inexistante"
    },
    component: () => import('../views/NotFound.vue')
  },
]

const router = createRouter({
  scrollBehavior(to) {
    setTimeout(() => {
      const element = document.getElementById(to.hash.replace(/#/, ''))
      if (element && element.scrollIntoView) {
        element.scrollIntoView({block: 'start', behavior: 'smooth'})
      }
    }, 500)

    //NOTE: This doesn't work
    return {selector: to.hash}
  },
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.afterEach((to) => {
  document.title = to.meta.title
})
export default router
