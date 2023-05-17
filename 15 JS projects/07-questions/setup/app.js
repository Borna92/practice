//using selectors inside the element
// traversing the dom

const questions = document.querySelectorAll(".question");
const buttons = document.querySelectorAll("button");

// buttons.forEach(button => {
//     button.addEventListener('click', toggleText)

// })

// function toggleText(){
//     this.parentNode.parentNode.classList.toggle('show-text')
// }

questions.forEach((question) => {
  let button = question.querySelector("button");
  button.addEventListener("click", () => {

    questions.forEach(item => {
        if(item !== question)
        item.classList.remove('show-text')
    })
    question.classList.toggle("show-text");
  });
});
