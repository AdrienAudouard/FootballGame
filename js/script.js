window.onload = init;
document.onclick = onClick;
document.onmousemove = mouseMove;

const CAGE_WIDTH = 30;
const CAGE_HEIGHT = 200;
const BALLON_WIDTH = 30;
const MAP_WIDTH = 900;
const MAP_HEIGHT = 500;
const COLOR_1 = ['rgb(0, 0, 255)', 'rgb(255, 255, 255)', 'rgb(255, 0, 0)'];
const COLOR_2 = ['rgb(55, 131, 56)', 'rgb(255, 255, 255)', 'rgb(255, 0, 0)'];

let Cote = {
    DROITE: 1,
    GAUCHE: 2
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

    function init() {
        canvas = document.querySelector("#myCanvas");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        w = canvas.width;
        h = canvas.height;

        ctx = canvas.getContext("2d");

        let x = w / 2 - MAP_WIDTH / 2;
        let y = h / 2 - MAP_HEIGHT / 2;

        map = new Map(x, y, MAP_WIDTH, MAP_HEIGHT);

        equipes = [];
        equipes.push(new Equipe(Cote.GAUCHE, map));
        equipes.push(new Equipe(Cote.DROITE, map));

        curseurTir = new CurseurTir(10, 10);

        score = {
            GAUCHE: 0,
            DROITE: 0
        };

        reset();

        requestAnimationFrame(draw);
    }

    function reset() {
        let x = w / 2 - MAP_WIDTH / 2;
        let y = h / 2 - MAP_HEIGHT / 2;

        tour = Cote.GAUCHE;
        equipes[0].doitJouer = true;

        /*
        equipes[0].resetPosition(map);
        equipes[1].resetPosition(map);

*/
        ballon = new Ballon(x + map.width / 2 - BALLON_WIDTH / 2, y + map.height / 2 - BALLON_WIDTH / 2);
    }

    function draw() {
        ctx.clearRect(0, 0, w, h);

        ctx.font = "70px Arial";
        ctx.fillStyle = "white";
        ctx.textAlign = "center";
        ctx.fillText( score.GAUCHE + " : " + score.DROITE , w/2, map.y / 2 + 30);

        ctx.save();

        map.draw(ctx);

        curseurTir.draw(ctx);

        equipes[0].draw(ctx);
        equipes[1].draw(ctx);
        ballon.draw(ctx);

        ctx.restore();

        requestAnimationFrame(draw);
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
    }

    function clickDansJoueur(x, y) {

        for (let i = 0; i < 2; i++) {
            for (let k = 0; k < equipes[i].joueurs.length; k++) {

                let j = equipes[i].joueurs[k];
                if (j.estDans(x, y)) return j;
            }
        }
    }

    function onMouseMove(e) {
        if (!curseurTir.estVisible) return;

        let angle = calculerAngle(e.clientX, e.clientY);
        console.log(angle);

        curseurTir.angle = angle;
    }

    function calculerAngle(x, y) {
        let pos = curseurTir.centre();

        let angle = Math.atan((pos.y - y) / (pos.x - x));

        return angle;
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

class Ballon extends ObjetGraphique {
    constructor(x, y) {
        super(x, y, BALLON_WIDTH, BALLON_WIDTH);
    }


    draw(context) {

        context.save();
        context.translate(this.x, this.y);

        context.fillStyle = 'rgb(0, 0, 0)';

        context.shadowColor = 'black';
        context.shadowBlur = 10;

        context.beginPath();
        context.arc(this.width / 2, this.height / 2, this.width / 2, 0, 2*Math.PI, false);
        context.closePath();
        context.fill();

        context.shadowBlur = 0;

        //// Bezier Drawing
        context.beginPath();
        context.moveTo(11.62, 0);
        context.bezierCurveTo(12.86, 1.15, 14.4, 2.58, 14.4, 2.58);
        context.bezierCurveTo(14.4, 2.58, 17.43, 0.9, 18.83, 0.11);
        context.bezierCurveTo(19.15, 0.2, 19.47, 0.29, 19.78, 0.39);
        context.bezierCurveTo(21.14, 0.85, 22.42, 1.5, 23.57, 2.31);
        context.bezierCurveTo(22.5, 2.84, 21.57, 3.3, 21.57, 3.3);
        context.lineTo(22.43, 9.12);
        context.lineTo(28.22, 10.1);
        context.bezierCurveTo(28.22, 10.1, 28.49, 9.58, 28.86, 8.88);
        context.bezierCurveTo(29.6, 10.64, 30, 12.58, 30, 14.62);
        context.bezierCurveTo(30, 16.73, 29.56, 18.74, 28.78, 20.56);
        context.bezierCurveTo(28.11, 19.64, 27.55, 18.86, 27.55, 18.86);
        context.lineTo(21.96, 20.67);
        context.lineTo(21.95, 26.55);
        context.bezierCurveTo(21.95, 26.55, 22.58, 26.76, 23.42, 27.03);
        context.bezierCurveTo(22.16, 27.89, 20.76, 28.56, 19.26, 29.01);
        context.bezierCurveTo(17.99, 28.16, 14.91, 26.08, 14.91, 26.08);
        context.bezierCurveTo(14.91, 26.08, 14.34, 26.52, 13.61, 27.09);
        context.bezierCurveTo(12.79, 27.74, 11.75, 28.55, 11.06, 29.09);
        context.bezierCurveTo(9.2, 28.59, 7.49, 27.74, 5.99, 26.61);
        context.bezierCurveTo(6.83, 26.17, 7.48, 25.83, 7.48, 25.83);
        context.lineTo(6.49, 20.04);
        context.bezierCurveTo(6.49, 20.04, 1.22, 19.27, 0.71, 19.2);
        context.bezierCurveTo(0.25, 17.75, 0, 16.21, 0, 14.62);
        context.bezierCurveTo(0, 13.24, 0.19, 11.9, 0.54, 10.63);
        context.bezierCurveTo(0.69, 10.92, 0.78, 11.1, 0.78, 11.1);
        context.lineTo(6.57, 10.11);
        context.lineTo(7.43, 4.3);
        context.bezierCurveTo(7.43, 4.3, 6.4, 3.79, 5.25, 3.22);
        context.bezierCurveTo(6.85, 1.85, 8.74, 0.81, 10.81, 0.21);
        context.bezierCurveTo(11.07, 0.13, 11.33, 0.07, 11.6, 0.01);
        context.lineTo(11.62, 0);
        context.closePath();
        context.fillStyle = 'rgb(255, 255, 255)';
        context.fill();

        //// Polygon Drawing
        context.beginPath();
        context.moveTo(15, 10);
        context.lineTo(19.76, 13.45);
        context.lineTo(17.94, 19.05);
        context.lineTo(12.06, 19.05);
        context.lineTo(10.24, 13.45);
        context.closePath();
        context.fillStyle = 'rgb(0, 0, 0)';
        context.fill();

        context.restore();
    }
}

class Joueur extends ObjetGraphique {
    constructor(x, y, c) {
        super(x, y, BALLON_WIDTH, BALLON_WIDTH);
        this.colors = c;

        this.sizeDoitJoueur = {
            size: 10,
            augmente: true
        };
    }

    centre() {
        return {
            x: this.x + this.width / 2,
            y: this.y + this.height / 2
        }
    }

    draw(context, doitJouer) {
        if (doitJouer) {
            if(this.sizeDoitJoueur.augmente) {
                this.sizeDoitJoueur.size += 1;

                if (this.sizeDoitJoueur.size > 40) {
                    this.sizeDoitJoueur.augmente = false;
                }
            } else {
                this.sizeDoitJoueur.size -= 1;

                if (this.sizeDoitJoueur.size < 10) {
                    this.sizeDoitJoueur.augmente = true;
                }
            }
        }

        context.save();
        context.translate(this.x, this.y);

        context.shadowColor = doitJouer ? 'white' : 'black';
        context.shadowBlur = doitJouer ? this.sizeDoitJoueur.size : 10;
        context.fillStyle = 'black';

        context.beginPath();
        context.arc(this.width / 2, this.height / 2, this.width / 2, 0, 2*Math.PI, false);
        context.closePath();
        context.fill();

        context.shadowBlur = 0;

        this.arc(context, 3, 3, 24, 24, 90, -90, true);
        context.fillStyle = this.colors[0]; // 'rgb(0, 0, 255)';
        context.fill();


        //// Oval 3 Drawing
        this.arc(context, 3, 3, 24, 24, 270, 90, true);
        context.fillStyle =  this.colors[2]; // 'rgb(255, 0, 0)';
        context.fill();


        //// Rectangle 2 Drawing
        context.beginPath();
        context.rect(10, 2, 10, 26);
        context.fillStyle = this.colors[1]; //'rgb(255, 255, 255)';
        context.fill();


        //// Bezier Drawing
        context.beginPath();
        context.moveTo(15, 3);
        context.bezierCurveTo(13.04, 3, 11.19, 3.47, 9.56, 4.3);
        context.bezierCurveTo(5.67, 6.28, 3, 10.33, 3, 15);
        context.bezierCurveTo(3, 21.63, 8.37, 27, 15, 27);
        context.bezierCurveTo(21.63, 27, 27, 21.63, 27, 15);
        context.bezierCurveTo(27, 8.37, 21.63, 3, 15, 3);
        context.closePath();
        context.moveTo(30, 15);
        context.bezierCurveTo(30, 23.28, 23.28, 30, 15, 30);
        context.bezierCurveTo(6.72, 30, 0, 23.28, 0, 15);
        context.bezierCurveTo(0, 9.61, 2.84, 4.88, 7.11, 2.24);
        context.bezierCurveTo(9.41, 0.82, 12.11, 0, 15, 0);
        context.bezierCurveTo(23.28, 0, 30, 6.72, 30, 15);
        context.closePath();
        context.fillStyle = 'rgb(0, 0, 0)';
        context.fill();

        context.restore();
    }

    estDans(x, y) {
        let pos = this.centre();

        let d = Math.sqrt((pos.x - x) * (pos.x - x) + (pos.y - y ) * (pos.y - y ));
        return d <= (this.width / 2);
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

    draw(context) {
        if (!this.estVisible) return;

        context.save();
        context.translate(this.x + this.width / 2, this.y + this.height / 2);
        context.rotate(this.angle * 180 / Math.PI);
        context.translate(-this.width / 2, -this.height / 2);



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
        context.beginPath();
        context.moveTo(0.5, 4);
        context.lineTo(0.5, 11);
        context.lineTo(this.width - 12, 11);
        context.lineTo(this.width - 12, 14.5);
        context.lineTo(this.width, 6.76);
        context.lineTo(this.width - 12, -0.5);
        context.lineTo(this.width - 12, 4);
        context.lineTo(0.5, 4);
        context.closePath();
        context.fillStyle = gradient(context.createLinearGradient(0.5, 7, 52.5, 7));
        context.fill();

        context.restore();
    }

}