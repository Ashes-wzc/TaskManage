<template>
  <el-dialog v-model="dialogVisible" title="任务管理" width="60%">
    <el-form ref="form" label-width="120px">
      <el-form-item label="任务名称">
        <el-input v-model="task.taskName"></el-input>
      </el-form-item>
      <el-form-item label="负责人">
        <span style="margin-right:20px">{{ leaderText }}</span>
        <el-button type="primary" size="mini" @click="leaderSelectDialogVisible = true">选择</el-button>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="task.createDate"
          type="datetime"
          placeholder="选择开始时间"
          value-format="YYYY-MM-DD HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="计划结束时间">
        <el-date-picker
          v-model="task.targetDate"
          type="datetime"
          placeholder="选择计划结束时间"
          value-format="YYYY-MM-DD HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="任务描述">
        <el-input v-model="task.taskPricipal" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size='mini' type='primary' @click="submitForm">修改</el-button>
    </template>
  </el-dialog>
  <LeaderSelectDialog 
    :visible="leaderSelectDialogVisible"
    @setDialogVisible="LeaderSelectDialogClose($event)"
    @returnUserInfo="getLeaderInfo($event)"
  />
</template>

<script>
import { ref, computed, reactive, toRefs, watch } from 'vue'
import { updateTaskAPI } from '@/utils/api'
import LeaderSelectDialog from '@/components/ui-components/LeaderSelectDialog.vue'
export default {
  name: 'UpdateTaskDialog',
  props: {
    visible: Boolean,
    data: Object
  },
  components: {
    LeaderSelectDialog
  },
  emits: ['setDialogVisible'],
  setup(props, context) {
    const leaderSelectDialogVisible = ref(false)
    const leaderText = ref('请选择负责人')
    // 更新任务表单
    const form = reactive({
      headerid: new Number,
      participants: [],
      task: {
        createDate: '',
        isfinished: false,
        targetDate: '',
        taskId: new Number,
        taskName: '',
        taskPricipal: '暂无备注'
      }
    })
    const formAsRefs = toRefs(form)
    // 判断对话框是否显示,以及emit函数
    const dialogVisible = computed({
      get: () => {
        return props.visible
      },
      set: visible => {
        context.emit('setDialogVisible', visible)
      }
    })
    const LeaderSelectDialogClose = (event) => {
      leaderSelectDialogVisible.value = event
    }
    const getLeaderInfo = (event) => {
      leaderText.value = event.name
      form.headerid = event.username
    }
    // 提交更新任务表单
    const submitForm = () => {
      updateTaskAPI(form)
      .then(res => {
        console.log('更新任务:', res.data)
        context.emit('setDialogVisible', false)
      })
      .catch(err => {
        console.log(err.toString())
      })
    }
    // 监听dialogVisible,对话框打开时更新文件数据
    watch(dialogVisible, () => {
      if(dialogVisible.value == true) {
        const currentTaskInfo = props.data
        leaderText.value = currentTaskInfo.headers[0].name
        form.headerid = currentTaskInfo.headers[0].id
        form.task.createDate = currentTaskInfo.createDate
        form.task.targetDate = currentTaskInfo.targetDate
        form.task.taskId = currentTaskInfo.taskId
        form.task.taskName = currentTaskInfo.taskName
        form.task.taskPricipal = currentTaskInfo.taskPricipal
      }
    })
    return {
      leaderSelectDialogVisible,
      leaderText,
      ...formAsRefs,
      dialogVisible,
      LeaderSelectDialogClose,
      getLeaderInfo,
      submitForm
    }
  }
}
</script>