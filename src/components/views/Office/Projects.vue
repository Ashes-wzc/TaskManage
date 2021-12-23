<template>
  <el-container class="project-container">
    <el-header height="60px" class="project-header">
      <el-menu :default-active="$route.path" class="project-menu" mode="horizontal" @select="handleSelect" router>
        <el-menu-item index="/projects/detail">详情</el-menu-item>
        <el-menu-item index="/projects/schedule">日程</el-menu-item>
        <el-menu-item index="/projects/process">进度</el-menu-item>
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
      <el-menu-item style="padding:0;">标定机</el-menu-item>
    </el-menu>
  </el-drawer>
</template>

<script>
  // import axios from 'axios'
  // import { ElMessage } from 'element-plus'
  import { getAllProjectsAPI } from './../../../utils/api'
  export default {
    name: "Projects",
    data() {
      return {
        projectList: [],
        projectSelectDrawer: false
      }
    },
    mounted() {
      // this.addAxiosHeader()
      // this.getProjectList()
      this.testAxios()
      this.$router.push('/projects/schedule')
      // this.$test()
    },
    methods: {
      testAxios() {
        getAllProjectsAPI()
        .then(res => {
          console.log(res.data)
          this.$data.projectList = res.data
        })
      },
      // 添加请求头，后续改为统一封装
      // addAxiosHeader() {
      //   axios.interceptors.request.use(config => {
      //     config.headers = {
      //       'Authorization': 'Bearer ' + sessionStorage.getItem('Bearer')
      //     }
      //     return config
      //   })
      // },
      // getProjectList() {
      //   axios.get('apis' + '/project/getAllProjects')
      //   .then((res) => {
      //     console.log(res.data)
      //     this.$data.projectList = res.data
      //   })
      //   .catch((error) => {
      //     ElMessage.error(error.toString())
      //   })
      // },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      projectSelect(){
        console.log('projectSelect')
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