import _, { shuffle } from "underscore";



/**
 * Crea un nuevo deck
 * @param {Array <String>} tiposCarta 
 * @param {Array <String>} tiposEspeciales 
 * @returns {Array <String>} regresa un nuevo deck
 */
export const crearDeck = (tiposCarta, tiposEspeciales) => {

    if (!tiposCarta || tiposCarta.length === 0) throw new Error('Tipo de carta es obligatorio Arreglo de string');
    if (!tiposEspeciales || tiposEspeciales.length === 0) throw new Error('Tipo especiales es obligatorio como un Arreglo de string');
    let deck = [];

    for (let i = 2; i <= 10; i++) {
        for (let tipo of tiposCarta) {
            deck.push(i + tipo);
        }
    }

    for (let tipo of tiposCarta) {
        for (let especial of tiposEspeciales) {
            deck.push(especial + tipo)
        }
    }

    deck = _.shuffle(deck);
    return deck;
};