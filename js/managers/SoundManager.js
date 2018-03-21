import { setCookie } from '../utils/Cookies';
/**
 * Gestionnair de son
 * @returns {{init: init, collisionJoueurs: collisionJoueurs, collisionBords: collisionBords, but: but, setEnabled: setEnabled}}
 * @constructor
 */

export function SoundsManager() {
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
    setCookie('sound', `${v}`, 100);
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
