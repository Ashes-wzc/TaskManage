<template>
  <el-container style="height: 100vh">
    <el-header height="40px" class="index_header">
      <el-image style="width: 100px" :src="require('@/assets/demup.jpg')"></el-image>
      <el-popover placement="bottom" :width="100" trigger="hover">
        <template #reference>
          <div style="display:flex;flex-direction:row">
            <span style="margin-right:10px;">{{ currentUserName }}</span>
            <el-icon size="20"><Avatar /></el-icon>
          </div>
        </template>
        <template #default>
          <div style="display: flex;flex-direction: column;">
            <el-button type="text" @click="toUrl('UserInfo')">个人信息</el-button>
            <el-button v-if="isUserAdmin" type="text" @click="toUrl('UserManage')">用户管理</el-button>
            <el-button v-if="isUserAdmin" type="text" @click="toUrl('Template')">模板管理</el-button>
          </div>
        </template>
      </el-popover>
    </el-header>
    <el-container>
      <el-aside width="180px" class="index-aside">
        <div style="display:flex;justify-content:center;">
          <!-- 项目选择下拉菜单 -->
          <el-dropdown @command="selectProject" class="project_select_dropdown">
            <span class="el-dropdown-link" >
              <el-button size="mini">{{ dropdownName }}<el-icon><ArrowDown /></el-icon></el-button>
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
          <el-button size="mini" @click="deDialogVisible = true"><el-icon><Setting /></el-icon></el-button>
        </div>
        <!-- 任务选择菜单 -->
        <el-menu
          default-active="2"
          class="project-menu"
          @select="menuItemClick"
        >
          <el-sub-menu
            v-for="(scheme, key1) in menuData"
            :key="key1"
            :index='key1.toString()'
          >
            <template #title>
              <span>{{ scheme.schemeName }}</span>
            </template>
            <el-menu-item 
              v-for="(task, key2) in scheme.tasks"
              :key="key2"
              :index="key1 + '-' + key2 + '-' + task.taskId"
            >
              {{ task.taskName }}
            </el-menu-item>
          </el-sub-menu>
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
          <el-tab-pane label="历史" name="history" v-if="isUserAdmin">
            <History />
          </el-tab-pane>
        </el-tabs>
      </el-main>
    </el-container>
  </el-container>
  <DeDialog
    :visible="deDialogVisible"
    :pid="projectIndex"
    @setDialogVisible="dialogClose($event)"
  />
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { getAllProjectsAPI, getSchemeAPI, getDocumentAPI, getSystemLogAPI, getUserInfoAPI } from '@/utils/api'
import { updateSchemeData, updateTaskPosition, updateDocumentsData, updateTaskHistory } from '@/store/store'
import Overview from '@/components/views/Office/Overview.vue'
import File from '@/components/views/Office/File.vue'
import History from '@/components/views/Office/History.vue'
import { Avatar, ArrowDown, Setting } from '@element-plus/icons'
import DeDialog from '@/components/ui-components/de-dialog'
export default {
  name: 'ProjectMenu',
  props: {},
  components: {
    Overview,
    File,
    History,
    Avatar,
    ArrowDown,
    DeDialog,
    Setting
  },
  setup () {
    const dropdownName = ref('未选择')
    const projectIndex = ref(1)
    const projectList = ref([])
    const menuData = ref([])
    const activeTab = ref('overview')
    const router = useRouter()
    const isUserAdmin = ref(false)
    const currentUserName = ref('请登录')
    const deDialogVisible = ref(false)
    // 跳转到个人信息
    const toUrl = (name) => {
      router.push({
        name: name
      })
    }
    // 根据项目id获取项目中的计划数据
    const getSchemeData = (pid) => {
      getSchemeAPI(pid)
      .then(res => {
        if (res.data.length > 0) {
          menuData.value = res.data
          updateSchemeData(res.data) // 更新计划数据到store
          getTaskDocuments(res.data[0].tasks[0].taskId)
          getTaskHistory(res.data[0].tasks[0].taskId)
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
    // 根据任务id获取任务中的历史
    const getTaskHistory = (tid) => {
      getSystemLogAPI(tid)
      .then(res => {
        // console.log(res.data)
        updateTaskHistory(res.data)
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
          projectIndex.value = res.data[0].projectId
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
    // 获取当前登录人的信息
    const getUserInfo = () => {
      getUserInfoAPI()
      .then(res => {
        console.log(res.data)
        isUserAdmin.value = res.data.isAdmin
        currentUserName.value = res.data.name
      })
      .catch(err => {
        console.log(err.toString())
      })
    }
    // 菜单选择任务
    const menuItemClick = (key) => {
      const keyArray = key.split("-")
      updateTaskPosition(parseInt(keyArray[0]), parseInt(keyArray[1]), parseInt(keyArray[2]))
      getTaskDocuments(parseInt(keyArray[2]))
      getTaskHistory(parseInt(keyArray[2]))
      projectIndex.value = parseInt(keyArray[2])
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
    const dialogClose = (event) => {
      getAllProjects()
      deDialogVisible.value = event
    }
    onMounted(() => {
      getAllProjects()
      getUserInfo()
    })
    return {
      currentUserName,
      isUserAdmin,
      deDialogVisible,
      toUrl,
      dropdownName,
      projectIndex,
      projectList,
      menuData,
      activeTab,
      menuItemClick,
      selectProject,
      tabClick,
      dialogClose
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
.index_header {
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-bottom: 1px solid #eeeeee
}
.index-aside {
  display: flex;
  flex-direction: column;
}
.project_select_dropdown {
  align-self: center;
  font-size: 20px;
  color: coral;
}
.el-button+.el-button {
  margin-left: 0px;
}
.el-popover.el-popper {
  min-width: 10px;
}
</style>
