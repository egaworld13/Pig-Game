'use strict';
//Assign variables
const totalScore0 = document.getElementById('score--0');
const totalScore1 = document.getElementById('score--1');
const palyer1 = document.querySelector('.player--1');
const palyer0 = document.querySelector('.player--0');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const currentResult1El = document.getElementById('current--1');
const currentResult0El = document.getElementById('current--0');
let currentScore = 0;
let activePlayer = 1;
const totalScores = [0, 0];
let playing = true;

//FUNCTIONS
//Switch Player
function switchPlayer() {
  activePlayer = activePlayer === 0 ? 1 : 0;
  palyer0.classList.toggle('player--active');
  palyer1.classList.toggle('player--active');
}
//Reset reslut,hide dice
function reset() {
  currentResult0El.textContent = 0;
  currentResult1El.textContent = 0;
  totalScore0.textContent = 0;
  totalScore1.textContent = 0;
  currentScore = 0;
  diceEl.classList.add('hidden');
  totalScores[0] = 0;
  totalScores[1] = 0;
}
//Call reset function
reset();

//Game start and stop logic

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
btnNew.addEventListener('click', function () {
  reset();
  palyer0.classList.remove('player--winner');
  palyer1.classList.remove('player--winner');
  playing = true;
});
