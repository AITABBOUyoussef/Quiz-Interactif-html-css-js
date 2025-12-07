const questionElement = document.getElementById("question");
const answerButtons = document.getElementById("answer-buttons");
const nextButton = document.getElementById("next-btn");
const timeText = document.getElementById("time-left");

const questions = [
    {
        question: "2+2=?",
        answers: [
            { text: "4", correct: true },
            { text: "0", correct: false },
            { text: "6", correct: false }
        ]
    },
    {
            question: "2*2=?",
            answers: [
                { text: "4", correct: true },
                { text: "8", correct: false },
            ]
        },
        {
                question: "20+8=?",
                answers: [
                    { text: "4", correct: false },
                    { text: "28", correct: true },
                ]
            },
            {
                    question: "3*5=?",
                    answers: [
                        { text: "15", correct: true },
                        { text: "6", correct: false },
                    ]
                },
                {
                        question: "2+5=?",
                        answers: [
                            { text: "7", correct: true },
                            { text: "6", correct: false },
                        ]
                    },
                    {
                            question: "4+5=?",
                            answers: [
                                { text: "8", correct: false },
                                { text: "9", correct: true },
                            ]
                        },
                        {
                                question: "6+8=?",
                                answers: [
                                    { text: "14", correct: true },
                                    { text: "20", correct: false },
                                ]
                            },
                            {
                                    question: "5*2=?",
                                    answers: [
                                        { text: "4", correct: false },
                                        { text: "10", correct: true },
                                    ]
                                },
                                {
                                        question: "1+2=?",
                                        answers: [
                                            { text: "3", correct: true },
                                            { text: "0", correct: false },
                                        ]
                                    },
                                    {
                                            question: "3+5=?",
                                            answers: [
                                                { text: "8", correct: true },
                                                { text: "5", correct: false },
                                            ]
                                        },


];

let currentQuestionIndex = 0;
let score = 0;
let timer;
let timeLeft = 9;
let questionNo = 0

function startQuiz() {
    currentQuestionIndex = 0;
    score = 0;
    nextButton.innerHTML = "Suivant";
    nextButton.onclick = null;
    showQuestion();
   
}

function showQuestion() {
    resetState();
    startTimer();

    let currentQuestion = questions[currentQuestionIndex];
    questionNo = currentQuestionIndex + 1;

    questionElement.innerHTML =  currentQuestion.question;

    currentQuestion.answers.forEach(answer => {
        const button = document.createElement("button");
        button.innerHTML = answer.text;
        button.classList.add("btn");
        answerButtons.appendChild(button);

        if(answer.correct) {
            button.dataset.correct = answer.correct;
        }

        button.addEventListener("click", selectAnswer);
        progressing()
    });
}


function resetState() {
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
        if(timeText) timeText.innerHTML = timeLeft;

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


nextButton.addEventListener("click", () => {
    if(nextButton.innerHTML === "Recommencer") return;
    currentQuestionIndex++;
    if(currentQuestionIndex < questions.length) {
        showQuestion();
    } else {
        showScore();
    }
});


function showScore() {
    resetState();

    if(timeText) timeText.innerHTML = "--";

    questionElement.innerHTML = `terminee! votre Score : ${score} / ${questions.length}`;
    nextButton.innerHTML = "Recommencer";
    nextButton.style.display = "block";


    nextButton.onclick = startQuiz;
}



function progressing() {
    const progressBar = document.getElementsByClassName("progress-bar")[0];
    
    let progressPercentage =  (questionNo * 100) / questions.length;
    progressBar.style.setProperty("--wid", progressPercentage);

    let questnumElement = document.getElementById("questnum")
    questnumElement.innerHTML = questionNo + " /" +questions.length
}




startQuiz();

