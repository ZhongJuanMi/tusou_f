import * as THREE from 'three'
import { getRandom } from '../../../utils/tools'
const Colors = {
  red: 0xf56c6c,
  white: 0xd8d0d1,
  brown: 0x59332e,
  pink: 0xf5986e,
  brownDark: 0x23190f,
  blue: 0x68c3c0,
  yellow: 0xe6a23c,
  gray: 0x969696,
  green: 0x67c23a
}
const color = [
  Colors.red,
  Colors.white,
  Colors.pink,
  Colors.blue,
  Colors.yellow
]
// 篮子上的绳子对象
class Line {
  constructor(x, y, z, xr, yr, zr) {
    this.mesh = new THREE.Object3D()
    let geomLine = new THREE.BoxGeometry(1, 40, 1, 1, 1, 1)
    let matLine = new THREE.MeshLambertMaterial({
      color: Colors.red,
      flatShading: THREE.FlatShading,
      wireframe: true
    })
    this.mesh = new THREE.Mesh(geomLine, matLine)
    this.mesh.position.set(x, y, z)
    this.mesh.rotation.set(xr, yr, zr)
    this.mesh.castShadow = true
    this.mesh.receiveShadow = true
  }
}
// 热气球对象
export class HotAirBalloon {
  constructor() {
    this.mesh = new THREE.Object3D()
    // 创建气球
    // 创建一个球体
    let geomBall = new THREE.SphereGeometry(
      35,
      20,
      20,
      0,
      Math.PI * 2,
      0,
      (Math.PI * 7) / 8
    )
    // 创建材质
    let matBall = new THREE.MeshPhongMaterial({
      color: Colors.pink,
      flatShading: THREE.FlatShading
      // wireframe: true
    })
    let ball = new THREE.Mesh(geomBall, matBall)
    ball.castShadow = true
    ball.receiveShadow = true
    this.mesh.add(ball)
  }
}
// 篮子
export class Basket {
  constructor() {
    this.mesh = new THREE.Object3D()
    // 创建篮子
    // let geomBasket = new THREE.BoxGeometry(20, 8, 20)
    let geomBasket = new THREE.SphereGeometry(
      12,
      20,
      20,
      0,
      Math.PI * 2,
      (Math.PI * 1) / 2,
      Math.PI
    )
    let matBasketmat = new THREE.MeshLambertMaterial({
      color: Colors.red,
      flatShading: THREE.FlatShading,
      wireframe: true
    })
    let basket = new THREE.Mesh(geomBasket, matBasketmat)
    basket.castShadow = true
    basket.receiveShadow = true
    this.mesh.add(basket)
    // 绳子
    let line1 = new Line(-12, 10, -6, -0.2, -0.3, 0.3)
    let line2 = new Line(-12, 10, 6, 0.3, -0.3, 0.3)
    let line3 = new Line(12, 10, -6, -0.3, -0.3, -0.3)
    let line4 = new Line(12, 10, 6, 0.2, -0.3, -0.3)
    this.mesh.add(line1.mesh)
    this.mesh.add(line2.mesh)
    this.mesh.add(line3.mesh)
    this.mesh.add(line4.mesh)
  }
}
// 兔砸
export class Tz {
  constructor() {
    this.mesh = new THREE.Object3D()
    // 兔砸的身体
    let geomBody = new THREE.SphereBufferGeometry(4)
    let matBody = new THREE.MeshPhongMaterial({
      color: Colors.gray,
      flatShading: THREE.FlatShading
      // wireframe: true
    })
    let body = new THREE.Mesh(geomBody, matBody)
    body.castShadow = true
    body.receiveShadow = true
    this.mesh.add(body)
    // 兔砸的脑袋
    let geomHead = new THREE.SphereBufferGeometry(5)
    let matHead = new THREE.MeshPhongMaterial({
      color: Colors.gray,
      flatShading: THREE.FlatShading
      // wireframe: true
    })
    let head = new THREE.Mesh(geomHead, matHead)
    head.position.y = 8
    head.castShadow = true
    head.receiveShadow = true
    this.mesh.add(head)
    // 兔砸眼睛
    this.eye = new THREE.Object3D()
    let geomEye = new THREE.SphereGeometry(1.5)
    let matEye = new THREE.MeshLambertMaterial({ color: Colors.white })
    let eyeR = new THREE.Mesh(geomEye, matEye)
    eyeR.castShadow = true
    eyeR.receiveShadow = true
    eyeR.position.x = 2
    // 瞳孔
    let geomEyeC = new THREE.SphereGeometry(0.9)
    let matEyeC = new THREE.MeshPhongMaterial({ color: Colors.brownDark })
    let eyeCR = new THREE.Mesh(geomEyeC, matEyeC)
    eyeCR.castShadow = true
    eyeCR.receiveShadow = true
    eyeCR.position.set(2, -0.1, 1)
    let eyeL = eyeR.clone()
    let eyeCL = eyeCR.clone()
    eyeL.position.x = -eyeR.position.x
    eyeCL.position.x = -eyeCR.position.x
    this.eye.add(eyeL)
    this.eye.add(eyeR)
    this.eye.add(eyeCL)
    this.eye.add(eyeCR)
    this.eye.position.set(0, 9, 4)
    this.mesh.add(this.eye)
    // 兔砸耳朵
    let ear = new THREE.Object3D()
    let pointsEar = []
    for (let i = 0; i < 12; i++) {
      pointsEar.push(new THREE.Vector2(Math.sin(i * 0.02) * 5, (i - 5) * 1))
    }
    let matEar = new THREE.MeshLambertMaterial({ color: Colors.gray })
    // 耳朵底
    let geomEarD = new THREE.LatheGeometry(pointsEar)
    let earD = new THREE.Mesh(geomEarD, matEar)
    // 耳朵顶
    let geomEarT = new THREE.SphereBufferGeometry(
      2,
      6,
      8,
      0,
      Math.PI * 2,
      0,
      (Math.PI / 5) * 2
    )
    let earT = new THREE.Mesh(geomEarT, matEar)
    earT.position.set(0.1, 4.8, 1)
    earT.rotation.z = -0.2
    // 右边耳朵
    this.earR = new THREE.Object3D()
    this.earR.add(earT)
    earT.castShadow = true
    earT.receiveShadow = true
    this.earR.add(earD)
    earD.castShadow = true
    earD.receiveShadow = true
    this.earR.add(earD)
    this.earR.rotation.z = -0.2
    this.earR.position.set(1, 10, 0)
    // 左边耳朵
    this.earL = this.earR.clone()
    this.earL.rotation.z = -this.earR.rotation.z
    this.earL.position.x = -this.earR.position.x
    this.earL.children[0].position.x = -this.earR.children[0].position.x
    this.earL.children[0].rotation.z = -this.earR.children[0].rotation.z
    ear.scale.set(1.2, 1.2, 1.2)
    ear.add(this.earR)
    ear.add(this.earL)
    this.mesh.add(ear)

    // 兔砸手
    let hand = new THREE.Object3D()
    let handR = this.earR.clone()
    let handL = this.earL.clone()
    handR.position.x = 3
    handL.position.x = -3
    handR.rotation.z = -0.4
    handL.rotation.z = 0.4
    hand.position.set(0, -5, -3)
    hand.rotation.set(0.6, 0, 0)
    hand.add(handR)
    hand.add(handL)
    this.mesh.add(hand)
    this.mesh.castShadow = true
    this.mesh.receiveShadow = true
  }
  updateEyes() {
    setInterval(() => {
      this.eye.scale.y = 0.05
      setTimeout(() => {
        this.eye.scale.y = 1
      }, 200)
    }, 3000)
  }
  updateEars() {
    setInterval(() => {
      this.earR.rotation.z = -0.4
      this.earL.rotation.z = 0.4
      let that = this
      setTimeout(() => {
        that.earR.rotation.z = -0.2
        that.earL.rotation.z = 0.2
      }, 100)
      setTimeout(() => {
        that.earR.rotation.z = -0.4
        that.earL.rotation.z = 0.4
      }, 200)
      setTimeout(() => {
        that.earR.rotation.z = -0.2
        that.earL.rotation.z = 0.2
      }, 300)
    }, 2800)
  }
}
export class Sea {
  constructor() {
    // 地表
    let geomEarth = new THREE.CylinderGeometry(
      window.innerWidth / 4,
      1,
      40,
      50,
      50
    )
    geomEarth.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2))
    // 重点：通过合并顶点，我们确保海浪的连续性
    geomEarth.mergeVertices()
    // 获得顶点
    var l = geomEarth.vertices.length

    // 创建一个新的数组存储与每个顶点关联的值：
    this.waves = []

    for (var i = 0; i < l; i++) {
      // 获取每个顶点
      var v = geomEarth.vertices[i]

      // 存储一些关联的数值
      this.waves.push({
        y: v.y,
        x: v.x,
        z: v.z,
        // 随机角度
        ang: Math.random() * Math.PI * 2,
        // 随机距离
        amp: 5 + Math.random() * 15,
        // 在0.016至0.048度/帧之间的随机速度
        speed: 0.016 + Math.random() * 0.032
      })
    }
    let matEarth = new THREE.MeshPhongMaterial({
      color: Colors.blue,
      flatShading: THREE.FlatShading,
      transparent: true,
      opacity: 0.9
    })
    this.mesh = new THREE.Mesh(geomEarth, matEarth)
    this.mesh.receiveShadow = true
  }
  moveWaves() {
    // 获取顶点
    var verts = this.mesh.geometry.vertices
    var l = verts.length

    for (var i = 0; i < l; i++) {
      var v = verts[i]

      // 获取关联的值
      var vprops = this.waves[i]

      // 更新顶点的位置
      v.x = vprops.x + Math.cos(vprops.ang) * vprops.amp
      v.y = vprops.y + Math.sin(vprops.ang) * vprops.amp

      // 下一帧自增一个角度
      vprops.ang += vprops.speed
    }

    // 告诉渲染器代表大海的几何体发生改变
    // 事实上，为了维持最好的性能
    // Three.js 会缓存几何体和忽略一些修改
    // 除非加上这句
    this.mesh.geometry.verticesNeedUpdate = true

    this.mesh.rotation.z += 0.0005
  }
}
