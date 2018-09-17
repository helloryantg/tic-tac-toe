/*----- constants -----*/


/*----- app's state (variables) -----*/
var state = 'x';
var currentTurn;
var mainSquare;
var squares;
var resetBtn;
var gameOver; // unused

/*----- cached element references -----*/
var squareData = allSquares();

/*----- event listeners -----*/
document.addEventListener('DOMContentLoaded', function(){
    console.log('DOM loaded');

    mainSquare = document.getElementById('square');
    squares = document.querySelectorAll('.squares');
    resetBtn = document.getElementById('reset');    

    mainSquare.addEventListener('click', function(event){
        console.log(event.target.id + " has been pressed!");
        if (squareData['square' + event.target.id] === 'x' || squareData['square' + event.target.id] === 'o') return;
        event.target.className = event.target.className + " " + state;
        squareData['square' + event.target.id] = state;
        if (checkForWinner()) return;
        state = state === 'x' ? 'o' : 'x';
        currentTurn++;
    })
    
    resetBtn.addEventListener('click', function(event) {
        resetSquares();
    })

    initGame();
})

/*----- functions -----*/
function allSquares () {
    return {
        square1: 1,
        square2: 2,
        square3: 3,
        square4: 4,
        square5: 5,
        square6: 6,
        square7: 7,
        square8: 8,
        square9: 9,
    }
}

function initGame() {
    currentTurn = 1;
    console.log("Game has started: X goes first!");
}

// Winning combinations
// 3 Rows: [1, 2, 3][4, 5, 6][7, 8, 9]
// 3 Columns: [1, 4, 7][2, 5, 8][3, 6, 9]
// 2 Diagonals: [1, 5, 9][3, 5, 7]

function checkWinConditions() {
    return (squareData['square1'] === squareData['square2'] && squareData['square2'] === squareData['square3']) ||
    (squareData['square4'] === squareData['square5'] && squareData['square5'] === squareData['square6']) ||
    (squareData['square7'] === squareData['square8'] && squareData['square8'] === squareData['square9']) ||
    (squareData['square1'] === squareData['square4'] && squareData['square4'] === squareData['square7']) ||
    (squareData['square2'] === squareData['square5'] && squareData['square5'] === squareData['square8']) ||
    (squareData['square3'] === squareData['square6'] && squareData['square6'] === squareData['square9']) ||
    (squareData['square1'] === squareData['square5'] && squareData['square5'] === squareData['square9']) ||
    (squareData['square3'] === squareData['square5'] && squareData['square5'] === squareData['square7'])
}

function checkForWinner() {
    if (currentTurn <= 4) return;
    if (checkWinConditions()) {
        console.log("The winner is " + state); // Check this
        return true;
    }
    if (currentTurn === 9 && !checkWinConditions()) {
        console.log("It's a tie! Press reset to restart the game.")
        return true;
    }
    console.log(checkWinConditions());
}

function resetSquares() {
    state = 'x';
    currentTurn = 1;
    squareData = allSquares();
    for (var i = 0; i < squares.length; i++) {
        squares[i].className = 'squares';
    }
}