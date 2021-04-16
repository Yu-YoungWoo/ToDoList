const getToDo = document.querySelector('.todo-input');  //input
const addToDo = document.querySelector('.add-todo');  // buttons
const todoList = document.querySelector('.list-set');   //ul
const todoItem = document.querySelectorAll('.list-set li');  //li 

let listLength = todoList.length;


const generateTempalate = (todo) => {
    const item = 
    ` 
    <li>
        <input type="checkbox" id="todo_${listLength}">
        <label for="todo_${listLength}">
        <span class="check"></span>
            ${todo}
        </label>
        <i class="far fa-trash-alt delete"></i>
    </li>
    `

    todoList.innerHTML += item;
};

function addTodos(e) {
    e.preventDefault();
    const todo = getToDo.value; //remove white space
    if(todo.length) {
        listLength += 1;
        $('input').keyup(function(e) {
            if(e.keyCode == 13) addTodos(e);
        });        
        generateTempalate(todo);
        getToDo.value = "";
    }
}
getToDo.addEventListener('submit', addTodos);
addToDo.addEventListener('click', addTodos);