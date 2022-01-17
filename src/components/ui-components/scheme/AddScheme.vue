<!-- 添加计划弹出对话框 -->
<template>
  <el-dialog title="添加计划" v-model="dialogVisible" width="50%">
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
    <template #footer>
      <el-button size='mini' type='primary' @click="submitForm">添加</el-button>
    </template>
  </el-dialog>
  <LeaderSelectDialog 
    :visible="leaderSelectDialogVisible"
    @setDialogVisible="LeaderSelectDialogClose($event)"
    @returnUserInfo="getLeaderInfo($event)"
  />
</template>

<script>
import { toRefs, reactive ,computed, ref } from 'vue'
import { addSchemeAPI } from '@/utils/api'
import { currentProjectInfo } from '@/store/store'
import LeaderSelectDialog from '@/components/ui-components/LeaderSelectDialog.vue'
export default {
  name: 'AddSchemeDialog',
  props: {
    visible: Boolean,
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
    // 添加此计划的项目id
    const currentProjectId = computed(() => {
      return currentProjectInfo.id
    })
    // 提交表单
    const submitForm = () => {
      form.pid = currentProjectId
      addSchemeAPI(form)
      .then(res => {
        console.log('添加计划:', res.data)
        context.emit('setDialogVisible', false)
      })
      .catch(err => {
        console.log(err.toString())
      })
    }
    const LeaderSelectDialogClose = (event) => {
      leaderSelectDialogVisible.value = event
    }
    const getLeaderInfo = (event) => {
      leaderText.value = event.name
      form.headerid = event.username
    }
    // 判断对话框是否显示,以及emit函数
    const dialogVisible = computed({
      get: () => {
        return props.visible
      },
      set: (visible) => {
        context.emit('setDialogVisible', visible)
      }
    })
    return {
      leaderSelectDialogVisible,
      leaderText,
      ...formAsRefs,
      currentProjectId,
      submitForm,
      LeaderSelectDialogClose,
      getLeaderInfo,
      dialogVisible
    }
  }
}
</script>
