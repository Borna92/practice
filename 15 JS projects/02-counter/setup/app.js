const btn = document.querySelectorAll('.btn')
const countDisplay = document.querySelector('#value')

let count = 0;

btn.forEach((button) => {
    button.addEventListener('click', doOperation)
})

function doOperation() {
    if (this.classList.contains('increase')){
        count++
    } else if (this.classList.contains('decrease')){
        count --
    } else {
        count = 0
    }
    countDisplay.innerHTML = count
}