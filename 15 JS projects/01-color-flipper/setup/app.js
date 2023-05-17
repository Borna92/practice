const colors = ["green", "red", "rgba(133,122,200)", "#f15025"];

const button = document.querySelector('#btn')
const colorDisplay = document.querySelector('.color')


button.addEventListener('click', () => {
    let randomNum = Math.floor(Math.random() * colors.length)
    document.body.style.backgroundColor = colors[randomNum]
    colorDisplay.innerHTML = colors[randomNum]
})