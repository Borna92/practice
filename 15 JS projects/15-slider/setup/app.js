const slides = document.querySelectorAll(".slide");
const nextbtn = document.querySelector(".nextBtn");
const prevbtn = document.querySelector(".prevBtn");

slides.forEach((slide, index) => {
  slide.style.left = `${index * 100}%`;
});

let counter = 0;

nextbtn.addEventListener("click", () => {
    counter++;
    moveItems();
});

prevbtn.addEventListener("click", () => {
  counter--;
  moveItems();
});

function moveItems() {
    if (counter === slides.length){
        counter = 0 }
    if (counter < 0) {
        counter = slides.length -1
    }
  slides.forEach((slide) => {
    slide.style.transform = `translateX(-${counter * 100}%)`;
  });
  console.log(counter)
}
