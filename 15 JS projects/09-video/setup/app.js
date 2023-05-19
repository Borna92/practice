// MDN
// The DOMContentLoaded event fires when the initial HTML document has been completely loaded and parsed, without waiting for stylesheets, images, and subframes to finish loading.
// The load event is fired when the whole page has loaded, including all dependent resources such as stylesheets and images.


const btn = document.querySelector('.switch-btn')
const video = document.querySelector('.video-container')
const preloader = document.querySelector('.preloader')

btn.addEventListener('click', toggleVideo)

function toggleVideo(){
    if (video.paused){
        video.play()
        btn.classList.remove('slide')
        return
    }
    video.pause()
    btn.classList.add('slide')
}

window.addEventListener('load',() => {
    preloader.classList.add('hide-preloader')
})
