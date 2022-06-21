import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import ViewPost from '../views/ViewPost.vue'
import About from '../views/About.vue'
import NotFound from '../views/errors/NotFound.vue'
import EditPost from '../views/EditPost'
import store from '../store'

const children = []
Vue.use(VueRouter, store)

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
    children: children,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/post/edit/:postsId',
    name: 'EditPost',
    component: EditPost,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/post/add',
    name: 'BlogAdd',
    component: EditPost,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '/about',
    name: 'About',
    component: About,
    meta: {
      requireAuth: true
    }
  },
  {
    path: '*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      requireAuth: true
    }
  }
]

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
  store
})

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requireAuth)) { // 判断该路由是否需要登录权限
    const token = store.getters.getToken

    if (token) { // 判断当前的token是否存在 ； 登录存入的token
      if (to.path === '/') {

      } else {
        next()
      }
    } else {
      next({
        path: '/'
      })
    }
  } else {
    next()
  }
})

export default router
