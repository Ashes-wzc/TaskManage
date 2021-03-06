import { reactive, readonly } from "vue"

// /*
//   当前处理的项目数据 
// */
// const initCurrentProjectInfo = reactive({
//   index: 0,
//   name: '',
//   id: new Number,
// })
// export const currentProjectInfo = readonly(initCurrentProjectInfo)
// export function updateCurrentProject(data, index) {
//   initCurrentProjectInfo.index = index
//   initCurrentProjectInfo.name = data.projectName
//   initCurrentProjectInfo.id = data.projectId
// }
// /*
//  当前处理的计划数据 
// */
// const initCurrentSchemeInfo = reactive({
//   list: {},
//   index: 0,
//   showingList: []
// })
// export const currentSchemeInfo = readonly(initCurrentSchemeInfo)
// export function updateScheme(sd) {
//   initCurrentSchemeInfo.list = sd
// }
// export function updateSchemeIndex(index) {
//   initCurrentSchemeInfo.index = index
//   initCurrentSchemeInfo.showingList = initCurrentSchemeInfo.list[index]
// }
// /* 
//   当前处理的任务数据
// */
// const initCurrentTaskInfo = reactive({
//   list: []
// })
// export const currentTaskInfo = readonly(initCurrentTaskInfo)
// export function updateCurrentTask(taskData) {
//   initCurrentTaskInfo.list = taskData
// }
// /*
//   全部用户列表 
// */
// const initUserList = reactive({
//   list: []
// })
// export const userList = readonly(initUserList)
// export function updateUserList(userData) {
//   initUserList.list = userData
// }


/*** v2.0 storage ***/
/*
  清除storage
*/
export function clearStorage() {
  initTaskPosition.pos1 = 0
  initTaskPosition.pos2 = 0
  initTaskPosition.taskId = 1
  initSchemeData.list = []
  initDocumentsData.list = []
  initTaskHistory.list = []
}
/* 
  当前展示的任务的序号
*/
const initTaskPosition = reactive({
  pos1: 0,
  pos2: 0,
  taskId: 1,
})
export const taskPosition = readonly(initTaskPosition)
export function updateTaskPosition(pos1, pos2, tid) {
  initTaskPosition.pos1 = pos1
  initTaskPosition.pos2 = pos2
  initTaskPosition.taskId = tid
}
/* 
  当前项目中的计划数据
*/
const initSchemeData = reactive({
  list: []
})
export const schemeData = readonly(initSchemeData)
export function updateSchemeData(sd) {
  initSchemeData.list = sd
}
/* 
  当前任务的文件数据
*/
const initDocumentsData = reactive({
  list: []
})
export const documentsData = readonly(initDocumentsData)
export function updateDocumentsData(document) {
  initDocumentsData.list = document
  // console.log(document)
}
/* 
  当前任务的历史纪录
*/
const initTaskHistory = reactive({
  list: []
})
export const taskHistory = readonly(initTaskHistory)
export function updateTaskHistory(history) {
  initTaskHistory.list = history
}