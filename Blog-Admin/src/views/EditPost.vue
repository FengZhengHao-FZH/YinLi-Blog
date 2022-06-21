<template>
  <div>
    <div class="con-form">
      <vs-input v-model="post.title" label="Title" placeholder="Please input the title">
      </vs-input>
      <vs-input v-model="post.cover" label="Cover" placeholder="Please input the Cover">
      </vs-input>
      <vs-input v-model="post.des" label="Des" placeholder="Please input the Des">
      </vs-input>
      <vs-input v-model="post.tag" label="Tags" placeholder="Please input the Tags">
      </vs-input>
    </div>

    <template>
      <div class="markdown" style="margin-left: 10%; width: 80%">
        <Markdown v-model="post.content"/>
      </div>
    </template>

    <template>
      <div class="center content-inputs">
        <vs-button
          @click="submitForm"
        >
          Confirm Change
        </vs-button>
        <vs-button
          @click="reset"
          flat
        >
          Reset
        </vs-button>
      </div>
    </template>

  </div>
</template>

<script>
import Markdown from 'vue-meditor'

export default {
  name: 'EditPost',
  components: {
    Markdown
  },
  data: function () {
    return {
      post: {
        id: '',
        title: '',
        des: '',
        content: '',
        cover: '',
        tag: ''
      },
      config: this.getConfig().config
    }
  },
  methods: {
    submitForm () {
      if (this.post.title === '' || this.post.cover === '' || this.post.des === '' || this.post.content === '' || this.post.tag === '') {
        this.$vs.notification({
          title: 'Operation Fail',
          text: 'Please fill out all sections of the blog'
        })
      }
      this.editPost(this.post).then(function () {
        console.log('ok')
      })
    },
    reset () {
      this.post.id = this.$route.path.split('post/edit')[1]
      console.log(this.post.id)
      if (this.post.id) {
        this.getBlogToEdit(this.post.id).then(function () {
          console.log('ok')
        })
      }
    }
  },
  created () {
    this.post.id = this.$route.path.split('post/edit')[1]
    console.log(this.post.id)
    if (this.post.id) {
      this.getBlogToEdit(this.post.id).then(function () {
        console.log('ok')
      })
    }
  },
  watch: {
    $route (to, from) {
      this.getBlogToEdit(this.post.id)
    }
  }
}
</script>

<style lang="stylus">
  getColor(vsColor, alpha = 1)
  unquote("rgba(var(--vs-"+vsColor+"), "+alpha+")")
  getVar(var)
  unquote("var(--vs-"+var+")")
  .not-margin
    margin 0px
    font-weight normal
    padding 10px
  .con-form
    width 100%
    .flex
      display flex
      align-items center
      justify-content space-between
      a
        font-size .8rem
        opacity .7
        &:hover
          opacity 1
    .vs-checkbox-label
      font-size .8rem
    .vs-input-content
      margin-left 10%
      margin-bottom 20px
      width calc(100%)
      .vs-input
        width 80%
  .footer-dialog
    display flex
    align-items center
    justify-content center
    flex-direction column
    width calc(100%)
    .new
      margin 0px
      margin-top 20px
      padding: 0px
      font-size .7rem
      a
        color getColor('primary') !important
        margin-left 6px
        &:hover
          text-decoration underline
    .vs-button
      margin 0px
</style>
