const GameLogic = (() => {
  /*
    Array that represents the board.
  */
  let board = [null, null, null, null, null, null, null, null, null];

  /*
    Combinations of array spots that determine a win.
  */
  const winCombos = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  /*
    Marks the board if {position} isn't already taken, by...

    Sets {spotAvailable} & {winner} variables.
    If nothing in board position, {spotAvailable} is true.
    If {spotAvailable} & no {winner}, set board position to player mark.
    Return state of the move.
  */
  function markBoard(playerMark, position) {
    let spotAvailable = false;
    let winner = getWinner();

    if (board[position] == null) spotAvailable = true;

    if (spotAvailable && !winner) board[position] = playerMark;

    console.log(board);

    return { spotAvailable, winner };
  }

  /* checkVictory
  
    Checks if a given player won, by...
    
    A reduce function with a starting value {isWinner} of 'false' iterates through every {winCombo} in {winCombos}
    
      Declarers a constant array mapping the spots in the combo to marks on the board. [0, 1, 2] => [X, X, O]
      If there's no winning line iterated yet, check if current line is a winning line.
    Returns {isWinner}

  */
  function _checkVictory(playerMark) {
    return winCombos.reduce((isWinner, winCombo) => {
      const line = winCombo.map((spot) => board[spot]);

      if (!isWinner) isWinner = line.every((spot) => spot == playerMark);

      return isWinner;
    }, false);
  }

  function getWinner() {
    return _checkVictory("X") ? "X" : _checkVictory("O") ? "O" : false;
  }

  function resetBoard() {
    board = board.map((spot) => (spot = null));
    return board;
  }

  return { markBoard, getWinner, resetBoard };
})();

let isXTurn = true;

const boardHTML = document.getElementById("game");
const statusHTML = document.getElementById("status");

let cellId = 0;

function createCell() {
  const gameCellDOM = document.createElement("div");
  gameCellDOM.classList = "cell";
  gameCellDOM.id = cellId;
  cellId++;

  gameCellDOM.addEventListener("click", () => {
    const playerMove = GameLogic.markBoard(isXTurn ? "X" : "O", gameCellDOM.id);
    if (playerMove.spotAvailable == true && playerMove.winner == false)
      gameCellDOM.textContent = isXTurn ? "X" : "O";

    if (GameLogic.getWinner())
      statusHTML.textContent = `WOOOO! [${GameLogic.getWinner()}] WON THE GAME!`;

    console.log(playerMove);

    isXTurn = !isXTurn;
  });

  return gameCellDOM;
}

for (let i = 0; i < 9; i++) {
  boardHTML.appendChild(createCell());
}
