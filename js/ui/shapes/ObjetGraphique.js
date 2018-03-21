/**
 * Objet qui va être dessiné à l'écran
 */

export default class ObjetGraphique {
  /**
   * Constructeur par defaut
   * @param pX {number} Position en X
   * @param pY {number} Position en Y
   * @param w {number} Largeur
   * @param h {number} Hauteur
   */
  constructor(pX, pY, w, h) {
    this.x = pX;
    this.y = pY;
    this.width = w;
    this.height = h;
  }

  /**
   * Retourne la poisiton au centre de l'écran
   * @returns {{x: number, y: number}}
   */
  centre() {
    return {
      x: this.x + (this.width / 2),
      y: this.y + (this.height / 2),
    };
  }
}
