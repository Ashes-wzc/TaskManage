<template>
  <el-container class="task-container">
    <el-header height="60px" class="task-header">
      <h1>项目列表</h1>
    </el-header>
    <el-main class="task-main">
      <el-row class="task-row">
        <el-col :span="6">
          <div class="card_container">
            <ProjectCard url="/projects/b8l/projectinfo" ProjectName="B8L"></ProjectCard>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="card_container">
            <ProjectCard url="/projects/calibration" ProjectName="标定机"></ProjectCard>
          </div>
        </el-col>
      </el-row>
    </el-main>
  </el-container>
</template>

<script>
  import ProjectCard from './../ui-components/ProjectCard.vue'
  export default {
    name: "Task",
    props: {
      msg: String,
    },
    components: {
      ProjectCard
    }
  }
</script>

<style>
  .task-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .task-header {
    background-color: #f7f7f7;
  }
  .task-main {
    flex: 1;
  }
  .task-row {
    margin-top: 10px;
  }
  .card_container {
    display: flex;
    width: 100%;
    height: 100%;
    justify-content: center;
  }
</style>