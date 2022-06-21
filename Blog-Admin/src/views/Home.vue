<template>
  <div class="container">
    <h1 class="text-center">Blogs</h1>
    <hr />
    <div v-if="getPosts().length">
      <br />
      <div class="grid-3_xs-1_sm-2_md-2">
        <div
          :key="index"
          v-for="(post, index) in getPosts()"
          class="col center"
        >
          <PostCard :post="post" />
        </div>
      </div>
      <div class="center con-pagination">
        <vs-pagination v-model="curPage" :length="allPosts.length" not-margin progress />
      </div>
    </div>
    <Nothing v-else />
    <vs-dialog prevent-close not-close blur v-model="this.$store.getters.getNeedtoLogin">
      <template #header>
        <h4 class="not-margin">
          Welcome to <b>YinLi</b>
          <br>
          <span style="color: #fe8200">{{msg}}</span>
        </h4>
      </template>
      <div class="con-form">
        <vs-input v-model="ruleForm.username" placeholder="Username">
          <template #icon>
            @
          </template>
        </vs-input>
        <vs-input type="password" v-model="ruleForm.password" placeholder="Password">
          <template #icon>
            <i class='bx bxs-lock'></i>
          </template>
        </vs-input>
        <div class="flex">
          <vs-checkbox v-model="ruleForm.remember">Remember me</vs-checkbox>
          <a href="#">Forgot Password?</a>
        </div>
      </div>

      <template #footer>
        <div class="footer-dialog">
          <vs-button block @click="login">
            Sign In
          </vs-button>

          <div class="new">
            New Here? <a href="#">Create New Account</a>
          </div>
        </div>
      </template>
    </vs-dialog>
  </div>

</template>

<script>
import PostCard from '@/components/PostCard.vue'
import Nothing from '@/components/Nothing.vue'

export default {
  name: 'Home',
  components: {
    PostCard,
    Nothing
  },
  props: {
  },
  data: function () {
    return {
      allPosts: {},
      curPage: 1,
      ruleForm: {
        username: 'ArisPattakos',
        password: '123456',
        remember: false
      },
      msg: '',
      config: this.getConfig().config
    }
  },
  mounted: function () {
    this.changeTitle('Home')
  },
  methods: {
    getPosts () {
      try {
        return this.allPosts[this.curPage - 1].slice()
      } catch (e) {
        return []
      }
    },
    login () {
      const _this = this
      this.$axios.post('http://localhost:8081/login', this.ruleForm).then(res => {
        if (res.data.code !== 200) {
          this.msg = res.data.msg
          return
        }
        const token = res.headers.authorization
        const userInfo = res.data.data

        // 把数据共享出去
        _this.$store.commit('SET_TOKEN', token)
        _this.$store.commit('SET_USERINFO', userInfo)
        _this.$store.commit('LOGIN')
        // 获取
      }).then(res => {
        this.getBlogs().then(function () {
          console.log('create home page ok')
        })
      })
    }
  },
  created: function () {
    this.getBlogs().then(function () {
      console.log('create home page ok')
    })
  }
}
</script>
<style lang="stylus">
</style>
