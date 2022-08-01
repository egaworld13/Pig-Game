'use strict';
//Assign variables for DOM
const totalScore0 = document.getElementById('score--0');
const totalScore1 = document.getElementById('score--1');
const palyer1 = document.querySelector('.player--1');
const palyer0 = document.querySelector('.player--0');
const currentResult1El = document.getElementById('current--1');
const currentResult0El = document.getElementById('current--0');
const diceEl = document.querySelector('.dice');

//Btn assignment
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

//Assign variables for functionality
let currentScore, playing, totalScores, activePlayer;

//FUNCTIONS
//Switch Player
function switchPlayer() {
  activePlayer = activePlayer === 1 ? 0 : 1;
  palyer0.classList.toggle('player--active');
  palyer1.classList.toggle('player--active');
}

//Reset reslut,hide dice
function reset() {
  palyer0.classList.remove('player--winner');
  palyer1.classList.remove('player--winner');
  currentResult0El.textContent = 0;
  currentResult1El.textContent = 0;
  totalScore0.textContent = 0;
  totalScore1.textContent = 0;
  diceEl.classList.add('hidden');
  currentScore = 0;
  activePlayer = 0;
  totalScores = [0, 0];
  playing = true;
  palyer0.classList.add('player--active');
  palyer1.classList.remove('player--active');
}

//Call reset function
reset();

//GAME START AND STOP LOGIC

//Rolling dice function
btnRoll.addEventListener('click', function () {
  if (playing) {
    const dice = Math.trunc(Math.random() * 6) + 1;
    diceEl.src = `dice-${dice}.png`;
    diceEl.classList.remove('hidden');

    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      currentScore = 0;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
      switchPlayer();
    }
  }
});

//Hold btn functionality
btnHold.addEventListener('click', function () {
  if (playing) {
    totalScores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      totalScores[activePlayer];
    currentScore = 0;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;

    if (totalScores[activePlayer] >= 100) {
      diceEl.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      playing = false;
    }
    switchPlayer();
  }
});

//New game btn
btnNew.addEventListener('click', reset);
