import ObjetGraphique from '../shapes/ObjetGraphique';

/**
 * Objet graphique representant le curseur de tir
 */
export default class CurseurTir extends ObjetGraphique {
  /**
   * Constructeur
   * @param x Position en X
   * @param y Position en Y
   */
  constructor(x, y) {
    super(x, y, 100, 15);

    this.estVisible = false;
    this.angle = 0;
    this.joueur = null;
  }

  draw(ctx) {
    if (!this.estVisible) return;

    ctx.save();
    ctx.translate(this.x + (this.width / 2), this.y + (this.height / 2));
    ctx.rotate(this.angle);
    ctx.translate(-this.width / 2, -this.height / 2);

    const gradientColor = 'rgba(255, 137, 0, 1)';
    const gradientColor2 = 'rgba(255, 0, 0, 1)';

    function gradient(g) {
      g.addColorStop(0, gradientColor);
      g.addColorStop(1, gradientColor2);
      return g;
    }

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
