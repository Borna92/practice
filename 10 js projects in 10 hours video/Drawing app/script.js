const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");


let size = 3;
let isPressed = false


canvas.addEventListener("mousedown", () => {
  isPressed = true;
});

canvas.addEventListener("mouseup", () => {
  isPressed = false;
});

canvas.addEventListener("mousemove", (e) => {
  if (isPressed) {
    drawCircle(e.offsetX, e.offsetY);
  }
});

function drawCircle(x, y) {
  ctx.beginPath();
  ctx.arc(x, y, size, 0, Math.PI * 2);
  ctx.fill();
}

// function draw() {
//   ctx.clearRect(0, 0, canvas.width, canvas.height);
//   drawCircle(x, y);
//   requestAnimationFrame(draw);
// }

// draw();
