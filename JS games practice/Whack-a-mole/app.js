const squares = document.querySelectorAll(".square");
const mole = document.querySelector(".mole");
const score = document.querySelector("#score");
let timeLeft = document.querySelector("#time-left");
const start = document.querySelector("#start");
const reset = document.querySelector("#stop");
const increaseTimer = document.querySelector("#plus");
const decreaseTimer = document.querySelector("#minus");
const hit = new Audio('sounds/whack.mp3');

let result = 0;
let hitPosition;
const defaultTime = 60;
let currentTime = document.getElementById("time-left").textContent;

function randomSquare() {
  let active = Math.floor(Math.random() * squares.length);
  squares.forEach((square) => {
    square.classList.remove("mole");
  });
  squares[active].classList.add("mole");
  hitPosition = squares[active].id;
}

// function moveMole(){
//     let timerID = null
//     timerID = setInterval(randomSquare, 1000)
// }

function countDown() {
  currentTime--;
  timeLeft.innerHTML = currentTime;
  if (currentTime === 0) {
    clearInterval(countdownInterval);
    clearInterval(gameInterval);
    alert("Time is up! Your final score is " + result);
  }
}

function game() {
  gameInterval = setInterval(randomSquare, 1000);
  countdownInterval = setInterval(countDown, 1000);
}

squares.forEach((square) => {
  square.addEventListener("click", () => {
    if (square.id == hitPosition) {
      result++;
      hit.play()
      score.textContent = result;
      hitPosition = null;
    }
  });
});

function timeIncrease() {
  currentTime++;
  timeLeft.innerHTML = currentTime;
}

function timeDecrease() {
  currentTime--;
  timeLeft.innerHTML = currentTime;
}

function resetGame() {
  clearInterval(gameInterval);
  clearInterval(countdownInterval);
  result = 0;
  score.textContent = result;
  timeLeft.innerHTML = defaultTime;
  currentTime = defaultTime;
  squares.forEach((square) => {
    square.classList.remove("mole");
  });
}

increaseTimer.addEventListener("click", timeIncrease);
decreaseTimer.addEventListener("click", timeDecrease);

start.addEventListener("click", game);
reset.addEventListener("click", resetGame);
