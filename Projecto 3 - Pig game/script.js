'use strict'

const score0El = document.querySelector('#score--0');
const score1El = document.querySelector('#score--1');

const dice = document.querySelector('.dice');

const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

score0El.textContent = 0;
score1El.textContent = 0;
dice.classList.add('hidden');
let currentScore = 0;
let activePlayer = 0;
let playing = true;
let score=[0,0];

const switchPlayer = function (){
    currentScore = 0;
    document.querySelector(`#current--${activePlayer}`).textContent = currentScore; 
    activePlayer = activePlayer === 0 ? 1 : 0 ;
    document.querySelector('.player--0').classList.toggle('player--active');
    document.querySelector('.player--1').classList.toggle('player--active');
}


btnRoll.addEventListener('click', function(){
    
    if(playing){
        dice.classList.remove('hidden');
        let valorDado = Math.trunc(Math.random() * 6 ) + 1 ;
        dice.src = `imagens/dice-${valorDado}.png`;
        console.log('pasdasdasd');
        if(valorDado!==1){
           currentScore = currentScore + valorDado;
           document.querySelector(`#current--${activePlayer}`).textContent = currentScore; 
        }else{
            switchPlayer();
        }
    }
});

btnHold.addEventListener('click', function() { 
    if(playing){
    score[activePlayer]=score[activePlayer] + currentScore;
    document.querySelector(`#score--${activePlayer}`).textContent=score[activePlayer];
    console.log('pasdasdasd');
    if(score[activePlayer] >= 20){
        console.log('pasdasdasd');
        playing = false;
        document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
    }else{
    switchPlayer();
}
}});


