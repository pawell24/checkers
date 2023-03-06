class Ui {

    constructor() {
        $("#login").on("click", () => { this.login_event() });
        $("#reset").on("click", () => { this.reset_event() });

        

    }

    login_event() {
        let login = $("#text").val();

        console.log(login);

        net.user_log(login);

        $(document).mousedown((event) => { this.clickOn3D(event) });

    }

    reset_event() {

        console.log("reset");
        net.reset();

    }

    clickOn3D(event) {

        net.game.raycasterfunction(event);

    }

}