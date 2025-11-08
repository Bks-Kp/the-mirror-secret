// Save and load progress
function saveProgress(chapter) {
  localStorage.setItem("mirror_progress", chapter);
}
function loadProgress() {
  return localStorage.getItem("mirror_progress");
}

// Typewriter text effect
function typeWriter(text, id, speed = 28, callback) {
  let i = 0;
  const el = document.getElementById(id);
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

// Answer checker (case-insensitive)
function checkTextAnswer(inputId, correctAnswer, altAnswers = [], nextPage) {
  const input = document.getElementById(inputId);
  const resultDiv = document.querySelector(".small");
  if (!input || !resultDiv) return;

  const userAnswer = input.value.trim().toLowerCase();
  const allAnswers = [correctAnswer.toLowerCase(), ...altAnswers.map(a => a.toLowerCase())];

  if (allAnswers.includes(userAnswer)) {
    resultDiv.innerHTML = "💖 The mirror hums softly... your heart responds.";
    resultDiv.style.color = "crimson";
    document.body.style.transition = "opacity 1.2s ease";
    document.body.style.opacity = "0";
    setTimeout(() => (window.location.href = nextPage), 1200);
  } else if (userAnswer.length > 0) {
    resultDiv.innerHTML = "The reflection remains silent... try again.";
    resultDiv.style.color = "#bbb";
  } else {
    resultDiv.innerHTML = "The mirror waits for your whisper...";
    resultDiv.style.color = "#888";
  }
}

// Chapter 4 mirror choice
function handleChoice(choice) {
  const resultDiv = document.querySelector(".small");
  if (choice === "light") {
    resultDiv.innerHTML = "💖 The light mirror shimmers... truth shines through.";
    resultDiv.style.color = "crimson";
    document.body.style.transition = "opacity 1.2s ease";
    document.body.style.opacity = "0";
    setTimeout(() => (window.location.href = "chapter5.html"), 1200);
  } else {
    resultDiv.innerHTML = "The shadow consumes the reflection... try again.";
    resultDiv.style.color = "#bbb";
  }
}

// Final choice (ending)
function finalize(action) {
  const msg = document.getElementById("final-msg");
  if (action === "touched") {
    msg.innerHTML = "The light envelops her... truth is found.";
    msg.style.color = "crimson";
    setTimeout(() => (window.location.href = "ending.html"), 1500);
  } else {
    msg.innerHTML = "The mirror shatters... darkness wins.";
    msg.style.color = "#bbb";
    setTimeout(() => (window.location.href = "ending2.html"), 1500);
  }
}
