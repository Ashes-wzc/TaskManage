<template>
  <el-dialog
    title="管理计划"
    v-model="dialogVisible"
    width="50%"
  >
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
      <el-button size='mini' type='danger' @click="deleteScheme">删除</el-button>
      <el-button size='mini' type='primary' @click="updateScheme">修改</el-button>
    </template>
  </el-dialog>
</template>

<script>
import { toRefs, reactive, computed, watch } from 'vue'
import { currentSchemeInfo, updateSchemeIndex } from '@/store/store'
import { deleteSchemeAPI } from '@/utils/api'
export default {
  name: 'UpdateSchemeDialog',
  props: {
    visible: Boolean,
  },
  emits: ["setDialogVisible"],
  setup(props, context) {
    const form = reactive({
      headerid: 0,
      scheme: {
        createDate: '',
        isfinished: false,
        schemeId: 0,
        schemeName: '',
        targetDate: ''
      }
    })
    const formAsRefs = toRefs(form)
    // 监听visible判断dialog是否显示
    const dialogVisible = computed({
      get: () => {
        return props.visible
      },
      set: (visible) => {
        context.emit('setDialogVisible', visible)
      }
    })
    // 从store中获取当前展示计划的数据
    const currentSchemeData = computed(() => {
      return currentSchemeInfo.showingList
    })
    // 从store中更新form的数据
    const updateFormFromStore = () => {
      const schemeDataValue = currentSchemeData.value
      form.headerid = schemeDataValue.headers[0].id
      form.scheme.createDate = schemeDataValue.createDate
      form.scheme.isfinished = schemeDataValue.isfinished
      form.scheme.schemeId = schemeDataValue.schemeId
      form.scheme.schemeName = schemeDataValue.schemeName
      form.scheme.targetDate = schemeDataValue.targetDate
    }
    // 更新计划点击函数
    const updateScheme = () => {
      // 更新计划信息
    }
    // 删除计划点击函数
    const deleteScheme = () => {
      const sid = {
        sid: form.scheme.schemeId
      }
      deleteSchemeAPI(sid)
      .then(res => {
        console.log('删除计划', res.data)
        updateSchemeIndex(0)
        context.emit('setDialogVisible', false)
      })
      .catch(err => {
        console.log(err.toString())
      })
    }
    // 监听store数据,更新form
    watch(currentSchemeData, () => {
      updateFormFromStore()
    })
    return {
      form,
      ...formAsRefs,
      currentSchemeData,
      dialogVisible,
      updateScheme,
      deleteScheme
    }
  }
}
</script>

<style>

</style>