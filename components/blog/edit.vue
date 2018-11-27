<template>
  <div>
    <mavon-editor
      ref="md"
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
      let formdata = new FormData()
      formdata.append('file', $file)
      console.log($file)
      this.$axios.uploadimg(formdata).then(res => {
        this.$refs.md.$img2Url(pos, this.$store.state.baseURL + res.data)
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
