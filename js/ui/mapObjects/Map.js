import ObjetGraphique from '../shapes/ObjetGraphique';
import Cage from './Cage';
import { CAGE_HEIGHT, CAGE_WIDTH } from '../../utils/Constants';

/**
 * Objet representant le terrain de jeu
 */
export default class Map extends ObjetGraphique {
  /**
   * Constructeur
   * @param x {number} Position en X
   * @param y {number} Position en Y
   * @param w {number} Largeur
   * @param h {number} Hauteur
   */
  constructor(x, y, w, h) {
    super(x, y, w, h);


    const yCage = (this.height / 2) - (CAGE_HEIGHT / 2);

    this.cageGauche = new Cage(this.x + -CAGE_WIDTH, this.y + yCage);
    this.cageDroite = new Cage(this.x + this.width, this.y + yCage);
  }

  draw(ctx) {
    ctx.save();

    ctx.strokeStyle = 'white';
    ctx.fillStyle = '#27ae60';
    ctx.lineWidth = 4;
    ctx.translate(this.x, this.y);

    ctx.fillRect(0, 0, this.width, this.height);


    ctx.fillStyle = '#1f8241';

    const space = this.width / 15;

    for (let i = 0; i < 15; i += 1) {
      if (i % 2 === 0) {
        const x = i * space;
        ctx.fillRect(x, 0, space, this.height);
      }
    }

    ctx.strokeRect(this.width / 2, 0, 1, this.height);

    ctx.fillStyle = 'white';

    ctx.beginPath();
    ctx.arc(this.width / 2, this.height / 2, 20 / 2, 0, 2 * Math.PI);
    ctx.fill();

    ctx.beginPath();
    ctx.arc(this.width / 2, this.height / 2, 200 / 2, 0, 2 * Math.PI);
    ctx.stroke();

    ctx.strokeRect(0, 0, this.width, this.height);

    ctx.restore();
  }
}
