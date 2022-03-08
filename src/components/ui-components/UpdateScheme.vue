<!-- 更新计划 -->
<template>
  <el-select v-model="updatingSchemeId" placeholder="Select" size="small" @change="schemeSelect">
    <el-option
      v-for="item in schemeInfo"
      :key="item.schemeId"
      :label="item.schemeName"
      :value="item.schemeId"
    ></el-option>
  </el-select>
  <div style="display:flex;flex-direction:column;margin-top:10px;">
    <el-form ref="form" label-width="120px" style="border-bottom:1px solid #eeeeee">
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
      <el-form-item label="是否进行中">
        <el-switch v-model="scheme.isrunning" />
      </el-form-item>
      <el-form-item label="是否完成">
        <el-switch v-model="scheme.isfinished" />
      </el-form-item>
    </el-form>
    <el-button-group size='mini' style="align-self:flex-end;margin-top:5px;">
      <el-button type='primary' @click="updateScheme">更新</el-button>
      <el-button type="danger" @click="deleteScheme">删除</el-button>
    </el-button-group>
  </div>
  <LeaderSelectDialog 
    :visible="leaderSelectDialogVisible"
    @setDialogVisible="LeaderSelectDialogClose($event)"
    @returnUserInfo="getLeaderInfo($event)"
  />
</template>

<script>
import { computed, onMounted, reactive, ref, toRefs } from 'vue'
import { schemeData } from '@/store/store.js'
import { updateSchemeAPI, deleteSchemeAPI } from '@/utils/api.js'
import LeaderSelectDialog from '@/components/ui-components/LeaderSelectDialog.vue'
export default {
  name: 'UpdateScheme',
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
    const sid = ref('')
    const updatingSchemeId = ref('')
    const form = reactive({
      'headerid': 0,
      'pid': 0,
      'scheme': {
        'createDate': '',
        'finishDate': '',
        'isfinished': false,
        'isrunning': false,
        'schemeId': 0,
        'schemeName': '计划名',
        'targetDate': ''
      }
    })
    const formAsRefs = toRefs(form)
    const schemeInfo = computed(() => {
      return schemeData.list
    })
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
    const deleteScheme = () => {
      const deleteForm = {
        'sid': sid.value
      }
      deleteSchemeAPI(deleteForm)
      .then(res => {
        console.log('删除计划', res.data)
        // 更新本地的数据
        updatingSchemeId.value = schemeInfo.value[0].schemeId
        schemeSelect(0)
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
    // 计划选择
    const schemeSelect = () => {
      for(let i = 0; i < schemeInfo.value.length; i++) {
        if(updatingSchemeId.value == schemeInfo.value[i].schemeId) {
          const dataPool = schemeInfo.value[i]
          sid.value = dataPool.schemeId
          leaderText.value = dataPool.headers[0].name
          form.headerid = dataPool.headers[0].id
          form.pid = props.pid
          form.scheme.createDate = dataPool.createDate
          form.scheme.finishDate = dataPool.finishDate
          form.scheme.isfinished = dataPool.isfinished
          form.scheme.isrunning = dataPool.isrunning
          form.scheme.schemeId = dataPool.schemeId
          form.scheme.schemeName = dataPool.schemeName
          form.scheme.targetDate = dataPool.targetDate
        }
      }
    }
    onMounted(() => {
      updatingSchemeId.value = schemeInfo.value[0].schemeId
      schemeSelect(0)
    })
    return {
      // variable
      leaderSelectDialogVisible,
      leaderText,
      updatingSchemeId,
      ...formAsRefs,
      schemeInfo,
      // function
      updateScheme,
      deleteScheme,
      LeaderSelectDialogClose,
      getLeaderInfo,
      schemeSelect
    }
  }
}
</script>