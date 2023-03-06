class Game {
  constructor(camera_angle, map) {
    this.choosen_pawn = ''
    this.szachownica = [
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
      [0, 1, 0, 1, 0, 1, 0, 1],
      [1, 0, 1, 0, 1, 0, 1, 0],
    ]

    this.pawns_position = map

    this.pawns = []

    this.szachownica_blocks = []

    this.camera_angle = camera_angle

    this.createMap()
    this.render()

    $('#form').css('display', 'none')

    this.addTime()

    this.miniMap()

    this.update_minimap(this.pawns_position)
  }

  miniMap() {
    this.miniMap = []

    $('#map').css('display', 'grid')
    for (let i = 0; i < 8; i++) {
      this.miniMap.push([])
      for (let j = 0; j < 8; j++) {
        let el = $('<div>')
        el.attr('class', 'el_of_map')

        $('#map').append(el)

        this.miniMap[i].push(el)
      }
    }
  }

  update_minimap(map) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        $(this.miniMap[i][j]).text(map[i][j])
      }
    }
  }

  addTime() {
    let div = $('<div>')
    $(div).attr('class', 'time')
    $(div).text('czas: ')

    let xd = $('<div>')
    $(xd).attr('class', 'time')
    $(xd).text('czas: ')

    $('#menu').append(div)

    $('#waiting').append(xd)
  }

  createMap() {
    this.raycaster = new THREE.Raycaster() // obiekt symulujący "rzucanie" promieni
    this.mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie a potem przeliczenia na pozycje 3D

    this.scene = new THREE.Scene()
    this.camera = new THREE.PerspectiveCamera(
      60, // kąt patrzenia kamery (FOV - field of view)
      16 / 9, // proporcje widoku, powinny odpowiadać proporcjom naszego ekranu przeglądarki
      0.1, // minimalna renderowana odległość
      10000 // maksymalna renderowana odległość od kamery
    )

    this.camera.position.y = 200

    this.camera.position.z = 0

    if (this.camera_angle == 1) {
      this.camera.position.x = -200
    }

    if (this.camera_angle == 2) {
      this.camera.position.x = 200
    }

    this.renderer = new THREE.WebGLRenderer()
    this.renderer.setClearColor(0xffffff)
    this.renderer.setSize(window.innerWidth, window.innerHeight - 40)

    $('#root').append(this.renderer.domElement)

    for (let i = 0; i < 8; i++) {
      this.pawns.push([])
      this.szachownica_blocks.push([])

      for (let j = 0; j < 8; j++) {
        let texture

        if (this.szachownica[i][j] == 0) texture = '/textures/bialy.jpg'
        else texture = '/textures/czarny.jpg'

        let cube = new Blok(texture, i, j, this.szachownica[i][j])
        this.szachownica_blocks[i].push(cube)
        this.scene.add(cube)

        /////cylinder

        if (this.pawns_position[i][j] != 0) {
          let color
          let kolorek
          let base

          if (this.pawns_position[i][j] == 2) {
            color = 0x000000
            kolorek = 'black'
            base = 2
          } else {
            color = 0xffffff
            kolorek = 'white'
            base = 1
          }

          let pawn = new Pionek(color, kolorek, base, i, j)

          pawn.position.set(i * 30 - 120, 10, 30 * j - 120)

          this.scene.add(pawn)

          this.pawns[i].push(pawn)
        } else {
          this.pawns[i].push(0)
        }
      }
    }

    this.render() // wywołanie metody render
  }

  render() {
    requestAnimationFrame(this.render.bind(this)) // funkcja bind(this) przekazuje obiekt this do metody render
    this.camera.lookAt(this.scene.position)
    this.renderer.render(this.scene, this.camera)
  }

  resize() {
    this.camera.aspect = window.innerWidth / window.innerHeight
    this.camera.updateProjectionMatrix()
    this.renderer.setSize(window.innerWidth, window.innerHeight)
  }

  raycasterfunction(event) {
    this.mouseVector.x = (event.clientX / $(window).width()) * 2 - 1
    this.mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1

    this.raycaster.setFromCamera(this.mouseVector, this.camera)

    var intersects = this.raycaster.intersectObjects(this.scene.children)

    if (intersects.length > 0) {
      /////wybranie pionka
      if (intersects[0].object.name == 'pawn') {
        let pawn = this.find_pionek(intersects[0].object.uuid)

        for (let i = 0; i < 8; i++) {
          this.pawns[i].forEach((el) => {
            if (el != 0) {
              if (el.base == 1) {
                el.kolorek = 'white'
                el.click('white')
              } else {
                el.kolorek = 'black'
                el.click('black')
              }
            }
          })
        }

        if (this.camera_angle == 1) {
          if (pawn.kolorek == 'white') {
            this.choosen_pawn = pawn

            pawn.click('yellow')
          } else {
            if (pawn.base != 1) {
              this.delete(pawn)
            }
          }
        }
        if (this.camera_angle == 2) {
          if (pawn.kolorek == 'black') {
            this.choosen_pawn = pawn

            pawn.click('yellow')
          } else {
            if (pawn.base != 2) {
              this.delete(pawn)
            }
          }
        }
      }

      ////ruch
      let obok = (blok, i, j, base) => {
        if (base == 2) {
          if (blok.i == i - 1 && blok.j == j - 1) return true
          if (blok.i == i - 1 && blok.j == j + 1) return true
        }

        if (base == 1) {
          if (blok.i == i + 1 && blok.j == j - 1) return true
          if (blok.i == i + 1 && blok.j == j + 1) return true
        }

        return false
      }

      if (intersects[0].object.name == 'blok') {
        let blok = intersects[0].object

        let i = this.choosen_pawn.i
        let j = this.choosen_pawn.j

        let { base } = this.choosen_pawn

        if (this.pawns_position[blok.i][blok.j] == 0 && obok(blok, i, j, base)) {
          this.choosen_pawn.move(blok.i, blok.j)
          this.pawns_position[i][j] = 0

          if (this.choosen_pawn.base == 1) this.pawns_position[blok.i][blok.j] = 1
          else this.pawns_position[blok.i][blok.j] = 2

          net.sendMap(blok.i, blok.j, i, j, this.camera_angle)

          this.update_minimap(this.pawns_position)
        }
      }
    }
  }

  find_pionek(uuid) {
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (this.pawns[i][j] != 0) if (uuid == this.pawns[i][j].uuid) return this.pawns[i][j]
      }
    }
  }

  delete(pawn) {
    this.scene.remove(pawn)

    this.pawns_position[pawn.i][pawn.j] = this.choosen_pawn.base
    this.pawns_position[this.choosen_pawn.i][this.choosen_pawn.j] = 0

    this.pawns[pawn.i][pawn.j] = this.choosen_pawn
    this.pawns[this.choosen_pawn.i][this.choosen_pawn.j] = 0

    net.sendMap(pawn.i, pawn.j, this.choosen_pawn.i, this.choosen_pawn.j, this.camera_angle)

    this.choosen_pawn.move(pawn.i, pawn.j)

    this.update_minimap(this.pawns_position)
  }
}
