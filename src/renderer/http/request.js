import axios from 'axios'
const service = axios.create({
  withCredentials: true,
  timeout: 15000,
  baseURL: 'http://172.32.4.120:7001'
})

service.interceptors.response.use(
  response => {
    const res = response.data
    if (res.code === 200) {
      return Promise.resolve(res.data)
    } else {
      return Promise.reject(res)
    }
  },
  error => {
    console.log('response error', error)
    return Promise.reject(error)
  }
)

export default service
