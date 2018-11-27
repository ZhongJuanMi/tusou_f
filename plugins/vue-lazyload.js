import Vue from 'vue'
import VueLazyload from 'vue-lazyload'

export default () => {
  Vue.use(VueLazyload, {
    error: require('@/assets/images/default_userpic.png'),
    loading: require('@/assets/images/not_found.png'),
    attempt: 1
  })
}
