import ObjetGraphique from '../ui/shapes/ObjetGraphique';

/**
 * Classe static qui va detecter les collisions
 */
export default class GestionnaireCollision {
  /**
   * Detecte une collision entre deux carrés
   * @param c1 {ObjetGraphique}
   * @param c2 {ObjetGraphique}
   * @returns {boolean} true s'il y a eu une collision
   */
  static carreDansCarre(c1, c2) {
    return !(c2.x >= c1.x + c1.width
      || c2.x + c2.width <= c1.x
      || c2.y >= c1.y + c1.height
      || c2.y + c2.height <= c1.height);
  }

  /**
   * Detecte si un point est dans un rectangle
   * @param r {ObjetGraphique} Rectangle
   * @param p {{x: number, y: number}} Point
   * @returns {boolean} true si le point est dans le rectangle
   */
  static pointDansRectangle(r, p) {
    return p.x >= r.x
      && p.x <= r.x + r.width
      && p.y >= r.y
      && p.y <= r.y + r.height;
  }

  /**
   * Collision d'un point dans un cercle
   * @param c Cercle
   * @param r Rayon du cercle
   * @param p point
   * @returns {boolean} true s'il y a collision
   */
  static pointDansCercle(c, r, p) {
    const d = ((p.x - c.x) * (p.x - c.x)) + ((p.y - c.y) * (p.y - c.y));

    return d <= (r * r);
  }

  /**
   * Collision entre deux cercles
   * @param c1 Premier cercle
   * @param c2 Deuxieme cercle
   * @param r1 Rayon du premier cercle
   * @param r2 Rayon du deuxieme cercle
   * @returns {boolean} true s'il y a collision
   */
  static cercleCercle(c1, c2, r1, r2) {
    const d = ((c1.x - c2.x) * (c1.x - c2.x)) + ((c1.y - c2.y) * (c1.y - c2.y));

    return d <= (r1 + r2) * (r1 + r2);
  }

  /**
   * Projection d'un point sur un segment
   * @param p {{x: number, y: number}} Point
   * @param a {{x: number, y: number}} Extremité du segment
   * @param b {{x: number, y: number}} Extrémité du segment
   * @returns {boolean} true si la projection est possible
   */
  static projectionSurSegment(p, a, b) {
    const apx = p.x - a.x;
    const apy = p.y - a.y;
    const abx = b.x - a.x;
    const aby = b.y - a.y;
    const bpx = p.x - b.x;
    const bpy = p.y - b.y;
    const s1 = (apx * abx) + (apy * aby);
    const s2 = (bpx * abx) + (bpy * aby);

    return s1 * s2 <= 0;
  }

  /**
   * Indique s'il y a une collision entre un cercle et un rectangle
   * @param c {Rond} Cercle
   * @param r {ObjetGraphique} Rectangle
   * @returns {boolean} true s'il y a une collision
   */
  static cercleDansCarre(c, r) {
    if (!this.carreDansCarre(c, r)) return false;

    if (this.pointDansCercle(c, c.rayon(), { x: r.x, y: r.y })
      || this.pointDansCercle(c, c.rayon(), { x: r.x, y: r.y + r.height })
      || this.pointDansCercle(c, c.rayon(), { x: r.x + r.width, y: r.y })
      || this.pointDansCercle(c, c.rayon(), { x: r.x + r.width, y: r.y + r.height })) {

      return true;
    }

    if (this.pointDansRectangle(r, c.centre())) {
      return true;
    }

    const projVerticale = this.projectionSurSegment(c.centre(), { x: r.x, y: r.y }, { x: r.x, y: r.y + r.height });
    const projHorizontale = this.projectionSurSegment(c.centre(), { x: r.x, y: r.y }, { x: r.x + r.width, y: r.y });

    return projHorizontale || projVerticale;
  }

  /**
   * Indique s'il le point est dans le drapeau
   * @param d {Drapeau} Drapau
   * @param p {{x: number, y: number}} Point
   * @returns {*} Objet indiquant si le point est dans le drapeau,
   * la position de la partie du drapeau cliquée et le drapeau
   */
  static dansDrapeau(d, p) {
    const y = d.y;

    const w = d.width / 3;
    const h = d.height;

    for (let i = 0; i < 3; i += 1) {
      const x = d.x + (i * w);

      const obj = new ObjetGraphique(x, y, w, h);

      if (this.pointDansRectangle(obj, p)) {
        return {
          clicked: true,
          index: i,
          y,
          x,
          flag: d,
        };
      }
    }

    return {
      clicked: false,
      index: 0,
      y: 0,
      x: 0,
      flag: d,
    };
  }

  /**
   * Indique si le point est dans le color picker
   * @param c {ColorPicker} ColorPicker
   * @param p {{x: number, y: number}} Point
   * @returns {*} Retourne un objet indiquant si le point est dans le color picker,
   * les indices i et j de la couleur cliquée
   */
  static dansColorPicker(c, p) {
    if (!c.estVisible) return { clicked: false };

    const margeW = c.width * 0.1;
    const margeH = c.height * 0.1;

    const w = c.width - (4 * margeW);
    const h = c.height - (4 * margeH);

    let minY = c.y;

    for (let i = 0; i < 3; i += 1) {
      minY += margeH;

      for (let j = 0; j < 3; j += 1) {
        const minX = (c.x + margeW) + (j * (margeW + (w / 3)));

        const obj = new ObjetGraphique(minX, minY, w / 3, h / 3);

        if (this.pointDansRectangle(obj, p)) {
          return {
            clicked: true,
            i,
            j,
          };
        }
      }

      minY += h / 3;
    }

    return { clicked: false };
  }

  /**
   * Indique s'il un point est dans le curseur de force
   * @param c {CurseurForce} Curseur de force
   * @param p {{x: number, y: number}} Point
   * @returns {boolean} true si le point est dans le curseur de force
   */
  static dansCurseurForce(c, p) {
    const x = c.x + c.margeCote;
    const y = c.y + c.margeCote;

    const w = c.width - (2 * c.margeCote);
    const h = c.height - (2 * c.margeCote);

    const obj = new ObjetGraphique(x, y, w, h);

    return this.pointDansRectangle(obj, p);
  }
}
