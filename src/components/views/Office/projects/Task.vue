<template>
  <el-container style="height:100vh">
    <el-header height="60px">
      <el-menu :default-active="$route.path" class="el-menu-demo" mode="horizontal" @select="handleSelect" router>
        <el-menu-item index="/projects/detail">详情</el-menu-item>
        <el-menu-item index="/projects/schedule">日程</el-menu-item>
        <el-menu-item index="/projects/process">进度</el-menu-item>
      </el-menu>
    </el-header>
    <el-main class="project-main">
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>
  export default {
    name: "Task",
    props: {
      msg: String,
    },
    methods: {
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>

<style>
  .project-main {
    flex: 1;
    background-color: #f7f7f7;
  }
</style>