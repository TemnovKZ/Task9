let todoInput = document.querySelector('.todo__text');
let todoButton = document.querySelector('.todo__add');
let todoList = document.querySelector('.todo__items');
let optionGener = document.querySelector('.todo__options');
let clearDone = document.querySelector('.todo__clear');
let numItems = document.querySelector('.todo__quantity')
let todosUnDone = document.getElementsByClassName('undone');


window.addEventListener('click', itemsCol);
todoButton.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
clearDone.addEventListener('click', clearDoneTasks);


// add tasks

function addTodo(e) {
    event.preventDefault();

    const todoDiv = document.createElement("li");
    todoDiv.classList.add("todo__item");
    todoDiv.classList.add("undone");

    const completedButton = document.createElement("div");
    completedButton.innerHTML = '<img class="v" alt="done" src="img/icon/done.png"></li>';
    completedButton.classList.add("todo__done");
    todoDiv.appendChild(completedButton);

    const newTodo = document.createElement("p");
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

function itemsCol() {
    let todosUnDone = document.getElementsByClassName('undone');
    numItems.innerHTML = todosUnDone.length + ' items left'
}
numItems.innerHTML = todosUnDone.length + ' items left';


//drop'n'drop
