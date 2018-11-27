<template>
  <div class="blog_m_c_b">
    <ul
      ref="list"
      class="blog_m_c_b_l"
    >
      <li
        v-for="(item,index) in list"
        :key="index"
        @click="godetail(item.id)"
      >
        <div class="img">
          <img
            v-lazy="$store.state.baseURL+item.pic"
            alt=""
          >
        </div>
        <div class="text">
          <p class="blog_m_c_b_l_title">
            <span>{{ item.title }}</span>
            <span v-if="$store.state.userInfo.is_tz">
              <el-button
                type="primary"
                icon="el-icon-edit"
                size="mini"
                circle
                @click.stop="goedit(item.id)"
              />
              <el-button
                type="danger"
                size="mini"
                icon="el-icon-delete"
                circle
                @click.stop="del(item.id)"
              />
            </span>
          </p>

          <p class="blog_m_c_b_l_details">{{ item.content }}</p>
          <p class="blog_m_c_b_l_time">{{ item.tags }} {{ item.time }}</p>
        </div>

      </li>
      <li
        v-if="nodata"
        class="not_found"
      >
        <img
          src="@/assets/images/not_found.png"
          alt=""
        >
        <p> 好尴尬吖，木有此条件下的博客</p>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  props: {
    list: {
      type: Array,
      default() {
        return []
      }
    },
    pageSize: {
      type: [Number, String],
      default: 10
    },
    page: {
      type: [Number, String],
      default: 1
    },
    count: {
      type: [Number, String],
      default: 0
    },
    nodata: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    godetail(id) {
      this.$router.push(`/blog/detail/${id}`)
    },
    goedit(id) {
      this.$router.push(`/blog/edit/${id}`)
    },
    del(id) {
      this.$confirm('删除此文章?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          this.$axios.delblog(id).then(res => {
            if (res.code === 2000) {
              this.$emit('refreshlist')
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
            }
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    changepage(page) {
      this.$emit('getlists', page)
    }
  }
}
</script>

<style lang="scss" scoped>
.img {
  width: 150px;
  height: 150px;
  flex-shrink: 0;
  margin-right: 30px;
  flex-shrink: no;
  border-radius: 10px;
  overflow: hidden;
  border: $border-solid;
}
.text {
  flex-grow: 1;
}

.blog_m_c_b {
  position: relative;
  height: calc(100% - 83px);
  &_l {
    li {
      padding: 20px 40px;
      background-color: #fff;
      border-radius: 10px;
      box-shadow: 0px 4px 12px 2px rgba($gray, 0.08);
      margin-bottom: 20px;
      display: flex;
      align-content: center;
      transition: all 0.4s;
      &:hover {
        cursor: $pointer;
        transform: translateY(-4px);
        box-shadow: 0px 4px 12px 2px rgba($gray, 0.1);
      }

      &.not_found {
        display: block;
        box-shadow: none;
        background-color: transparent;
        text-align: center;
        img {
          margin: 40px 0 40px -40px;
        }
        p {
          font-size: 30px;
          color: $black;
        }
      }
    }
    &_title {
      display: flex;
      justify-content: space-between;
      span {
        &:first-child {
          font-size: 22px;
          font-weight: bold;
          white-space: nowrap;
          max-width: 500px;
          overflow: hidden;
          text-overflow: ellipsis;
        }
      }
      margin-bottom: 10px;
    }
    &_time {
      font-size: 14px;
      color: $gray;
      margin-top: 10px;
    }
    &_details {
      font-size: 16px;
      line-height: 26px;
      height: 78px;
    }
  }
  &_p {
    width: 100%;
    text-align: center;
    position: absolute;
    bottom: 20px;
    left: 0;
    right: 0;
    margin: auto;
  }
}
</style>
