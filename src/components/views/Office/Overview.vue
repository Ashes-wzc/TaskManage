<template>
  <el-form ref="form" label-width="120px">
    <el-form-item label="任务名">
      <el-input v-model="task.taskName"></el-input>
    </el-form-item>
    <el-form-item label="任务ID">
      <el-input v-model="task.taskId" disabled></el-input>
    </el-form-item>
    <el-form-item label="开始日期">
      <el-date-picker
        v-model="task.createDate"
        type="datetime"
        placeholder="选择开始时间"
        value-format="YYYY-MM-DD HH:mm:ss"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="目标日期">
      <el-date-picker
        v-model="task.targetDate"
        type="datetime"
        placeholder="选择计划结束时间"
        value-format="YYYY-MM-DD HH:mm:ss"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="结束日期">
      <el-input v-model="taskFinishDate" disabled></el-input>
    </el-form-item>
    <el-form-item label="任务描述">
      <el-input v-model="task.taskPricipal" type="textarea"></el-input>
    </el-form-item>
    <el-form-item label="负责人姓名">
      <span style="margin-right:20px">{{ leaderText }}</span>
      <el-button type="primary" size="mini" @click="leaderSelectDialogVisible = true">选择</el-button>
    </el-form-item>
    <el-form-item label="负责人职位">
      <el-input v-model="leaderTitle" disabled></el-input>
    </el-form-item>
    <el-form-item label="是否完成">
      <el-switch v-model="task.isfinished" active-color="#13ce66" inactive-color="#ff4949" />
    </el-form-item>
  </el-form>
  <el-button type="primary">更新任务信息</el-button>
  <LeaderSelectDialog 
    :visible="leaderSelectDialogVisible"
    @setDialogVisible="LeaderSelectDialogClose($event)"
    @returnUserInfo="getLeaderInfo($event)"
  />
</template>

<script>
import { computed, reactive, watch, toRefs, ref } from 'vue'
import { taskPosition, schemeData } from '@/store/store'
import LeaderSelectDialog from '@/components/ui-components/LeaderSelectDialog.vue'
export default {
  name: 'Overview',
  components: {
    LeaderSelectDialog
  },
  setup() {
    const leaderSelectDialogVisible = ref(false)
    const leaderText = ref('请选择负责人')
    const taskFinishDate = ref('')
    const leaderTitle = ref('')
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
    // 从store中获取当前展示任务的数据
    const storeTaskData = computed(() => {
      return schemeData.list
    })
    const storeTaskPos1 = computed(() => {
      return taskPosition.pos1
    })
    const storeTaskPos2 = computed(() => {
      return taskPosition.pos2
    })
    const LeaderSelectDialogClose = (event) => {
      leaderSelectDialogVisible.value = event
    }
    const getLeaderInfo = (event) => {
      leaderText.value = event.name
      form.headerid = event.username
    }
    watch([storeTaskData, storeTaskPos1, storeTaskPos2], () => {
      console.log(storeTaskData.value[storeTaskPos1.value].tasks[storeTaskPos2.value])
      const taskData = storeTaskData.value[storeTaskPos1.value].tasks[storeTaskPos2.value]
      form.headerid = taskData.headers[0].id
      form.task.createDate = taskData.createDate
      form.task.targetDate = taskData.targetDate
      form.task.taskId = taskData.taskId
      form.task.taskName = taskData.taskName
      form.task.taskPricipal = taskData.taskPricipal
      form.task.isfinished = taskData.isfinished
      taskFinishDate.value = taskData.finishDate == null ? '未完成' : taskData.finishDate
      leaderText.value = taskData.headers[0].name
      leaderTitle.value = taskData.headers[0].userType
    })
    return {
      leaderSelectDialogVisible,
      leaderText,
      leaderTitle,
      ...formAsRefs,
      taskFinishDate,
      storeTaskData,
      storeTaskPos1,
      storeTaskPos2,
      LeaderSelectDialogClose,
      getLeaderInfo
    }
  }
}
</script>