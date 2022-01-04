import { reactive, readonly } from "vue"

// 当前展示的项目数据
const initCurrentProject = reactive({
  name: '',
  index: new Number,
})
export const currentProjectInfo = readonly(initCurrentProject)
export function updateCurrentProject(name, index) {
  initCurrentProject.name = name
  initCurrentProject.index = index
}

// 全部用户列表
const initUserList = reactive({
  list: []
})
export const userList = readonly(initUserList.list)
export function updateUserList(userData) {
  initUserList.list = userData
}
