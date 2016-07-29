// var slotStates = ['empty', 'player1', 'player2'];
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

    // Add rows to each column
    for (j = 6; j > 0; j--) {
      var slot = document.createElement('div');

      // slot.setAttribute('state', slotStates[0]);
      slot.className = 'slot';
      slot.setAttribute('id', 'col ' + i + ' slot ' + j)
      col.appendChild(slot);
      gameBoard[i][j] = slot;
    }

    domBoard.appendChild(col);
  }
  // buildResetBtn();
  console.log('gameBoard:', gameBoard);
}

// Building a reset button through Javascript.
// function buildResetBtn () {
//   var resetWrapper = document.createElement('div');
//   var resetSlit = document.createElement('div');
//   var resetBtn = document.createElement('div');
//   var resetText = document.createElement('span');
//   var resetBar = document.getElementById('resetBar');

//   // $('resetBar').append('<div id="resetWrapper"><span id="resetText">Reset</span><div id="resetSlit"><div id="resetBtn"></div></div></div>')
//   resetWrapper.setAttribute('id', 'resetWrapper');
//   resetSlit.setAttribute('id', 'resetSlit');
//   resetBtn.setAttribute('id', 'resetBtn');
//   resetText.setAttribute('id', 'resetText');

//   resetText.innerHTML = 'Reset';

//   resetWrapper.appendChild(resetText);
//   resetWrapper.appendChild(resetSlit);
//   resetSlit.appendChild(resetBtn);

//   resetBar.appendChild(resetWrapper);

//   resetWrapper.addEventListener('onmouseover', function() {
//     console.log('hello');
//     resetText.setAttribute('class', 'resetTextActive');
//   });
//   resetWrapper.addEventListener('onmouseout', function() {
//     resetText.setAttribute('class', '');
//   });
//   resetSlit.addEventListener('click', resetBoard);
// }

function dropToken () {
  if (playerTurn === 1) {
    this.lastChild.className = "slot player1";
  } else if (playerTurn === 2) {
    this.lastChild.className = "slot player2";
  }

  playerTurn = 3 - playerTurn;

  console.log('This works! You clicked on: ' + this.className);
}

function tokenFall () {
  this.firstChild
}

function resetBoard () {
  if (resetBtn.className === "resetActive"){
    resetBtn.className = "";
  } else {
    resetBtn.className = "resetActive";
  }
  playerStart = 3 - playerStart;
}
