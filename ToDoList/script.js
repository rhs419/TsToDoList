window.onstorage = function(e){
    console.log(localStorage);
    console.log("할일 추가할 부분");
}

window.onload = function (e){
    for(let i =0; i<localStorage.length;i++){
        let data = JSON.parse(localStorage.getItem(localStorage.key(i)));
        let number = (data.id).replace("todo", "");
        addList(number,data.todoText,data.checked)
    }
}

function addList(number, text, checked ){
    let todoCheck = document.createElement("input");
    let todo = document.createElement("label");
    todoCheck.type = "checkbox";
    todoCheck.classList.add("todoCheck");
    todoCheck.id = "todoCheck" + number;
    todoCheck.checked = checked;
    todoCheck.onclick = toDoDone;
    todo.id = "todoLabel" + number;
    todo.classList.add("todoLabel");
    if(checked==true){
        todo.classList.add("checked");
    }
    todo.innerText = text;
    todo.htmlFor = "todoCheck" + number;
    let br = document.createElement("br");
    document.getElementById("todoList").prepend(todoCheck, todo, br);

}

function addToDoLS(text){
    let number = document.getElementsByClassName("todoLabel").length;
    let todo = {
        id : "todo" + number,
        checked : false,
        todoText : text
    }
    localStorage.setItem("todo" + number,JSON.stringify(todo));
    window.dispatchEvent( new Event('storage') )
}

function addToDo(){
    let toDoInput = document.getElementById("toDoInput");
    if(!(toDoInput.value==null||toDoInput.value===null||toDoInput.value.trim()=="")) {
        addToDoLS(toDoInput.value);
        let number = document.getElementsByTagName("label").length;
        addList(number,toDoInput.value,false);
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
    id = id.replace("todoLabel","todo");
    let data = JSON.parse(localStorage.getItem(id));
    if(this.checked==true) {
        todo.classList.add("checked")
        data.checked = true;
        localStorage.setItem(id,JSON.stringify(data));
    }
    else{
        todo.classList.remove("checked")
        data.checked = false;
        localStorage.setItem(id,JSON.stringify(data));
    }
}