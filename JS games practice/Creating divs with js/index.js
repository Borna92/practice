const grid = document.querySelector(".grid");
const test = document.querySelector("#testRows");
const button = document.querySelector("#go");
const clear = document.querySelector("#clear");
const errorDisplay = document.querySelector("#errorMessage");
let tiles;
let t;

function drawGrid() {
  for (let i = 0; i < test.value; i++) {
    let tiles = document.querySelectorAll(".tile");
    let t = document.querySelectorAll("div");
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
  let t = document.querySelectorAll("div");
  if (t.length <= 50 && test.value <= 50) {
    drawGrid();
  } else {
    errorDisplay.innerHTML = "Select a number lower than  or equal to 50";
    clearGrid()
  }
});

clear.addEventListener("click", clearGrid);
