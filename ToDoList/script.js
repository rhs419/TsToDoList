"use strict";
class ToDo {
    constructor(id, checked, text) {
        this.id = id;
        this.checked = checked;
        this.todoText = text;
    }
}
function test(count) {
    let start = new Date().getTime();
    for (let i = 0; i < count; i++) {
        addToDoLS(i.toString());
    }
    localStorage.clear();
    let end = new Date().getTime();
    console.log((end - start) / 1000 + "초 걸렸습니다");
}
function testInsert(count) {
    let start = new Date().getTime();
    for (let i = 0; i < count; i++) {
        addToDoLS(i.toString());
    }
    let end = new Date().getTime();
    console.log((end - start) / 1000 + "초 걸렸습니다");
}
window.onstorage = () => {
    console.log(localStorage);
    init();
};
window.onload = () => {
    const toDoInput = document.querySelector("#toDoInput");
    const addButton = document.querySelector("#addButton");
    const doneSpan = document.querySelector("#doneSpan");
    toDoInput === null || toDoInput === void 0 ? void 0 : toDoInput.addEventListener("focusin", adding);
    toDoInput === null || toDoInput === void 0 ? void 0 : toDoInput.addEventListener("focusout", adding);
    toDoInput === null || toDoInput === void 0 ? void 0 : toDoInput.addEventListener("keypress", Event => enter(Event));
    addButton === null || addButton === void 0 ? void 0 : addButton.addEventListener("click", addToDo);
    doneSpan === null || doneSpan === void 0 ? void 0 : doneSpan.addEventListener("click", showDoneList);
    init();
};
function enter(e) {
    let key = e.key || e.keyCode;
    if (key === 'Enter' || key === 13) {
        addToDo();
    }
}
function adding() {
    let label = document.querySelector("#todoLabel");
    if (label == null) {
        console.log("do something");
    }
    else {
        label.innerText == "○" ? label.innerText = "+" : label.innerText = "○";
    }
}
function init() {
    const todoList = document.querySelector("#todoList");
    const doneList = document.querySelector("#doneList");
    const doneCount = document.querySelector("#doneCount");
    const done = document.querySelector("#done");
    if (todoList == null || doneList == null) {
        console.log("뭐라도 해봐");
    }
    else {
        todoList.innerHTML = "";
        doneList.innerHTML = "";
    }
    let key = [];
    for (let i = 0; i < localStorage.length; i++) {
        const tmp = localStorage.key(i);
        if (tmp != "number" && tmp != null) {
            key.push(parseInt(tmp.replace("todo", "")));
        }
    }
    key.sort(compareNumbers);
    for (let i = 0; i < key.length; i++) {
        const data = JSON.parse(localStorage.getItem("todo" + key[i]));
        const number = key[i];
        addList(number, data.todoText, data.checked);
    }
    if (done == null || doneCount == null || doneList == null) {
        console.log("do something");
    }
    else {
        if ((doneList === null || doneList === void 0 ? void 0 : doneList.children.length) == 0) {
            done.hidden = true;
        }
        else {
            done.hidden = false;
            doneCount.innerText = (doneList.children.length).toString();
        }
    }
}
function compareNumbers(a, b) {
    return a - b;
}
function todoCheckTag(number, checked) {
    const todoCheck = document.createElement("input");
    todoCheck.type = "checkbox";
    todoCheck.classList.add("todo");
    todoCheck.id = "todoCheck" + number;
    todoCheck.checked = checked;
    todoCheck.addEventListener("click", toDoDone);
    return todoCheck;
}
function todoTag(number, text) {
    const todo = document.createElement("label");
    todo.id = "todoLabel" + number;
    todo.classList.add("todo");
    todo.innerText = text;
    todo.htmlFor = "todoCheck" + number;
    return todo;
}
function deleteButtonTag(number) {
    const delBut = document.createElement("button");
    delBut.innerText = "삭제";
    delBut.style.color = "red";
    delBut.id = "todo" + number;
    delBut.addEventListener("click", delToDoLS);
    delBut.classList.add("delBut");
    return delBut;
}
function todoTrTag(checkbox, label, button) {
    const tr = document.createElement("tr");
    const tdCheck = document.createElement("td");
    const tdLabel = document.createElement("td");
    const tdButton = document.createElement("td");
    tr.prepend(tdCheck, tdLabel, tdButton);
    tdCheck.classList.add("tdCheck");
    tdCheck.prepend(checkbox);
    tdLabel.prepend(label);
    tdLabel.classList.add("todoInput");
    tdButton.prepend(button);
    return tr;
}
function addList(number, text, checked) {
    const todoCheck = todoCheckTag(number, checked);
    const todo = todoTag(number, text);
    const delBut = deleteButtonTag(number);
    const tr = todoTrTag(todoCheck, todo, delBut);
    const doneList = document.querySelector("#doneList");
    const todoList = document.querySelector("#todoList");
    if (doneList == null || todoList == null) {
        console.log("do something");
    }
    else {
        if (checked) {
            todo.classList.add("checked");
            doneList.prepend(tr);
        }
        else {
            todoList.prepend(tr);
        }
    }
}
function delToDoLS() {
    localStorage.removeItem(this.id);
    window.dispatchEvent(new Event('storage'));
}
function addToDoLS(text) {
    if (localStorage.getItem("number") == null) {
        localStorage.setItem("number", "0");
    }
    const number = localStorage.getItem("number");
    const todo = new ToDo("todo" + number, false, text);
    localStorage.setItem("todo" + number, JSON.stringify(todo));
    if (localStorage.getItem("number") != null) {
        localStorage.setItem("number", "" + (parseInt(localStorage.getItem("number")) + 1));
    }
    window.dispatchEvent(new Event('storage'));
}
function addToDo() {
    const toDoInput = document.querySelector("#toDoInput");
    if (toDoInput == null) {
        console.log("do something");
    }
    else {
        if (!((toDoInput === null || toDoInput === void 0 ? void 0 : toDoInput.value) == null || (toDoInput === null || toDoInput === void 0 ? void 0 : toDoInput.value.trim()) == "")) {
            addToDoLS(toDoInput === null || toDoInput === void 0 ? void 0 : toDoInput.value);
        }
        else {
            toDoInput.focus();
        }
        toDoInput.value = "";
    }
}
function toDoDone() {
    let id = this.id;
    id = id.replace("todoCheck", "todoLabel");
    const todo = document.querySelector("#" + id);
    id = id.replace("todoLabel", "todo");
    const data = JSON.parse(localStorage.getItem(id));
    if (todo == null) {
        console.log("do something");
    }
    else {
        if (this.checked == true) {
            todo.classList.add("checked");
            data.checked = true;
            localStorage.setItem(id, JSON.stringify(data));
        }
        else {
            todo.classList.remove("checked");
            data.checked = false;
            localStorage.setItem(id, JSON.stringify(data));
        }
    }
    init();
}
function showDoneList() {
    const arrow = document.querySelector("#arrow");
    const doneList = document.querySelector("#doneList");
    if (doneList == null || arrow == null) {
        console.log("do something");
    }
    else {
        if (arrow.innerText == ">") {
            arrow.innerText = "v";
            doneList.style.display = "";
        }
        else if (arrow.innerText == "v") {
            arrow.innerText = ">";
            doneList.style.display = "none";
        }
    }
}
