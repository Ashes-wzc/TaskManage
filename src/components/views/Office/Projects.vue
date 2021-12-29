<template>
  <el-container class="project-container">
    <el-header height="60px" class="project-header">
      <el-menu :default-active="$route.path" class="project-menu" mode="horizontal" @select="handleSelect" router>
        <el-menu-item index="/projects/detail">计划总览</el-menu-item>
        <el-menu-item index="/projects/schedule">日程</el-menu-item>
        <el-menu-item index="/projects/process">项目详情</el-menu-item>
        <p style="color:red;">
          项目名:{{ projectName }}, 开始日期:{{ createDate }}, 预期结束日期:{{ targetDate }}
        </p>
      </el-menu>
      <el-button @click="this.$data.projectSelectDrawer = true">项目管理</el-button>
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
    <h1 style="margin-top:0;">项目管理</h1>
    <el-table :data="projects" style="width:100%">
      <el-table-column prop="projectName" label="项目名"></el-table-column>
      <el-table-column align="right">
        <template #header>
          <el-button
            size="mini"
            @click="this.$data.addProjectDialogVisible = true"
          >添加项目</el-button>
        </template>
        <template #default="scope">
          <el-button 
            size="mini"
            @click="projectEnterBtn(scope.$index, scope.row)"
          >进入</el-button>
          <el-button
            size="mini" 
            type="danger" 
            @click="projectDeleteBtn(scope.$index, scope.row)"
          >删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-drawer>
  <el-dialog
    v-model="addProjectDialogVisible"
    title="添加项目"
    width="50%"
  >
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="项目名称">
        <el-input v-model="form.project.projectName"></el-input>
      </el-form-item>
      <el-form-item label="负责人工号">
        <el-input v-model="form.headerid"></el-input>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="form.project.createDate"
          type="datetime"
          placeholder="选择开始时间"
          value-format="YYYY-MM-DD HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="计划结束时间">
        <el-date-picker
          v-model="form.project.targetDate"
          type="datetime"
          placeholder="选择计划结束时间"
          value-format="YYYY-MM-DD HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
    </el-form>
    <template #footer>
        <el-button type="primary" @click="projectAddForm">提交</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import { ElMessage } from 'element-plus'
  import { getAllUserAPI, getAllProjectsAPI, addProjectAPI, deleteProjectAPI } from '@/utils/api'
  export default {
    name: "Projects",
    data() {
      return {
        projects: [],
        projectName: '',
        createDate: '',
        targetDate: '',
        projectSelectDrawer: false, // 项目选择抽屉是否显示
        addProjectDialogVisible: false, // 添加项目表单对话框是否显示
        form: {
          headerid: new Number,
          project: {
            createDate: '',
            isfinished: false,
            projectName: '',
            targetDate: ''
          }
        }
      }
    },
    mounted() {
      this.getAllProjects()
      this.$router.push('/projects/process')
    },
    methods: {
      // 获取全部用户
      getAllUser() {
        getAllUserAPI()
        .then(res => {
          console.log(res.data)
          sessionStorage.setItem('userList', res.data)
        })
        .catch(err => {
          console.log(err.toString())
        })
      },
      getAllProjects() {
        getAllProjectsAPI()
        .then(res => {
          this.$data.projects = res.data
          let sessionStorageIndex = sessionStorage.getItem('currentProjectIndex')
          let currentProjectIndex = sessionStorageIndex == null ? 0 : sessionStorageIndex
          this.$data.projectName = res.data[currentProjectIndex].projectName
          this.$data.createDate = res.data[currentProjectIndex].createDate
          this.$data.targetDate = res.data[currentProjectIndex].targetDate
          console.log('getAllProjectAPI:', res.data)
        })
        .catch(error => {
          ElMessage.error(error.toString())
        })
      },
      handleSelect(key, keyPath) {
        console.log(key, keyPath);
      },
      // 选择项目
      projectEnterBtn(index, row){
        console.log(index, row)
        sessionStorage.setItem('currentProject', row.projectId)
        sessionStorage.setItem('currentProjectIndex', index)
        this.$router.push('/projects/process')
      },
      // 删除项目
      projectDeleteBtn(index, row) {
        // console.log(index, row)
        let pid = {
          pid: row.projectId
        }
        deleteProjectAPI(pid)
        .then(res => {
          console.log(res.data)
          this.getAllProjects()
        })
        .catch(err => {
          console.log(err.toString())
        })
      },
      // 添加项目
      projectAddForm() {
        let postForm = this.form
        addProjectAPI(postForm)
        .then(res => {
          console.log(res.data)
          this.getAllProjects()
          this.addProjectDialogVisible = false
        })
        .catch(error => {
          console.log(error.toString())
        })
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