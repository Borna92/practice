document.addEventListener("DOMContentLoaded", () => {
  const squares = document.querySelectorAll(".grid div");
  const result = document.querySelector("#result");
  const displayCurrentPlayer = document.querySelector("#current-player");
  let currentPlayer = 1;
  let gridWidth = 7;

  function animateDrops(y) {
    if (currentPlayer === 1) {
      for (let i = 0; i < squares.length / 7 - 1; i++) {
        setTimeout(() => {
          if (
            !squares[y + gridWidth * i].classList.contains("player-one") &&
            !squares[y + gridWidth * i].classList.contains("player-two")
          ) {
            squares[y + gridWidth * i].classList.add("player-one");
            squares[y + gridWidth * i - gridWidth].classList.remove(
              "player-one"
            );
          }
        }, 100 * i);
      }
    } else if (currentPlayer === 2) {
      for (let i = 0; i < squares.length / 7 - 1; i++) {
        setTimeout(() => {
          if (
            !squares[y + gridWidth * i].classList.contains("player-one") &&
            !squares[y + gridWidth * i].classList.contains("player-two")
          ) {
            squares[y + gridWidth * i].classList.add("player-two");
            squares[y + gridWidth * i - gridWidth].classList.remove(
              "player-two"
            );
          }
        }, 100 * i);
      }
    }
  }


  for (let i = 0; i < squares.length; i++) {
    squares[i].onclick = () => {
      if (i >= 0 && i <= 6) {
        squares[i].classList.add("taken");
        if (currentPlayer === 1) {
          squares[i].classList.add("player-one");
          animateDrops(i);
          currentPlayer = 2;
          displayCurrentPlayer.innerHTML = currentPlayer
        } else if (currentPlayer === 2) {
          squares[i].classList.add("player-two");
          animateDrops(i);
          currentPlayer = 1;
          displayCurrentPlayer.innerHTML = currentPlayer
        }
      }
    };
  }
});
