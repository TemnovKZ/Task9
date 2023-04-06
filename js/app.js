let todoInput = document.querySelector('.todo__text');
let todoButton = document.querySelector('.todo__add');
let todoList = document.querySelector('.todo__items');
let optionGener = document.querySelector('.todo__options');
let clearDone = document.querySelector('.todo__clear');
let numItems = document.querySelector('.todo__quantity');
let switchTheme = document.querySelector('.switch');
let mainTheme = document.querySelector('main');


window.addEventListener('click', itemsCol);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
clearDone.addEventListener('click', clearDoneTasks);
document.addEventListener("DOMContentLoaded", getLocalTodos);

// switch theme

switchTheme.addEventListener('click', function() {
    mainTheme.classList.toggle('day');
    if(mainTheme.classList.contains('day')) {
        document.querySelector('.sun-img').classList.remove('active')
        document.querySelector('.moon-img').classList.add('active')
    } else {
        document.querySelector('.moon-img').classList.remove('active')
        document.querySelector('.sun-img').classList.add('active')
    }
});


// add tasks

function addTodo(e) {
    event.preventDefault();

    saveLocalTodos(todoInput.value);

    let todoDiv = document.createElement("li");
    todoDiv.classList.add("todo__item");
    todoDiv.classList.add("undone");

    let completedButton = document.createElement("div");
    completedButton.innerHTML = '<img class="v" alt="done" src="img/icon/done.png"></li>';
    completedButton.classList.add("todo__done");
    todoDiv.appendChild(completedButton);

    let newTodo = document.createElement("p");
    newTodo.innerText = todoInput.value; 
    newTodo.classList.add("todo__task");
    todoDiv.appendChild(newTodo);

    let deleteTask = document.createElement('img');
    deleteTask.classList.add('todo__delete');


    todoDiv.appendChild(deleteTask);
    todoList.appendChild(todoDiv);
    todoInput.value = "";
    
    numItems.innerHTML = todosUnDone.length + ' items left'
}


//delete and mark tasks

function deleteCheck(e) {
    let item = e.target;
    
    if(item.classList[0] === 'todo__delete') {
        let todo = item.parentElement;
        todo.classList.add('slide');

        todo.addEventListener('transitionend', function() {
            todo.remove();
            
            removeLocalTodos(todo)
        });
    }

    if(item.classList[0] === 'todo__done' || item.classList[0] === 'todo__task') {
        let todo = item.parentElement;
        todo.classList.toggle("undone");
        todo.classList.toggle("done");
    }
}


//clear done tasks

function clearDoneTasks() {
    let finishTasks = document.getElementsByClassName('done');
    Array.from(finishTasks).forEach(finishTasks => {
        finishTasks.remove();
      });
}


//filter

let items = document.getElementsByClassName('todo__item');
let options = document.querySelectorAll('.todo__option');

options.forEach(item => {
    item.addEventListener('click', filterChoise)
});

function filterChoise() {

    options.forEach(item => {
        item.classList.remove('blue')
    })
    this.classList.add('blue')

    Array.from(items).forEach(item => {
        if(this.classList.contains('all')) {
            item.style.display = 'flex'
        }

        if(this.classList.contains('active')) {
            if(!item.classList.contains('done')) {
                item.style.display = 'flex'
            }else {
                item.style.display = 'none'
            }
        }

        if(this.classList.contains('finished')) {
            if(item.classList.contains('done')) {
                item.style.display = 'flex'
            }else {
                item.style.display = 'none'
            }
        }
    });
};

//items left


let todosUnDone = document.getElementsByClassName('undone');

function itemsCol() {
    numItems.innerHTML = todosUnDone.length + ' items left'
}
numItems.innerHTML = todosUnDone.length + ' items left';




//save local storage

function saveLocalTodos(todo) {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.push(todo);
    localStorage.setItem('todos', JSON.stringify(todos));
}

function getLocalTodos() {
    let todos;

    if (localStorage.getItem('todos') === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem('todos'));
    }

    todos.forEach(todo => {
        let todoDiv = document.createElement("li");
        todoDiv.classList.add("todo__item");
        todoDiv.classList.add("undone");

        let completedButton = document.createElement("div");
        completedButton.innerHTML = '<img class="v" alt="done" src="img/icon/done.png"></li>';
        completedButton.classList.add("todo__done");
        todoDiv.appendChild(completedButton);

        let newTodo = document.createElement("p");
        newTodo.innerText = todo;
        newTodo.classList.add("todo__task");
        todoDiv.appendChild(newTodo);

        let deleteTask = document.createElement('img');
        deleteTask.classList.add('todo__delete');
        todoDiv.appendChild(deleteTask);

        todoList.appendChild(todoDiv);
    });
}

function removeLocalTodos(todo) {
    let todos;
    if(localStorage.getItem("todos") === null) {
        todos = [];
    } else {
        todos = JSON.parse(localStorage.getItem("todos"));
    }

    const todoIndex = todo.innerText;
    todos.splice(todos.indexOf(todoIndex), 1);
    localStorage.setItem("todos", JSON.stringify(todos));
}

window.onload = function() {
    dragula([document.querySelector('.todo__items')]);
}
