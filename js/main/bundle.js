/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 5);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/**
 * Objet qui va être dessiné à l'écran
 */

class ObjetGraphique {
  /**
   * Constructeur par defaut
   * @param pX {number} Position en X
   * @param pY {number} Position en Y
   * @param w {number} Largeur
   * @param h {number} Hauteur
   */
  constructor(pX, pY, w, h) {
    this.x = pX;
    this.y = pY;
    this.width = w;
    this.height = h;
  }

  /**
   * Retourne la poisiton au centre de l'écran
   * @returns {{x: number, y: number}}
   */
  centre() {
    return {
      x: this.x + (this.width / 2),
      y: this.y + (this.height / 2),
    };
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ObjetGraphique;



/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
const CAGE_WIDTH = 30;
/* harmony export (immutable) */ __webpack_exports__["c"] = CAGE_WIDTH;

const CAGE_HEIGHT = 200;
/* harmony export (immutable) */ __webpack_exports__["b"] = CAGE_HEIGHT;

const BALLON_WIDTH = 30;
/* harmony export (immutable) */ __webpack_exports__["a"] = BALLON_WIDTH;

const ROND_WIDTH = 900;
/* harmony export (immutable) */ __webpack_exports__["n"] = ROND_WIDTH;

const VITESSE_MAX = 12.5;
/* harmony export (immutable) */ __webpack_exports__["o"] = VITESSE_MAX;

const MAP_HEIGHT = 500;
/* harmony export (immutable) */ __webpack_exports__["l"] = MAP_HEIGHT;

const COLOR_1 = ['rgb(0, 0, 255)', 'rgb(255, 255, 255)', 'rgb(255, 0, 0)'];
/* harmony export (immutable) */ __webpack_exports__["e"] = COLOR_1;

const COLOR_2 = ['rgb(55, 131, 56)', 'rgb(255, 255, 255)', 'rgb(255, 0, 0)'];
/* harmony export (immutable) */ __webpack_exports__["f"] = COLOR_2;

const CURSEUR_FORCE_WIDTH = 30;
/* harmony export (immutable) */ __webpack_exports__["i"] = CURSEUR_FORCE_WIDTH;

const CURSEUR_FORCE_HEIGHT = 500;
/* harmony export (immutable) */ __webpack_exports__["h"] = CURSEUR_FORCE_HEIGHT;

const COLORS_PICKER = [['#2ecc71', '#3498db', '#9b59b6'],
  ['#e67e22', '#e74c3c', '#2c3e50'],
  ['#f1c40f', '#000', '#fff']];
/* harmony export (immutable) */ __webpack_exports__["d"] = COLORS_PICKER;

const FLAG_HEIGHT = 60;
/* harmony export (immutable) */ __webpack_exports__["j"] = FLAG_HEIGHT;

const FLAG_WIDTH = 90;
/* harmony export (immutable) */ __webpack_exports__["k"] = FLAG_WIDTH;

const COTE = { DROITE: 1, GAUCHE: 0 };
/* harmony export (immutable) */ __webpack_exports__["g"] = COTE;

const POSITIONS = [{ x: 35, y: (MAP_HEIGHT / 2) - (BALLON_WIDTH / 2) }, // Gardien
  // Ligne de defense
  { x: 135, y: 137.5 },
  { x: 135, y: (MAP_HEIGHT - 137.5) - BALLON_WIDTH },
  // Ligne de milieu
  { x: 255, y: 40 },
  { x: 225, y: (MAP_HEIGHT / 2) - (BALLON_WIDTH / 2) },
  { x: 255, y: (MAP_HEIGHT - 40) - BALLON_WIDTH },
  // Attaquant
  { x: 335, y: (MAP_HEIGHT / 2) - (BALLON_WIDTH / 2) }];
/* harmony export (immutable) */ __webpack_exports__["m"] = POSITIONS;



/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = getCookie;
/* harmony export (immutable) */ __webpack_exports__["b"] = setCookie;
/**
 * Retourne le cookie demandé
 * @param cname {string} Nom du cookie
 * @returns {string} Valeur du cookie ou une chaine vide si le cookie n'existe pas
 *
 * Methode from W3C
 * https://www.w3schools.com/js/js_cookies.asp
 */
function getCookie(cname) {
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  const ca = decodedCookie.split(';');

  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === ' ') {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
      return c.substring(name.length, c.length);
    }
  }
  return '';
}

/**
 * Ajoute une nouveau cookie
 * @param cname {string} Nom du cookie
 * @param cvalue {string} Valeur du cookie
 * @param exdays {number} Durée après laquelle le cookie est expiré
 *
 * Methode from W3C
 * https://www.w3schools.com/js/js_cookies.asp
 */
function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + ((((exdays * 24) * 60) * 60) * 1000));
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ObjetGraphique__ = __webpack_require__(0);


/**
 * Objet graphique representant un rond qui se deplace
 */
class Rond extends __WEBPACK_IMPORTED_MODULE_0__ObjetGraphique__["a" /* default */] {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Rond;



/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ObjetGraphique__ = __webpack_require__(0);



/**
 * Objet graphique contenant une image
 */
class ImageObjet extends __WEBPACK_IMPORTED_MODULE_0__ObjetGraphique__["a" /* default */] {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = ImageObjet;



/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__framework_GameFramework__ = __webpack_require__(6);


let gf;

function onClickDocument(e) {
  gf.onClick(e);
}

function mouseMoveDocument(e) {
  gf.onMouseMove(e);
}

function initDocument() {
  gf = new __WEBPACK_IMPORTED_MODULE_0__framework_GameFramework__["a" /* GameFramework */]();
  gf.init();
}

window.onload = initDocument;
document.onclick = onClickDocument;
document.onmousemove = mouseMoveDocument;


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = GameFramework;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__game_Equipe__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ui_cursors_CurseurTir__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__ui_buttons_ColorPicker__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ui_mapObjects_Ballon__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__ui_buttons_ReloadButton__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__managers_GestionnaireCollision__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__ui_buttons_SoundButton__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__ui_mapObjects_Drapeau__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__ui_cursors_CurseurForce__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__managers_SoundManager__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__utils_Cookies__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__ui_mapObjects_Map__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__utils_Constants__ = __webpack_require__(1);
















/**
 * GameFramework
 * @returns {{init: init, onClick: onClick, onMouseMove: onMouseMove}}
 * @constructor
 */
function GameFramework() {
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
      __WEBPACK_IMPORTED_MODULE_12__utils_Constants__["e" /* COLOR_1 */][i] = Object(__WEBPACK_IMPORTED_MODULE_10__utils_Cookies__["a" /* getCookie */])(`COLOR_1_${i}`) === '' ? __WEBPACK_IMPORTED_MODULE_12__utils_Constants__["e" /* COLOR_1 */][i] : Object(__WEBPACK_IMPORTED_MODULE_10__utils_Cookies__["a" /* getCookie */])(`COLOR_1_${i}`);
      __WEBPACK_IMPORTED_MODULE_12__utils_Constants__["f" /* COLOR_2 */][i] = Object(__WEBPACK_IMPORTED_MODULE_10__utils_Cookies__["a" /* getCookie */])(`COLOR_2_${i}`) === '' ? __WEBPACK_IMPORTED_MODULE_12__utils_Constants__["f" /* COLOR_2 */][i] : Object(__WEBPACK_IMPORTED_MODULE_10__utils_Cookies__["a" /* getCookie */])(`COLOR_2_${i}`);
    }
  }

  /**
   * Reinitialise le jeu
   */
  function reset() {
    const x = (w / 2) - (__WEBPACK_IMPORTED_MODULE_12__utils_Constants__["n" /* ROND_WIDTH */] / 2);
    const y = (h / 2) - (__WEBPACK_IMPORTED_MODULE_12__utils_Constants__["l" /* MAP_HEIGHT */] / 2);

    tour = __WEBPACK_IMPORTED_MODULE_12__utils_Constants__["g" /* COTE */].GAUCHE;
    equipes[0].doitJouer = true;
    equipes[1].doitJouer = false;

    equipes[0].creerJoueurs(map);
    equipes[1].creerJoueurs(map);

    ballon = new __WEBPACK_IMPORTED_MODULE_3__ui_mapObjects_Ballon__["a" /* default */]((x + (map.width / 2))
      - (__WEBPACK_IMPORTED_MODULE_12__utils_Constants__["a" /* BALLON_WIDTH */] / 2), (y + (map.height / 2)) - (__WEBPACK_IMPORTED_MODULE_12__utils_Constants__["a" /* BALLON_WIDTH */] / 2));
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

    if (__WEBPACK_IMPORTED_MODULE_5__managers_GestionnaireCollision__["a" /* default */].cercleDansCarre(e, map.cageDroite)) {
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
    } else if (__WEBPACK_IMPORTED_MODULE_5__managers_GestionnaireCollision__["a" /* default */].cercleDansCarre(e, map.cageGauche)) {
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
        if (__WEBPACK_IMPORTED_MODULE_5__managers_GestionnaireCollision__["a" /* default */].cercleCercle(j, ballon, j.rayon(), ballon.rayon())) {
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

            if (__WEBPACK_IMPORTED_MODULE_5__managers_GestionnaireCollision__["a" /* default */].cercleCercle(j, j2, j.rayon(), j2.rayon())) {
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

    if (__WEBPACK_IMPORTED_MODULE_5__managers_GestionnaireCollision__["a" /* default */].pointDansRectangle(map.cageGauche, ballon.centre())) {
      score.DROITE += 1;
      reset();
      soundsManager.but();
    } else if (__WEBPACK_IMPORTED_MODULE_5__managers_GestionnaireCollision__["a" /* default */].pointDansRectangle(map.cageDroite, ballon.centre())) {
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

    curseurTir.joueur.vitesseX = Math.cos(curseurTir.angle) * (__WEBPACK_IMPORTED_MODULE_12__utils_Constants__["o" /* VITESSE_MAX */] * parseFloat(curseurForce.valeur));
    curseurTir.joueur.vitesseY = Math.sin(curseurTir.angle) * (__WEBPACK_IMPORTED_MODULE_12__utils_Constants__["o" /* VITESSE_MAX */] * parseFloat(curseurForce.valeur));
    curseurTir.estVisible = false;
    curseurTir.joueur = null;
    tour = (tour === __WEBPACK_IMPORTED_MODULE_12__utils_Constants__["g" /* COTE */].GAUCHE) ? __WEBPACK_IMPORTED_MODULE_12__utils_Constants__["g" /* COTE */].DROITE : __WEBPACK_IMPORTED_MODULE_12__utils_Constants__["g" /* COTE */].GAUCHE;

    if (tour === __WEBPACK_IMPORTED_MODULE_12__utils_Constants__["g" /* COTE */].GAUCHE) {
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

    reloadButton = new __WEBPACK_IMPORTED_MODULE_4__ui_buttons_ReloadButton__["a" /* default */](20, 20);
    soundButton = new __WEBPACK_IMPORTED_MODULE_6__ui_buttons_SoundButton__["a" /* default */](w - 52, 20);

    soundsManager = new __WEBPACK_IMPORTED_MODULE_9__managers_SoundManager__["a" /* SoundsManager */]();
    soundsManager.init();

    const soundEnabled = (Object(__WEBPACK_IMPORTED_MODULE_10__utils_Cookies__["a" /* getCookie */])('sound') === '' || Object(__WEBPACK_IMPORTED_MODULE_10__utils_Cookies__["a" /* getCookie */])('sound') === 'true');
    soundsManager.setEnabled(soundEnabled);
    soundButton.setEnabled(soundEnabled);

    tirEnCours = false;

    ctx = canvas.getContext('2d');

    initColors();

    const x = (w / 2) - (__WEBPACK_IMPORTED_MODULE_12__utils_Constants__["n" /* ROND_WIDTH */] / 2);
    const y = (h / 2) - (__WEBPACK_IMPORTED_MODULE_12__utils_Constants__["l" /* MAP_HEIGHT */] / 2);

    map = new __WEBPACK_IMPORTED_MODULE_11__ui_mapObjects_Map__["a" /* default */](x, y, __WEBPACK_IMPORTED_MODULE_12__utils_Constants__["n" /* ROND_WIDTH */], __WEBPACK_IMPORTED_MODULE_12__utils_Constants__["l" /* MAP_HEIGHT */]);

    equipes = [];
    equipes.push(new __WEBPACK_IMPORTED_MODULE_0__game_Equipe__["a" /* default */](__WEBPACK_IMPORTED_MODULE_12__utils_Constants__["g" /* COTE */].GAUCHE, map));
    equipes.push(new __WEBPACK_IMPORTED_MODULE_0__game_Equipe__["a" /* default */](__WEBPACK_IMPORTED_MODULE_12__utils_Constants__["g" /* COTE */].DROITE, map));

    curseurTir = new __WEBPACK_IMPORTED_MODULE_1__ui_cursors_CurseurTir__["a" /* default */](10, 10);

    score = {
      GAUCHE: 0,
      DROITE: 0,
    };

    const xForce = (map.x / 2) - (__WEBPACK_IMPORTED_MODULE_12__utils_Constants__["i" /* CURSEUR_FORCE_WIDTH */] / 2);
    const yForce = (h / 2) - (__WEBPACK_IMPORTED_MODULE_12__utils_Constants__["h" /* CURSEUR_FORCE_HEIGHT */] / 2);

    curseurForce = new __WEBPACK_IMPORTED_MODULE_8__ui_cursors_CurseurForce__["a" /* default */](xForce, yForce);
    colorPicker = new __WEBPACK_IMPORTED_MODULE_2__ui_buttons_ColorPicker__["a" /* default */](10, 10);

    const yDrapeau = (map.y / 2) - (__WEBPACK_IMPORTED_MODULE_12__utils_Constants__["j" /* FLAG_HEIGHT */] / 2);
    const xDrapeau = (map.x + (map.width / 4)) - (__WEBPACK_IMPORTED_MODULE_12__utils_Constants__["k" /* FLAG_WIDTH */] / 2);

    drapeauGauche = new __WEBPACK_IMPORTED_MODULE_7__ui_mapObjects_Drapeau__["a" /* default */](xDrapeau, yDrapeau, __WEBPACK_IMPORTED_MODULE_12__utils_Constants__["e" /* COLOR_1 */]);
    drapeauDroit = new __WEBPACK_IMPORTED_MODULE_7__ui_mapObjects_Drapeau__["a" /* default */](xDrapeau + (map.width / 2), yDrapeau, __WEBPACK_IMPORTED_MODULE_12__utils_Constants__["f" /* COLOR_2 */]);

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
      if (__WEBPACK_IMPORTED_MODULE_5__managers_GestionnaireCollision__["a" /* default */].pointDansCercle(j.centre(), j.rayon(), p)) {
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

    const c = __WEBPACK_IMPORTED_MODULE_5__managers_GestionnaireCollision__["a" /* default */].dansColorPicker(colorPicker, p);

    if (c.clicked) {
      colorPicker.estVisible = false;
      colorPicker.flagSelected.setColor(colorPicker.indexSelected, __WEBPACK_IMPORTED_MODULE_12__utils_Constants__["d" /* COLORS_PICKER */][c.i][c.j]);

      return;
    }

    colorPicker.estVisible = false;

    if (__WEBPACK_IMPORTED_MODULE_5__managers_GestionnaireCollision__["a" /* default */].pointDansRectangle(reloadButton, p)) {
      fullReset();

      return;
    }

    if (__WEBPACK_IMPORTED_MODULE_5__managers_GestionnaireCollision__["a" /* default */].pointDansRectangle(soundButton, p)) {
      soundsManager.setEnabled(soundButton.inverser());

      return;
    }

    let dClicked = __WEBPACK_IMPORTED_MODULE_5__managers_GestionnaireCollision__["a" /* default */].dansDrapeau(drapeauGauche, p);

    if (!dClicked.clicked) {
      dClicked = __WEBPACK_IMPORTED_MODULE_5__managers_GestionnaireCollision__["a" /* default */].dansDrapeau(drapeauDroit, p);
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

    if (__WEBPACK_IMPORTED_MODULE_5__managers_GestionnaireCollision__["a" /* default */].dansCurseurForce(curseurForce, p)) {
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
        if (__WEBPACK_IMPORTED_MODULE_5__managers_GestionnaireCollision__["a" /* default */].pointDansCercle(j.centre(), j.rayon(), p)) dansJoueur = true;
      });
    });

    if (dansJoueur
      || __WEBPACK_IMPORTED_MODULE_5__managers_GestionnaireCollision__["a" /* default */].pointDansRectangle(drapeauDroit, p)
      || __WEBPACK_IMPORTED_MODULE_5__managers_GestionnaireCollision__["a" /* default */].pointDansRectangle(drapeauGauche, p)
      || __WEBPACK_IMPORTED_MODULE_5__managers_GestionnaireCollision__["a" /* default */].dansCurseurForce(curseurForce, p)
      || __WEBPACK_IMPORTED_MODULE_5__managers_GestionnaireCollision__["a" /* default */].dansColorPicker(colorPicker, p).clicked
      || __WEBPACK_IMPORTED_MODULE_5__managers_GestionnaireCollision__["a" /* default */].pointDansRectangle(soundButton, p)) {
      document.body.style.cursor = 'pointer';
    } else {
      document.body.style.cursor = 'default';
    }

    if (__WEBPACK_IMPORTED_MODULE_5__managers_GestionnaireCollision__["a" /* default */].pointDansRectangle(reloadButton, p)) {
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


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__Joueur__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_Constants__ = __webpack_require__(1);



/**
 * Classe representant une équipe
 */
class Equipe {
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

    __WEBPACK_IMPORTED_MODULE_1__utils_Constants__["m" /* POSITIONS */].forEach((p) => {
      const x = (this.cote === __WEBPACK_IMPORTED_MODULE_1__utils_Constants__["g" /* COTE */].GAUCHE) ? map.x + p.x
        : ((map.x + map.width) - p.x) - __WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* BALLON_WIDTH */];
      const y = map.y + p.y;
      const c = (this.cote === __WEBPACK_IMPORTED_MODULE_1__utils_Constants__["g" /* COTE */].GAUCHE) ? __WEBPACK_IMPORTED_MODULE_1__utils_Constants__["e" /* COLOR_1 */] : __WEBPACK_IMPORTED_MODULE_1__utils_Constants__["f" /* COLOR_2 */];

      this.joueurs.push(new __WEBPACK_IMPORTED_MODULE_0__Joueur__["a" /* default */](x, y, c));
    });
  }

  draw(ctx) {
    this.joueurs.forEach((j) => {
      j.draw(ctx, this.doitJouer);
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Equipe;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_shapes_Rond__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_Constants__ = __webpack_require__(1);



/**
 * Objet graphiqe representant un joueur
 */
class Joueur extends __WEBPACK_IMPORTED_MODULE_0__ui_shapes_Rond__["a" /* default */] {
  /**
   * Constructeur
   * @param x {number} Position en X
   * @param y {number} Position en Y
   * @param c Couleurs du joueur
   */
  constructor(x, y, c) {
    super(x, y, __WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* BALLON_WIDTH */]);
    this.colors = c;

    this.sizeDoitJouer = {
      size: 10,
      augmente: true,
    };
  }

  /**
   * Dessine le joueur
   * @param ctx Contexte avec lequel on dessine
   * @param doitJouer Indique si c'est au tour de se joueur de jouer
   */
  draw(ctx, doitJouer) {
    if (doitJouer) {
      if (this.sizeDoitJouer.augmente) {
        this.sizeDoitJouer.size += 1;

        if (this.sizeDoitJouer.size > 40) {
          this.sizeDoitJouer.augmente = false;
        }
      } else {
        this.sizeDoitJouer.size -= 1;

        if (this.sizeDoitJouer.size < 10) {
          this.sizeDoitJouer.augmente = true;
        }
      }
    }

    ctx.save();
    ctx.translate(this.x, this.y);

    ctx.shadowColor = doitJouer ? 'white' : 'black';
    ctx.shadowBlur = doitJouer ? this.sizeDoitJouer.size : 10;
    ctx.fillStyle = 'black';

    ctx.beginPath();
    ctx.arc(this.width / 2, this.height / 2, this.width / 2, 0, 2 * Math.PI, false);
    ctx.closePath();
    ctx.fill();

    ctx.shadowBlur = 0;

    Joueur.arc(ctx, 3, 3, 24, 24, 90, -90, true);

    [ctx.fillStyle] = this.colors; // 'rgb(0, 0, 255)';
    ctx.fill();


    Joueur.arc(ctx, 3, 3, 24, 24, 270, 90, true);
    [,, ctx.fillStyle] = this.colors; // 'rgb(255, 0, 0)';
    ctx.fill();


    ctx.beginPath();
    ctx.rect(10, 2, 10, 26);
    [, ctx.fillStyle] = this.colors; // 'rgb(255, 255, 255)';
    ctx.fill();


    ctx.beginPath();
    ctx.moveTo(15, 3);
    ctx.bezierCurveTo(13.04, 3, 11.19, 3.47, 9.56, 4.3);
    ctx.bezierCurveTo(5.67, 6.28, 3, 10.33, 3, 15);
    ctx.bezierCurveTo(3, 21.63, 8.37, 27, 15, 27);
    ctx.bezierCurveTo(21.63, 27, 27, 21.63, 27, 15);
    ctx.bezierCurveTo(27, 8.37, 21.63, 3, 15, 3);
    ctx.closePath();
    ctx.moveTo(30, 15);
    ctx.bezierCurveTo(30, 23.28, 23.28, 30, 15, 30);
    ctx.bezierCurveTo(6.72, 30, 0, 23.28, 0, 15);
    ctx.bezierCurveTo(0, 9.61, 2.84, 4.88, 7.11, 2.24);
    ctx.bezierCurveTo(9.41, 0.82, 12.11, 0, 15, 0);
    ctx.bezierCurveTo(23.28, 0, 30, 6.72, 30, 15);
    ctx.closePath();
    ctx.fillStyle = 'rgb(0, 0, 0)';
    ctx.fill();

    ctx.restore();
  }

  /**
   * Dessine un arc de cercle
   * @param context Contexte avec lequel on dessine
   * @param x Position en X
   * @param y Position en Y
   * @param w Largeur
   * @param h Hauteur
   * @param startAngle Angle de depart
   * @param endAngle Angle de fin
   * @param isClosed indique si l'arc est fermé ou non
   */
  static arc(context, x, y, w, h, startAngle, endAngle, isClosed) {
    context.save();
    context.beginPath();
    context.translate(x, y);
    context.scale(w / 2, h / 2);
    context.arc(1, 1, 1, (Math.PI / 180) * startAngle, (Math.PI / 180) * endAngle, false);

    if (isClosed) {
      context.lineTo(1, 1);
      context.closePath();
    }

    context.restore();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Joueur;




/***/ }),
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shapes_ObjetGraphique__ = __webpack_require__(0);


/**
 * Objet graphique representant le curseur de tir
 */
class CurseurTir extends __WEBPACK_IMPORTED_MODULE_0__shapes_ObjetGraphique__["a" /* default */] {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = CurseurTir;



/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shapes_ObjetGraphique__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_Constants__ = __webpack_require__(1);



/**
 * Objet graphique representant une palette de couleur
 */
class ColorPicker extends __WEBPACK_IMPORTED_MODULE_0__shapes_ObjetGraphique__["a" /* default */] {
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
        ctx.fillStyle = __WEBPACK_IMPORTED_MODULE_1__utils_Constants__["d" /* COLORS_PICKER */][i][j];
        ctx.fillRect(0, 0, w / 3, h / 3);
        ctx.translate((w / 3) + margeW, 0);
      }

      ctx.translate(-3 * ((w / 3) + margeW), (h / 3) + margeH);
    }

    ctx.restore();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ColorPicker;



/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shapes_Rond__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_Constants__ = __webpack_require__(1);



/**
 * Objet graphique representant un ballon
 */
class Ballon extends __WEBPACK_IMPORTED_MODULE_0__shapes_Rond__["a" /* default */] {
  /**
   * Constructeur
   * @param x {number} Position en X
   * @param y {number} Position en Y
   */
  constructor(x, y) {
    super(x, y, __WEBPACK_IMPORTED_MODULE_1__utils_Constants__["a" /* BALLON_WIDTH */]);
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Ballon;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shapes_ImageObjet__ = __webpack_require__(4);


/**
 * Bouton
 */
class ReloadButton extends __WEBPACK_IMPORTED_MODULE_0__shapes_ImageObjet__["a" /* default */] {
  /**
   * Constructeur
   * @param x {number} Position en X
   * @param y {number} Position en Y
   */
  constructor(x, y) {
    super(x, y, 'img/icons/icon_reload.png');
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ReloadButton;



/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__ui_shapes_ObjetGraphique__ = __webpack_require__(0);


/**
 * Classe static qui va detecter les collisions
 */
class GestionnaireCollision {
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

      const obj = new __WEBPACK_IMPORTED_MODULE_0__ui_shapes_ObjetGraphique__["a" /* default */](x, y, w, h);

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

        const obj = new __WEBPACK_IMPORTED_MODULE_0__ui_shapes_ObjetGraphique__["a" /* default */](minX, minY, w / 3, h / 3);

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

    const obj = new __WEBPACK_IMPORTED_MODULE_0__ui_shapes_ObjetGraphique__["a" /* default */](x, y, w, h);

    return this.pointDansRectangle(obj, p);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GestionnaireCollision;



/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shapes_ImageObjet__ = __webpack_require__(4);


/**
 * Bouton
 */
class SoundButton extends __WEBPACK_IMPORTED_MODULE_0__shapes_ImageObjet__["a" /* default */] {
  /**
   * Constructeur
   * @param x {number} Position en X
   * @param y {number} Position en Y
   */
  constructor(x, y) {
    super(x, y, 'img/icons/icon_speaker.png');

    this.sound = new Image();
    this.noSound = new Image();

    this.soundLoaded = false;
    this.noSoundLoaded = false;

    this.sound.addEventListener('load', () => {
      this.soundLoaded = true;
    });

    this.noSound.addEventListener('load', () => {
      this.noSoundLoaded = true;
    });

    this.sound.src = 'img/icons/icon_speaker.png';
    this.noSound.src = 'img/icons/icon_no_speaker.png';
  }

  /**
   * Inverse l'image du bouton
   * @returns {boolean} Retourne true si l'image du bouton représente un haut parleur
   * emettant de la musique
   */
  inverser() {
    this.image = (this.image.src.includes(this.sound.src)) ? this.noSound : this.sound;

    return this.image.src.includes(this.sound.src);
  }

  setEnabled(v) {
    this.image = (v) ? this.sound : this.noSound;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SoundButton;



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shapes_ObjetGraphique__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_Constants__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_Cookies__ = __webpack_require__(2);




/**
 * Objet graphique representant un drapeau
 */
class Drapeau extends __WEBPACK_IMPORTED_MODULE_0__shapes_ObjetGraphique__["a" /* default */] {
  /**
   * Constructeur
   * @param x {number} Position en X
   * @param y {number} Position en Y
   * @param colors Couleurs du drapeau
   */
  constructor(x, y, colors) {
    super(x, y, __WEBPACK_IMPORTED_MODULE_1__utils_Constants__["k" /* FLAG_WIDTH */], __WEBPACK_IMPORTED_MODULE_1__utils_Constants__["j" /* FLAG_HEIGHT */]);

    this.colors = colors;
  }

  draw(ctx) {
    ctx.save();

    ctx.translate(this.x, this.y);

    for (let i = 0; i < 3; i += 1) {
      ctx.fillStyle = this.colors[i];
      ctx.fillRect(i * (this.width / 3), 0, this.width / 3, this.height);
    }

    ctx.restore();
  }

  /**
   * Change une couleur du drapeau et met à jour les cookies
   * @param index {number} Indice de la couleur
   * @param color {string} Nouvelle couleur
   */
  setColor(index, color) {
    const cookie = this.colors === __WEBPACK_IMPORTED_MODULE_1__utils_Constants__["e" /* COLOR_1 */] ? 'COLOR_1_' : 'COLOR_2_';

    this.colors[index] = color;

    Object(__WEBPACK_IMPORTED_MODULE_2__utils_Cookies__["b" /* setCookie */])(cookie + index, color, 100);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Drapeau;



/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shapes_ObjetGraphique__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_Constants__ = __webpack_require__(1);



/**
 * Objet graphique representant un curseur qui va definir la force de tir
 */
class CurseurForce extends __WEBPACK_IMPORTED_MODULE_0__shapes_ObjetGraphique__["a" /* default */] {
  /**
   * Constrcuteur
   * @param x Position en X
   * @param y Position en Y
   */
  constructor(x, y) {
    super(x, y, __WEBPACK_IMPORTED_MODULE_1__utils_Constants__["i" /* CURSEUR_FORCE_WIDTH */], __WEBPACK_IMPORTED_MODULE_1__utils_Constants__["h" /* CURSEUR_FORCE_HEIGHT */]);

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
/* harmony export (immutable) */ __webpack_exports__["a"] = CurseurForce;



/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = SoundsManager;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__utils_Cookies__ = __webpack_require__(2);

/**
 * Gestionnair de son
 * @returns {{init: init, collisionJoueurs: collisionJoueurs, collisionBords: collisionBords, but: but, setEnabled: setEnabled}}
 * @constructor
 */

function SoundsManager() {
  let audioBords;
  let audioJoueurs;
  let audioBut;
  let soundEnabled;

  let audioBordsLoaded;
  let audioJoueursLoaded;
  let audioButLoaded;

  /**
   * Initialise le gestionnaire de son
   */
  function init() {
    audioBords = document.createElement('audio');
    audioJoueurs = document.createElement('audio');
    audioBut = document.createElement('audio');

    audioBordsLoaded = false;
    audioJoueursLoaded = false;
    audioButLoaded = false;

    audioBords.addEventListener('canplay', () => {
      audioBordsLoaded = true;
    });

    audioBut.addEventListener('canplay', () => {
      audioButLoaded = true;
    });

    audioJoueurs.addEventListener('canplay', () => {
      audioJoueursLoaded = true;
    });

    audioBords.src = 'sounds/sound_collision_bords.wav';
    audioJoueurs.src = 'sounds/sound_collision_joueurs.wav';
    audioBut.src = 'sounds/sound_suuu.wav';
  }

  /**
   * Joue un son de collision entre joueurs
   */
  function collisionJoueurs() {
    if (!soundEnabled) return;

    audioJoueurs.pause();
    audioJoueurs.currentTime = 0;
    audioJoueurs.play();
  }

  /**
   * Joue un son de collision entre un joueur et un bord du terrain
   */
  function collisionBords() {
    if (!soundEnabled) return;

    audioBords.pause();
    audioBords.currentTime = 0;
    audioBords.play();
  }

  /**
   * Joue un son de but
   */
  function but() {
    if (!soundEnabled) return;

    audioBut.pause();
    audioBut.currentTime = 0;
    audioBut.play();
  }

  /**
   * Active ou desactive les sons
   * @param v {boolean} True si on veut activer le son et false si on veut le desactiver
   */
  function setEnabled(v) {
    Object(__WEBPACK_IMPORTED_MODULE_0__utils_Cookies__["b" /* setCookie */])('sound', `${v}`, 100);
    soundEnabled = v;
  }

  function getAudioBordsLoaded() {
    return audioBordsLoaded;
  }

  function getAudioJoueursLoaded() {
    return audioJoueursLoaded;
  }

  function getAudioButLoaded() {
    return audioButLoaded;
  }

  return {
    init,
    collisionJoueurs,
    collisionBords,
    but,
    setEnabled,
    getAudioBordsLoaded,
    getAudioJoueursLoaded,
    getAudioButLoaded,
  };
}


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shapes_ObjetGraphique__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Cage__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__utils_Constants__ = __webpack_require__(1);




/**
 * Objet representant le terrain de jeu
 */
class Map extends __WEBPACK_IMPORTED_MODULE_0__shapes_ObjetGraphique__["a" /* default */] {
  /**
   * Constructeur
   * @param x {number} Position en X
   * @param y {number} Position en Y
   * @param w {number} Largeur
   * @param h {number} Hauteur
   */
  constructor(x, y, w, h) {
    super(x, y, w, h);


    const yCage = (this.height / 2) - (__WEBPACK_IMPORTED_MODULE_2__utils_Constants__["b" /* CAGE_HEIGHT */] / 2);

    this.cageGauche = new __WEBPACK_IMPORTED_MODULE_1__Cage__["a" /* default */](this.x + -__WEBPACK_IMPORTED_MODULE_2__utils_Constants__["c" /* CAGE_WIDTH */], this.y + yCage);
    this.cageDroite = new __WEBPACK_IMPORTED_MODULE_1__Cage__["a" /* default */](this.x + this.width, this.y + yCage);
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
/* harmony export (immutable) */ __webpack_exports__["a"] = Map;



/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__shapes_ObjetGraphique__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__utils_Constants__ = __webpack_require__(1);



/**
 * Objet representant une cage de but
 */
class Cage extends __WEBPACK_IMPORTED_MODULE_0__shapes_ObjetGraphique__["a" /* default */] {
  /**
   * Constructeur
   * @param x {number} Position en X
   * @param y {number} Position en Y
   */
  constructor(x, y) {
    super(x, y, __WEBPACK_IMPORTED_MODULE_1__utils_Constants__["c" /* CAGE_WIDTH */], __WEBPACK_IMPORTED_MODULE_1__utils_Constants__["b" /* CAGE_HEIGHT */]);
  }

  /**
   * Dessine le sol de la cage
   * @param ctx Context avec lequel on dessine
   */
  drawSol(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.fillStyle = '#27ae60';
    ctx.fillRect(0, 0, this.width, this.height);

    ctx.restore();
  }

  draw(ctx) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.strokeStyle = 'white';

    ctx.strokeRect(0, 0, this.width, this.height);
    ctx.lineWidth = 1;

    let space = this.width / 4;

    for (let i = 0; i < 4; i += 1) {
      ctx.strokeRect(i * space, 0, 1, this.height);
    }

    space = this.height / 11;

    for (let i = 0; i < 11; i += 1) {
      ctx.strokeRect(0, i * space, this.width, 1);
    }

    ctx.restore();
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Cage;



/***/ })
/******/ ]);