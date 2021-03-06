
function Todo(id, task, who, dueDate) {
    this.id = id;
    this.task = task;
    this.who = who;
    this.dueDate = dueDate;
    this.done = false;
}


var todos = new Array();

window.onload = init;

function init() {
    //getToDo();

    var buttonSubmit = document.getElementById("submit");
    buttonSubmit.onclick = getFormData;
    getTodoItems();


}

function getTodoItems() {
    if (localStorage) {
        for (var i = 0; i < localStorage.length; i++) {
            var key = localStorage.key(i);
            if (key.substring(0, 5) == "todo:") {
                var item = localStorage.getItem(key);
                var todoItem = JSON.parse(item);

                todos.push(todoItem);


            }
        }

        addTodosToPage();
    }

    else {
        console.log("localStorage is not supported in this browser! ");
    }
}


/*function getToDo() {
    var request = new XMLHttpRequest;
    request.open("GET", "todo.json");
    request.onreadystatechange = function () {
        //var div = document.getElementById("todo");
        if (this.readyState == this.DONE && this.status == 200) {
            if (this.responseText != null) {
                // div.innerText = this.responseText;
                parseToDoItems(this.responseText);
                showInPage();
            }

            else {
                div.innerText = "Error: No Data is being passed";
            }

        }
    }
    request.send(); //Enviar a requisição
}*/

/*function parseToDoItems(todoJSON) {
    if (todoJSON == null || todoJSON.trim() == "") {
        console.log("Error: No data Found");
        return;
    }


    var todoArray = JSON.parse(todoJSON);
    if (todoArray.length == 0) {
        console.log("Error: No data Found");
        return;
    }

    for (var i = 0; i < todoArray.length; i++) {
        var todoItem = todoArray[i];

        todos.push(todoItem);

    }


} */

function showInPage() {
    var ul = document.getElementById("todoList");
    for (var i = 0; i < todos.length; i++) {
        var todoItem = todos[i];
        var li = createNewTodoItem(todoItem);
        ul.appendChild(li);
    }
}

function getFormData() {
    var task = document.getElementById("task").value;

    if (checkInputText(task, "Please enter a task")) return;

    var who = document.getElementById("who").value;
    if (checkInputText(who, "Enter the name of the person who's going to do")) return;

    var dueDate = document.getElementById("dueDate").value;
    if (checkInputText(dueDate, "Please enter the due date of the task")) return;

    if (task && who && dueDate) {
        if (who != task) {
            var id = (new Date()).getTime();
            var todoItem = new Todo(id, task, who, dueDate);
            todos.push(todoItem);
            addTodoToPage(todoItem);


            saveTodoItem(todoItem);
        }
    }

}

function saveTodoItem(todoItem) {

    if (localStorage) {
        var key = "todo: " + todoItem.id;
        var item = JSON.stringify(todoItem);

        localStorage.setItem(key, item);
    }

    else {
        console.log("Some error ocurred !!!");
    }
}

function checkInputText(value, msg) {
    if (value == null || value == "") {
        alert(msg);

    }

    else {
        return false;
    }


}


function addTodosToPage() {
    var ul = document.getElementById("todoList");
    var listFragment = document.createDocumentFragment();

    for (let i = 0; i < todos.length; i++) {
        var todoItem = todos[i];
        var li = createNewTodoItem(todoItem);
        listFragment.appendChild(li);
    }

    ul.appendChild(listFragment);
}

function addTodoToPage(todoItem) {
    var ul = document.getElementById("todoList");
    var li = createNewTodoItem(todoItem);
    ul.appendChild(li);

    document.forms[0].reset();
}

function saveTodoData() {

    var todosJSON = JSON.stringify(todos);
    var request = new XMLHttpRequest;
    console.log(todosJSON);

    request.open("GET", URL);
    request.setRequestHeader("Content-Type", "text/plain;charset=UTF-8");
    request.send();

}

function createNewTodoItem(todoItem) {
    var li = document.createElement("li");
    // li.innerText = todoItem.who + " needs to" + todoItem.task + " by" + todoItem.dueDate;
    // return li;

    var spanTodo = document.createElement("span");
    spanTodo.innerHTML = todoItem.who + " needs to" + todoItem.task + " by" + todoItem.dueDate;

    var spanDone = document.createElement("span");
    if (!todoItem.done) {
        spanDone.setAttribute("class", "notDone");
        spanDone.innerHTML = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";
    }

    else {
        spanDone.setAttribute("class", "Done");
        spanDone.innerHTML = "&nbsp;&#10004;&nbsp;";
    }

    var spanDelete = document.createElement("sapnDelete");
    spanDelete.setAttribute("id", todoItem.id);
    spanDelete.setAttribute("class", "delete");
    spanDelete.innerHTML = "&nbsp;&#10007;&nbsp;";

    spanDelete.onclick = deleteItem;


    li.appendChild(spanDone);
    li.appendChild(spanTodo);
    li.appendChild(spanDelete);

    return li;

}

function deleteItem(e) {

    var id = e.target.id;
    console.log("delete an item: " + id);

    // find and remove item in localStorage
    var key = "todo: " + id;
    localStorage.removeItem(key);

    //find and remove item in the array
    for (let i=0; i<todos.length; i++){
        if(todos[i].id = id){
            todos.splice(i,1);
            break;
        }
    }

    // find and remove item in the page

    var li = e.target.parentElement;
    var ul = document.getElementById("todoList");
    ul.removeChild(li);

}