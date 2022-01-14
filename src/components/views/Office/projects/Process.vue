<!-- 项目详情页面 -->
<template>
  <!-- 计划选择下拉框、添加按钮、删除按钮 -->
  <div style="display:flex;flex-direction:row;">
    <el-select v-model="currentSchemeIndex" @change="schemeChange" style="margin-right: 10px;">
      <el-option v-for="(scheme, key) in optionListData" :key="key" :label="scheme.schemeName" :value="key" />
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
        <el-button size="mini" type="primary">上传</el-button>
        <el-button size="mini" @click="fileDialogVisible = true">查看</el-button>
      </template>
    </el-table-column>
    <el-table-column align="right" fixed="right" width="150">
      <template #header>
        <el-button size="mini" type="primary" @click="addTaskDialogVisible = true">添加</el-button>
      </template>
      <template #default="scope">
        <el-button size="mini" @click="modifyTask(scope.row)">修改</el-button>
        <el-button size="mini" type="danger" @click="deleteTask(scope.row)">删除</el-button>
      </template>
    </el-table-column>
  </el-table>
  <!-- 添加计划对话框 -->
  <AddSchemeDialog
    :visible="addSchemeDialogVisible"
    @setDialogVisible="addSchemeDialogClose($event)"
  />
  <!-- 修改计划对话框 -->
  <UpdateSchemeDialog
    :visible="updateSchemeDialogVisible"
    @setDialogVisible="updateSchemeDialogClose($event)"
  />
  <!-- 添加任务对话框 -->
  <AddTaskDialog
    :visible="addTaskDialogVisible"
    @setDialogVisible="addTaskDialogClose($event)"
  />
  <!-- 任务详情侧边弹出抽屉 -->
  <!-- <el-drawer v-model="drawer" title="任务详情" :before-close="drawerClose" :with-header="false">
    <div class="taskDrawer">
      <TaskModifyDrawer :drawerVisible=drawer @changeDrawerVisible=drawerVisible />
    </div>
  </el-drawer> -->
  <!-- 查看文件对话框 -->
  <!-- <FileDialog :visible="fileDialogVisible" @setDialogVisible="fileDialogClose($event)"/> -->
</template>

<script>
  import { ref, computed, onMounted, watch } from 'vue'
  import { getSchemeAPI, deleteTaskAPI } from '@/utils/api'
  import { currentProjectInfo, currentSchemeInfo, updateScheme, updateSchemeIndex } from '@/store/store'
  import { ElMessage, ElMessageBox } from 'element-plus'
  import AddSchemeDialog from '@/components/ui-components/scheme/AddScheme.vue'
  import UpdateSchemeDialog from '@/components/ui-components/scheme/UpdateScheme.vue'
  import AddTaskDialog from '@/components/ui-components/task/AddTaskDialog.vue'
  // import TaskModifyDrawer from '@/components/ui-components/TaskModifyDrawer.vue'
  // import FileDialog from '@/components/ui-components/FileDialog.vue'
  export default {
    name: "Process",
    components: {
      AddSchemeDialog,
      UpdateSchemeDialog,
      AddTaskDialog,
      // TaskModifyDrawer,
      // FileDialog
    },
    setup() {
      // 当前展示的项目id
      const currentProjectId = computed(() => {
        return currentProjectInfo.id
      })
      // 当前项目包含的全部计划数据以及当前显示的计划index
      const currentScheme = computed(() => {
        return {
          index: currentSchemeInfo.index,
          list: currentSchemeInfo.list,
          showingList: currentSchemeInfo.showingList
        }
      })

      const showingScheme = ref([]) // 当前显示的计划
      const currentSchemeIndex = ref(currentScheme.value.index) // 当前展示计划的index
      const optionListData = ref([]) // 计划选择下拉框数据
      const addSchemeDialogVisible = ref(false) // 添加计划对话框是否显示
      const updateSchemeDialogVisible = ref(false) // 修改计划对话框是否显示
      const addTaskDialogVisible = ref(false) // 添加任务对话框是否显示
      const fileDialogVisible = ref(false) // 文件对话框是否显示

      // 访问API获取项目里的全部计划信息,并写入store
      const getAllScheme = () => {
        getSchemeAPI(currentProjectId.value)
        .then((res) => {
          if(res.data.length > 0) {
            // console.log(res.data)
            updateScheme(res.data) // 将请求到的计划数据写入store
            const currentSid = currentSchemeInfo.index == 0 ? 0 : currentSchemeInfo.index
            updateSchemeIndex(currentSid) // 更新store中的计划sid
            showingScheme.value = currentSchemeInfo.showingList.tasks
            optionListData.value = currentSchemeInfo.list
          }
        })
        .catch((err) => {
          console.log(err.toString())
        })
      }
      // 切换显示的计划
      const schemeChange = () => {
        updateSchemeIndex(currentSchemeIndex.value)
      }
      // 添加计划对话框关闭emit函数
      const addSchemeDialogClose = (event) => {
        addSchemeDialogVisible.value = event
        getAllScheme()
      }
      // 更新计划对话框关闭emit函数
      const updateSchemeDialogClose = (event) => {
        updateSchemeDialogVisible.value = event
        getAllScheme()
      }
      // 添加任务对话框关闭emit函数
      const addTaskDialogClose = (event) => {
        addTaskDialogVisible.value = event
        getAllScheme()
      }
      // 文件对话框关闭emit函数
      const fileDialogClose = (event) => {
        fileDialogVisible.value = event
      }

      watch(currentProjectId, () => {
        getAllScheme()
      })
      watch(currentSchemeIndex, () => {
        showingScheme.value = currentScheme.value.showingList.tasks
        optionListData.value = currentScheme.value.list
      },{
        immediate: true
      })
      onMounted(getAllScheme)
      return {
        // variable
        showingScheme,
        currentSchemeIndex,
        optionListData,
        addSchemeDialogVisible,
        updateSchemeDialogVisible,
        addTaskDialogVisible,
        fileDialogVisible,
        currentProjectId,
        currentScheme,
        // function
        getAllScheme,
        schemeChange,
        addSchemeDialogClose,
        updateSchemeDialogClose,
        addTaskDialogClose,
        fileDialogClose
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