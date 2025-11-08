// script.js — shared logic for The Mirror’s Secret 🩸

// Typewriter effect for story text
function typeWriter(text, elementId, speed = 28, callback) {
  let i = 0;
  const el = document.getElementById(elementId);
  function typing() {
    if (i < text.length) {
      el.innerHTML += text.charAt(i);
      i++;
      setTimeout(typing, speed);
    } else if (callback) callback();
  }
  typing();
}

// Auto-expand the input box width to match user typing
document.addEventListener('DOMContentLoaded', () => {
  const input = document.querySelector('input[type="text"]');
  if (input) {
    input.addEventListener('input', () => {
      input.style.width = Math.max(120, input.value.length * 9) + 'px';
    });
  }
});

// Answer validation logic for each chapter
function checkAnswer(correctAnswer, nextChapter) {
  const input = document.getElementById('answerInput');
  const result = document.getElementById('result');
  const userAnswer = input.value.trim().toLowerCase();

  if (userAnswer === correctAnswer.toLowerCase()) {
    result.innerHTML = "💖 The mirror accepts your answer...";
    result.style.color = 'crimson';
    setTimeout(() => (window.location.href = nextChapter), 2000);
  } else if (userAnswer.length > 0) {
    result.innerHTML = "The reflection stays silent... try again.";
    result.style.color = '#bbb';
  }
}
