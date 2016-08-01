var playerStart = 1;
var playerTurn = 1;
var player1Score = 0;
var player2Score = 0;
//test
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
    var $col = $('<div className="col col' + i +'" onclick=dropPiece('
                 + i + ')></div>');
    $col.hover(function () {
      var hoverCol = $('col col' + i).css('background', 'rgba(0, 79, 204, .3)');
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

    domBoard.append($col);
  }
  // console.log('gameBoard:', gameBoard);
}

function dropPiece (col) {

  for (var row = gameBoard[col].length; row >= 0; row--) {
    if (gameBoard[col][row] === 0) {
      gameBoard[col][row] = playerTurn;
      $('#col' + col + 'cell' + row).addClass('player' + playerTurn);

      // checkForWin(col, row);
      playerTurn = 3 - playerTurn;
      togglePlayer(playerTurn);

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
    $player1Score.text(player1Score);
  } else {
    $resetBtn.addClass('resetActive');
    player2Score = player2Score + 1;
    $player2Score.text(player2Score);
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
  // if (checkForFour(gameBoard[col][cell],
  //                  gameBoard[col + 1][cell],
  //                  gameBoard[col + 2][cell],
  //                  gameBoard[col + 3][cell]) {
  //   console.log("Player " + playerTurn + " wins Vertically");
  // } else if (gameBoard[col][cell] === gameBoard[col + 1][cell] &&
  //            gameBoard[col][cell] === gameBoard[col + 2][cell] &&
  //            gameBoard[col][cell] === gameBoard[col + 3][cell]) {
  //   console.log("Player " + playerTurn + " wins Horiozntally");
  // } else if (gameBoard[col][cell] === gameBoard[col + 1][cell - 1] &&
  //            gameBoard[col][cell] === gameBoard[col + 2][cell - 2] &&
  //            gameBoard[col][cell] === gameBoard[col + 3][cell - 3] ||
  //            gameBoard[col][cell] === gameBoard[col - 1][cell + 1] &&
  //            gameBoard[col][cell] === gameBoard[col - 2][cell + 2] &&
  //            gameBoard[col][cell] === gameBoard[col - 3][cell + 3] ||
  //            gameBoard[col][cell] === gameBoard[col - 1][cell + 1] &&
  //            gameBoard[col][cell] === gameBoard[col - 2][cell + 2] &&
  //            gameBoard[col][cell] === gameBoard[col + 1][cell - 1] ||
  //            gameBoard[col][cell] === gameBoard[col - 1][cell + 1] &&
  //            gameBoard[col][cell] === gameBoard[col + 1][cell - 1] &&
  //            gameBoard[col][cell] === gameBoard[col + 2][cell - 2]) {
  //   console.log("Player " + playerTurn + " wins diagnoally");
  // } else if (gameBoard[col][cell] === gameBoard[col + 1][cell - 1] &&
  //            gameBoard[col][cell] === gameBoard[col + 2][cell - 2] &&
  //            gameBoard[col][cell] === gameBoard[col + 3][cell - 3] ||
  //            gameBoard[col][cell] === gameBoard[col - 1][cell + 1] &&
  //            gameBoard[col][cell] === gameBoard[col - 2][cell + 2] &&
  //            gameBoard[col][cell] === gameBoard[col - 3][cell + 3] ||
  //            gameBoard[col][cell] === gameBoard[col - 1][cell + 1] &&
  //            gameBoard[col][cell] === gameBoard[col - 2][cell + 2] &&
  //            gameBoard[col][cell] === gameBoard[col + 1][cell - 1] ||
  //            gameBoard[col][cell] === gameBoard[col - 1][cell + 1] &&
  //            gameBoard[col][cell] === gameBoard[col + 1][cell - 1] &&
  //            gameBoard[col][cell] === gameBoard[col + 2][cell - 2]) {
  //   console.log("Player " + playerTurn + " wins diagnoally");
  // } else if (gameBoard[col][cell] === gameBoard[col - 3][cell - 3] &&
  //            gameBoard[col][cell] === gameBoard[col - 2][cell - 2] &&
  //            gameBoard[col][cell] === gameBoard[col - 1][cell - 1] ||
  //            gameBoard[col][cell] === gameBoard[col - 2][cell - 2] &&
  //            gameBoard[col][cell] === gameBoard[col - 1][cell - 1] &&
  //            gameBoard[col][cell] === gameBoard[col + 1][cell + 1] ||
  //            gameBoard[col][cell] === gameBoard[col - 1][cell - 1] &&
  //            gameBoard[col][cell] === gameBoard[col + 1][cell + 1] &&
  //            gameBoard[col][cell] === gameBoard[col + 2][cell + 2] ||
  //            gameBoard[col][cell] === gameBoard[col + 1][cell + 1] &&
  //            gameBoard[col][cell] === gameBoard[col + 2][cell + 2] &&
  //            gameBoard[col][cell] === gameBoard[col + 3][cell + 3]) {
  //   console.log("Player " + playerTurn + " wins diagnoally")
  // }
}

// function movePiece (col) {
//   var $movingPiece = $('.piece');

// }

function checkForFour(cell1, cell2, cell3, cell4) {
  return cell1 === cell2 &&
         cell2 === cell3 &&
         cell3 === cell4;
}

