var currentQ;


function beginQuiz() {
    $("#startButton").hide();
    var answers = $(".answers");
    
    for (let i = 0; i < answers.length; i++) {
        answers[i].style.display = "block";
    }//for
    getQuestion();
}//begin quiz

function chooseAnswer() {
    var choice = event.target.dataset.answer;
    if (event.target.tagName.toLowerCase() === 'p') {
       if(choice==currentQ.correct || currentQ.correct===5){
           correctAnswer();
           
       }
       else{
           wrongAnswer();
          
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
    console.log("wrong answer");
}//wrong

function correctAnswer(){
    console.log("correct answer");
}//right


