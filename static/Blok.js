class Blok extends THREE.Mesh {

    constructor(tekstura,i,j,bool) {

        var geometry = new THREE.BoxGeometry(30, 10, 30);
                var materials = [];

                materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load(tekstura) }));
                materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load(tekstura) }));
                materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load(tekstura) }));
                materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load(tekstura) }));
                materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load(tekstura) }));
                materials.push(new THREE.MeshBasicMaterial({ side: THREE.DoubleSide, map: new THREE.TextureLoader().load(tekstura) }));

        super(geometry, materials);

        if(bool) this.name = "blok";
        else this.name = "nope";

        this.green = false;

        this.position.set((i * 30) - 120, 0, (30 * j) - 120);

        this.i = i;
        this.j = j;

    }


}
