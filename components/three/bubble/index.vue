<template>
  <div
    ref="bubble"
    class="bubble"
  />
</template>

<script>
import * as THREE from 'three'
import { Bubble, Sky } from './class'
import { getRandom } from '../../../utils/tools'
export default {
  data() {
    return {
      // 场景
      scene: null,
      // 相机
      camera: null,
      // 渲染器
      renderer: null,
      // 天空
      sky: null,
      height: null,
      width: null,
      mousePos: {
        x: null,
        y: null
      }
    }
  },
  mounted() {
    this.init()
    this.createSky()
    // 循环动画
    this.loop()
  },
  methods: {
    init() {
      this.width = window.innerWidth
      this.height = window.innerHeight
      // 创建场景，相机和渲染器
      this.createScene()
      // 创建光源
      this.createLights()
      //添加监听器
      document.addEventListener('mousemove', this.handleMouseMove, false)
    },
    createScene() {
      // 创建场景
      this.scene = new THREE.Scene()
      // 创建相机
      let aspectRatio = this.width / this.height
      let fieldOfView = 50
      let nearPlane = 1
      let farPlane = 10000
      /**
       * PerspectiveCamera 透视相机
       * @param fieldOfView 视角
       * @param aspectRatio 纵横比
       * @param nearPlane 近平面
       * @param farPlane 远平面
       */
      this.camera = new THREE.PerspectiveCamera(
        fieldOfView,
        aspectRatio,
        nearPlane,
        farPlane
      )

      // 设置相机的位置
      this.camera.position.x = 0
      this.camera.position.z = 200
      this.camera.position.y = 100

      // 创建渲染器
      this.renderer = new THREE.WebGLRenderer({
        // 在 css 中设置背景色透明显示渐变色
        alpha: true,
        // 开启抗锯齿，但这样会降低性能。
        // 不过，由于我们的项目基于低多边形的，那还好
        antialias: true
      })
      // 定义渲染器的尺寸；在这里它会填满整个屏幕
      this.renderer.setSize(this.width, this.height)
      // 打开渲染器的阴影地图
      this.renderer.shadowMap.enabled = true
      // 在 HTML 创建的容器中添加渲染器的 DOM 元素
      let container = this.$refs.bubble
      container.appendChild(this.renderer.domElement)
      // 监听屏幕，缩放屏幕更新相机和渲染器的尺寸
      window.addEventListener('resize', this.handleWindowResize, false)
    },
    // 更新渲染器的高度和宽度以及相机的纵横比
    handleWindowResize() {
      this.height = window.innerHeight
      this.width = window.innerWidth
      this.renderer.setSize(this.width, this.height)
      this.camera.aspect = this.width / this.height
      this.camera.updateProjectionMatrix()
    },
    // 添加光源
    createLights() {
      // 半球光就是渐变的光；
      // 第一个参数是天空的颜色，第二个参数是地上的颜色，第三个参数是光源的强度
      let hemisphereLight = new THREE.HemisphereLight(0xffffff, 0xff0000, 0.5)

      // 方向光是从一个特定的方向的照射
      // 类似太阳，即所有光源是平行的
      // 第一个参数是关系颜色，第二个参数是光源强度
      let shadowLight = new THREE.DirectionalLight(0xffff00, 0.9)

      // 设置光源的方向。
      // 位置不同，方向光作用于物体的面也不同，看到的颜色也不同
      shadowLight.position.set(350, 350, 350)

      // 开启光源投影
      shadowLight.castShadow = true

      // 定义可见域的投射阴影
      shadowLight.shadow.camera.left = -300
      shadowLight.shadow.camera.right = 300
      shadowLight.shadow.camera.top = 300
      shadowLight.shadow.camera.bottom = -300
      shadowLight.shadow.camera.near = 1
      shadowLight.shadow.camera.far = 1000

      // 定义阴影的分辨率；虽然分辨率越高越好，但是需要付出更加昂贵的代价维持高性能的表现。
      shadowLight.shadow.mapSize.width = 2048
      shadowLight.shadow.mapSize.height = 2048
      // 环境光源修改场景中的全局颜色和使阴影更加柔和
      let ambientLight = new THREE.AmbientLight(0xdc8874, 0.5)
      // 为了使这些光源呈现效果，只需要将它们添加到场景中
      this.scene.add(hemisphereLight)
      this.scene.add(shadowLight)
      this.scene.add(ambientLight)
    },
    createSky() {
      this.sky = new Sky()
      this.scene.add(this.sky.mesh)
      this.sky.mesh.position.y = 100
    },
    loop() {
      this.updateCamara()
      this.sky.moveBubble()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.loop)
    },
    handleMouseMove(event) {
      // 这里我把接收到的鼠标位置的值转换成归一化值，在-1与1之间变化
      // 这是x轴的公式:

      let tx = -1 + (event.clientX / this.width) * 2

      // 对于 y 轴，我们需要一个逆公式
      // 因为 2D 的 y 轴与 3D 的 y 轴方向相反

      let ty = 1 - (event.clientY / this.height) * 2
      this.mousePos = { x: tx, y: ty }
    },
    updateCamara() {
      // 让我们在x轴上-40至40之间和y轴80至160之间移动热气球
      // 根据鼠标的位置在-1与1之间的范围，我们使用的 normalize 函数实现（如下）
      let targetX = this.normalize(this.mousePos.x, -0.75, 0.75, -10, 10)
      let targetY = this.normalize(this.mousePos.y, -0.75, 0.75, 90, 110)
      // 在每帧通过添加剩余距离的一小部分的值移动热气球
      this.camera.position.y += (targetY - this.camera.position.y) * 0.1
      this.camera.position.x += (targetX - this.camera.position.x) * 0.1
      this.camera.position.z += (targetY - this.camera.position.y) * 0.05
    },
    normalize(v, vmin, vmax, tmin, tmax) {
      let nv = Math.max(Math.min(v, vmax), vmin)
      let dv = vmax - vmin
      let pc = (nv - vmin) / dv
      let dt = tmax - tmin
      let tv = tmin + pc * dt
      return tv
    }
  }
}
</script>

<style lang="scss" scoped>
.bubble {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(#ffeaea, #ffffff);
}
</style>
