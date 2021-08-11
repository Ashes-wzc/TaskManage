<template>
  <ProjectCard url="/b8l"></ProjectCard>
  <ProjectCard url="/contact"></ProjectCard>
</template>

<script>
import ProjectCard from '../ui-components/ProjectCard.vue'
export default {
  components: { ProjectCard },
  name: "DemupApp",
  props: {
    msg: String,
  },
}
</script>

<style>
</style>