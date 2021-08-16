<template>
  <el-row>
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
  </el-row>
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