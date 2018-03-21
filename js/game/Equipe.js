import Joueur from './Joueur';
import { BALLON_WIDTH, COLOR_1, COLOR_2, COTE, POSITIONS } from '../utils/Constants';

/**
 * Classe representant une équipe
 */
export default class Equipe {
  /**
   * Constructeur
   * @param cote Coté de l'équipe (DROITE OU GAUCHE)
   * @param map Terrain de jeu
   */
  constructor(cote, map) {
    this.cote = cote;
    this.joueurs = [];

    this.creerJoueurs(map);
    this.doitJouer = false;
  }

  /**
   * Initialise tous les joueurs de l'équipe
   * @param map Terrain de jeu
   */
  creerJoueurs(map) {
    this.joueurs = [];

    POSITIONS.forEach((p) => {
      const x = (this.cote === COTE.GAUCHE) ? map.x + p.x
        : ((map.x + map.width) - p.x) - BALLON_WIDTH;
      const y = map.y + p.y;
      const c = (this.cote === COTE.GAUCHE) ? COLOR_1 : COLOR_2;

      this.joueurs.push(new Joueur(x, y, c));
    });
  }

  draw(ctx) {
    this.joueurs.forEach((j) => {
      j.draw(ctx, this.doitJouer);
    });
  }
}
