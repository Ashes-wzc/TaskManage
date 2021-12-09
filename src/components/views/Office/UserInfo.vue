<template>
  <el-container>
    <el-header height="60px" style="background-color: #f7f7f7;">
      <h1>个人信息修改</h1>
    </el-header>
    <el-row justify="center" class="margintop">
      <el-col :span="6">
        <el-input placeholder="请输入姓名" v-model="form.name" clearable disabled></el-input>
      </el-col>
    </el-row>
    <el-row justify="center" class="margintop">
      <el-col :span="6">
        <el-input placeholder="请输入密码" v-model="form.password" show-password></el-input>
      </el-col>
    </el-row>
    <el-row justify="center" class="margintop">
      <el-col :span="6">
        <el-input placeholder="请输入工号" v-model="form.username" disabled></el-input>
      </el-col>
    </el-row>
    <el-row justify="center" class="margintop">
      <el-col :span="6">
        <el-input placeholder="请输入职位" v-model="form.userType" disabled></el-input>
      </el-col>
    </el-row>
    <el-row justify="center" class="margintop">
      <el-button type="primary" @click="renewInfo">提交更新</el-button>
      <el-button type="danger" @click="userLogOut">退出登录</el-button>
    </el-row>
  </el-container>
</template>

<script>
  import axios from 'axios'
  export default {
    name: "User",
    props: {
      msg: String,
    },
    data() {
      return {
        form: {
          name: '',
          userType: '',
          password: '',
          username: ''
        }
      }
    },
    mounted() {
      this.addAxiosHeader()
      this.getUserInfo()
    },
    methods: {
      // 添加请求头，后续改为统一封装
      addAxiosHeader() {
        axios.interceptors.request.use(config => {
          config.headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('Bearer')
          }
          return config
        })
      },
      getUserInfo() {
        axios.get('api/admin/info')
        .then((res) => {
          this.form.name = res.data.name
          this.form.userType = res.data.userType
          this.form.username = res.data.username
        })
        .catch((error) => {
          console.log(error.toString())
        })
      },
      renewInfo() {
        console.log('renew info')
      },
      userLogOut() {
        console.log('user log out')
      }
    }
  }
</script>

<style>
  .margintop {
    margin-top: 10px;
  }
</style>