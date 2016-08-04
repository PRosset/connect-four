var gameBoard = [];

var $player1ScoreBoard = $('.score.scoreP1');
var $player2ScoreBoard = $('.score.scoreP2');

var $player1Score = $('#scoreOne');
var $player2Score = $('#scoreTwo');

var pieceReady = true;
var dropReady = true;

var $resetBtn = $('#resetSlit');

var gameState = {
  playerStart: 1,
  playerTurn: 1,
  player1Score: 0,
  player2Score: 0,
  gameEnabled: true
};

var theme = {
  themeNum: 0,
  colorOne: '#d8544a',
  classOne: '',
  colorOneOpacity: 'rgba(236, 181, 56, 0)',
  colorOneBorder: '#d8544a',
  colorTwo: '#ecb538',
  classTwo: '',
  colorTwoOpacity: 'rgba(216, 84, 74, 0)',
  colorTwoBorder: '#ecb538',
  boardColor: '#175DCC',
  boardBorderColor: '#004fcc',
  _bgColor: '#0e98e3'
};
$('.btn.themeOne').click(function() {
  if (theme.themeNum === 1) {
    resetBoardColors();
  } else {
    theme.themeNum = 1
    $('.cell').addClass('starWars');
    theme.colorOne = '#e74c3c';
    theme.colorOneOpacity = 'rgba(231, 76, 60, 0)';
    theme.colorTwo = '#34495e';
    theme.colorTwoOpacity = 'rgba(52, 73, 94, 0)';
    theme.colorOneBorder = '#e74c3c';
    theme.colorTwoBorder = '#34495e';
    theme.boardColor = '#95a5a6';
    theme.boardBorderColor = '#7f8c8d';
    theme._bgColor = '#bdc3c7';
    $('.piece.player1').html('<i class="fa fa-rebel" aria-hidden="true">');
    updateBoardColors();
  }
});

var soundManager = {
  soundEnabled: true,
  winSFX: new Audio('audio/win.wav'),
  dropPieceSFX: new Audio('audio/dropPiece.wav'),
  resetSFX: new Audio('audio/reset.wav'),
  boardFullSFX: new Audio('audio/boardfull.wav'),
  rowFullSFX: new Audio('audio/rowFull.wav'),
};

soundManager.dropPieceSFX.volume = 0.2;

$resetBtn.click(resetGame);
$('.volume').click(function(){
  if (soundManager.soundEnabled) {
    $('.fa').addClass('fa-volume-off').removeClass('fa-volume-up');
    // $('.fixed').addClass('active');
    soundManager.soundEnabled = false;
  } else {
    $('.fa').addClass('fa-volume-up').removeClass('fa-volume-off');
    // $('.fixed').removeClass('active');
    soundManager.soundEnabled = true;
  }
})

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
      if (!pieceReady || !gameState.gameEnabled) {
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
  if (gameState.gameEnabled && dropReady) {
    for (var row = gameBoard[col].length; row >= 0; row--) {
      if (gameBoard[col][row] === 0) {
        if (soundManager.soundEnabled) { soundManager.dropPieceSFX.play(); }
        gameBoard[col][row] = gameState.playerTurn;
        pieceReady = false;
        dropReady = false;
        var newCell = $('#col' + col + 'cell' + row);
        var cellPos = newCell.offset();
        var $newPiece = $('.piece');

        var top = cellPos.top - $newPiece.parent().offset().top +
                  newCell.outerHeight()/2 - $newPiece.height()/2;
        $newPiece.stop().animate({top: top}, 600, 'easeOutBounce', function() {
          newCell.addClass('player' + gameState.playerTurn);

          checkForWin(col, row);
          if (gameState.gameEnabled) {
            gameState.playerTurn = 3 - gameState.playerTurn;
            togglePlayer(gameState.playerTurn);
            $newPiece.css('top', "0");
          }
          pieceReady = true;
          dropReady = true;
        });
        return;
      } else if (row === gameBoard.length) {
         if (soundManager.soundEnabled) { soundManager.rowFullSFX.play(); }
         console.log('it is still player ' + gameState.playerTurn + 's turn');
      }
    }
  } else {
    console.log("Game not currently active");
  }
}

function resetGame () {
  if (soundManager.soundEnabled) { soundManager.resetSFX.play(); }
  $player1ScoreBoard.removeClass('winnerP1');
  $player2ScoreBoard.removeClass('winnerP2');
  $('#resetText').removeClass('winnerText').text("RESET");
  if ($resetBtn.hasClass('resetActive')){
    $resetBtn.removeClass('resetActive');
    $('#resetBtn').css('background', theme.colorOne);
  } else {
    $resetBtn.addClass('resetActive');
    $('#resetBtn').css('background', theme.colorTwo);
  }

  gameState.gameEnabled = true;
  $('#scoreOne').text(gameState.player1Score);
  $('#scoreTwo').text(gameState.player2Score);

  $(".piece").css({'top':"0", "left":"0"});
  gameState.playerStart = 3 - gameState.playerStart;
  gameState.playerTurn = gameState.playerStart;
  togglePlayer(gameState.playerTurn);

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
    $('.piece').css('background', theme.colorOne);
    $player1ScoreBoard.css('background', theme.colorOne);
    $player2ScoreBoard.css('background', theme.colorOneOpacity);
  } else {
    $('.piece').css('background', theme.colorTwo);
    $player2ScoreBoard.css('background', theme.colorTwo);
    $player1ScoreBoard.css('background', theme.colorTwoOpacity);
  }
}

function checkForWin(col, cell) {
  var test = checkVertical
  if (checkVertical(col, cell)) {
    console.log('Player ' + gameState.playerTurn + " wins Vertically");
    someoneWon();
    highlightWinner(checkVertical(col, cell));
    gameState.gameEnabled = false;
  } else if (checkHorizontal(col, cell)) {
    highlightWinner(checkHorizontal(col, cell));
    console.log("Player " + gameState.playerTurn + " wins Horizontally");
    someoneWon();
    gameState.gameEnabled = false;
  } else if (checkDiagonalAscending(col, cell)) {
    highlightWinner(checkDiagonalAscending(col, cell));
    console.log("Player " + gameState.playerTurn + " wins Diagnoal Ascending");
    someoneWon();
    gameState.gameEnabled = false;
  } else if (checkDiagonalDescending(col, cell)) {
    highlightWinner(checkDiagonalDescending(col, cell));
    console.log("Player " + gameState.playerTurn + " wins Diagnoal Descending");
    someoneWon();
    gameState.gameEnabled = false;
  } else {
    false;
  }
  isBoardFull();
}

// TODO: Update win logic into WHILE loops. Add a matched variable, cycle through
// i < 3  + / -. WHILE every cell === gameBoard[col][row] matched++. else break
// out of the for loop.

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
  if (soundManager.soundEnabled) { soundManager.boardFullSFX.play(); }
  return true;
}
function someoneWon () {
  if (gameState.playerTurn === 1) {
    $('#scoreOne').text("WINNER!");
    gameState.player1Score = gameState.player1Score + 1;
  } else if (gameState.playerTurn === 2) {
    $('#scoreTwo').text("WINNER!");
    gameState.player2Score = gameState.player2Score + 1;
  }
  $('#resetText').addClass('winnerText').text("NEW GAME");
  if (soundManager.soundEnabled) { soundManager.winSFX.play(); }
}
function highlightWinner (pos) {
  $('#col' + pos[0] + 'cell' + pos[1] + '.cell.player' + gameState.playerTurn).addClass('winnerP' + gameState.playerTurn);
  $('#col' + pos[2] + 'cell' + pos[3] + '.cell.player' + gameState.playerTurn).addClass('winnerP' + gameState.playerTurn);
  $('#col' + pos[4] + 'cell' + pos[5] + '.cell.player' + gameState.playerTurn).addClass('winnerP' + gameState.playerTurn);
  $('#col' + pos[6] + 'cell' + pos[7] + '.cell.player' + gameState.playerTurn).addClass('winnerP' + gameState.playerTurn);
  $('.score.scoreP' + gameState.playerTurn).addClass('winnerP' + gameState.playerTurn);
}

function updateBoardColors () {
  $('body').css('background', theme._bgColor);
  $player1ScoreBoard.css({'background': theme.colorOne, 'border-color': theme.colorOne});
  $player2ScoreBoard.css({'background': theme.colorTwo, 'border-color': theme.colorTwo});
  $('.columnSelector').css({'background': theme.boardColor, 'border-right-color': theme.boardBorderColor});
  $('#gameBoard').css('border-right-color', theme.boardBorderColor);
  $('#resetBar').css({'background': theme.boardColor, 'border-bottom-color': theme.boardBorderColor, 'border-right-color': theme.boardBorderColor});
  $resetBtn.css({'background': theme.boardColor, 'border-color': theme.boardBorderColor});
  $('#resetText').css('color', theme.boardColor).hover(function () {
    $(this).css('background', theme.boardColor);
    }, function() {
      $(this).css('background', theme._bgColor);
  });
  $('#reset').css('background', theme._bgColor);
  $('#resetBtn').css('background', theme.colorOne);
  $('.btn').css('background', theme._bgColor);
  $('.btn:hover').css('background', theme.boardColor);
  $('.player1').css('background', theme.colorOne);
  $('.player2').css('background', theme.colorTwo);
  // $('.col:hover').css('background')
  if (playerTurn === 1) {
    $('.piece').css('background', theme.colorOne);
  } else {
    $('.piece').css('background', theme.colorTwo);
  }
}

function resetBoardColors () {
    theme.themeNum = 0;
    $('.cell').removeClass('starWars');
    theme.colorOne = '#d8544a';
    theme.colorOneOpacity = 'rgba(236, 181, 56, 0)';
    theme.colorOneBorder = '#d8544a';
    theme.colorTwo = '#ecb538';
    theme.colorTwoOpacity = 'rgba(216, 84, 74, 0)';
    theme.colorTwoBorder = '#ecb538';
    theme.boardColor = '#175DCC';
    theme.boardBorderColor = '#004fcc';
    theme._bgColor = '#0e98e3';
    updateBoardColors();
}
