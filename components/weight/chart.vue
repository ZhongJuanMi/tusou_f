<template>
  <div id="chartBox">
    <!-- <p>{{weightall}}</p> -->
  </div>

</template>
<script>
import echarts from 'echarts/lib/echarts'
// 引入曲线图
require('echarts/lib/chart/line')
// 引入提示框和标题组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/title')
require('echarts/lib/component/legend')
require('echarts/lib/component/toolbox')
require('echarts/lib/component/dataZoom')
require('echarts/lib/component/markLine')
require('echarts/lib/component/visualMap')
export default {
  props: {
    weights: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      note: false
    }
  },
  computed: {
    userInfo() {
      return this.$store.state.userInfo
    },
    weightall() {
      return this.weights
        .map(item => {
          return item.AM * 1 > item.PM * 1 ? item.AM * 1 : item.PM * 1
        })
        .sort((a, b) => a - b)
    },
    min() {
      return this.weightall[0]
    },
    max() {
      return this.weightall[this.weightall.length - 1]
    }
  },
  watch: {
    weights: {
      handler(curVal, oldVal) {
        if (curVal.length) {
          this.draw()
        }
      },
      deep: true
    },
    userInfo: {
      handler() {
        this.draw()
      },
      deep: true
    }
  },
  mounted() {
    if (this.weights.length) {
      this.draw()
    }
  },
  methods: {
    draw() {
      // 目标体重
      // 标准体重
      let userInfo = this.$store.state.userInfo
      let idealWeight = userInfo.idealWeight ? userInfo.idealWeight : 0
      let height = userInfo.height ? userInfo.height : 0
      let normalWeight = parseInt(22 * height * height * 0.0001)
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('chartBox'))
      // 绘制图表
      myChart.setOption({
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          left: 80,
          tooltip: {
            show: true
          }
        },
        xAxis: {
          data: this.weights.map(item => item.date)
        },
        yAxis: {
          splitLine: {
            show: false
          },
          min: this.min * 1 < idealWeight * 1 ? this.min : idealWeight,
          max: this.max * 1 > normalWeight * 1 ? this.max : normalWeight
        },
        toolbox: {
          left: 'center',
          feature: {
            // dataZoom: {
            //   yAxisIndex: 'none'
            // },
            restore: {},
            saveAsImage: {}
          }
        },
        dataZoom: [
          {
            type: 'inside'
          }
        ],
        visualMap: {
          top: 0,
          right: 0,
          pieces: !idealWeight
            ? []
            : [
                {
                  gt: 0,
                  lte: idealWeight,
                  color: '#409EFF'
                },
                {
                  gt: idealWeight,
                  lte: normalWeight,
                  color: '#67C23A'
                },
                {
                  gt: normalWeight,
                  color: '#f56c6c'
                }
              ]
        },
        series: [
          {
            name: '早晨',
            type: 'line',
            smooth: true,
            connectNulls: true,
            data: this.weights.map(item => {
              return item.AM
            }),
            markLine: {
              silent: true,
              data: [
                {
                  yAxis: idealWeight,
                  label: {
                    position: 'middle',
                    formatter: '目标体重'
                  },
                  lineStyle: {
                    color: '#409EFF'
                  }
                },
                {
                  yAxis: normalWeight,
                  label: {
                    position: 'middle',
                    formatter: '标准体重'
                  },
                  lineStyle: {
                    color: '#f56c6c'
                  }
                }
              ]
            }
          },
          {
            name: '晚上',
            type: 'line',
            smooth: true,
            connectNulls: true,
            data: this.weights.map(item => {
              return item.PM
            }),
            markLine: {
              silent: true,
              data: [
                {
                  yAxis: idealWeight,
                  label: {
                    position: 'middle',
                    formatter: '目标体重'
                  },
                  lineStyle: {
                    color: '#409EFF'
                  }
                },
                {
                  yAxis: normalWeight,
                  label: {
                    position: 'middle',
                    formatter: '标准体重'
                  },
                  lineStyle: {
                    color: '#67C23A'
                  }
                }
              ]
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="scss" scoped>
#chartBox {
  width: 800px;
  height: 360px;
}
</style>
