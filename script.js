// Define the words to be typed
const words = ['apple', 'banana', 'cat', 'dog'];

// Initialize the game state
let currentWordIndex = 0;
let score = 0;
let correctCount = 0;
let mistakeCount = 0;
let startTime = null;
let endTime = null;

// Display the current word
function displayWord() {
  const wordContainer = document.getElementById('word-container');
  wordContainer.textContent = words[currentWordIndex];
}

// Check if the typed word is correct
function checkWord() {
  const input = document.getElementById('input');
  const currentWord = words[currentWordIndex];
  const typedWord = input.value.trim().toLowerCase();
  if (typedWord === currentWord) {
    // Play a cute sound and add effects
    // (not implemented in this example)
    score += 10;
    correctCount += 1;
  } else {
    // Play an error sound and add effects
    // (not implemented in this example)
    score -= 5;
    mistakeCount += 1;
  }
  input.value = '';
  currentWordIndex = (currentWordIndex + 1) % words.length;
  displayWord();
  updateScore();
}

// Update the score display
function updateScore() {
  const scoreSpan = document.getElementById('score');
  const accuracySpan = document.getElementById('accuracy');
  const speedSpan = document.getElementById('speed');
  const totalTyped = correctCount + mistakeCount;
  const accuracy = totalTyped === 0 ? 0 : Math.round(correctCount / totalTyped * 100);
  const timeElapsed = (endTime - startTime) / 1000 / 60; // in minutes
  const speed = timeElapsed === 0 ? 0 : Math.round(correctCount / timeElapsed);
  scoreSpan.textContent = score;
  accuracySpan.textContent = accuracy + '%';
  speedSpan.textContent = speed + ' WPM';
}

// Start the game
function startGame() {
  displayWord();
  const input = document.getElementById('input');
  input.addEventListener('input', () => {
    if (!startTime) {
      startTime = new Date();
    }
    if (input.value.endsWith(' ')) {
      checkWord();
    }
  });
}

// Attach the startGame function to the window load event
window.addEventListener('load', startGame);
