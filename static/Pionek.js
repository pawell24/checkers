class Pionek extends THREE.Mesh {
  constructor(color, kolorek, base, i, j) {
    let geometry = new THREE.CylinderGeometry(10, 10, 10, 40, 1)

    let material = new THREE.MeshBasicMaterial({ color: color })

    super(geometry, material)

    this.name = 'pawn'
    this._color = color
    this.kolorek = kolorek
    this.base = base

    this.i = i
    this.j = j
  }

  set color(val) {
    this._color = val
  }
  get color() {
    return this._color
  }

  click(kolorek) {
    if (kolorek == 'white') {
      this.kolorek = kolorek
      this.material.color.setHex('0xFFFFFF')
    }

    if (kolorek == 'black') {
      this.kolorek = kolorek
      this.material.color.setHex('0x000000')
    }

    if (kolorek == 'yellow') {
      this.kolorek = kolorek
      this.material.color.setHex('0xFFFF00')
    }
  }

  move(i, j) {
    this.position.z = 30 * j - 120
    this.position.x = i * 30 - 120
    this.i = i
    this.j = j
  }
}
