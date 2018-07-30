import Vue from 'vue'
import tkAxios from 'axios'
import VueCookie from 'vue-cookie'
let options = {}
if (process.server) {
  tkAxios.defaults.baseURL = 'http://47.106.200.223:8000'
}
console.log(111111, tkAxios)
tkAxios.defaults.baseURL = 'http://47.106.200.223:8000'
tkAxios.interceptors.request.use(
  config => {
    console.log(999999999, config)
    if (process.client && VueCookie.get('user_token')) {
      config.headers.authorization = `token ${VueCookie.get('user_token')}` //将接口返回的token信息配置到接口请求中
    }
    return config
  },
  error => {
    console.log(88888888, error)
    return Promise.reject(error)
  }
)
tkAxios.interceptors.response.use(
  response => {
    console.log(777, response)
    return response
  },
  error => {
    console.log(666, error)
    return Promise.reject(error)
  }
)
Vue.prototype.$tkAxios = tkAxios
// export default tkAxios
