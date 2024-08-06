
/**
 * 
 * @param {String} carta 
 * @param {Number} turno 
 * @param {} divCartaJugadores 
 */
export const crearCarta = (carta, turno, divCartaJugadores) => {
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/cartas/${carta}.png`;
    imgCarta.classList.add('carta');
    divCartaJugadores[turno].append(imgCarta);

}
