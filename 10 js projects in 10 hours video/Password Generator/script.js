const pw = document.getElementById("pw");
const copy = document.getElementById("copy");
const len = document.getElementById("len");
const upper = document.getElementById("upper");
const lower = document.getElementById("lower");
const number = document.getElementById("number");
const symbol = document.getElementById("symbol");
const all = document.getElementById("all");
const generate = document.getElementById("generate-btn");

const upperLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const lowerLetters = "abcdefghijklmnopqrstuvwxyz";
const numbers = "0123456789";
const symbols = "!@#$%^&*()_+=";

const errorMsg = "The password needs to be between 4 and 40 characters";
const successMsg = "Password copied to clipboard!"

all.addEventListener("change", () => {
  upper.checked = !upper.checked;
  lower.checked = !lower.checked;
  number.checked = !number.checked;
  symbol.checked = !symbol.checked;
});

function getRandomPassword() {
  let password = "";
  let string = "";

  if (len.value >= 4 && len.value <= 40) {
    if (upper.checked) {
      string += upperLetters;
    }

    if (lower.checked) {
      string += lowerLetters;
    }

    if (number.checked) {
      string += numbers;
    }

    if (symbol.checked) {
      string += symbols;
    }

    for (let i = 0; i < len.value; i++) {
      let randomNum = Math.floor(Math.random() * string.length);
      password += string[randomNum];
    }
    pw.innerHTML = password;
  } else {
    pw.innerHTML = errorMsg;
    copy.removeEventListener("click", clipboard);
  }
}

generate.addEventListener("click", getRandomPassword);

const clipboard = copy.addEventListener("click", () => {
  const pass = pw.innerHTML;

  if (pass != errorMsg && pass != "" && pass != successMsg) {
    navigator.clipboard.writeText(pass).then(() => {
      pw.innerHTML = successMsg;
    });
  }
});
