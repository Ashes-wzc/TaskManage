<template>
  <!-- <el-row>
    <el-col :span="6">
      <ProjectCard url="/b8l"></ProjectCard>
    </el-col>
    <el-col :span="6">
      <ProjectCard url="/contact"></ProjectCard>
    </el-col>
    <el-col :span="6">
      <ProjectCard url="/contact"></ProjectCard>
    </el-col>
    <el-col :span="6">
      <ProjectCard url="/contact"></ProjectCard>
    </el-col>
    <el-col :span="6">
      <ProjectCard url="/contact"></ProjectCard>
    </el-col>
    <el-col :span="6">
      <ProjectCard url="/contact"></ProjectCard>
    </el-col>
    <el-col :span="6">
      <ProjectCard url="/contact"></ProjectCard>
    </el-col>
    <el-col :span="6">
      <ProjectCard url="/contact"></ProjectCard>
    </el-col>
    <el-col :span="6">
      <ProjectCard url="/contact"></ProjectCard>
    </el-col>
  </el-row> -->
  <router-link to="/">Home</router-link>
  <router-link to="/b8l">B8L</router-link>
  <router-link to="/contact">Contact</router-link>
  <router-view></router-view>
</template>

<script>
// import ProjectCard from '../ui-components/ProjectCard.vue'
export default {
  components: { 
    // ProjectCard
   },
  name: "DemupApp",
  props: {
    msg: String,
  },
}
</script>

<style>
</style>