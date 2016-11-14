import Shape from './Shape'

export default class ShapeContainer extends Shape {
  constructor (context = null, x = 0, y = 0, z = 0, distance = Number.MAX_SAFE_INTEGER) {
    super(context, x, y, z, distance)
    this.rotationX = 0
    this.rotationY = 0
    this.rotationZ = 0
    this.list = []
  }

  reset () {
    if (this.list) {
      this.list.forEach((entity, i) => {
        this.remove(i)
      })
    } else {
      this.list = []
    }
  }

  add (entity) {
    for (let i = 0; i < this.list.length + 1; i++) {
      if (!this.list[i]) {
        entity.context = this.context
        entity.distance = this.distance
        this.list[i] = entity
        return i
      }
    }
    return -1
  }

  remove (index) {
    const entity = this.list[index]
    if (entity) {
      this.list[index] = null
    }
  }

  update (elapsed) {
    super.update(elapsed)
    this.list.forEach((entity, i) => {
      if (entity) {
        const { x: rotatedX, y: rotatedY, z: rotatedZ } = ShapeContainer.rotate(entity.x, entity.y, entity.z, this.rotationX, this.rotationY, this.rotationZ)
        entity.worldX = this.worldX + rotatedX
        entity.worldY = this.worldY + rotatedY
        entity.worldZ = this.worldZ + rotatedZ
        entity.map()
        entity.update(elapsed)
      }
    })
  }

  draw () {
    this.list.forEach(entity => {
      entity.draw()
    })
  }
}

ShapeContainer.rotateX = (x, y, z, rotation) => {
  const _y = y * Math.cos(rotation) - z * Math.sin(rotation)
  const _z = y * Math.sin(rotation) + z * Math.cos(rotation)
  return { x, y: _y, z: _z }
}
ShapeContainer.rotateY = (x, y, z, rotation) => {
  const _z = z * Math.cos(rotation) - x * Math.sin(rotation)
  const _x = z * Math.sin(rotation) + x * Math.cos(rotation)
  return { x: _x, y, z: _z }
}
ShapeContainer.rotateZ = (x, y, z, rotation) => {
  const _x = x * Math.cos(rotation) - y * Math.sin(rotation)
  const _y = x * Math.sin(rotation) + y * Math.cos(rotation)
  return { x: _x, y: _y, z }
}
ShapeContainer.rotate = (x, y, z, rotationX, rotationY, rotationZ) => {
  let r = { x, y, z }
  r = ShapeContainer.rotateX(r.x, r.y, r.z, rotationX)
  r = ShapeContainer.rotateY(r.x, r.y, r.z, rotationY)
  r = ShapeContainer.rotateZ(r.x, r.y, r.z, rotationZ)
  return r
}