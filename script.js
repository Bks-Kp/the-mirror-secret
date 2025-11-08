// ==========================
// THE MIRROR'S SECRET — SCRIPT
// ==========================

// Typewriter effect
function typeWriter(text, elementId, speed = 28, callback) {
  let i = 0;
  const el = document.getElementById(elementId);
  el.innerHTML = "";

  function typing() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else if (callback) callback();
  }
  typing();
}

// Save current chapter progress
function saveProgress(chapter) {
  localStorage.setItem("progress", chapter);
}

// ====== Case-insensitive exact or alternate match ======
function checkTextAnswer(inputId, correctAnswer, altAnswers = [], nextPage) {
  const input = document.getElementById(inputId);
  const resultDiv = document.querySelector(".small");
  if (!input || !resultDiv) return;

  const userAnswer = input.value.trim().toLowerCase();
  const correct = correctAnswer.trim().toLowerCase();
  const allAnswers = [correct, ...altAnswers.map(a => a.trim().toLowerCase())];
  const isCorrect = allAnswers.includes(userAnswer);

  if (isCorrect) handleCorrect(resultDiv, nextPage);
  else handleWrong(resultDiv, userAnswer);
}

// ====== Case-insensitive prefix (partial) match ======
function checkPrefixAnswer(inputId, correctKeyword, nextPage) {
  const input = document.getElementById(inputId);
  const resultDiv = document.querySelector(".small");
  if (!input || !resultDiv) return;

  const userAnswer = input.value.trim().toLowerCase();
  const key = correctKeyword.trim().toLowerCase();

  // allow "i remember your smile", "your smile", "smile always" etc.
  const isCorrect =
    userAnswer.includes(key) ||
    userAnswer.startsWith(key) ||
    userAnswer.endsWith(key);

  if (isCorrect) handleCorrect(resultDiv, nextPage);
  else handleWrong(resultDiv, userAnswer);
}

// ====== Shared feedback + transition ======
function handleCorrect(resultDiv, nextPage) {
  resultDiv.innerHTML = "💖 The mirror glows — the memory reforms...";
  resultDiv.style.color = "crimson";
  document.body.style.transition = "opacity 1.2s ease";
  document.body.style.opacity = "0";
  setTimeout(() => (window.location.href = nextPage), 1200);
}

function handleWrong(resultDiv, answer) {
  if (!answer) {
    resultDiv.innerHTML = "The mirror waits for your whisper...";
    resultDiv.style.color = "#888";
  } else {
    resultDiv.innerHTML = "The reflection stays silent... try again.";
    resultDiv.style.color = "#bbb";
  }
}

// Optional reset for replay
function clearProgress() {
  localStorage.removeItem("progress");
}
