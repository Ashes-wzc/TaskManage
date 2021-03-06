import myAxios from "./myAxios"

/************************ 人员管理API ************************/

// 获取所有用户信息
export function getAllUserAPI() {
  return myAxios({
    url: '/user/getAllUserInfo',
    method: 'GET'
  })
}
// 获取当前登录用户的信息
export function getUserInfoAPI() {
  return myAxios({
    url: '/admin/info',
    method: 'GET'
  })
}
// 添加用户
export function AddUserAPI(data) {
  return myAxios({
    url: '/user/addUser',
    method: 'POST',
    data: data
  })
}
// 更新用户
export function updateUserAPI(data) {
  return myAxios({
    url: '/user/updateUser',
    method: 'POST',
    data: data
  })
}
// 删除用户
export function deleteUserAPI(data) {
  return myAxios({
    url: '/user/deleteUser',
    method: 'POST',
    data: data
  })
}
// 登出当前账号
export function logOutAPI() {
  return myAxios({
    url: '/logout',
    method: 'POST'
  })
}
// 获取全部工种
export function getAllRoles() {
  return myAxios({
    url: '/user/getAllRoles',
    method: 'GET'
  })
}

// 个人更新密码
export function updatePasswordAPI(data) {
  return myAxios({
    url: '/admin/password',
    method: 'POST',
    data: data
  })
}

/************************ 项目管理API ************************/

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

/************************ 计划管理API ************************/

// 获取对应项目的所有计划
export function getSchemeAPI(pid) {
  return myAxios({
    url: '/scheme/getScheme',
    method: 'GET',
    params: {
      pid: pid
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

/************************ 任务管理API ************************/

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

/************************ 文件管理API ************************/

// 获取对应任务下的文档
export function getDocumentAPI(tid) {
  return myAxios({
    url: '/document/getDocument',
    method: 'GET',
    params: {
      tid: tid
    }
  })
}
// 上传对应任务下的文档
export function uploadDocumentAPI(file, tid) {
  return myAxios({
    url: '/document/uploadDocuments',
    method: 'POST',
    data: file,
    params: {
      tid: tid
    }
  })
}
// 下载对应任务文档
export function downloadDocumentAPI(did) {
  return myAxios({
    url: '/document/downloadDocument',
    method: 'GET',
    params: {
      did: did
    },
    responseType: 'blob'
  })
}
// 删除文档信息
export function deleteDocumentAPI(did) {
  return myAxios({
    url: '/document/deleteDocument',
    method: 'POST',
    data: {
      did: did
    }
  })
}

/************************ 模版管理API ************************/

// 获取全部模版
export function getAllTemplateAPI() {
  return myAxios({
    url: '/model-type/getCorrespondModel',
    method: 'GET'
  })
}
// 添加模版
export function addTemplateAPI(data) {
  return myAxios({
    url: '/model-type/addModelType',
    method: 'POST',
    data: data
  })
}
// 更新模版
export function updateTemplateAPI(data) {
  return myAxios({
    url: '/model-type/updateModel',
    method: 'POST',
    data: data
  })
}
// 删除模版
export function deleteTemplateAPI(data) {
  return myAxios({
    url: '/model-type/deleteModel',
    method: 'POST',
    data: data
  })
}
// 导入模版
export function importTemplateAPI(data) {
  return myAxios({
    url: '/model-import/importCorrespondModel',
    method: 'POST',
    data: data
  })
}

/************************ 获取操作日志API ************************/
export function getSystemLogAPI(tid) {
  return myAxios({
    url: '/syslog/',
    method: 'GET',
    params: {
      tid: tid
    }
  })
}