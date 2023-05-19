const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];
const weekdays = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

const deadline = document.querySelector(".deadline");
const giveaway = document.querySelector(".giveaway");
const items = document.querySelectorAll(".deadline-format h4");

let futureDate = new Date(2024, 4, 19, 11, 41, 55);

console.log(futureDate);

const year = futureDate.getFullYear();
const month = futureDate.getMonth();
const weekday = futureDate.getDay();
const day = futureDate.getDate();
const hour = futureDate.getHours();

giveaway.innerHTML = `Giveaway ends on: ${weekdays[weekday]}, ${months[month]} ${day}th ${year}, ${hour}AM`;

const futureTime = futureDate.getTime();

function getRemainingTime() {
  const today = new Date().getTime();
  const t = futureTime - today;

  const oneDay = 24 * 60 * 60 * 1000;
  const oneHour = 60 * 60 * 1000;
  const oneMinute = 60 * 1000;

  let days = t / oneDay;
  days = Math.floor(days);
  let hours = Math.floor((t % oneDay) / oneHour);
  let minutes = Math.floor((t % oneHour) / oneMinute);
  let seconds = Math.floor((t % oneMinute) / 1000);

  const values = [days, hours, minutes, seconds];

  items.forEach((item, index) => {
    if (values[index] < 10){
      item.innerHTML = `0${values[index]}`
    } else {
      item.innerHTML = values[index]
    }
    
  })

  if (t <= 0){
    clearInterval(countDown);
    deadline.innerHTML = `<h4 class='exipred'>This Giveaway has expired</h4>`;
  }
  
  // for (let i = 0; i < items.length; i++){
  //   items[i].innerHTML = values[i]
  // }
}

let countDown = setInterval(getRemainingTime, 1000)

