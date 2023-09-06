
result = document.getElementById("result");

function btnClicked(func){
    if (func != '=' && func != 'C'){
        result.innerHTML += func;
    }  
    if (func == "="){
        result.innerHTML = eval(result.innerHTML);
    }
    if (func == "C"){
        result.innerHTML = ""
    }

}
