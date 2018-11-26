<template>
  <div class="blog">
    <div
      :class="{'fixed':fixed}"
      class="blog_l"
    >
      <z-bnode
        :nodes="nodes"
        :default-props="defaultProps"
        v-model="condition"
      />
    </div>
    <div class="blog_m">
      <z-blist
        ref="ul"
        :nodata="nodata"
        :list="list"
        :page-size="pageSize"
        :page="page"
        :count="count"
        @refreshlist="refreshlist"
      />
      <div class="moreOrFinish">
        <p v-if="finished&&list.length">数据加载完毕</p>
      </div>
    </div>
  </div>
</template>

<script>
import ZBlist from '@/components/blog/index/list'
import ZBnode from '@/components/blog/index/node'
export default {
  components: {
    ZBlist,
    ZBnode
  },
  async asyncData({ $axios, route }) {
    let condition = { ...route.query, page: 1 }
    let data = await $axios.getBlogList(condition)
    let res = await $axios.getBlogTagsCom()
    let list = data.data.list
    let pageSize = data.data.pageSize
    let page = data.data.page
    let count = data.data.count
    let classify = res.data
    return {
      list,
      pageSize,
      page,
      count,
      nodes: classify,
      defaultProps: {
        children: 'children',
        label: 'label'
      }
    }
  },
  data() {
    return {
      condition: {
        sort: 0,
        keywords: '',
        tags: ''
      },
      fixed: false,
      finished: false,
      load: false,
      nodata: false
    }
  },
  watch: {
    condition(cur) {
      this.list = []
      this.getlists(1)
      this.$router.replace({
        query: { ...cur }
      })
    }
  },
  mounted() {
    this.fixedside()
    window.addEventListener('scroll', this.fixedside)
    window.addEventListener('scroll', this.loadmore)
  },
  destroyed() {
    window.removeEventListener('scroll', this.fixedside)
    window.removeEventListener('scroll', this.loadmore)
  },
  methods: {
    getlists(page) {
      this.load = true
      this.$axios.getBlogList({ ...this.condition, page }).then(({ data }) => {
        this.nodata = false
        if (data.list.length) {
          this.list.push(...data.list)
        } else {
          if (this.list.length == 0) {
            this.nodata = true
          }
        }
        this.pageSize = data.pageSize
        this.page = data.page
        this.count = data.count
        if (this.list.length >= this.count) {
          this.finished = true
        }

        this.load = false
      })
    },
    refreshlist() {
      this.list = []
      this.getlists(1)
    },
    fixedside() {
      let _h = document.documentElement.scrollTop
      if (_h > 81) {
        this.fixed = true
      } else {
        this.fixed = false
      }
    },
    loadmore() {
      let _h1 = this.$refs.ul.$refs.list.clientHeight
      let _h2 =
        document.documentElement.scrollTop +
        document.documentElement.clientHeight -
        101
      if (_h2 >= _h1 && !this.finished && !this.load) {
        this.getlists(this.page * 1 + 1)
      }
    }
  }
}
</script>


<style lang="scss" scoped>
.blog {
  width: $body-width;
  margin: auto;
  padding-top: 20px;
  &_l {
    width: 260px;
    float: left;
    border-radius: 10px;
    padding: 20px;
    background: rgba($green, 0.1);
    &.fixed {
      position: fixed;
      top: 0;
    }
  }
  &_m {
    width: 880px;
    float: right;
    padding-bottom: 40px;
    .moreOrFinish {
      text-align: center;
      color: $black;
      font-size: 14px;
    }
  }
}
</style>
