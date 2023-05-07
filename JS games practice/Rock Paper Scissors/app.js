const computerChoiceDisplay = document.getElementById("computer-choice");
const userChoiceDisplay = document.getElementById("user-choice");
const resultDisplay = document.getElementById("result");
const possibleChoices = document.querySelectorAll("button");
let userChoice;
let computerChoice;
let result;

possibleChoices.forEach((possibleChoice) =>
  possibleChoice.addEventListener("click", (e) => {
    userChoice = e.target.id;
    userChoiceDisplay.innerHTML = userChoice;
    generateComputerChoice();
    getResult();
  })
);

function generateComputerChoice() {
  const randomNumber = Math.floor(Math.random() * possibleChoices.length);

  // if(randomNumber === 0){
  //     computerChoice = 'Rock'
  // }else if (randomNumber === 1){
  //     computerChoice = 'Paper'
  // }else {
  //     computerChoice = 'Scissors'
  // }

  switch (randomNumber) {
    case 0:
      computerChoice = "Rock";
      break;
    case 1:
      computerChoice = "Paper";
      break;
    case 2:
      computerChoice = "Scissors";
      break;
    default:
      break;
  }

  computerChoiceDisplay.innerText = computerChoice;
}

function getResult() {
  if (userChoice === computerChoice) {
    result = "Draw";
  } else if (userChoice == "Rock" && computerChoice == "Paper") {
    result = "Computer Wins";
  } else if (userChoice == "Rock" && computerChoice == "Scissors") {
    result = "User Wins";
  } else if (userChoice == "Paper" && computerChoice == "Rock") {
    result = "User Wins";
  } else if (userChoice == "Paper" && computerChoice == "Scissors") {
    result = "Computer Wins";
  } else if (userChoice == "Scissors" && computerChoice == "Rock") {
    result = "Computer Wins";
  } else if (userChoice == "Scissors" && computerChoice == "Paper") {
    result = "User Wins";
  }

  resultDisplay.innerText = result;
}
