$(document).ready(function() {
    // Create array of objects for questions and answers
    var questions = [{
        q: "How does Harry manage to breathe underwater during the second task of the Triwizard Tournament?",
        a: ["He transfigures into a shark", "He kisses a mermaid", "He eats gillyweed", "He performs a bubble-head charm"],
        correctAnsIndex: 2,
        img: "../images/"
    },
    {
        q: "What is the name of Fred and George's joke shop?",
        a: ["Weasley Joke Emporium", "Weasleys' Wizard Wheezes", "Fred & George's Wonder Emporium", "Zonko's Joke Shop"],
        correctAnsIndex: 1,
        img: "../images/"
    },
    {
        q: "Which of these is NOT one of the Unforgivable Curses?",
        a: ["Cruciatus Curse", "Imperius Curse", "Sectumsempra", "Avada Kedavra"],
        correctAnsIndex: 2,
        img: "../images/"
    },
    {
        q: "Who played Lord Voldemort in the movies?",
        a: ["Jeremy Irons", "Tom Hiddleston", "Gary Oldman", "Ralph Fiennes"],
        correctAnsIndex: 3,
        img: "../images/"
    },
    {
        q: "Who guards the entrance to the Gryffindor common room?",
        a: ["The Grey Lady", "The Fat Friar", "The Bloody Baron", "The Fat Lady"],
        correctAnsIndex: 3,
        img: "../images/"
    },
    {
        q: "Who is NOT a member of the Order of the Phoenix?",
        a: ["Cornelius Fudge", "Mad-Eye Moody", "Professor Snape", "Remus Lupin"],
        correctAnsIndex: 0,
        img: "../images/"
    },
    {
        q: "What does O.W.L. stand for?",
        a: ["Ordinary Wizarding Level", "Official Wizarding Level", "Outstanding Wizard Learning", "Outstanding Wonderful Luck"],
        correctAnsIndex: 0,
        img: "../images/"
    },
    {
        q: "Where does Hermione brew her first batch of Polyjuice Potion?",
        a: ["The Hogwarts Kitchen", "Moaning Myrtle's Bathroom", "The Room of Requirement", "The Gryffindor Common Room"],
        correctAnsIndex: 1,
        img: "../images/"
    },
    {
        q: "What's the name of Filch's cat?",
        a: ["Ser Pounce", "Buttercup", "Mrs. Norris", "Jones"],
        correctAnsIndex: 2,
        img: "../images/"
    },
    {
        q: "Which professor teaches flying lessons?",
        a: ["Professor Grubbly-Plank", "Sybill Trelawney", "Charity Burbage", "Madam Hooch"],
        correctAnsIndex: 3,
        img: "../images/"
    }];

    var qIndex = 0;
    var correctNum = 0;
    var incorrectNum = 0;
    var unansweredNum = 0;
    var secondsRemaining, questionIntervalId;

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

    $("#play-again-btn").on("click", function() {
        // Reset variablees
        qIndex = 0;
        correctNum = 0;
        incorrectNum = 0;
        unansweredNum = 0;

        // Show the first question
        $("#game-over-div").hide();
        showQuestion();
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
            $("#answer-txt").text("");
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
        $("#answer-img").attr("src", questions[qIndex].img);

        // Show the answer card
        $("#question-div").hide();
        $("#answer-div").show();

        // If this is the last question, show the game over screen
        qIndex++;
        if (qIndex < questions.length) {
            // Start timer to show next question
            setTimeout(showQuestion, 3000);
        } else {
            setTimeout(gameOver, 3000);
        }
    }

    function gameOver() {
        // Update the results
        $("#correct").text(correctNum);
        $("#incorrect").text(incorrectNum);
        $("#unanswered").text(unansweredNum);

        // Show the game over screen
        $("#answer-div").hide();
        $("#game-over-div").show();
    }
})