'use strict';

// declaring variables
const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');
const currentScore0El = document.getElementById('current--0');
const currentScore1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const intructionBtn = document.getElementById('myBtn');
const intructionModal = document.getElementById('myModal');
const intructionModalClose = document.getElementsByClassName('close')[0];
const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');

let currentScore, activePlayer, score, playing;

const init = function () {
  currentScore = 0;
  activePlayer = 0;
  score = [0, 0];
  playing = true;

  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
  currentScore0El.textContent = 0;
  currentScore1El.textContent = 0;

  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--active');
  document
    .querySelector(`.player--${activePlayer}`)
    .classList.remove('player--winner');

  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};

const switchPlayer = function () {
  document.getElementById(`current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

init();

//initializing value
score0El.textContent = 0;
score1El.textContent = 0;
diceEl.classList.add('hidden');

btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    if (dice != 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    score[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    if (score[activePlayer] >= 20) {
      playing = false;
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--active');
      diceEl.classList.add('hidden');
      modal.classList.remove('hidden');
      overlay.classList.remove('hidden');
    } else {
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);

intructionBtn.addEventListener('click', function () {
  intructionModal.style.display = 'block';
});

intructionModalClose.onclick = function () {
  intructionModal.style.display = 'none';
};

window.onclick = function (event) {
  if (event.target === intructionModal) {
    intructionModal.style.display = 'none';
  }
};
