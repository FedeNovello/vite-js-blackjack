(() => {
    'use strict';

    let deck = [];
    const tipos = ['C', 'D', 'H', 'S'],
        especiales = ['A', 'J', 'Q', 'K'];
    let puntosJugador = 0;
    let puntosJugadores = [];

    //REFERENCIAS HTML
    const btnPedir = document.querySelector('#btnPedir'),
        btnDetener = document.querySelector('#btnDetener'),
        btnNuevoJuego = document.querySelector('#btnNuevo'),
        divCartaJugadores = document.querySelectorAll('.divCartas'),
        puntosHtml = document.querySelectorAll('small');

    const inicializarJuego = (numJugadores = 2) => {
        deck = crearDeck();
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

    const crearDeck = () => {
        deck = [];
        for (let i = 2; i <= 10; i++) {
            for (let tipo of tipos) {
                deck.push(i + tipo);
            }
        }

        for (let tipo of tipos) {
            for (let especial of especiales) {
                deck.push(especial + tipo)
            }
        }
        return _.shuffle(deck);;
    };


    const pedirCarta = () => {
        if (deck.length === 0) {
            throw 'no hay cartas'
        }
        return deck.pop();
    }

    const valorCarta = (carta) => {
        const valor = carta.substring(0, carta.length - 1);
        return (isNaN(valor)) ? ((valor === 'A') ? 11 : 10) : valor * 1;
    }
    const acumularPuntos = (carta, turno) => {
        puntosJugadores[turno] = puntosJugadores[turno] + valorCarta(carta);
        puntosHtml[turno].innerText = puntosJugadores[turno];
        return puntosJugadores[turno];
    }

    const crearCarta = (carta, turno) => {
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/cartas/${carta}.png`;
        imgCarta.classList.add('carta');
        divCartaJugadores[turno].append(imgCarta);

    }

    const determinarGanador = () => {
        const [puntosMinimos, puntosComputadora] = puntosJugadores;
        btnPedir.disabled = true;
        btnDetener.disabled = true;

        setTimeout(() => {
            if (puntosComputadora === puntosJugador) {
                alert('nadie gana');
            } else if (puntosMinimos > 21 || (puntosMinimos < puntosComputadora && puntosComputadora <= 21)) {
                alert('perdiste');
            }
            else if (puntosComputadora > 21 || puntosComputadora < puntosMinimos) {
                alert('felicidades, ganaste');
            }
        });
    }

    // Turno computadora
    const turnoComputadora = (puntosMinimos) => {
        let puntosComputadora = 0;
        do {
            const carta = pedirCarta();
            puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
            crearCarta(carta, puntosJugadores.length - 1);

        } while (puntosComputadora < puntosMinimos && (puntosMinimos <= 21));

        determinarGanador();
    }

    //EVENTOS
    btnPedir.addEventListener('click', () => {
        const carta = pedirCarta();
        puntosJugador = acumularPuntos(carta, 0);
        crearCarta(carta, 0);


        if (puntosJugador > 21) {
            console.log(puntosJugador);
            console.log('jugador perdio');
            turnoComputadora(puntosJugador);
        } else if (puntosJugador === 21) {
            console.log('21, genial');
            turnoComputadora(puntosJugador);
        }
    });

    btnDetener.addEventListener('click', () => {
        turnoComputadora(puntosJugador);
    });

    btnNuevoJuego.addEventListener('click', () => {
        inicializarJuego();
    });
})();