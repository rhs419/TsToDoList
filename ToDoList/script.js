window.onstorage = function(e){
    console.log(localStorage);
    init();
}

window.onload = function (e){
    init();

}

function init(){
    document.getElementById("todoList").innerHTML="";
    document.getElementById("doneList").innerHTML="";
    for(let i =0; i<localStorage.length;i++){
        if(localStorage.key(i)!="number") {
            let data = JSON.parse(localStorage.getItem(localStorage.key(i)));
            let number = (data.id).replace("todo", "");
            addList(number, data.todoText, data.checked)
        }
    }
    if(document.getElementById("doneList").children.length==0){
        document.getElementById("done").hidden=true;
    }else{
        document.getElementById("done").hidden=false    ;
    }
}

function addList(number, text, checked ){
    let todoCheck = document.createElement("input");
    let todo = document.createElement("label");
    let tr = document.createElement("tr");
    let delBut = document.createElement("button");
    let tdCheck = document.createElement("td");
    let tdLabel = document.createElement("td");
    let tdButton = document.createElement("td");
    tr.prepend(tdCheck,tdLabel, tdButton);
    todoCheck.type = "checkbox";
    todoCheck.classList.add("todo");
    todoCheck.id = "todoCheck" + number;
    todoCheck.checked = checked;
    todoCheck.onclick = toDoDone;
    todo.id = "todoLabel" + number;
    todo.classList.add("todo");
    todo.innerText = text;
    todo.htmlFor = "todoCheck" + number;
    delBut.innerText="삭제";
    delBut.style.color="red";
    delBut.id = "todo"+number;
    delBut.onclick = delToDoLS;
    delBut.classList.add("delBut");
    delBut.style.backgroundImage = "url('src/img/img.png')";
    tdCheck.prepend(todoCheck);
    tdCheck.classList.add("tdCheck");
    tdLabel.prepend(todo);
    tdButton.prepend(delBut);
    if(checked==true){
        todo.classList.add("checked");
        document.getElementById("doneList").prepend(tr);
    }else{
        document.getElementById("todoList").prepend(tr);
    }
}

function delToDoLS(){
    localStorage.removeItem(this.id);
    window.dispatchEvent(new Event('storage'));
}

function addToDoLS(text){
    if(localStorage.getItem("number")==null) {
        localStorage.setItem("number", "0");
    }
    let number = localStorage.getItem("number");
    let todo = {
        id : "todo" + number,
        checked : false,
        todoText : text
    }
    localStorage.setItem("todo" + number,JSON.stringify(todo));
    if(localStorage.getItem("number")!=null) {
        localStorage.setItem("number", ""+(parseInt(localStorage.getItem("number"))+1));
    }
    window.dispatchEvent(new Event('storage'));
}

function addToDo(){
    let toDoInput = document.getElementById("toDoInput");
    if(!(toDoInput.value==null||toDoInput.value===null||toDoInput.value.trim()=="")) {
        addToDoLS(toDoInput.value);
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
    init();
}