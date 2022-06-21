<template>
  <div class="container">
    <h1 class="text-center">Projects</h1>
    <hr />
    <br />
    <div class="grid-3_xs-1_sm-2_md-2" v-if="projects.length">
      <div
        v-for="(project, index) in projects"
        :key="index"
        class="col center"
      >
        <a :href="project.link" target="_blank">
          <vs-card
            type="5"
          >
            <template #title>
              <h3>{{ project.name }}</h3>
            </template>
            <template #text>
              <p>
                {{ project.des }}
              </p>
            </template>
            <template #img>
              <img :src="project.img" />
            </template>
            <template #interactions>
              <vs-tooltip right>
                <vs-button size="large" dark icon :href="project.github" blank>
                  <i class="bx bxl-github"></i>
                </vs-button>
                <template #tooltip>
                  GitHub
                </template>
              </vs-tooltip>
            </template>
          </vs-card>
        </a>
      </div>
    </div>
    <Nothing v-else />
  </div>
</template>

<script>
import Nothing from '@/components/Nothing.vue'
export default {
  name: 'ViewProjects',
  components: {
    Nothing
  },
  data: function () {
    return {
      projects: this.getConfig('projects.json').projects
    }
  },
  mounted: function () {
    this.changeTitle('Projects')
  }
}
</script>
