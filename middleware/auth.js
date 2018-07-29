import ax from 'axios'
if (process.server) {
  // ax.defaults.baseURL = `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
  ax.defaults.baseURL = 'http: //47.106.200.223:3000'
}
import {
  error
} from 'util'
export default function ({
  route,
  store,
  req,
  res,
  redirect
}) {
  if (process.client) {
    console.log('客服端')
  }
  // 服务端渲染时请求获取用户信息
  if (process.server) {
    console.log('服务端')
    let serverCookie = ''
    if (req.headers.cookie) {
      req.headers.cookie.split(';').forEach(v => {
        if (v.match('user_token=')) {
          serverCookie = v.replace('user_token=', '').trim()
        }
      })
    }
    return ax
      .get('/api/users/getUser', {
        params: {
          token: `token ${serverCookie}`
        }
      })
      .then(({
        data
      }) => {
        console.log(9, data)
        if (data.code == 2000) {
          store.commit('setUserInfo', {
            userInfo: data.data.userInfo
          })
        }
      })
      .catch(error => {
        console.log(error)
      })
  }
}
