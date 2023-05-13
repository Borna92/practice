const grid = document.querySelector(".grid");
const resultDisplay = document.querySelector(".result");
const scoreDisplay = document.querySelector(".score");
const missilesDisplay = document.querySelector(".missiles");
const accuracyDisplay = document.querySelector(".accuracy");
const startButton = document.querySelector(".start");
const resetButton = document.querySelector(".reset");
let alienInvaders = [];
let currentShooterIndex = Math.floor(Math.random() * (209 - 195) + 195);
const width = 15;
let direction = 1;
let invadersId;
let score = 0;
let missiles = 0;
let accuracy;
let gameRunning = false;
let canShoot = true;
accuracyDisplay.innerHTML = "100 %";

for (let i = 0; i < 225; i++) {
  if ((i >= 0 && i <= 9) || (i >= 15 && i <= 24) || (i >= 30 && i <= 39)) {
    alienInvaders.push(i);
  }
  const square = document.createElement("div");
  grid.append(square);
}

const squares = Array.from(document.querySelectorAll(".grid div"));

// function draw(){
//  for (let i=0; i < alienInvaders.length; i++){
//     squares[alienInvaders[i]].classList.add('invader')
//  }
// }

function drawInvader() {
  alienInvaders.forEach((invader) => squares[invader].classList.add("invader"));
}

function removeInvader() {
  alienInvaders.forEach((invader) =>
    squares[invader].classList.remove("invader")
  );
}

// function resetGame(){
//     alienInvaders = []
//     for (let i = 0; i < 225; i++) {
//         if ((i >= 0 && i <= 9) || (i >= 15 && i <= 24) || (i >= 30 && i <= 39)) {
//           alienInvaders.push(i);
//         }
//         const square = document.createElement("div");
//         grid.append(square);
//       }
// }

drawInvader();

squares[currentShooterIndex].classList.add("shooter");

function moveShooter(e) {
  squares[currentShooterIndex].removeAttribute("class");
  switch (e.key) {
    case "ArrowLeft":
      if (currentShooterIndex % width != 0) currentShooterIndex -= 1;
      break;
    case "ArrowRight":
      if (currentShooterIndex % width < width - 1) currentShooterIndex += 1;
      break;
  }
  squares[currentShooterIndex].classList.add("shooter");
}

function moveInvaders() {
  const leftEdge = alienInvaders[0] % width === 0;
  const rightEdge =
    alienInvaders[alienInvaders.length - 1] % width === width - 1;
  removeInvader();

  if (rightEdge && direction > 0) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width + 1;
      direction = -1;
    }
  }

  if (leftEdge && direction < 0) {
    for (let i = 0; i < alienInvaders.length; i++) {
      alienInvaders[i] += width - 1;
      direction = 1;
    }
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    alienInvaders[i] += direction;
  }

  drawInvader();

  if (squares[currentShooterIndex].classList.contains("invader", "shooter")) {
    resultDisplay.innerHTML = "Game Over";
    clearInterval(invadersId);
  } else if (alienInvaders.length === 0) {
    resultDisplay.innerHTML = "Congratulations, you WIN!";
    clearInterval(invadersId);
    gameRunning = false;
  }

  for (let i = 0; i < alienInvaders.length; i++) {
    if (alienInvaders[i] > squares.length) {
      resultDisplay.innerHTML = "Game Over";
      clearInterval(invadersId);
      gameRunning = false;
    }
  }
}

function updateAccuracy() {
  accuracy = Math.round((score / missiles) * 100) / 100;
  if (accuracy === 1) {
    accuracyDisplay.innerHTML = "100 %";
  } else {
    accuracyDisplay.innerHTML = accuracy + " %";
  }
}

function startGame() {
  if (!gameRunning) {
    invadersId = setInterval(moveInvaders, 500);
    gameRunning = true;
    document.addEventListener("keydown", shoot);
    document.addEventListener("keydown", moveShooter);
  }
}

startButton.addEventListener("click", startGame);
// resetButton.addEventListener("click", resetGame);

function shoot(e) {
  if (gameRunning && canShoot) {
    let laserId;
    let currentLaserIndex = currentShooterIndex;
    function moveLaser() {
      if (currentLaserIndex >= 15) {
        squares[currentLaserIndex].classList.remove("laser");
        currentLaserIndex -= width;
        squares[currentLaserIndex].classList.add("laser");
        if (squares[currentLaserIndex].classList.contains("invader")) {
          squares[currentLaserIndex].classList.remove("invader", "laser");
          squares[currentLaserIndex].classList.add("boom");
          clearInterval(laserId);

          setTimeout(
            () => squares[currentLaserIndex].classList.remove("boom"),
            100
          );

          const alienRemoval = alienInvaders.indexOf(currentLaserIndex);
          alienInvaders.splice(alienRemoval, 1);
          score++;
          updateAccuracy();
          scoreDisplay.innerHTML = score;
        } else if (currentLaserIndex < 15) {
          squares[currentLaserIndex].classList.remove("laser");
          updateAccuracy();
        }
      }
    }

    switch (e.key) {
      case " ":
        canShoot = false;
        laserId = setInterval(moveLaser, 100);
        missiles++;
        missilesDisplay.innerHTML = missiles;
        setTimeout(() => canShoot = true, 300);
        break;
    }
  }
}
