var questionList;
var currentQ;
var score = 0;
var time;
var timer;
var currentTime;
var endTime;

$("#scoreButton").one("click", viewScoresBefore);


function beginQuiz() {
    $("#startButton").hide();
    $("#scoreButton").hide();
    $("#scoreButton").off();
    questionList = questions;
    time = (questions.length * 15);
    $(".timer").html(time);
    var answers = $(".answers");

    for (let i = 0; i < answers.length; i++) {
        answers[i].style.display = "block";
    }//for
    getQuestion();
    beginTimer();
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
    currentTime = time;
    if (questionList.length >= 1 && time > 0) {
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
        if (time <= 0) {
            endGame("time");
        }
        else {
            endGame("questions");
        }
    }
}//getQuestion

function wrongAnswer() {
    console.log("wrong answer");
    $("#response").html("Incorrect Answer");

    time -= 15;

    if (time <= 0) {

        endGame("time");
    }


    getQuestion();

}//wrong

function correctAnswer() {
    console.log("correct answer");
    $("#response").html("Correct Answer");

    //increase score by 1, then add bonus points if answered in 15 seconds or less
    score += 1;
    console.log("started at: " + currentTime);
    console.log("finished at: " + time);
    var diff = currentTime - time;
    if (diff <= 15) {
        console.log("added: " + (15 - diff));
        score += (15 - diff);
    }


    $(".score").html(score);
    getQuestion();

}//right

function beginTimer() {

    timer = setInterval(function () {
        time -= 1;
        $(".timer").html(time);
        if (time == 0) {
            clearInterval();
            endGame("time");
        }
    }, 1000)

}

function endGame(reason) {
    clearInterval(timer);
    if (reason === "time") {
        $(".timer").html("0");
        $("#questionHeader").html("You Ran Out Of Time!")
        $("#answers").html("Your score is: " + score);
    }//if out of time
    else {
        $(".timer").html("0");
        $("#questionHeader").html("Quiz Complete!")
        $("#answers").html("Your score is: " + score);
    }//if out of questions
    $("#response").hide()
    $("#scoreButton").show();
    $("#answers").append("<br/> <span id='tempP'>Initials: <input id='tempInput'></input></span>");
    $("#scoreButton").on("click", viewScoresAfter);
}

function viewScoresBefore() {
    $("#scoreButton").one("click", resetGame);
    console.log("view");
    $("#startButton").hide();
    $("#questionHeader").html("High Scores:");
    $("#scoreButton").html("Return to Game");
}

function resetGame() {
    $("#scoreButton").one("click", viewScoresBefore);
    console.log("reset");
    $("#startButton").show();
    $("#questionHeader").html("Press The Button To Begin The Quiz");
    $("#scoreButton").html("View High Scores");
}



function viewScoresAfter() {
    var initials = $("#tempInput").val();
    if (initials.length < 1 || initials.length > 3) {
        alert("initials must be 1-3 characters long")

    }
    else {
        console.log("initials are: "+initials);
        $("#scoreButton").hide();
        $("#questionHeader").html("High Scores:");
    }
}