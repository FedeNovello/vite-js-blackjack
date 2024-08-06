import _ from 'underscore';
import { crearDeck, pedirCarta, turnoComputadora, crearCarta, acumularPuntos} from './usecases';

'use strict';

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];
let puntosJugador = 0;
let puntosJugadores = [];

//REFERENCIAS HTML
const btnPedir = document.querySelector('#btnPedir'),
    btnDetener = document.querySelector('#btnDetener'),
    btnNuevoJuego = document.querySelector('#btnNuevo'),
    divCartaJugadores = document.querySelectorAll('.divCartas'),
    puntosHtml = document.querySelectorAll('small');

deck = crearDeck(tipos, especiales);


const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck(tipos, especiales);
    puntosJugadores = [];
    btnDetener.disabled = false;
    btnPedir.disabled = false;

    for (let i = 0; i < numJugadores; i++) {
        puntosJugadores.push(0);
        puntosHtml[i].innerText = 0;
    }
    for (let i = 0; i < puntosJugadores.length; i++) {
        puntosJugadores[i] = 0;
    }

    for (let i = 0; i < divCartaJugadores.length; i++) {
        divCartaJugadores[i].innerHTML = '';
    }

}


//EVENTOS
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta(deck);
    puntosJugador = acumularPuntos(carta, 0,puntosJugadores,puntosHtml);
    crearCarta(carta, 0,divCartaJugadores);

    console.log(puntosJugador);
    if (puntosJugador > 21) {
        console.log(puntosJugador);
        console.log('jugador perdio');
        turnoComputadora(puntosJugador, deck, puntosJugadores,puntosHtml,divCartaJugadores);
    } else if (puntosJugador === 21) {
        console.log('21, genial');
        turnoComputadora(puntosJugador, deck,puntosJugadores,puntosHtml,divCartaJugadores);
    }
});

btnDetener.addEventListener('click', () => {
    turnoComputadora(puntosJugador, deck,puntosJugadores,puntosHtml,divCartaJugadores);
});

btnNuevoJuego.addEventListener('click', () => {
    inicializarJuego();
});
