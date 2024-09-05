const startClickArea = document.getElementById('start-click-area');
const continueBtn = document.getElementById('continue-btn');
const nextBtn = document.getElementById('next-btn');
const homeBtn = document.getElementById('home-btn');
const startCard = document.getElementById('start-card');
const instructionsCard = document.getElementById('instructions-card');
const quizCard = document.getElementById('quiz-card');
const resultsCard = document.getElementById('results-card');

let currentQuestionIndex = 0;
let pasScore = 0;
let totalTime = 0;
let correctAnswers = 0;
let times = [];
let startTime = 0;

const quizData = [
    {
        question: "What year was the first permanent English colony in America founded?",
        answers: ["1607", "1587", "1620", "1565"],
        correct: 0
    },
    {
        question: "Which battle was the turning point of the American Revolution?",
        answers: ["Battle of Yorktown", "Battle of Saratoga", "Battle of Bunker Hill"],
        correct: 1
    },
    {
        question: "Who was the primary author of the Declaration of Independence?",
        answers: ["Thomas Jefferson", "George Washington", "John Adams", "Benjamin Franklin"],
        correct: 0
    },
    {
        question: "What was the name of the first U.S. constitution?",
        answers: ["The Bill of Rights", "Articles of Confederation", "Federalist Papers", "U.S. Constitution"],
        correct: 1
    },
    {
        question: "Which President made the Louisiana Purchase in 1803?",
        answers: ["George Washington", "John Adams", "Thomas Jefferson", "James Madison"],
        correct: 2
    },
    {
        question: "Which battle started the Civil War in 1861?",
        answers: ["Battle of Gettysburg", "Battle of Antietam", "Fort Sumter", "First Battle of Bull Run"],
        correct: 2
    },
    {
        question: "Who was President during the Civil War?",
        answers: ["Abraham Lincoln", "Andrew Johnson", "Ulysses S. Grant", "James Buchanan"],
        correct: 0
    },
    {
        question: "Which Constitutional amendment abolished slavery in the United States?",
        answers: ["13th Amendment", "14th Amendment", "15th Amendment", "16th Amendment"],
        correct: 0
    },
    {
        question: "What was the main goal of the Reconstruction period (1865-1877)?",
        answers: ["Expand westward", "Rebuild the South", "Defeat remaining Confederate forces", "Establish national parks"],
        correct: 1
    },
    {
        question: "What was a major cause of the Industrial Revolution in the U.S.?",
        answers: ["Increased immigration", "Technological innovations", "The end of slavery", "The discovery of gold"],
        correct: 1
    },
    {
        question: "Who was the leader of the Progressive movement in the early 1900s?",
        answers: ["Theodore Roosevelt", "Woodrow Wilson", "William Taft", "Calvin Coolidge"],
        correct: 0
    },
    {
        question: "What event sparked the start of World War I in 1914?",
        answers: ["Sinking of the Lusitania", "Assassination of Archduke Franz Ferdinand", "Zimmermann Telegram", "Treaty of Versailles"],
        correct: 1
    },
    {
        question: "What was the primary economic cause of the Great Depression?",
        answers: ["Overproduction and stock market speculation", "Lack of immigration", "Rising agricultural prices", "Increased defense spending"],
        correct: 0
    },
    {
        question: "Which U.S. President is associated with the New Deal programs?",
        answers: ["Franklin D. Roosevelt", "Herbert Hoover", "Harry Truman", "Dwight D. Eisenhower"],
        correct: 0
    },
    {
        question: "Which battle is considered the turning point in the Pacific during World War II?",
        answers: ["Battle of Midway", "Battle of Coral Sea", "D-Day", "Battle of Okinawa"],
        correct: 0
    },
    {
        question: "What was the purpose of the Marshall Plan after World War II?",
        answers: ["Rebuild Europe", "Create the United Nations", "Contain communism", "Aid Japan's recovery"],
        correct: 0
    },
    {
        question: "What was a major cause of the Cold War?",
        answers: ["Territorial disputes in Europe", "Nuclear weapons development", "Communism vs. Capitalism", "The fall of the Ottoman Empire"],
        correct: 2
    },
    {
        question: "Which landmark Supreme Court case ended segregation in public schools?",
        answers: ["Roe v. Wade", "Brown v. Board of Education", "Plessy v. Ferguson", "Dred Scott v. Sandford"],
        correct: 1
    },
    {
        question: "What was the U.S. goal in the Vietnam War?",
        answers: ["Defeat Japan", "Contain communism", "Expand democracy", "Protect oil resources"],
        correct: 1
    },
    {
        question: "Which President resigned after the Watergate scandal?",
        answers: ["Lyndon B. Johnson", "Richard Nixon", "Gerald Ford", "Jimmy Carter"],
        correct: 1
    },
    {
        question: "Which event is commonly regarded as the end of the Cold War?",
        answers: ["Fall of the Berlin Wall", "Cuban Missile Crisis", "Dissolution of the Soviet Union", "Reagan's 'Evil Empire' speech"],
        correct: 2
    },
    {
        question: "What was the main U.S. response to the 9/11 attacks?",
        answers: ["Invasion of Iraq", "Invasion of Afghanistan", "Sanctions on Iran", "Building border walls"],
        correct: 1
    },
    {
        question: "Who was the first African American President of the United States?",
        answers: ["Bill Clinton", "Barack Obama", "George W. Bush", "Joe Biden"],
        correct: 1
    },
    {
        question: "What global pandemic affected the U.S. starting in 2020?",
        answers: ["SARS", "COVID-19", "Ebola", "H1N1"],
        correct: 1
    },
    {
        question: "Which constitutional amendment grants women the right to vote?",
        answers: ["15th Amendment", "18th Amendment", "19th Amendment", "21st Amendment"],
        correct: 2
    }
];

startClickArea.addEventListener('click', () => {
    startCard.style.display = 'none';
    instructionsCard.style.display = 'block';
});

continueBtn.addEventListener('click', () => {
    instructionsCard.style.display = 'none';
    quizCard.style.display = 'block';
    loadQuestion();
});

function loadQuestion() {
    const questionData = quizData[currentQuestionIndex];
    const questionContainer = document.getElementById('question-container');
    let questionHTML = `<h6 class="mb-4">${questionData.question}</h6><div class="vstack gap-3">`;

    questionData.answers.forEach((answer, index) => {
        questionHTML += `
            <div>
                <div class="form-check">
                    <input class="form-check-input w-5 h-5 mt-0 rounded-circle border-dashed flex-none" type="radio" name="answer" value="${index}">
                    <a href="#" class="form-check-label font-regular ms-2">${answer}</a>
                </div>
            </div>
        `;
    });

    questionHTML += `</div>`;
    questionContainer.innerHTML = questionHTML;
    startTime = new Date().getTime();
}

nextBtn.addEventListener('click', () => {
    const selectedAnswer = document.querySelector('input[name="answer"]:checked');
    if (!selectedAnswer) {
        alert("Please select an answer!");
        return;
    }

    const endTime = new Date().getTime();
    const timeTaken = endTime - startTime;
    totalTime += timeTaken;
    const isCorrect = parseInt(selectedAnswer.value) === quizData[currentQuestionIndex].correct;
    if (isCorrect) correctAnswers++;
    pasScore += (timeTaken / 1000);
    if (!isCorrect) pasScore += 1;
    times.push({ timeTaken, correct: isCorrect });
    currentQuestionIndex++;

    if (currentQuestionIndex < quizData.length) {
        loadQuestion();
    } else {
        quizCard.style.display = 'none';
        showResults();
    }
});

function showResults() {
    resultsCard.style.display = 'block';
    document.getElementById('pas-result').textContent = pasScore.toFixed(2);
    document.getElementById('total-time-result').textContent = (totalTime / 1000).toFixed(2) + " Sec";
    document.getElementById('avg-time-result').textContent = ((totalTime / quizData.length) / 1000).toFixed(2) + " Sec";
    document.getElementById('correct-answers-result').textContent = `${((correctAnswers / quizData.length) * 100).toFixed(2)}% (${correctAnswers} out of ${quizData.length})`;
    const fastestTime = Math.min(...times.map(t => t.timeTaken));
    const slowestTime = Math.max(...times.map(t => t.timeTaken));
    const resultsTable = document.getElementById('results-table');
    let resultsHTML = '';

    times.forEach((time, index) => {
        let tag = '';
        if (time.timeTaken === fastestTime) {
            tag = '<span class="badge rounded-pill bg-soft-success text-success">Fastest</span>';
        } else if (time.timeTaken === slowestTime) {
            tag = '<span class="badge rounded-pill bg-soft-danger text-danger">Slowest</span>';
        }

        resultsHTML += `
            <tr>
                <td>
                    <div class="d-flex align-items-center">
                        <div class="icon icon-shape rounded-3 text-lg bg-primary text-white">
                            <i class="bi bi-ui-radios"></i>
                        </div>
                        <div class="ms-3">
                            <a class="d-inline-block h6 font-semibold mb-1" href="#">Question ${index + 1}</a>
                            <small class="d-block">Multiple Choice</small>
                        </div>
                    </div>
                </td>
                <td>${(time.timeTaken / 1000).toFixed(2)}</td>
                <td>${time.correct ? 'Correct' : 'Incorrect'}</td>
                <td>${(time.timeTaken / 1000).toFixed(2)} ${!time.correct ? '+ 1 penalty' : ''}</td>
                <td>${tag}</td>
            </tr>
        `;
    });

    resultsTable.innerHTML = resultsHTML;
    savePasToLocalStorage(pasScore);
    showHistoricalPas();
}

function savePasToLocalStorage(currentPas) {
    const pasHistory = JSON.parse(localStorage.getItem('pasHistory')) || [];
    pasHistory.push(currentPas);
    localStorage.setItem('pasHistory', JSON.stringify(pasHistory));
}

function showHistoricalPas() {
    const pasHistory = JSON.parse(localStorage.getItem('pasHistory')) || [];
    if (pasHistory.length > 1) {
        const previousPas = pasHistory[pasHistory.length - 2];
        const currentPas = pasHistory[pasHistory.length - 1];
        const improvementMessage = previousPas > currentPas ? 'Improved!' : 'Got worse!';
        const historicalPasMessage = `Previous PAS: ${previousPas.toFixed(2)} | Current PAS: ${currentPas.toFixed(2)} (${improvementMessage})`;
        document.getElementById('pas-comparison').textContent = historicalPasMessage;
    }
}

homeBtn.addEventListener('click', () => {
    location.reload();
});