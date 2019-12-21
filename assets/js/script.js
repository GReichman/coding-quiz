function beginQuiz(){
document.querySelector("#startButton").style.display="none";
var answers= document.querySelectorAll(".answers");
var currentQ;
for(let i=0; i<answers.length; i++){
    answers[i].style.display="block";
}//for
getQuestion();
}//begin quiz

function chooseAnswer(){
    var test = event.target.dataset.answer;
    console.log(test);
    if(event.target.tagName.toLowerCase()==='p'){
    console.log("is it a paragraph? ");}
//    console.log( event.target.dataset.answer);
}

function getQuestion(){
    currentQ=questions[0];
    console.log(currentQ.question);
    console.log(currentQ.answers);
    console.log(currentQ.correct);
}