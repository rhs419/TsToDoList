let adding : Function  = () =>{
    let label : HTMLElement | null = document.getElementById("todoLabel");
    if(label!=null){
        label.innerText="○";
    }
};

let noAdding : Function = () =>{
    let label : HTMLElement | null = document.getElementById("todoLabel");
    if(label!=null){
        label.innerText="+";
    }
};

window.onload = () =>{
    let toDoInput : HTMLElement | null = document.getElementById("toDoInput");
    if (toDoInput!=null){
        toDoInput.addEventListener("focusin",adding);
        toDoInput.addEventListener("focusout",noAdding);
    }
};


