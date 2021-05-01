"use strict";

const toDoForm = document.querySelector('.form-add');
const getToDo = document.querySelector('.todo-input');  //input
const addToDo = document.querySelector('.add-todo');  // buttons
const todoList = document.querySelector('.list-set');   //ul

const TODOS_Ls = "toDos";
let todoArr = [];

let newId = todoArr.length;

/* delete toDos */
function deleteTodos(e) {

    const cleanToDos = todoArr.filter(todoArr => {
        return todoArr.id !== parseInt(e.parentElement.id);
    });
    todoArr = cleanToDos;
    saveToDos();
    
    if(e.classList.contains('delete')) {
        e.parentElement.remove();
    }
    
}

/* binded checkbox HTML control 
const checkArr = [];
function click_button(label) {
    if(label) {
        const clickObj = {
            label,
            checkedValue: 0,   // need fix
        };
        checkArr.push(clickObj);
    }

    verifi_list(checkArr, label);
    
}

function verifi_list(checkArr, label) {
    if(checkArr.checkedValue === 1) {
        uncheckedLabel(label);
        checkArr.checkedValue = 0;
    } else {
        checkedLabel(label);
        checkArr.checkedValue = 1;
    }
}
*/

/* input tag control */
function handleSubmit(event) {
    event.preventDefault();
    const currentValue = getToDo.value;
    addTodos(currentValue);
    getToDo.value = "";
}

/* localStorage area*/

function checkedLabel(label) {
    label.style.color = '#aeb7c6';
    label.style.textDecoration = 'line-through';
    label.childNodes[1].style.backgroundColor = 'transparent';
    label.childNodes[1].style.borderColor = 'transparent';
    label.childNodes[1].style.boxShadow ='none';
}

function uncheckedLabel(label) {
    label.childNodes[1].style.background = '#f6fafb';
    label.childNodes[1].style.borderRadius = '2px';
    label.childNodes[1].style.border = '1px solid #b8bfcc';
    label.childNodes[1].style.boxShadow = '0 2px 3px #f0f4f8';
    label.style.textDecoration = 'none';
    label.style.color = '#6c717b'
}

const generateTempalate = (todo) => {
    const item = 
    ` 
    <li id = "${newId - 1}">
        <input type="checkbox">
        <label for="${newId - 1}" onclick = "checkValue(this);">
            <span class="check"></span>
                ${todo}
        </label>
        <i class="far fa-trash-alt delete" onclick = "deleteTodos(this)"></i>
    </li>
    `
    todoList.innerHTML += item;
};

function addTodos(text) {
    if(text) {
        const toDoObj = {
            text,
            id: newId,
            value : 0,
        };
        newId += 1;
        todoArr.push(toDoObj);  //localStorage Array
        saveToDos();        // save localStorage
        generateTempalate(text); 
    }
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

function checkValue(label) {

    /*
    localStorage.getItem()
    if(toDoObj.value === 0) {
        uncheckedLabel(label);
    } else {
        checkedLabel(label);
    } 
    */
}

function init() {
    loadToDos();

    toDoForm.addEventListener("submit", handleSubmit);
    addToDo.addEventListener("click", handleSubmit);

    //todoList.addEventListener("click", deleteTodos);
}

init();