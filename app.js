//Selectors
const todoInput = document.querySelector('.todo-input');
const todoBtn = document.querySelector('.todo-btn');
const todoList = document.querySelector('.todo-list');
const filteropt = document.querySelector('.filter-todo');

//Event Listener
document.addEventListener('DOMContentLoaded',getTodo);
todoBtn.addEventListener('click', addTodo);
todoList.addEventListener('click', deleteCheck);
filteropt.addEventListener('click', filterTodo);

//Functions
function addTodo(event){
    event.preventDefault();

    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText= todoInput.value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    saveTodo(todoInput.value);

    const checkBtn=document.createElement("button");
    checkBtn.innerHTML='<i class="fas fa-check"></i>';
    checkBtn.classList.add("todo-check");
    todoDiv.appendChild(checkBtn);

    const deleteBtn=document.createElement("button");
    deleteBtn.innerHTML='<i class="fas fa-trash"></i>';
    deleteBtn.classList.add("todo-delete");
    todoDiv.appendChild(deleteBtn);
    
    todoList.appendChild(todoDiv);

    todoInput.value="";
}

function deleteCheck(e){
    const item = e.target;
    if(item.classList[0]==="todo-delete"){
        const todo = item.parentElement;
        todo.classList.add("fall");
        removeTodo(todo);
        todo.addEventListener("transitionend",function(){
            todo.remove();
        })
    }
    if(item.classList[0]==="todo-check"){
        const todo = item.parentElement;
        todo.classList.toggle("completed");
    }

}

function filterTodo(e){
    const todos= todoList.childNodes;
    for (let i = 1; i < todos.length; i++) {
        todo=todos[i];
        switch(e.target.value){
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if(todo.classList.contains("completed")){
                    todo.style.display="flex";
                }
                else{
                    todo.style.display="none";
                }
                break;
            case "uncompleted":
                if(!todo.classList.contains("completed")){
                    todo.style.display="flex";
                }
                else{
                    todo.style.display="none";
                }
                break;
        }
    }
}
function saveTodo(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.push(todo);
    localStorage.setItem('todos',JSON.stringify(todos));
}
function getTodo(){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    todos.forEach(todo => {
        const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    const newTodo = document.createElement("li");
    newTodo.innerText= todo;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    const checkBtn=document.createElement("button");
    checkBtn.innerHTML='<i class="fas fa-check"></i>';
    checkBtn.classList.add("todo-check");
    todoDiv.appendChild(checkBtn);

    const deleteBtn=document.createElement("button");
    deleteBtn.innerHTML='<i class="fas fa-trash"></i>';
    deleteBtn.classList.add("todo-delete");
    todoDiv.appendChild(deleteBtn);
    
    todoList.appendChild(todoDiv);
    });
}
function removeTodo(todo){
    let todos;
    if(localStorage.getItem('todos')===null){
        todos=[];
    }
    else{
        todos=JSON.parse(localStorage.getItem('todos'));
    }
    const todoIndex = todo.children[0].innerText;
    todos.splice(todos.indexOf(todoIndex),1);
    localStorage.setItem("todos",JSON.stringify(todos));
}