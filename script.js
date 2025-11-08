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

// Save progress
function saveProgress(chapter) {
  localStorage.setItem("progress", chapter);
}

// Main Answer Checker (now fully working + case-insensitive)
function checkTextAnswer(inputId, correctAnswer, altAnswers = [], nextPage) {
  const input = document.getElementById(inputId);
  const resultDiv = document.querySelector(".small");

  if (!input || !resultDiv) return;

  const userAnswer = input.value.trim().toLowerCase();
  const correct = correctAnswer.toLowerCase();
  const allAnswers = [correct, ...altAnswers.map(a => a.toLowerCase())];

  if (allAnswers.includes(userAnswer)) {
    resultDiv.innerHTML = "💖 The mirror hums softly... your heart responds.";
    resultDiv.style.color = "crimson";

    // Save progress
    saveProgress(nextPage);

    // Fade out transition before redirect
    document.body.style.transition = "opacity 1.2s ease";
    document.body.style.opacity = "0";

    // Add delay then redirect to next chapter
    setTimeout(() => {
      console.log("Redirecting to:", nextPage);
      window.location.href = nextPage; // ✅ Proper redirect
    }, 1200);
  } else if (userAnswer.length > 0) {
    resultDiv.innerHTML = "The reflection remains silent... try again.";
    resultDiv.style.color = "#bbb";
  } else {
    resultDiv.innerHTML = "The mirror waits for your whisper...";
    resultDiv.style.color = "#888";
  }
}

// Optional reset for restart
function clearProgress() {
  localStorage.removeItem("progress");
}
