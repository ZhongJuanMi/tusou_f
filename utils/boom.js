import { getRandom } from './tools.js'
class Boom {
  constructor(x, r, c, boomArea, shape, canvas) {
    this.booms = []
    this.x = x
    this.y = canvas.height + r
    this.r = r
    this.c = c
    this.shape = shape || false
    this.boomArea = boomArea
    this.theta = 0
    this.dead = false
    this.ba = parseInt(getRandom(80, 200))
  }
  _paint() {
    ctx.save()
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r, 0, 2 * Math.PI)
    ctx.fillStyle = this.c
    ctx.fill()
    ctx.restore()
  }
  _move() {
    var dx = this.boomArea.x - this.x,
      dy = this.boomArea.y - this.y
    this.x = this.x + dx * 0.01
    this.y = this.y + dy * 0.01

    if (Math.abs(dx) <= this.ba && Math.abs(dy) <= this.ba) {
      if (this.shape) {
        this._shapBoom()
      } else this._boom()
      this.dead = true
    } else {
      this._paint()
    }
  }
  _drawLight() {
    ctx.save()
    ctx.fillStyle = 'rgba(255,228,150,0.3)'
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.r + 3 * Math.random() + 1, 0, 2 * Math.PI)
    ctx.fill()
    ctx.restore()
  }
  _boom() {
    var fragNum = getRandom(30, 200)
    var style = getRandom(0, 10) >= 5 ? 1 : 2
    var color
    if (style === 1) {
      color = {
        a: parseInt(getRandom(128, 255)),
        b: parseInt(getRandom(128, 255)),
        c: parseInt(getRandom(128, 255))
      }
    }

    var fanwei = parseInt(getRandom(300, 400))
    for (var i = 0; i < fragNum; i++) {
      if (style === 2) {
        color = {
          a: parseInt(getRandom(128, 255)),
          b: parseInt(getRandom(128, 255)),
          c: parseInt(getRandom(128, 255))
        }
      }
      var a = getRandom(-Math.PI, Math.PI)
      var x = getRandom(0, fanwei) * Math.cos(a) + this.x
      var y = getRandom(0, fanwei) * Math.sin(a) + this.y
      var radius = getRandom(0, 2)
      var frag = new Frag(this.x, this.y, radius, color, x, y)
      this.booms.push(frag)
    }
  }
  _shapBoom() {
    var that = this
    putValue(ocas, octx, this.shape, 5, function(dots) {
      var dx = canvas.width / 2 - that.x
      var dy = canvas.height / 2 - that.y
      for (var i = 0; i < dots.length; i++) {
        color = {
          a: dots[i].a,
          b: dots[i].b,
          c: dots[i].c
        }
        var x = dots[i].x
        var y = dots[i].y
        var radius = 1
        var frag = new Frag(that.x, that.y, radius, color, x - dx, y - dy)
        that.booms.push(frag)
      }
    })
  }
}
export default Boom
