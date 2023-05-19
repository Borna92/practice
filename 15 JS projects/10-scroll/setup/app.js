// Element.getBoundingClientRect() method returns the size of an element and its position relative to the viewport.
// pageYOffset is a read - only window property that returns the number of pixels the document has been scrolled vertically.
// slice extracts a section of a string without modifying original string
//offsetTop - A Number, representing the top position of the element, in pixels

// ********** set date ************

const date = document.querySelector("#date");
date.innerHTML = new Date().getFullYear();

// ********** close links ************

const navToggle = document.querySelector(".nav-toggle");
const linksContainer = document.querySelector(".links-container");
const links = document.querySelector(".links");
const navBar = document.querySelector("#nav");
const topLink = document.querySelector(".top-link");
const navHeight = navBar.getBoundingClientRect().height;

navToggle.addEventListener("click", () => {
  const linksHeight = links.getBoundingClientRect().height;
  if (linksContainer.getBoundingClientRect().height === 0) {
    linksContainer.style.height = linksHeight + "px";
  } else {
    linksContainer.style.height = 0;
  }
});

// ********** fixed navbar ************

window.addEventListener("scroll", () => {
  if (scrollY > navHeight) {
    navBar.classList.add("fixed-nav");
    topLink.classList.add("show-link");
  } else {
    navBar.classList.remove("fixed-nav");
    topLink.classList.remove("show-link");
  }
});

// ********** smooth scroll ************
// select links

const scrollLinks = document.querySelectorAll(".scroll-link");

scrollLinks.forEach((link) => {
  link.addEventListener("click", (btn) => {
    btn.preventDefault();
    const id = btn.currentTarget.getAttribute("href");
    const element = document.querySelector(id);
    const containerHeight = linksContainer.getBoundingClientRect().height
    const fixedNav = navBar.classList.contains('fixed-nav')
    let position = element.offsetTop - navHeight

    if(!fixedNav){
        position = position - navHeight
    }
    if (navHeight > 82){
        position = position + containerHeight
    }

    window.scrollTo({ left: 0, top: position });
    linksContainer.style.height = 0;
  });
});
