<template>
  <div>
    <header class="clearfix">
      <ul>
        <li class="logo">
          <img src="@/assets/images/logo.png"
               alt="">
        </li>
        <li v-for="(item,index) in nav"
            :key="index"
            class="nav"
            :class="{'active':curPageIndex==index}">
          <nuxt-link :to="item.link"
                     tag="span">{{item.key}}</nuxt-link>
        </li>
        <li class="person">
          <div v-if="name"
               class="log_done"
               @mouseover="person_more=true"
               @mouseout="person_more=false">
            <div class="person_pic">
              <img :src="user_pic"
                   alt="">
              <i class="iconfont icon-sanjiao"></i>
            </div>
            <transition name="slideDown">
              <dl class="person_more"
                  v-if="person_more">
                <!-- :class="{'on':person_more}" -->
                <nuxt-link to="/personal"
                           tag="dd">
                  <i class="iconfont icon-shezhi"></i>
                  <span>设置</span>
                </nuxt-link>
                <dd @click="outLog">
                  <i class="iconfont icon-tuichu"></i>
                  <span>退出</span>
                </dd>
              </dl>
            </transition>
          </div>
          <div v-else
               class="log_no">
            <nuxt-link to="/reg">注册</nuxt-link>
            <nuxt-link to="/log">登录</nuxt-link>
          </div>
        </li>
      </ul>

    </header>
    <div class="empty"></div>

  </div>
</template>

<script>
import default_pic from '@/assets/images/default_userpic.png'
export default {
  data () {
    return {
      person_more: false,
      nav: [
        {
          key: "首页",
          link: "/"
        }, {
          key: "兔砸博客",
          link: "/blog"
        }, {
          key: "你哒体重",
          link: "/weight"
        }, {
          key: "待续ing",
          link: "erro"
        }]
    }
  },
  methods: {
    // 退出登录
    outLog () {
      this.$cookie.delete('user_token')
      this.$store.commit('clearUserInfo')
      this.$message('您已成功退出登录')
      this.$router.replace('/')
    }
  },
  computed: {
    curPageIndex () {
      let index = 0
      let path = this.$route.fullPath
      for (let i in this.nav) {
        if (new RegExp(this.nav[i].link).test(path)) {
          index = i
        }
      }
      return index
    },
    name () {
      return this.$store.state.userInfo.name
    },
    user_pic () {
      let user_pic = this.$store.state.userInfo.user_pic
      return user_pic ? this.$store.state.baseURL + user_pic : default_pic
    }
  }
}
</script>

<style lang="scss" scoped>
.empty {
  width: 100%;
  height: 0;
  margin-top: 61px;
}
header {
  position: absolute;
  width: 100%;
  padding-top: 10px;
  z-index: 9;
  top: 0;
  left: 0;
  background-color: rgba($primary, 0.04);
  border-bottom: $border-solid;
  z-index: $zindex_up;
  ul {
    width: $body-width;
    margin: auto;
  }

  li {
    margin-right: 30px;
    text-align: center;
    float: left;
  }
  .logo {
    width: 40px;
    height: 40px;
    margin-right: 140px;
    img {
      width: 50px;
      height: 50px;
      position: relative;
      top: -5px;
      max-width: none;
    }
  }
  .nav {
    line-height: 40px;
    margin-right: 50px;
    font-size: 16px;
    color: $black;
    span {
      padding: 0 10px;
      display: inline-block;
      transition: all 0.3s;
      cursor: $pointer;
      &:hover {
        color: $primary;
      }
    }
    &.active {
      color: $primary;
      font-weight: bold;
    }
  }

  .person {
    float: right;
    position: relative;
    height: 50px;
    .log_done {
      height: 100%;
    }
    .log_no {
      padding-top: 5px;
      font-size: 14px;
      margin: 0 10px;
      a {
        display: inline-block;
        padding: 4px 10px;
        &:hover {
          color: $blue;
        }
      }
    }
    &_pic {
      width: 80px;
      height: 40px;
      text-align: center;
      overflow: hidden;
      cursor: $pointer;
      img {
        width: 40px;
        background-color: $bg;
        border-radius: 50%;
        margin-right: 10px;
      }
    }
    &_more {
      position: absolute;
      border-radius: 0 0 10px 10px;
      overflow: hidden;
      top: 50px;
      left: 0;
      width: 80px;
      background: #f5efef;
      // transition: all 0.3s;
      // &.on {
      //   height: 80px;
      // }
      dd {
        line-height: 40px;
        i {
          margin-right: 10px;
        }
        span {
          font-size: 14px;
        }
        cursor: $pointer;
        transition: all 0.3s;
        &:hover {
          background: rgba($primary, 0.1);
        }
      }
    }
  }
}
</style>


