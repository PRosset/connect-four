var playerStart = 1;
var playerTurn = 1;
var player1Score = 0;
var player2Score = 0;

var gameBoard = [];

var $player1ScoreBoard = $('.score.scoreP1');
var $player2ScoreBoard = $('.score.scoreP2');

var $player1Score = $('#scoreOne');
var $player2Score = $('#scoreTwo');

var $resetBtn = $('#resetSlit');
$resetBtn.click(resetGame);

buildBoard();

function buildBoard () {
  var domBoard = $('#gameBoard');

  for (i = 0; i < 7; i++) {
    gameBoard[i] = [];
    var $col = $('<div class="col col' + i +'" onclick=dropPiece('
                 + i + ')></div>');
    domBoard.append($col);
    var $colPos = $col.position();

    console.log($colPos);
    $col.hover(function () {
      // $('.piece').position().left
    });
    var colPosition = $col.position();
    console.log(colPosition.left);
    // Add rows to each column
    for (j = 0; j < 6; j++) {
      var cell = document.createElement('div');

      cell.className = 'cell';
      cell.setAttribute('id', 'col' + i + 'cell' + j)
      $col.append(cell);
      gameBoard[i][j] = 0;
    }
  }
  // console.log('gameBoard:', gameBoard);
}

function dropPiece (col) {

  for (var row = gameBoard[col].length; row >= 0; row--) {
    if (gameBoard[col][row] === 0) {
      gameBoard[col][row] = playerTurn;
      $('#col' + col + 'cell' + row).addClass('player' + playerTurn);

      checkForWin(col, row);
      // playerTurn = 3 - playerTurn;
      // togglePlayer(playerTurn);

      // console.log(gameBoard[col] + ' and ' +gameBoard[col][row]);
      return;
    } else if (row === gameBoard.length) {
       console.log('it is still player ' + playerTurn + 's turn');
    }
  }
}

function resetGame () {
  if ($resetBtn.hasClass('resetActive')){
    $resetBtn.removeClass('resetActive');
    player1Score = player1Score + 1;
  } else {
    $resetBtn.addClass('resetActive');
    player2Score = player2Score + 1;
  }

  playerStart = 3 - playerStart;
  playerTurn = playerStart;
  togglePlayer(playerTurn);

  //Reset board data and cell class names
  for (var i = 0; i < gameBoard.length; i++) {
    for (var j = 0; j < gameBoard[0].length; j++) {
      gameBoard[i][j] = 0;
      $('#col' + i + 'cell' + j).removeClass('player1 player2');
    }
  }
}

function togglePlayer(playerNum) {
  if (playerNum === 1) {
    $player1ScoreBoard.css('background', 'rgba(216, 84, 74, 1)');
    $player2ScoreBoard.css('background', 'rgba(236, 181, 56, 0)');
  } else {
    $player2ScoreBoard.css('background', 'rgba(236, 181, 56, 1)');
    $player1ScoreBoard.css('background', 'rgba(216, 84, 74, 0)');
  }
}

function checkForWin(col, cell) {
  checkVertical(col, cell)
  checkHorizontal(col, cell);
  checkDiagnoalAscending(col, cell);
  checkDiagnoalDescending(col, cell);
}
function checkVertical(col, row) {
  if (gameBoard[col][row + 3] &&
      gameBoard[col][row] === gameBoard[col][row + 1] &&
      gameBoard[col][row] === gameBoard[col][row + 2] &&
      gameBoard[col][row] === gameBoard[col][row + 3]) {
    console.log('Player ' + playerTurn + " wins Vertically");
  }
}

function checkHorizontal(col, row) {
  if (gameBoard[col + 3] &&
      gameBoard[col][row] === gameBoard[col + 1][row] &&
      gameBoard[col][row] === gameBoard[col + 2][row] &&
      gameBoard[col][row] === gameBoard[col + 3][row] ||
      gameBoard[col - 3] &&
      gameBoard[col][row] === gameBoard[col - 1][row] &&
      gameBoard[col][row] === gameBoard[col - 2][row] &&
      gameBoard[col][row] === gameBoard[col - 3][row] ||
      gameBoard[col - 1] && gameBoard[col + 2] &&
      gameBoard[col][row] === gameBoard[col - 1][row] &&
      gameBoard[col][row] === gameBoard[col + 1][row] &&
      gameBoard[col][row] === gameBoard[col + 2][row] ||
      gameBoard[col + 1] && gameBoard[col - 2] &&
      gameBoard[col][row] === gameBoard[col + 1][row] &&
      gameBoard[col][row] === gameBoard[col - 1][row] &&
      gameBoard[col][row] === gameBoard[col - 2][row]) {
    console.log("Player " + playerTurn + " wins Horizontally");
  }
}

function checkDiagnoalAscending(col, row) {
  if (gameBoard[col + 3] &&
      gameBoard[col][row] === gameBoard[col + 1][row - 1] &&
      gameBoard[col][row] === gameBoard[col + 2][row - 2] &&
      gameBoard[col][row] === gameBoard[col + 3][row - 3] ||
      gameBoard[col - 1] && gameBoard[col + 2] &&
      gameBoard[col][row] === gameBoard[col - 1][row + 1] &&
      gameBoard[col][row] === gameBoard[col + 1][row - 1] &&
      gameBoard[col][row] === gameBoard[col + 2][row - 2] ||
      gameBoard[col + 1] && gameBoard[col - 2] &&
      gameBoard[col][row] === gameBoard[col - 2][row + 2] &&
      gameBoard[col][row] === gameBoard[col - 1][row + 1] &&
      gameBoard[col][row] === gameBoard[col + 1][row - 1] ||
      gameBoard[col - 3] &&
      gameBoard[col][row] === gameBoard[col - 1][row + 1] &&
      gameBoard[col][row] === gameBoard[col - 2][row + 2] &&
      gameBoard[col][row] === gameBoard[col - 3][row + 3]) {
    console.log("Player " + playerTurn + " wins Diagnoal Ascending");
  }
}

function checkDiagnoalDescending(col, row) {
  if (gameBoard[col - 3] &&
      gameBoard[col][row] === gameBoard[col - 1][row - 1] &&
      gameBoard[col][row] === gameBoard[col - 2][row - 2] &&
      gameBoard[col][row] === gameBoard[col - 3][row - 3] ||
      gameBoard[col - 2] && gameBoard[col + 1] &&
      gameBoard[col][row] === gameBoard[col - 1][row - 1] &&
      gameBoard[col][row] === gameBoard[col - 2][row - 2] &&
      gameBoard[col][row] === gameBoard[col + 1][row + 1] ||
      gameBoard[col - 1] && gameBoard[col + 2] &&
      gameBoard[col][row] === gameBoard[col - 1][row - 1] &&
      gameBoard[col][row] === gameBoard[col + 1][row + 1] &&
      gameBoard[col][row] === gameBoard[col + 2][row + 2] ||
      gameBoard[col + 3] &&
      gameBoard[col][row] === gameBoard[col + 1][row + 1] &&
      gameBoard[col][row] === gameBoard[col + 2][row + 2] &&
      gameBoard[col][row] === gameBoard[col + 3][row + 3] ) {
    console.log("Player " + playerTurn + " wins Diagnoal Descending");
  }
}

function isBoardFull () {
  for (var c = 0; c < gameBoard.length; c++) {
    for (var r = 0; r < gameBoard[].length; r++) {
      if (gameBoard[c][r] === 0) {
        return false;
      }
    }
  }
}
