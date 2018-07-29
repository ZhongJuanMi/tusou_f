import Vue from 'vue'
import tkAxios from 'axios'
import VueCookie from 'vue-cookie'
let options = {}
tkAxios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
tkAxios.defaults.baseURL =
  process.env.NODE_ENV === 'production' ?
  process.env.serverApiUrl :
  process.env.localApiUrl
tkAxios.interceptors.request.use(
  config => {
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
