<!-- 添加任务 -->
<template>
  <div style="display:flex;flex-direction:column;">
    <el-form ref="form" label-width="120px" style="border-bottom:1px solid #eeeeee">
      <el-form-item label="所属计划">
        <el-select v-model="thisScheme" placeholder="Select" size="small" @change="schemeSelect">
          <el-option
            v-for="item in schemeInfo"
            :key="item.schemeId"
            :label="item.schemeName"
            :value="item.schemeId"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="任务名称">
        <el-input v-model="task.taskName"></el-input>
      </el-form-item>
      <el-form-item label="负责人">
        <span style="margin-right:20px">{{ leaderText }}</span>
        <el-button type="primary" size="mini" @click="leaderSelectDialogVisible = true">选择</el-button>
      </el-form-item>
      <el-form-item label="开始日期">
        <el-date-picker
          v-model="task.createDate"
          type="datetime"
          placeholder="选择开始时间"
          value-format="YYYY-MM-DD HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="计划结束日期">
        <el-date-picker
          v-model="task.targetDate"
          type="datetime"
          placeholder="选择计划结束时间"
          value-format="YYYY-MM-DD HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="任务描述">
        <el-input v-model="task.taskPricipal" type="textarea"></el-input>
      </el-form-item>
    </el-form>
    <el-button size='mini' type='primary' @click="submitForm" style="align-self:flex-end;margin-top:5px;">添加</el-button>
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
import { addTaskAPI } from '@/utils/api.js'
import LeaderSelectDialog from '@/components/ui-components/LeaderSelectDialog.vue'
export default {
  name: 'AddTask',
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
    const form = reactive({
      'headerid': 0,
      'participants': [],
      'sid': 0,
      'task': {
        'createDate': '',
        'finishDate': '',
        'isfinished': false,
        'targetDate': '',
        'taskName': '',
        'taskPricipal': ''
      }
    })
    const formAsRefs = toRefs(form)
    const thisScheme = ref('')
    const schemeInfo = computed(() => {
      return schemeData.list
    })
    // 添加任务
    const submitForm = () => {
      form.sid = thisScheme
      addTaskAPI(form)
      .then(res => {
        console.log(res.data, props.pid)
        context.emit('setDialogVisible', false)
      })
      .catch(err => {
        console.log(err.toString())
      })
    }
    // 选择所属计划
    const schemeSelect = () => {
      console.log(schemeInfo.value)
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
    onMounted(() => {
      thisScheme.value = schemeInfo.value[0].schemeId
    })
    return {
      // variable
      leaderSelectDialogVisible,
      leaderText,
      ...formAsRefs,
      thisScheme,
      schemeInfo,
      // function
      submitForm,
      schemeSelect,
      LeaderSelectDialogClose,
      getLeaderInfo,
    }
  }
}
</script>