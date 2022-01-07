import { reactive, readonly } from "vue"

// 当前展示的项目数据
const initCurrentProjectInfo = reactive({
  index: 0,
  name: '',
  id: new Number
})
export const currentProjectInfo = readonly(initCurrentProjectInfo)
export function updateCurrentProject(data, index) {
  initCurrentProjectInfo.index = index
  initCurrentProjectInfo.name = data.projectName
  initCurrentProjectInfo.id = data.projectId
}

// 全部用户列表
const initUserList = reactive({
  list: []
})
export const userList = readonly(initUserList.list)
export function updateUserList(userData) {
  initUserList.list = userData
}
