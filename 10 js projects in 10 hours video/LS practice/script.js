const itemInput = document.querySelector("#item");
const numberInput = document.querySelector("#number");
const submit = document.querySelector("button");
const itemDisplay = document.querySelector('.display')
const currentStorage = JSON.parse(localStorage.getItem('text'))

if(currentStorage){
    currentStorage.forEach((thing) => {
        addItemToPage(thing.item, thing.quantity)
    })
}

submit.addEventListener('click', () => {
    if(itemInput.value && numberInput.value){
    addItemToPage(itemInput.value, numberInput.value)
    updateLS()}
})

function addItemToPage(item, number){
    const newLine = document.createElement('li')
    newLine.innerHTML = `${item} - ${number} <button class='delete button'><i class="fa-solid fa-trash-can"></i></button>`
    itemInput.value = ''
    numberInput.value = ''
    itemDisplay.append(newLine)
    const deleteBtn = newLine.querySelector(".delete");

    deleteBtn.addEventListener('click', () => {
        newLine.remove()
        updateLS()
    })
}

function updateLS(){
    const allItems = document.querySelectorAll('li')
    const allSaved = []

    allItems.forEach((item) => {
        const itemText = item.innerText;
        const itemValue = itemText.split(' ')[0]
        const numberValue = itemText.split(' ')[2];
        allSaved.push({
            item: itemValue,
            quantity: numberValue
        });
    })

    localStorage.setItem('text', JSON.stringify(allSaved))
}
