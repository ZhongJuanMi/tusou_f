<template>
  <div class="blog_detail_id">
    <h1>
      <span>{{title}}</span>
      <span class="button" v-if="$store.state.userInfo.is_tz">
        <el-button type="success" size="mini"
               icon="el-icon-edit"
               circle 
               @click="$router.push(`/blog/edit/${$route.params.id}`)"></el-button>
        <el-button type="danger" size="mini"
               icon="el-icon-delete"
               circle
               @click="del"></el-button>
      </span>
    </h1>
    <p class="time">
      <span>创建时间：{{create_time}}</span>
      <span>更新时间：{{update_time}}</span>
       </p>
    <div v-html="content" v-highlight class="markdown-body">
    </div>
  </div>

</template>

<script>

import marked from 'marked'
export default {
  async asyncData ({ $axios, route }) {
    let { data } = await $axios.getBlogDetail(route.params.id)
    return {
      title: data.title,
      create_time: data.create_time,
      update_time: data.update_time,
      content: marked(data.content)
    }
  },
  methods:{
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
    }
  }
}
</script>


<style lang="scss" scoped>

.blog_detail_id {
  width: 1160px;
  padding: 20px 0;
  margin: auto;
  h1 {
    text-align: center;
    font-size: 30px;
    .button{
      float: right;
      margin-left: 10px;
    }
  }
  .time {
    text-align: right;
    margin: 6px 0;
    span{
      font-size: 14px;
      color: $gray;
      margin:0 10px;
    }
  }
  .content{
    font-size: 14px;
  }
}
</style>
