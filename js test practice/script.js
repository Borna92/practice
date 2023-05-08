const randomize = document.querySelector('#randomize')
const reset = document.querySelector('#reset')
const display = document.querySelector('.container')
let placeholder = document.createElement('img')
const fries =  document.querySelector('#fries')
const cheeseburger =  document.querySelector('#cheeseburger')
const hotdog =  document.querySelector('#hotdog')
const iceCream =  document.querySelector('#ice-cream')
const milkshake =  document.querySelector('#milkshake')
const pizza =  document.querySelector('#pizza')
const blank =  document.querySelector('#blank')
let choiceDisplay = document.querySelector('.choice')
let resultDisplay = document.querySelector('.result')
let displayed
let id

const images = [{ image: '../JS games practice/Memory Game/images/fries.png', name : 'fries'},
{ image: '../JS games practice/Memory Game/images/cheeseburger.png', name : 'cheeseburger'},
{ image: '../JS games practice/Memory Game/images/hotdog.png', name : 'hotdog'},
{ image: '../JS games practice/Memory Game/images/ice-cream.png', name : 'ice-cream'},
{ image: '../JS games practice/Memory Game/images/milkshake.png', name : 'milkshake'},
{ image: '../JS games practice/Memory Game/images/pizza.png', name : 'pizza'},
{ image: '../JS games practice/Memory Game/images/blank.png', name : 'blank'}]

fries.addEventListener('click', choice)
cheeseburger.addEventListener('click', choice)
hotdog.addEventListener('click', choice)
iceCream.addEventListener('click', choice)
milkshake.addEventListener('click', choice)
pizza.addEventListener('click', choice)
blank.addEventListener('click', choice)

randomize.addEventListener('click', () => {showImage(), setTimeout(compare, 500)})
reset.addEventListener('click', resetFunction)

function showImage(){
    let id = Math.floor(Math.random() * images.length)
    placeholder.setAttribute('src', images[id].image)
    display.append(placeholder)
    displayed = images[id].name
}

function resetFunction(){
    placeholder.remove()
    choiceDisplay.remove()
}

function choice(){
    id = this.getAttribute('id')
    console.log(id)
    choiceDisplay.innerHTML = id
}

function compare(){
    if (displayed === id){
        resultDisplay.innerHTML = 'Success'
    } else {
        resultDisplay.innerHTML = 'Try Again'
    }
}