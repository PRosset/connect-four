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

var pieceReady = true;
var dropReady = true;

var $resetBtn = $('#resetSlit');
$resetBtn.click(resetGame);

buildBoard();

function buildBoard () {
  var $domBoard = $('#gameBoard');

  for (i = 0; i < 7; i++) {
    gameBoard[i] = [];
    var $col = $('<div class="col col' + i +'" onclick=dropPiece('
                 + i + ')></div>');
    $domBoard.append($col);
    var $colPos = $col.offset();

    // Add rows to each column
    for (j = 0; j < 6; j++) {
      var cell = document.createElement('div');
      cell.className = 'cell';
      cell.setAttribute('id', 'col' + i + 'cell' + j)
      $col.append(cell);
      gameBoard[i][j] = 0;
    }
  }
  createPiece();
}
function createPiece () {
  var $newPiece = $('<div class="piece"></div>');
  $('.playSpace').prepend($newPiece);
    $('.playSpace').delegate('.col', 'mouseover', function (){
      if (!pieceReady || !gameEnabled) {
        return;
      } else {
          dropReady = false
          var left = $(this).offset().left - $newPiece.parent().offset().left
                     + $(this).outerWidth()/2 - $newPiece.width()/2;
          $newPiece.stop().animate({left: left}, 200, 'swing', function(){
            dropReady = true;
          });
      }
  });
}

function dropPiece (col) {
  if (gameEnabled && dropReady) {
    for (var row = gameBoard[col].length; row >= 0; row--) {
      if (gameBoard[col][row] === 0) {
        gameBoard[col][row] = playerTurn;
        pieceReady = false;
        dropReady = false;
        var newCell = $('#col' + col + 'cell' + row);
        var cellPos = newCell.offset();
        var $newPiece = $('.piece');

        var top = cellPos.top - $newPiece.parent().offset().top +
                  newCell.outerHeight()/2 - $newPiece.height()/2;
        $newPiece.stop().animate({top: top}, 600, 'easeOutBounce', function() {
          newCell.addClass('player' + playerTurn);
          checkForWin(col, row);
          if (gameEnabled) {
            playerTurn = 3 - playerTurn;
            togglePlayer(playerTurn);
            $newPiece.css('top', "0");
          }
          pieceReady = true;
          dropReady = true;
        });
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
  $player1ScoreBoard.removeClass('winnerP1');
  $player2ScoreBoard.removeClass('winnerP2');
  $('#resetText').text("RESET").css('color', '#175DCC');
  if ($resetBtn.hasClass('resetActive')){
    $resetBtn.removeClass('resetActive');
    $('#resetBtn').css('background', '#d8544a');
  } else {
    $resetBtn.addClass('resetActive');
    $('#resetBtn').css('background', '#ecb538');
  }

  gameEnabled = true;
  $('#scoreOne').text(player1Score);
  $('#scoreTwo').text(player2Score);

  $(".piece").css({'top':"0", "left":"0"});
  playerStart = 3 - playerStart;
  playerTurn = playerStart;
  togglePlayer(playerTurn);

  //Reset board data and cell class names
  for (var i = 0; i < gameBoard.length; i++) {
    for (var j = 0; j < gameBoard[0].length; j++) {
      gameBoard[i][j] = 0;
      $('#col' + i + 'cell' + j).removeClass('player1 player2 winnerP1 winnerP2');
    }
  }
}

function togglePlayer(playerNum) {


  if (playerNum === 1) {
    $('.piece').css('background', '#d8544a');
    $player1ScoreBoard.css('background', 'rgba(216, 84, 74, 1)');
    $player2ScoreBoard.css('background', 'rgba(236, 181, 56, 0)');
  } else {
    $('.piece').css('background', '#ecb538');
    $player2ScoreBoard.css('background', 'rgba(236, 181, 56, 1)');
    $player1ScoreBoard.css('background', 'rgba(216, 84, 74, 0)');
  }
}

function checkForWin(col, cell) {
  var test = checkVertical
  if (checkVertical(col, cell)) {
    console.log('Player ' + playerTurn + " wins Vertically");
    someoneWon();
    highlightWinner(checkVertical(col, cell));
    gameEnabled = false;
    console.log(gameEnabled);
  } else if (checkHorizontal(col, cell)) {
    highlightWinner(checkHorizontal(col, cell));
    console.log("Player " + playerTurn + " wins Horizontally");
    someoneWon();
    gameEnabled = false;
    console.log(gameEnabled);
  } else if (checkDiagonalAscending(col, cell)) {
    highlightWinner(checkDiagonalAscending(col, cell));
    console.log("Player " + playerTurn + " wins Diagnoal Ascending");
    someoneWon();
    gameEnabled = false;
    console.log(gameEnabled);
  } else if (checkDiagonalDescending(col, cell)) {
    highlightWinner(checkDiagonalDescending(col, cell));
    console.log("Player " + playerTurn + " wins Diagnoal Descending");
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
      return [col, row, col + 1, row, col + 2, row, col + 3, row];

  } else if (gameBoard[col - 3] &&
             gameBoard[col][row] === gameBoard[col - 1][row] &&
             gameBoard[col][row] === gameBoard[col - 2][row] &&
             gameBoard[col][row] === gameBoard[col - 3][row]) {
      return [col, row, col - 1, row, col - 2, row, col - 3, row];

  } else if (gameBoard[col - 1] && gameBoard[col + 2] &&
             gameBoard[col][row] === gameBoard[col - 1][row] &&
             gameBoard[col][row] === gameBoard[col + 1][row] &&
             gameBoard[col][row] === gameBoard[col + 2][row]) {
      return [col, row, col - 1, row, col + 1, row, col + 2, row];

  } else if (gameBoard[col + 1] && gameBoard[col - 2] &&
             gameBoard[col][row] === gameBoard[col + 1][row] &&
             gameBoard[col][row] === gameBoard[col - 1][row] &&
             gameBoard[col][row] === gameBoard[col - 2][row]) {
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
      return [col, row, col + 1, row - 1, col + 2, row - 2, col + 3, row - 3];
  } else if (gameBoard[col - 1] && gameBoard[col + 2] &&
             gameBoard[col][row] === gameBoard[col - 1][row + 1] &&
             gameBoard[col][row] === gameBoard[col + 1][row - 1] &&
             gameBoard[col][row] === gameBoard[col + 2][row - 2]) {
      return [col, row, col - 1, row + 1, col + 1, row - 1, col + 2, row - 2];
  } else if (gameBoard[col + 1] && gameBoard[col - 2] &&
             gameBoard[col][row] === gameBoard[col - 2][row + 2] &&
             gameBoard[col][row] === gameBoard[col - 1][row + 1] &&
             gameBoard[col][row] === gameBoard[col + 1][row - 1]) {
      return [col, row, col - 1, row + 1, col - 2, row + 2, col + 1, row - 1];
  } else if (gameBoard[col - 3] &&
             gameBoard[col][row] === gameBoard[col - 1][row + 1] &&
             gameBoard[col][row] === gameBoard[col - 2][row + 2] &&
             gameBoard[col][row] === gameBoard[col - 3][row + 3]) {
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
      return [col, row, col - 1, row - 1, col - 2, row - 2, col - 3, row - 3];
  } else if (gameBoard[col - 2] && gameBoard[col + 1] &&
             gameBoard[col][row] === gameBoard[col - 1][row - 1] &&
             gameBoard[col][row] === gameBoard[col - 2][row - 2] &&
             gameBoard[col][row] === gameBoard[col + 1][row + 1]) {
      return [col, row, col - 1, row - 1, col - 2, row - 2, col + 1, row + 1];
  } else if (gameBoard[col - 1] && gameBoard[col + 2] &&
             gameBoard[col][row] === gameBoard[col - 1][row - 1] &&
             gameBoard[col][row] === gameBoard[col + 1][row + 1] &&
             gameBoard[col][row] === gameBoard[col + 2][row + 2]) {
      return [col, row, col - 1, row - 1, col + 1, row + 1, col + 2, row + 2];
  } else if (gameBoard[col + 3] &&
             gameBoard[col][row] === gameBoard[col + 1][row + 1] &&
             gameBoard[col][row] === gameBoard[col + 2][row + 2] &&
             gameBoard[col][row] === gameBoard[col + 3][row + 3] ) {
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
  $('#resetText').text("NEW GAME").css('color', '#ecf0f1');
}
function highlightWinner (pos) {
  $('#col' + pos[0] + 'cell' + pos[1] + '.cell.player' + playerTurn).addClass('winnerP' + playerTurn);
  $('#col' + pos[2] + 'cell' + pos[3] + '.cell.player' + playerTurn).addClass('winnerP' + playerTurn);
  $('#col' + pos[4] + 'cell' + pos[5] + '.cell.player' + playerTurn).addClass('winnerP' + playerTurn);
  $('#col' + pos[6] + 'cell' + pos[7] + '.cell.player' + playerTurn).addClass('winnerP' + playerTurn);
  $('.score.scoreP' + playerTurn).addClass('winnerP' + playerTurn);
  console.log("I ran");
}
