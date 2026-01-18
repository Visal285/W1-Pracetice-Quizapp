// DOM ---------------------------------------------------------
const dom_start = document.querySelector("#start");
const dom_quiz = document.querySelector("#quiz");
const dom_score = document.querySelector("#scoreContainer");
const dom_edit = document.querySelector("#edit");

const dom_question = document.querySelector("#question");
const dom_choiceA = document.querySelector("#A");
const dom_choiceB = document.querySelector("#B");
const dom_choiceC = document.querySelector("#C");
const dom_choiceD = document.querySelector("#D");
const dom_questionList = document.querySelector("#questionList");

const dom_dialog = document.querySelector("#dialog");
const dom_dialogTitle = document.querySelector("#dialogTitle");
const dom_dialogQTitle = document.querySelector("#dialogQTitle");
const dom_dialogQA = document.querySelector("#dialogQA");
const dom_dialogQB = document.querySelector("#dialogQB");
const dom_dialogQC = document.querySelector("#dialogQC");
const dom_dialogQD = document.querySelector("#dialogQD");
const dom_dialogQCorrect = document.querySelector("#dialogQCorrect");

dom_start.addEventListener("click", onStart);

// DIALOG MANAGEMENT
let currentEditIndex = -1;

function openAddDialog() {
  currentEditIndex = -1;
  dom_dialogTitle.innerText = "Create new question";
  dom_dialogQTitle.value = "";
  dom_dialogQA.value = "";
  dom_dialogQB.value = "";
  dom_dialogQC.value = "";
  dom_dialogQD.value = "";
  dom_dialogQCorrect.value = "";
  dom_dialog.classList.add("open");
}

function openEditDialog(index) {
  currentEditIndex = index;
  const q = questions[index];
  dom_dialogTitle.innerText = "Edit question";
  dom_dialogQTitle.value = q.title;
  dom_dialogQA.value = q.choiceA;
  dom_dialogQB.value = q.choiceB;
  dom_dialogQC.value = q.choiceC;
  dom_dialogQD.value = q.choiceD;
  dom_dialogQCorrect.value = q.correct;
  dom_dialog.classList.add("open");
}

function closeDialog() {
  dom_dialog.classList.remove("open");
}

function saveQuestion() {
  const newQuestion = {
    title: dom_dialogQTitle.value,
    choiceA: dom_dialogQA.value,
    choiceB: dom_dialogQB.value,
    choiceC: dom_dialogQC.value,
    choiceD: dom_dialogQD.value,
    correct: dom_dialogQCorrect.value.toUpperCase(),
  };

  if (currentEditIndex === -1) {
    questions.push(newQuestion);
  } else {
    questions[currentEditIndex] = newQuestion;
  }
  
  renderQuestionList();
  closeDialog();
}

function deleteQuestion(index) {
  questions.splice(index, 1);
  renderQuestionList();
}

// DATA ---------------------------------------------------------
let questions = [
  {
    title: "What does HTML stand for?",
    choiceA: "Hi Thierry More Laught",
    choiceB: "How To move Left",
    choiceC: "Ho Theary Missed the Laundry !",
    choiceD: "Hypertext Markup Language",
    correct: "D",
  },
  {
    title: "What does CSS stand for?",
    choiceA: "Cisco and Super Start",
    choiceB: "Ci So Sa",
    choiceC: "Cascading Style Sheets",
    choiceD: "I don't know!",
    correct: "C",
  },
  {
    title: "What does JS stand for?",
    choiceA: "Java System",
    choiceB: "JavaScript",
    choiceC: "Just Script",
    choiceD: "Job Storage",
    correct: "B",
  }
];

let runningQuestionIndex = 0;
let score = 0;

// VIEW HELPERS ---------------------------------------------------------
function hide(el) { el.style.display = "none"; }
function show(el) { el.style.display = "block"; }

function hideAll() {
  hide(dom_start);
  hide(dom_quiz);
  hide(dom_score);
  hide(dom_edit);
}

// PLAY ---------------------------------------------------------
function onStart() {
  runningQuestionIndex = 0;
  score = 0;
  hideAll();
  show(dom_quiz);
  renderQuestion();
}

function renderQuestion() {
  let q = questions[runningQuestionIndex];
  dom_question.innerText = q.title;
  dom_choiceA.innerText = q.choiceA;
  dom_choiceB.innerText = q.choiceB;
  dom_choiceC.innerText = q.choiceC;
  dom_choiceD.innerText = q.choiceD;
}

function onPlayerSubmit(answer) {
  if (answer === questions[runningQuestionIndex].correct) {
    score += 20;
  }

  runningQuestionIndex++;

  if (runningQuestionIndex < questions.length) {
    renderQuestion();
  } else {
    renderScore();
  }
}

function renderScore() {
  hideAll();
  show(dom_score);

  let percent = Math.round(score / (questions.length * 20) * 100);
  
  let emoji = "😠";
  if (percent >= 20 && percent < 40) emoji = "😢";
  else if (percent >= 40 && percent < 60) emoji = "😐";
  else if (percent >= 60 && percent < 80) emoji = "😊";
  else if (percent >= 80) emoji = "😄";
  
  dom_score.innerHTML = `
    <div>
      <h2>Score</h2>
      <p>${percent}% ${emoji}</p>
    </div>
  `;
}

// EDITION VIEW ---------------------------------------------------------
function goEdit() {
  hideAll();
  show(dom_edit);
  renderQuestionList();
}

function renderQuestionList() {
  dom_questionList.innerHTML = "";
  questions.forEach((q, i) => {
    dom_questionList.innerHTML += `
      <li class="question-item">
        <div class="question-item-text">${i + 1}. ${q.title}</div>
        <div class="question-actions">
          <button class="icon-btn edit-icon" onclick="openEditDialog(${i})" title="Edit">✏️</button>
          <button class="icon-btn delete-icon" onclick="deleteQuestion(${i})" title="Delete">✕</button>
        </div>
      </li>
    `;
  });
}

// NAV ---------------------------------------------------------
function goPlay() {
  hideAll();
  show(dom_start);
}

// INIT ---------------------------------------------------------
hideAll();
show(dom_start);
