<!-- 添加项目 -->
<template>
  <div style="display:flex;flex-direction:column;">
    <el-form ref="form" label-width="120px" style="border-bottom:1px solid #eeeeee">
      <el-form-item label="选择模板">
        <el-select v-model="thisTemplate" placeholder="Select" size="small">
          <el-option
            v-for="item in templateList"
            :key="item.id"
            :label="item.modelType"
            :value="item.id"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="项目名称">
        <el-input v-model="project.projectName"></el-input>
      </el-form-item>
      <el-form-item label="负责人">
        <span style="margin-right:20px">{{ leaderText }}</span>
        <el-button type="primary" size="mini" @click="leaderSelectDialogVisible = true">选择</el-button>
      </el-form-item>
      <el-form-item label="开始日期">
        <el-date-picker
          v-model="project.createDate"
          type="datetime"
          placeholder="选择开始时间"
          value-format="YYYY-MM-DD HH:mm:ss"
        >
        </el-date-picker>
      </el-form-item>
      <el-form-item label="计划结束日期">
        <el-date-picker
          v-model="project.targetDate"
          type="datetime"
          placeholder="选择计划结束时间"
          value-format="YYYY-MM-DD HH:mm:ss"
        >
        </el-date-picker>
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
import { onMounted, reactive, ref, toRefs } from 'vue'
import { getAllTemplateAPI } from '@/utils/api'
import LeaderSelectDialog from '@/components/ui-components/LeaderSelectDialog.vue'
export default {
  name: 'AddProject',
  props: {

  },
  components: {
    LeaderSelectDialog
  },
  setup() {
    const form = reactive({
      'mid': 0,
      'project': {
        'createDate': '',
        'finishDate': '',
        'isfinished': false,
        'projectName': '',
        'targetDate': ''
      },
      'uid': 0
    })
    const leaderSelectDialogVisible = ref(false)
    const leaderText = ref('请选择负责人')
    const formAsRefs = toRefs(form)
    const templateList = ref([])
    const thisTemplate = ref('')
    // 获取模板信息
    const getTemplate = () => {
      getAllTemplateAPI()
      .then(res => {
        console.log(res.data)
        templateList.value = res.data
      })
      .catch(err => {
        console.log(err.toString())
      })
    }
    // 
    const submitForm = () => {
      console.log('提交')
    }
    // 关闭管理员选择对话框
    const LeaderSelectDialogClose = (event) => {
      leaderSelectDialogVisible.value = event
    }
    // 获取计划管理员的信息
    const getLeaderInfo = (event) => {
      leaderText.value = event.name
      form.uid = event.username
    }
    onMounted(() => {
      getTemplate()
    })
    return {
      // variable
      ...formAsRefs,
      templateList,
      leaderSelectDialogVisible,
      leaderText,
      thisTemplate,
      // function
      submitForm,
      LeaderSelectDialogClose,
      getLeaderInfo
    }
  }
}
</script>