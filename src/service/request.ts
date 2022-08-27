import axios from 'axios'
import qs from 'qs'
// import store from '@/store'
import { Toast,Dialog, Notify } from 'vant'
// import {getToken} from './auth'
// import router from '@/router'
import { REQUEST_URL, REQUEST_TIMEOUT } from '@/config/system.conf'

import store from '@/store'

// let returnType = 'data' // 返回类型

const service = axios.create({
  baseURL: '', // REQUEST_URL,    //process.env.VUE_APP_BASE_API, url = base url + request url
  withCredentials: false, // send cookies when cross-domain requests
  timeout: REQUEST_TIMEOUT, // 请求超时时间
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded' // x-www-form-urlencoded
  }
})

// 请求拦截
service.interceptors.request.use(config => {
  // console.log(config)
  if (config.method === 'post') {
    if (config.data) {
      // config.data = data
      // config.data = qs.stringify(config.data)
    }
  }
  if (!config) {
    config = {}
  }
  if (!config.headers) {
    config.headers = {}
  }
  const token = store.state.user.userInfo.access_token
  if (token) { // 携带token
    // config.headers['ts'] = new Date().getTime() // 时间戳
    if(!config.headers['Authorization']) {
      config.headers['Authorization'] = `${store.state.user.userInfo.token_type} ${token}`
    }
  }
  if (config.loading) {
    Toast.loading({
      forbidClick: true,
      duration: 0
    })
  }
  return config
}, error => {
  return Promise.reject(error)
})

// 响应拦截
service.interceptors.response.use(res => {
    Toast.clear()
    // console.log(res.config.returnType)
    const { data: { code, data, msg, token } } = res
    if (res.config['returnType'] === 'origin') { // 原样返回
      return Promise.resolve(res.data)
    }
    // if (token) { // 处理登录接口token在外面的情况
    //   data.token = token
    // }
    // if (res && res.config && res.config.returnType)
    switch(code / 1) {
      case 0: // 正确响应
        return Promise.resolve(data)
        break
      case 401:
      case 402:
      case 407: // 登录状态已过期，您可以继续留在该页面，或者重新登录 
        // console.log('4开头的')
        // Dialog.alert({
        //   title: '提示',
        //   width: 280,
        //   message: '登录状态已过期，您可以继续留在该页面，或者重新登录'
        // }).then(() => {
        //   store.dispatch('user/resetToken').then(() => {
        //     router.push({
        //       name: 'login'
        //     })
        //   })
        // })
        break
      default: // 直接弹出消息
        Notify({ type: 'warning', message: msg })
    }
  },
  error => {
    // console.log(error, error.response)
    if (error && error.request) {
      const status = error.request['status']
      switch (status) {
        case 401:
          Dialog.alert({
            title: '提示',
            width: 280,
            message: '登录状态已过期，您可以继续留在该页面，或者重新登录'
          }).then(() => {
            // store.dispatch('user/resetToken').then(() => {
            //   router.push({
            //     name: 'login'
            //   })
            // })
          })
          break
        case 404:
          Toast({
            message: '接口未找到',
            type: 'fail',
            duration: 2000
          })
          break
        case 415:
          Toast({
            message: 'HTTP协议不匹配，请确认',
            type: 'fail',
            duration: 2000
          })
          break
          // case 500:
          //   Toast({ message: '服务未启动', type: 'fail', duration: 2000 })
          //   break
          // default:
          //   Toast({ message: '服务错误', type: 'fail', duration: 2000 })
          //   break
        default:
          // console.log(error)
          Toast({
            message: error.message || '服务错误',
            type: 'fail',
            duration: 2000
          })

      }
    } else {
      Toast({
        message: error.message || '服务错误',
        type: 'fail',
        duration: 2000
      })
    }

    return Promise.reject(error)
  }
)

// TODO: 数据处理函数
// function $handleData(resp) {
//   const { code, data, msg } = resp
// }
export default service