<template>
  <el-container class="project-container">
    <el-header height="60px" class="project-header">
      <el-menu :default-active="$route.path" class="project-menu" mode="horizontal" @select="handleSelect" router>
        <el-menu-item index="/projects/detail">详情</el-menu-item>
        <el-menu-item index="/projects/schedule">日程</el-menu-item>
        <el-menu-item index="/projects/process">进度</el-menu-item>
        <p style="color:red;">
          项目名:{{ projectName }}, 开始日期:{{ createDate }}, 预期结束日期:{{ targetDate }}
        </p>
      </el-menu>
      <el-button @click="projectSelect">
        项目选择
      </el-button>
    </el-header>
    <el-main class="project-main">
      <router-view></router-view>
    </el-main>
  </el-container>
  <el-drawer
    v-model="projectSelectDrawer"
    size="20%"
    :with-header="false"
  >
    <h1 style="margin-top:0;">项目选择</h1>
    <el-menu>
      <el-menu-item style="padding:0;">B8L</el-menu-item>
    </el-menu>
  </el-drawer>
</template>

<script>
  import { ElMessage } from 'element-plus'
  import { getAllProjectsAPI } from './../../../utils/api'
  export default {
    name: "Projects",
    data() {
      return {
        projectName: '',
        createDate: '',
        targetDate: '',
        projectSelectDrawer: false
      }
    },
    mounted() {
      this.getAllProjects()
      this.$router.push('/projects/process')
    },
    methods: {
      getAllProjects() {
        getAllProjectsAPI()
        .then(res => {
          this.$data.projectName = res.data[0].projectName
          this.$data.createDate = res.data[0].createDate
          this.$data.targetDate = res.data[0].targetDate
        })
        .catch((error) => {
          ElMessage.error(error.toString())
        })
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      projectSelect(){
        this.projectSelectDrawer = true
      }
    }
  }
</script>

<style>
  .project-container {
    display: flex;
    flex-direction: column;
    height: 100vh;
  }
  .project-header {
    display: flex;
    flex-direction: row;
    background-color: #f7f7f7;
    padding: 0;
  }
  .project-menu {
    flex: 1
  }
  .project-main {
    flex: 1;
    background-color: #f7f7f7;
  }
</style>