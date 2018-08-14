import ax from 'axios'
import {
  error
} from 'util'
ax.defaults.baseURL = "http://47.106.200.223:8000"
// ax.defaults.baseURL="http://localhost:8000"
export default function ({
  route,
  store,
  req,
  res,
  redirect
}) {
  if (process.client) {

  }
  // 服务端渲染时请求获取用户信息
  if (process.server) {
    console.log(req.headers)
    if ((req.headers['user-agent'].match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
      redirect('http://47.106.200.223:8080')
    } else {
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
            token: serverCookie ? `token ${serverCookie}` : ''
          }
        })
        .then(({
          data
        }) => {
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
}
