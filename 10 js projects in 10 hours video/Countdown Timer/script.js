const allMonths = [
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

const months = document.querySelector('#months')
const days = document.querySelector('#days')
const hours = document.querySelector('#hours')
const minutes = document.querySelector('#minutes')
const seconds = document.querySelector('#seconds')
const deadline = document.querySelector('#deadline')
const items = document.querySelectorAll(".values-container .number");



let futureDate = new Date('March 10, 2024');
const futureTime = futureDate.getTime();

const year = futureDate.getFullYear();
const month = futureDate.getMonth();
const weekday = futureDate.getDay();
const day = futureDate.getDate();
const hour = futureDate.getHours();

deadline.innerHTML = `Countdown to our trip to Miami on ${allMonths[month]} ${day}, ${year}`


function getRemainingTime(){
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
}
getRemainingTime()
let countDown = setInterval(getRemainingTime, 1000)