import myAxios from "./myAxios"

/************************************ 人员管理API ************************************/

// 获取所有用户信息
export function getAllUserAPI() {
  return myAxios({
    url: '/user/getAllUserInfo',
    method: 'GET'
  })
}

/************************************ 项目管理API ************************************/

// 获取全部的项目
export function getAllProjectsAPI() {
  return myAxios({
    url: '/project/getAllProjects',
    method: 'GET'
  })
}
// 添加项目
export function addProjectAPI(projectInfo) {
  return myAxios({
    url: '/project/addProject',
    method: 'POST',
    data: projectInfo
  })
}
// 修改项目
export function updateProjectAPI(projectInfo) {
  return myAxios({
    url: '/project/updateProject',
    method: 'POST',
    data: projectInfo
  })
}
// 删除项目
export function deleteProjectAPI(pid) {
  return myAxios({
    url: '/project/deleteProject',
    method: 'POST',
    data: pid
  })
}

/************************************ 计划管理API ************************************/

// 获取对应项目的所有计划
export function getSchemeAPI(schemePid) {
  return myAxios({
    url: '/scheme/getScheme',
    method: 'GET',
    params: {
      pid: schemePid
    }
  })
}
// 添加计划
export function addSchemeAPI(schemeInfo) {
  return myAxios({
    url: '/scheme/addScheme',
    method: 'POST',
    data: schemeInfo
  })
}
// 更新计划信息
export function updateSchemeAPI(schemeInfo) {
  return myAxios({
    url: '/scheme/updateScheme',
    method: 'POST',
    data: schemeInfo
  })
}
// 删除计划信息
export function deleteSchemeAPI(sid) {
  return myAxios({
    url: '/scheme/deleteScheme',
    method: 'POST',
    data: sid
  })
}

/************************************ 任务管理API ************************************/

// 添加对应计划下的任务
export function addTaskAPI(addTaskInfo) {
  return myAxios({
    url: '/task/addTask',
    method: 'POST',
    data: addTaskInfo
  })
}
// 更新任务信息
export function updateTaskAPI(updataTaskInfo) {
  return myAxios({
    url: '/task/updateTask',
    method: 'POST',
    data: updataTaskInfo
  })
}
// 删除任务信息
export function deleteTaskAPI(tid) {
  return myAxios({
    url: '/task/deleteTask',
    method: 'POST',
    data: tid
  })
}

/************************************ 文件管理API ************************************/

// 获取对应任务下的文档
export function getDocumentAPI() {
  return myAxios({
    url: '/document/getDocument',
    method: 'GET'
  })
}
// 上传对应任务下的文档
export function uploadDocumentAPI() {
  return myAxios({
    url: '/document/uploadDocument',
    method: 'POST'
  })
}
// 下载对应任务文档
export function downloadDocumentAPI() {
  return myAxios({
    url: '/document/downloadDocument',
    method: 'GET'
  })
}
// 删除文档信息
export function deleteDocumentAPI() {
  return myAxios({
    url: '/document/deleteDocument',
    method: 'POST'
  })
}
