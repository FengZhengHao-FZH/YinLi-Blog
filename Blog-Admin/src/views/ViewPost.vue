<template>
  <div>
    <img :src="post.cover" class="cover" />
    <div class="container">
      <div class="text-center">
        <h1 class="headline">{{ post.title }}</h1>
        <p>
          Posted on: {{post.date}}
        </p>
        <div class="center">
            <vs-avatar :size="size" circle>
              <img :src="post.authorAvatar">
            </vs-avatar>
          <span class="margin">
            {{ post.authorName }}
          </span>
        </div>
      </div>
      <hr>
      <template>
        <div class="center content-inputs">
          <vs-button
            @click="toEdit"
          >
            Edit this Blog
          </vs-button>
        </div>
      </template>
      <div class="main">
        <div class="markdown-body" v-html="post.content"></div>
      </div>
      <hr>
      <router-view class="post"></router-view>
      <PostTags :postTags="post.tag" />

    </div>

  </div>
</template>

<script>
import PostTags from '@/components/PostTags.vue'

export default {
  name: 'ViewPost',
  components: {
    PostTags
  },
  props: [
    'size'
  ],
  data: function () {
    return {
      post: {
        id: '',
        title: '',
        date: '',
        content: '',
        cover: '',
        authorName: '',
        authorAvatar: '',
        tag: []
      },
      config: this.getConfig().config
    }
  },
  methods: {
    toEdit: function () {
      this.$router.push('/post/edit/' + this.post.id)
    }
  },
  created () {
    this.post.id = this.$route.path.split('posts/')[1]
    this.getBlog(this.post.id).then(function () {
      console.log('ok')
    })
  },
  watch: {
    $route (to, from) {
      this.getBlog(this.post.id)
    }
  }

}
</script>

<style>
.cover {
  width: 100vw;
}

.margin {
  margin-left: 20px;
}

.post img {  /* limit image max width to 100vw in a post */
  max-width: 100%;
}
.main{
}
</style>
