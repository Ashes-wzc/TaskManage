<!-- 添加计划弹出对话框 -->
<template>
  <el-dialog title="添加计划" v-model="dialogVisible" width="50%">
    <el-form ref="form" label-width="120px">
      <el-form-item label="计划名称">
        <el-input v-model="scheme.schemeName"></el-input>
      </el-form-item>
      <el-form-item label="负责人工号">
        <el-input v-model="headerid"></el-input>
      </el-form-item>
      <el-form-item label="开始日期">
        <el-input v-model="scheme.createDate"></el-input>
      </el-form-item>
      <el-form-item label="计划结束日期">
        <el-input v-model="scheme.targetDate"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size='mini' type='primary' @click="submitForm">添加</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { toRefs, reactive ,computed } from 'vue'
import { addSchemeAPI } from '@/utils/api'
import { currentProjectInfo } from '@/store/store'
export default {
  name: 'AddSchemeDialog',
  props: {
    visible: Boolean,
  },
  emits: ["setDialogVisible"],
  setup(props, context) {
    // 添加计划表单
    const form = reactive({
      headerid: '001',
      pid: '1',
      scheme: {
        createDate: '2021-12-31 14:00:00',
        isfinished: false,
        schemeName: 'test',
        targetDate: '2022-01-31 14:00:00'
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
      ...formAsRefs,
      currentProjectId,
      submitForm,
      dialogVisible
    }
  }
}
</script>

<style>

</style>
