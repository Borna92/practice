const APIURL = "https://api.github.com/users/";
const form = document.querySelector("#form");
const input = document.querySelector("input");
const mainDisplay = document.querySelector("main");

async function getUser(user) {
  const resp = await fetch(APIURL + user);
  const respData = await resp.json();
  console.log(respData);
  if (respData.message != "Not Found") {
    createUserCard(respData);
    getRepos(user);
  } else {
    displayErrorMessage();
  }
}

async function getRepos(user) {
  const resp = await fetch(APIURL + user + "/repos");
  const respData = await resp.json();

  addReposToCard(respData);
}

function addReposToCard(data) {
  const reposEl = document.querySelector("#repos");

  data.forEach((repo) => {
    const repoEl = document.createElement("a");
    repoEl.classList.add("repo");

    repoEl.href = repo.html_url;
    repoEl.target = '_blank';
    repoEl.innerText = repo.name;

    reposEl.append(repoEl);
  });
}

function createUserCard(user) {
  const container = document.createElement("div");
  container.classList.add("container");
  container.innerHTML = `    
    <img
      id="profile-pic"
      src="${checkForText(user.avatar_url)}"
      alt="${checkForText(user.name)}"
    />
    <div class='bio-repo-container'>
    <div class="bio">
        <h2 class="bio-text">${checkForText(user.name)}</h2>
        <h4 class="bio-text">${checkForText(user.bio)}</h4>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Perspiciatis error nihil optio quod ab assumenda laudantium adipisci inventore, cumque animi hic illum, dignissimos ullam, perferendis earum.</p>

      <div class="stats-container">
        <div class="stats">
          <i class="fa-solid fa-eye"></i><span id="followers">${
            user.following
          }</span>
        </div>
        <div class="stats">
          <i class="fa-solid fa-heart"></i><span id="following">${
            user.followers
          }</span>
        </div>
        <div class="stats">
          <i class="fa-solid fa-message"></i><span id="repos-count">${
            user.public_repos
          }</span>
        </div>
      </div>
    </div>
    <div class='repo-container'</div>
    <h4>Repos:</h4>
    <div id='repos'>
    </div></div></div>`;

  mainDisplay.innerHTML = "";

  mainDisplay.append(container);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (input.value) {
    getUser(input.value);
  }
  input.value = "";
});

function displayErrorMessage() {
  mainDisplay.innerHTML = "";
  const container = document.createElement("div");
  container.classList.add("container");
  container.innerHTML = `
  <div class="bio">
            <p>User Not Found</p>
        </div>`;

  mainDisplay.append(container);
}

function checkForText(text) {
  if (text) {
    return text;
  } else {
    return "Not Found";
  }
}
