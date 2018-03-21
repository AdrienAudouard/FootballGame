import ObjetGraphique from '../shapes/ObjetGraphique';
import { COLOR_1, FLAG_HEIGHT, FLAG_WIDTH } from '../../utils/Constants';
import { setCookie } from '../../utils/Cookies';

/**
 * Objet graphique representant un drapeau
 */
export default class Drapeau extends ObjetGraphique {
  /**
   * Constructeur
   * @param x {number} Position en X
   * @param y {number} Position en Y
   * @param colors Couleurs du drapeau
   */
  constructor(x, y, colors) {
    super(x, y, FLAG_WIDTH, FLAG_HEIGHT);

    this.colors = colors;
  }

  draw(ctx) {
    ctx.save();

    ctx.translate(this.x, this.y);

    for (let i = 0; i < 3; i += 1) {
      ctx.fillStyle = this.colors[i];
      ctx.fillRect(i * (this.width / 3), 0, this.width / 3, this.height);
    }

    ctx.restore();
  }

  /**
   * Change une couleur du drapeau et met à jour les cookies
   * @param index {number} Indice de la couleur
   * @param color {string} Nouvelle couleur
   */
  setColor(index, color) {
    const cookie = this.colors === COLOR_1 ? 'COLOR_1_' : 'COLOR_2_';

    this.colors[index] = color;

    setCookie(cookie + index, color, 100);
  }
}
