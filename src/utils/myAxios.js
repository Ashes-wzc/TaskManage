import axios from "axios"

function myAxios(axiosConfig) {
  const service = axios.create({
    baseURL: '/apis',
    timeout: 1000 * 5,
    // headers: {
    //   'Authorization': 'Bearer ' + sessionStorage.getItem('Bearer')
    // }
  })
  service.interceptors.request.use(
    config => {
      // do sth before request
      config.headers = {
        'Authorization': 'Bearer ' + sessionStorage.getItem('Bearer')
      }
      return config
    },
    error => {
      // do sth when get error
      return Promise.reject(error)
    }
  )
  // service.interceptors.response.use(
  //   function(response) {
  //     // do sth when get 2xx response code
  //     return response
  //   },
  //   function(error) {
  //     // do sth when get other response code
  //     return Promise.reject(error)
  //   }
  // )

  return service(axiosConfig)
}

export default myAxios