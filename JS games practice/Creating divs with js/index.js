const grid = document.querySelector(".grid");
const test = document.querySelector("#testRows");
const button = document.querySelector("#go");
const clear = document.querySelector("#clear");
const size = document.querySelectorAll('.buttons')
const errorDisplay = document.querySelector("#errorMessage");
let tiles;
let t = document.querySelectorAll("div");

function drawGrid(n) {
  if(t.length + parseInt(n) > 50){
    clearGrid()
  }
  for (let i = 0; i < n; i++) {
    let tiles = document.querySelectorAll(".tile");
    t = document.querySelectorAll("div");
    let tile = document.createElement("div");
    tile.classList.add("tile");
    grid.append(tile);
  }
}

function clearGrid() {
  let tiles = document.querySelectorAll(".tile");
  tiles.forEach((tile) => {
    tile.remove();
  });
}

button.addEventListener("click", () => {
  t = document.querySelectorAll("div");
  if (t.length <= 50 && test.value <= 50) {
    drawGrid(test.value);
  } else {
    errorDisplay.innerHTML = "Select a number lower than  or equal to 50";
    clearGrid()
  }
});

clear.addEventListener("click", clearGrid);

size.forEach((button) => {
  button.addEventListener('click', () => {
    clearGrid()
    t = document.querySelectorAll("div");
    if(t.length < 50){
      drawGrid(button.id)
    } else {
      errorDisplay.innerHTML = "Select a number lower than  or equal to 50";
      clearGrid()
    }
  })
})


// setInterval(() => {
//   t = document.querySelectorAll("div")
//   console.log(t.length)
// }, 10)