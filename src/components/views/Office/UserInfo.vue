<template>
  <el-container>
    <el-header height="60px" style="background-color: #f7f7f7;">
      <h1>个人信息修改</h1>
    </el-header>
    <el-row justify="center" class="margintop">
      <el-col :span="6">
        <el-input placeholder="请输入姓名" v-model="form.name" clearable></el-input>
      </el-col>
    </el-row>
    <el-row justify="center" class="margintop">
      <el-col :span="6">
        <el-input placeholder="请输入新密码" v-model="form.pass" show-password></el-input>
      </el-col>
    </el-row>
    <el-row justify="center" class="margintop">
      <el-col :span="6">
        <el-input placeholder="请输入旧密码" v-model="form.oldPass" show-password></el-input>
      </el-col>
    </el-row>
    <el-row justify="center" class="margintop">
      <el-col :span="6">
        <el-input placeholder="请输入工号" v-model="userName" disabled></el-input>
      </el-col>
    </el-row>
    <el-row justify="center" class="margintop">
      <el-col :span="6">
        <el-input placeholder="请输入职位" v-model="userType" disabled></el-input>
      </el-col>
    </el-row>
    <el-row justify="center" class="margintop">
      <el-button type="primary" @click="renewInfo">提交更新</el-button>
      <el-button type="danger" @click="userLogOut">退出登录</el-button>
    </el-row>
  </el-container>
</template>

<script>
  import { clearStorage } from '@/store/store'
  import { getUserInfoAPI, logOutAPI, updatePasswordAPI } from '@/utils/api'
  import { ElMessage } from 'element-plus'
  export default {
    name: "User",
    props: {
      msg: String,
    },
    data() {
      return {
        form: {
          pass: '',
          oldPass: '',
          name: ''
        },
        userType: '',
        userName: ''
      }
    },
    mounted() {
      this.getUserInfo()
    },
    methods: {
      // 获取当前用户信息
      getUserInfo() {
        getUserInfoAPI()
        .then((res) => {
          this.form.name = res.data.name
          this.userType = res.data.userType
          this.userName = res.data.username
        })
        .catch((error) => {
          console.log(error.toString())
        })
      },
      // 更新用户信息
      renewInfo() {
        if (this.form.pass.length < 6) {
          ElMessage.error('密码不能小于6位')
        }
        else {
          updatePasswordAPI(this.form)
          .then(res => {
            console.log(res.data)
            if (res.data.code == 200) {
              ElMessage({
                message: res.data.code + '修改成功',
                type: 'success'
              })
            }
            else if (res.data.code == 500) {
              ElMessage.error(res.data.code + res.data.message)
            }
          })
          .catch(err => {
            ElMessage.error(err.toString())
          })
        }
      },
      // 登出当前账号
      userLogOut() {
        logOutAPI()
        .then(res => {
          console.log('登出账号', res)
          localStorage.clear()
          sessionStorage.clear()
          clearStorage()
          this.$router.push('/login')
        })
        .catch(err => {
          console.log(err.toString())
        })
      }
    }
  }
</script>

<style>
  .margintop {
    margin-top: 10px;
  }
</style>