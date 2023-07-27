const button = document.querySelector('.button-add-task')
const input = document.querySelector('.input-task')
const fullList = document.querySelector('.list-task')

let myList = []

function identifyContent() {
    if (input.value === "") {
        alert('Por favor preencha o campo tarefa!')
    }
    if(input.value !== ""){
        addNewTask()
    }

}

function addNewTask() {
    myList.push({
        task: input.value,
        concluded: false
    })

    input.value = ''

    viewTask()
}

function viewTask() {

    let newLi = ''

    myList.forEach((item, index) => {
        newLi = newLi + ` 
        <li class="task ${item.concluded && "done"}">
        <img class="icons-task" src="./img/checked.png" alt="check-na-tarefa" onclick="taskOk(${index})">
        <p>${item.task}</p>
        <img class="icons-task" src="./img/trash.png" alt="excluir-tarefa" onclick="deleteItem(${index})">
        </li> 
                        `

    })

    fullList.innerHTML = newLi

    localStorage.setItem('list', JSON.stringify(myList))

}

function taskOk(index) {
    myList[index].concluded = !myList[index].concluded

    viewTask()
}

function deleteItem(index) {
    myList.splice(index, 1)

    viewTask()
}

function reloadTask() {
    const taskStorage = localStorage.getItem('list')

    if (taskStorage) {
        myList = JSON.parse(taskStorage)
    }
    viewTask()

}

reloadTask()
button.addEventListener('click', identifyContent, addNewTask)