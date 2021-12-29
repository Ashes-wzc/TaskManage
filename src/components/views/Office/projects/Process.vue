<template>
  <!-- 计划选择下拉框 -->
  <el-select v-model="schemeSelect" placeholder="选择计划" @change="schemeChange">
    <el-option
      v-for="(scheme, key) in schemeList"
      :key="key"
      :label="scheme.schemeName"
      :value="scheme.schemeId"
    >
    </el-option>
  </el-select>
  <!-- 数据展示表格 -->
  <el-table
    :data="showingScheme"
    style="width: 100%"
    :row-class-name="tableRowClassName"
    max-height="800"
  >
    <el-table-column prop="taskName" label="名称" width="200" fixed></el-table-column>
    <el-table-column prop="taskId" label="编号"></el-table-column>
    <el-table-column prop="isfinished" label="状态">
      <template #default="scope">
        <span v-if="scope.row.isfinished">已完成</span>
        <span v-else>未完成</span>
      </template>
    </el-table-column>
    <el-table-column prop="createDate" label="起始时间"></el-table-column>
    <el-table-column prop="targetDate" label="计划结束时间"></el-table-column>
    <el-table-column prop="headers[0].name" label="负责人"></el-table-column>
    <el-table-column label="文件">
      <template #default>
        <el-button size="mini">上传</el-button>
        <el-button size="mini">查看</el-button>
      </template>
    </el-table-column>
    <el-table-column align="right" fixed="right" width="150">
      <template #header>
        <el-button size="mini" type="primary" @click="dialog = true">添加</el-button>
      </template>
      <template #default="scope">
        <el-button size="mini" @click="modifyTask(scope.row)">修改</el-button>
        <el-button size="mini" type="danger" @click="deleteTask(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-drawer v-model="drawer" title="任务详情" :before-close="drawerClose" :with-header="false">
    <div class="taskDrawer">
      <TaskModifyDrawer :drawerVisible=drawer @changeDrawerVisible=drawerVisible />
    </div>
  </el-drawer>
  <!-- 添加任务对话框 -->
  <el-dialog
    v-model="dialog"
    title="添加任务"
    width="50%"
    :before-close="dialogClose"
  >
    <el-form ref="form" :model="addTaskForm" label-width="120px">
      <el-form-item label="任务名称">
        <el-input v-model="addTaskForm.name"></el-input>
      </el-form-item>
      <el-form-item label="任务编号">
        <el-input v-model="addTaskForm.id"></el-input>
      </el-form-item>
      <el-form-item label="任务描述">
        <el-input v-model="addTaskForm.desc" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="dialog=false">提交</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script>
  import { getSchemeAPI } from '@/utils/api'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import TaskModifyDrawer from '@/components/ui-components/TaskModifyDrawer.vue'
  export default {
    name: "Process",
    components: {
      TaskModifyDrawer,
    },
    data() {
      return {
        schemeList: [],
        schemeSelect: new Number,
        showingScheme: [],
        drawer: false,
        dialog: false,
        addTaskForm: {
          headerid: new Number,
          participants: [],
          sid: new Number,
          task: {
            createDate: '',
            isfinished: false,
            targetDate: '',
            taskName: '',
            taskPricipal: ''
          }
        }
      }
    },
    mounted() {
      this.getScheme()
      // this.schemeChange()
    },
    methods: {
      // 获取全部的计划数据
      getScheme() {
        let currentProject = sessionStorage.getItem('currentProject')
        let currentProjectId = currentProject == null ? 1 : currentProject
        getSchemeAPI(currentProjectId)
        .then((res) => {
          this.schemeList = res.data
          console.log(this.schemeList)
          this.showingScheme = this.schemeList[0].tasks
          this.schemeSelect = 1
          this.addTaskForm.sid = this.schemeList[this.schemeSelect - 1].sid
        })
        .catch((err) => {
          console.log(err.toString())
        })
      },
      // 切换显示的计划
      schemeChange() {
        this.showingScheme = this.schemeList[this.schemeSelect - 1].tasks
        this.addTaskForm.sid = this.schemeList[this.schemeSelect - 1].sid
      },
      // 数据表格按完成情况显示不同的颜色
      tableRowClassName({ row }) {
        if (row.isfinished == false) {
          return 'warning-row'
        } else {
          return 'success-row'
        }
      },
      // 删除任务
      deleteTask(row) {
        console.log(row)
        ElMessageBox.confirm(
          '确定删除此任务吗？',
          '请确认!',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
        )
        .then(() => {
          ElMessage({
            type: 'success',
            message: '删除任务成功!'
          })
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '取消删除任务。'
          })
        })
      },
      // 弹出修改任务侧边抽屉
      modifyTask(row) {
        this.$data.drawer = true
        console.log(row)
      },
      drawerClose() {
        ElMessageBox.confirm(
          '确定放弃修改任务吗？',
          '请确认!',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
        )
        .then(() => {
          ElMessage({
            type: 'success',
            message: '放弃修改任务!'
          })
          this.$data.drawer = false
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '继续修改任务。'
          })
          this.$data.drawer = true
        })
      },
      drawerVisible(visibleParams) {
        this.$data.drawer = visibleParams
      },
      dialogClose(){
        ElMessageBox.confirm(
          '确定放弃添加任务吗？',
          '请确认!',
          {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          }
        )
        .then(() => {
          ElMessage({
            type: 'success',
            message: '放弃添加任务!'
          })
          this.$data.dialog = false
        })
        .catch(() => {
          ElMessage({
            type: 'info',
            message: '继续添加任务。'
          })
          this.$data.dialog = true
        })
      }
    },
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