import Vue from 'vue'
import tkAxios from 'axios'
import VueCookie from 'vue-cookie'
let options = {}
tkAxios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
tkAxios.defaults.baseURL = 'http://47.106.200.223:8000/api'
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
