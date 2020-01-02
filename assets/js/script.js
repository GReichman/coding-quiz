var questionList;
var currentQ;
var score = 0;

function beginQuiz() {
    $("#startButton").hide();
    questionList = questions;
    var answers = $(".answers");

    for (let i = 0; i < answers.length; i++) {
        answers[i].style.display = "block";
    }//for
    getQuestion();
}//begin quiz

function chooseAnswer() {
    var choice = event.target.dataset.answer;
    if (event.target.tagName.toLowerCase() === 'p') {
        if (choice == currentQ.correct || currentQ.correct === 5) {
            correctAnswer();

        }
        else {
            wrongAnswer();

        }
    }
}

function getQuestion() {
    if (questionList.length >= 1) {
        var pos = Math.floor(Math.random() * questionList.length);
        currentQ = questionList[pos];
        console.log(currentQ.question);
        console.log(currentQ.answers);
        console.log(currentQ.correct);
        $("#questionHeader").html(currentQ.question);
        $("#answer1").html("1. " + currentQ.answers[0]);
        $("#answer2").html("2. " + currentQ.answers[1]);
        $("#answer3").html("3. " + currentQ.answers[2]);
        $("#answer4").html("4. " + currentQ.answers[3]);
        questionList.splice(pos, 1);
    }//if there are still questions left
    else {
        alert("Game Over");
    }
}//getQuestion

function wrongAnswer() {
    console.log("wrong answer");
    $("#response").html("Incorrect Answer");
    getQuestion();

}//wrong

function correctAnswer() {
    console.log("correct answer");
    $("#response").html("Correct Answer");
    score += 15;
    $(".score").html(score);
    getQuestion();

}//right


