window.onload = init;

let canvas;

let gf;

function init() {
    console.log('init');

    gf = new GameFramework();
    gf.init();
}

function GameFramework() {
    let canvas;
    let w, h;
    let map;
    let ctx;
    let mapWidth = 700;
    let mapHeight = 400;

    function init() {
        canvas = document.querySelector("#myCanvas");

        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        w = canvas.width;
        h = canvas.height;

        ctx = canvas.getContext("2d");

        map = new Map(10, 10, w, h);

        requestAnimationFrame(draw);
    }

    function draw() {

        map.draw(ctx);

        requestAnimationFrame(draw);
    }



    return {
        init: init
    }
}

class ObjetGraphique {
    constructor(pX, pY, w, h) {
        this.x = pX;
        this.y = pY;
        this.width = w;
        this.height = h;
    }

    draw(ctx) {

    }
}

class Map extends ObjetGraphique{
    constructor(x, y, w, h) {
        super(x, y, w, h);
    }

    draw(ctx) {
        ctx.save();

        ctx.strokeStyle = "white";

        ctx.strokeRect(this.x, this.y, this.width, this.height);


        ctx.restore();
    }



}