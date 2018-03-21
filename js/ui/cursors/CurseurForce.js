import ObjetGraphique from '../shapes/ObjetGraphique';
import { CURSEUR_FORCE_HEIGHT, CURSEUR_FORCE_WIDTH } from '../../utils/Constants';

/**
 * Objet graphique representant un curseur qui va definir la force de tir
 */
export default class CurseurForce extends ObjetGraphique {
  /**
   * Constrcuteur
   * @param x Position en X
   * @param y Position en Y
   */
  constructor(x, y) {
    super(x, y, CURSEUR_FORCE_WIDTH, CURSEUR_FORCE_HEIGHT);

    this.valeur = 0.5;
    this.margeCote = 5;
  }

  draw(ctx) {
    let margin = this.width / 2;

    ctx.save();

    ctx.translate(this.x, this.y);
    ctx.fillStyle = '#0d0e1a';
    ctx.strokeStyle = '#ecf0f1';
    ctx.lineWidth = 3;

    ctx.beginPath();
    ctx.moveTo(0, margin);
    ctx.arc(this.width / 2, margin, margin, Math.PI, 0);
    ctx.lineTo(this.width, this.height - margin);
    ctx.arc(this.width / 2, this.height - margin, margin, 0, Math.PI);
    ctx.lineTo(0, margin);
    ctx.fill();
    ctx.stroke();

    ctx.fillStyle = '#e74c3c';

    const w = this.width - (2 * this.margeCote);
    let h = this.height - (2 * this.margeCote);

    margin = w / 2;

    h *= this.valeur;
    h -= 15;

    ctx.translate(this.margeCote, this.height - this.margeCote - margin);

    ctx.beginPath();
    ctx.arc(w / 2, 0, w / 2, 0, Math.PI);
    ctx.arc(w / 2, -h, w / 2, Math.PI, 0);
    ctx.fill();

    ctx.restore();
  }

  /**
   * Defini la nouvelle valeur du curseur
   * @param y Position en y où l'on a cliqué
   */
  definirNouvelValeur(y) {
    const yMin = this.y + this.margeCote;
    const yMax = this.height - (2 * this.margeCote);

    this.valeur = 1 - ((y - yMin) / yMax);
  }
}
