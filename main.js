var playerStart = 1;
var playerTurn = 1;

var gameBoard = [];

var play1ScoreBoard = $('.score.scoreP1');
var play2ScoreBoard = $('.score.scoreP2');

var resetBtn = $('#resetSlit');
resetBtn.click(resetBoard);

buildBoard();

function buildBoard () {
  var domBoard = document.getElementById('gameBoard');

  for (i = 0; i < 7; i++) {
    gameBoard[i] = [];
    var col = document.createElement('div');

    var lastcell = 0;

    col.className = 'col col' + i;
    col.setAttribute('onclick', 'dropToken(' + i + ')');
    // Add rows to each column
    for (j = 0; j < 6; j++) {
      var cell = document.createElement('div');

      cell.className = 'cell';
      cell.setAttribute('id', 'col' + i + 'cell' + j)
      col.appendChild(cell);
      gameBoard[i][j] = 0;
    }

    domBoard.appendChild(col);
  }
  // console.log('gameBoard:', gameBoard);
}

function dropToken (col) {
  console.log('You clicked on: ' + this);

  for (var row = gameBoard[col].length; row >= 0; row--) {
    if (gameBoard[col][row] === 0) {
      gameBoard[col][row] = playerTurn;
      $('#col' + col + 'cell' + row).addClass('player' + playerTurn);
      // console.log('player ' + playerTurn + ' has taken his turn');
      checkForWin(col, row);
      playerTurn = 3 - playerTurn;
      togglePlayer(playerTurn);
      // console.log(gameBoard[col] + ' and ' +gameBoard[col][row]);
      return;
    } else if (row === gameBoard.length) {
      // console.log('it is still player ' + playerTurn + 's turn');
    }
  }
}

function resetBoard () {
  if (resetBtn.hasClass('resetActive')){
    resetBtn.removeClass('resetActive');
  } else {
    resetBtn.addClass('resetActive');
  }
  console.log("player" + playerStart + " was starting");
  playerStart = 3 - playerStart;
  console.log('player' + playerStart + ' now starting');
  playerTurn = playerStart;
  togglePlayer(playerTurn);
}

function togglePlayer(playerNum) {
  if (playerNum === 1) {
    play1ScoreBoard.css('background', 'rgba(216, 84, 74, 1)')
    play2ScoreBoard.css('background', 'rgba(236, 181, 56, 0)')
  } else {
    play2ScoreBoard.css('background', 'rgba(236, 181, 56, 1)')
    play1ScoreBoard.css('background', 'rgba(216, 84, 74, 0)')
  }
}

function checkForWin(col, cell) {
  if (gameBoard[col][cell] === gameBoard[col][cell + 1] &&
      gameBoard[col][cell] === gameBoard[col][cell + 2] &&
      gameBoard[col][cell] === gameBoard[col][cell + 3]) {
    console.log("Player " + playerTurn + " wins Vertically");
  } else if (gameBoard[col][cell] === gameBoard[col + 1][cell] &&
             gameBoard[col][cell] === gameBoard[col + 2][cell] &&
             gameBoard[col][cell] === gameBoard[col + 3][cell]){
    console.log("Player " + playerTurn + " wins Horiozntally");
  }
  // } else if (gameBoard[col][cell] ===
  //            gameBoard[col + 1][cell - 1] &&
  //            gameBoard[col + 2][cell - 2] &&
  //            gameBoard[col + 3][cell - 3] ||
  //            gameBoard[col - 1][cell + 1] &&
  //            gameBoard[col - 2][cell + 2] &&
  //            gameBoard[col - 3][cell + 3] ||
  //            gameBoard[col - 1][cell + 1] &&
  //            gameBoard[col - 2][cell + 2] &&
  //            gameBoard[col + 1][cell - 1] ||
  //            gameBoard[col - 1][cell + 1] &&
  //            gameBoard[col + 1][cell - 1] &&
  //            gameBoard[col + 2][cell - 2]) {
  //   console.log("Player " + playerTurn + " wins diagnoally");
  // } else if (gameBoard[col][cell] ===
  //            gameBoard[col + 1][cell - 1] &&
  //            gameBoard[col + 2][cell - 2] &&
  //            gameBoard[col + 3][cell - 3] ||
  //            gameBoard[col - 1][cell + 1] &&
  //            gameBoard[col - 2][cell + 2] &&
  //            gameBoard[col - 3][cell + 3] ||
  //            gameBoard[col - 1][cell + 1] &&
  //            gameBoard[col - 2][cell + 2] &&
  //            gameBoard[col + 1][cell - 1] ||
  //            gameBoard[col - 1][cell + 1] &&
  //            gameBoard[col + 1][cell - 1] &&
  //            gameBoard[col + 2][cell - 2]) {
  //   console.log("Player " + playerTurn + " wins diagnoally");
  // } else if (gameBoard[col][cell] ===
  //            gameBoard[col - 3][cell - 3] &&
  //            gameBoard[col - 2][cell - 2] &&
  //            gameBoard[col - 1][cell - 1] ||
  //            gameBoard[col - 2][cell - 2] &&
  //            gameBoard[col - 1][cell - 1] &&
  //            gameBoard[col + 1][cell + 1] ||
  //            gameBoard[col - 1][cell - 1] &&
  //            gameBoard[col + 1][cell + 1] &&
  //            gameBoard[col + 2][cell + 2] ||
  //            gameBoard[col + 1][cell + 1] &&
  //            gameBoard[col + 2][cell + 2] &&
  //            gameBoard[col + 3][cell + 3]) {
  //   console.log("Player " + playerTurn + " wins diagnoally")
  // }
}

function checkVertically () {

}

function checkHorizontally () {

}

function checkDiagnoalAscending () {

}
function checkDiagnoalDescending () {

}

function checkForEdge () {
}

