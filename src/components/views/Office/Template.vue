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
      <el-button size="small">添加模板</el-button>
    </div>
    <div class="template_mainbody">
      <div class="template_display">
        <!-- 计划区域 -->
        <div class="scheme_area">
          <div class="scheme_title"></div>
          <!-- 任务区域 -->
          <div class="task_area">
            <div class="task_card"></div>
            <div>
              <el-button>添加新任务</el-button>
            </div>
          </div>
        </div>
        <!-- 计划添加框 -->
        <div class="add_scheme">
          <el-button type="text">添加新计划</el-button>
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
export default {
  name: 'Template',
  setup() {
    const showingTemplateName = ref('请选择模板')
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
.template_display {
  height: calc(100% - 40px);
}
.template_operation {
  display: flex;
  justify-content: right;
  height: 40px;
}
</style>