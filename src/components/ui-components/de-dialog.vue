<template>
  <el-dialog v-model="dialogVisible" title="项目管理" width="30%">
    <el-tabs
      v-model="tabsId"
    >
      <el-tab-pane label="项目管理" name="manageProject">
        <UpdateProject />
      </el-tab-pane>
      <el-tab-pane label="计划管理" name="manageScheme">
        <UpdateScheme :pid="projectId.toString()" @setDialogVisible="dialogClose($event)" />
      </el-tab-pane>
      <el-tab-pane label="新建项目" name="project">
        <AddProject />
      </el-tab-pane>
      <el-tab-pane label="新建计划" name="scheme">
        <AddScheme :pid="projectId.toString()" @setDialogVisible="dialogClose($event)" />
      </el-tab-pane>
      <el-tab-pane label="新建任务" name="task">
        <AddTask :pid="projectId.toString()" @setDialogVisible="dialogClose($event)" />
      </el-tab-pane>
    </el-tabs>
  </el-dialog>
</template>

<script>
import { computed, ref, watch } from 'vue'
import AddScheme from '@/components/ui-components/AddScheme'
import AddTask from '@/components/ui-components/AddTask'
import AddProject from '@/components/ui-components/AddProject'
import UpdateProject from '@/components/ui-components/UpdateProject'
import UpdateScheme from '@/components/ui-components/UpdateScheme'
// import {  } from '@/utils/api'
export default {
  name: 'DeDialog',
  props: {
    visible: Boolean,
    pid: Number
  },
  components: {
    AddScheme,
    AddTask,
    AddProject,
    UpdateProject,
    UpdateScheme
  },
  emits: ['setDialogVisible'],
  setup(props, context) {
    const tabsId = ref('manageScheme')
    const projectId = computed(() => {
      return props.pid
    })
    // 判断对话框是否显示,以及emit函数
    const dialogVisible = computed({
      get: () => {
        return props.visible
      },
      set: visible => {
        context.emit('setDialogVisible', visible)
      }
    })
    const dialogClose = (event) => {
      context.emit('setDialogVisible', event)
    }
    // 监听dialogVisible,对话框打开时更新文件数据
    watch(dialogVisible, () => {
      if(dialogVisible.value == true) {
        console.log('项目管理对话框打开!')
      }
    })
    return {
      // variable
      tabsId,
      projectId,
      dialogVisible,
      // function
      dialogClose
    }
  }
}
</script>
