<template>
  <div class="template_wrap">
    <div class="template_dashboard">
      <el-dropdown @command="templateSelected">
        <span>{{ currentTemplateData.modelType }}</span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item 
              v-for="(template, index) in templateList"
              :key="index"
              :command="template"
            >
              {{ template.modelType }}
            </el-dropdown-item>
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
        <div class="scheme_area" v-for="(scheme, index1) in currentTemplateData.modelSchemes" :key="index1">
          <div class="scheme_header">
            <el-input v-model="scheme.schemeName" placeholder="输入标题" />
            <span style="font-size:20px;margin-left:10px;">2</span>
          </div>
          <!-- 任务区域 -->
          <div class="task_area">
            <div class="task_card" v-for="(task, index2) in scheme.modelTasks" :key="index2">
              <el-input v-model="task.taskName" placeholder="输入任务" />
            </div>
            <div class="add_sth_btn">
              <el-popover trigger="click">
                <template #reference>
                  <el-button type="text">
                    <el-icon size="20"><Plus /></el-icon>
                  </el-button>
                </template>
                <el-input placeholder="请输入任务名"></el-input>
              </el-popover>
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
        <el-button size="small" type="primary" @click="updateTemplate">保存</el-button>
        <el-button size="small" type="danger" style="margin-left:10px;">删除</el-button>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref } from 'vue'
import { getAllTemplateAPI, updateTemplateAPI } from '@/utils/api'
import { Plus } from '@element-plus/icons'
export default {
  name: 'Template',
  components: {
    Plus
  },
  setup() {
    const templateList = ref([]) // 全部模板的列表
    const currentTemplateData = ref([]) // 当前展示的模版数据
    const templateForm = reactive({
      "modelType": {
        'modelType': '',
        'modelSchemes': [
          {
            'schemeName': '1',
            'modelTasks': [
              {
                'taskName': 't1'
              },
              {
                'taskName': 't2'
              }
            ]
          },
          {
            'schemeName': '2',
            'modelTasks': []
          },
        ]
      }
    })
    // 获取全部模版数据
    const getAllTemplate = () => {
      getAllTemplateAPI()
      .then(res => {
        console.log(res.data)
        templateList.value = res.data
        currentTemplateData.value = res.data[0]
      })
      .catch(err => {
        console.log(err.toString())
      })
    }
    // 选择模版
    const templateSelected = (command) => {
      currentTemplateData.value = command
    }
    // 创建更新模版表单
    const createUpdateForm = () => {
      let form = {}
      form.modelType = currentTemplateData.value
      return form
    }
    // 更新模版数据到服务器
    const updateTemplate = () => {
      const form = createUpdateForm()
      console.log(form)
      updateTemplateAPI(form)
      .then(res => {
        console.log(res)
        getAllTemplate()
      })
      .catch(err => {
        console.log(err.toString())
      })
    }
    onMounted(() => {
      getAllTemplate()
    })
    return {
      templateList,
      currentTemplateData,
      templateForm,
      templateSelected,
      updateTemplate
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
  display: flex;
  align-items: center;
  /* justify-content: center; */
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
  margin-bottom: 10px;
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
.task_card {
  margin-bottom: 5px;
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