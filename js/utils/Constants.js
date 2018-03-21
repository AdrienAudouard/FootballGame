export const CAGE_WIDTH = 30;
export const CAGE_HEIGHT = 200;
export const BALLON_WIDTH = 30;
export const ROND_WIDTH = 900;
export const VITESSE_MAX = 12.5;
export const MAP_HEIGHT = 500;
export const COLOR_1 = ['rgb(0, 0, 255)', 'rgb(255, 255, 255)', 'rgb(255, 0, 0)'];
export const COLOR_2 = ['rgb(55, 131, 56)', 'rgb(255, 255, 255)', 'rgb(255, 0, 0)'];
export const CURSEUR_FORCE_WIDTH = 30;
export const CURSEUR_FORCE_HEIGHT = 500;
export const COLORS_PICKER = [['#2ecc71', '#3498db', '#9b59b6'],
  ['#e67e22', '#e74c3c', '#2c3e50'],
  ['#f1c40f', '#000', '#fff']];
export const FLAG_HEIGHT = 60;
export const FLAG_WIDTH = 90;
export const COTE = { DROITE: 1, GAUCHE: 0 };
export const POSITIONS = [{ x: 35, y: (MAP_HEIGHT / 2) - (BALLON_WIDTH / 2) }, // Gardien
  // Ligne de defense
  { x: 135, y: 137.5 },
  { x: 135, y: (MAP_HEIGHT - 137.5) - BALLON_WIDTH },
  // Ligne de milieu
  { x: 255, y: 40 },
  { x: 225, y: (MAP_HEIGHT / 2) - (BALLON_WIDTH / 2) },
  { x: 255, y: (MAP_HEIGHT - 40) - BALLON_WIDTH },
  // Attaquant
  { x: 335, y: (MAP_HEIGHT / 2) - (BALLON_WIDTH / 2) }];
