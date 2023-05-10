const timeLeftDisplay = document.querySelector("#time-left");
const resultDisplay = document.querySelector("#result");
const startPauseButton = document.querySelector("#start-pause-button");
const resetButton = document.querySelector("#reset-button");
const squares = document.querySelectorAll(".grid div");
const logsLeft = document.querySelectorAll(".log-left");
const logsRight = document.querySelectorAll(".log-right");
const carsLeft = document.querySelectorAll(".car-left");
const carsRight = document.querySelectorAll(".car-right");
const gridWidth = 9;
const startPosition = 76;
let timeLeft = timeLeftDisplay.innerHTML;
let currentIndex = startPosition;
let gameInterval;
let gameInProgress = false;

function moveFrog(e) {
  squares[currentIndex].classList.remove("frog");
  switch (e.key) {
    case "ArrowLeft":
      if (currentIndex % gridWidth !== 0) {
        currentIndex -= 1;
      }
      break;
    case "ArrowRight":
      if (currentIndex % gridWidth < gridWidth - 1) {
        currentIndex += 1;
      }

      break;
    case "ArrowUp":
      if (currentIndex < gridWidth) {
        break;
      }
      currentIndex -= gridWidth;
      break;
    case "ArrowDown":
      if (currentIndex > 71) {
        break;
      }
      currentIndex += gridWidth;
      break;
  }
  squares[currentIndex].classList.add("frog");
  checkWin();
  checkLose();
}

function checkWin() {
  if (squares[currentIndex].classList.contains("ending-block")) {
    resultDisplay.innerHTML = "YOU WON";
    stopGame();
    setTimeout(resetGame, 1000);
  }
}

function autoMoveElements() {
  timeLeft--;
  timeLeftDisplay.innerHTML = timeLeft;
  logsLeft.forEach((logLeft) => moveLogLeft(logLeft));
  logsRight.forEach((logRight) => moveLogRight(logRight));
  carsLeft.forEach((carLeft) => moveCarLeft(carLeft));
  carsRight.forEach((carRight) => moveCarRight(carRight));
  checkLose();
}

function moveLogLeft(logLeft) {
  switch (true) {
    case logLeft.classList.contains("l1"):
      logLeft.classList.remove("l1");
      logLeft.classList.add("l2");
      break;
    case logLeft.classList.contains("l2"):
      logLeft.classList.remove("l2");
      logLeft.classList.add("l3");
      break;
    case logLeft.classList.contains("l3"):
      logLeft.classList.remove("l3");
      logLeft.classList.add("l4");
      break;
    case logLeft.classList.contains("l4"):
      logLeft.classList.remove("l4");
      logLeft.classList.add("l5");
      break;
    case logLeft.classList.contains("l5"):
      logLeft.classList.remove("l5");
      logLeft.classList.add("l1");
      break;
  }
}

function moveLogRight(logRight) {
  switch (true) {
    case logRight.classList.contains("l5"):
      logRight.classList.remove("l5");
      logRight.classList.add("l4");
      break;
    case logRight.classList.contains("l4"):
      logRight.classList.remove("l4");
      logRight.classList.add("l3");
      break;
    case logRight.classList.contains("l3"):
      logRight.classList.remove("l3");
      logRight.classList.add("l2");
      break;
    case logRight.classList.contains("l2"):
      logRight.classList.remove("l2");
      logRight.classList.add("l1");
      break;
    case logRight.classList.contains("l1"):
      logRight.classList.remove("l1");
      logRight.classList.add("l5");
      break;
  }
}

function moveCarLeft(carLeft) {
  switch (true) {
    case carLeft.classList.contains("c1"):
      carLeft.classList.remove("c1");
      carLeft.classList.add("c2");
      break;
    case carLeft.classList.contains("c2"):
      carLeft.classList.remove("c2");
      carLeft.classList.add("c3");
      break;
    case carLeft.classList.contains("c3"):
      carLeft.classList.remove("c3");
      carLeft.classList.add("c1");
      break;
  }
}

function moveCarRight(carRight) {
  switch (true) {
    case carRight.classList.contains("c3"):
      carRight.classList.remove("c3");
      carRight.classList.add("c2");
      break;
    case carRight.classList.contains("c2"):
      carRight.classList.remove("c2");
      carRight.classList.add("c1");
      break;
    case carRight.classList.contains("c1"):
      carRight.classList.remove("c1");
      carRight.classList.add("c3");
      break;
  }
}

function stopGame() {
  document.removeEventListener("keydown", moveFrog);
  clearInterval(gameInterval);
  gameInProgress = false;
}

function checkLose() {
  if (
    squares[currentIndex].classList.contains("c1") ||
    squares[currentIndex].classList.contains("l4") ||
    squares[currentIndex].classList.contains("l5") ||
    timeLeft == 0
  ) {
    resultDisplay.innerHTML = "YOU LOSE";
    stopGame();
    setTimeout(resetGame, 1000);
  }

}

function startGame() {
  if (!gameInProgress) {
    stopGame();
    gameInterval = setInterval(autoMoveElements, 1000);
    document.addEventListener("keydown", moveFrog);
    gameInProgress = true;
  } else if (gameInProgress) {
    stopGame();
  }
}

function resetGame() {
  stopGame();
  timeLeft = 20;
  timeLeftDisplay.innerHTML = timeLeft;
  resultDisplay.innerHTML = 0;

  for (i = 0; i < squares.length; i++) {
    squares[i].classList.remove("frog");
  }
  currentIndex = startPosition;
}

startPauseButton.addEventListener("click", startGame);
resetButton.addEventListener("click", resetGame);
