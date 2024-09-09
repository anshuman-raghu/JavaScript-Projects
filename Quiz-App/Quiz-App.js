document.addEventListener("DOMContentLoaded", () => {
    const quizOptionsContainer = document.getElementById(
        "quizOptionsContainer"
    );
    const QuestionContainer = document.getElementById("QuestionContainer");
    const resultContainer = document.getElementById("resultContainer");
    const instructionContainer = document.getElementById(
        "instructionContainer"
    );
    const quizTopic = document.getElementById("quizTopic");
    const noOfQuestion = document.getElementById("noOfQuestion");
    const questionText = document.getElementById("questionText");
    const ChoiceList = document.getElementById("ChoiceList");
    const scoreDisplay = document.getElementById("score");
    const restart = document.getElementById("restart");
    const nextQuestion = document.getElementById("nextQuestion");

    let questions = [
        {
            question: "What is the name of the longest river in India?",
            options: ["Yamuna", "Ganges", "Brahmaputra", "Godavari"],
            answer: "Ganges",
        },
        {
            question: "Who was the first woman Prime Minister of India?",
            options: [
                "Sarojini Naidu",
                "Indira Gandhi",
                "Pratibha Patil",
                "Sushma Swaraj",
            ],
            answer: "Indira Gandhi",
        },
        {
            question: "Which Indian city is known as the 'Pink City'?",
            options: ["Udaipur", "Jodhpur", "Jaipur", "Jaisalmer"],
            answer: "Jaipur",
        },
        {
            question:
                "What is the name of the classical dance form that originated in Tamil Nadu?",
            options: ["Kathak", "Bharatanatyam", "Odissi", "Sattriya"],
            answer: "Bharatanatyam",
        },
    ];
    let curQuesIdx = 0;
    let curSelectedOption = null;
    let score = 0;

    function startQuiz() {
        curQuesIdx = 0;
        curSelectedOption = null;
        score = 0;
        quizOptionsContainer.classList.add("hidden");
        resultContainer.classList.add("hidden");
        QuestionContainer.classList.remove("hidden");

        displayQuestion(curQuesIdx);
    }

    quizOptionsContainer.addEventListener("submit", (e) => {
        e.preventDefault();
        startQuiz();
    });

    restart.addEventListener("click", () => {
        startQuiz();
    });

    function DisplayScore() {
        scoreDisplay.innerText = `${score} / ${questions.length}`;
    }

    function displayQuestion(index) {
        console.log(index);

        if (index >= questions.length) {
            quizOptionsContainer.classList.add("hidden");
            resultContainer.classList.remove("hidden");
            QuestionContainer.classList.add("hidden");
            DisplayScore();
        } else {
            questionText.innerText = questions[index].question;
            ChoiceList.innerHTML = ``;
            curSelectedOption = null;

            questions[index].options.forEach((option) => {
                const li = document.createElement("li");
                li.textContent = option;
                ChoiceList.append(li);
            });
        }
    }

    ChoiceList.addEventListener("click", (e) => {
        if (e.target.tagName != "LI") {
            return;
        }
        curSelectedOption = e.target;

        let allChoices = ChoiceList.querySelectorAll("li");

        allChoices.forEach((choice) => {
            choice.classList.remove("selected");
        });

        curSelectedOption.classList.add("selected");
    });
    function checkAnswerAndUpdateScore() {
        if (curSelectedOption == null) {
            console.warn("please Select a option");
        }
        let answer = questions[curQuesIdx].answer;
        if (answer == curSelectedOption.innerText) {
            score++;
        }

        let allChoices = ChoiceList.querySelectorAll("li");

        allChoices.forEach((choice) => {
            if (choice.innerText == answer) {
                choice.classList.add("right");
            }
        });
    }
    nextQuestion.addEventListener("click", () => {
        checkAnswerAndUpdateScore();
        setTimeout(() => {
            displayQuestion(++curQuesIdx);
        }, 500);
    });
});
