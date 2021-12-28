const gameboard = (() => {
  const board = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
  ];

 

  function markBoard(playerMark, row, col) {
    board[row][col] = playerMark;

    return board;
  }

  function checkHorizontalWin(mark) {
    return board.find((row) => {
      return row.every((col) => {
        return col == mark;
      });
    });
  }

  function checkVerticalWin(mark, col) {
    return board.every((row) => {
      return row[col] == mark;
    });
  }

  return { markBoard, checkHorizontalWin, checkVerticalWin };
})();



console.table(gameboard.markBoard("X", 0, 0));
console.table(gameboard.markBoard("O", 1, 1));
console.table(gameboard.markBoard("X", 2, 0));
console.table(gameboard.markBoard("O", 2, 1));
console.table(gameboard.markBoard("X", 1, 0));

console.log(gameboard.checkVerticalWin("X", 0));

console.table(gameboard.moveHistory);