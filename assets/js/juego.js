/** 
 * 2c = two of clubs (treboles)
 * 2d = two of diamonds (diamantes)
 * 2h = two of hearts (corazones)
 * 2s = two of spades (espadas)
 */


//patron modulo sintaxis

const miModulo = (() =>{

'use strict';

let deck         = [];
const tipos      = ['C', 'D', 'H', 'S'],
 especiales = ['A', 'J', 'Q', 'K'];

let puntosJugadores = [];

//referencias del html

const btnPedir = document.querySelector('#btnPedir'),
      btnDetener = document.querySelector('#btnDetener'),
      btnNuevo = document.querySelector('#btnNuevo');

const divCartasJugadores = document.querySelectorAll('.divCartas'),
      puntosHTML = document.querySelectorAll('small');


      // esta funcion inicializa el juego
    const inicializarJuego = (numJugadores = 2) => {
    deck = crearDeck();

    puntosJugadores = [];
    for (let i = 0; i < numJugadores; i++) {
        puntosJugadores.push(0);
   
    }

    puntosHTML.forEach(elem => elem.innerText = 0); // con el forEach le digo que me recorra todos los elementos del array de puntosHTML y me les ponga el valor de 0, es decir, me resetea los puntos de ambos jugadores a 0 para que empiece un nuevo juego.
    divCartasJugadores.forEach(elem => elem.innerHTML = ''); // con el forEach le digo que me recorra todos los elementos del array de divCartasJugadores y me les ponga el valor de '', es decir, me resetea las cartas de ambos jugadores a vacio para que empiece un nuevo juego.

        btnPedir.disabled = false;
        btnDetener.disabled = false;

}   


/// esta funcion crea un nuevo deck
const crearDeck = () => {

    deck = [];
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

return _.shuffle( deck );;
}


/// esta funcion me permite tomar una carta

const pedirCarta = () => {

    if( deck.length === 0 ) {
        throw 'No hay cartas en el deck'; // la palabra reservada throw me permite lanzar un error personalizado, es decir, puedo lanzar un error con un mensaje personalizado para que el usuario sepa que es lo que esta pasando.
    }    
    return deck.pop();
}


const valorCarta = (carta) =>{
    const valor = carta.substring(0, carta.length - 1); // con el substring le digo que me tome desde el primer caracter hasta el penultimo caracter, es decir, me toma el valor de la carta sin el tipo, por ejemplo, si la carta es 2C, me toma el 2, si la carta es 10D, me toma el 10, si la carta es AC, me toma el A, etc.
    return (isNaN(valor)) ? (valor === 'A') ? 11 : 10 : valor * 1; // con el operador ternario le digo que si el valor no es un numero, entonces me de 11 puntos si el valor es A, sino me de 10 puntos, es decir, si la carta es A, me da 11 puntos, si la carta es J, Q o K, me da 10 puntos. Si el valor es un numero, entonces me lo multiplica por 1 para convertirlo a numero, es decir, si la carta es 2C, me da 2 puntos, si la carta es 10D, me da 10 puntos, etc.
}



//turno :0 = primer jugador y el ultimo sera la computadora
const acumularPuntos =(carta,turno) => {

    puntosJugadores [turno]= puntosJugadores[turno] + valorCarta( carta );
    puntosHTML[turno].innerText = puntosJugadores[turno];
    return puntosJugadores[turno];
}

const crearCarta = (carta, turno) => {

        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`; //3H, JD
        imgCarta.classList.add('carta');
        divCartasJugadores[turno].append( imgCarta );
}

    const determinarGanador = () => {

        const [puntosMinimos, puntosComputadora] = puntosJugadores;

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
    }, 100);
}

// turno de la computadora

const turnoComputadora = (puntosMinimos) => {

    let puntosComputadora = 0;

    do {
        const carta = pedirCarta();
        puntosComputadora = acumularPuntos(carta, puntosJugadores.length - 1);
        crearCarta(carta, puntosJugadores.length - 1);

    } while( (puntosComputadora < puntosMinimos) && (puntosMinimos <= 21) );

    determinarGanador();
}




//eventos
btnPedir.addEventListener('click',() => {

     const carta = pedirCarta();
     const puntosJugador = acumularPuntos(carta, 0);

     crearCarta(carta, 0);

    //const imgCarta = document.createElement('img');
    //imgCarta.src = `assets/cartas/${ carta }.png`; // con el template string le digo que me tome la ruta de la carta que yo pedi, es decir, si la carta es 2C, me toma la ruta assets/cartas/2C.png, si la carta es 10D, me toma la ruta assets/cartas/10D.png, etc.
    //divCartasJugador.append(imgCarta); // con el append le digo que me agregue la carta que yo pedi al final del div de las cartas del jugador, para que se muestre en pantalla.
    //imgCarta.classList.add('carta'); // con el classList.add le digo que me agregue la clase carta a la imagen de la carta que yo pedi, para que se le apliquen los estilos de la clase carta, es decir, para que se muestre en pantalla con el tamaño y la posición correcta.
    

    if(puntosJugador > 21) {
        console.warn('Lo siento, perdiste');
        btnPedir.disabled = true; // con el disabled le digo que me desactive el boton de pedir carta, para que el jugador no pueda seguir pidiendo cartas despues de haber perdido.
        btnDetener.disabled = true; // con el disabled le digo que me desactive el boton de detener, para que el jugador no pueda seguir deteniendo su turno despues de haber perdido.   
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

         turnoComputadora(puntosJugadores [0]);
    });


    //btnNuevo.addEventListener('click', () => {

       // inicializarJuego();


    //});

    return {

        nuevoJuego: inicializarJuego

    };
 
//recordemos que el pop me elimina la ultima carta del deck y me la devuelve, es decir, me da la carta que yo pedi y ademas la elimina del deck para que no se repita.
// el push hace lo contrario, es decir, agrega una carta al final del deck, pero no la devuelve, es decir, no me da la carta que yo pedi, sino que me la agrega al final del deck para que no se repita.
// el metodo substring me permite extraer una parte de una cadena de texto, es decir, me permite tomar una parte de la carta para obtener su valor, por ejemplo, si la carta es 2C, me toma el 2, si la carta es 10D, me toma el 10, si la carta es AC, me toma el A, etc.
// recordar que el append sirve para agregar un elemento al final de otro elemento, es decir, me permite agregar la carta que yo pedi al final del div de las cartas del jugador, para que se muestre en pantalla.
})();


