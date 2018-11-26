<template>
  <div class="Personal">
    <div class="userpic">
      <img
        :src="user_pic?baseURL+user_pic:temp_pic?temp_pic:default_pic"
        alt=""
        @error="user_pic=''"
      >
      <el-button
        type="danger"
        plain
      >更换照片
        <input
          ref="selecpic"
          type="file"
          accept="image/*"
          @change="selecimg"
        >
      </el-button>
    </div>
    <ul>
      <li
        v-for="(item,index) in settings"
        :key="index"
      >
        <label for="">{{ item.label }}</label>
        <input
          v-if="index!=1"
          v-model="item.value"
          type="text"
          @input="verify(index)"
        >
        <el-radio-group
          v-else
          v-model="settings[1].value"
        >
          <el-radio label="male">男</el-radio>
          <el-radio label="female">女</el-radio>

        </el-radio-group>
        <span v-if="err[index]">{{ err[index] }}</span>
      </li>
    </ul>
    <div class="btn">
      <el-button
        type="success"
        round
        @click="savesetting"
      >保存设置</el-button>
      <el-button
        type="warning"
        round
        @click="outLog"
      >退出登录</el-button>
    </div>
  </div>
</template>

<script>
import default_pic from '@/assets/images/default_userpic.png'
export default {
  middleware: 'auth',
  async asyncData({ store }) {
    let { gender, name, idealWeight, height, user_pic } = store.state.userInfo
    return {
      settings: [
        {
          label: '昵称',
          value: name
        },
        {
          label: '性别',
          value: gender
        },
        {
          label: '目标体重',
          value: idealWeight
        },
        {
          label: '身高',
          value: height
        }
      ],
      user_pic: user_pic,
      default_pic: default_pic,
      baseURL: store.state.baseURL,
      temp_pic: '',
      err: ['', '', '', '']
    }
  },
  methods: {
    // 验证
    verify(index) {
      switch (index) {
        case 0:
          this.verifyname()
          break
        case 2:
          this.verifyweight()
          break
        case 3:
          this.verifyheight()
          break
      }
    },
    // 验证昵称是否可用
    verifyname() {
      if (this.settings[0].value == this.$store.state.userInfo.name) {
        this.err[0] = ''
        return
      }
      this.$axios.ifreged(this.settings[0].value).then(res => {
        if (res.data) {
          this.err[0] = '此昵称已注册,重新选个名字叭~'
        } else {
          this.err[0] = ''
        }
      })
    },
    // 验证目标体重
    verifyweight() {
      let value = this.settings[2].value
      if (!value) {
        this.err[2] = ''
        return
      }
      if (!Number(value) || value > 100 || value < 40) {
        this.err[2] = '请输入真实的体重值'
      } else {
        this.err[2] = ''
      }
    },
    // 验证身高
    verifyheight() {
      let value = this.settings[3].value
      if (!value) {
        this.err[3] = ''
        return
      }
      if (!Number(value) || value > 200 || value < 100) {
        this.err[3] = '请输入真实的身高值'
      } else {
        this.err[3] = ''
      }
    },
    // 选取图片实时显示
    selecimg() {
      let reads = new FileReader()
      let file = this.$refs.selecpic.files[0]
      reads.readAsDataURL(file)
      reads.onload = e => {
        this.user_pic = ''
        this.temp_pic = e.target.result
      }
    },
    // 保存设置
    savesetting() {
      if (this.err.filter(item => item).length > 0) {
        this.$message.error('填写错误,请按提示修改')
        return
      }
      let formData = new FormData()
      let file = this.$refs.selecpic.files[0]
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
      this.$axios.setUserInfo(formData).then(({ code, data }) => {
        if (code == 2000) {
          this.$message.success('信息保存成功')
          this.$store.commit('setUserInfo', data)
        }
      })
    },
    // 退出登录
    outLog() {
      this.$cookie.delete('user_token')
      this.$store.commit('clearUserInfo')
      this.$message('您已成功退出登录')
      this.$router.replace('/')
    }
  }
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
  > span {
    font-size: 14px;
    color: #f00;
    margin-left: 10px;
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
