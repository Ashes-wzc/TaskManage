<template>
  <el-dialog
    title="添加计划"
    v-model="selfVisible"
    width="50%"
    @close="returnVisible(false)"
  >
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="计划名称">
        <el-input v-model="form.scheme.schemeName"></el-input>
      </el-form-item>
      <el-form-item label="负责人工号">
        <el-input v-model="form.headerid"></el-input>
      </el-form-item>
      <el-form-item label="开始日期">
        <el-input v-model="form.scheme.createDate"></el-input>
      </el-form-item>
      <el-form-item label="计划结束日期">
        <el-input v-model="form.scheme.targetDate"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size='mini' type='primary' @click="submitForm">添加</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { addSchemeAPI } from '@/utils/api'
import { currentProjectInfo } from '@/store/store'
import { ref, toRefs, computed } from 'vue'
export default {
  name: 'AddSchemeDialog',
  props: {
    visible: Boolean,
  },
  setup(props, context) {
    const currentProjectId = computed(() => {
      return currentProjectInfo.id
    })
    const { visible } = toRefs(props)
    const selfVisible = ref(visible)
    const returnVisible = (v) => {
      context.emit('setDialogVisible', v)
    }
    return {
      selfVisible,
      returnVisible,
      currentProjectId
    }
  },
  emits: ["setDialogVisible"],
  data() {
    return {
      form: {
        headerid: '001',
        pid: '1',
        scheme: {
          createDate: '2021-12-31 14:00:00',
          isfinished: false,
          schemeName: 'test',
          targetDate: '2022-01-31 14:00:00'
        }
      }
    }
  },
  methods: {
    submitForm() {
      this.form.pid = this.currentProjectId
      console.log(this.form.pid)
      addSchemeAPI(this.form)
      .then(res => {
        console.log(res.data)
        this.returnVisible(false)
      })
      .catch(err => {
        console.log(err.toString())
      })
    }
  }
}
</script>

<style>

</style>
