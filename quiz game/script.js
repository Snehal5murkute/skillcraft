// script.js

const questions = [
  {
    question: "What does HTML stand for?",
    options: ["Hyper Text Markup Language", "HighText Machine Language", "Hyperloop Marking Language", "None of the above"],
    answer: 0
  },
  {
    question: "Which language is used for styling web pages?",
    options: ["HTML", "JQuery", "CSS", "XML"],
    answer: 2
  },
  {
    question: "Which is not a JavaScript Framework?",
    options: ["Python Script", "JQuery", "Django", "NodeJS"],
    answer: 0
  },
  {
    question: "Which is used to connect to a database?",
    options: ["PHP", "HTML", "JS", "All"],
    answer: 0
  },
  {
    question: "Which tag is used to define a hyperlink?",
    options: ["&lt;a&gt;", "&lt;link&gt;", "&lt;href&gt;", "&lt;hyper&gt;"],
    answer: 0
  },
  {
    question: "Inside which HTML element do we put the JavaScript?",
    options: ["&lt;js&gt;", "&lt;script&gt;", "&lt;javascript&gt;", "&lt;code&gt;"],
    answer: 1
  },
  {
    question: "Which of the following is a backend language?",
    options: ["CSS", "Python", "HTML", "Bootstrap"],
    answer: 1
  },
  {
    question: "React.js is mainly used for building?",
    options: ["Database", "Connectivity", "User interface", "Design Platform"],
    answer: 2
  },
  {
    question: "Which HTML attribute is used to define inline styles?",
    options: ["style", "class", "font", "styles"],
    answer: 0
  },
  {
    question: "Which of the following is not a programming language?",
    options: ["TypeScript", "HTML", "Python", "C++"],
    answer: 1
  }
];

const container = document.getElementById("questionsContainer");

questions.forEach((q, idx) => {
  const box = document.createElement("div");
  box.className = "box question-box";
  box.id = `q${idx}`;
  box.innerHTML = `<h3>${idx + 1}. ${q.question}</h3>`;
  q.options.forEach((opt, i) => {
    const optionId = `q${idx}_opt${i}`;
    box.innerHTML += `
      <div class="option" id="${optionId}">
        <label>
          <input type="radio" name="q${idx}" value="${i}">
          <span class="opt-text">${opt}</span>
        </label>
      </div>`;
  });
  container.appendChild(box);
});

let score = 0;

document.getElementById("quizForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const name = document.getElementById("name").value.trim();
  const contact = document.getElementById("contact").value.trim();
  const errorMsg = document.getElementById("errorMsg");

  if (!email || !name || !contact) {
    errorMsg.textContent = "Please fill all personal details!";
    errorMsg.style.display = "block";
    return;
  }

  for (let i = 0; i < questions.length; i++) {
    const selected = document.querySelector(`input[name="q${i}"]:checked`);
    if (!selected) {
      errorMsg.textContent = "Please answer all questions before submitting!";
      errorMsg.style.display = "block";
      return;
    }
  }

  errorMsg.style.display = "none";
  score = 0;

  questions.forEach((q, idx) => {
    const selected = document.querySelector(`input[name="q${idx}"]:checked`);
    const correctIndex = q.answer;

    q.options.forEach((_, i) => {
      const optionDiv = document.getElementById(`q${idx}_opt${i}`);
      const input = optionDiv.querySelector("input");
      const label = optionDiv.querySelector("label");

      const oldSymbol = label.querySelector(".symbol");
      if (oldSymbol) oldSymbol.remove();

      const symbol = document.createElement("span");
      symbol.classList.add("symbol");

      if (i === correctIndex) {
        symbol.textContent = "✅";
        symbol.classList.add("correct-symbol");
        label.appendChild(symbol);
      }

      if (selected && parseInt(selected.value) === i && i !== correctIndex) {
        symbol.textContent = "❌";
        symbol.classList.add("wrong-symbol");
        label.appendChild(symbol);
      }

      input.disabled = true;
    });

    if (selected && parseInt(selected.value) === correctIndex) {
      score++;
    }
  });

  document.getElementById("quizForm").style.display = "none";
  document.getElementById("quizHeader").style.display = "none";
  document.getElementById("techBox").style.display = "none";
  document.getElementById("detailsBox").style.display = "none";

  document.getElementById("scoreBox").style.display = "block";
});

function showScore() {
  const email = document.getElementById("email").value.trim();
  const name = document.getElementById("name").value.trim();
  const contact = document.getElementById("contact").value.trim();

  const quizHeader = document.getElementById("quizHeader");
  const techBox = document.getElementById("techBox");
  const bestMsg = document.getElementById("bestMsg");
  
  bestMsg.style.display = "none"
  quizHeader.style.display = "block";
  techBox.style.display = "block";
  document.getElementById("detailsBox").style.display = "none";
  document.getElementById("quizForm").style.display = "block";
  document.getElementById("quizForm").querySelector("button").style.display = "none";

  if (!document.getElementById("quizScore")) {
    quizHeader.innerHTML += `
      <p id="quizScore"><strong>Total Score: ${score} / 10</strong></p>
      <p><strong>Email:</strong> ${email}</p>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Contact:</strong> ${contact}</p>
    `;

    techBox.innerHTML += `
      <p id="techScore"><strong>Your Score: ${score} / 10</strong></p>
    `;
  }

  document.getElementById("scoreBox").style.display = "none";
  const detailsPara = document.querySelector("#detailsBox p");
  if (detailsPara) detailsPara.style.display = "none";
}
