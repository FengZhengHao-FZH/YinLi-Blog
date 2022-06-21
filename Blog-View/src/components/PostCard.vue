<template>
  <router-link :to="`/posts/${post.id}`">
    <vs-card class="post-card">
      <template #title>
        <h3>{{ post.title }}</h3>
        <small>{{ post.date}}</small>
      </template>
      <template #img>
        <img :src="post.cover" alt />
      </template>
      <template #text>
        <p class="post-txt">{{ post.des }}</p>
        <small class="post-card-tag">
          {{post.tag}}
<!--          <b :key="i" v-for="(tag, i) in post.tag" style="margin-right: 5px">-->
<!--            {{ tag }}-->
<!--          </b>-->
        </small>
      </template>
      <template #interactions>
        <vs-tooltip right shadow interactivity>
            <vs-avatar :size="size" circle>
              <img :src="post.authorAvatar">
            </vs-avatar>
          <template #tooltip>
            Posted by
            <b>{{ post.authorName }}</b>
          </template>
        </vs-tooltip>
      </template>
    </vs-card>
  </router-link>
</template>

<script>

export default {
  name: 'PostCard',
  props: [
    'post',
    'size'
  ],
  data: function () {
    return {
    }
  },
  components: {
  }
}
</script>

<style>
.post-txt {
  overflow: hidden;
  text-overflow: ellipsis;
  display: auto;
}

.post-card .vs-card {
  height: 380px !important;
}

.post-card-tag {
  position: absolute;
  bottom: 20px;
}
</style>
