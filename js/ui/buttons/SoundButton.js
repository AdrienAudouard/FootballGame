import ImageObjet from '../shapes/ImageObjet';

/**
 * Bouton
 */
export default class SoundButton extends ImageObjet {
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
