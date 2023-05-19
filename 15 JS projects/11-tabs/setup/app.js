// const buttons = document.querySelectorAll('.tab-btn')
// const history = document.querySelector('#history-article')
// const vision = document.querySelector('#vision-article')
// const goals = document.querySelector('#goals-article')

// buttons.forEach((button) => {
//     button.addEventListener('click', selectArticle)
// })

// function selectArticle(){
//     buttons.forEach((button) => {
//         button.classList.remove('active')
//     })
//     this.classList.add('active')
//     if(this.id === 'history'){
//         removeActive()
//         history.classList.add('active')
//     } else if(this.id === 'vision'){
//         removeActive()
//         vision.classList.add('active')
//     } else if(this.id === 'goals'){
//         removeActive()
//         goals.classList.add('active')
//     }

// }

// function removeActive(){
//     history.classList.remove('active')
//     vision.classList.remove('active')
//     goals.classList.remove('active')
// }

const btns = document.querySelectorAll(".tab-btn");
const about = document.querySelector(".about");
const articles = document.querySelectorAll(".content");

about.addEventListener("click", (e) => {
  const id = e.target.dataset.id;
  if (id) {
    btns.forEach((btn) => {
      btn.classList.remove("active");
      e.target.classList.add("active");
    });

    articles.forEach((article) => {
      article.classList.remove("active");
    });
    let clickedArticle = document.getElementById(id);
    clickedArticle.classList.add("active");
  }
});
