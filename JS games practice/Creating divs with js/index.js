const grid = document.querySelector(".grid");
const userInput = document.querySelector("#testRows");
const button = document.querySelector("#go");
const clear = document.querySelector("#clear");
const size = document.querySelectorAll(".buttons");
const errorDisplay = document.querySelector("#errorMessage");
const randomNumberDisplay = document.querySelector('#random-number')
const attemptsDisplay = document.querySelector('#number-of-attempts')
let array = []
let randomized;
let attempts = 1


function drawGrid(n) {
  randomized = Math.floor(Math.random()*n)
  randomNumberDisplay.innerHTML = randomized
  attemptsDisplay.innerHTML = 0
  array = []
  clearGrid();
  let t = document.querySelectorAll(".grid div");
  if (t.length + parseInt(n) > 50) {
    errorDisplay.innerHTML = "Select a number lower than  or equal to 50";
    clearGrid();
  } else {
  for (let i = 0; i < n; i++) {
    let tile = document.createElement("div");
    tile.classList.add("tile");
    tile.setAttribute('id', i);
    tile.addEventListener('click', flip)
    array.push(tile)
  }}
  array.sort(() => 0.5 - Math.random())
  array.forEach((item) => grid.append(item))
}


function flip (){
  this.innerHTML = this.id
  attemptsDisplay.innerHTML = attempts
  attempts++
  if(randomized == this.id){
    this.classList.add('selected')
    userInput.value = ''
    clearGrid()
  } else if (randomized != this.id){
    this.classList.add('incorrect')
  }
}

function clearGrid() {
  let tiles = document.querySelectorAll(".tile");
  arr = []
  attempts = 1
  setTimeout(() => {errorDisplay.innerHTML = ''},2000)
  tiles.forEach((tile) => {
    tile.removeEventListener('click', flip);
    tile.classList.remove('selected')
    tile.innerHTML = ''
    tile.remove()
  });
}

button.addEventListener('click', () => {drawGrid(userInput.value)})

// button.addEventListener("click", () => {
//   t = document.querySelectorAll("div");
//   if (t.length <= 50 && test.value <= 50) {
//     drawGrid(test.value);
//   } else {
//     errorDisplay.innerHTML = "Select a number lower than  or equal to 50";
//     clearGrid();
//   }
// });

clear.addEventListener("click", clearGrid);

// size.forEach((button) => {
//   button.addEventListener('click', () => {
//     clearGrid()
//     t = document.querySelectorAll("div");
//     if(t.length < 50){
//       drawGrid(button.id)
//     } else {
//       errorDisplay.innerHTML = "Select a number lower than  or equal to 50";
//       clearGrid()
//     }
//   })
// })

size.forEach((button) => {
  button.addEventListener("click", () => {
    clearGrid();
    array = []
    drawGrid(button.id);
  });
});

// setInterval(() => {
//   t = document.querySelectorAll("div")
//   console.log(t.length)
// }, 10)
