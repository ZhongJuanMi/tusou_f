
<template>
  <div>
    <div
      :class="{focus:searchFocus}"
      class="blog_search"
    >
      <input
        v-model="keywords"
        type="text"
        placeholder="兔搜,搜你想搜,嗖~"
        @focus="searchFocus=true"
        @blur="searchFocus=false"
      >
      <el-button
        type="primary"
        size="mini"
        icon="el-icon-search"
        class="blog_search_b"
        @click="search"
      />
    </div>
    <div class="blog_classify">
      <p class="blog_classify_title">
        <i class="iconfont icon-wenzhang" />
        <span>博客类别</span>
      </p>
      <el-tree
        :data="nodes"
        :props="defaultProps"
        :expand-on-click-node="false"
        default-expand-all
        highlight-current
        @node-click="handleNodeClick"
      />
    </div>
    <div class="blog_tag">
      <p class="blog_tag_title">
        <i class="iconfont icon-yanjing1" />
        <span>筛选条件</span>
      </p>
      <div class="blog_tag_tag">
        <el-tag
          v-for="(item,index) in value"
          v-if="index=='sort'||(index=='keywords'&&item)"
          :closable="index!='sort'"
          :type="color(index)"
          :key="index"
          @close="colsetag(index)"
        >
          <span v-if="index=='sort'">{{ item?'时间升序':'时间降序' }}</span>
          <span v-if="index=='keywords'">关键字：{{ item }}</span>
        </el-tag>
        <el-tag
          v-if="tags"
          :type="color('tags')"
          closable
          @close="colsetag('tags')"
        >
          分类：{{ tags }}
        </el-tag>
      </div>

    </div>
    <div class="blog_btn">
      <el-button
        :icon="`el-icon-sort-${value.sort?'up':'down'}`"
        type="warning"
        size="mini"
        @click="changesort"
      >时间{{ value.sort?'升':'降' }}序</el-button>
      <el-button
        type="danger"
        size="mini"
        icon="el-icon-refresh"
        @click="restorecondition"
      >清空条件</el-button>
      <el-button
        v-if="is_tz"
        icon="el-icon-edit"
        size="mini"
        type="success"
        @click="editblog"
      >新增博客</el-button>
    </div>

  </div>

</template>


<script>
export default {
  props: {
    nodes: {
      type: Array,
      default() {
        return []
      }
    },
    defaultProps: {
      type: Object,
      default() {
        return {}
      }
    },
    value: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  data() {
    return {
      searchFocus: false,
      keywords: '',
      tags: ''
    }
  },
  computed: {
    is_tz() {
      return this.$store.state.userInfo.is_tz
    }
  },
  methods: {
    handleNodeClick(data) {
      console.log(data)
      let temp = { ...this.value }
      temp.tags = data.value
      if (data) {
        this.$emit('input', temp)
        this.tags = data.label
      }
    },
    colsetag(type) {
      let temp = { ...this.value }
      if (type == 'sort') {
        temp.sort = temp.sort ? 0 : 1
      } else {
        temp[type] = ''
        if (type == 'tags') {
          this.tags = ''
        }
      }
      this.$emit('input', temp)
    },
    color(type) {
      switch (type) {
        case 'sort':
          return 'warning'
        case 'keywords':
          return 'primary'
        case 'tags':
          return 'danger'
      }
    },
    changesort() {
      let temp = { ...this.value }
      temp.sort = temp.sort ? 0 : 1
      this.keywords = temp.keywords
      this.$emit('input', temp)
    },
    restorecondition() {
      this.keywords = ''
      this.tags = ''
      this.$emit('input', {
        sort: 0,
        keywords: '',
        tags: ''
      })
    },
    search() {
      let temp = { ...this.value }
      temp.keywords = this.keywords
      this.$emit('input', temp)
    },
    editblog() {
      this.$router.push('/blog/edit')
    }
  }
}
</script>

<style lang="scss" scoped>
.blog_search {
  width: 100%;
  height: 30px;
  border: 1px solid rgba($blue, 0.5);
  border-radius: 4px;
  margin-bottom: 20px;
  &.focus {
    border-color: rgba($blue, 1);
  }
  input {
    width: calc(100% - 44px);
    font-size: 14px;
    color: rbga($blue, 0.2);
    padding: 0 20px;
    height: 100%;
  }
  &_b {
    float: right;
  }
  ::-webkit-input-placeholder {
    /* WebKit, Blink, Edge */
    color: $blue;
  }
  :-moz-placeholder {
    /* Mozilla Firefox 4 to 18 */
    color: $blue;
  }
  ::-moz-placeholder {
    /* Mozilla Firefox 19+ */
    color: $blue;
  }
  :-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: $blue;
  }
}
.blog_classify {
  &_title {
    font-size: 14px;
    color: $black;

    span {
      margin-left: 10px;
      font-weight: bold;
    }
  }
}
.blog_tag {
  margin: 20px 0;
  &_title {
    font-size: 14px;
    color: $orange;
    span {
      margin-left: 10px;
      font-weight: bold;
    }
  }
  &_tag {
    margin-left: 20px;
    .el-tag {
      margin: 4px;
    }
  }
}
.blog_btn {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  button {
    margin: 4px 0;
  }
}
</style>
