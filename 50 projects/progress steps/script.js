var level = 1;
var bar = document.getElementById("prog");
var prev = document.getElementById("prev");
var next = document.getElementById("next");
var width = 0;

prev.disabled = true;

function clicked(act) {
    if (!(level == 1 && act == -1)) {
        if (!(level == 4 && act == 1)) {
            level += act;
            if(act == 1){
                width+=33;
            }else{
                width-=33;
            }
            console.log(width)
            bar.style.width = width.toString()+"%";
        }
    }
    console.log(level);
    if (level != 1) {
        prev.disabled = false;
    }
    if (level != 4) {
        next.disabled = false;
    }
    if (level == 1) {
        prev.disabled = true;
    }
    if (level == 4) {
        next.disabled = true;
    }
    if (act == 1) {
        document.getElementById(level).classList.add("active");
    } else {
        document.getElementById(level+1).classList.remove("active");
    }
}