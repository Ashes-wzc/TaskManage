<template>
  <el-row justify="center" class="margintop">
    <el-col :span="6">
      <el-input placeholder="请输入姓名" v-model="nameinput" clearable></el-input>
    </el-col>
  </el-row>
  <el-row justify="center" class="margintop">
    <el-col :span="6">
      <el-input placeholder="请输入职位" v-model="jobinput" clearable></el-input>
    </el-col>
  </el-row>
  <el-row justify="center" class="margintop">
    <el-col :span="6">
      <el-input placeholder="请输入工号" v-model="numinput" clearable></el-input>
    </el-col>
  </el-row>
  <el-row justify="center" class="margintop">
    <el-col :span="6">
      <el-input placeholder="请输入密码" v-model="passwordinput" show-password></el-input>
    </el-col>
  </el-row>
  <el-row justify="center" class="margintop">
    <el-button type="primary" class="margintop">提交</el-button>
  </el-row>
</template>

<script>
  export default {
    name: "User",
    props: {
      msg: String,
    },
    data() {
      return {
        nameinput: '',
        jobinput: '',
        numinput: '',
        passwordinput: ''
      }
    }
  }
</script>

<style>
  .margintop {
    margin-top: 10px;
  }
</style>