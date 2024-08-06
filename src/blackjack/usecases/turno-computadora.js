import { pedirCarta } from "./pedir-carta";
import { crearCarta } from "./crear-carta";
import { acumularPuntos } from "./acumular-puntos";

/**
 * 
 * @param {Number} puntosMinimos 
 * @param {Array <String>} deck 
 */
export const turnoComputadora = (puntosJugador, deck, puntosJugadores, puntosHtml, divCartaJugadores) => {
    let puntosMinimos = puntosJugador;
    if (!puntosMinimos) throw new Error('Se esperan Puntos minimos');
    if (!puntosJugadores) throw new Error('Puntos jugadores es necesario');

    let puntosComputadora = 0;
    do {
        const carta = pedirCarta(deck);
        puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1, puntosJugadores, puntosHtml);
        crearCarta(carta, puntosJugadores.length - 1, divCartaJugadores);

    } while (puntosComputadora < puntosMinimos && (puntosMinimos <= 21));

    determinarGanador(puntosMinimos, puntosComputadora, puntosJugadores, puntosJugador);
}

const determinarGanador = (puntosJugador, puntosMinimos,puntosComputadora) => {

    btnPedir.disabled = true;
    btnDetener.disabled = true;

    setTimeout(() => {
        if (puntosComputadora === puntosJugador) {
            alert('nadie gana');
        } else if (puntosJugador > 21 || (puntosJugador < puntosComputadora && puntosComputadora <= 21)) {
            alert('perdiste');
        }
        else if (puntosComputadora > 21 || puntosComputadora < puntosJugador) {
            alert('felicidades, ganaste');
        }
    })
}