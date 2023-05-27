const addBtn = document.querySelector(".add");
const notes = JSON.parse(localStorage.getItem('notes'))

if(notes){
    notes.forEach((note) => {
        addNewNote(note)
    })
}

addBtn.addEventListener("click", () => addNewNote(''));

function addNewNote(text) {
  const note = document.createElement("div");
  note.classList.add("note");
  note.innerHTML = `<div class="notes">
<div class="tools">
  <button id="edit-btn"><i class="fas fa-edit"></i></button>
  <button id="delete-btn"><i class="fas fa-trash-alt"></i></button>
</div>
<div class="main hidden"></div>
<textarea></textarea>
</div>`;

  document.body.appendChild(note);

  const editBtn = note.querySelector("#edit-btn");
  const deleteBtn = note.querySelector("#delete-btn");
  const textArea = note.querySelector("textarea");
  const main = note.querySelector(".main");

  textArea.value = text
 

  editBtn.addEventListener("click", () => {
    main.classList.toggle("hidden");
    textArea.classList.toggle("hidden");
  });

  deleteBtn.addEventListener('click',() => {
    note.remove()
    updateLS()
  })

  textArea.addEventListener("input", (e) => {
    const { value } = e.target;

    main.innerHTML = marked.parse(value);

    updateLS()

  });

  document.body.append(note);
}

function updateLS(){
    const notesText = document.querySelectorAll('textarea')

    const allNotes = []

    notesText.forEach((note => {
        allNotes.push(note.value)
    }))

    localStorage.setItem('notes', JSON.stringify(allNotes))
}
