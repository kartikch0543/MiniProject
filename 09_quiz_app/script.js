const questions = [
    {
        q: "What does HTML stand for?",
        options: ["Hyper Text Preprocessor", "Hyper Text Markup Language", "Hyper Tool Multi Language", "Hyper Text Multiple Language"],
        a: 1
    },
    {
        q: "What does CSS stand for?",
        options: ["Common Style Sheet", "Colorful Style Sheet", "Computer Style Sheet", "Cascading Style Sheet"],
        a: 3
    },
    {
        q: "Which tag is used for JS?",
        options: ["<javascript>", "<js>", "<script>", "<code >"],
        a: 2
    },
    {
        q: "Which is not a JS Framework?",
        options: ["Python Script", "Vue", "React", "Angular"],
        a: 0
    },
    {
        q: "How do you declare a variable in ES6?",
        options: ["var", "dim", "let / const", "variable"],
        a: 2
    }
];

let currentQ = 0;
let score = 0;
let canAnswer = false;

const startScreen = document.getElementById('startInfo');
const quizScreen = document.getElementById('quizScreen');
const resultScreen = document.getElementById('resultScreen');

const qText = document.getElementById('questionText');
const optionsGrid = document.getElementById('optionsGrid');
const nextBtn = document.getElementById('nextBtn');
const progressBar = document.getElementById('progress');
const qCount = document.getElementById('qCount');
const scoreDisplay = document.getElementById('score');

function startQuiz() {
    startScreen.classList.remove('active');
    quizScreen.classList.add('active');
    currentQ = 0;
    score = 0;
    loadQuestion();
}

function loadQuestion() {
    const data = questions[currentQ];
    qText.innerText = data.q;
    optionsGrid.innerHTML = '';

    // Update UI
    qCount.innerText = `Q: ${currentQ + 1}/${questions.length}`;
    scoreDisplay.innerText = `Score: ${score}`;
    progressBar.style.width = `${((currentQ) / questions.length) * 100}%`;

    data.options.forEach((opt, index) => {
        const btn = document.createElement('button');
        btn.className = 'option-btn';
        btn.innerText = opt;
        btn.onclick = () => checkAnswer(index, btn);
        optionsGrid.appendChild(btn);
    });

    nextBtn.disabled = true;
    canAnswer = true;
}

function checkAnswer(selected, btn) {
    if (!canAnswer) return;
    canAnswer = false;

    const correct = questions[currentQ].a;

    if (selected === correct) {
        btn.classList.add('correct');
        score += 10;
        scoreDisplay.innerText = `Score: ${score}`;
    } else {
        btn.classList.add('wrong');
        // Show correct one
        optionsGrid.children[correct].classList.add('correct');
    }

    nextBtn.disabled = false;
}

function nextQuestion() {
    currentQ++;
    if (currentQ < questions.length) {
        loadQuestion();
    } else {
        endQuiz();
    }
}

function endQuiz() {
    quizScreen.classList.remove('active');
    resultScreen.classList.add('active');
    document.getElementById('finalScore').innerText = `You scored ${score} out of ${questions.length * 10}`;
}

function restartQuiz() {
    resultScreen.classList.remove('active');
    startScreen.classList.add('active');
}
