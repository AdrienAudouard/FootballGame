import ObjetGraphique from './ObjetGraphique';


/**
 * Objet graphique contenant une image
 */
export default class ImageObjet extends ObjetGraphique {
  /**
   * Constructeur
   * @param x {number} Position en X
   * @param y {number} Position en Y
   * @param src {string} Lien vers l'image
   */
  constructor(x, y, src) {
    super(x, y, 32, 32);

    this.image = new Image();
    this.imageLoaded = false;

    this.image.addEventListener('load', () => {
      this.imageLoaded = true;
    });

    this.image.src = src;
    this.angle = 0;
    this.doitAugmenterAngle = false;
  }

  augmenterAngle() {
    this.doitAugmenterAngle = true;
  }

  baisserAngle() {
    this.doitAugmenterAngle = false;
  }

  draw(ctx) {
    if (this.doitAugmenterAngle) {
      this.angle += 0.125;

      if (this.angle > Math.PI) {
        this.angle = Math.PI;
      }
    } else {
      this.angle -= 0.125;

      if (this.angle < 0) {
        this.angle = 0;
      }
    }

    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.translate(this.width / 2, this.height / 2);
    ctx.rotate(this.angle);
    ctx.translate(-this.width / 2, -this.height / 2);

    ctx.drawImage(this.image, 0, 0, this.width, this.height);

    ctx.restore();
  }
}
