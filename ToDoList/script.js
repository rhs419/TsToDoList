window.onstorage = function(e){
    console.log(localStorage);
    console.log("할일 추가할 부분");
}

window.onload = function (e){
    for(let i =0; i<localStorage.length;i++){
        let data = JSON.parse(localStorage.getItem(localStorage.key(i)));
        let number = (data.id).replace("todo", "");
        let todoCheck = document.createElement("input");
        let todo = document.createElement("label");
        todoCheck.type = "checkbox";
        todoCheck.className = "todoCheck";
        todoCheck.id = "todoCheck" + number;
        todoCheck.checked = data.checked;
        todoCheck.onclick = toDoDone;
        todo.id = "todoLabel" + number;
        todo.className = "todoLabel";
        todo.innerText = data.todoText;
        todo.htmlFor = "todoCheck" + number;
        let br = document.createElement("br");
        document.getElementById("todoList").prepend(todoCheck, todo, br);
    }
}

function plusToDoLS(text){
    let number = document.getElementsByClassName("todoLabel").length;
    let todo = {
        id : "todo" + number,
        checked : false,
        todoText : text
    }
    localStorage.setItem("todo" + number,JSON.stringify(todo));
    window.dispatchEvent( new Event('storage') )
}

function plusToDo(){
    let toDoInput = document.getElementById("toDoInput");
    if(!(toDoInput.value==null||toDoInput.value===null||toDoInput.value.trim()=="")) {
        plusToDoLS(toDoInput.value);
        let todoCheck = document.createElement("input");
        let todo = document.createElement("label");
        let number = document.getElementsByTagName("label").length;
        todoCheck.type = "checkbox";
        todoCheck.className = "todoCheck";
        todoCheck.id = "todoCheck" + number;
        todoCheck.onclick = toDoDone;
        todo.id = "todoLabel" + number;
        todo.className = "todoLabel";
        todo.innerText = toDoInput.value;
        todo.htmlFor = "todoCheck" + number;
        let br = document.createElement("br");
        document.getElementById("todoList").prepend(todoCheck, todo, br);
    }
    else{
        toDoInput.focus();
    }
    toDoInput.value ="";
}

function toDoDone(){
    let id = this.id;
    id = id.replace("todoCheck","todoLabel");
    let todo = document.getElementById(id);
    if(this.checked==true) {
        todo.style.textDecoration = "line-through";
        todo.style.color = "grey";
    }
    else{
        todo.style.textDecoration = "";
        todo.style.color = "black";
    }
}