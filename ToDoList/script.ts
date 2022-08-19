window.onload = () =>{
    let toDoInput : HTMLElement | null = document.getElementById("toDoInput");
    if (toDoInput!=null){
        toDoInput.addEventListener("focusin",adding);
        toDoInput.addEventListener("focusout",noAdding);
    }
};

function adding{
    let label : HTMLElement | null = document.getElementById("todoLabel");
    if(label!=null){
        label.innerText="○";
    }
};

function noAdding{
    let label : HTMLElement | null = document.getElementById("todoLabel");
    if(label!=null){
        label.innerText="+";
    }
};
