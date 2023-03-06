var http = require("http");
var qs = require("querystring");
var fs = require("fs");

let users_tab = [];

let pionki_position = [

    [0, 1, 0, 1, 0, 1, 0, 1],
    [1, 0, 1, 0, 1, 0, 1, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 0, 0, 0, 0, 0, 0, 0],
    [0, 2, 0, 2, 0, 2, 0, 2],
    [2, 0, 2, 0, 2, 0, 2, 0],

]

let intreval;

let whichOne = 1;

let x=60;

let startClock = () => {


    interval = setInterval( () => {
        if(x == 0)
            clearInterval(interval);
        else 
        x--;
        
    },1000)

}

let done = (base) => {

    x = 60;

    if(base == 2) whichOne = 1;
    else whichOne = 2;


}

var server = http.createServer(function (req, res) {
    switch (req.method) {
        case "GET":

            switch (req.url) {
                case "/":
                    fs.readFile("static/index.html", function (error, data) {
                        if (error) {
                            res.writeHead(404, { 'Content-Type': 'text/html' });
                            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                            res.end();
                        }


                        else {

                            res.writeHead(200, { 'Content-Type': 'text/html' });
                            res.write(data);
                            res.end();
                        }

                    });
                    break;


                case "/style.css":

                    fs.readFile("static/style.css", function (error, data) {
                        if (error) {
                            res.writeHead(404, { 'Content-Type': 'text/html' });
                            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                            res.end();
                        }


                        else {
                            res.writeHead(200, { 'Content-Type': 'text/css' });
                            res.write(data);
                            res.end();
                        }
                    })
                    break;

                case "/jquery.js":

                    fs.readFile("static/jquery.js", function (error, data) {
                        if (error) {
                            res.writeHead(404, { 'Content-Type': 'text/html' });
                            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                            res.end();
                        }


                        else {
                            res.writeHead(200, { 'Content-Type': 'application/javascript' });
                            res.write(data);
                            res.end();
                        }

                    })
                    break;

                case "/Ui.js":

                    fs.readFile("static/Ui.js", function (error, data) {
                        if (error) {
                            res.writeHead(404, { 'Content-Type': 'text/html' });
                            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                            res.end();
                        }


                        else {
                            res.writeHead(200, { 'Content-Type': 'application/javascript' });
                            res.write(data);
                            res.end();
                        }

                    })
                    break;

                case "/Net.js":

                    fs.readFile("static/Net.js", function (error, data) {
                        if (error) {
                            res.writeHead(404, { 'Content-Type': 'text/html' });
                            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                            res.end();
                        }


                        else {
                            res.writeHead(200, { 'Content-Type': 'application/javascript' });
                            res.write(data);
                            res.end();
                        }

                    })
                    break;

                case "/Main.js":

                    fs.readFile("static/Main.js", function (error, data) {
                        if (error) {
                            res.writeHead(404, { 'Content-Type': 'text/html' });
                            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                            res.end();
                        }

                        else {
                            res.writeHead(200, { 'Content-Type': 'application/javascript' });
                            res.write(data);
                            res.end();
                        }

                    })
                    break;

                case "/Game.js":

                    fs.readFile("static/Game.js", function (error, data) {
                        if (error) {
                            res.writeHead(404, { 'Content-Type': 'text/html' });
                            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                            res.end();
                        }


                        else {
                            res.writeHead(200, { 'Content-Type': 'application/javascript' });
                            res.write(data);
                            res.end();
                        }

                    })
                    break;

                case "/three.js":

                    fs.readFile("static/three.js", function (error, data) {
                        if (error) {
                            res.writeHead(404, { 'Content-Type': 'text/html' });
                            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                            res.end();
                        }


                        else {
                            res.writeHead(200, { 'Content-Type': 'application/javascript' });
                            res.write(data);
                            res.end();
                        }

                    })
                    break;

                case "/Pionek.js":

                    fs.readFile("static/Pionek.js", function (error, data) {
                        if (error) {
                            res.writeHead(404, { 'Content-Type': 'text/html' });
                            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                            res.end();
                        }


                        else {
                            res.writeHead(200, { 'Content-Type': 'application/javascript' });
                            res.write(data);
                            res.end();
                        }

                    })
                    break;

                case "/Blok.js":

                    fs.readFile("static/Blok.js", function (error, data) {
                        if (error) {
                            res.writeHead(404, { 'Content-Type': 'text/html' });
                            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                            res.end();
                        }


                        else {
                            res.writeHead(200, { 'Content-Type': 'application/javascript' });
                            res.write(data);
                            res.end();
                        }

                    })
                    break;

                case "/textures/bialy.jpg":

                    fs.readFile("static/textures/bialy.jpg", function (error, data) {
                        if (error) {
                            res.writeHead(404, { 'Content-Type': 'text/html' });
                            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                            res.end();
                        }


                        else {
                            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                            res.write(data);
                            res.end();
                        }

                    })
                    break;

                case "/textures/czarny.jpg":

                    fs.readFile("static/textures/czarny.jpg", function (error, data) {
                        if (error) {
                            res.writeHead(404, { 'Content-Type': 'text/html' });
                            res.write("<h1>błąd 404 - nie ma pliku!<h1>");
                            res.end();
                        }


                        else {
                            res.writeHead(200, { 'Content-Type': 'image/jpeg' });
                            res.write(data);
                            res.end();
                        }

                    })
                    break;

                default:
            }

            break;

        case "POST":

            if (req.url.includes("/user_log")) {


                var allData = "";

                req.on("data", function (data) {
                    allData += data;
                })

                req.on("end", function (data) {

                    let finish = qs.parse(allData);

                    console.log(finish.user)

                    let flag = true;

                    let output;
                    let status;

                    for (let i = 0; i < users_tab.length; i++) {
                        if (users_tab[i] == finish.user) {
                            flag = false;
                            break;
                        }
                    }

                    if (flag) {
                        users_tab.push(finish.user);
                    }

                    let letsSee = () => {
                        if (finish.user == users_tab[0]) {
                            output = "Witaj w grze! Jesteś graczem nr 1!";
                            status = 1;
                            waiting = true;
                            return;
                        }

                        if (finish.user == users_tab[1]) {
                            output = "Witaj w grze! Jesteś graczem nr 2!";
                            status = 2;
                            waiting = true;

                            return;
                        }

                        if (!flag) {
                            output = "Ten login już istnieje!";
                            status = 3;
                            waiting = false;

                            return;
                        }

                        if (users_tab.length > 2) {
                            output = "Maksymalna liczba graczy.";
                            status = 4;
                            waiting = false;
                            return;
                        }
                    }

                    letsSee();

                    context = {
                        text: output,
                        status: status,
                        waiting: waiting,
                        map: pionki_position
                    }

                    res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
                    res.end(JSON.stringify(context, null, 4));

                });

            }

            if (req.url.includes("/reset")) {

                console.log("reset");

                users_tab = [];

                pionki_position = [

                    [0, 1, 0, 1, 0, 1, 0, 1],
                    [1, 0, 1, 0, 1, 0, 1, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 0, 0, 0, 0, 0, 0, 0],
                    [0, 2, 0, 2, 0, 2, 0, 2],
                    [2, 0, 2, 0, 2, 0, 2, 0],
                
                ]

                res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
                res.end();

            }

            if (req.url.includes("/waiting_for_start")) {

                res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });

                if (users_tab.length >= 2) {
                    res.end("go") 
                    startClock();
                }
                else res.end("nope");

            }

            if (req.url.includes("/sendMap")) {


                var allData = "";

                req.on("data", function (data) {
                    allData += data;
                })

                req.on("end", function (data) {


                    let finish = qs.parse(allData);

                    console.log(finish)

                    pionki_position[finish.i][finish.j] = parseInt(finish.base);
                    pionki_position[finish.old_i][finish.old_j] = 0;
                    
                    done(finish.base);



                    res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
                    res.end(JSON.stringify("ok", null, 4));

                });


            }

            if (req.url.includes("/time")) {

                let context = {
                    whichOne: whichOne,
                    time: x
                }

                    res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
                    res.end(JSON.stringify(context, null, 4));

                


            }

            if (req.url.includes("/map")) {

                    res.writeHead(200, { 'Content-Type': 'text/plain;charset=utf-8' });
                    res.end(JSON.stringify(pionki_position, null, 4));

                


            }


            break;

        default: break;
    }
})

server.listen(3000, function () {
    console.log("start servera Checker.");
});