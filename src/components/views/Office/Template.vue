<template>
  <div class="template_wrap">
    <div class="template_dashboard">
      <el-dropdown @command="templateSelected">
        <span>{{ showingTemplateName }}</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item command="1">Action 1</el-dropdown-item>
            <el-dropdown-item command="2">Action 2</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button size="small" style="margin-left:10px;">
        <el-icon><Plus /></el-icon>添加模板
      </el-button>
    </div>
    <div class="template_mainbody">
      <div class="template_display">
        <!-- 计划区域 -->
        <div class="scheme_area">
          <div class="scheme_header">
            <el-input v-model="schemeTitle" placeholder="输入标题"/>
            <span style="font-size:20px;margin-left:10px;">2</span>
          </div>
          <!-- 任务区域 -->
          <div class="task_area">
            <div class="task_card"></div>
            <div class="add_sth_btn">
              <el-button type="text">
                <el-icon size="20"><Plus /></el-icon>
              </el-button>
            </div>
          </div>
        </div>
        <!-- 计划添加框 -->
        <div class="add_sth_btn">
          <el-button type="text">
            <el-icon size="20"><Plus /></el-icon>
          </el-button>
        </div>
      </div>
      <div class="template_operation">
        <el-button size="small" type="primary">保存</el-button>
        <el-button size="small" type="danger" style="margin-left:10px;">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { getAllTemplateAPI } from '@/utils/api'
import { Plus } from '@element-plus/icons'
export default {
  name: 'Template',
  components: {
    Plus
  },
  setup() {
    const showingTemplateName = ref('请选择模板')
    const schemeTitle = ref('计划标题')
    const templateList = ref([]) // 全部模板的列表
    const getAllTemplate = () => {
      getAllTemplateAPI()
      .then(res => {
        console.log(res.data)
        templateList.value = res.data
      })
      .catch(err => {
        console.log(err.toString())
      })
    }
    const templateSelected = (command) => {
      showingTemplateName.value = command
    }
    onMounted(() => {
      getAllTemplate()
    })
    return {
      schemeTitle,
      showingTemplateName,
      templateList,
      templateSelected
    }
  }
}
</script>

<style>
.template_wrap {
  position: fixed;
  width: calc(100% - 40px);
  height: calc(100% - 40px);
  padding: 20px;
}
.template_dashboard {
  height: 50px;
}
.template_mainbody {
  height: calc(100% - 50px);
}
.scheme_area {
  width: 150px;
  margin-right: 10px;
}
.scheme_header {
  display: flex;
  flex-direction: row;
  align-items: center;
}
.template_display {
  display: flex;
  flex-direction: row;
  height: calc(100% - 40px);
}
.template_operation {
  display: flex;
  justify-content: right;
  height: 40px;
}
.add_sth_btn {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 148px;
  height: 40px;
  border: 1px solid #eeeeee;
  border-radius: 10px;
}
</style>