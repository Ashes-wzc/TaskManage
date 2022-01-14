import { reactive, readonly } from "vue"

/*
  当前处理的项目数据 
*/
const initCurrentProjectInfo = reactive({
  index: 0,
  name: '',
  id: new Number,
})
export const currentProjectInfo = readonly(initCurrentProjectInfo)
export function updateCurrentProject(data, index) {
  initCurrentProjectInfo.index = index
  initCurrentProjectInfo.name = data.projectName
  initCurrentProjectInfo.id = data.projectId
}

/*
 当前处理的计划数据 
*/
const initCurrentSchemeInfo = reactive({
  list: {},
  index: 0,
  showingList: []
})
export const currentSchemeInfo = readonly(initCurrentSchemeInfo)
export function updateScheme(schemeData) {
  initCurrentSchemeInfo.list = schemeData
}
export function updateSchemeIndex(index) {
  initCurrentSchemeInfo.index = index
  initCurrentSchemeInfo.showingList = initCurrentSchemeInfo.list[index]
}

/* 
  当前处理的项目数据
*/
const initCurrentTaskInfo = reactive({
  list: []
})
export const currentTaskInfo = readonly(initCurrentTaskInfo)
export function updateCurrentTask(taskData) {
  initCurrentTaskInfo.list = taskData
}

/*
  全部用户列表 
*/
const initUserList = reactive({
  list: []
})
export const userList = readonly(initUserList.list)
export function updateUserList(userData) {
  initUserList.list = userData
}
