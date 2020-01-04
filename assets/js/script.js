var questionList;
var currentQ;
var score = 0;
var time;
var timer;
var currentTime;
var endTime;
var hscores = [];
var currInitials = "";

$("#scoreButton").one("click", viewScoresBefore);
$("#startButton").one("click", beginQuiz);


function beginQuiz() {
    $("#startButton").hide();
    $("#scoreButton").hide();
    $("#scoreButton").off();
    $("#answers").show();
    questionList = questions.slice(0);
    console.log(questionList.length + " questions");
    time = (questions.length * 15);
    $(".timer").html(time);
    var answers = $(".answers");
    console.log(answers);
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
        $("#questionHeader").html("You Ran Out Of Time!");
        $("#answers").hide();
        $("#highscores").html("Your score is: " + score);
        $("#highscores").show();
    }//if out of time
    else {
        $(".timer").html("0");
        $("#questionHeader").html("Quiz Complete!")
        $("#answers").hide();
        $("#highscores").html("Your score is: " + score);
        $("#highscores").show();
    }//if out of questions
    $("#response").hide()
    $("#scoreButton").show();
    $("#highscores").append("<br/> <span id='tempP'>Initials: <input id='tempInput'></input></span>");
    $("#scoreButton").one("click", viewScoresAfter);
    $("#scoreButton").html("Submit")
}

function viewScoresBefore() {
    getScores();
    $("#scoreButton").one("click", resetGame);
    console.log("view");
    $("#startButton").hide();
    $("#questionHeader").html("High Scores:");
    displayScores();
    console.log(hscores);
    $("#highscores").show();
    $("#scoreButton").html("Return to Game");
}//view scores before game starts

function resetGame() {
    $("#scoreButton").one("click", viewScoresBefore);
    $("#highscores").empty();
    $("#highscores").hide();
    console.log("reset");
    $("#startButton").show();
    $("#questionHeader").html("Press The Button To Begin The Quiz");
    $("#scoreButton").html("View High Scores");
    $("#highscores").empty();
    $("#highscores").hide();
}//reset game back to start button



function viewScoresAfter() {
    getScores();
    var initials = $("#tempInput").val();
    if (initials.length < 1 || initials.length > 3) {
        alert("initials must be 1-3 characters long")
        $("#scoreButton").one("click", viewScoresAfter);

    }//if not enough initials
    else {
        console.log("initials are: " + initials);
        addScore(initials, score);
        $("#questionHeader").html("High Scores:");
        $("#tempP").remove();
        displayScores();
        $("#startButton").show();
        $("#startButton").html("Restart Game");
        $("#startButton").one("click", restartGame);
        $("#scoreButton").html("Clear Scores");
        $("#scoreButton").one("click", clearScores);

    }
}//view scores after game completes

function displayScores() {
    for (let i = 0; i < hscores.length; i++) {
        $("#highscores").append("<p>" + hscores[i].initials+" : "+hscores[i].score + " </p>");
    }//for
}//displays the scores to highscores div

function addScore(name, points) {
    // let record = name + ": " + points;
    let record = {
        initials: name,
        score: points
    };
    hscores.push(record);
    saveScores();
}//add new score to the array

function getScores() {
    var sc = JSON.parse(localStorage.getItem("scores"));
    if (sc != null && sc.length > 0) {
        hscores = sc;
        sortScores();
    }//retrieve scores from local storage

}//getScores

function saveScores() {
    sortScores();
    localStorage.setItem("scores", JSON.stringify(hscores));
}//save scores array to local storage

function clearScores() {
    localStorage.setItem("scores", null);
    hscores = [];
    $("#highscores").html("high scores have been cleared");
}//clear scores in local storage and array

function restartGame() {
    time = 0;
    timer = null;
    score=0;
    currentTime=0;
    endTime=0;

    $("#scoreButton").unbind();
    $("#scoreButton").one("click", viewScoresBefore);
    $("#scoreButton").html("View High Scores");
    $("#startButton").one("click", beginQuiz);
    $("#startButton").html("Start");
    $("#questionHeader").html("Press The Button To Begin The Quiz");
    $(".answers").html("Sample Answer");
    $("#highscores").empty();
    $("#highscores").hide();
    $(".score").html("0");
}//restart game after a playthrough has been completed

//https://www.sitepoint.com/sort-an-array-of-objects-in-javascript/
function sortScores(){

hscores=hscores.sort(sort);


}

function sort(a,b){

    let aScore = a.score;
    let bScore = b.score;
    let compare = 0;

    if(aScore>bScore){
        compare=-1;
    }
    else if(bScore > aScore){
        compare=1;
    }
    return compare;

}