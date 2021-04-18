const toDoForm = document.querySelector('.form-add');
const getToDo = document.querySelector('.todo-input');  //input
const addToDo = document.querySelector('.add-todo');  // buttons
const todoList = document.querySelector('.list-set');   //ul

const TODOS_Ls = "toDos";
let todoArr = [];

let newId = todoArr.length;

const generateTempalate = (todo) => {
    const item = 
    ` 
    <li>
        <input type="checkbox" id = "${newId - 1}">
        <label for="${newId - 1}">
        <span class="check"></span>
            ${todo}
        </label>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `

    todoList.innerHTML += item;
};

function addTodos(text) {
    if(text) {
        const toDoObj = {
            text,
            id: newId,
        };
        newId += 1;
        todoArr.push(toDoObj);  //localStorage Array
        saveToDos();        // save localStorage
        generateTempalate(text);
    }
}

function deleteTodos(e) {
    
    const cleanToDos = todoArr.filter(todoArr => {
        return todoArr.id !== parseInt(e.target.parentElement.id);
    });
    todoArr = cleanToDos;
    saveToDos();
    
    
    if(e.target.classList.contains('delete')) {
        e.target.parentElement.remove();
    }
    
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = getToDo.value;
    addTodos(currentValue);
    getToDo.value = "";
}

function saveToDos() {
    localStorage.setItem(TODOS_Ls, JSON.stringify(todoArr));
}

function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_Ls);
    
    if(loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);

        parsedToDos.forEach(function (toDo) {
            addTodos(toDo.text);
        });
    }
}


function init() {
    loadToDos();

    toDoForm.addEventListener("submit", handleSubmit);
    addToDo.addEventListener("click", handleSubmit);
    todoList.addEventListener("click", deleteTodos);
}

init();

