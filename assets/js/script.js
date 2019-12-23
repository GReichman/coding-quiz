function beginQuiz() {
    document.querySelector("#startButton").style.display = "none";
    var answers = document.querySelectorAll(".answers");
    var currentQ;
    for (let i = 0; i < answers.length; i++) {
        answers[i].style.display = "block";
    }//for
    getQuestion();
}//begin quiz

function chooseAnswer() {
    var test = event.target.dataset.answer;
    if (event.target.tagName.toLowerCase() === 'p') {
       if(test==currentQ.correct || currentQ.correct===5){
           correctAnswer();
           console.log("correct answer");
       }
       else{
           wrongAnswer();
           console.log("wrong answer");
       }
    }
}

function getQuestion() {
    currentQ = questions[4];
    console.log(currentQ.question);
    console.log(currentQ.answers);
    console.log(currentQ.correct);
    $("#questionHeader").html(currentQ.question);
    $("#answer1").html("1. " + currentQ.answers[0]);
    $("#answer2").html("2. " + currentQ.answers[1]);
    $("#answer3").html("3. " + currentQ.answers[2]);
    $("#answer4").html("4. " + currentQ.answers[3]);
}

function wrongAnswer(){

}//wrong

function correctAnswer(){

}//right


