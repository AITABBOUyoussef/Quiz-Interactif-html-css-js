const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timeText = document.getElementById("time-left");

let currentCategory = "";
let questions = [];
let totalScore = 0;

const questionsParCategory = {
    maths: [
        { question: "2+2=?", answers: [{ text: "4", correct: true }, { text: "0", correct: false }] },
        { question: "2*2=?", answers: [{ text: "4", correct: true }, { text: "8", correct: false }] },
        { question: "20+8=?", answers: [{ text: "28", correct: true }, { text: "4", correct: false }] },
        { question: "3*5=?", answers: [{ text: "15", correct: true }, { text: "6", correct: false }] },
        { question: "2+5=?", answers: [{ text: "7", correct: true }, { text: "6", correct: false }] },
    ],

    culture: [
        { question: "Qui a peint La Joconde ?", answers: [
            { text: "Leonardo da Vinci", correct: true },
            { text: "Picasso", correct: false }
        ]},
        { question: "Capitale de l'Espagne ?", answers: [
            { text: "Madrid", correct: true },
            { text: "Barcelona", correct: false }
        ]},
    ],

    sciences: [
        { question: "La planète la plus proche du soleil ?", answers: [
            { text: "Mercure", correct: true },
            { text: "Mars", correct: false }
        ]},
        { question: "L’eau bout à ?", answers: [
            { text: "100°C", correct: true },
            { text: "80°C", correct: false }
        ]},
    ]
};


function pickCategory(cat, btn) {
    currentCategory = cat;

  
    document.querySelectorAll(".category-button").forEach(b => b.classList.remove("selected"));
    btn.classList.add("selected");

    questions = questionsParCategory[currentCategory];

    startQuiz();
}

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 9;
let questionNo = 0

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    document.getElementById("total-score").innerText = 0;
    nextButton.innerHTML = "Suivant";

       nextButton.removeEventListener("click", startQuiz);
    nextButton.addEventListener("click", handleNextClick);
    showQuestion();
   
}

function showQuestion() {
    resetState();
    startTimer();

    let currentQuestion = questions[currentQuestionIndex];
    questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML = (currentQuestionIndex + 1) + ". " + currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");

        if(answer.correct) {
            button.dataset.correct = "true";
        }

        button.addEventListener("click", selectAnswer);
        progressing()
           answerButtons.appendChild(button);
    });
}


function resetState() {
      clearInterval(timer);
    nextButton.style.display = "none";
    
    clearInterval(timer);

    while(answerButtons.firstChild) {
        answerButtons.removeChild(answerButtons.firstChild);
    }
}

function startTimer() {
    timeLeft = 9;
    if(timeText) timeText.innerHTML = timeLeft;

    timer = setInterval(() => {
        timeLeft--;
        timeText.innerHTML = timeLeft;

        if (timeLeft <= 0) {
            currentQuestionIndex++
            clearInterval(timer);
            handleTimeOut();
            
        }
    }, 1000);
}

function handleTimeOut() {
    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });
    nextButton.style.display = "block";
    
}

function selectAnswer(e) {
    clearInterval(timer);
    
    const selectedBtn = e.target;
    const isCorrect = selectedBtn.dataset.correct === "true";

    if(isCorrect) {
        selectedBtn.classList.add("correct");
        score++;
        document.getElementById("total-score").innerText = score;
    } else {
        selectedBtn.classList.add("incorrect");
        
    }


    Array.from(answerButtons.children).forEach(button => {
        if(button.dataset.correct === "true") {
            button.classList.add("correct");
        }
        button.disabled = true;
    });

    nextButton.style.display = "block";
    
}


function handleNextClick() {
    currentQuestionIndex++;

    if (currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
}

nextButton.addEventListener("click", handleNextClick);


function showScore() {
    resetState();

    if(timeText) timeText.innerHTML = "--";

    questionElement.innerHTML = `terminee! votre Score : ${score} / ${questions.length}`;
    nextButton.innerHTML = "Recommencer";
    nextButton.style.display = "block";


    nextButton.removeEventListener("click", handleNextClick);
    nextButton.addEventListener("click", startQuiz);
}



function progressing() {
    const progressBar = document.getElementsByClassName("progress-bar")[0];
    
    let progressPercentage =  (questionNo * 100) / questions.length;
    progressBar.style.setProperty("--wid", progressPercentage);

    let questnumElement = document.getElementById("questnum")
    questnumElement.innerHTML = questionNo + " /" +questions.length
}




startQuiz();

questionElement.innerHTML = "Choisissez une catégorie";
timeText.innerHTML = "--";
