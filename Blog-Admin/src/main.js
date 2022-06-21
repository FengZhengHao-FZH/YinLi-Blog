import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import 'boxicons'
import 'boxicons/css/boxicons.min.css'
import axios from 'axios'
import 'element-ui/lib/theme-chalk/index.css'
import Element from 'element-ui'
Vue.prototype.$axios = axios //
Vue.config.productionTip = false

Vue.use(Vuesax, {})
Vue.use(Element)

Vue.mixin({
  data: function () {
    return {
      allPosts: {}
    }
  },
  methods: {
    getBlogs: function () {
      const name = this.$store.getters.getUserInfo.name
      const _this = this
      return _this.$axios.get('http://localhost:8081/blogs/' + name).then(res => {
        if (res.data.code !== 200) {
          if (res.data.code !== 200) {
            this.$vs.notification({
              title: 'Operation Fail',
              text: res.data.msg
            })
          }
          this.$router.push('/*')
        }
        this.allPosts = res.data.data
        const posts = this.allPosts
        this.allPosts = []
        for (let i = 0; i < posts.length; i += 6) {
          this.allPosts.push(posts.slice(i, i + 6)) // pagination, 6 posts per page
        }
      })
    },
    getBlog: function (id) {
      return this.$axios.get('http://localhost:8081/blog/' + id).then(res => {
        if (res.data.code !== 200) {
          if (res.data.code !== 200) {
            this.$vs.notification({
              title: 'Operation Fail',
              text: res.data.msg
            })
          }
          this.$router.push('/*')
        }
        this.post.id = res.data.data.id
        this.post.title = res.data.data.title
        this.post.cover = res.data.data.cover
        this.post.des = res.data.data.des
        this.post.date = res.data.data.date
        this.post.authorName = res.data.data.authorName
        this.post.authorAvatar = res.data.data.authorAvatar
        const tag = res.data.data.tag
        this.post.tag = tag.split(',')
        const MardownIt = require('markdown-it')
        const md = new MardownIt()
        const result = md.render(res.data.data.content)
        this.post.content = result
      })
    },
    getBlogToEdit: function (id) {
      return this.$axios.get('http://localhost:8081/blog/' + id).then(res => {
        if (res.data.code !== 200) {
          if (res.data.code !== 200) {
            this.$vs.notification({
              title: 'Operation Fail',
              text: res.data.msg
            })
          }
          this.$router.push('/*')
        }
        if (res.data.data.authorName !== this.$store.getters.getUserInfo.name) {
          if (res.data.code !== 200) {
            this.$vs.notification({
              title: 'Operation Fail',
              text: res.data.msg
            })
          }
          this.$router.push('/*')
        }
        this.post.id = res.data.data.id
        this.post.title = res.data.data.title
        this.post.cover = res.data.data.cover
        this.post.des = res.data.data.des
        this.post.authorName = res.data.data.authorName
        this.post.authorAvatar = res.data.data.authorAvatar
        this.post.tag = res.data.data.tag
        this.post.content = res.data.data.content
      })
    },
    editPost: function (post) {
      return this.$axios.post('http://localhost:8081/blog/edit', post, {
        headers: {
          'content-type': 'application/json',
          satoken: localStorage.getItem('token')
          // "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        if (res.data.code !== 200) {
          this.$vs.notification({
            title: 'Operation Fail',
            text: res.data.msg
          })
        }
      })
    },
    changePassword: function (pwdForm) {
      return this.$axios.post('http://localhost:8081/changePassword', pwdForm, {
        headers: {
          'content-type': 'application/json',
          satoken: localStorage.getItem('token')
          // "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        if (res.data.code !== 200) {
          this.$vs.notification({
            title: 'Operation Fail',
            text: res.data.msg
          })
        }
      })
    },
    changeProfile: function (profileForm) {
      return this.$axios.post('http://localhost:8081/changeProfile', profileForm, {
        headers: {
          'content-type': 'application/json',
          satoken: localStorage.getItem('token')
          // "Authorization": localStorage.getItem("token")
        }
      }).then(res => {
        if (res.data.code !== 200) {
          this.$vs.notification({
            title: 'Operation Fail',
            text: res.data.msg
          })
        }
      })
    },
    changeTitle: function (title) {
      let Config = null
      try {
        Config = require('@/../posts/data/config.json')
      } catch (e) {
        Config = require('@/defaults/config.json')
      }
      document.title = `${title} - ${Config.config.blogTitle}`
    },
    getConfig: function (name = 'config.json') {
      let Config = null
      try {
        Config = require(`@/../posts/data/${name}`)
      } catch (e) {
        Config = require(`@/defaults/${name}`)
      }
      return Config
    }
  },
  computed: {
  }
})

router.afterEach((to, from, next) => {
  window.scrollTo(0, 0)
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
