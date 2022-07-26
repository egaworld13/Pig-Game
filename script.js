'use strict';
//Assign variables
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const currentResult1El = document.getElementById('current--1');
const currentResult0El = document.getElementById('current--0');
let currentScore = 0;
let activePlayer = 1;
const totalScores = [0, 0];
//Reset reslut,hide dice
function reset() {
  score0El.textContent = 0;
  score1El.textContent = 0;
  diceEl.classList.add('hidden');
}
//Call reset function
reset();

//Rolling dice function
btnRoll.addEventListener('click', function () {
  const dice = Math.trunc(Math.random() * 6) + 1;
  diceEl.src = `dice-${dice}.png`;
  diceEl.classList.remove('hidden');

  if (dice !== 1) {
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
  } else {
    activePlayer = activePlayer === 0 ? 1 : 0;
    currentScore = 0;
    currentResult1El.textContent = currentScore;
  }
});
//Switch Player
