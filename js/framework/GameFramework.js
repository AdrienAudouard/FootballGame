import Equipe from '../game/Equipe';
import CurseurTir from '../ui/cursors/CurseurTir';
import ColorPicker from '../ui/buttons/ColorPicker';
import Ballon from '../ui/mapObjects/Ballon';
import ReloadButton from '../ui/buttons/ReloadButton';
import GestionnaireCollision from '../managers/GestionnaireCollision';
import SoundButton from '../ui/buttons/SoundButton';
import Drapeau from '../ui/mapObjects/Drapeau';
import CurseurForce from '../ui/cursors/CurseurForce';
import { SoundsManager } from '../managers/SoundManager';
import { getCookie } from '../utils/Cookies';
import Map from '../ui/mapObjects/Map';

import {
  BALLON_WIDTH,
  COLOR_1,
  COLOR_2, COLORS_PICKER,
  COTE, CURSEUR_FORCE_HEIGHT, CURSEUR_FORCE_WIDTH, FLAG_HEIGHT, FLAG_WIDTH, MAP_HEIGHT, ROND_WIDTH,
  VITESSE_MAX,
} from '../utils/Constants';


/**
 * GameFramework
 * @returns {{init: init, onClick: onClick, onMouseMove: onMouseMove}}
 * @constructor
 */
export function GameFramework() {
  let canvas;
  let w;
  let h;
  let map;
  let equipes;
  let ballon;
  let ctx;
  let tour;
  let score;
  let curseurTir;
  let curseurForce;
  let colorPicker;
  let drapeauGauche;
  let drapeauDroit;
  let tirEnCours;
  let dernierTir;
  let reloadButton;
  let soundButton;
  let soundsManager;
  let chargementEnCours;
  let lastUpdate;

  /**
   * Initialise les couleurs des équipes
   */
  function initColors() {
    for (let i = 0; i < 3; i += 1) {
      COLOR_1[i] = getCookie(`COLOR_1_${i}`) === '' ? COLOR_1[i] : getCookie(`COLOR_1_${i}`);
      COLOR_2[i] = getCookie(`COLOR_2_${i}`) === '' ? COLOR_2[i] : getCookie(`COLOR_2_${i}`);
    }
  }

  /**
   * Reinitialise le jeu
   */
  function reset() {
    const x = (w / 2) - (ROND_WIDTH / 2);
    const y = (h / 2) - (MAP_HEIGHT / 2);

    tour = COTE.GAUCHE;
    equipes[0].doitJouer = true;
    equipes[1].doitJouer = false;

    equipes[0].creerJoueurs(map);
    equipes[1].creerJoueurs(map);

    ballon = new Ballon((x + (map.width / 2))
      - (BALLON_WIDTH / 2), (y + (map.height / 2)) - (BALLON_WIDTH / 2));
  }

  /**
   * Reinitialise le jeu et les scores
   */
  function fullReset() {
    reset();
    score.DROITE = 0;
    score.GAUCHE = 0;
  }

  /**
   * Verifie si un joueur est en deplacement
   */
  function checkTirEnCours() {
    tirEnCours = false;
    equipes.forEach((e) => {
      e.joueurs.forEach((j) => {
        if (j.vitesse > 0) tirEnCours = true;
      });
    });
  }

  /**
   * Met à joueur la position des joueurs et du ballon
   */
  function update(currentTime) {
    checkTirEnCours();

    const delta = currentTime - lastUpdate;
    lastUpdate = currentTime;

    ballon.update(delta);

    equipes.forEach((eq) => {
      eq.joueurs.forEach((e) => {
        e.update(delta);
      });
    });
  }

  function rotate(vX, vY, angle) {
    return {
      x: (vX * Math.cos(angle)) - (vY * Math.sin(angle)),
      y: (vX * Math.sin(angle)) + (vY * Math.cos(angle)),
    };
  }

  /**
   * Gere une collision entre deux joueurs
   * @param j{Joueur} Premier joueur avec lequel on doit gerer la collision
   * @param j2{Joueur} Deuxieme joueur avec lequel on doit gerer la collision
   *
   * Algorithme trouvé sur GitHub :
   * https://gist.github.com/christopher4lis/f9ccb589ee8ecf751481f05a8e59b1dc
   */
  function gererCollision(j, j2) {
    const xVelocityDiff = j.vX() - j2.vX();
    const yVelocityDiff = j.vY() - j2.vY();

    const xDist = j2.x - j.x;
    const yDist = j2.y - j.y;

    if ((xVelocityDiff * xDist) + (yVelocityDiff * yDist) >= 0) {
      const angle = Math.atan2(j2.y - j.y, j2.x - j.x);

      const m1 = 1;
      const m2 = 1;

      const u1 = rotate(j.vX(), j.vY(), angle);
      const u2 = rotate(j2.vX(), j2.vY(), angle);

      const v1 = { x: ((u1.x * (m1 - m2)) / (m1 + m2)) + (((u2.x * 2) * m2) / (m1 + m2)), y: u1.y };
      const v2 = { x: ((u2.x * (m1 - m2)) / (m1 + m2)) + (((u1.x * 2) * m2) / (m1 + m2)), y: u2.y };

      // Final velocity after rotating axis back to original location
      const vFinal1 = rotate(v1.x, v1.y, -angle);
      const vFinal2 = rotate(v2.x, v2.y, -angle);

      j.vitesseX = vFinal1.x;
      j.vitesseY = vFinal1.y;

      j2.vitesseX = vFinal2.x;
      j2.vitesseY = vFinal2.y;
    }
  }

  /**
   * Gere les collisions avec les bords du terrain
   * @param e Objet avec lequel on doit verifier les collisions
   */
  function collisonBords(e) {
    let collision = false;

    if (GestionnaireCollision.cercleDansCarre(e, map.cageDroite)) {
      if (e.x + e.width >= map.cageDroite.x + map.cageDroite.width) {
        e.x = (map.cageDroite.x + map.cageDroite.width) - e.width;
        e.inverserVx();

        collision = true;
      }
      if (e.y <= map.cageDroite.y) {
        e.y = map.cageDroite.y;
        e.inverserVy();

        collision = true;
      } else if (e.y + e.height >= map.cageDroite.y + map.cageDroite.height) {
        e.y = (map.cageDroite.y + map.cageDroite.height) - e.height;
        e.inverserVy();

        collision = true;
      }
      // S'il y a collision avec la cage gauche
    } else if (GestionnaireCollision.cercleDansCarre(e, map.cageGauche)) {
      if (e.x <= map.cageGauche.x) {
        e.x = map.cageGauche.x;
        e.inverserVx();

        collision = true;
      }
      if (e.y <= map.cageGauche.y) {
        e.y = map.cageGauche.y;
        e.inverserVy();

        collision = true;
      } else if (e.y + e.height >= map.cageGauche.y + map.cageGauche.height) {
        e.y = (map.cageGauche.y + map.cageGauche.height) - e.height;
        e.inverserVy();

        collision = true;
      }
    } else if (e.x <= map.x) {
      e.x = map.x;
      e.inverserVx();

      collision = true;
    } else if (e.x + e.width >= map.x + map.width) {
      e.x = (map.x + map.width) - e.width;
      e.inverserVx();

      collision = true;
    } else if (e.y <= map.y) {
      e.y = map.y;
      e.inverserVy();

      collision = true;
    } else if (e.y + e.height >= map.y + map.height) {
      e.y = (map.y + map.height) - e.height;
      e.inverserVy();
      collision = true;
    }

    if (collision) {
      soundsManager.collisionBords();
    }
  }

  /**
   * Traite toutes les collisions
   */
  function collisions() {
    collisonBords(ballon);

    equipes.forEach((eq) => {
      eq.joueurs.forEach((e) => {
        // Touche le cote droit
        collisonBords(e);
      });
    });

    let collision = false;

    // Pour toutes les equipes
    equipes.forEach((e) => {
      // Pour chaque joueur de chaque équipe
      e.joueurs.forEach((j) => {
        if (GestionnaireCollision.cercleCercle(j, ballon, j.rayon(), ballon.rayon())) {
          gererCollision(j, ballon);
          collision = true;
        }

        // Pour chaque équipe
        equipes.forEach((e2) => {
          // Chaque joueur de chaque équipe
          e2.joueurs.forEach((j2) => {
            if (j.x === j2.x && j.y === j2.y) {
              return;
            }

            if (GestionnaireCollision.cercleCercle(j, j2, j.rayon(), j2.rayon())) {
              collision = true;
              gererCollision(j, j2);
            }
          });
        });
      });
    });

    if (collision) {
      soundsManager.collisionJoueurs();
    }

    if (GestionnaireCollision.pointDansRectangle(map.cageGauche, ballon.centre())) {
      score.DROITE += 1;
      reset();
      soundsManager.but();
    } else if (GestionnaireCollision.pointDansRectangle(map.cageDroite, ballon.centre())) {
      score.GAUCHE += 1;
      reset();
      soundsManager.but();
    }
  }

  function drawJeu(currentTime) {
    collisions();
    update(currentTime);

    ctx.save();

    ctx.font = '70px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText(`${score.GAUCHE} : ${score.DROITE}`, w / 2, (map.y / 2) + 30);

    map.draw(ctx);

    map.cageDroite.drawSol(ctx);
    map.cageGauche.drawSol(ctx);

    curseurForce.draw(ctx);
    curseurTir.draw(ctx);

    equipes[0].draw(ctx);
    equipes[1].draw(ctx);
    ballon.draw(ctx);

    drapeauGauche.draw(ctx);
    drapeauDroit.draw(ctx);

    colorPicker.draw(ctx);

    map.cageDroite.draw(ctx);
    map.cageGauche.draw(ctx);

    reloadButton.draw(ctx);
    soundButton.draw(ctx);

    ctx.restore();
  }

  function drawChargement() {
    const toLoad = [soundButton.noSoundLoaded,
      soundButton.soundLoaded,
      reloadButton.imageLoaded,
      soundsManager.getAudioBordsLoaded(),
      soundsManager.getAudioButLoaded(),
      soundsManager.getAudioJoueursLoaded()];

    let isLoad = 0;

    for (let i = 0; i < toLoad.length; i += 1) {
      if (toLoad[i]) isLoad += 1;
    }

    const pourcent = (isLoad / toLoad.length);

    if (pourcent === 1) {
      chargementEnCours = false;
    }

    ctx.save();

    ctx.translate(map.x + (map.width / 2), map.y + (map.height / 2));

    ctx.font = '70px Arial';
    ctx.fillStyle = 'white';
    ctx.textAlign = 'center';
    ctx.fillText('Chargement en cours...', 0, 0);

    const wR = map.width;
    const hR = 30;

    const margin = 5;

    const wL = (wR - (margin * 2)) * pourcent;
    const hL = hR - (margin * 2);

    ctx.fillStyle = '#101421';
    ctx.translate(-(wR / 2), 100);
    ctx.fillRect(0, 0, wR, hR);

    ctx.fillStyle = '#e74c3c';
    ctx.translate(margin, margin);
    ctx.fillRect(0, 0, wL, hL);

    ctx.restore();
  }

  function draw(currentTime) {
    ctx.clearRect(0, 0, w, h);

    if (chargementEnCours) {
      drawChargement();
    } else {
      drawJeu(currentTime);
    }

    requestAnimationFrame(draw);
  }

  /**
   * Effectue un tir
   */
  function tir() {
    if (tirEnCours) { return; }

    tirEnCours = true;
    dernierTir = tour;

    curseurTir.joueur.vitesseX = Math.cos(curseurTir.angle) * (VITESSE_MAX * parseFloat(curseurForce.valeur));
    curseurTir.joueur.vitesseY = Math.sin(curseurTir.angle) * (VITESSE_MAX * parseFloat(curseurForce.valeur));
    curseurTir.estVisible = false;
    curseurTir.joueur = null;
    tour = (tour === COTE.GAUCHE) ? COTE.DROITE : COTE.GAUCHE;

    if (tour === COTE.GAUCHE) {
      equipes[0].doitJouer = true;
      equipes[1].doitJouer = false;
    } else {
      equipes[0].doitJouer = false;
      equipes[1].doitJouer = true;
    }
  }

  /**
   * Initialise le GameFramework
   */
  function init() {
    chargementEnCours = true;

    canvas = document.querySelector('#myCanvas');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    w = canvas.width;
    h = canvas.height;

    lastUpdate = new Date().getTime();

    reloadButton = new ReloadButton(20, 20);
    soundButton = new SoundButton(w - 52, 20);

    soundsManager = new SoundsManager();
    soundsManager.init();

    const soundEnabled = (getCookie('sound') === '' || getCookie('sound') === 'true');
    soundsManager.setEnabled(soundEnabled);
    soundButton.setEnabled(soundEnabled);

    tirEnCours = false;

    ctx = canvas.getContext('2d');

    initColors();

    const x = (w / 2) - (ROND_WIDTH / 2);
    const y = (h / 2) - (MAP_HEIGHT / 2);

    map = new Map(x, y, ROND_WIDTH, MAP_HEIGHT);

    equipes = [];
    equipes.push(new Equipe(COTE.GAUCHE, map));
    equipes.push(new Equipe(COTE.DROITE, map));

    curseurTir = new CurseurTir(10, 10);

    score = {
      GAUCHE: 0,
      DROITE: 0,
    };

    const xForce = (map.x / 2) - (CURSEUR_FORCE_WIDTH / 2);
    const yForce = (h / 2) - (CURSEUR_FORCE_HEIGHT / 2);

    curseurForce = new CurseurForce(xForce, yForce);
    colorPicker = new ColorPicker(10, 10);

    const yDrapeau = (map.y / 2) - (FLAG_HEIGHT / 2);
    const xDrapeau = (map.x + (map.width / 4)) - (FLAG_WIDTH / 2);

    drapeauGauche = new Drapeau(xDrapeau, yDrapeau, COLOR_1);
    drapeauDroit = new Drapeau(xDrapeau + (map.width / 2), yDrapeau, COLOR_2);

    reset();

    requestAnimationFrame(draw);
  }

  /**
   * Gere un clique dans un joueur
   * @param p {{x: number, y: number}} Point où l'on a cliqué
   * @returns {Joueur} Joueur si un joueur a été cliqué, null si aucun joueur n'a été cliqué
   */
  function clickDansJoueur(p) {
    if (tirEnCours) return null;

    const equipe = equipes[tour];

    for (let k = 0; k < equipe.joueurs.length; k += 1) {
      const j = equipe.joueurs[k];
      if (GestionnaireCollision.pointDansCercle(j.centre(), j.rayon(), p)) {
        return j;
      }
    }

    return null;
  }

  /**
   * Gere un clique
   * @param e Position où il y a eu le clique
   */
  function onClick(e) {
    const p = { x: e.clientX, y: e.clientY };

    const c = GestionnaireCollision.dansColorPicker(colorPicker, p);

    if (c.clicked) {
      colorPicker.estVisible = false;
      colorPicker.flagSelected.setColor(colorPicker.indexSelected, COLORS_PICKER[c.i][c.j]);

      return;
    }

    colorPicker.estVisible = false;

    if (GestionnaireCollision.pointDansRectangle(reloadButton, p)) {
      fullReset();

      return;
    }

    if (GestionnaireCollision.pointDansRectangle(soundButton, p)) {
      soundsManager.setEnabled(soundButton.inverser());

      return;
    }

    let dClicked = GestionnaireCollision.dansDrapeau(drapeauGauche, p);

    if (!dClicked.clicked) {
      dClicked = GestionnaireCollision.dansDrapeau(drapeauDroit, p);
    }

    if (dClicked.clicked) {
      colorPicker.estVisible = true;
      colorPicker.y = dClicked.y;
      colorPicker.x = dClicked.x - colorPicker.width;
      colorPicker.indexSelected = dClicked.index;
      colorPicker.flagSelected = dClicked.flag;

      return;
    }

    const j = clickDansJoueur(p);
    if (j) {
      curseurTir.estVisible = true;
      curseurTir.joueur = j;

      const pos = j.centre();
      curseurTir.x = pos.x - (curseurTir.width / 2);
      curseurTir.y = pos.y - (curseurTir.height / 2);

      return;
    }

    if (GestionnaireCollision.dansCurseurForce(curseurForce, p)) {
      curseurForce.definirNouvelValeur(p.y);

      return;
    }

    if (curseurTir.estVisible) {
      tir();
    }
  }

  /**
   * Calcule l'angle entre le curseur de tir et une position
   * @param x Position X
   * @param y Position Y
   * @returns {number} Angle en radian
   */
  function calculerAngle(x, y) {
    const pos = curseurTir.centre();

    return Math.atan((pos.y - y) / (pos.x - x)) + ((x > pos.x) ? 0 : Math.PI);
  }

  /**
   * Gere les mouvements de la sourie
   * @param e Position de la sourie
   */
  function onMouseMove(e) {
    let dansJoueur = false;
    const p = { x: e.clientX, y: e.clientY };

    equipes.forEach((eq) => {
      eq.joueurs.forEach((j) => {
        if (GestionnaireCollision.pointDansCercle(j.centre(), j.rayon(), p)) dansJoueur = true;
      });
    });

    if (dansJoueur
      || GestionnaireCollision.pointDansRectangle(drapeauDroit, p)
      || GestionnaireCollision.pointDansRectangle(drapeauGauche, p)
      || GestionnaireCollision.dansCurseurForce(curseurForce, p)
      || GestionnaireCollision.dansColorPicker(colorPicker, p).clicked
      || GestionnaireCollision.pointDansRectangle(soundButton, p)) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'default';
    }

    if (GestionnaireCollision.pointDansRectangle(reloadButton, p)) {
      document.body.style.cursor = 'pointer';
      reloadButton.augmenterAngle();
    } else {
      reloadButton.baisserAngle();
    }

    if (curseurTir.estVisible) {
      curseurTir.angle = calculerAngle(e.clientX, e.clientY);
    }
  }

  return {
    init,
    onClick,
    onMouseMove,
  };
}
