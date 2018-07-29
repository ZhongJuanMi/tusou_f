import Vue from 'vue'
import tkAxios from 'axios'
import VueCookie from 'vue-cookie'
let options = {}
tkAxios.defaults.baseURL = 'http://47.106.200.223:3000'
if (process.server) {
  // tkAxios.defaults.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
  tkAxios.defaults.baseURL = 'http://47.106.200.223:3000'
}
tkAxios.interceptors.request.use(
  config => {
    console.log(123, process.env.NODE_ENV)
    if (process.client && VueCookie.get('user_token')) {
      config.headers.Authorization = `token ${VueCookie.get('user_token')}` //将接口返回的token信息配置到接口请求中
    }
    return config
  },
  error => {
    return Promise.reject(error)
  }
)
tkAxios.interceptors.response.use(
  response => {
    return response
  },
  error => {
    return Promise.reject(error)
  }
)
Vue.prototype.$tkAxios = tkAxios
// export default tkAxios
