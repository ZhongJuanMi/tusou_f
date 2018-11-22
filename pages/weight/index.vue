<template>
  <div class="weight">
    <div class="weight_c">

      <div class="weight_cb">
        <!-- <el-button type="warning"
                   round
                   @click="infoDialogVisible=true">个人信息</el-button> -->
        <el-button type="danger"
                   round
                   @click="weightDialogVisible=true">记录体重</el-button>
      </div>
      <div class="weight_ct">

        <zjChart :weights='weights'
                 v-if="weights.length" />
      </div>

      <zjInfoDialog v-model="infoDialogVisible" />
      <zjWeightDialog v-model="weightDialogVisible"
                      @refresh='getWeight' />
    </div>
    <div v-if="tips"
         class="weight_tips" @click="tips=false">
      <div class="weight_tips_c">
        <div class="weight_tips_c_t" v-if="tipst">
          <p><i class="iconfont icon-tishi"></i>你还没有设置个人信息哦~</p>
          <p>点击上方设置，可比对标准体重与目标体重</p>
        </div>
         <div class="weight_tips_c_b" v-if="!weights.length">
          <p><i class="iconfont icon-tishi"></i> 点击上方设置实际体重</p>
        </div>
        <div class="weight_tips_c_btn">
          <el-button round
                     type="warning" @click="tips=false">好哒,我知道啦</el-button>
        </div>
      </div>

    </div>
  </div>
</template>
<script>
import zjChart from '~/components/weight/chart'
import zjInfoDialog from '~/components/weight/infoDialog'
import zjWeightDialog from '~/components/weight/weightDialog'
export default {
  middleware: 'auth',
  async asyncData ({ $axios }) {
    let { data } = await $axios.get('/api/weights/getWeight')
    return {
      weights: data.data.weights
    }
  },
  data () {
    return {
      infoDialogVisible: false,
      weightDialogVisible: false,
      tipst:this.$store.state.userInfo.idealWeight<=0,
      tips:this.tipst||!this.weights||!this.weights.length
    }
  },
  components: {
    zjChart,
    zjInfoDialog,
    zjWeightDialog
  },
  methods: {
    getWeight () {
      this.$axios.get('/api/weights/getWeight').then(({ data }) => {
        this.weights = data.data.weights
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.weight {
  width: 100%;
  // background-image: url(/assets/images/weight.jpg) center;
  background-size: 100vw;
  height: calc(100vh - 61px);
  position: relative;
  &_c {
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
    &n {
      font-size: 20px;
      color: $primary;
      margin-left: 50px;
      margin-bottom: 50px;
      &:first-child {
        color: $black;
      }
    }
    &b {
      width: 100px;
      height: 250px;
    }
    &t {
      min-height: 250px;
    }
  }
  &_tips {
    width: 100%;
    height: 100vh;
    background-color: rgba($black, .8);
    position: fixed;
    top: 0;
    left: 0;
    z-index: $z-index_tips;
    &_c {
      width: 1200px;
      height: 100vh;
      margin: auto;
      position: relative;
      &_t {
        width: 320px;
        height: 209px;
        box-sizing: border-box;
        padding: 80px 48px 0;
        position: absolute;
        right: 64px;
        top: 30px;
        background: url(/assets/images/dialog.png) center no-repeat;
        font-size: 16px;
        color: #fff;
        z-index: $zindex_up;
        animation: $updown;
        line-height: 30px;
        animation-delay: 2s;
        i {
          color: $black;
          font-size: 20px;
          margin-right: 5px;
        }
      }
      &_b {
            width: 260px;
    height: 170px;
        box-sizing: border-box;
        padding: 90px 28px 0;
        position: absolute;
        left: 50%;
        top: 50%;
        margin-top: -64px;
        background: url(/assets/images/dialog_l.png) center no-repeat;
        background-size: 260px;
        font-size: 16px;
         color: #fff;
        z-index: $zindex_up;
        animation: $updown;
        line-height: 30px;
        i {
          color: $black;
          font-size: 20px;
          margin-right: 5px;
        }
      }
      &_btn{
        position: absolute;
        bottom: 10%;
        left: 50%;
        margin-left: -50px;
      }
    }
  }
}
</style>


