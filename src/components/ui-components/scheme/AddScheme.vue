<template>
  <el-dialog
    title="添加计划"
    v-model="this.$props.visible"
    width="50%"
    @close="dialogClose(false)"
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
      <el-button size='mini' type='primary'>添加</el-button>
    </template>
  </el-dialog>
</template>

<script>
// import { addSchemeAPI } from '@/utils/api'
export default {
  name: 'AddSchemeDialog',
  props: {
    visible: Boolean,
  },
  data() {
    return {
      form: {
        headerid: new Number,
        pid: new Number,
        scheme: {
          createDate: '',
          isfinished: false,
          schemeName: '',
          targetDate: ''
        }
      }
    }
  },
  methods: {
    dialogClose(isvisible) {
      this.$emit("setDialogVisible", isvisible)
    }
  }
}
</script>

<style>

</style>
