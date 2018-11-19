import Vue from 'vue'
if (process.browser) {
  var hljs = require('mavon-editor/dist/highlightjs/highlight.min.js')
  // 代码高亮
  Vue.directive('highlight', function(el) {
    let blocks = el.querySelectorAll('pre code')
    blocks.forEach(block => {
      hljs.highlightBlock(block)
    })
  })
}
