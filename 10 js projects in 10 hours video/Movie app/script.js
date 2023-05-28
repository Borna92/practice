const APIURL =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=04c35731a5ee918f014970082a0088b1&page=";
const IMGPATH = "https://image.tmdb.org/t/p/w1280";
const SEARCHAPI =
  "https://api.themoviedb.org/3/search/movie?&api_key=04c35731a5ee918f014970082a0088b1&query=";
const mainDisplay = document.querySelector("main");
const yearDisplay = document.querySelector(".year");
const form = document.querySelector("form");
const search = document.querySelector("#search");
const minusBtn = document.querySelector(".minus");
const plusBtn = document.querySelector(".plus");
const currPage = document.querySelector(".page");
const fav = document.querySelector("#fav");

let pageCounter = 1;

fav.addEventListener("click", displayFavorites);

const year = new Date().getFullYear();
yearDisplay.innerHTML = `Movies ${year}`;

getMovies(APIURL + pageCounter);

async function getMovies(value) {
  const resp = await fetch(value);
  const respData = await resp.json();
  console.log(respData.results);
  displayMovies(respData.results);

  return respData;
}

function displayMovies(data) {
  mainDisplay.innerHTML = "";

  data.forEach((movie) => {
    const { poster_path, vote_average, title, overview, release_date } = movie;

    const content = document.createElement("div");
    content.classList.add("movie");
    content.innerHTML = `
        <img
          src="${IMGPATH + poster_path}"
          alt=""
        />
        <i class="favorite ${checkIfMovieInLS(movie)} fa-heart"></i>
        <div class="movie-info">
          <h3>${title}</h3>
          <span class='${getClassByRate(vote_average)}'>${Number(
      vote_average
    ).toFixed(1)} <i class="fa-solid fa-star"></i></span>
        </div>
        <div class='overview'>
        <h4>Overview:</h4>
        ${overview}
        <h5>Release Date: ${release_date}</h5>
        </div>
        </div>
      `;
    mainDisplay.append(content);
  });

  const buttons = mainDisplay.querySelectorAll(".favorite");

  buttons.forEach((button) => {
    button.addEventListener("click", (e) => {
      const movieElement = e.target.parentNode;
      const posterPath = movieElement.querySelector("img").getAttribute("src");
      const voteAverage = movieElement
        .querySelector(".movie-info span")
        .textContent.trim();
      const title = movieElement.querySelector(".movie-info h3").textContent;

      if (button.classList.contains("fa-regular")) {
        updateLS(posterPath, voteAverage, title);
        button.classList.toggle("fa-regular");
        button.classList.toggle("fa-solid");
      } else if (button.classList.contains("fa-solid")) {
        removeMovieFromLS(posterPath, voteAverage, title);
        button.classList.toggle("fa-regular");
        button.classList.toggle("fa-solid");
      }

      // button.classList.toggle("fa-regular");
      // button.classList.toggle("fa-solid");

      // updateLS(posterPath, voteAverage, title);
    });
  });
}

function getClassByRate(score) {
  if (score < 5) {
    return "red";
  } else if (score < 8) {
    return "yellow";
  } else {
    return "green";
  }
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const searchTerm = search.value;

  if (searchTerm) {
    getMovies(SEARCHAPI + searchTerm);
    search.value = "";
  }
});

minusBtn.addEventListener("click", () => {
  if (pageCounter >= 1) {
    pageCounter--;
    getMovies(APIURL + pageCounter);
    currPage.innerHTML = pageCounter;
  }
});

plusBtn.addEventListener("click", () => {
  pageCounter++;
  getMovies(APIURL + pageCounter);
  currPage.innerHTML = pageCounter;
});

function updateLS(image, vote, title) {
  const moviesInLS = JSON.parse(localStorage.getItem("movies")) || [];

  const existingMovie = moviesInLS.find(
    (movie) =>
      movie.poster_path === image &&
      movie.vote_average === vote &&
      movie.title === title
  );

  if (!existingMovie) {
    const newMovie = {
      poster_path: image,
      vote_average: vote,
      title: title,
    };

    moviesInLS.push(newMovie);
    localStorage.setItem("movies", JSON.stringify(moviesInLS));
  }
}

function displayFavorites() {
  const moviesInLS = JSON.parse(localStorage.getItem("movies"));
  if (moviesInLS) {
    displayMovies(moviesInLS);
  }
  const allMovies = document.querySelectorAll(".movie");

  allMovies.forEach((movie) => {
    const deleteBtn = document.createElement("i");
    const favBtn = movie.querySelector(".favorite");
    deleteBtn.classList.add("delete", "fa-solid", "fa-trash-can");
    movie.append(deleteBtn);
    movie.removeChild(favBtn);
    deleteBtn.addEventListener("click", () => {
      console.log(mainDisplay);
      movie.remove();
      const posterPath = movie.querySelector("img").getAttribute("src");
      const voteAverage = movie
        .querySelector(".movie-info span")
        .textContent.trim();
      const title = movie.querySelector(".movie-info h3").textContent;

      removeMovieFromLS(posterPath, voteAverage, title);
    });
  });
}

function removeMovieFromLS(image, vote, title) {
  const moviesInLS = JSON.parse(localStorage.getItem("movies"));
  if (moviesInLS) {
    const updatedMovies = moviesInLS.filter((movie) => {
      return (
        movie.poster_path !== image &&
        movie.vote_average !== vote &&
        movie.title !== title
      );
    });
    localStorage.setItem("movies", JSON.stringify(updatedMovies));
  }
}

function checkIfMovieInLS(movie) {
  const moviesInLS = JSON.parse(localStorage.getItem("movies"));

  for (const item of moviesInLS) {
    if (movie.title === item.title) {
      return "fa-solid";
    }
  }

  return "fa-regular";
}
