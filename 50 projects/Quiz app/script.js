var questions = [
    { "question": "Which language runs in a web browser?    ", "variants": ["Java", "Python", "C", "JavaScript"], "correct_answer": "JavaScript" },
    { "question": "What does CSS stand for?", "variants": ["Central Style Sheets", "Cascading Style Sheets", "Cascading Simple Sheets", "Cars SUVs Sailboats"], "correct_answer": "Cascading Style Sheets" },
    { "question": "Which character is used to indicate an end tag?", "variants": ["<", "/", "*", "="], "correct_answer": "/" },
    { "question": "What does HTML stand for?", "variants": ["Hypertext Markup Language", "Hypertext Markdown Language", "Hyperloop Machine Language", "Helicopters Terminals Motorboats Lamborginis"], "correct_answer": "Hypertext Markup Language" },
    { "question": "What year was JavaScript launched?", "variants": ["1996", "1995", "1994", "none of the above"], "correct_answer": "1995" }
];

var index = 0;
let last = questions.length - 1;
var upper = document.getElementById("upper");
var correct = 0;

showQuestion(index);

function showQuestion(i) {
    a = questions[i];
    v = a["variants"];
    inner = '<div class="question">' +
        a["question"] +
        '</div >' +
        ' <div class="variants">' +
        '<ol>' +
        '<li>' +
        '<input id="a" type="radio" name="variant" value="' + v[0] + '">' +
        '<label for="a">' + v[0] + '</label>' +
        ' </li>' +
        ' <li>' +
        '<input id="b" type="radio" name="variant" value="' + v[1] + '">' +
        '<label for="b">' + v[1] + '</label>' +
        ' </li>' +
        '<li>' +
        ' <input id="c" type="radio" name="variant" value="' + v[2] + '">' +
        ' <label class="third" for="c">' + v[2] + '</label>' +
        ' </li>' +
        '<li>' +
        '<input id="d" type="radio" name="variant" value="' + v[3] + '">' +
        '<label for="d">' + v[3] + '</label>' +
        '</li>' +
        '</ol>' +
        '</div>';
    upper.innerHTML = inner;
}
// You answered 0/4 questions correctly
function btnClicked() {
    if (document.querySelector('input[name="variant"]:checked')){
        a = questions[index];
        correct_answer = a["correct_answer"];
        answer = document.querySelector('input[name="variant"]:checked').value;
        if (correct_answer == answer ){
            correct ++;
        }
        if (index == last) {
            upper.innerHTML = "<div class = 'result'>You answered "+correct.toString()+"/"+questions.length.toString()+" questions correctly</div>";
            document.getElementById("submit").innerHTML = "Reload";
        } else {
            index += 1;
            showQuestion(index);
        }
    } else{
        if (document.getElementById("submit").innerHTML == "Reload"){
            index = 0;
            correct = 0;
            showQuestion(index);
            document.getElementById("submit").innerHTML = "Submit";
        }
    }
}