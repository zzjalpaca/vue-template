import axios from 'axios'
import qs from 'qs'
import { Message } from 'element-ui'
import store from '@/store'

// create an axios instance
const service = axios.create({
  // baseURL: process.env.VUE_APP_BASE_API, // url = base url + request url
  baseURL: process.env.NODE_ENV === 'development' ? '/api' : '/'
  // withCredentials: true, // send cookies when cross-domain requests
  // timeout: 10000 // request timeout
})

// request interceptor
service.interceptors.request.use(
  config => {
    if (config.method === 'post') {
      // post 提交时，将对象转换为string, 为处理PHP后台解析问题
      config.data = qs.stringify(config.data)
    }
    return config
  },
  error => {
    // do something with request error
    console.log(error) // for debug
    return Promise.reject(error)
  }
)

// response interceptor
service.interceptors.response.use(
  /**
   * If you want to get http information such as headers or status
   * Please return  response => response
  */

  /**
   * Determine the request status by custom code
   * Here is just an example
   * You can also judge the status by HTTP Status Code
   */
  response => {
    const res = response.data
    if (res.code !== '0') {
      Message({
        message: res.msg || 'Error',
        type: 'error',
        duration: 5 * 1000
      })

      // 登录超时处理
      if (res.code === '1000001') {
        setTimeout(() => {
          store.dispatch('user/resetToken').then(() => {
            location.reload()
          })
        }, 1000)
      }
      return Promise.reject(new Error(res.msg || 'Error'))
    } else {
      return res
    }
  },
  error => {
    console.log('err' + error) // for debug
    Message({
      message: error.msg,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
