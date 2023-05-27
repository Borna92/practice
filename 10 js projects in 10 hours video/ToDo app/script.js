const form = document.querySelector("form");
const input = document.querySelector("input");
const listDisplay = document.querySelector(".todo-list");
const savedToDos = JSON.parse(localStorage.getItem('todos'))

const completedBtn = document.querySelector('#completed')
const activeBtn = document.querySelector('#active')
const showAllBtn = document.querySelector('#all')

completedBtn.addEventListener('click', () => {
    checkItems(false)
})

activeBtn.addEventListener('click', () => {
    checkItems(true)
})

showAllBtn.addEventListener('click', () => {
    checkItems('all')
})

function checkItems(value){
    const items = document.querySelectorAll('li')
    items.forEach((item) => {
        if(item.classList.contains('completed') == value){
            item.classList.toggle('hide')
        }
        if (value == 'all'){
            item.classList.remove('hide')
        }
    })
}

if(savedToDos){
    savedToDos.forEach((todo) => {
        addToDo(todo.text,todo.completed)
    })
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  addToDo(input.value);
});

function addToDo(text, completed='') {
  const todoText = text;

  if (todoText) {
    const todoEl = document.createElement("li");
    todoEl.innerHTML = `${todoText} <i class="fa-solid fa-trash-can delete-btn"></i>`;

    if (completed){
        todoEl.classList.add('completed')
    }
    
    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed");
      updateLS() 
    });

    listDisplay.append(todoEl);
    updateLS() 

    
    const deleteBtn = todoEl.querySelector(".delete-btn");
    deleteBtn.addEventListener("click", () => {
      todoEl.remove();
      updateLS()
    });
    input.value = "";
  }
}

function updateLS (){
    const items = document.querySelectorAll('li')

    const allToDos = []

    items.forEach((item) => {
        allToDos.push(
            {
                text: item.textContent.trim(),
                completed: item.classList.contains('completed')
            }
            )
    })
    localStorage.setItem('todos', JSON.stringify(allToDos))
}
