import Vue from 'vue'
import mavonEditor from 'mavon-editor'
// use
export default () => {
  if (process.browser) {
    Vue.use(mavonEditor)
  }
}
