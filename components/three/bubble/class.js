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
  Colors.brown,
  Colors.pink,
  Colors.blue,
  Colors.yellow,
  Colors.brownDark,
  Colors.gray,
  Colors.green
]
export class Bubble {
  constructor(z) {
    this.color = `rgb(${getRandom(0, 220)}, ${getRandom(0, 220)}, ${getRandom(
      0,
      220
    )})`
    this.r = getRandom(3, 8)
    this.x = getRandom(-220, 220)
    this.y = getRandom(-120, 120)
    this.mesh = null
  }
  init(z) {
    let geomBubble = new THREE.SphereGeometry(this.r, 20, 20)
    let matBubble = new THREE.MeshPhongMaterial({
      color: this.color,
      transparent: true,
      opacity: 0.6,
      flatShading: THREE.FlatShading
    })
    this.mesh = new THREE.Mesh(geomBubble, matBubble)
    this.mesh.position.set(this.x, this.y, z)
    this.mesh.speed = getRandom(1, 10)
  }
}
export class Sky {
  constructor() {
    this.mesh = new THREE.Object3D()
    let z = -50
    for (let i = 0; i < 20; i++) {
      let bubble = new Bubble()
      z += bubble.r + 0.1
      if (z > 10) {
        z = -50
      }
      bubble.init(z)
      this.mesh.add(bubble.mesh)
    }
  }
  moveBubble() {
    for (let i = 0; i < this.mesh.children.length; i++) {
      let _bubble = this.mesh.children[i]
      _bubble.position.y += 0.05 * _bubble.speed
      _bubble.position.x -= 0.08
      _bubble.rotation.y += 0.001 * _bubble.speed
      if (_bubble.position.y > 140) {
        _bubble.position.y = -140
      }
      if (_bubble.position.x < -240) {
        _bubble.position.x = 240
      }
    }
  }
}
