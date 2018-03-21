import Rond from '../shapes/Rond';
import { BALLON_WIDTH } from '../../utils/Constants';

/**
 * Objet graphique representant un ballon
 */
export default class Ballon extends Rond {
  /**
   * Constructeur
   * @param x {number} Position en X
   * @param y {number} Position en Y
   */
  constructor(x, y) {
    super(x, y, BALLON_WIDTH);
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);

    ctx.fillStyle = 'rgb(0, 0, 0)';

    ctx.shadowColor = 'black';
    ctx.shadowBlur = 10;

    ctx.beginPath();
    ctx.arc(this.width / 2, this.height / 2, this.width / 2, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();

    ctx.shadowBlur = 0;

    ctx.beginPath();
    ctx.moveTo(11.62, 0);
    ctx.bezierCurveTo(12.86, 1.15, 14.4, 2.58, 14.4, 2.58);
    ctx.bezierCurveTo(14.4, 2.58, 17.43, 0.9, 18.83, 0.11);
    ctx.bezierCurveTo(19.15, 0.2, 19.47, 0.29, 19.78, 0.39);
    ctx.bezierCurveTo(21.14, 0.85, 22.42, 1.5, 23.57, 2.31);
    ctx.bezierCurveTo(22.5, 2.84, 21.57, 3.3, 21.57, 3.3);
    ctx.lineTo(22.43, 9.12);
    ctx.lineTo(28.22, 10.1);
    ctx.bezierCurveTo(28.22, 10.1, 28.49, 9.58, 28.86, 8.88);
    ctx.bezierCurveTo(29.6, 10.64, 30, 12.58, 30, 14.62);
    ctx.bezierCurveTo(30, 16.73, 29.56, 18.74, 28.78, 20.56);
    ctx.bezierCurveTo(28.11, 19.64, 27.55, 18.86, 27.55, 18.86);
    ctx.lineTo(21.96, 20.67);
    ctx.lineTo(21.95, 26.55);
    ctx.bezierCurveTo(21.95, 26.55, 22.58, 26.76, 23.42, 27.03);
    ctx.bezierCurveTo(22.16, 27.89, 20.76, 28.56, 19.26, 29.01);
    ctx.bezierCurveTo(17.99, 28.16, 14.91, 26.08, 14.91, 26.08);
    ctx.bezierCurveTo(14.91, 26.08, 14.34, 26.52, 13.61, 27.09);
    ctx.bezierCurveTo(12.79, 27.74, 11.75, 28.55, 11.06, 29.09);
    ctx.bezierCurveTo(9.2, 28.59, 7.49, 27.74, 5.99, 26.61);
    ctx.bezierCurveTo(6.83, 26.17, 7.48, 25.83, 7.48, 25.83);
    ctx.lineTo(6.49, 20.04);
    ctx.bezierCurveTo(6.49, 20.04, 1.22, 19.27, 0.71, 19.2);
    ctx.bezierCurveTo(0.25, 17.75, 0, 16.21, 0, 14.62);
    ctx.bezierCurveTo(0, 13.24, 0.19, 11.9, 0.54, 10.63);
    ctx.bezierCurveTo(0.69, 10.92, 0.78, 11.1, 0.78, 11.1);
    ctx.lineTo(6.57, 10.11);
    ctx.lineTo(7.43, 4.3);
    ctx.bezierCurveTo(7.43, 4.3, 6.4, 3.79, 5.25, 3.22);
    ctx.bezierCurveTo(6.85, 1.85, 8.74, 0.81, 10.81, 0.21);
    ctx.bezierCurveTo(11.07, 0.13, 11.33, 0.07, 11.6, 0.01);
    ctx.lineTo(11.62, 0);
    ctx.closePath();
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(15, 10);
    ctx.lineTo(19.76, 13.45);
    ctx.lineTo(17.94, 19.05);
    ctx.lineTo(12.06, 19.05);
    ctx.lineTo(10.24, 13.45);
    ctx.closePath();
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fill();

    ctx.restore();
  }
}
