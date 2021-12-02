<template>
  <el-container>
    <el-header height="60px" style="background-color: #f7f7f7;">
      <h1>人员信息管理</h1>
    </el-header>
    <el-table :data="userList" stripe>
      <el-table-column prop="name" label="姓名" align="center"/>
      <el-table-column prop="username" label="工号" align="center"/>
      <el-table-column prop="userType" label="职位" align="center"/>
      <el-table-column prop="updateTime" label="更新时间" align="center"/>
      <el-table-column align="right">
        <template #header>
          <el-button size="mini" type="primary" @click="this.$data.dialog = true">添加</el-button>
        </template>
        <template #default="scope">
          <el-button size="mini" @click="editDialogOpen(scope.$index, scope.row)">修改</el-button>
          <el-button size="mini" type="danger" @click="deleteAccount(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-container>
  <!-- 添加账户弹出框 -->
  <el-dialog
    v-model="dialog"
    title="添加人员"
    width="30%"
    :before-close="dialogClose"
  >
    <el-form ref="form" :model="addForm.user" label-width="80px">
      <el-form-item label="姓名:">
        <el-input v-model="addForm.user.name"></el-input>
      </el-form-item>
      <el-form-item label="工号:">
        <el-input v-model="addForm.user.username"></el-input>
      </el-form-item>
      <el-form-item label="职位:">
        <el-input v-model="addForm.user.userType"></el-input>
      </el-form-item>
      <el-form-item label="密码:">
        <el-input v-model="addForm.user.password"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
        <el-button type="primary" @click="addAccount">提交</el-button>
    </template>
  </el-dialog>
  <!-- 修改账户弹出框 -->
  <el-dialog
    v-model="editDialog"
    title="修改账号"
    width="30%"
    :before-close="editDialogClose"
  >
    <el-form ref="form" :model="editForm.user" label-width="80px">
      <el-form-item label="姓名:">
        <el-input v-model="editForm.user.name"></el-input>
      </el-form-item>
      <el-form-item label="工号:">
        <el-input v-model="editForm.user.username"></el-input>
      </el-form-item>
      <el-form-item label="职位:">
        <el-input v-model="editForm.user.userType"></el-input>
      </el-form-item>
      <el-form-item label="密码:">
        <el-input v-model="editForm.user.password"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button type="primary" @click="modifyAccount">提交</el-button>
    </template>
  </el-dialog>
</template>

<script>
import axios from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
export default {
  name: "UserManage",
  props: {
    msg: String,
  },
  data() {
    return {
      userList: [],
      dialog: false,
      editDialog: false,
      addForm: {
        'user': {
          'name': '',
          'username': '',
          'password': '123456',
          'userType': ''
        }
      },
      editForm: {
        'user': {
          'name': '',
          'username': '',
          'password': '',
          'userType': ''
        }
      }
    }
  },
  mounted() {
    this.getAllUserInfo()
  },
  methods: {
    // 获取全部人员账号信息
    getAllUserInfo() {
      // 添加请求头，后续改为统一封装
      axios.interceptors.request.use(config => {
        config.headers = {
          'Authorization': 'Bearer ' + localStorage.getItem('Bearer')
        }
        return config
      })
      axios.get('api/user/')
      .then((res) => {
        console.log(res)
        let userData = res.data
        userData.shift()
        this.userList = userData
      })
      .catch((error) => {
        ElMessage.error(error.toString())
      })
    },
    // 添加账号
    addAccount() {
      const name = this.addForm.user.name
      const username = this.addForm.user.username
      const password = this.addForm.user.password
      const userType = this.addForm.user.userType
      if (name != null & username != null & password != null & userType != null) {
        // 添加请求头，后续改为统一封装
        axios.interceptors.request.use(config => {
          config.headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('Bearer')
          }
          return config
        })
        axios.post('api/user/', this.addForm.user)
        .then((res) => {
          console.log(res)
          this.dialog = false
        })
        .catch((error) => {
          ElMessage.error(error.toString())
        })
      }
      else {
        ElMessage.error('输入值不能为空！')
      }
    },
    // 删除账号
    deleteAccount(index, row) {
      console.log(index, row.username)
      ElMessageBox.confirm(
        '确定删除该账号吗？',
        '请确认！',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
      .then(() => {
        // 添加请求头，后续改为统一封装
        axios.interceptors.request.use(config => {
          config.headers = {
            'Authorization': 'Bearer ' + localStorage.getItem('Bearer')
          }
          return config
        })
        axios.delete('api/user/' + row.username)
        .then((res) => {
          console.log(res)
          ElMessage({
            message: '删除用户成功',
            type: 'success'
          })
        })
        .catch((error) => {
          ElMessage.error(error.toString())
        })
      })
      .catch(() => {
        ElMessage({
          message: '取消删除账号。'
        })
      })
    },
    // 修改账户信息
    modifyAccount() {
      // 添加请求头，后续改为统一封装
      axios.interceptors.request.use(config => {
        config.headers = {
          'Authorization': 'Bearer ' + localStorage.getItem('Bearer')
        }
        return config
      })
      axios.put('api/user/', this.editForm.user)
      .then((res) => {
        console.log('修改账户：' + res)
        ElMessage({
          message: '修改账号成功',
          type: 'success'
        })
      })
      .catch((error) => {
        ElMessage.error(error.toString())
      })
    },
    dialogClose(){
      ElMessageBox.confirm(
        '确定放弃添加账号吗？',
        '请确认！',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
      .then(() => {
        ElMessage({
          message: '放弃添加账号。'
        })
        this.$data.dialog = false
      })
      .catch(() => {
        ElMessage({
          message: '继续添加账号。'
        })
        this.$data.dialog = true
      })
    },
    editDialogOpen(index, row){
      console.log('editDialogOpen()' + index)
      this.editDialog = true
      this.editForm.user.name = row.name
      this.editForm.user.username = row.username
      this.editForm.user.password = '123456'
      this.editForm.user.userType = row.userType
    },
    editDialogClose() {
      ElMessageBox.confirm(
        '确定放弃修改账号吗？',
        '请确认！',
        {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }
      )
      .then(() => {
        ElMessage({
          message: '放弃修改账号。'
        })
        this.$data.editDialog = false
      })
      .catch(() => {
        ElMessage({
          message: '继续修改账号。'
        })
        this.$data.editDialog = true
      })
    }
  }
}
</script>

<style>
</style>