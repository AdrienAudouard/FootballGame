import ImageObjet from '../shapes/ImageObjet';

/**
 * Bouton
 */
export default class ReloadButton extends ImageObjet {
  /**
   * Constructeur
   * @param x {number} Position en X
   * @param y {number} Position en Y
   */
  constructor(x, y) {
    super(x, y, 'img/icons/icon_reload.png');
  }
}
