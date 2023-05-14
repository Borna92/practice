const open = document.querySelector('#open')
const close = document.querySelector('#close')
const container = document.querySelector('.popup-container')

function displayPopup(){
  container.classList.add('active')
}

function closePopup(){
  container.classList.remove('active')
}

open.addEventListener('click', displayPopup)
close.addEventListener('click', closePopup)