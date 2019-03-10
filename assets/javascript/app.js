$(document).ready(function() {
    // Create array of objects for questions and answers
    var questions = [{
        q: "q1 text q1 text q1 text q1 text?",
        a: ["a1_0 text", "a1_1 text", "a1_2 text", "a1_3 text"],
        correctAnsIndex: 0
    },
    {
        q: "q2 text q2 text q2 text q2 text?",
        a: ["a2_0 text", "a2_1 text", "a2_2 text", "a2_3 text"],
        correctAnsIndex: 2
    },
    {
        q: "q3 text q3 text q3 text q3 text?",
        a: ["a3_0 text", "a3_1 text", "a3_2 text", "a3_3 text"],
        correctAnsIndex: 1
    },
    {
        q: "q4 text q4 text q4 text q4 text?",
        a: ["a4_0 text", "a4_1 text", "a4_2 text", "a4_3 text"],
        correctAnsIndex: 3
    }];

    var qIndex = 0;
    var correctNum = 0;
    var incorrectNum = 0;
    var unansweredNum = 0;
    var secondsRemaining, questionIntervalId, answerTimerId;

    // Show only the start button
    $("#question-div").hide();
    $("#answer-div").hide();

    // Show first question when start button is clicked
    $("#start-btn").on("click", function() {
        // Hide the start button
        $("#start-btn").hide();
        
        // Show the first question
        showQuestion();
    })

    $(".answer-btn").on("click", function() {
        // Determine if correct answer was chosen and show the answer
        if (this.id.split("").pop() == questions[qIndex].correctAnsIndex) {
            showAnswer("CORRECT");
        } else {
            showAnswer("INCORRECT");
        }
    })

    function showQuestion() {
        // Update question text
        $("#question-txt").text(questions[qIndex].q);

        // Update answer choices
        for (var i = 0; i < 4; i++) {
            $("#answer-btn-" + i).text(questions[qIndex].a[i]);
        }

        // Show the question card
        $("#answer-div").hide();
        $("#question-div").show();

        // Start the timer
        secondsRemaining = 30;
        $("#time-remaining").text(secondsRemaining);
        questionIntervalId = setInterval(questionCountdown, 1000);
    }

    function questionCountdown() {
        secondsRemaining--;
        $("#time-remaining").text(secondsRemaining);

        if (secondsRemaining <= 0) {
            showAnswer("TIMEOUT")
        }
    }

    function showAnswer(result) {
        // Cancel the countdown timer
        clearInterval(questionIntervalId);

        // Update the correct/incorrect and answer text
        if (result === "CORRECT") {
            correctNum++;
            $("#result-txt").text("Correct!");
        } else if (result === "INCORRECT") {
            incorrectNum++;
            $("#result-txt").text("Incorrect");
            $("#answer-txt").text("The correct answer was: " + questions[qIndex].a[questions[qIndex].correctAnsIndex]);
        } else if (result === "TIMEOUT") {
            unansweredNum++;
            $("#result-txt").text("Time is up!");
            $("#answer-txt").text("The correct answer was: " + questions[qIndex].a[questions[qIndex].correctAnsIndex]);
        } else {
            console.log("Invalid argument value for showAnswer: " + result);
        }

        // Update the answer image


        // Show the answer card
        $("#question-div").hide();
        $("#answer-div").show();

        // Start timer to show next question
        qIndex++;
        setTimeout(showQuestion, 3000);
    }
})