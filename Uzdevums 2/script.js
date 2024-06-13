const quizData = [
    {
        question: "Kura ir Latvijas galvaspilsēta?",
        a: "Rīga",
        b: "Tallina",
        c: "Viļņa",
        d: "Helsinki",
        correct: "a"
    },
    {
        question: "Kas ir Latvijas nacionālais putns?",
        a: "Zvirbulis",
        b: "Baltā cielava",
        c: "Pūce",
        d: "Dzenis",
        correct: "b"
    },
    {
        question: "Kurā gadā Latvija iestājās Eiropas Savienībā?",
        a: "1995",
        b: "2000",
        c: "2004",
        d: "2010",
        correct: "c"
    },
    {
        question: "Kura upe ir garākā Latvijas teritorijā?",
        a: "Gauja",
        b: "Daugava",
        c: "Venta",
        d: "Lielupe",
        correct: "a"
    },
    {
        question: "Kurš bija Latvijas prezidents 2021. gadā?",
        a: "Andris Bērziņš",
        b: "Valdis Zatlers",
        c: "Egils Levits",
        d: "Raimonds Vējonis",
        correct: "c"
    },
    {
        question: "Kas ir Latvijas nacionālā zivs?",
        a: "Lasis",
        b: "Līdaka",
        c: "Reņģe",
        d: "Plicis",
        correct: "c"
    },
    {
        question: "Kurā pilsētā atrodas Latvijas Nacionālais teātris?",
        a: "Daugavpils",
        b: "Jelgava",
        c: "Rīga",
        d: "Ventspils",
        correct: "c"
    },
    {
        question: "Kas ir Latvijas nacionālais zieds?",
        a: "Pīpene",
        b: "Margarita",
        c: "Roze",
        d: "Ābeles zieds",
        correct: "a"
    },
    {
        question: "Kurš ir Latvijas nacionālais koks?",
        a: "Ozols",
        b: "Bērzs",
        c: "Ķirsis",
        d: "Ābele",
        correct: "a"
    },
    {
        question: "Kura ir lielākā pilsēta Kurzemē?",
        a: "Ventspils",
        b: "Liepāja",
        c: "Talsi",
        d: "Saldus",
        correct: "b"
    }
];

let currentQuestion = 0;
let score = 0;

const quiz = document.getElementById('quiz');
const results = document.getElementById('results');
const restartButton = document.getElementById('restart');
const scoreDisplay = document.getElementById('score');

function loadQuiz() {
    const currentQuizData = quizData[currentQuestion];
    quiz.innerHTML = `
        <div class="quiz-header">
            <h2>${currentQuizData.question}</h2>
            <label>
                <input type="radio" name="answer" value="a">
                <span>${currentQuizData.a}</span>
            </label>
            <label>
                <input type="radio" name="answer" value="b">
                <span>${currentQuizData.b}</span>
            </label>
            <label>
                <input type="radio" name="answer" value="c">
                <span>${currentQuizData.c}</span>
            </label>
            <label>
                <input type="radio" name="answer" value="d">
                <span>${currentQuizData.d}</span>
            </label>
        </div>
        <button onclick="submitQuiz()">Iesniegt</button>
    `;
}

function submitQuiz() {
    const answerEls = document.querySelectorAll('input[name="answer"]');
    let selectedAnswer;
    
    answerEls.forEach((answerEl) => {
        if (answerEl.checked) {
            selectedAnswer = answerEl.value;
        }
    });
    
    if (selectedAnswer) {
        const currentQuizData = quizData[currentQuestion];
        const quizHeader = quiz.querySelector('.quiz-header');

        if (selectedAnswer === currentQuizData.correct) {
            score++;
            scoreDisplay.textContent = score;
            quizHeader.classList.add('correct');
        } else {
            quizHeader.classList.add('incorrect');
        }
        
        setTimeout(() => {
            currentQuestion++;
            quizHeader.classList.remove('correct', 'incorrect');
            if (currentQuestion < quizData.length) {
                loadQuiz();
            } else {
                showResults();
            }
        }, 1000);
    } else {
        alert('Lūdzu, izvēlieties atbildi!');
    }
}

function showResults() {
    quiz.innerHTML = '';
    results.innerHTML = `
        <h2>Tu atbildēji pareizi uz ${score} no ${quizData.length} jautājumiem.</h2>
    `;
    restartButton.style.display = 'block';
}

function restartQuiz() {
    currentQuestion = 0;
    score = 0;
    scoreDisplay.textContent = score;
    results.innerHTML = '';
    restartButton.style.display = 'none';
    loadQuiz();
}

loadQuiz();
restartButton.style.display = 'none';
