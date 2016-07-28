var slotStates = ['empty', 'player1', 'player2'];

var playerStart = 1;
var playerTurn = 1;


buildBoard();

function buildBoard () {
  var gameBoard = [];
  var domBoard = document.getElementById('gameBoard');

  for (i = 0; i < 7; i++) {
    gameBoard[i] = [];
    var col = document.createElement('div');
    col.className = 'col col' + i;
    col.addEventListener('click', dropToken);
    domBoard.appendChild(col);

    // Add rows to each column
    for (j = 6; j > 0; j--) {
      var slot = document.createElement('div');
      slot.setAttribute('state', slotStates[0]);
      slot.className = 'slot slot' + j;
      col.appendChild(slot);
      gameBoard[i][j] = slot;
    }
  }
  // console.log('gameBoard:', gameBoard);
}
function buildResetBtn () {
  var resetSlit = document.createElement('div');

  resetSlit.className = ''
  resetSlit.addEventListener('click', resetBoard);

}

function dropToken () {
  if (playerTurn === 1) {
    this.lastChild.className = "slot player1";
  } else if (playerTurn === 2) {
    this.lastChild.className = "slot player2";
  }

  playerTurn = 3 - playerTurn;

  console.log('This works! You clicked on: ' + this.className);
}

function resetBoard () {
  if (resetBtn.className === "resetActive"){
    resetBtn.className = "";
  } else {
    resetBtn.className = "resetActive";
  }
  playerStart = 3 - playerStart;
}
