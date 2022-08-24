class ToDo{
    id : string;
    checked : boolean;
    todoText : string;
    constructor(id : string, checked : boolean, text : string) {
        this.id=id;
        this.checked = checked;
        this.todoText = text;
    }
}

function test(count : number){
    let start : number= new Date().getTime();
    for(let i : number=0;i<count;i++){
        addToDoLS(i.toString());
    }
    localStorage.clear();
    let end : number = new Date().getTime();
    console.log((end - start)/1000+"초 걸렸습니다");
}

function testInsert(count : number){
    let start : number= new Date().getTime();
    for(let i : number=0;i<count;i++){
        addToDoLS(i.toString());
    }
    let end : number = new Date().getTime();
    console.log((end - start)/1000+"초 걸렸습니다");
}


window.onstorage = () =>{
    console.log(localStorage);
    init();
}

window.onload = () =>{
    const toDoInput : HTMLInputElement | null = document.querySelector("#toDoInput");
    const addButton : HTMLButtonElement | null = document.querySelector("#addButton");
    const doneSpan : HTMLSpanElement | null = document.querySelector("#doneSpan");
    toDoInput?.addEventListener("focusin",adding);
    toDoInput?.addEventListener("focusout",adding);
    toDoInput?.addEventListener("keypress",Event => enter(Event));
    addButton?.addEventListener("click",addToDo);
    doneSpan?.addEventListener("click",showDoneList);
    init();
}

function enter(e : KeyboardEvent) : void{
    let key : number | string =e.key || e.keyCode;
    if (key === 'Enter' || key === 13) {
        addToDo();
    }
}

function adding() : void{
    let label : HTMLLabelElement | null = document.querySelector("#todoLabel");
    if(label==null){
        console.log("do something");
    }else{
        label.innerText=="○"?label.innerText="+":label.innerText="○";
    }
}

function init() : void{
    const todoList : HTMLTableSectionElement | null = document.querySelector("#todoList");
    const doneList : HTMLTableSectionElement | null = document.querySelector("#doneList");
    const doneCount : HTMLLabelElement | null = document.querySelector("#doneCount");
    const done : HTMLTableSectionElement | null = document.querySelector("#done");
    if(todoList==null||doneList==null) {
        console.log("뭐라도 해봐");
    }else {
        todoList.innerHTML = "";
        doneList.innerHTML = "";
    }
    let key =[];
    for(let i =0; i<localStorage.length;i++){
        const tmp : string | null = localStorage.key(i);
        if(tmp!="number"&&tmp!=null) {
            key.push(parseInt(tmp.replace("todo", "")));
        }
    }
    key.sort(compareNumbers);
    for(let i =0; i<key.length;i++){
        const data : ToDo = JSON.parse(localStorage.getItem("todo"+key[i])!);
        const number : number = key[i];
        addList(number, data.todoText, data.checked)
    }
    if(done==null||doneCount==null||doneList==null){
        console.log("do something");
    }else{
        if(doneList?.children.length==0){
            done.hidden=true;
        }else{
            done.hidden=false;
            doneCount.innerText=(doneList.children.length).toString();
        }
    }

}

function compareNumbers(a : number, b : number) : number{
    return a - b;
}

function todoCheckTag(number : number, checked : boolean) : HTMLInputElement{
    const todoCheck : HTMLInputElement = document.createElement("input");
    todoCheck.type = "checkbox";
    todoCheck.classList.add("todo");
    todoCheck.id = "todoCheck" + number;
    todoCheck.checked = checked;
    todoCheck.addEventListener("click",toDoDone);
    return todoCheck;
}

function todoTag(number : number, text : string) : HTMLLabelElement{
    const todo : HTMLLabelElement = document.createElement("label");
    todo.id = "todoLabel" + number;
    todo.classList.add("todo");
    todo.innerText = text;
    todo.htmlFor = "todoCheck" + number;
    return todo;
}
function deleteButtonTag(number : number) : HTMLButtonElement{
    const delBut : HTMLButtonElement = document.createElement("button");
    delBut.innerText="삭제";
    delBut.style.color="red";
    delBut.id = "todo"+number;
    delBut.addEventListener("click",delToDoLS);
    delBut.classList.add("delBut");
    return delBut;
}

function todoTrTag(checkbox : HTMLInputElement, label : HTMLLabelElement, button : HTMLButtonElement) : HTMLTableRowElement{
    const tr : HTMLTableRowElement = document.createElement("tr");
    const tdCheck : HTMLElement = document.createElement("td");
    const tdLabel = document.createElement("td");
    const tdButton = document.createElement("td");
    tr.prepend(tdCheck,tdLabel, tdButton);
    tdCheck.classList.add("tdCheck");
    tdCheck.prepend(checkbox);
    tdLabel.prepend(label);
    tdLabel.classList.add("todoInput");
    tdButton.prepend(button);
    return tr;
}

function addList(number : number, text : string, checked : boolean) : void{
    const todoCheck : HTMLInputElement = todoCheckTag(number, checked);
    const todo : HTMLLabelElement = todoTag(number, text);
    const delBut : HTMLButtonElement = deleteButtonTag(number);
    const tr = todoTrTag(todoCheck, todo, delBut);
    const doneList : HTMLTableSectionElement | null = document.querySelector("#doneList");
    const todoList : HTMLTableSectionElement | null = document.querySelector("#todoList");
    if(doneList==null||todoList==null){
        console.log("do something")
    }else{
        if(checked){
            todo.classList.add("checked");
            doneList.prepend(tr);
        }else{
            todoList.prepend(tr);
        }
    }
}

function delToDoLS(this: HTMLElement) : void{
    localStorage.removeItem(this.id);
    window.dispatchEvent(new Event('storage'));
}

function addToDoLS(text : string) : void{
    if(localStorage.getItem("number")==null) {
        localStorage.setItem("number", "0");
    }
    const number : string | null = localStorage.getItem("number");
    const todo : ToDo = new ToDo("todo" + number, false, text);
    localStorage.setItem("todo" + number,JSON.stringify(todo));
    if(localStorage.getItem("number")!=null) {
        localStorage.setItem("number", ""+(parseInt(<string>localStorage.getItem("number"))+1));
    }
    window.dispatchEvent(new Event('storage'));
}

function addToDo() : void{
    const toDoInput : HTMLInputElement | null = document.querySelector("#toDoInput");
    if(toDoInput==null){
        console.log("do something");
    }else{
        if(!(toDoInput?.value == null || toDoInput?.value.trim() == "")) {
            addToDoLS(toDoInput?.value);
        }
        else{
            toDoInput.focus();
        }
        toDoInput.value ="";
    }

}

function toDoDone(this: any) : void{
    let id : string = this.id;
    id = id.replace("todoCheck","todoLabel");
    const todo : HTMLLabelElement | null = document.querySelector("#"+id);
    id = id.replace("todoLabel","todo");
    const data = JSON.parse(<string>localStorage.getItem(id));
    if(todo==null){
        console.log("do something");
    }else{
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
    init();
}

function showDoneList() : void{
    const arrow : HTMLLabelElement | null = document.querySelector("#arrow");
    const doneList : HTMLTableSectionElement | null = document.querySelector("#doneList");
    if(doneList==null||arrow==null){
        console.log("do something");
    }else{
        if (arrow.innerText==">"){
            arrow.innerText="v";
            doneList.style.display = "";
        }else if (arrow.innerText=="v"){
            arrow.innerText=">";
            doneList.style.display = "none";
        }

    }
}
