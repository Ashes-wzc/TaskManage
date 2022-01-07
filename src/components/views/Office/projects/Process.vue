<template>
  <!-- 计划选择下拉框、添加按钮、删除按钮 -->
  <div class="scheme_dashboard">
    <el-select v-model="schemeSelect" @change="schemeChange" style="margin-right: 10px;">
      <el-option
        v-for="(scheme, key) in schemeList"
        :key="key"
        :label="scheme.schemeName"
        :value="key"
      >
      </el-option>
    </el-select>
    <el-button size="mini" type="primary" @click="addSchemeDialogVisible = true">添加</el-button>
    <el-button size="mini" @click="updateSchemeDialogVisible = true">查看</el-button>
  </div>
  <!-- 数据展示表格 -->
  <el-table
    :data="showingScheme"
    style="width: 100%;margin-top:10px;"
    :row-class-name="tableRowClassName"
    max-height="800"
  >
    <el-table-column prop="taskName" label="名称" fixed align="center"></el-table-column>
    <el-table-column prop="taskId" label="编号" align="center"></el-table-column>
    <el-table-column prop="isfinished" label="状态" align="center">
      <template #default="scope">
        <span v-if="scope.row.isfinished">已完成</span>
        <span v-else>未完成</span>
      </template>
    </el-table-column>
    <el-table-column prop="createDate" label="起始时间" align="center"></el-table-column>
    <el-table-column prop="targetDate" label="计划结束时间" align="center"></el-table-column>
    <el-table-column prop="headers[0].name" label="负责人" align="center"></el-table-column>
    <el-table-column label="文件" align="center">
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
  <!-- 任务详情侧边弹出抽屉 -->
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
        <el-input v-model="addTaskForm.task.taskName"></el-input>
      </el-form-item>
      <el-form-item label="负责人工号">
        <el-input v-model="addTaskForm.headerid"></el-input>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-input v-model="addTaskForm.task.createDate"></el-input>
      </el-form-item>
      <el-form-item label="计划结束时间">
        <el-input v-model="addTaskForm.task.targetDate"></el-input>
      </el-form-item>
      <el-form-item label="任务描述">
        <el-input v-model="addTaskForm.task.taskPricipal" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button type="primary" @click="submitAddTaskForm">提交</el-button>
      </span>
    </template>
  </el-dialog>
  <!-- 添加计划对话框 -->
  <AddSchemeDialog
    :visible="addSchemeDialogVisible" 
    @setDialogVisible="addSchemeDialogClose($event)"
  />
  <!-- 修改计划对话框 -->
  <UpdateSchemeDialog 
    :visible="updateSchemeDialogVisible"
    :schemeData="showingSchemeInfo"
    @setDialogVisible="updateSchemeDialogClose($event)"
  />
</template>

<script>
  import { ref, computed, onMounted, watch } from 'vue'
  import { currentProjectInfo } from '@/store/store'
  import { getSchemeAPI, addTaskAPI, deleteTaskAPI } from '@/utils/api'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import TaskModifyDrawer from '@/components/ui-components/TaskModifyDrawer.vue'
  import AddSchemeDialog from '@/components/ui-components/scheme/AddScheme.vue'
  import UpdateSchemeDialog from '@/components/ui-components/scheme/UpdateScheme.vue'
  export default {
    name: "Process",
    components: {
      TaskModifyDrawer,
      AddSchemeDialog,
      UpdateSchemeDialog
    },
    setup() {
      // 当前展示的项目id
      const currentProjectId = computed(() => {
        return currentProjectInfo.id
      })
      const schemeList = ref([]) // 当前展示项目的计划数据列表
      const schemeSelect = ref(0) // 选中的计划index
      const showingScheme = ref([]) // 当前展示的计划
      const showingSchemeInfo = ref([]) // 当前展示的计划的数据
      const addSchemeDialogVisible = ref(false) // 添加计划对话框是否显示
      const updateSchemeDialogVisible = ref(false) // 修改计划对话框是否显示
      // 访问API获取项目里的全部计划信息
      const getAllScheme = () => {
        // schemeList.value = []
        getSchemeAPI(currentProjectId.value)
        .then((res) => {
          console.log(res.data.length, res.data)
          if (res.data.length > 0) {
            schemeList.value = res.data
            showingScheme.value = res.data[0].tasks
            showingSchemeInfo.value = res.data[0]
          }
          else {
            schemeList.value = []
            showingScheme.value = []
            showingSchemeInfo.value = []
          }
        })
        .catch((err) => {
          console.log(err.toString())
        })
      }
      // 切换显示的计划
      const schemeChange = () => {
        console.log(schemeSelect.value, schemeList.value)
        showingScheme.value = schemeList.value.length > 0 ? schemeList.value[schemeSelect.value].tasks : []
        showingSchemeInfo.value = schemeList.value.length > 0 ? schemeList.value[schemeSelect.value] : []
      }
      onMounted(getAllScheme)
      watch(currentProjectId, getAllScheme)
      return {
        schemeList,
        schemeSelect,
        showingScheme,
        showingSchemeInfo,
        addSchemeDialogVisible,
        updateSchemeDialogVisible,
        currentProjectId,
        getAllScheme,
        schemeChange
      }
    },
    data() {
      return {
        drawer: false,
        dialog: false,
        addTaskForm: {
          headerid: '001',
          participants: [],
          sid: '',
          task: {
            createDate: '2021-12-31 14:00:00',
            isfinished: false,
            targetDate: '2021-12-31 14:00:00',
            taskName: '测试',
            taskPricipal: '写点备注'
          }
        }
      }
    },
    methods: {
      // 数据表格按完成情况显示不同的颜色
      tableRowClassName({ row }) {
        if (row.isfinished == false) {
          return 'warning-row'
        } else {
          return 'success-row'
        }
      },
      // 添加任务表单发送
      submitAddTaskForm() {
        this.addTaskForm.sid = this.showingSchemeInfo.schemeId
        addTaskAPI(this.addTaskForm)
        .then(res => {
          console.log(res.data)
          this.getAllScheme()
          this.dialog = false
        })
        .catch(err => {
          console.log(err.toString())
        })
      },
      // 删除任务
      deleteTask(row) {
        const tid = {
          tid: row.taskId
        }
        deleteTaskAPI(tid)
        .then(res => {
          console.log(res.data)
          this.getAllScheme()
        })
        .catch(err => {
          console.log(err.toString())
        })
        // ElMessageBox.confirm(
        //   '确定删除此任务吗？',
        //   '请确认!',
        //   {
        //     confirmButtonText: '确定',
        //     cancelButtonText: '取消',
        //     type: 'warning',
        //   }
        // )
        // .then(() => {
        //   ElMessage({
        //     type: 'success',
        //     message: '删除任务成功!'
        //   })
        // })
        // .catch(() => {
        //   ElMessage({
        //     type: 'info',
        //     message: '取消删除任务。'
        //   })
        // })
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
      },
      addSchemeDialogClose(event) {
        this.addSchemeDialogVisible = event
        this.getAllScheme()
      },
      updateSchemeDialogClose(event) {
        this.updateSchemeDialogVisible = event
        this.getAllScheme()
      }
    },
  }
</script>

<style>
  .scheme_dashboard {
    display: flex;
    flex-direction: row;
  }
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