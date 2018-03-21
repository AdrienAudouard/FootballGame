/**
 * Retourne le cookie demandé
 * @param cname {string} Nom du cookie
 * @returns {string} Valeur du cookie ou une chaine vide si le cookie n'existe pas
 *
 * Methode from W3C
 * https://www.w3schools.com/js/js_cookies.asp
 */
export function getCookie(cname) {
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
export function setCookie(cname, cvalue, exdays) {
  const d = new Date();
  d.setTime(d.getTime() + ((((exdays * 24) * 60) * 60) * 1000));
  const expires = `expires=${d.toUTCString()}`;
  document.cookie = `${cname}=${cvalue};${expires};path=/`;
}
