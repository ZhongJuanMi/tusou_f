<template>
  <div
    ref="airplane"
    class="airplane"
  />
</template>

<script>
import * as THREE from 'three'
import { Sea, Sky, Cloud, AirPlane, Pilot } from './class'
export default {
  data() {
    return {
      // 场景
      scene: null,
      // 相机
      camera: null,
      sea: null,
      sky: null,
      skyPlane: null,
      pilot: null,
      // 渲染器
      renderer: null,
      // 鼠标点
      mousePos: {
        x: 0,
        y: 0
      },
      width: null,
      height: null
    }
  },
  mounted() {
    this.init()
    this.$notify({
      title: '声明',
      message: '此动画非原创',
      type: 'info'
    })
  },
  methods: {
    init() {
      // 创建场景，相机和渲染器
      this.createScene()
      // 添加光源
      this.createLights()
      // 添加对象
      this.createPlane()
      this.createSea()
      this.createSky()
      //添加监听器
      document.addEventListener('mousemove', this.handleMouseMove, false)
      // 调用循环函数，在每帧更新对象的位置和渲染场景
      this.loop()
    },
    // 创建场景，相机和渲染器
    createScene() {
      // 创建场景
      this.scene = new THREE.Scene()

      // 在场景中添加雾的效果；样式上使用和背景一样的颜色
      this.scene.fog = new THREE.Fog(0xf7d9aa, 100, 950)

      this.width = window.innerWidth
      this.height = window.innerHeight
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
      let container = this.$refs.airplane
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
      let hemisphereLight = new THREE.HemisphereLight(0xaaaaaa, 0x000000, 0.9)

      // 方向光是从一个特定的方向的照射
      // 类似太阳，即所有光源是平行的
      // 第一个参数是关系颜色，第二个参数是光源强度
      let shadowLight = new THREE.DirectionalLight(0xffffff, 0.9)

      // 设置光源的方向。
      // 位置不同，方向光作用于物体的面也不同，看到的颜色也不同
      shadowLight.position.set(150, 350, 350)

      // 开启光源投影
      shadowLight.castShadow = true

      // 定义可见域的投射阴影
      shadowLight.shadow.camera.left = -400
      shadowLight.shadow.camera.right = 400
      shadowLight.shadow.camera.top = 400
      shadowLight.shadow.camera.bottom = -400
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
    // 添加大海
    createSea() {
      this.sea = new Sea()
      // 在场景底部，稍微推挤一下
      this.sea.mesh.position.y = -600
      // 添加大海的网格至场景
      this.scene.add(this.sea.mesh)
    },
    createSky() {
      this.sky = new Sky()
      this.sky.mesh.position.y = -600
      this.scene.add(this.sky.mesh)
    },
    createPlane() {
      this.airplane = new AirPlane()
      this.airplane.mesh.scale.set(0.25, 0.25, 0.25)
      this.airplane.mesh.position.y = 100
      this.pilot = new Pilot()
      this.pilot.mesh.position.set(-10, 27, 0)
      this.airplane.mesh.add(this.pilot.mesh)
      this.scene.add(this.airplane.mesh)
    },
    loop() {
      this.sea.mesh.rotation.z += 0.005
      this.sky.mesh.rotation.z += 0.01

      // 更新每帧的飞机
      this.updatePlane()
      this.pilot.updateHairs()
      this.sea.moveWaves()
      this.renderer.render(this.scene, this.camera)
      requestAnimationFrame(this.loop)
    },
    handleMouseMove(event) {
      // 这里我把接收到的鼠标位置的值转换成归一化值，在-1与1之间变化
      // 这是x轴的公式:

      var tx = -1 + (event.clientX / this.width) * 2

      // 对于 y 轴，我们需要一个逆公式
      // 因为 2D 的 y 轴与 3D 的 y 轴方向相反

      var ty = 1 - (event.clientY / this.height) * 2
      this.mousePos = { x: tx, y: ty }
    },
    updatePlane() {
      // 让我们在x轴上-100至100之间和y轴25至175之间移动飞机
      // 根据鼠标的位置在-1与1之间的范围，我们使用的 normalize 函数实现（如下）
      var targetX = this.normalize(this.mousePos.x, -0.75, 0.75, -100, 100)
      var targetY = this.normalize(this.mousePos.y, -0.75, 0.75, 0.25, 175)
      // 在每帧通过添加剩余距离的一小部分的值移动飞机
      this.airplane.mesh.position.y +=
        (targetY - this.airplane.mesh.position.y) * 0.1
      // 剩余的距离按比例转动飞机
      this.airplane.mesh.rotation.z =
        (targetY - this.airplane.mesh.position.y) * 0.0128
      this.airplane.mesh.rotation.x =
        (this.airplane.mesh.position.y - targetY) * 0.0064
      this.airplane.propeller.rotation.x += 0.3
    },
    normalize(v, vmin, vmax, tmin, tmax) {
      var nv = Math.max(Math.min(v, vmax), vmin)
      var dv = vmax - vmin
      var pc = (nv - vmin) / dv
      var dt = tmax - tmin
      var tv = tmin + pc * dt
      return tv
    }
  }
}
</script>

<style lang="scss" scoped>
.airplane {
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  background: linear-gradient(#ffeaea, #ffffff);
}
</style>
