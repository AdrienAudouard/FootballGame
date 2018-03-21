import Rond from '../ui/shapes/Rond';
import { BALLON_WIDTH } from '../utils/Constants';

/**
 * Objet graphiqe representant un joueur
 */
export default class Joueur extends Rond {
  /**
   * Constructeur
   * @param x {number} Position en X
   * @param y {number} Position en Y
   * @param c Couleurs du joueur
   */
  constructor(x, y, c) {
    super(x, y, BALLON_WIDTH);
    this.colors = c;

    this.sizeDoitJouer = {
      size: 10,
      augmente: true,
    };
  }

  /**
   * Dessine le joueur
   * @param ctx Contexte avec lequel on dessine
   * @param doitJouer Indique si c'est au tour de se joueur de jouer
   */
  draw(ctx, doitJouer) {
    if (doitJouer) {
      if (this.sizeDoitJouer.augmente) {
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
    ctx.arc(this.width / 2, this.height / 2, this.width / 2, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();

    ctx.shadowBlur = 0;

    Joueur.arc(ctx, 3, 3, 24, 24, 90, -90, true);

    [ctx.fillStyle] = this.colors; // 'rgb(0, 0, 255)';
    ctx.fill();


    Joueur.arc(ctx, 3, 3, 24, 24, 270, 90, true);
    [,, ctx.fillStyle] = this.colors; // 'rgb(255, 0, 0)';
    ctx.fill();


    ctx.beginPath();
    ctx.rect(10, 2, 10, 26);
    [, ctx.fillStyle] = this.colors; // 'rgb(255, 255, 255)';
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

  /**
   * Dessine un arc de cercle
   * @param context Contexte avec lequel on dessine
   * @param x Position en X
   * @param y Position en Y
   * @param w Largeur
   * @param h Hauteur
   * @param startAngle Angle de depart
   * @param endAngle Angle de fin
   * @param isClosed indique si l'arc est fermé ou non
   */
  static arc(context, x, y, w, h, startAngle, endAngle, isClosed) {
    context.save();
    context.beginPath();
    context.translate(x, y);
    context.scale(w / 2, h / 2);
    context.arc(1, 1, 1, (Math.PI / 180) * startAngle, (Math.PI / 180) * endAngle, false);

    if (isClosed) {
      context.lineTo(1, 1);
      context.closePath();
    }

    context.restore();
  }
}

