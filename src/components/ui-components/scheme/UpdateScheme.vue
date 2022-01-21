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
      <el-button size='mini' type='danger' @click="deleteScheme">删除</el-button>
      <el-button size='mini' type='primary' @click="updateScheme">修改</el-button>
    </template>
  </el-dialog>
  <LeaderSelectDialog 
    :visible="leaderSelectDialogVisible"
    @setDialogVisible="LeaderSelectDialogClose($event)"
    @returnUserInfo="getLeaderInfo($event)"
  />
</template>

<script>
import { ref, toRefs, reactive, computed, watch } from 'vue'
import { currentSchemeInfo, updateSchemeIndex } from '@/store/store'
import { updateSchemeAPI, deleteSchemeAPI } from '@/utils/api'
import LeaderSelectDialog from '@/components/ui-components/LeaderSelectDialog.vue'
export default {
  name: 'UpdateSchemeDialog',
  props: {
    visible: Boolean,
  },
  components: {
    LeaderSelectDialog
  },
  emits: ["setDialogVisible"],
  setup(props, context) {
    const leaderSelectDialogVisible = ref(false)
    const leaderText = ref('')
    const form = reactive({
      headerid: '',
      scheme: {
        createDate: '',
        isfinished: false,
        schemeId: 0,
        schemeName: '',
        targetDate: '',
        isrunning: true
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
      leaderText.value = schemeDataValue.headers[0].name
      form.headerid = schemeDataValue.headers[0].id
      form.scheme.createDate = schemeDataValue.createDate
      form.scheme.isfinished = schemeDataValue.isfinished
      form.scheme.schemeId = schemeDataValue.schemeId
      form.scheme.schemeName = schemeDataValue.schemeName
      form.scheme.targetDate = schemeDataValue.targetDate
    }
    // 更新计划点击函数
    const updateScheme = () => {
      updateSchemeAPI(form)
      .then(res => {
        console.log('更新计划', res.data)
        context.emit('setDialogVisible', false)
      })
      .catch(err => {
        console.log(err.toString())
      })
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
    const LeaderSelectDialogClose = (event) => {
      leaderSelectDialogVisible.value = event
    }
    const getLeaderInfo = (event) => {
      leaderText.value = event.name
      form.headerid = event.username
    }
    // 监听store数据,更新form
    watch(currentSchemeData, () => {
      updateFormFromStore()
    })
    return {
      leaderSelectDialogVisible,
      leaderText,
      form,
      ...formAsRefs,
      currentSchemeData,
      dialogVisible,
      updateScheme,
      deleteScheme,
      LeaderSelectDialogClose,
      getLeaderInfo
    }
  }
}
</script>
