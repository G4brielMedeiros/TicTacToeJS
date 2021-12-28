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
    return board.find((row) => {
      return row.every((col) => {
        return col == playerMark;
      });
    });
  }

  function checkVerticalWin(playerMark, col) {
    
    return board.every((row) => {
      return row[col] == playerMark;
    });
    
  }

  function checkDiagonalWin(playerMark) {
    
    const leftToRight = [];
    const rightToLeft = [];


    board.reduce((offset, row) => {
      leftToRight.push(row[offset]);
      return ++offset;
    }, 0)

    board.reduce((offset, row) => {
      rightToLeft.push(row[offset]);
      return --offset;
    }, 2)

    // console.log(leftToRight);
    // console.log(rightToLeft);

    const isLeftWinner = leftToRight.every((mark) => {
      return mark == playerMark;
    })

    const isRightWinner = rightToLeft.every((mark) => {
      return mark == playerMark;
    })



    return (isLeftWinner || isRightWinner);


  }

  function checkWin(playerMark) {
    const winStatus = [];

  

    return checkHorizontalWin(playerMark) ? true :
    checkVerticalWin(playerMark, 0) ? true :
    checkVerticalWin(playerMark, 1) ? true :
    checkVerticalWin(playerMark, 2) ? true :
    checkDiagonalWin(playerMark);

  }

  return { markBoard, checkWin };
})();



console.table(gameboard.markBoard("X", 0, 2));
console.table(gameboard.markBoard("X", 1, 1));
console.table(gameboard.markBoard("X", 2, 0));

console.log(gameboard.checkWin('X'));