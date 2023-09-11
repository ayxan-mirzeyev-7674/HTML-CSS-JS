var input = document.getElementById("input");
var list = document.getElementById("list");
var inner = '';
var btns = document.querySelectorAll(".btn");

if(localStorage.getItem("Items")){
    inner = localStorage.getItem("Items");
    list.innerHTML = inner;
} else{
    localStorage.setItem("Items", "");
}

input.addEventListener("keypress", function(event) {
  if (event.key === "Enter") {
    event.preventDefault();
    s = '<li> <button oncontextmenu="rightClicked(event)" onclick="clicked(event)" class="btn">'+input.value+'</button> </li>';
    input.value = "";
    inner += s;
    localStorage.setItem("Items", inner);
    list.innerHTML += s;
  }
});

function clicked(event){
    if(event.button == 0){
        console.log("left");
        event.target.classList.toggle("completed");
        inner = list.innerHTML;
        localStorage.setItem("Items", inner);

    }
}
function rightClicked(event){
    event.preventDefault();
    console.log("right");
    event.target.parentElement.remove();
    inner = list.innerHTML;
    localStorage.setItem("Items", inner);
    return false;
}


