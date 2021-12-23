import myAxios from "./myAxios"

export function getAllProjectsAPI() {
  return myAxios({
    url: '/project/getAllProjects',
    method: 'get'
  })
}