'use strict';
//ASSIGN VARIABLES FOR DOM
const totalScore0 = document.getElementById('score--0');
const totalScore1 = document.getElementById('score--1');
const palyer1 = document.querySelector('.player--1');
const palyer0 = document.querySelector('.player--0');
const currentResult1El = document.getElementById('current--1');
const currentResult0El = document.getElementById('current--0');
const diceEl = document.querySelector('.dice');

//BUTTON ASSIGNMENT
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');

//ASSIGN VARIABLES FOR FUNCTIONALITY
let currentScore, playing, totalScores, activePlayer, t, diceNum;

//FUNCTIONS//

//SWITCH PLAYER
function switchPlayer() {
  activePlayer = activePlayer === 1 ? 0 : 1;
  palyer0.classList.toggle('player--active');
  palyer1.classList.toggle('player--active');
}

//RESET RESULT, HIDE DICE.
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

//RENDER RANDOM DICE SYMBOL FROM ARRAY
function changeDice() {
  diceNum = Math.floor(Math.random() * 6);
  diceEl.innerHTML = dices[diceNum];
}
// SET DICE NUMBER CHANGING INTERVAL
function rollDice() {
  t = setInterval(changeDice, 100);
}

function wait() {
  return new Promise(function (t) {
    setTimeout(t, 2000);
  });
}

//Call reset function
reset();

//GAME START AND STOP LOGIC//

const dices = [
  '&#9856;',
  '&#9857;',
  '&#9858;',
  '&#9859;',
  '&#9860;',
  '&#9861;',
];

// ROLLS BTN FUNC
btnRoll.addEventListener('click', function () {
  if (playing) {
    diceEl.classList.remove('hidden');
    diceEl.classList.add('rotate');
    btnRoll.disabled = true;
    rollDice();

    wait().then(() => {
      clearInterval(t);
      diceEl.classList.remove('rotate');
      btnRoll.disabled = false;

      if (diceNum !== 0) {
        currentScore += diceNum + 1;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
      } else {
        currentScore = 0;
        document.getElementById(`current--${activePlayer}`).textContent =
          currentScore;
        switchPlayer();
      }
    });
  }
});

//HOLD BTN FUNCTIONALITY
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

//NEW GAME BTN FUNCTIONALITY
btnNew.addEventListener('click', reset);
