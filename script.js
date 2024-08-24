let randomNumber = Math.floor(Math.random() * 100) + 1;
let attempts = 0;
let bestScore = localStorage.getItem('bestScore') || Infinity;

const guessInput = document.getElementById('guessInput');
const guessBtn = document.getElementById('guessBtn');
const message = document.getElementById('message');
const attemptsDisplay = document.getElementById('attempts');
const resetBtn = document.getElementById('resetBtn');
const progressBar = document.getElementById('progressBar');
const difficulty = document.getElementById('difficulty');
const rangeDisplay = document.getElementById('range');
const themeToggle = document.getElementById('themeToggle');
const guessSound = document.getElementById('guessSound');
const winSound = document.getElementById('winSound');

document.getElementById('bestScore').textContent = bestScore;

function updateProgressBar(guess) {
    const maxRange = parseInt(difficulty.options[difficulty.selectedIndex].text.split('(')[1].split('-')[1].replace(')', ''));
    const percentage = (guess / maxRange) * 100;
    progressBar.style.width = `${Math.min(100, percentage)}%`;
}

function updateBestScore() {
    if (attempts < bestScore) {
        bestScore = attempts;
        localStorage.setItem('bestScore', bestScore);
        alert('New Best Score!');
    }
    document.getElementById('bestScore').textContent = bestScore;
}

function resetGame() {
    randomNumber = Math.floor(Math.random() * parseInt(rangeDisplay.textContent.split(' ')[2])) + 1;
    attempts = 0;
    message.textContent = '';
    attemptsDisplay.textContent = '';
    guessInput.value = '';
    guessBtn.disabled = false;
    resetBtn.style.display = 'none';
    progressBar.style.width = '0%';
}

guessBtn.addEventListener('click', function() {
    guessSound.play(); // Play the sound when a guess is made
    const userGuess = parseInt(guessInput.value);
    attempts++;

    if (userGuess === randomNumber) {
        message.textContent = `Congratulations! You guessed the correct number in ${attempts} attempts.`;
        guessBtn.disabled = true;
        resetBtn.style.display = 'inline-block';
        winSound.play(); // Play win sound if correct
        updateBestScore();
    } else if (userGuess > randomNumber) {
        message.textContent = 'Too high! Try again.';
    } else if (userGuess < randomNumber) {
        message.textContent = 'Too low! Try again.';
    }

    updateProgressBar(userGuess);
    attemptsDisplay.textContent = `Attempts: ${attempts}`;
});

resetBtn.addEventListener('click', resetGame);

difficulty.addEventListener('change', function() {
    let range;
    switch (difficulty.value) {
        case 'easy':
            range = 50;
            break;
        case 'medium':
            range = 100;
            break;
        case 'hard':
            range = 200;
            break;
    }
    rangeDisplay.textContent = `1 and ${range}`;
    resetGame();
});

themeToggle.addEventListener('click', function() {
    document.body.classList.toggle('dark-mode');
    document.body.classList.toggle('light-mode');
});

// Initialize with current difficulty settings
resetGame();