const quizData = [
  {
    question: "How old is Borna?",
    0: "10",
    1: "17",
    2: "30",
    3: "110",
    correct: 2,
  },
  {
    question: "What is the most used programming language in 2019?",
    0: "Python",
    1: "Java",
    2: "C",
    3: "JavaScript",
    correct: 1,
  },
  {
    question: "Who is the president of the US",
    0: "Florin Pop",
    1: "George Bush",
    2: "Donald Trump",
    3: "Joe Biden",
    correct: 3,
  },
  {
    question: "What does HTML stand for",
    0: "Hypertext Markup Language",
    1: "Cascading Style Sheets",
    2: "Jason Object Notation",
    3: "Helis, terminals, Motorboats, Lambos",
    correct: 0,
  },
  {
    question: "What year was JS launched?",
    0: "2020",
    1: "1995",
    2: "1994",
    3: "None of the above",
    correct: 1,
  },
];

const question = document.querySelector(".quiz-question");
const answers = document.querySelectorAll(".answers");
const btn = document.querySelector("button");
const alertDisplay = document.querySelector("#alert-message");
const radioButtons = document.querySelectorAll('input[type="radio"]');
const resultDisplay = document.querySelector(".result");

let selectedValue;
let counter = 0;
let score = 0;

showQuestions();

btn.addEventListener("click", () => {
    if (counter < quizData.length - 1) {
      checkAnswer();
      counter++;
      showQuestions();
    } else {
        checkAnswer();
        restartGame();
      }
  });

function checkAnswer() {
  radioButtons.forEach((radioButton) => {
    if (radioButton.checked) {
      selectedValue = radioButton.value;
    }
    radioButton.checked = false
  });

  if (selectedValue === quizData[counter].correct.toString()) {
    score++;
  }
  resultDisplay.innerHTML = `Points: ${score} / ${quizData.length}`;
}

function showQuestions() {
  question.innerHTML = `${counter+1}. ${quizData[counter].question}`;
  answers.forEach((answer, index) => {
    answer.innerHTML = quizData[counter][index];
  });
}

function restartGame() {
    btn.disabled = true;
    resultDisplay.innerHTML = `Your final score is: ${score} / ${quizData.length}`;
    setTimeout(()=> {
        counter = 0;
        score = 0;
        resultDisplay.innerHTML = `Points: ${score} / ${quizData.length}`;
        showQuestions();
        btn.disabled = false;
    }, 2000)
 
}
