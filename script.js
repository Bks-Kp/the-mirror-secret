// ==========================
// THE MIRROR'S SECRET — SCRIPT
// ==========================

// Smooth typewriter effect for narration
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

// Case-insensitive text answer checker
function checkTextAnswer(inputId, correctAnswer, altAnswers = [], nextPage) {
  const input = document.getElementById(inputId);
  const resultDiv = document.querySelector(".small");
  const userAnswer = input.value.trim().toLowerCase();
  const correct = correctAnswer.toLowerCase();

  // Convert all alternate answers to lowercase for case-insensitive check
  const allAnswers = [correct, ...altAnswers.map(a => a.toLowerCase())];

  if (allAnswers.includes(userAnswer)) {
    resultDiv.innerHTML = "💖 The mirror hums softly... your heart responds.";
    resultDiv.style.color = "crimson";
    saveProgress(nextPage);

    // Fade transition before moving to next chapter
    document.body.style.transition = "opacity 1.2s ease";
    document.body.style.opacity = "0";
    setTimeout(() => (window.location.href = nextPage), 1000);
  } else if (userAnswer.length > 0) {
    resultDiv.innerHTML = "The reflection remains silent... try again.";
    resultDiv.style.color = "#bbb";
  } else {
    resultDiv.innerHTML = "The mirror waits for your whisper...";
    resultDiv.style.color = "#888";
  }
}

// Optional — clear save (use if restarting)
function clearProgress() {
  localStorage.removeItem("progress");
}
