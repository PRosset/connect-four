var playerStart = 1;
var playerTurn = 1;
var player1Score = 0;
var player2Score = 0;

var gameBoard = [];
var gameEnabled = true;
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
    var $colPos = $col.offset();

    var testInc = 40 * i;
    console.log($colPos);
    $col.hover(function () {
      console.log("I fired!");
      $('.piece').css('left', $colPos.left + 'px');
      // newPiece.css({left: $colPos});
    });
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
  if (gameEnabled) {
    for (var row = gameBoard[col].length; row >= 0; row--) {
      if (gameBoard[col][row] === 0) {
        gameBoard[col][row] = playerTurn;
        $('#col' + col + 'cell' + row).addClass('player' + playerTurn);

        checkForWin(col, row);
        if (gameEnabled) {
          playerTurn = 3 - playerTurn;
          togglePlayer(playerTurn);
        }

        return;
      } else if (row === gameBoard.length) {
         console.log('it is still player ' + playerTurn + 's turn');
      }
    }
  } else {
    console.log("Game not currently active");
  }
}

function resetGame () {
  if ($resetBtn.hasClass('resetActive')){
    $resetBtn.removeClass('resetActive');
  } else {
    $resetBtn.addClass('resetActive');
  }

  gameEnabled = true;
  $('#scoreOne').text(player1Score);
  $('#scoreTwo').text(player2Score);

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
  var test = checkVertical
  if (checkVertical(col, cell)) {
    // console.log(checkVertical(col, cell));
    someoneWon();
    highlightWinner(checkVertical(col, cell));
    gameEnabled = false;
    console.log(gameEnabled);
  } else if (checkHorizontal(col, cell)) {
    // console.log(checkHorizontal(col, cell));
    someoneWon();
    gameEnabled = false;
    console.log(gameEnabled);
  } else if (checkDiagonalAscending(col, cell)) {
    // console.log(checkDiagonalAscending(col, cell));
    someoneWon();
    gameEnabled = false;
    console.log(gameEnabled);
  } else if (checkDiagonalDescending(col, cell)) {
    // console.log(checkDiagonalDescending(col, cell));
    someoneWon();
    gameEnabled = false;
    console.log(gameEnabled);
  } else {
    false;
  }
  isBoardFull();
}
function checkVertical(col, row) {
  if (gameBoard[col][row + 3] &&
      gameBoard[col][row] === gameBoard[col][row + 1] &&
      gameBoard[col][row] === gameBoard[col][row + 2] &&
      gameBoard[col][row] === gameBoard[col][row + 3]) {
      console.log('Player ' + playerTurn + " wins Vertically");
      return winner = [col, row, col, row + 1, col, row + 2, col, row + 3];
  } else {
    return false;
  }
}

function checkHorizontal(col, row) {
  if (gameBoard[col + 3] &&
      gameBoard[col][row] === gameBoard[col + 1][row] &&
      gameBoard[col][row] === gameBoard[col + 2][row] &&
      gameBoard[col][row] === gameBoard[col + 3][row]) {
      console.log("Player " + playerTurn + " wins Horizontally");
      return [col, row, col + 1, row, col + 2, row, col + 3, row];

  } else if (gameBoard[col - 3] &&
             gameBoard[col][row] === gameBoard[col - 1][row] &&
             gameBoard[col][row] === gameBoard[col - 2][row] &&
             gameBoard[col][row] === gameBoard[col - 3][row]) {
      console.log("Player " + playerTurn + " wins Horizontally");
      return [col, row, col - 1, row, col - 2, row, col - 3, row];

  } else if (gameBoard[col - 1] && gameBoard[col + 2] &&
             gameBoard[col][row] === gameBoard[col - 1][row] &&
             gameBoard[col][row] === gameBoard[col + 1][row] &&
             gameBoard[col][row] === gameBoard[col + 2][row]) {
      console.log("Player " + playerTurn + " wins Horizontally");
      return [col, row, col - 1, row, col + 1, row, col + 2, row];

  } else if (gameBoard[col + 1] && gameBoard[col - 2] &&
             gameBoard[col][row] === gameBoard[col + 1][row] &&
             gameBoard[col][row] === gameBoard[col - 1][row] &&
             gameBoard[col][row] === gameBoard[col - 2][row]) {
      console.log("Player " + playerTurn + " wins Horizontally");
      return [col, row, col + 1, row, col - 1, row, col - 1, row];
  } else {
    return false;
  }
}

function checkDiagonalAscending(col, row) {
  if (gameBoard[col + 3] &&
      gameBoard[col][row] === gameBoard[col + 1][row - 1] &&
      gameBoard[col][row] === gameBoard[col + 2][row - 2] &&
      gameBoard[col][row] === gameBoard[col + 3][row - 3]) {
      console.log("Player " + playerTurn + " wins Diagnoal Ascending");
      return [col, row, col + 1, row - 1, col + 2, row - 2, col + 3, row - 3];
  } else if (gameBoard[col - 1] && gameBoard[col + 2] &&
             gameBoard[col][row] === gameBoard[col - 1][row + 1] &&
             gameBoard[col][row] === gameBoard[col + 1][row - 1] &&
             gameBoard[col][row] === gameBoard[col + 2][row - 2]) {
      console.log("Player " + playerTurn + " wins Diagnoal Ascending");
      return [col, row, col - 1, row + 1, col + 1, row - 1, col + 2, row - 2];
  } else if (gameBoard[col + 1] && gameBoard[col - 2] &&
             gameBoard[col][row] === gameBoard[col - 2][row + 2] &&
             gameBoard[col][row] === gameBoard[col - 1][row + 1] &&
             gameBoard[col][row] === gameBoard[col + 1][row - 1]) {
      console.log("Player " + playerTurn + " wins Diagnoal Ascending");
      return [col, row, col - 1, row + 1, col - 2, row + 2, col + 1, row - 1];
  } else if (gameBoard[col - 3] &&
             gameBoard[col][row] === gameBoard[col - 1][row + 1] &&
             gameBoard[col][row] === gameBoard[col - 2][row + 2] &&
             gameBoard[col][row] === gameBoard[col - 3][row + 3]) {
      console.log("Player " + playerTurn + " wins Diagnoal Ascending");
      return [col, row, col - 1, row + 1, col - 2, row + 2, col - 3,row + 3];
  } else {
    return false;
  }
}

function checkDiagonalDescending(col, row) {
  if (gameBoard[col - 3] &&
      gameBoard[col][row] === gameBoard[col - 1][row - 1] &&
      gameBoard[col][row] === gameBoard[col - 2][row - 2] &&
      gameBoard[col][row] === gameBoard[col - 3][row - 3]) {
      console.log("Player " + playerTurn + " wins Diagnoal Descending");
      return [col, row, col - 1, row - 1, col - 2, row - 2, col - 3, row - 3];
  } else if (gameBoard[col - 2] && gameBoard[col + 1] &&
             gameBoard[col][row] === gameBoard[col - 1][row - 1] &&
             gameBoard[col][row] === gameBoard[col - 2][row - 2] &&
             gameBoard[col][row] === gameBoard[col + 1][row + 1]) {
      console.log("Player " + playerTurn + " wins Diagnoal Descending");
      return [col, row, col - 1, row - 1, col - 2, row - 2, col + 1, row + 1];
  } else if (gameBoard[col - 1] && gameBoard[col + 2] &&
             gameBoard[col][row] === gameBoard[col - 1][row - 1] &&
             gameBoard[col][row] === gameBoard[col + 1][row + 1] &&
             gameBoard[col][row] === gameBoard[col + 2][row + 2]) {
      console.log("Player " + playerTurn + " wins Diagnoal Descending");
      return [col, row, col - 1, row - 1, col + 1, row + 1, col + 2, row + 2];
  } else if (gameBoard[col + 3] &&
             gameBoard[col][row] === gameBoard[col + 1][row + 1] &&
             gameBoard[col][row] === gameBoard[col + 2][row + 2] &&
             gameBoard[col][row] === gameBoard[col + 3][row + 3] ) {
      console.log("Player " + playerTurn + " wins Diagnoal Descending");
      return[col, row, col + 1, row + 1, col + 2, row + 2, col + 3, row + 3];
  } else {
    return false;
  }
}

function isBoardFull () {
  for (var c = 0; c < gameBoard.length; c++) {
    for (var r = 0; r < 6; r++) {
      if (gameBoard[c][r] === 0) {
        return false;
      }
    }
  }
  console.log("Stop the game board is full");
  return true;
}
function someoneWon () {
  if (playerTurn === 1) {
    $('#scoreOne').text("WINNER!");
    player1Score = player1Score + 1;
  } else if (playerTurn === 2) {
    $('#scoreTwo').text("WINNER!");
    player2Score = player2Score + 1;
  }
}
function highlightWinner (pos) {
  $('#col0cell0.cell.player1::before').addClass("winnerCell");
  // $('#col' + pos[0] + 'row' + pos[1] + '.cell.player'+ playerTurn + '::before').addClass("winnerCell");
  // $('#col' + pos[2] + 'row' + pos[3] + '.cell.player'+ playerTurn + '::before').addClass("winnerCell");
  // $('#col' + pos[4] + 'row' + pos[5] + '.cell.player'+ playerTurn + '::before').addClass("winnerCell");
  // $('#col' + pos[6] + 'row' + pos[7] + '.cell.player'+ playerTurn + '::before').addClass("winnerCell");
  console.log("I ran");
}
