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

  function checkHorizontalWin(playerMark) {
    return board.find((row) => row.every((col) => col == playerMark));
  }

  function checkVerticalWin(playerMark, col) {
    return board.every((row) => row[col] == playerMark);
  }

  function checkDiagonalWin(playerMark) {
    const leftToRight = [];
    const rightToLeft = [];

    board.reduce((offset, row) => {
      leftToRight.push(row[offset]);
      return ++offset;
    }, 0);

    board.reduce((offset, row) => {
      rightToLeft.push(row[offset]);
      return --offset;
    }, 2);

    const isLeftWinner = leftToRight.every((mark) => mark == playerMark);

    const isRightWinner = rightToLeft.every((mark) => mark == playerMark);

    return isLeftWinner || isRightWinner;
  }

  function checkWin(playerMark) {
    return (
      checkHorizontalWin(playerMark) ||
      checkVerticalWin(playerMark, 0) ||
      checkVerticalWin(playerMark, 1) ||
      checkVerticalWin(playerMark, 2) ||
      checkDiagonalWin(playerMark)
    );
  }

  return { markBoard, checkWin };
})();

console.table(gameboard.markBoard("X", 0, 2));
console.table(gameboard.markBoard("X", 1, 1));
console.table(gameboard.markBoard("X", 2, 0));

console.log(gameboard.checkWin("X"));
