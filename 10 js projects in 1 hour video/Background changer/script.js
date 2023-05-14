const button = document.querySelector('#btn')

button.addEventListener('click', () => {
  document.body.style.background = randomBg()
  console.log(randomBg())
})

function randomBg(){
  return `hsl(${Math.floor(Math.random() * 360)}, 100%, 50%)`
}