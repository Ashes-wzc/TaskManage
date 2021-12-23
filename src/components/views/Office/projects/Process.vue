<template>
  Process
  <!-- <el-table 
    :data="taskList"
    style="width: 100%"
    :row-class-name="tableRowClassName"
    max-height="800"
  >
    <el-table-column prop="name" label="名称" width="200" fixed></el-table-column>
    <el-table-column prop="id" label="编号" width="150"></el-table-column>
    <el-table-column prop="status" label="状态" width="150"></el-table-column>
    <el-table-column prop="last_modify" label="最近修改" width="150"></el-table-column>
    <el-table-column prop="start" label="起始时间" width="150"></el-table-column>
    <el-table-column prop="end" label="结束时间" width="150"></el-table-column>
    <el-table-column prop="end-time" label="完成时间" width="150"></el-table-column>
    <el-table-column prop="describe" label="描述" width="800"></el-table-column>
    <el-table-column align="right" fixed="right" width="150">
      <template #header>
        <el-button size="mini" type="primary" @click="dialog = true">添加</el-button>
      </template>
      <template #default>
        <el-button size="mini" @click="modifyTask">查看</el-button>
        <el-button size="mini" type="danger" @click="deleteTask">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-drawer v-model="drawer" title="任务详情" :direction="rtl" :before-close="drawerClose" :with-header="false">
    <div class="taskDrawer">
      <TaskModifyDrawer :drawerVisible="drawer" @changeDrawerVisible="drawerVisible" />
    </div>
  </el-drawer>
  <el-dialog
    v-model="dialog"
    title="添加任务"
    width="50%"
    :before-close="dialogClose"
  >
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="任务名称">
        <el-input v-model="form.name"></el-input>
      </el-form-item>
      <el-form-item label="任务编号">
        <el-input v-model="form.id"></el-input>
      </el-form-item>
      <el-form-item label="起止时间">
        <el-date-picker
          style="width:100%"
          v-model="form.dateRange"
          type="daterange"
          unlink-panels
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="任务描述">
        <el-input v-model="form.desc" type="textarea"></el-input>
      </el-form-item>
      <el-form-item label="项目完成">
        <el-switch v-model="form.status" inline-prompt active-text="是" inactive-text="否"></el-switch>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialog=false">提交</el-button>
      </span>
    </template>
  </el-dialog> -->
</template>

<script>
  // import { ElMessage, ElMessageBox } from 'element-plus'
  // import TaskModifyDrawer from '../../../ui-components/TaskModifyDrawer.vue'
  // let tasklist = require('./../fakedata/taskInfo.json')
  // let modifyData = tasklist.taskList
  // for (let i = 0; i < modifyData.length; i++) {
  //   switch (modifyData[i].status) {
  //     case 0:
  //       modifyData[i].status = '已超时'
  //       break;
  //     case 1:
  //       modifyData[i].status = '已完成'
  //       break;
  //     case 2:
  //       modifyData[i].status = '进行中'
  //       break;
  //     default:
  //       break;
  //   }
  // }
  export default {
    name: "Process",
    props: {
      msg: String,
    },
    components: {
      // TaskModifyDrawer,
    },
    data() {
      return {
        // taskList: modifyData,
        drawer: false,
        dialog: false,
        tableHeight: 300,
        form: {
          name: '',
          id: '',
          dateRange: '',
          desc: '',
          status: '',
        }
      };
    },
    // methods: {
    //   tableRowClassName({ row }) {
    //     if (row.status === '已超时') {
    //       return 'warning-row'
    //     } else if (row.status === '已完成') {
    //       return 'success-row'
    //     } else if (row.status === '进行中') {
    //       return 'doing-row'
    //     }
    //     return ''
    //   },
    //   deleteTask() {
    //     ElMessageBox.confirm(
    //       '确定删除此任务吗？',
    //       '请确认!',
    //       {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'warning',
    //       }
    //     )
    //     .then(() => {
    //       ElMessage({
    //         type: 'success',
    //         message: '删除任务成功!'
    //       })
    //     })
    //     .catch(() => {
    //       ElMessage({
    //         type: 'info',
    //         message: '取消删除任务。'
    //       })
    //     })
    //   },
    //   modifyTask() {
    //     this.$data.drawer = true
    //   },
    //   drawerClose() {
    //     ElMessageBox.confirm(
    //       '确定放弃修改任务吗？',
    //       '请确认!',
    //       {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'warning',
    //       }
    //     )
    //     .then(() => {
    //       ElMessage({
    //         type: 'success',
    //         message: '放弃修改任务!'
    //       })
    //       this.$data.drawer = false
    //     })
    //     .catch(() => {
    //       ElMessage({
    //         type: 'info',
    //         message: '继续修改任务。'
    //       })
    //       this.$data.drawer = true
    //     })
    //   },
    //   drawerVisible(visibleParams) {
    //     this.$data.drawer = visibleParams
    //   },
    //   dialogClose(){
    //     ElMessageBox.confirm(
    //       '确定放弃添加任务吗？',
    //       '请确认!',
    //       {
    //         confirmButtonText: '确定',
    //         cancelButtonText: '取消',
    //         type: 'warning',
    //       }
    //     )
    //     .then(() => {
    //       ElMessage({
    //         type: 'success',
    //         message: '放弃添加任务!'
    //       })
    //       this.$data.dialog = false
    //     })
    //     .catch(() => {
    //       ElMessage({
    //         type: 'info',
    //         message: '继续添加任务。'
    //       })
    //       this.$data.dialog = true
    //     })
    //   }
    // },
  }
</script>

<style>
  .el-table .warning-row {
    --el-table-tr-background-color: var(--el-color-warning-lighter);
  }
  .el-table .success-row {
    --el-table-tr-background-color: var(--el-color-success-lighter);
  }
  .el-table .doing-row {
    --el-table-tr-background-color: #E1FFFF
  }
  .taskDrawer {
    display: flex;
    text-align: left;
  }
  .el-drawer__header {
    margin-bottom: 0;
  }
</style>