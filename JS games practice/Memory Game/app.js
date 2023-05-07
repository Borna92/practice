const cardArray = [
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    },
    {
        name: 'fries',
        img: 'images/fries.png'
    },
    {
        name: 'cheeseburger',
        img: 'images/cheeseburger.png'
    },
    {
        name: 'hotdog',
        img: 'images/hotdog.png'
    },
    {
        name: 'ice-cream',
        img: 'images/ice-cream.png'
    },
    {
        name: 'milkshake',
        img: 'images/milkshake.png'
    },
    {
        name: 'pizza',
        img: 'images/pizza.png'
    }
]

cardArray.sort(() => 0.5 - Math.random())

const gridDisplay = document.querySelector('#grid')
let cardsChosen = []
let cardsChosenIds = []
let cardsWon = []
const scoreDisplay = document.getElementById('result')
let attemptDisplay = document.getElementById('attempts')
let attempt = 0

function createBoard () {
    for (let i = 0; i < 12; i++){
        const card = document.createElement('img')
        card.setAttribute('src', 'images/blank.png')
        card.setAttribute('data-id', i)
        card.addEventListener('click', flipCard)
        gridDisplay.append(card)
    }
}

createBoard()

function checkMatch(){
    const cards = document.querySelectorAll('img')
    const optionOneId = cardsChosenIds[0]
    const optionTwoId = cardsChosenIds[1]
    const optionThreeId = cardsChosenIds[2]
    const optionFourId = cardsChosenIds[3]
    
    if (optionOneId === optionTwoId){
        alert('You have clicked the same image')
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        attempt ++
    } else if (cardsChosen[0] == cardsChosen[1]){
        alert("Match")
        cards[optionOneId].setAttribute('src', 'images/white.png')
        cards[optionTwoId].setAttribute('src', 'images/white.png')
        cards[optionOneId].removeEventListener('click', flipCard)
        cards[optionTwoId].removeEventListener('click', flipCard)
        cardsWon.push(cardsChosen)
        attempt ++
    } else {
        cards[optionOneId].setAttribute('src', 'images/blank.png')
        cards[optionTwoId].setAttribute('src', 'images/blank.png')
        alert("Try Again")
        attempt ++
    }
    cardsChosen = []
    cardsChosenIds = []
    attemptDisplay.innerHTML = attempt
    scoreDisplay.innerHTML = cardsWon.length
    console.log(attempt)

    if (cardsWon.length == cardArray.length/2){
        scoreDisplay.innerHTML = 'Congratulations, you found them all'
    }

}

function flipCard(){
    const cardId = this.getAttribute('data-id')
    if (cardsChosenIds.length < 2 && !cardsChosenIds.includes(cardId)) {
        cardsChosen.push(cardArray[cardId].name)
        cardsChosenIds.push(cardId)
        this.setAttribute('src', cardArray[cardId].img)
    }
    
    if (cardsChosenIds.length === 2){
        gridDisplay.classList.add('disabled')
        setTimeout(checkMatch, 500)
    }

}