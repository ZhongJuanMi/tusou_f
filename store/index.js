import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export const state = () => {
  return {
    userInfo: {},
    weather: {},
    baseURL: 'http://47.106.200.223:8000/'
    // baseURL: 'http://localhost:8000/'
  }
}

export const mutations = {
  setUserInfo(state, payload) {
    state.userInfo = payload
  },
  clearUserInfo(state) {
    state.userInfo = {}
  },
  setWeather(state, payload) {
    state.weather = payload
  }
}

export const actions = {
  async nuxtServerInit({ state, commit }, { req, $axios }) {
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
    await $axios
      .getweather()
      .then(res => {
        let city = res.results[0].location.name
        let code = res.results[0].now.code
        let temperature = res.results[0].now.temperature
        let text = res.results[0].now.text
        commit('setWeather', {
          city,
          code,
          temperature,
          text
        })
      })
      .catch(() => {
        return
      })
  }
}
