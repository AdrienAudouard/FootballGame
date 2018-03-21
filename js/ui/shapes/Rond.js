import ObjetGraphique from './ObjetGraphique';

/**
 * Objet graphique representant un rond qui se deplace
 */
export default class Rond extends ObjetGraphique {
  /**
   * Constructeur
   * @param x {number} Position en X
   * @param y {number} Position en Y
   * @param r {number} Diametre
   */
  constructor(x, y, r) {
    super(x, y, r, r);

    this.vitesse = 0;
    this.angle = 0;
    this.vitesseX = 0;
    this.vitesseY = 0;
  }

  /**
   * Retourne le rayon du rond
   * @returns {number}
   */
  rayon() {
    return this.width / 2;
  }

  /**
   * Inverse la vitesse sur l'axe des X
   */
  inverserVx() {
    this.vitesseX = (this.vitesseX < 0) ? Math.abs(this.vitesseX) : -this.vitesseX;
  }

  /**
   * Inverse la vitesse sur l'axe des Y
   */
  inverserVy() {
    this.vitesseY = (this.vitesseY < 0) ? Math.abs(this.vitesseY) : -this.vitesseY;
  }

  vX() {
    return this.vitesseX;
  }

  vY() {
    return this.vitesseY;
  }

  /**
   * Met à jour la position de l'objet
   * @param delta {number} Temps écoulé depuis la derniere update
   */
  update(delta) {
    if (this.vitesseX === 0 && this.vitesseY === 0) return;

    const newDelta = (delta / (1000 / 60));

    this.x += this.vitesseX * newDelta;
    this.y += this.vitesseY * newDelta;

    this.vitesseX *= 0.97 * newDelta;
    this.vitesseY *= 0.97 * newDelta;

    if ((this.vitesseY < 0.1 && this.vitesseY > -0.1) || (this.vitesseX < 0.1 && this.vitesseX > -0.1)) {
      this.vitesseY = 0;
      this.vitesseX = 0;
    }
  }
}
