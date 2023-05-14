const playerRed = "R";
const playerYellow = "Y";
let currentPlayer = playerRed;
const board = document.querySelector("#board");
let gameOver = false;
let gameBoard = [];
let currColumns;

let rows = 6;
let columns = 7;

window.onload = function () {
  setGame();
};

function setGame() {
  for (let i = 0; i < rows; i++) {
    let row = [];
    currColumns = [6, 6, 6, 6, 6, 6, 6];
    for (let j = 0; j < columns; j++) {
      row.push(" ");
      let tile = document.createElement("div");
      tile.classList.add("tile");
      tile.addEventListener("click", setPiece);
      tile.id = i.toString() + "-" + j.toString();
      board.append(tile);
    }
    gameBoard.push(row);
  }
}

function setPiece() {
  if (gameOver) {
    return;
  }

  let coords = this.id.split("-");
  let r = parseInt(coords[0]);
  let c = parseInt(coords[1]);
  currColumns[c]--;

  r = currColumns[c];

  if (r < 0) {
    return;
  }

  gameBoard[r][c] = currentPlayer;

  let location = document.getElementById(r.toString() + "-" + c.toString());

  if (currentPlayer == playerRed) {
    location.classList.add("red-piece");
    currentPlayer = playerYellow;
  } else if (currentPlayer == playerYellow) {
    location.classList.add("yellow-piece");
    currentPlayer = playerRed;
  }

  currColumns[c] = r;

  checkWinner();
}

function checkWinner() {
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (gameBoard[r][c] != " ") {
        if (
          gameBoard[r][c] == gameBoard[r][c + 1] &&
          gameBoard[r][c + 1] == gameBoard[r][c + 2] &&
          gameBoard[r][c + 2] == gameBoard[r][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }
  for (let c = 0; c < columns; c++) {
    for (let r = 0; r < rows - 3; r++) {
      if (gameBoard[r][c] != " ") {
        if (
          gameBoard[r][c] == gameBoard[r+1][c] &&
          gameBoard[r + 1][c] == gameBoard[r + 2][c] &&
          gameBoard[r + 2][c] == gameBoard[r + 3][c]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  for (let r = 0; r < rows-3; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (gameBoard[r][c] != " ") {
        if (
          gameBoard[r][c] == gameBoard[r + 1][c + 1] &&
          gameBoard[r + 1][c + 1] == gameBoard[r + 2][c + 2] &&
          gameBoard[r + 2][c + 2] == gameBoard[r + 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

  for (let r = 3; r < rows; r++) {
    for (let c = 0; c < columns - 3; c++) {
      if (gameBoard[r][c] != " ") {
        if (
          gameBoard[r][c] == gameBoard[r - 1][c + 1] &&
          gameBoard[r - 1][c + 1] == gameBoard[r - 2][c + 2] &&
          gameBoard[r - 2][c + 2] == gameBoard[r - 3][c + 3]
        ) {
          setWinner(r, c);
          return;
        }
      }
    }
  }

}

function setWinner(r, c){
    let winner = document.getElementById('winner')
    if (gameBoard[r][c] == playerRed){
        winner.innerText = "Red Wins"
    } else {
        winner.innerText = "Yellow Wins"
    }
    gameOver = true;
}
