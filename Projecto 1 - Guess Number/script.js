'use strict';

let numeroSecreto = Math.trunc(Math.random() * 100) + 1;
let score = 20;
let highscore = 0;
let tentativas = 20;


document.querySelector('.verificar').addEventListener('click', function () {

    let numeroProposta = Number(document.querySelector('#numeroProposta').value);
    if (score > 1) {
        if (!numeroProposta) {
            document.querySelector('.mensagem').textContent = 'Insira um numero!'
        }

        else if (numeroProposta > 100 || numeroProposta < 0) {
            document.querySelector('.mensagem').textContent = 'Numero invalido! Tente novamente '
        }

        else if (numeroProposta === numeroSecreto) {

            document.querySelector('.mensagem').textContent = '🥳 Acertas-te! Parabens, ganhaste o jogo! 🏆'
            document.querySelector('body').style.backgroundColor = '#008000'
            document.querySelector('.numeroSecreto').textContent = numeroSecreto;

            if (score > highscore) {
                highscore = score
                document.querySelector('.melhorScore').textContent = `🥇Highscore:${highscore}`
            }
        }

        else if (numeroProposta > numeroSecreto) {
            document.querySelector('.mensagem').textContent = 'Falhas-te! Tentativa acima do numero!'
            score--;
            tentativas--;
            document.querySelector('.score').textContent = `Score: ${score}`
            document.querySelector('#tentativas').textContent = `(Tens ${tentativas} tentativas!)`
        }

        else if (numeroProposta < numeroSecreto) {
            document.querySelector('.mensagem').textContent = 'Falhas-te! Tentativa abaixo do numero!'
            score--
            tentativas--
            document.querySelector('.score').textContent = `Score: ${score}`
            document.querySelector('#tentativas').textContent = `(Tens ${tentativas} tentativas!)`
        }
    } else {
        document.querySelector('.mensagem').textContent = 'Perdeste o jogo!😢'
        score = 0;
        tentativas = 0;
        document.querySelector('.score').textContent = `Score: ${score}`
        document.querySelector('#tentativas').textContent = `(Tens ${tentativas} tentativas!)`
    }

});


document.querySelector('.inicio').addEventListener('click', function () {
    tentativas = 20;
    score = 20;
    numeroSecreto = Math.trunc(Math.random() * 100) + 1;
    document.querySelector('body').style.backgroundColor = '#292828';
    document.querySelector('.mensagem').textContent = '☘ Tente advinhar o numero...';
    document.querySelector('.numeroSecreto').textContent = '?';
    document.querySelector('#numeroProposta').value = '';
    document.querySelector('#tentativas').textContent = `(Tens ${tentativas} tentativas!)`
    document.querySelector('.score').textContent = `Score:${score}`

});










