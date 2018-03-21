import ObjetGraphique from '../shapes/ObjetGraphique';
import { COLORS_PICKER } from '../../utils/Constants';

/**
 * Objet graphique representant une palette de couleur
 */
export default class ColorPicker extends ObjetGraphique {
  /**
   * Constructeur
   * @param x Positon en X
   * @param y Position en Y
   */
  constructor(x, y) {
    super(x, y, 200, 200);

    this.estVisible = false;
    this.indexSelected = null;
    this.flagSelected = null;
  }

  draw(ctx) {
    if (!this.estVisible) return;

    ctx.save();

    ctx.fillStyle = '#fff';
    ctx.translate(this.x, this.y);

    const cornerRadius = 5;

    ctx.beginPath();
    ctx.arc(cornerRadius, cornerRadius, cornerRadius, Math.PI, 1.5 * Math.PI);
    ctx.arc(this.width - cornerRadius, cornerRadius, cornerRadius, 1.5 * Math.PI, 2 * Math.PI);
    ctx.arc(this.width - cornerRadius, this.height - cornerRadius, cornerRadius, 0, 0.5 * Math.PI);
    ctx.arc(cornerRadius, this.height - cornerRadius, cornerRadius, 0.5 * Math.PI, Math.PI);
    ctx.closePath();

    ctx.fill();

    ctx.translate(this.width, 10);

    ctx.beginPath();
    ctx.moveTo(0, 0);
    ctx.lineTo(10, 10);
    ctx.lineTo(0, 20);
    ctx.fill();

    ctx.translate(-this.width, -10);

    const margeW = this.width * 0.1;
    const margeH = this.height * 0.1;

    const w = this.width - (4 * margeW);
    const h = this.height - (4 * margeH);

    ctx.translate(margeW, margeH);

    for (let i = 0; i < 3; i += 1) {
      for (let j = 0; j < 3; j += 1) {
        ctx.fillStyle = COLORS_PICKER[i][j];
        ctx.fillRect(0, 0, w / 3, h / 3);
        ctx.translate((w / 3) + margeW, 0);
      }

      ctx.translate(-3 * ((w / 3) + margeW), (h / 3) + margeH);
    }

    ctx.restore();
  }
}
