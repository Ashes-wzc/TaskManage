<template>
  <!-- {{ form }}
  {{ selfVisible }} -->
  <el-dialog
    title="管理计划"
    v-model="selfVisible"
    width="50%"
    @close="returnVisible(false)"
  >
    <el-form ref="form" :model="form" label-width="120px">
      <el-form-item label="计划名称">
        <el-input v-model="form.schemeName"></el-input>
      </el-form-item>
      <el-form-item label="负责人工号">
        <el-input v-model="form.headers[0].id"></el-input>
      </el-form-item>
      <el-form-item label="开始日期">
        <el-input v-model="form.createDate"></el-input>
      </el-form-item>
      <el-form-item label="计划结束日期">
        <el-input v-model="form.targetDate"></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button size='mini' type='danger' @click="deleteScheme">删除</el-button>
      <el-button size='mini' type='primary'>修改</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { deleteSchemeAPI } from '@/utils/api'
import { ref, toRefs } from 'vue'
export default {
  name: 'UpdateSchemeDialog',
  props: {
    visible: Boolean,
    schemeData: {}
  },
  setup(props, context) {
    const { visible } = toRefs(props)
    const { schemeData } = toRefs(props)
    const selfVisible = ref(visible)
    const form = ref(schemeData)
    const returnVisible = (v) => {
      context.emit('setDialogVisible', v)
    }
    const deleteScheme = () => {
      const sid = {
        sid: form.value.schemeId
      }
      deleteSchemeAPI(sid)
      .then(res => {
        console.log(res.data)
        returnVisible(false)
      })
      .catch(err => {
        console.log(err.toString())
      })
    }
    return {
      selfVisible,
      form,
      returnVisible,
      deleteScheme
    }
  },
  emits: ["setDialogVisible"]
}
</script>

<style>

</style>