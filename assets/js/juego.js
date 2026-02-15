/** 
 * 2c = two of clubs (treboles)
 * 2d = two of diamonds (diamantes)
 * 2h = two of hearts (corazones)
 * 2s = two of spades (espadas)
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

/// esta funcion crea un nuevo deck
const crearDeck = () => {
    for( let i = 2; i<=10; i++ ) {
        for ( let tipo of tipos ) {
            deck.push( i + tipo );
        }
    }
    for (let tipo of tipos) {
        for(let esp of especiales) {
            deck.push( esp + tipo );
        }
    }

deck = _.shuffle( deck );
console.log( deck );
return deck;
}

crearDeck();

/// esta funcion me permite tomar una carta

const pedirCarta = () => {

    if( deck.length === 0 ) {
        throw 'No hay cartas en el deck'; // la palabra reservada throw me permite lanzar un error personalizado, es decir, puedo lanzar un error con un mensaje personalizado para que el usuario sepa que es lo que esta pasando.
    }

    const carta =deck.pop();

    console.log(deck);
    console.log(carta);
    return carta;
}

//pedirCarta();

const valorCarta = (carta) =>{

    const valor = carta.substring(0, carta.length - 1); // con el substring le digo que me tome desde el primer caracter hasta el penultimo caracter, es decir, me toma el valor de la carta sin el tipo, por ejemplo, si la carta es 2C, me toma el 2, si la carta es 10D, me toma el 10, si la carta es AC, me toma el A, etc.
    return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1; // con el operador ternario le digo que si el valor no es un numero, entonces me de 11 puntos si el valor es A, sino me de 10 puntos, es decir, si la carta es A, me da 11 puntos, si la carta es J, Q o K, me da 10 puntos. Si el valor es un numero, entonces me lo multiplica por 1 para convertirlo a numero, es decir, si la carta es 2C, me da 2 puntos, si la carta es 10D, me da 10 puntos, etc.
}

const valor = valorCarta(pedirCarta());
console.log({valor});

//valorCarta('jC');

//recordemos que el pop me elimina la ultima carta del deck y me la devuelve, es decir, me da la carta que yo pedi y ademas la elimina del deck para que no se repita.
// el push hace lo contrario, es decir, agrega una carta al final del deck, pero no la devuelve, es decir, no me da la carta que yo pedi, sino que me la agrega al final del deck para que no se repita.
// el metodo substring me permite extraer una parte de una cadena de texto, es decir, me permite tomar una parte de la carta para obtener su valor, por ejemplo, si la carta es 2C, me toma el 2, si la carta es 10D, me toma el 10, si la carta es AC, me toma el A, etc.
