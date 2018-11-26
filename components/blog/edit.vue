<template>
  <div>
    <mavon-editor
      v-model="content"
      code-style="atom-one-dark"
      @imgAdd="imgAdd"
      @imgDel="imgDel"
      @save="$emit('savedraft')"
      @change="changetext"
    />
  </div>
</template>
<script>
export default {
  props: {
    /*编辑器的内容*/
    value: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  data() {
    return {
      content: this.value.content
    }
  },
  methods: {
    changetext(value, render) {
      let data = {
        content: value,
        html: render
      }
      this.$emit('input', data)
    },
    imgAdd(pos, $file) {
      // 第一步.将图片上传到服务器.
      var formdata = new FormData()
      formdata.append('image', $file)
      axios({
        url: 'server url',
        method: 'post',
        data: formdata,
        headers: { 'Content-Type': 'multipart/form-data' }
      }).then(url => {
        // 第二步.将返回的url替换到文本原位置![...](0) -> ![...](url)
        /**
         * $vm 指为mavonEditor实例，可以通过如下两种方式获取
         * 1. 通过引入对象获取: `import {mavonEditor} from ...` 等方式引入后，`$vm`为`mavonEditor`
         * 2. 通过$refs获取: html声明ref : `<mavon-editor ref=md ></mavon-editor>，`$vm`为 `this.$refs.md`
         */
        $vm.$img2Url(pos, url)
      })
    },
    imgDel(pos, $file) {
      console.log(1)
    }
  }
}
</script> 

<style>
</style>
