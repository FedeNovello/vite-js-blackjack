// import { valorCarta } from "./valor-carta";

export const acumularPuntos = (carta, turno, puntosJugadores,puntosHtml) => {
    puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
    puntosHtml[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
}

const valorCarta = (carta) => {
    const valor = carta.substring(0, carta.length - 1);
    return (isNaN(valor)) ? ((valor === 'A') ? 11 : 10) : valor * 1;
}