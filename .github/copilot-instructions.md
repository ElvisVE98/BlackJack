# Copilot Instructions - BlackJack Game

## Project Overview
A vanilla JavaScript Blackjack card game with player vs. computer gameplay. Single-file game logic using the Module (IIFE) pattern for encapsulation, Bootstrap 4 for styling, and Underscore.js for utilities.

## Architecture & Key Patterns

### Module Pattern (IIFE)
All game logic encapsulates in a self-executing function `(() => { ... })()` in [juego.js](assets/js/juego.js). This prevents global scope pollution and maintains clean state management. Add all new game logic inside this IIFE.

### Card Representation
Cards use string format: `{value}{suit}` where:
- Values: `2-10`, `A`, `J`, `Q`, `K`
- Suits: `C` (Clubs/Treboles), `D` (Diamonds/Diamantes), `H` (Hearts/Corazones), `S` (Spades/Espadas)
- Example: `"2C"` = Two of Clubs, `"AC"` = Ace of Clubs
- Card images map directly: `assets/cartas/{card}.png`

### Card Value Calculation
The `valorCarta()` function extracts numeric value using `substring(0, length-1)`:
- Numeric cards (2-10): face value
- J, Q, K: 10 points
- A: 11 points (no soft/hard distinction implemented)

### Game State Management
Global variables track state (all declared inside IIFE):
```javascript
let deck = [];  // current deck
let puntosJugador = 0;  // player score
let puntosComputadora = 0;  // computer score
```
Reset these in `btnNuevo` click handler to start new game.

### DOM References Pattern
All DOM queries cached at module load using `document.querySelector()`:
```javascript
const btnPedir = document.querySelector('#btnPedir');
const divCartasJugador = document.querySelector('#jugador-cartas');
const puntosHTML = document.querySelectorAll('small');  // both score displays
```
Use index [0] for player, [1] for computer in `puntosHTML`.

### Event-Driven Flow
Three buttons drive game flow:
1. **btnNuevo**: Resets scores, deck, and UI; re-enables buttons
2. **btnPedir**: Draws card, updates player score; disables if ≥21
3. **btnDetener**: Locks player actions; triggers `turnoComputadora()`

### Computer Turn Logic
`turnoComputadora(puntosMinimos)` runs in do-while loop:
- Computer draws cards until score ≥ `puntosMinimos` (player's score) or > 21
- Uses 10ms `setTimeout()` before announcing result
- Compares final scores (21 busts, ties, player wins handled)

## Development Conventions

### Bilingual Code
Comments mix Spanish and English. Maintain this style for consistency:
- Variable names: Spanish (`puntosJugador`, `divCartasComputadora`)
- Comments: Explain in Spanish, some English technical terms OK
- UI labels: Spanish ([index.html](index.html) uses "jugador", "Computadora", "Pedir carta")

### DOM Manipulation
Use vanilla JavaScript exclusively:
- `document.createElement()` for new elements
- `.appendChild()` / `.append()` to add to DOM
- `.innerHTML = ''` to clear containers
- `.classList.add()` for styling
- Direct property assignment for disabled state

### Disabled State for Button Control
Set `btnPedir.disabled = true` to prevent further plays. Reset to `false` in new game. Use this pattern to enforce game rules (can't draw >21, can't play after detener).

## External Dependencies

- **Bootstrap 4**: CDN link in [index.html](index.html), used for button styling (btn, btn-danger, btn-primary)
- **Underscore.js**: Local copy [underscore-min.js](assets/js/underscore-min.js), used only for `_.shuffle()` to randomize deck

## Common Tasks

**Add new game rule**: Modify `turnoComputadora()` or add logic in event listeners.  
**Change card styling**: Edit `.carta` class in [styles.css](assets/css/styles.css).  
**Adjust scoring logic**: Update `valorCarta()` function (e.g., soft Ace handling).  
**Add new button action**: Create event listener following `btnPedir` pattern inside IIFE.  
**Debug score issues**: Check `puntosHTML[0]` (player) vs `puntosHTML[1]` (computer) updates.

## File Structure Reference
- [index.html](index.html) - Game UI, button layout, score displays
- [assets/js/juego.js](assets/js/juego.js) - All game logic (175 lines, fully commented)
- [assets/css/styles.css](assets/css/styles.css) - Card positioning, green felt background
- [assets/cartas/](assets/cartas/) - 52 card PNG images + card backs
