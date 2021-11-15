window.addEventListener('DOMContentLoaded', () => {

  const tiles = Array.from(document.querySelectorAll('.tile'));
  const playerDisplay = document.querySelector('.display-player');
  const resetButton = document.querySelector('#reset');
  const announcer = document.querySelector('.announcer');
  const emptyBoard = ['', '', '', '', '', '', '', '', ''];

  let board = emptyBoard;
  let currentPlayer = 'X';
  let isGameActive = true;

  const PLAYERX_WON = 'PLAYERX_WON';
  const PLAYERO_WON = 'PLAYERO_WON';
  const TIE = 'TIE';

  const winningConditions = [
     [0, 1, 2],
     [3, 4, 5],
     [6, 7, 8],
     [0, 3, 6],
     [1, 4, 7],
     [2, 5, 8],
     [0, 4, 8],
     [2, 4, 6]
  ];

  // Validate the click action 
  const isValidAction = (tile) => {
    if (!!tile.innerText){
        return false;
    }

    return true;
  };

  // Update the board
  const updateBoard =  (index) => {
     board[index] = currentPlayer;
  }

  // Change the player between X and Y
  const changePlayer = () => {
      playerDisplay.classList.remove(`player${currentPlayer}`);
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';

      playerDisplay.innerText = currentPlayer;
      playerDisplay.classList.add(`player${currentPlayer}`);
  }

  // Change the display text to show the winner
  const announce = (type) => {
    let won = `Player <span class="player${currentPlayer}">${currentPlayer}</span> Won`
    switch(type){
       case PLAYERO_WON:
            announcer.innerHTML = won;
            break;
       case PLAYERX_WON:
            announcer.innerHTML = won;
            break;
       case TIE:
            announcer.innerText = 'Tie';
    }
    announcer.classList.remove('hide');
  };

  // Check for a match
  function handleResultValidation() {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConditions[i];
      const a = board[winCondition[0]];
      const b = board[winCondition[1]];
      const c = board[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }

    // If winner, prevent further play and annouce winner
    if (roundWon) {
      announce(currentPlayer === "X" ? PLAYERX_WON : PLAYERO_WON);
      isGameActive = false;
      return;
    }

    if (!board.includes("")) announce(TIE);
  }

  //Handle users click
  const userAction = (tile, index) => {
    if (isValidAction(tile) && isGameActive) {
      tile.innerText = currentPlayer;
      tile.classList.add(`player${currentPlayer}`);
      updateBoard(index);
      handleResultValidation();
      changePlayer();
    }
  };

  tiles.forEach( (tile, index) => {
      tile.addEventListener('click', () => userAction(tile, index));
  });

  const resetBoard = () => {
    // Clear the board
      board = emptyBoard;
      isGameActive = true;
      announcer.classList.add('hide');

      if (currentPlayer === 'O') {
          changePlayer();
      }

      tiles.forEach(tile => {
          tile.innerText = '';
          tile.classList.remove('playerX');
          tile.classList.remove('playerO');
      });
  }

  resetButton.addEventListener('click', resetBoard);

});
