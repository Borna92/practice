// ****** SELECT ITEMS **********
const alert = document.querySelector(".alert");
const form = document.querySelector(".grocery-form");
const grocery = document.getElementById("grocery");
const submitBtn = document.querySelector(".submit-btn");
const clearBtn = document.querySelector(".clear-btn");
const container = document.querySelector(".grocery-container");
const list = document.querySelector(".grocery-list");

// edit option
let editElement;
let editFlag = false;
let editId = "";

// ****** EVENT LISTENERS **********
form.addEventListener("submit", addItem);
clearBtn.addEventListener("click", clearList);

// load items
window.addEventListener("DOMContentLoaded", setupItems);

// ****** FUNCTIONS **********
function addItem(e) {
  e.preventDefault();
  const value = grocery.value;
  const id = new Date().getTime().toString();
  if (value && !editFlag) {
    createListItem(id, value);
    displayAlert("Item Added To the List", "success");
    // container.classList.add("show-container");
    // add to local storage
    addToLocalStorage(id, value);
    // set back to default
    setBackToDefault();
  } else if (value && editFlag) {
    const itemToChange =
      editElement.parentElement.parentElement.querySelector("p");
    itemToChange.innerHTML = value;
    let currentId = editElement.parentElement.parentElement.dataset.id;
    //   EDIT THIS!!!
    editLocalStorage(editId, value);
    displayAlert("Item Edited", "success");
    setBackToDefault();
  } else {
    displayAlert("Please enter value", "danger");
  }
}

function clearList() {
  const allItems = document.querySelectorAll(".grocery-item");
  allItems.forEach((item) => {
    localStorage.removeItem(JSON.stringify(item.dataset.id));
  });

  while (list.firstChild) {
    list.removeChild(list.firstChild);
  }
  container.classList.remove("show-container");
  displayAlert("List Cleared", "success");
  setBackToDefault();
}

function displayAlert(text, action) {
  alert.innerText = text;
  alert.classList.add(`alert-${action}`);
  setTimeout(() => {
    alert.innerText = "";
    alert.classList.remove(`alert-${action}`);
  }, 1000);
}

function deleteItem() {
  const id = this.parentElement.parentElement.dataset.id;
  this.parentElement.parentElement.remove();
  displayAlert("Item Removed", "success");
  if (list.childElementCount === 0) {
    container.classList.remove("show-container");
  }
  setBackToDefault();
  removeFromLocalStorage(id);
}

function editItem() {
  editFlag = true;
  editElement = this;
  const content = this.parentElement.parentElement;
  grocery.value = content.querySelector("p").innerHTML;
  editId = content.dataset.id;
  submitBtn.textContent = "edit";
}

function setBackToDefault() {
  grocery.value = "";
  editFlag = false;
  editId = "";
  submitBtn.textContent = "submit";
}
//   EDIT THIS!!!
// ****** LOCAL STORAGE **********
function addToLocalStorage(id, value) {
  localStorage.setItem(JSON.stringify(id), JSON.stringify(value));
}

function editLocalStorage(editId, newValue) {
  const key = editId;
  let value = localStorage.getItem(JSON.stringify(key));
  value = newValue;
  localStorage.setItem(JSON.stringify(key), JSON.stringify(value));
}

function removeFromLocalStorage(id) {
  localStorage.removeItem(JSON.stringify(id));
}

// function getLocalStorage() {
//   for (let i = 0; i < localStorage.length; i++) {
//     const key = localStorage.key(i);
//     const value = localStorage.getItem(key);
//     console.log(`Key: ${key}, Value: ${value}`);
//   }
// }
// ****** SETUP ITEMS **********

function setupItems() {
  for (let i = 0; i < localStorage.length; i++) {
    const key = localStorage.key(i);
    const value = localStorage.getItem(key);
    createListItem(key, value);
  }
}

function createListItem(id, value) {
  const newArticle = document.createElement("article");
  newArticle.classList.add("grocery-item");
  newArticle.setAttribute("data-id", id);
  value = value.replace(/"/g, "");
  newArticle.innerHTML = `<p class="title">${value}</p>
        <div class="btn-container">
          <button type="button" class="edit-btn">
            <i class="fas fa-edit"></i>
          </button>
          <button type="button" class="delete-btn">
            <i class="fas fa-trash"></i>
          </button>
        </div>`;

  const deleteBtn = newArticle.querySelector(".delete-btn");
  const editBtn = newArticle.querySelector(".edit-btn");

  deleteBtn.addEventListener("click", deleteItem);
  editBtn.addEventListener("click", editItem);

  list.appendChild(newArticle);
  container.classList.add("show-container");
}
