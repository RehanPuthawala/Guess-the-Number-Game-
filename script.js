//* DOM ELEMENTS SELECTION * //

// ? Buttons
const againButton = document.querySelector('.again');
const checkButton = document.querySelector('.check');

// ? Placeholders
const secretNumberLabel = document.querySelector('.number');
const messageLabel = document.querySelector('.message');
const scoreLabel = document.querySelector('.score');
const highScoreLabel = document.querySelector('.highscore');
const limitLabel = document.querySelector('.limit');
const levelLabel = document.querySelector('.level__no');

// ? Input Boxes
const guessInput = document.querySelector('.guess');

// * Global Variable Declaration * //
let level = 1;
let limit = 20;
let score = 20;
let gameState;
let highscore = 0;
let secretNumber;

// * Functions * //

const init = () => {
  gameState = true;
  secretNumber = Math.floor(Math.random() * limit) + 1;
  secretNumberLabel.textContent = '?';
  scoreLabel.textContent = score;
  disableOrEnable('enable');
  guessInput.focus();
  levelLabel.textContent = level;
  displayMessage('Start Guessing . . . ');

  document.body.style.backgroundColor = '#222';
  secretNumberLabel.style.width = '15rem';
};

const displayMessage = message => (messageLabel.textContent = message);
const disableOrEnable = (state = 'enable') => {
  if (state === 'disable') {
    checkButton.style.opacity = '0.5';
    checkButton.style.pointerEvents = 'none';
    guessInput.style.pointerEvents = 'none';
  }

  checkButton.style.opacity = '1';
  checkButton.style.pointerEvents = 'all';
  guessInput.style.pointerEvents = 'all';
};

const checkUserGuess = userGuess => {
  if (!userGuess) {
    displayMessage(`❌ No Number !!!`);
  } else if (userGuess === secretNumber) {
    displayMessage(`🎉 Correct Number`);
    gameState = false;
    document.body.style.backgroundColor = '#60b347';
    secretNumberLabel.style.width = '30rem';
    secretNumberLabel.textContent = secretNumber;
    disableInput();
  } else if (userGuess < secretNumber) {
    displayMessage('😥 Too Low !');
    score--;
    scoreLabel.textContent = score;
  } else if (userGuess > secretNumber) {
    displayMessage('🤯 Too High !');
    score--;
    scoreLabel.textContent = score;
  }
  guessInput.value = '';
  guessInput.focus();
};

const disableInput = () => {
  disableOrEnable('disable');
};

const restart = () => {
  if (!gameState) {
    if (score > highscore) {
      highscore = score;
    }
    highScoreLabel.textContent = highscore;
    limit += 5;
    limitLabel.textContent = limit;
    score = limit;
    level++;
    init();
  }
};

// * Event Listeners * //

checkButton.addEventListener('click', () => {
  if (score > 1) {
    const userGuess = Number(guessInput.value);
    checkUserGuess(userGuess);
  }
});

guessInput.addEventListener('keypress', e => {
  if (e.key === 'Enter') {
    if (score > 1) {
      const userGuess = Number(guessInput.value);
      checkUserGuess(userGuess);
    }
  }
});

againButton.addEventListener('click', restart);

init();
