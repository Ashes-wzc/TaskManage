<template>
  <div class="form_wapper">
    <el-form ref="form" :model="form" label-width="80px" class="form_body">
      <el-form-item label="工号:">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="密码:">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-button type="primary" @click="onSubmit" style="margin-right: 20px">登录</el-button>
      <el-button type="primary" @click="testApi" style="margin-right: 20px">测试Api</el-button>
      <el-checkbox label="记住我" name="cache" v-model="form.isCache"></el-checkbox>
    </el-form>
  </div>
</template>

<script>
  import { ElMessage } from 'element-plus'
  import axios from 'axios'
  let userData = require('./../fakedata/userInfo.json')
  export default {
    name: "Login",
    props: {
      msg: String,
    },
    data() {
      return {
        form: {
          name: '',
          password: '',
          isCache: false
        }
      }
    },
    methods: {
      onSubmit() {
        let userList = userData.userList
        if (userList[0].name == this.$data.form.name) {
          if (userList[0].password == this.$data.form.password) {
            ElMessage.success({
              message: '登录成功！',
              type: 'success',
            })
            this.$router.push('/demup/task')
          }
          else {
            ElMessage.error('密码错误！')
          }
        }
        else {
          ElMessage.error('用户名不存在！')
        }
      },
      testApi() {
        axios.post('/api/login', {
          params: {
            password: this.$data.form.password,
            username: this.$data.form.name
          }
        })
        .then((response) => {
          console.log(response)
        })
        .catch((error) => {
          console.log(error)
        })
      }
    }
  }
</script>

<style>
  .form_wapper {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #fffffb;
  }
  .form_body {
    width: 360px;
    height: 150px;
    padding: 60px 36px 60px 36px;
    border-radius: 12px;
    box-shadow: 0 4px 6px rgb(0 0 0 / 10%), 0 12px 20px rgb(38 38 38 / 12%);
    background-color: #ffffff;
  }
</style>