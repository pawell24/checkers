class Net {
  constructor() {
    this.whichOneNow = 1
    this.Iam
  }

  user_log(login) {
    $.ajax({
      url: '/user_log',
      data: { user: login },
      type: 'POST',
      success: (data) => {
        let obj = JSON.parse(data)

        $('#status').text(obj.text)

        this.Iam = obj.status

        this.game = new Game(obj.status, obj.map)

        $(window).on('resize', () => {
          this.game.resize()
        })

        if (obj.waiting) {
          this.interval()
        }
      },
      error: (xhr, status, error) => {
        console.log(xhr)
      },
    })
  }

  reset() {
    $.ajax({
      url: '/reset',
      data: {},
      type: 'POST',
      success: (data) => {},
      error: (xhr, status, error) => {
        console.log(xhr)
      },
    })
  }

  interval() {
    $('#waiting').css('display', 'block')

    let interval = setInterval(() => {
      $.ajax({
        url: '/waiting_for_start',
        data: {},
        type: 'POST',
        success: (data) => {
          if (data == 'go') {
            $('.p').text('')
            clearInterval(interval)
            this.time_interval()

            if (this.Iam == 2) $('#waiting').css('display', 'block')
            else $('#waiting').css('display', 'none')
          }
        },
        error: (xhr, status, error) => {
          console.log(xhr)
        },
      })
    }, 500)
  }

  time_interval() {
    let interval = setInterval(() => {
      this.time()
    }, 250)
  }

  sendMap(i, j, oldi, oldj, base) {
    $.ajax({
      url: '/sendMap',
      data: { i: i, j: j, old_i: oldi, old_j: oldj, base: base },
      type: 'POST',
      success: (data) => {
        let obj = JSON.parse(data)
      },
      error: (xhr, status, error) => {
        console.log(xhr)
      },
    })
  }

  time() {
    this.x++
    $.ajax({
      url: '/time',
      data: {},
      type: 'POST',
      success: (data) => {
        let obj = JSON.parse(data)

        let time = obj.time

        this.update_map()

        $('.p').text('Ruch drugiego gracza..')
        $('.time').text('czas: ' + parseInt(time / 2) + 's.')

        if (this.whichOneNow != obj.whichOne) {
          if (obj.whichOne == this.Iam) {
            $('#waiting').css('display', 'none')
          } else {
            $('#waiting').css('display', 'block')
          }
          this.whichOneNow = obj.whichOne
        }

        if (time == 0) {
          let reverse
          if (this.whichOneNow == 1) reverse = 2
          else reverse = 1
          $('#waiting').css('display', 'block')

          $('.p').text('KONIEC GRY. WYGRAŁ GRACZ: ' + reverse)
        }
      },
      error: (xhr, status, error) => {
        console.log(xhr)
      },
    })
  }

  update_map() {
    $.ajax({
      url: '/map',
      data: {},
      type: 'POST',
      success: (data) => {
        let map = JSON.parse(data)

        let flag = false

        let blok_i
        let blok_j

        let pawn_i
        let pawn_j

        for (let i = 0; i < 8; i++) {
          for (let j = 0; j < 8; j++) {
            if (this.game.pawns_position[i][j] != map[i][j]) {
              flag = true

              if (map[i][j] == 0) {
                blok_i = i
                blok_j = j
              }

              if (map[i][j] == 1 || map[i][j] == 2) {
                pawn_i = i
                pawn_j = j
              }
            }
          }
        }

        if (flag) {
          if (
            map[blok_i][blok_j] == 0 &&
            this.game.pawns_position[pawn_i][pawn_j] == this.game.camera_angle
          ) {
            this.game.scene.remove(this.game.pawns[pawn_i][pawn_j])

            this.game.pawns[pawn_i][pawn_j] = this.game.pawns[blok_i][blok_j]
            this.game.pawns[blok_i][blok_j].move(pawn_i, pawn_j)

            this.game.pawns[blok_i][blok_j] = 0
          } else {
            this.game.pawns[blok_i][blok_j].move(pawn_i, pawn_j)

            this.game.pawns[pawn_i][pawn_j] = this.game.pawns[blok_i][blok_j]

            this.game.pawns[blok_i][blok_j] = 0
          }

          this.game.pawns_position = map

          this.game.update_minimap(map)
        }
      },
      error: (xhr, status, error) => {
        console.log(xhr)
      },
    })
  }
}
