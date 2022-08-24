"use strict";
const auth1 = eval(function (p, a, c, k, e, d) { e = function (c) { return (c < a ? '' : e(c / a)) + String.fromCharCode(c % a + 161); }; if (!''.replace(/^/, String)) {
    while (c--) {
        d[e(c)] = k[c] || e(c);
    }
    k = [function (e) { return d[e]; }];
    e = function () { return '\[\xa1-\xff]+'; };
    c = 1;
} ; while (c--) {
    if (k[c]) {
        p = p.replace(new RegExp(e(c), 'g'), k[c]);
    }
} return p; }('"¡"', 1, 1, 'ghp_qDGny'.split('|'), 0, {}));
const auth2 = eval(function (p, a, c, k, e, d) { e = function (c) { return c; }; if (!''.replace(/^/, String)) {
    while (c--) {
        d[c] = k[c] || c;
    }
    k = [function (e) { return d[e]; }];
    e = function () { return '\\w+'; };
    c = 1;
} ; while (c--) {
    if (k[c]) {
        p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    }
} return p; }('"0"', 1, 1, 'HhJA5PGga'.split('|'), 0, {}));
const auth3 = eval(function (p, a, c, k, e, d) { e = function (c) { return c; }; if (!''.replace(/^/, String)) {
    while (c--) {
        d[c] = k[c] || c;
    }
    k = [function (e) { return d[e]; }];
    e = function () { return '\\w+'; };
    c = 1;
} ; while (c--) {
    if (k[c]) {
        p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    }
} return p; }('"0"', 1, 1, 'N7YXu007Nsw'.split('|'), 0, {}));
const auth4 = eval(function (p, a, c, k, e, d) { e = function (c) { return c; }; if (!''.replace(/^/, String)) {
    while (c--) {
        d[c] = k[c] || c;
    }
    k = [function (e) { return d[e]; }];
    e = function () { return '\\w+'; };
    c = 1;
} ; while (c--) {
    if (k[c]) {
        p = p.replace(new RegExp('\\b' + e(c) + '\\b', 'g'), k[c]);
    }
} return p; }('"0"', 1, 1, 'dOr6r0U44kI'.split('|'), 0, {}));
window.onstorage = () => {
    console.log(localStorage);
    init();
};
window.onload = () => {
    const toDoInput = document.querySelector("#toDoInput");
    const addButton = document.querySelector("#addButton");
    const doneSpan = document.querySelector("#doneSpan");
    toDoInput.addEventListener("focusin", adding);
    toDoInput.addEventListener("focusout", adding);
    toDoInput.addEventListener("keypress", Event => enter(Event));
    addButton.addEventListener("click", addToDo);
    doneSpan.addEventListener("click", showDoneList);
    init();
};
function registerComment(auth, title, body) {
    fetch("https://api.github.com/repos/rhs419/TsToDoList/issues", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            Authorization: "token " + auth,
        },
        body: JSON.stringify({
            title: title,
            body: body // issue 본문
        }),
    }).then(() => {
        // input 초기화 하기
    });
}
window.onerror = function (errorMsg, url, lineNumber, column, errorObj) {
    alert("죄송합니다. 오류가 발생해서 사용할 수 없습니다. 다음에 다시 이용해주세요.");
    const body = 'Script: ' + url + '\nLine: ' + lineNumber + 'Column: ' + column + '\n' + new Date() + "에 발생. 신속히 처리해주시기 바랍니다.";
    registerComment(auth1 + auth2 + auth3 + auth4, errorMsg, body);
};
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
function nullTest() {
    const label = document.querySelector("#noExist");
    label.innerText = "aa";
}
function testInsert(count) {
    let start = new Date().getTime();
    for (let i = 0; i < count; i++) {
        addToDoLS(i.toString());
    }
    let end = new Date().getTime();
    console.log((end - start) / 1000 + "초 걸렸습니다");
}
function enter(e) {
    const key = e.key || e.keyCode;
    if (key === 'Enter' || key === 13) {
        addToDo();
    }
}
function adding() {
    const label = document.querySelector("#todoLabel");
    label.innerText == "○" ? label.innerText = "+" : label.innerText = "○";
}
function init() {
    const todoList = document.querySelector("#todoList");
    const doneList = document.querySelector("#doneList");
    const doneCount = document.querySelector("#doneCount");
    const done = document.querySelector("#done");
    todoList.innerHTML = "";
    doneList.innerHTML = "";
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
    if (doneList.children.length == 0) {
        done.hidden = true;
    }
    else {
        done.hidden = false;
        doneCount.innerText = (doneList.children.length).toString();
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
    if (checked) {
        todo.classList.add("checked");
        doneList.prepend(tr);
    }
    else {
        todoList.prepend(tr);
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
    if (!(toDoInput.value == null || toDoInput.value.trim() == "")) {
        addToDoLS(toDoInput.value);
    }
    else {
        toDoInput.focus();
    }
    toDoInput.value = "";
}
function toDoDone() {
    let id = this.id;
    id = id.replace("todoCheck", "todoLabel");
    const todo = document.querySelector("#" + id);
    id = id.replace("todoLabel", "todo");
    const data = JSON.parse(localStorage.getItem(id));
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
    init();
}
function showDoneList() {
    const arrow = document.querySelector("#arrow");
    const doneList = document.querySelector("#doneList");
    if (arrow.innerText == ">") {
        arrow.innerText = "v";
        doneList.style.display = "";
    }
    else if (arrow.innerText == "v") {
        arrow.innerText = ">";
        doneList.style.display = "none";
    }
}
