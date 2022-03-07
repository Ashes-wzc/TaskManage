<template>
  <el-dialog v-model="dialogVisible" title="任务添加" width="60%">
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
      <span class="dialog-footer">
        <el-button type="primary" @click="submitForm">提交</el-button>
      </span>
    </template>
  </el-dialog>
  <LeaderSelectDialog 
    :visible="leaderSelectDialogVisible"
    @setDialogVisible="LeaderSelectDialogClose($event)"
    @returnUserInfo="getLeaderInfo($event)"
  />
</template>

<script>
import { ref, computed, reactive, toRefs } from 'vue'
import { addTaskAPI } from '@/utils/api'
import { currentSchemeInfo } from '@/store/store'
import LeaderSelectDialog from '@/components/ui-components/LeaderSelectDialog.vue'
export default {
  name: 'AddTaskDialog',
  props: {
    visible: Boolean
  },
  components: {
    LeaderSelectDialog
  },
  emits: ['setDialogVisible'],
  setup(props, context) {
    const leaderSelectDialogVisible = ref(false)
    const leaderText = ref('请选择负责人')
    // 添加任务表单
    const form = reactive({
      headerid: new Number,
      participants: [],
      sid: new Number,
      task: {
        createDate: '',
        isfinished: false,
        targetDate: '',
        taskName: '',
        taskPricipal: '暂无备注'
      }
    })
    const formAsRefs = toRefs(form)
    // 从store中读取当前计划sid
    const schemeId = computed(() => {
      return currentSchemeInfo.showingList.schemeId
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
    const LeaderSelectDialogClose = (event) => {
      leaderSelectDialogVisible.value = event
    }
    const getLeaderInfo = (event) => {
      leaderText.value = event.name
      form.headerid = event.username
    }
    // 提交添加任务表单
    const submitForm = () => {
      form.sid = schemeId
      console.log(form.sid)
      addTaskAPI(form)
      .then(res => {
        console.log('添加任务:', res.data)
        context.emit('setDialogVisible', false)
      })
      .catch(err => {
        console.log(err.toString())
      })
    }
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
