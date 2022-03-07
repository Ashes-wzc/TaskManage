<!-- 添加计划 -->
<template>
  <el-form ref="form" label-width="120px">
    <el-form-item label="计划名称">
      <el-input v-model="scheme.schemeName"></el-input>
    </el-form-item>
    <el-form-item label="负责人">
      <span style="margin-right:20px">{{ leaderText }}</span>
      <el-button type="primary" size="mini" @click="leaderSelectDialogVisible = true">选择</el-button>
    </el-form-item>
    <el-form-item label="开始日期">
      <el-date-picker
        v-model="scheme.createDate"
        type="datetime"
        placeholder="选择开始时间"
        value-format="YYYY-MM-DD HH:mm:ss"
      >
      </el-date-picker>
    </el-form-item>
    <el-form-item label="计划结束日期">
      <el-date-picker
        v-model="scheme.targetDate"
        type="datetime"
        placeholder="选择计划结束时间"
        value-format="YYYY-MM-DD HH:mm:ss"
      >
      </el-date-picker>
    </el-form-item>
  </el-form>
  <el-button size='mini' type='primary' @click="submitForm">添加</el-button>
  <LeaderSelectDialog 
    :visible="leaderSelectDialogVisible"
    @setDialogVisible="LeaderSelectDialogClose($event)"
    @returnUserInfo="getLeaderInfo($event)"
  />
</template>

<script>
import { toRefs, reactive, ref } from 'vue'
import { addSchemeAPI } from '@/utils/api'
import LeaderSelectDialog from '@/components/ui-components/LeaderSelectDialog.vue'
export default {
  name: 'AddSchemeDialog',
  props: {
    pid: String
  },
  components: {
    LeaderSelectDialog
  },
  emits: ["setDialogVisible"],
  setup(props, context) {
    const leaderSelectDialogVisible = ref(false)
    const leaderText = ref('请选择负责人')
    // 添加计划表单
    const form = reactive({
      headerid: '',
      pid: '',
      scheme: {
        createDate: '',
        isfinished: false,
        schemeName: '',
        targetDate: ''
      }
    })
    const formAsRefs = toRefs(form)
    // 提交添加计划表单
    const submitForm = () => {
      form.pid = props.pid
      console.log(form)
      addSchemeAPI(form)
      .then(res => {
        console.log('添加计划:', res.data)
        context.emit('setDialogVisible', false)
      })
      .catch(err => {
        console.log(err.toString())
      })
    }
    // 关闭管理员选择对话框
    const LeaderSelectDialogClose = (event) => {
      leaderSelectDialogVisible.value = event
    }
    // 获取计划管理员的信息
    const getLeaderInfo = (event) => {
      leaderText.value = event.name
      form.headerid = event.username
    }
    return {
      leaderSelectDialogVisible,
      leaderText,
      ...formAsRefs,
      submitForm,
      LeaderSelectDialogClose,
      getLeaderInfo
    }
  }
}
</script>
