import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ViewPost from '../views/ViewPost.vue'
import ViewProjects from '../views/ViewProjects'
import About from '../views/About.vue'
import Links from '../views/Links.vue'
import NotFound from '../views/errors/NotFound.vue'

const children = []
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/posts/:postsId',
    name: 'ViewPost',
    component: ViewPost,
    children: children
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/projects',
    name: 'ViewProjects',
    component: ViewProjects
  },
  {
    path: '/links',
    name: 'Links',
    component: Links
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes
})

export default router
