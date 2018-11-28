import VueCookie from 'vue-cookie'
export default ({ $axios, req, redirect }) => {
  $axios.defaults.timeout = 5000 // 响应时间
  $axios.defaults.headers.post['Content-Type'] =
    'application/x-www-form-urlencoded;charset=UTF-8' // 配置请求头
  $axios.defaults.baseURL =
    process.env.NODE_ENV === 'production'
      ? process.env.serverApiUrl
      : process.env.localApiUrl
  $axios.onRequest(
    config => {
      if (process.client && VueCookie.get('user_token')) {
        config.headers.authorization = `token ${VueCookie.get('user_token')}` //将接口返回的token信息配置到接口请求中
      }
      return config
    },
    error => {
      return Promise.reject(error)
    }
  )
  $axios.onResponse(
    response => {
      return response
    },
    error => {
      return Promise.reject(error)
    }
  )

  const get = (url, params) => {
    return new Promise((resolve, reject) => {
      $axios
        .get(url, {
          params
        })
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  const post = (url, params) => {
    return new Promise((resolve, reject) => {
      $axios
        .post(url, params)
        .then(response => {
          resolve(response.data)
        })
        .catch(error => {
          reject(error)
        })
    })
  }

  // 接口方法
  const api = {
    /**
     * 注册
     * @param {*} name 昵称
     * @param {*} password 密码
     */
    reg(name, password) {
      return post('api/users/registerUser', { name, password })
    },
    /**
     * 昵称是否注册
     * @param {*} name 昵称
     */
    ifreged(name) {
      return get('api/users/ifUser', { name })
    },
    /**
     * 登录
     * @param {*} name
     * @param {*} password
     */
    log(name, password) {
      return post('api/users/logUser', { name, password })
    },
    getUserInfo() {
      return get('api/users/getUser')
    },
    /**
     * 获取博客列表
     * @param {*} page 页码
     * @param {*} sort 时间顺序 0 倒序 1 正序
     * @param {*} keywords 关键字
     * @param {*} year 年
     * @param {*} mouth 月
     */
    getBlogList(data) {
      return get('api/blog/getBlogList', { ...data, is_draft: 0 })
    },
    /**
     * 获取博客分类
     */
    getBlogTagsCom() {
      return get('api/blog/getBlogTagsCom')
    },
    /**
     * 获取博客时间
     */
    getBlogListCom() {
      return get('api/blog/getBlogListCom')
    },
    /**
     * 获取博客详情
     * @param {*} id 博客id
     */
    getBlogDetail(id) {
      return get('api/blog/getBlogDetail', { id })
    },
    /**
     * 提交博客
     * @param {*} title 标题
     * @param {*} content 内容
     * @param {*} time 时间
     * @param {*} tags 分类
     */
    addBlog(params) {
      return post('api/blog/addorsetBlog', { ...params, is_draft: 0 })
    },
    /**
     * 保存草稿
     * @param {*} title 标题
     * @param {*} content 内容
     * @param {*} tags 分类
     */
    addDraft(params) {
      return post('api/blog/addorsetBlog', { ...params, is_draft: 1 })
    },
    /**
     * 获取草稿列表
     */
    getDraftList() {
      return get('api/blog/getDraftList')
    },
    /**
     * 获取草稿详情
     * @param {*} id 博客id
     */
    getDraftDetail(id) {
      return get('api/blog/getBlogDetail', { id })
    },
    /**
     * 删除博客或草稿
     * @param {*} id 博客或草稿id
     */
    delblog(id) {
      return post('api/blog/delBlog', { id })
    },
    /**
     * 获取体重
     */
    getweight() {
      return get('api/weights/getWeight')
    },
    setweight(datetime, weight) {
      return post('api/weights/setWeight', { datetime, weight })
    },
    /**
     * 设置用户信息
     * @param {*} height
     * @param {*} idealWeight
     * @param {*} gender
     * @param {*} name
     * @param {*} user_pic
     */
    setUserInfo(data) {
      return post('api/users/setInfo', data)
    },
    /**
     *上传图片
     *
     * @returns
     */
    uploadimg(data) {
      return post('api/file/imgupload', data)
    },
    // 获取天气
    getweather(location) {
      return get(
        `xz/v3/weather/now.json?key=p2jcmaawwv6neamm&location=${location}&language=zh-Hans&unit=c`
      )
    }
  }
  Object.assign($axios, api)
}
