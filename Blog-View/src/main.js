import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Vuesax from 'vuesax'
import 'vuesax/dist/vuesax.css'
import 'boxicons'
import 'boxicons/css/boxicons.min.css'
import axios from 'axios'
Vue.prototype.$axios = axios //
Vue.config.productionTip = false

Vue.use(Vuesax, {})

Vue.mixin({
  data: function () {
    return {
      allPosts: {}
    }
  },
  methods: {
    getBlogs: function () {
      const _this = this
      return _this.$axios.get('http://localhost:8081/blogs').then(res => {
        if (res.data.code !== 200) {
          this.$vs.notification({
            title: 'Operation Fail',
            text: res.data.msg
          })
          this.$router.push('/*')
        }
        console.log(res.data)
        this.allPosts = res.data.data
        const posts = this.allPosts
        this.allPosts = []
        for (let i = 0; i < posts.length; i += 6) {
          this.allPosts.push(posts.slice(i, i + 6)) // pagination, 6 posts per page
        }
      })
    },
    getBlog: function (id) {
      return this.$axios.get('http://localhost:8081/blog/' + this.postId).then(res => {
        if (res.data.code !== 200) {
          this.$vs.notification({
            title: 'Operation Fail',
            text: res.data.msg
          })
          this.$router.push('/*')
        }
        this.post.title = res.data.data.title
        this.post.cover = res.data.data.cover
        this.post.des = res.data.data.des
        this.post.date = res.data.data.date
        this.post.authorName = res.data.data.authorName
        this.post.authorAvatar = res.data.data.authorAvatar
        console.log(this.post.authorAvatar)
        const tag = res.data.data.tag
        this.post.tags = tag.split(',')
        const MardownIt = require('markdown-it')
        const md = new MardownIt()
        const result = md.render(res.data.data.content)
        console.log(result)
        this.post.content = result
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
  render: h => h(App)
}).$mount('#app')
