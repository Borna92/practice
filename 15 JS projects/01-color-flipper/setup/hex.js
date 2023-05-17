const hex = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, "A", "B", "C", "D", "E", "F"];
const colorDisplay = document.querySelector('.color')
const btn = document.querySelector('#btn')

btn.addEventListener('click', () => {
    let randColor = '#'

    for(let i = 0; i < 6; i++){
        randColor += hex[Math.floor((Math.random()* hex.length))]
    }
    document.body.style.backgroundColor = randColor
    colorDisplay.innerHTML = randColor
})


