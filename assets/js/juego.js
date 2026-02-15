/** 
 * 2c = two of clubs (treboles)
 * 2d = two of diamonds (diamantes)
 * 2h = two of hearts (corazones)
 * 2s = two of spades (espadas)
 */

let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
puntosComputadora = 0;

//referencias del html

const btnPedir = document.querySelector('#btnPedir');
const btnDetener = document.querySelector('#btnDetener');
const btnNuevo = document.querySelector('#btnNuevo');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const divCartasJugador = document.querySelector('#jugador-cartas');
const puntosHTML = document.querySelectorAll('small');

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
    return carta;
}

//pedirCarta();

const valorCarta = (carta) =>{

    const valor = carta.substring(0, carta.length - 1); // con el substring le digo que me tome desde el primer caracter hasta el penultimo caracter, es decir, me toma el valor de la carta sin el tipo, por ejemplo, si la carta es 2C, me toma el 2, si la carta es 10D, me toma el 10, si la carta es AC, me toma el A, etc.
    return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1; // con el operador ternario le digo que si el valor no es un numero, entonces me de 11 puntos si el valor es A, sino me de 10 puntos, es decir, si la carta es A, me da 11 puntos, si la carta es J, Q o K, me da 10 puntos. Si el valor es un numero, entonces me lo multiplica por 1 para convertirlo a numero, es decir, si la carta es 2C, me da 2 puntos, si la carta es 10D, me da 10 puntos, etc.
}



// turno de la computadora

const turnoComputadora = (puntosMinimos) => {

    do {
        const carta = pedirCarta();
        puntosComputadora = puntosComputadora + valorCarta( carta );
        puntosHTML[1].innerText = puntosComputadora;

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append(imgCarta);


    } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    setTimeout(() => {       
    if(puntosComputadora === puntosMinimos) {
        alert('Nadie gana :(');
    } else if (puntosMinimos > 21) {
        alert('Computadora gana');
    } else if (puntosComputadora > 21) {
        alert('Jugador gana');
    } else {
        alert('Computadora gana');
    }
        }, 10);
}







//eventos
btnPedir.addEventListener('click',() => {

     const carta = pedirCarta();

     puntosJugador = puntosJugador + valorCarta( carta );
     puntosHTML[0].innerText = puntosJugador;

    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`; // con el template string le digo que me tome la ruta de la carta que yo pedi, es decir, si la carta es 2C, me toma la ruta assets/cartas/2C.png, si la carta es 10D, me toma la ruta assets/cartas/10D.png, etc.
    divCartasJugador.append(imgCarta); // con el append le digo que me agregue la carta que yo pedi al final del div de las cartas del jugador, para que se muestre en pantalla.
    imgCarta.classList.add('carta'); // con el classList.add le digo que me agregue la clase carta a la imagen de la carta que yo pedi, para que se le apliquen los estilos de la clase carta, es decir, para que se muestre en pantalla con el tamaño y la posición correcta.
    
    if(puntosJugador > 21) {
        console.warn('Lo siento, perdiste');
        btnPedir.disabled = true; // con el disabled le digo que me desactive el boton de pedir carta, para que el jugador no pueda seguir pidiendo cartas despues de haber perdido.   
        turnoComputadora(puntosJugador);

    } else if (puntosJugador === 21) {
        console.warn('21, genial!');
        btnPedir.disabled = true; // con el disabled le digo que me desactive el boton de pedir carta, para que el jugador no pueda seguir pidiendo cartas despues de haber ganado.   
        btnDetener.disabled = true; // con el disabled le digo que me desactive el boton de detener, para que el jugador no pueda seguir deteniendo su turno despues de haber ganado.
        turnoComputadora(puntosJugador);
    }
    
    });




    btnDetener.addEventListener('click', () => {

        btnPedir.disabled = true; // con el disabled le digo que me desactive el boton de pedir carta, para que el jugador no pueda seguir pidiendo cartas despues de haber detenido su turno.
        btnDetener.disabled = true; // con el disabled le digo que me desactive el boton de detener, para que el jugador no pueda seguir deteniendo su turno despues de haber detenido su turno.
         turnoComputadora(puntosJugador);
    });




    btnNuevo.addEventListener('click', () => {

        console.clear();
        deck = [];
        deck = crearDeck();

        puntosComputadora = 0;
        puntosJugador = 0;
        puntosHTML[0].innerText = 0;
        puntosHTML[1].innerText = 0;

        divCartasComputadora.innerHTML = '';
        divCartasJugador.innerHTML = '';

        btnPedir.disabled = false;
        btnDetener.disabled = false;
    });
 





//recordemos que el pop me elimina la ultima carta del deck y me la devuelve, es decir, me da la carta que yo pedi y ademas la elimina del deck para que no se repita.
// el push hace lo contrario, es decir, agrega una carta al final del deck, pero no la devuelve, es decir, no me da la carta que yo pedi, sino que me la agrega al final del deck para que no se repita.
// el metodo substring me permite extraer una parte de una cadena de texto, es decir, me permite tomar una parte de la carta para obtener su valor, por ejemplo, si la carta es 2C, me toma el 2, si la carta es 10D, me toma el 10, si la carta es AC, me toma el A, etc.
// recordar que el append sirve para agregar un elemento al final de otro elemento, es decir, me permite agregar la carta que yo pedi al final del div de las cartas del jugador, para que se muestre en pantalla.