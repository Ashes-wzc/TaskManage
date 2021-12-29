import myAxios from "./myAxios"

/****** 人员管理API ******/

// 获取所有用户信息
export function getAllUserAPI() {
  return myAxios({
    url: '/user/getAllUserInfo',
    method: 'GET'
  })
}

/****** 项目管理API ******/

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
// 删除项目
export function deleteProjectAPI(pid) {
  return myAxios({
    url: '/project/deleteProject',
    method: 'POST',
    data: pid
  })
}

/****** 计划管理API ******/

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

/****** 任务管理API ******/

// 添加对应计划下的任务
export function addTaskAPI(addTaskInfo) {
  return myAxios({
    url: '/task/addTask',
    method: 'POST',
    params: {

    },
    data: addTaskInfo
  })
}
// 更新任务信息
export function updateTask(updataTaskInfo) {
  return myAxios({
    url: '/task/updateTask',
    method: 'POST',
    data: updataTaskInfo
  })
}
// 删除任务信息
export function deleteTask(deleteTaskTid) {
  return myAxios({
    url: '/task/deleteTask',
    method: 'POST',
    data: deleteTaskTid
  })
}
