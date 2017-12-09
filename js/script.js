window.onload = init;
document.onclick = onClick;
document.onmousemove = mouseMove;

const CAGE_WIDTH = 30;
const CAGE_HEIGHT = 200;
const BALLON_WIDTH = 30;
const ROND_WIDTH = 900;
const MAP_HEIGHT = 500;
const COLOR_1 = ['rgb(0, 0, 255)', 'rgb(255, 255, 255)', 'rgb(255, 0, 0)'];
const COLOR_2 = ['rgb(55, 131, 56)', 'rgb(255, 255, 255)', 'rgb(255, 0, 0)'];
const CURSEUR_FORCE_WIDTH = 30;
const CURSEUR_FORCE_HEIGHT = 500;
const COLORS_PICKER = [
    ["#2ecc71", "#3498db", "#9b59b6"],
    ["#e67e22", "#e74c3c", "#2c3e50"],
    ["#f1c40f", "#000", "#fff"]
];
const FLAG_HEIGHT = 60;
const FLAG_WIDTH = 90;

let Cote = {
    DROITE: 1,
    GAUCHE: 0
};

const POSITIONS = [{x: 35, y: MAP_HEIGHT / 2 - BALLON_WIDTH / 2}, // Gardien
    //Ligne de defense
    {x: 135, y: 137.5},
    {x: 135, y: MAP_HEIGHT - 137.5 - BALLON_WIDTH},
    //Ligne de milieu
    {x: 255, y: 40},
    {x: 225, y: MAP_HEIGHT / 2 - BALLON_WIDTH / 2},
    {x: 255, y: MAP_HEIGHT - 40 - BALLON_WIDTH},
    //Attaquant
    {x: 335, y: MAP_HEIGHT / 2 - BALLON_WIDTH / 2}
];

let canvas;

let gf;

function onClick(e) {
    gf.onClick(e);
}

function mouseMove(e) {
    gf.onMouseMove(e);
}

function init() {
    console.log('init');

    gf = new GameFramework();
    gf.init();
}

function GameFramework() {
    let canvas;
    let w, h;
    let map;
    let equipes;
    let ballon;
    let ctx;
    let tour;
    let score;
    let curseurTir;
    let curseurForce;
    let colorPicker;
    let drapeauGauche, drapeauDroit;

    function init() {
        canvas = document.querySelector("#myCanvas");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        w = canvas.width;
        h = canvas.height;

        ctx = canvas.getContext("2d");

        let x = w / 2 - ROND_WIDTH / 2;
        let y = h / 2 - MAP_HEIGHT / 2;

        map = new Map(x, y, ROND_WIDTH, MAP_HEIGHT);

        equipes = [];
        equipes.push(new Equipe(Cote.GAUCHE, map));
        equipes.push(new Equipe(Cote.DROITE, map));

        curseurTir = new CurseurTir(10, 10);

        score = {
            GAUCHE: 0,
            DROITE: 0
        };

        let xForce = map.x / 2 - CURSEUR_FORCE_WIDTH / 2;
        let yForce = h / 2 - CURSEUR_FORCE_HEIGHT / 2;

        curseurForce = new CurseurForce(xForce, yForce);
        colorPicker = new ColorPicker(10, 10);

        let yDrapeau = map.y / 2 - FLAG_HEIGHT / 2;
        let xDrapeau = map.x + map.width / 4 - FLAG_WIDTH / 2;

        drapeauGauche = new Drapeau(xDrapeau, yDrapeau, COLOR_1);
        drapeauDroit = new Drapeau(xDrapeau + map.width / 2, yDrapeau, COLOR_2);

        reset();

        requestAnimationFrame(draw);
    }

    function reset() {
        let x = w / 2 - ROND_WIDTH / 2;
        let y = h / 2 - MAP_HEIGHT / 2;

        tour = Cote.GAUCHE;
        equipes[0].doitJouer = true;

        /*
        equipes[0].resetPosition(map);
        equipes[1].resetPosition(map);

*/
        ballon = new Ballon(x + map.width / 2 - BALLON_WIDTH / 2, y + map.height / 2 - BALLON_WIDTH / 2);
    }

    function update() {
        ballon.update();

        equipes.forEach((e) => {
            e.joueurs.forEach((e) => {
                e.update();
            })
        })
    }

    function collisonBords(e) {
        let collision = gererCollisionCage(e);

        if (!collision) {
            collision = false;

            if (e.x <= map.x) {
                collision = true;

                e.x = map.x;

                e.inverserVx();
            } else if (e.x + e.width >= map.x + map.width) {
                collision = true;

                e.x = map.x + map.width - e.width;
                e.inverserVx();
            } else if (e.y <= map.y) {
                collision = true;

                e.y = map.y;
                e.inverserVy();
            } else if (e.y + e.height >= map.y + map.height) {
                collision = true;

                e.y = map.y + map.height - e.width;
                e.inverserVy();
            }
        }

        if (collision) {
            console.log("collision");
            e.vitesse *= 0.75;
        }
    }

    function collisions() {
        collisonBords(ballon);

        equipes.forEach((e) => {
            e.joueurs.forEach((e) => {
                //Touche le cote droit
                collisonBords(e);
            })
        });


        //Pour toutes les equipes
        equipes.forEach((e) => {

            //Pour chaque joueur de chaque équipe
            e.joueurs.forEach((j) => {
                if (j.touche(ballon)) {
                    gererCollision(j, ballon);
                }

                //Pour chaque équipe
                equipes.forEach((e2) => {
                    //Chaque joueur de chaque équipe
                    e2.joueurs.forEach((j2) => {
                        if (j.x == j2.x && j.y == j2.y) return;

                        if (j.touche(j2)) {
                            gererCollision(j, j2)
                        }
                    })
                })
            })

        })
    }

    function gererCollision(j, j2) {
        let angle = j.calculerAngle(j2);
        j.angle = angle + ((j.x > j2.x) ? 0 : Math.PI);
        j2.angle = angle + ((j2.x > j.x) ? 0 : Math.PI);
        
        j.angle = j.vitesse > 0 ? 2 * Math.PI - j.angle : j.angle;
        j2.angle = j2.vitesse > 0 ? 2 * Math.PI - j2.angle : j2.angle;
        

        j.vitesse = Math.max(j.vitesse, j2.vitesse);
        j2.vitesse = Math.max(j.vitesse, j2.vitesse);
    }

    function gererCollisionCage(j) {

        let cageDroite = map.cageDroite;
        let cageGauche = map.cageGauche;

        if (j.y < cageGauche.y || j.y > cageGauche.y + cageGauche.height) return false;

        if (j.x <= cageGauche.x) {
            j.x = cageGauche.x;

        } else if (j.x + j.width >= cageDroite.x + cageDroite.width) {
            j.x = cageDroite.x + cageDroite.width - j.width;
        }

        return false;
    }

    function draw() {
        collisions();
        update();

        ctx.save();

        ctx.clearRect(0, 0, w, h);

        ctx.font = "70px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText( score.GAUCHE + " : " + score.DROITE , w/2, map.y / 2 + 30);



        map.draw(ctx);

        curseurForce.draw(ctx);
        curseurTir.draw(ctx);

        equipes[0].draw(ctx);
        equipes[1].draw(ctx);
        ballon.draw(ctx);

        drapeauGauche.draw(ctx);
        drapeauDroit.draw(ctx);

        colorPicker.draw(ctx);

        ctx.restore();

        requestAnimationFrame(draw);
    }

    function drawFlags() {
        ctx.save();

        let flagWidth = 90;
        let flagHeight = 60;

        let y = map.y / 2 - flagHeight / 2;
        let x = map.x + map.width / 4 - flagWidth / 2;

        ctx.translate(x, y);

        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = COLOR_1[i];
            ctx.fillRect(i * flagWidth / 3, 0, flagWidth / 3, flagHeight);
        }

        ctx.translate(map.width / 2, 0);

        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = COLOR_2[i];
            ctx.fillRect(i * flagWidth / 3, 0, flagWidth / 3, flagHeight);
        }

        ctx.restore();
    }

    function onClick(e) {
        let x = e.clientX;
        let y = e.clientY;

        console.log('click');

        let j = clickDansJoueur(x, y);


        if (j) {
            console.log('Click dans joueur');

            curseurTir.estVisible = true;
            curseurTir.joueur = j;

            let pos = j.centre();
            curseurTir.x = pos.x - curseurTir.width / 2;
            curseurTir.y = pos.y - curseurTir.height / 2;
        }

        else if (curseurForce.estDans(x, y)) {
            curseurForce.definirNouvelValeur(y);
        }

        else if (curseurTir.estVisible) {
            tir();
        }
    }

    function tir() {
        console.log('tir');

        curseurTir.joueur.angle = curseurTir.angle;
        console.log("force: " + curseurForce.valeur);
        console.log("angle: " + curseurTir.angle);
        console.log("x: " + curseurTir.joueur.x);
        console.log("y: " + curseurTir.joueur.y);

        curseurTir.joueur.vitesse = 10.0 * parseFloat(curseurForce.valeur);

        curseurTir.estVisible = false;
        curseurTir.joueur = null;

        tour = (tour == Cote.GAUCHE) ? Cote.DROITE : Cote.GAUCHE;

        if (tour == Cote.GAUCHE) {
            equipes[0].doitJouer = true;
            equipes[1].doitJouer = false;
        } else {
            equipes[0].doitJouer = false;
            equipes[1].doitJouer = true;
        }
    }

    function clickDansJoueur(x, y) {

        let equipe = equipes[tour];

        for (let k = 0; k < equipe.joueurs.length; k++) {
            let j = equipe.joueurs[k];
            if (j.estDans(x, y)) return j;
        }
    }

    function onMouseMove(e) {

        let dansJoueur = false;

        equipes.forEach((eq) => {
            "use strict";
           eq.joueurs.forEach((j) => {
               if (j.estDans(e.clientX, e.clientY)) dansJoueur = true;
           }) ;
        });

        if ( dansJoueur
            ||drapeauDroit.estDans(e.clientX, e.clientY)
            || drapeauGauche.estDans(e.clientX, e.clientY)
            || curseurForce.estDans(e.clientX, e.clientY)) {
            document.body.style.cursor = 'pointer';
        } else {
            document.body.style.cursor = 'default';
        }



        if (!curseurTir.estVisible) return;

        curseurTir.angle = calculerAngle(e.clientX, e.clientY);
    }

    function calculerAngle(x, y) {
        let pos = curseurTir.centre();

        return Math.atan((pos.y - y) / (pos.x - x)) + ((x > pos.x) ? 0 : Math.PI);
    }

    return {
        init: init,
        onClick: onClick,
        onMouseMove: onMouseMove
    }
}

class ObjetGraphique {
    constructor(pX, pY, w, h) {
        this.x = pX;
        this.y = pY;
        this.width = w;
        this.height = h;
    }

    centre() {
        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        }
    }

    pos() {
        return {
            x: this.x,
            y: this.y
        }
    }

    estDans(x, y) {
        return x >= this.x && x <= this.x + this.width && y >= this.y && y <= this.y + this.width;
    }

    draw(ctx) {

    }
}

class Map extends ObjetGraphique{
    constructor(x, y, w, h) {
        super(x, y, w, h);

        let yCage = this.height / 2 - CAGE_HEIGHT / 2;

        this.cageGauche = new Cage(- CAGE_WIDTH, yCage);
        this.cageDroite = new Cage(this.width, yCage);
    }

    draw(ctx) {
        ctx.save();

        ctx.strokeStyle = "white";
        ctx.fillStyle = "#27ae60";
        ctx.lineWidth = 4;
        ctx.translate(this.x, this.y);

        ctx.fillRect(0, 0, this.width, this.height);


        ctx.fillStyle = "#1f8241";

        let space = this.width / 9;

        for (let i = 0; i < 9; i++) {
            if (i%2 === 0) {

                let x = i*space;
                ctx.fillRect(x, 0, space, this.height);
            }
        }

        ctx.strokeRect(this.width / 2, 0, 1, this.height);

        ctx.fillStyle = "white";

        ctx.beginPath();
        ctx.arc(this.width / 2, this.height / 2, 20 / 2, 0, 2*Math.PI);
        ctx.fill();

        ctx.beginPath();
        ctx.arc(this.width / 2, this.height / 2, 200 / 2, 0, 2*Math.PI);
        ctx.stroke();

        this.cageDroite.draw(ctx);
        this.cageGauche.draw(ctx);

        ctx.strokeRect(0, 0, this.width, this.height);

        ctx.restore();
    }
}

class Cage extends ObjetGraphique {
    constructor(x, y) {
        super(x, y, CAGE_WIDTH, CAGE_HEIGHT);
    }

    draw(ctx) {
        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.strokeStyle = "white";
        ctx.fillStyle = "#27ae60";

        ctx.fillRect(0, 0, this.width, this.height);
        ctx.strokeRect(0, 0, this.width, this.height);

        ctx.lineWidth = 1;

        let space = this.width / 4;

        for (let i = 0; i < 4; i++) {
            ctx.strokeRect(i * space, 0, 1, this.height);
        }

        space = this.height / 11;

        for (let i = 0; i < 11; i++) {
            ctx.strokeRect(0, i * space, this.width, 1);
        }

        ctx.restore();
    }
}

class Rond extends ObjetGraphique {
    constructor(x, y, w) {
        super(x, y, w, w);

        this.vitesse = 0;
        this.angle = 0;
    }

    inverserVx() {
        this.angle = Math.PI - this.angle;
    }

    inverserVy() {
        this.angle = 2 * Math.PI - this.angle;
    }
}

class Ballon extends Rond {
    constructor(x, y) {
        super(x, y, BALLON_WIDTH, BALLON_WIDTH);
    }

    update() {
        if (this.vitesse == 0) return;

        this.x += Math.cos(this.angle) * this.vitesse;
        this.y += Math.sin(this.angle) * this.vitesse;

        this.vitesse -= 0.1;

        if (this.vitesse < 0) this.vitesse = 0;
    }

    draw(ctx) {

        ctx.save();
        ctx.translate(this.x, this.y);

        ctx.fillStyle = 'rgb(0, 0, 0)';

        ctx.shadowColor = 'black';
        ctx.shadowBlur = 10;

        ctx.beginPath();
        ctx.arc(this.width / 2, this.height / 2, this.width / 2, 0, 2*Math.PI, false);
        ctx.closePath();
        ctx.fill();

        ctx.shadowBlur = 0;

        //// Bezier Drawing
        ctx.beginPath();
        ctx.moveTo(11.62, 0);
        ctx.bezierCurveTo(12.86, 1.15, 14.4, 2.58, 14.4, 2.58);
        ctx.bezierCurveTo(14.4, 2.58, 17.43, 0.9, 18.83, 0.11);
        ctx.bezierCurveTo(19.15, 0.2, 19.47, 0.29, 19.78, 0.39);
        ctx.bezierCurveTo(21.14, 0.85, 22.42, 1.5, 23.57, 2.31);
        ctx.bezierCurveTo(22.5, 2.84, 21.57, 3.3, 21.57, 3.3);
        ctx.lineTo(22.43, 9.12);
        ctx.lineTo(28.22, 10.1);
        ctx.bezierCurveTo(28.22, 10.1, 28.49, 9.58, 28.86, 8.88);
        ctx.bezierCurveTo(29.6, 10.64, 30, 12.58, 30, 14.62);
        ctx.bezierCurveTo(30, 16.73, 29.56, 18.74, 28.78, 20.56);
        ctx.bezierCurveTo(28.11, 19.64, 27.55, 18.86, 27.55, 18.86);
        ctx.lineTo(21.96, 20.67);
        ctx.lineTo(21.95, 26.55);
        ctx.bezierCurveTo(21.95, 26.55, 22.58, 26.76, 23.42, 27.03);
        ctx.bezierCurveTo(22.16, 27.89, 20.76, 28.56, 19.26, 29.01);
        ctx.bezierCurveTo(17.99, 28.16, 14.91, 26.08, 14.91, 26.08);
        ctx.bezierCurveTo(14.91, 26.08, 14.34, 26.52, 13.61, 27.09);
        ctx.bezierCurveTo(12.79, 27.74, 11.75, 28.55, 11.06, 29.09);
        ctx.bezierCurveTo(9.2, 28.59, 7.49, 27.74, 5.99, 26.61);
        ctx.bezierCurveTo(6.83, 26.17, 7.48, 25.83, 7.48, 25.83);
        ctx.lineTo(6.49, 20.04);
        ctx.bezierCurveTo(6.49, 20.04, 1.22, 19.27, 0.71, 19.2);
        ctx.bezierCurveTo(0.25, 17.75, 0, 16.21, 0, 14.62);
        ctx.bezierCurveTo(0, 13.24, 0.19, 11.9, 0.54, 10.63);
        ctx.bezierCurveTo(0.69, 10.92, 0.78, 11.1, 0.78, 11.1);
        ctx.lineTo(6.57, 10.11);
        ctx.lineTo(7.43, 4.3);
        ctx.bezierCurveTo(7.43, 4.3, 6.4, 3.79, 5.25, 3.22);
        ctx.bezierCurveTo(6.85, 1.85, 8.74, 0.81, 10.81, 0.21);
        ctx.bezierCurveTo(11.07, 0.13, 11.33, 0.07, 11.6, 0.01);
        ctx.lineTo(11.62, 0);
        ctx.closePath();
        ctx.fillStyle = 'rgb(255, 255, 255)';
        ctx.fill();

        //// Polygon Drawing
        ctx.beginPath();
        ctx.moveTo(15, 10);
        ctx.lineTo(19.76, 13.45);
        ctx.lineTo(17.94, 19.05);
        ctx.lineTo(12.06, 19.05);
        ctx.lineTo(10.24, 13.45);
        ctx.closePath();
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fill();

        ctx.restore();
    }
}

class Joueur extends Rond {
    constructor(x, y, c) {
        super(x, y, BALLON_WIDTH, BALLON_WIDTH);
        this.colors = c;

        this.sizeDoitJouer = {
            size: 10,
            augmente: true
        };

    }

    update() {
        if (this.vitesse == 0) return;

        this.x += Math.cos(this.angle) * this.vitesse;
        this.y += Math.sin(this.angle) * this.vitesse;

        console.log("vitesse: " + this.vitesse);
        console.log("pos("+this.x+","+this.y+")\n");

        this.vitesse = this.vitesse - 0.1;

        if (this.vitesse < 0) this.vitesse = 0;
    }

    draw(ctx, doitJouer) {
        if (doitJouer) {
            if(this.sizeDoitJouer.augmente) {
                this.sizeDoitJouer.size += 1;

                if (this.sizeDoitJouer.size > 40) {
                    this.sizeDoitJouer.augmente = false;
                }
            } else {
                this.sizeDoitJouer.size -= 1;

                if (this.sizeDoitJouer.size < 10) {
                    this.sizeDoitJouer.augmente = true;
                }
            }
        }

        ctx.save();
        ctx.translate(this.x, this.y);

        ctx.shadowColor = doitJouer ? 'white' : 'black';
        ctx.shadowBlur = doitJouer ? this.sizeDoitJouer.size : 10;
        ctx.fillStyle = 'black';

        ctx.beginPath();
        this.arc(ctx, this.width / 2, this.height / 2, this.width / 2, 0, 2*Math.PI, false);
        ctx.closePath();
        ctx.fill();

        ctx.shadowBlur = 0;

        this.arc(ctx, 3, 3, 24, 24, 90, -90, true);
        ctx.fillStyle = this.colors[0]; // 'rgb(0, 0, 255)';
        ctx.fill();


        this.arc(ctx, 3, 3, 24, 24, 270, 90, true);
        ctx.fillStyle =  this.colors[2]; // 'rgb(255, 0, 0)';
        ctx.fill();


        ctx.beginPath();
        ctx.rect(10, 2, 10, 26);
        ctx.fillStyle = this.colors[1]; //'rgb(255, 255, 255)';
        ctx.fill();


        ctx.beginPath();
        ctx.moveTo(15, 3);
        ctx.bezierCurveTo(13.04, 3, 11.19, 3.47, 9.56, 4.3);
        ctx.bezierCurveTo(5.67, 6.28, 3, 10.33, 3, 15);
        ctx.bezierCurveTo(3, 21.63, 8.37, 27, 15, 27);
        ctx.bezierCurveTo(21.63, 27, 27, 21.63, 27, 15);
        ctx.bezierCurveTo(27, 8.37, 21.63, 3, 15, 3);
        ctx.closePath();
        ctx.moveTo(30, 15);
        ctx.bezierCurveTo(30, 23.28, 23.28, 30, 15, 30);
        ctx.bezierCurveTo(6.72, 30, 0, 23.28, 0, 15);
        ctx.bezierCurveTo(0, 9.61, 2.84, 4.88, 7.11, 2.24);
        ctx.bezierCurveTo(9.41, 0.82, 12.11, 0, 15, 0);
        ctx.bezierCurveTo(23.28, 0, 30, 6.72, 30, 15);
        ctx.closePath();
        ctx.fillStyle = 'rgb(0, 0, 0)';
        ctx.fill();

        ctx.restore();
    }

    estDans(x, y) {
        let pos = this.centre();

        let d = Math.sqrt((pos.x - x) * (pos.x - x) + (pos.y - y ) * (pos.y - y ));
        return d <= (this.width / 2);
    }

    touche(j) {
        let pos = this.centre();

        let d = Math.sqrt((pos.x - j.x) * (pos.x - j.x) + (pos.y - j.y ) * (pos.y - j.y ));
        return d <= this.width;
    }

    calculerAngle(j) {
        let p = j.centre();
        let p2 = this.centre();

        return Math.atan((p.y - p2.y) / (p.x - p2.x));
    }

    arc(context, x, y, w, h, startAngle, endAngle, isClosed) {
        context.save();
        context.beginPath();
        context.translate(x, y);
        context.scale(w/2, h/2);
        context.arc(1, 1, 1, Math.PI/180*startAngle, Math.PI/180*endAngle, false);
        if (isClosed)
        {
            context.lineTo(1, 1);
            context.closePath();
        }
        context.restore();
    }
}

class Equipe {
    constructor(cote, map) {
        this.cote = cote;
        this.joueurs = [];

        this.creerJoueurs(map);
        this.doitJouer = false;
    }

    resetPosition(map) {
        let i = 0;

        this.joueurs.forEach((p) => {
            i++;
            let x = (this.cote == Cote.GAUCHE) ? map.x + p.x : map.x + map.width - p.x - BALLON_WIDTH;
            let y = map.y + p.y;

            p.x = x;
            p.y = y;
        });
    }

    creerJoueurs(map){
        POSITIONS.forEach((p) => {
            let x = (this.cote == Cote.GAUCHE) ? map.x + p.x : map.x + map.width - p.x - BALLON_WIDTH;
            let y = map.y + p.y;
            let c = (this.cote == Cote.GAUCHE) ? COLOR_1 : COLOR_2;

            this.joueurs.push(new Joueur(x, y, c));
        });
    }

    draw(ctx) {
        this.joueurs.forEach((j) => {
           j.draw(ctx, this.doitJouer);
        });
    }
}

class CurseurTir extends ObjetGraphique {
    constructor(x, y) {
        super(x, y, 100, 15);

        this.estVisible = false;
        this.angle = 0;
        this.joueur = null;
    }

    draw(ctx) {
        if (!this.estVisible) return;

        ctx.save();
        ctx.translate(this.x + this.width / 2, this.y + this.height / 2);
        ctx.rotate(this.angle);
        ctx.translate(-this.width / 2, -this.height / 2);



        //// Color Declarations
        let gradientColor = 'rgba(255, 137, 0, 1)';
        let gradientColor2 = 'rgba(255, 0, 0, 1)';

        //// Gradient Declarations
        function gradient(g) {
            g.addColorStop(0, gradientColor);
            g.addColorStop(1, gradientColor2);
            return g;
        }

        //// Bezier Drawing
        ctx.beginPath();
        ctx.moveTo(0.5, 4);
        ctx.lineTo(0.5, 11);
        ctx.lineTo(this.width - 12, 11);
        ctx.lineTo(this.width - 12, 14.5);
        ctx.lineTo(this.width, 6.76);
        ctx.lineTo(this.width - 12, -0.5);
        ctx.lineTo(this.width - 12, 4);
        ctx.lineTo(0.5, 4);
        ctx.closePath();
        ctx.fillStyle = gradient(ctx.createLinearGradient(0.5, 7, 52.5, 7));
        ctx.fill();

        ctx.restore();
    }

}

class CurseurForce extends ObjetGraphique {
    constructor(x, y) {
        super(x, y, CURSEUR_FORCE_WIDTH, CURSEUR_FORCE_HEIGHT);

        this.valeur = 0.5;
        this.margeCote = 5;
    }

    draw(ctx) {
        let margin = this.width / 2;

        ctx.save();

        ctx.translate(this.x, this.y);
        ctx.fillStyle = "#0d0e1a";
        ctx.strokeStyle = "#ecf0f1";
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(0, margin);
        ctx.arc(this.width / 2, margin, margin, Math.PI, 0);
        ctx.lineTo(this.width, this.height - margin);
        ctx.arc(this.width / 2, this.height - margin, margin, 0, Math.PI);
        ctx.lineTo(0,margin);
        ctx.fill();
        ctx.stroke();

        ctx.fillStyle = "#e74c3c";


        let w = this.width - 2 * this.margeCote;
        let h = this.height - 2 * this.margeCote;

        margin = w / 2;


        h *= this.valeur;
        h -= 15;

        ctx.translate(this.margeCote, this.height -  this.margeCote - margin);

        ctx.beginPath();
        ctx.arc(w / 2, 0, w / 2, 0, Math.PI);
        ctx.arc(w / 2, -h, w / 2, Math.PI, 0);
        ctx.fill();



        ctx.restore();
    }

    estDans(x, y) {
        let xMin = this.x + this.margeCote;
        let yMin = this.y + this.margeCote;

        let xMax = xMin + (this.width - 2 * this.margeCote);
        let yMax = yMin + (this.height - 2 * this.margeCote);

        return x >= xMin && x <= xMax && y >= yMin && y <= yMax;


    }

    definirNouvelValeur(y) {
        let yMin = this.y + this.margeCote;

        let yMax = this.height - 2 * this.margeCote;

        this.valeur = 1 - ((y - yMin)/yMax);
    }
}

class ColorPicker extends ObjetGraphique {
    constructor(x, y) {
        super(x,y, 200, 200);
        this.estVisible = true;
    }

    estDans(x, y) {
        if (!this.estVisible) return false;
    }

    draw(ctx) {
        if (!this.estVisible) return;

        ctx.save();

        ctx.fillStyle = "#fff";
        ctx.translate(this.x, this.y);

        let cornerRadius = 5;
        
        
        ctx.beginPath();
        ctx.arc(cornerRadius, cornerRadius, cornerRadius, Math.PI, 1.5*Math.PI);
        ctx.arc(this.width -cornerRadius, cornerRadius, cornerRadius, 1.5*Math.PI, 2*Math.PI);
        ctx.arc(this.width -cornerRadius,  this.height-cornerRadius, cornerRadius, 0, 0.5*Math.PI);
        ctx.arc(cornerRadius,  this.height-cornerRadius, cornerRadius, 0.5*Math.PI, Math.PI);
        ctx.closePath();

        ctx.fill();

        let margeW = this.width * 0.1;
        let margeH = this.height * 0.1;

        let w = this.width - 4*margeW;
        let h = this.height - 4*margeH;

        ctx.translate(margeW, margeH);

        for (let i = 0; i < 3; i++) {
            for (let j = 0; j < 3; j++) {
                ctx.fillStyle = COLORS_PICKER[i][j];
                ctx.fillRect(0, 0, w / 3, h / 3);
                ctx.translate(w / 3 + margeW, 0);
            }

            ctx.translate( - 3 * (w / 3 + margeW), h / 3 + margeH);
        }

        ctx.restore();
    }
}

class Drapeau extends ObjetGraphique {
    constructor(x, y, colors) {
        super(x, y, FLAG_WIDTH, FLAG_HEIGHT);

        this.colors = colors;
    }

    draw(ctx) {
        ctx.save();

        ctx.translate(this.x, this.y);

        for (let i = 0; i < 3; i++) {
            ctx.fillStyle = this.colors[i];
            ctx.fillRect(i * this.width / 3, 0, this.width / 3, this.height);
        }

        ctx.restore();
    }
}