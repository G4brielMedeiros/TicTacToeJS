const gameboard = (() => {
  let board = [null, null, null, null, null, null, null, null, null];

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

  function markBoard(playerMark, position) {
    if (board[position] != null) return false;

    board[position] = playerMark;

    return board;
  }

  function checkPlayerWin(playerMark) {
    return winCombos.reduce((winner, combo) => {
      const line = combo.map((spot) => board[spot]);

      if (!winner) winner = line.every((spot) => spot == playerMark);

      return winner;
    }, false);
  }

  function getWinner() {
    return checkPlayerWin("X") ? "X" : checkPlayerWin("O") ? "O" : false;
  }

  function resetBoard() {
    board = board.map(spot => spot = null);
    return board;
  }

  return { markBoard, getWinner, resetBoard };
})();

console.table(gameboard.markBoard("X", 7));
console.table(gameboard.markBoard("X", 4));
console.table(gameboard.markBoard("X", 5));
console.table(gameboard.markBoard("O", 0));
console.table(gameboard.markBoard("O", 1));
gameboard.resetBoard();
console.table(gameboard.markBoard("O", 2));


console.log(gameboard.getWinner("X"));
