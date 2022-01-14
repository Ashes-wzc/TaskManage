<template>
  <el-dialog v-model="dialogVisible" title="任务添加" width="60%">
    <el-form ref="form" label-width="120px">
      <el-form-item label="任务名称">
        <el-input v-model="task.taskName"></el-input>
      </el-form-item>
      <el-form-item label="负责人工号">
        <el-input v-model="headerid"></el-input>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-input v-model="task.createDate"></el-input>
      </el-form-item>
      <el-form-item label="计划结束时间">
        <el-input v-model="task.targetDate"></el-input>
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
</template>

<script>
import { computed, reactive, toRefs } from 'vue'
import { addTaskAPI } from '@/utils/api'
import { currentSchemeInfo } from '@/store/store'
export default {
  name: 'AddTaskDialog',
  props: {
    visible: Boolean
  },
  emits: ['setDialogVisible'],
  setup(props, context) {
    // 添加任务表单
    const form = reactive({
      headerid: 1,
      participants: [],
      sid: new Number,
      task: {
        createDate: '2022-01-10 14:00:00',
        isfinished: false,
        targetDate: '2022-01-31 14:00:00',
        taskName: 'test',
        taskPricipal: '备注'
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
      ...formAsRefs,
      dialogVisible,
      submitForm
    }
  }
}
</script>