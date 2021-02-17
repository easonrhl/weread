import axios from 'axios'

const instance = axios.create({
  baseURL: 'http://127.0.0.1:3000/api',
  timeout: 5000
})

instance.interceptors.request.use(config => {
  if (sessionStorage.token) {
    config.headers.Authorization = 'Bearer ' + sessionStorage.token
  }
  return config
})

instance.interceptors.response.use(response => {
  return response.data
})

const request = config => {
  return instance(config)
}

export default request
