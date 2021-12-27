import myAxios from "./myAxios"

// 获取全部的项目
export function getAllProjectsAPI() {
  return myAxios({
    url: '/project/getAllProjects',
    method: 'get'
  })
} 

// 添加项目
export function addProjectAPI(projectInfo){
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

// 获取对应项目的所有计划
export function getSchemeAPI(schemePid) {
  return myAxios({
    url: '/scheme/getScheme',
    method: 'get',
    params: {
      pid: schemePid
    }
  })
}
