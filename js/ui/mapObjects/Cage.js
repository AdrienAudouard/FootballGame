import ObjetGraphique from '../shapes/ObjetGraphique';
import { CAGE_HEIGHT, CAGE_WIDTH } from '../../utils/Constants';

/**
 * Objet representant une cage de but
 */
export default class Cage extends ObjetGraphique {
  /**
   * Constructeur
   * @param x {number} Position en X
   * @param y {number} Position en Y
   */
  constructor(x, y) {
    super(x, y, CAGE_WIDTH, CAGE_HEIGHT);
  }

  /**
   * Dessine le sol de la cage
   * @param ctx Context avec lequel on dessine
   */
  drawSol(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = '#27ae60';
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.restore();
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.strokeStyle = 'white';

    ctx.strokeRect(0, 0, this.width, this.height);
    ctx.lineWidth = 1;

    let space = this.width / 4;

    for (let i = 0; i < 4; i += 1) {
      ctx.strokeRect(i * space, 0, 1, this.height);
    }

    space = this.height / 11;

    for (let i = 0; i < 11; i += 1) {
      ctx.strokeRect(0, i * space, this.width, 1);
    }

    ctx.restore();
  }
}
