<template>
  <div class="form_wapper">
    <el-form ref="form" :model="form" label-width="80px" class="form_body">
      <el-form-item label="工号:">
        <el-input v-model="form.username"></el-input>
      </el-form-item>
      <el-form-item label="密码:">
        <el-input v-model="form.password" show-password></el-input>
      </el-form-item>
      <el-button
        type="primary"
        style="margin-right: 20px"
        :loading = loading
        @click="onSubmit('/login')"
      >
        登录
      </el-button>
      <el-checkbox label="记住我" name="cache" v-model="isCache"></el-checkbox>
    </el-form>
  </div>
</template>

<script>
  import { ElMessage } from 'element-plus'
  import axios from 'axios'
  export default {
    name: "Login",
    props: {
      msg: String,
    },
    data() {
      return {
        form: {
          'username': '',
          'password': ''
        },
        isCache: false,
        loading: false
      }
    },
    methods: {
      onSubmit(url) {
        this.loading = true
        axios.post('api'+url, this.form)
        .then((response) => {
          if (response.data.code == 200) {
            ElMessage.success({
              message: response.data.message,
              type: 'success',
            })
            if (this.isCache == true) {
              localStorage.setItem('Bearer', response.data.obj.token)
            }
            else {
              sessionStorage.setItem('Bearer', response.data.obj.token)
            }
            this.$router.push('/demup/task')
          }
          else if (response.data.code == 500) {
            ElMessage.error(response.data.message)
          }
        })
        .catch((error) => {
          console.log(error)
          ElMessage.error(error.toString())
        })
        this.loading = false
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
    text-align: center;
  }
</style>