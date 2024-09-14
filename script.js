// Questions Array
const questions = [
    { question: "Which is a common symptom of hypertension?", options: ["Headache", "Cough", "Fever", "Cold"], correct: "Headache" },
    { question: "Is smoking a risk factor for heart disease?", options: ["Yes", "No"], correct: "Yes" }
];

let currentQuestion = 0;
let score = 0;
let timeLeft = 60; // Set the total time for the quiz

// Function to show questions
function showQuestion() {
    const questionElement = document.getElementById("question");
    const optionsElement = document.getElementById("options");

    questionElement.textContent = questions[currentQuestion].question;
    optionsElement.innerHTML = '';

    questions[currentQuestion].options.forEach(option => {
        const label = document.createElement('label');
        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'option';
        input.value = option;
        label.appendChild(input);
        label.appendChild(document.createTextNode(option));
        optionsElement.appendChild(label);
        optionsElement.appendChild(document.createElement('br'));
    });
}

// Function to move to the next question
function nextQuestion() {
    const selectedOption = document.querySelector('input[name="option"]:checked');
    if (selectedOption) {
        if (selectedOption.value === questions[currentQuestion].correct) {
            score++;
        }

        currentQuestion++;
        if (currentQuestion < questions.length) {
            showQuestion();
        } else {
            showResults();
        }
    } else {
        alert('Please select an answer!');
    }
}

// Function to show results and store in localStorage
function showResults() {
    document.getElementById("quiz-container").style.display = "none";
    document.getElementById("result").style.display = "block";

    const scoreText = `You got ${score} out of ${questions.length} correct!`;
    document.getElementById("score").textContent = scoreText;

    localStorage.setItem('quizScore', score);
    localStorage.setItem('totalQuestions', questions.length);
}

// Timer function
function startTimer() {
    const timerElement = document.getElementById("timer");

    const timerInterval = setInterval(function () {
        timeLeft--;
        timerElement.textContent = `Time left: ${timeLeft} seconds`;

        if (timeLeft <= 0) {
            clearInterval(timerInterval);
            alert("Time's up! Your assessment will be submitted.");
            showResults();
        }
    }, 1000);
}

// Function to show stored results on page load
function showStoredResults() {
    const storedScore = localStorage.getItem('quizScore');
    const totalQuestions = localStorage.getItem('totalQuestions');

    if (storedScore !== null && totalQuestions !== null) {
        alert(`Your last quiz score was: ${storedScore} out of ${totalQuestions}`);
    }
}

// Start the quiz
showQuestion();
startTimer();
showStoredResults(); // Show stored results if available

