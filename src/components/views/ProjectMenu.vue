<template>
  <el-container style="height: 100vh">
    <el-aside width="180px">
      <div class="logo">
        DEMUP
      </div>
      <!-- 项目选择下拉菜单 -->
      <el-dropdown @command="selectProject">
        <span class="el-dropdown-link">
          当前项目: {{ dropdownName }}
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item
              v-for="(project, key) in projectList"
              :key="key"
              :command="project"
            >
              {{ project.projectName }}
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <!-- 任务选择菜单 -->
      <el-menu
        default-active="1"
        class="project-menu"
        @select="menuItemClick"
      >
        <el-menu-item-group 
          v-for="(scheme, key1) in menuData"
          :key="key1"
          :title="scheme.schemeName"
        >
          <el-menu-item 
            v-for="(task, key2) in scheme.tasks"
            :key="key2"
            :index="key1 + '-' + key2 + '-' + task.taskId"
          >
            {{ task.taskName }}
          </el-menu-item>
        </el-menu-item-group>
      </el-menu>
    </el-aside>
    <!-- 主展示区域:tabs -->
    <el-main>
      <el-tabs v-model="activeTab" @tab-click="tabClick" type="card">
        <el-tab-pane label="总览" name="overview">
          <Overview />
        </el-tab-pane>
        <el-tab-pane label="文件" name="file">
          <File />
        </el-tab-pane>
        <el-tab-pane label="历史" name="history">
          <History />
        </el-tab-pane>
      </el-tabs>
    </el-main>
  </el-container>
</template>

<script>
import { onMounted, ref } from 'vue'
import { getAllProjectsAPI, getSchemeAPI, getDocumentAPI } from '@/utils/api'
import { updateSchemeData, updateTaskPosition, updateDocumentsData } from '@/store/store'
import Overview from '@/components/views/Office/Overview.vue'
import File from '@/components/views/Office/File.vue'
import History from '@/components/views/Office/History.vue'
export default {
  name: 'ProjectMenu',
  props: {},
  components: {
    Overview,
    File,
    History
  },
  setup () {
    const dropdownName = ref('未选择')
    const projectIndex = ref(1)
    const projectList = ref([])
    const menuData = ref([])
    const activeTab = ref('overview')
    // 根据项目id获取项目中的计划数据
    const getSchemeData = (pid) => {
      getSchemeAPI(pid)
      .then(res => {
        if (res.data.length > 0) {
          menuData.value = res.data
          updateSchemeData(res.data) // 更新计划数据到store
          getTaskDocuments(res.data[0].tasks[0].taskId)
        }
        else {
          console.log('暂无数据')
        }
      })
      .catch(err => {
        console.log('项目中的计划:', err.toString())
      })
    }
    // 根据任务id获取任务中的文件
    const getTaskDocuments = (tid) => {
      getDocumentAPI(tid)
      .then(res => {
        updateDocumentsData(res.data)
      })
      .catch(err => {
        console.log(err.toString())
      })
    }
    // 获取全部项目的列表，同时默认获取列表中第一个项目的计划
    const getAllProjects = () => {
      getAllProjectsAPI()
      .then(res => {
        if (res.data.length > 0) {
          projectList.value = res.data
          dropdownName.value = res.data[0].projectName
          getSchemeData(res.data[0].projectId)
        }
        else {
          console.log('暂无数据')
        }
      })
      .catch(err => {
        console.log('全部项目:', err.toString())
      })
    }
    // 菜单选择任务
    const menuItemClick = (key) => {
      const keyArray = key.split("-")
      updateTaskPosition(parseInt(keyArray[0]), parseInt(keyArray[1]), parseInt(keyArray[2]))
      getTaskDocuments(parseInt(keyArray[2]))
    }
    // 下拉菜单选择项目
    const selectProject = (command) => {
      getSchemeData(command.projectId)
      dropdownName.value = command.projectName
    }
    // tab标签点击事件
    const tabClick = (tab, event) => {
      console.log(tab, event)
    }
    onMounted(() => {
      getAllProjects()
    })
    return {
      dropdownName,
      projectIndex,
      projectList,
      menuData,
      activeTab,
      menuItemClick,
      selectProject,
      tabClick
    }
  }
}
</script>

<style>
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
</style>
