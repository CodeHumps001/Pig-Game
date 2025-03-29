'use strict';

//selecting elements
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceImg = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const hey0 = document.querySelector(' .hey0');
const hey1 = document.querySelector(' .hey1');

let currentScore, score, activePlayer, gameActive;
const Inni = function () {
  //innitially
  score0El.textContent = 0;
  score1El.textContent = 0;
  hey0.textContent = '...😋';
  hey1.textContent = '...😍';
  //setting a global scores
  score = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  gameActive = true;
  player1El.classList.add('current-player');
  diceImg.classList.add('hidden');
  document.querySelector(`.player--0`).classList.remove('player--winner');
  document.querySelector(`.player--1`).classList.remove('player--winner');
  document.getElementById(`current--0`).textContent = currentScore;
  document.getElementById(`current--1`).textContent = currentScore;
  player0El.classList.add('player--active');
  player1El.classList.remove('player--active');
};
Inni();
let switchPlayer = function () {
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
  currentScore = 0;
  document.getElementById(`current--0`).textContent = currentScore;
  document.getElementById(`current--1`).textContent = currentScore;
};

btnRoll.addEventListener('click', function () {
  //generate dice
  if (gameActive) {
    let dice = Math.trunc(Math.random() * 6) + 1;

    diceImg.classList.remove('hidden');
    diceImg.src = `dice-${dice}.png`;
    currentScore += dice;
    document.getElementById(`current--${activePlayer}`).textContent =
      currentScore;
    if (score[0] > score[1]) {
      hey0.textContent = 'I am winning anyway😎';
      hey1.textContent = 'Haha you kidding me!!😂';
    } else if (score[1] > score[0]) {
      hey0.textContent = 'So sad!!😥';
      hey1.textContent = 'I am really enjoying the fun😎';
    } else if (score[0] === score[1]) {
      hey0.textContent = 'Hey man, lets have fun';
      hey1.textContent = 'Hey buddy';
    }
    if (dice === 1) {
      //switching player
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  //adding current score to total score
  score[activePlayer] += currentScore;
  if (score[activePlayer] >= 100) {
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];
    document
      .querySelector(`.player--${activePlayer}`)
      .classList.add('player--winner');
    if (score[0] >= 100) {
      hey0.textContent = 'I always knew I will be a winner';
      hey1.textContent = 'You are just lucky';
    } else if (score[1] >= 100) {
      hey0.textContent = 'I will win next time';
      hey1.textContent = 'Hurray!! I made it🎉';
    }
    gameActive = false;
  } else {
    document.getElementById(`score--${activePlayer}`).textContent =
      score[activePlayer];

    switchPlayer();
  }
});

btnNew.addEventListener('click', Inni);
