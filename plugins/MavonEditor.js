import Vue from 'vue'
if (process.browser) {
  var mavonEditor=require('mavon-editor')
  Vue.use(mavonEditor)
}

