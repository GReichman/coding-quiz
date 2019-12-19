function beginQuiz(){
document.querySelector("#startButton").style.display="none";
var answers= document.querySelectorAll(".answers");
for(let i=0; i<answers.length; i++){
    answers[i].style.display="block";
}
}