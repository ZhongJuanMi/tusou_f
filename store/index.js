import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const state = () => {
  return {
    userInfo: {},
    baseURL:'http://47.106.200.223:8000'
    
  }
}

export const mutations = {
  setUserInfo(state, payload) {
    state.userInfo = payload
  },
  clearUserInfo(state) {
    state.userInfo = {}
  }
}

export const actions = {
  async nuxtServerInit({ state,commit }, { req,$axios }) {
    let _token = ''
    if (req.headers.cookie) {
      let arr,
        reg = new RegExp('(^| )user_token=([^;]*)(;|$)')
      if ((arr = req.headers.cookie.match(reg))) {
        _token = unescape(arr[2])
      }
    }
    if (_token) {
      $axios.defaults.headers.common.authorization = `token ${_token}`
      await $axios.getUserInfo().then(res => {
        if (res.code === 2000) {
          commit('setUserInfo', res.data.userInfo)
        }
      })
    }
    
  }
}
