<template>
  <div class="blog">
    <el-select v-model="draftid"
               placeholder="选择草稿进行编辑"
               @change="changedraft"
               @focus="getDraftList">
      <el-option v-for="item in draftlist"
                 :key="item.value"
                 :label="item.title"
                 :value="item.id">
      </el-option>
    </el-select>
    <el-cascader expand-trigger="hover"
                 :options="options"
                 placeholder="请选择分类"
                 v-model="selectedOptions">
    </el-cascader>

    <el-button icon="el-icon-news"
               type="warning"
               @click="savedraft">保存草稿</el-button>
    <el-button icon="el-icon-upload"
               type="success"
               @click="upload">提交上传</el-button>
    <el-button type="danger"
               icon="el-icon-delete"
               @click="del()">删除此篇</el-button>
    <input type="text"
           v-model="article.title"
           class="blog_editt"
           maxlength="25"
           placeholder="标题在这里">
    <z-edit v-model="article.content"
            class="blog_editd"
            @savedraft="savedraft" />

  </div>
</template>

<script>

import ZEdit from '@/components/blog/edit'
export default {
  middleware: 'auth',
  components: {
    ZEdit
  },
  async asyncData ({ $axios, route }) {
    let options = []
    let article = {
      title: '',
      content: ''
    }
    let selectedOptions = []
    let { data } = await $axios.getBlogTagsCom()
    options = data
    if (route.params.id) {
      let { data } = await $axios.getBlogDetail(route.params.id)
      article.title = data.title
      article.content = data.content
      selectedOptions = data.tags.split(',').map(item => item = item * 1)

    }
    return {
      options,
      article,
      selectedOptions
    }
  },
  data () {
    return {
      draftlist: [],
      draftid: ''
    }
  },
  methods: {
    // 上传
    upload () {
      let data = {
        title: this.article.title,
        content: this.article.content,
        time: new Date(),
        tags: this.selectedOptions.join(','),
        id: this.$route.params.id
      }
      if (Object.values(data).filter(item => item == '').length) {
        this.$message('信息未填写完整')
        return
      }
      this.$axios.addBlog(data).then(({ code }) => {
        if (code === 2000) {
          this.$message.success('提交成功')
          this.$router.go(-1)
        } else {
          this.$message.error('提交失败')
        }
      })
    },
    // 保存草稿
    savedraft () {
      if (!this.article.title) {
        this.$message('草稿必须填写标题')
        return
      }
      let data = {
        title: this.article.title,
        content: this.article.content,
        tags: this.selectedOptions.join(','),
        id: this.$route.params.id
      }
      this.$axios.addDraft(data).then(({ code, data }) => {
        if (code === 2000) {
          if (data) {
            this.$router.replace({
              params: {
                id: data
              }
            })
          }
          this.$message.success('保存成功')
        } else {
          this.$message.error('保存失败')
        }
      })
    },
    //  获取草稿列表
    getDraftList () {
      this.$axios.getDraftList().then(({ data }) => {
        this.draftlist = data
      })
    },
    // 选择草稿
    changedraft (id) {
      this.$axios.getBlogDetail(id).then(({ data }) => {
        this.selectedOptions = data.tags.split(',').map(item => item = item * 1)
        delete data.tags
        this.article = data
        this.$router.replace({
          params: {
            id
          }
        })
      })
    },
    // 清除数据
    restore () {
      this.article = {
        title: '',
        content: ''
      },
        this.selectedOptions = [],
        this.draftlist = [],
        this.draftid = ''
    },
    // 删除
    del () {
      this.$confirm('删除此文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.$axios.delblog(this.$route.params.id).then(res => {
          if (res.code === 2000) {
            this.$message({
              type: 'success',
              message: '删除成功!'
            })
            this.$router.go(-1)
          }
        })
      }).catch(() => {
        this.$message({
          type: 'info',
          message: '已取消删除'
        })
      })
    },
  }
}
</script>


<style lang="scss" scoped>
.blog {
  padding: 20px 40px;
  &_edit {
    &t {
      width: 100%;
      font-size: 30px;
      margin: 10px 0;
    }
    &d {
      width: 100%;
    }
  }
  .el-cascader {
    margin: 0 10px;
  }
}
</style>


