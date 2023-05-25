const meals = document.getElementById("meals");
const favMeals = document.querySelector(".fav-meals");
const nextBtn = document.querySelector(".next-btn");

const searchTerm = document.querySelector("#search-term");
const searchBtn = document.querySelector("#search");

getRandomMeal();
fetchFavoriteMeals();

nextBtn.addEventListener("click", () => {
  meals.innerHTML = "";
  getRandomMeal();
});

async function getRandomMeal() {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/random.php"
  );
  const responseData = await resp.json();
  const randomMeal = responseData.meals[0];
  addMeal(randomMeal, true);
}

async function getMealById(id) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/lookup.php?i=" + id
  );
  const respData = await resp.json();

  const meal = respData.meals[0];
  return meal;
}

async function getMealsBySerchTerm(term) {
  const resp = await fetch(
    "https://www.themealdb.com/api/json/v1/1/search.php?s=" + term
  );
  const respData = await resp.json();
  const meal = respData.meals;

  return meal;
}

function addMeal(mealData, random = false) {
  const meal = document.createElement("div");
  meal.classList.add("meal");
  meal.innerHTML = `
     <div class="meal-header">
     ${
       random
         ? `
       <span class="random">
           Random Recipe
       </span>`
         : `<span class='random'>
         ${mealData.strCategory}
         </span>`
     }
       <img src="${mealData.strMealThumb}" alt="${mealData.strMeal}" />
     </div>
     <div class="meal-body">
       <h4>${mealData.strMeal}</h4>
       <button class="fav-btn"><i class="fas fa-heart"></i></button>
     </div>
     
   `;

  makeButton(meal, mealData);
  meals.append(meal);
}

function addMealLS(mealId) {
  const mealIds = getMealsLS();

  localStorage.setItem("mealIds", JSON.stringify([...mealIds, mealId]));
}

function removeMealLS(mealId) {
  const mealIds = getMealsLS();

  localStorage.setItem(
    "mealIds",
    JSON.stringify(mealIds.filter((id) => id !== mealId))
  );
}

function getMealsLS() {
  const mealIds = JSON.parse(localStorage.getItem("mealIds"));
  return mealIds === null ? [] : mealIds;
}

async function fetchFavoriteMeals() {
  favMeals.innerHTML = "";

  const mealIds = getMealsLS();

  for (let i = 0; i < mealIds.length; i++) {
    const mealId = mealIds[i];
    meal = await getMealById(mealId);
    addMealFav(meal);
  }
}

function addMealFav(mealData, random = false) {
  const favMeal = document.createElement("li");
  favMeal.innerHTML = `
    <img
      src="${mealData.strMealThumb}"
      alt="${mealData.strMeal}"
    /><span>${mealData.strMeal}</span>
    <button class='clear'><i class='fas fa-window-close'></i></button>
     `;

  const btn = favMeal.querySelector(".clear");
  const goToBtn = favMeal.querySelector("img");

  goToBtn.addEventListener("click", () => {
    window.open(mealData.strSource, "_blank");
  });

  btn.addEventListener("click", () => {
    removeMealLS(mealData.idMeal);
    fetchFavoriteMeals();
  });
  favMeals.append(favMeal);
}

searchBtn.addEventListener("click", async () => {
  const search = searchTerm.value;
  const meal = await getMealsBySerchTerm(search);

  if (meal) {
    meal.forEach((meal) => {
      addMeal(meal);
    });
  } else {
    searchTerm.value = `No ${search} meals found`
  }
});

function makeButton(target, meal) {
  const goToBtn = target.querySelector("img");

  goToBtn.addEventListener("click", () => {
    window.open(meal.strSource, "_blank");
  });

  let btn = target.querySelector(".meal-body .fav-btn .fas");
  btn.addEventListener("click", () => {
    if (btn.classList.contains("active")) {
      removeMealLS(meal.idMeal);
      btn.classList.remove("active");
    } else {
      addMealLS(meal.idMeal);
      btn.classList.add("active");
    }
    fetchFavoriteMeals();
  });
}
