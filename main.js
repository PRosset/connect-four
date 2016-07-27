var slotStates = ['empty', 'player1', 'player2'];

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
    for (j = 0; j < 6; j++) {
      var slot = document.createElement('div');
      slot.setAttribute('state', slotStates[0]);
      slot.className = 'slot slot' + j;
      col.appendChild(slot);
      gameBoard[i][j] = slot;
    }
  }
  // console.log('gameBoard:', gameBoard);
}

function dropToken () {
  // this.lastChild.className = "slot player1";
  console.log('This works! You clicked on: ' + this.className);
}
