class Game {

    constructor(camera_angle, map) {
        this.wybrany_pionek = "";
        this.szachownica = [

            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0],
            [0, 1, 0, 1, 0, 1, 0, 1],
            [1, 0, 1, 0, 1, 0, 1, 0]

        ]

        this.pionki_position = map;

        this.pionki = [];

        this.szachownica_blocks = [];

        this.camera_angle = camera_angle;

        this.createMap();
        this.render();

        $("#form").css("display", "none");

        this.addTime();

        this.miniMap();

        this.update_minimap(this.pionki_position);


    }

    miniMap() {
        this.miniMap = [];

        $("#map").css("display", "grid");
        for (let i = 0; i < 8; i++) {
            this.miniMap.push([])
            for (let j = 0; j < 8; j++) {

                let el = $("<div>");
                el.attr("class", "el_of_map");

                $("#map").append(el);

                this.miniMap[i].push(el);


            }
        }

    }

    update_minimap(map) {

        for (let i = 0; i < 8; i++) {

            for (let j = 0; j < 8; j++) {
                $(this.miniMap[i][j]).text(map[i][j]);

            }
        }


    }

    addTime() {

        let div = $("<div>");
        $(div).attr("class", 'time');
        $(div).text("czas: ");

        let xd = $("<div>");
        $(xd).attr("class", 'time');
        $(xd).text("czas: ");

        $("#menu").append(div);

        $("#waiting").append(xd);

    }

    createMap() {

        this.raycaster = new THREE.Raycaster(); // obiekt symulujący "rzucanie" promieni
        this.mouseVector = new THREE.Vector2() // ten wektor czyli pozycja w przestrzeni 2D na ekranie(x,y) wykorzystany będzie do określenie pozycji myszy na ekranie a potem przeliczenia na pozycje 3D

        this.scene = new THREE.Scene();
        this.camera = new THREE.PerspectiveCamera(
            60,    // kąt patrzenia kamery (FOV - field of view)
            16 / 9,    // proporcje widoku, powinny odpowiadać proporcjom naszego ekranu przeglądarki
            0.1,    // minimalna renderowana odległość
            10000    // maksymalna renderowana odległość od kamery
        );


        this.camera.position.y = 200;

        this.camera.position.z = 0;

        if (this.camera_angle == 1) {
            this.camera.position.x = -200;
        }

        if (this.camera_angle == 2) {
            this.camera.position.x = 200;
        }


        this.renderer = new THREE.WebGLRenderer();
        this.renderer.setClearColor(0xffffff);
        this.renderer.setSize(window.innerWidth, window.innerHeight - 40);


        $("#root").append(this.renderer.domElement);

        for (let i = 0; i < 8; i++) {
            this.pionki.push([]);
            this.szachownica_blocks.push([]);

            for (let j = 0; j < 8; j++) {

                let tekstura;

                if (this.szachownica[i][j] == 0)
                    tekstura = "/textures/bialy.jpg";
                else tekstura = "/textures/czarny.jpg";

                let cube = new Blok(tekstura, i, j, this.szachownica[i][j]);
                this.szachownica_blocks[i].push(cube);
                this.scene.add(cube);

                /////cylinder

                if (this.pionki_position[i][j] != 0) {

                    let color;
                    let kolorek;
                    let base;

                    if (this.pionki_position[i][j] == 2) {
                        color = 0x000000;
                        kolorek = "black";
                        base = 2;
                    } else {
                        color = 0xffffff;
                        kolorek = "white";
                        base = 1;

                    }

                    let pionek = new Pionek(color, kolorek, base, i, j);

                    pionek.position.set((i * 30) - 120, 10, (30 * j) - 120);

                    this.scene.add(pionek);

                    this.pionki[i].push(pionek);

                } else {
                    this.pionki[i].push(0);
                }

            }
        }

        this.render() // wywołanie metody render

    }


    render() {
        requestAnimationFrame(this.render.bind(this)); // funkcja bind(this) przekazuje obiekt this do metody render
        this.camera.lookAt(this.scene.position);
        this.renderer.render(this.scene, this.camera);
    }

    resize() {

        this.camera.aspect = window.innerWidth / window.innerHeight;
        this.camera.updateProjectionMatrix();
        this.renderer.setSize(window.innerWidth, window.innerHeight);

    }

    raycasterfunction(event) {

        this.mouseVector.x = (event.clientX / $(window).width()) * 2 - 1;
        this.mouseVector.y = -(event.clientY / $(window).height()) * 2 + 1;

        this.raycaster.setFromCamera(this.mouseVector, this.camera);

        var intersects = this.raycaster.intersectObjects(this.scene.children);

        if (intersects.length > 0) {

            /////wybranie pionka
            if (intersects[0].object.name == "pionek") {


                let pionek = this.find_pionek(intersects[0].object.uuid);

                for (let i = 0; i < 8; i++) {

                    this.pionki[i].forEach(el => {
                        if (el != 0) {

                            if (el.base == 1) {
                                el.kolorek = "white";
                                el.click("white");

                            } else {
                                el.kolorek = "black";
                                el.click("black");

                            }

                        }

                    });

                }


                if (this.camera_angle == 1) {

                    
                    if (pionek.kolorek == "white")
                    {

                        this.wybrany_pionek = pionek;

                        pionek.click("yellow");
                    } else {


                        if(pionek.base != 1){

                            this.delete(pionek);
                            
                        }
                    }

                }
                if (this.camera_angle == 2) {

                    
                    if (pionek.kolorek == "black"){
                        
                        this.wybrany_pionek = pionek;

                        pionek.click("yellow");
                    } else {

                        if(pionek.base != 2){

                            this.delete(pionek);

                        }


                    }

                }


            }


            ////ruch
            let obok = (blok, i, j, base) => {


                if (base == 2) {
                    if (blok.i == i - 1 && blok.j == j - 1)
                        return true;
                    if (blok.i == i - 1 && blok.j == j + 1)
                        return true;
                }

                if (base == 1) {
                    if (blok.i == i + 1 && blok.j == j - 1)
                        return true;
                    if (blok.i == i + 1 && blok.j == j + 1)
                        return true;
                }

                return false;

            }


            if (intersects[0].object.name == "blok") {

                let blok = intersects[0].object;

                let i = this.wybrany_pionek.i;
                let j = this.wybrany_pionek.j;

                let { base } = this.wybrany_pionek;

                if (this.pionki_position[blok.i][blok.j] == 0 && obok(blok, i, j, base)) {

                    this.wybrany_pionek.move(blok.i, blok.j);
                    this.pionki_position[i][j] = 0;



                    if (this.wybrany_pionek.base == 1)
                        this.pionki_position[blok.i][blok.j] = 1;
                    else
                        this.pionki_position[blok.i][blok.j] = 2;

                    net.sendMap(blok.i, blok.j, i, j, this.camera_angle);

                    this.update_minimap(this.pionki_position);

                }

            }


        }
    }

    find_pionek(uuid) {
        for (let i = 0; i < 8; i++) {
            for (let j = 0; j < 8; j++) {

                if (this.pionki[i][j] != 0)
                    if (uuid == this.pionki[i][j].uuid)
                        return this.pionki[i][j];

            }
        }
    }
    
    delete(pionek){

        this.scene.remove(pionek);
        
        this.pionki_position[pionek.i][pionek.j] = this.wybrany_pionek.base;
        this.pionki_position[this.wybrany_pionek.i][this.wybrany_pionek.j] = 0;
        
        this.pionki[pionek.i][pionek.j] = this.wybrany_pionek;
        this.pionki[this.wybrany_pionek.i][this.wybrany_pionek.j] = 0;
        
        net.sendMap(pionek.i, pionek.j, this.wybrany_pionek.i, this.wybrany_pionek.j, this.camera_angle);
        
        this.wybrany_pionek.move(pionek.i,pionek.j);
        
        this.update_minimap(this.pionki_position);
        

    }

}
