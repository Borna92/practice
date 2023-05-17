const box = document.querySelector(".box");

document.addEventListener("mousemove", (e) => {
  let x = e.clientX;
  let y = e.clientY;
  box.style.left = x - 10 + "px";
  box.style.top = y - 10 +"px";
  console.log(x, y);
});
