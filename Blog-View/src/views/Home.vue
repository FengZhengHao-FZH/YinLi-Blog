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
  data: function () {
    return {
      allPosts: {},
      curPage: 1,
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
    }
  },
  created: function () {
    this.getBlogs().then(function () {
      console.log('create home page ok')
    })
  }
}
</script>
