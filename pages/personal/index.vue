<template>
  <div class="Personal">
    <div class="userpic">
      <img :src="user_pic?baseURL+user_pic:temp_pic?temp_pic:default_pic"
           @error="user_pic=''"
           alt="">
      <el-button type="danger"
                 plain>更换照片
        <input type="file"
               accept="image/*"
               @change="selecimg"
               ref="selecpic">
      </el-button>
    </div>
    <ul>
      <li v-for="(item,index) in settings"
          :key="index">
        <label for="">{{item.label}}</label>
        <input type="text"
               v-model="item.value"
               v-if="index!=1">
        <el-radio-group v-model="settings[1].value"
                        v-else>
          <el-radio label="male">男</el-radio>
          <el-radio label="female">女</el-radio>
        </el-radio-group>
      </li>
    </ul>
    <div class="btn">
      <el-button type="success"
                 round
                 @click="savesetting">保存设置</el-button>
      <el-button type="warning"
                 round
                 @click="outLog">退出登录</el-button>
    </div>
  </div>
</template>

<script>
import default_pic from '@/assets/images/default_userpic.png'
export default {
  middleware: 'auth',
  async asyncData ({ store }) {
    let { gender, name, idealWeight, height, user_pic } = store.state.userInfo
    return {
      settings: [{
        label: '昵称',
        value: name
      }, {
        label: '性别',
        value: gender
      }, {
        label: '目标体重',
        value: idealWeight
      }, {
        label: '身高',
        value: height
      }],
      user_pic: user_pic,
      default_pic: default_pic,
      baseURL: store.state.baseURL,
      temp_pic: ''
    }
  },
  methods: {
    // 选取图片
    selecimg () {
      let reads = new FileReader()
      let file = this.$refs.selecpic.files[0]
      reads.readAsDataURL(file)
      reads.onload = (e) => {
        this.user_pic = ''
        this.temp_pic = e.target.result
      }

    },
    // 保存设置
    savesetting () {
      let formData = new FormData()
      let file = this.$refs.selecpic.files[0];
      if (file) {
        formData.append('file', file)
      }
      let data = {
        name: this.settings[0].value,
        gender: this.settings[1].value,
        idealWeight: this.settings[2].value,
        height: this.settings[3].value
      }
      formData.append('userInfo', JSON.stringify(data))
      this.$axios.setUserInfo(formData).then(({ code,data }) => {
        if (code == 2000) {
          this.$message.success('信息保存成功')
          this.$store.commit('setUserInfo', data)
        }

      })
    },
    // 退出登录
    outLog () {
      this.$cookie.delete('user_token')
      this.$store.commit('clearUserInfo')
      this.$message('您已成功退出登录')
      this.$router.replace('/')
    }
  },
}
</script>

<style lang="scss" scoped>
.Personal {
  width: 800px;
  margin: auto;
  padding-top: 40px;
}
.userpic {
  img {
    width: 140px;
    height: 140px;
    border-radius: 50%;
    object-fit: cover;
    margin-right: 40px;
  }
  button {
    position: relative;
  }
  input {
    width: 100%;
    height: 100%;
    opacity: 0;
    display: inline-block;
    position: absolute;
    top: 0;
    left: 0;
  }
}
li {
  border-bottom: $border-solid;
  line-height: 80px;
  font-size: 16px;
  padding: 0 40px;
  > label {
    display: inline-block;
    width: 100px;
    color: $gray;
    margin-right: 40px;
  }
  > input {
    border: 1px solid rgba($green, 0.2);
    background-color: rgba($green, 0.08);
    border-radius: 6px;
    padding: 0 10px;
    font-size: 16px;
    height: 30px;
    color: $black;
  }
}
.btn {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  button {
    margin: 0 20px;
  }
}
</style>


