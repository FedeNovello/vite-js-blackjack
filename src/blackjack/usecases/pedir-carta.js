
/**
 * Pide una carta al deck
 * @param {Array <String>} deck 
 * @returns {String} carta
 */
export const pedirCarta = (deck) => {
    if (!deck || deck.length === 0) {
        throw new Error('no hay cartas')
    }
    const carta = deck.pop();
    return carta;
}
