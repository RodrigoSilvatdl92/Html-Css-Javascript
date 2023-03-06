'use strict';

const botaoAbrir = document.querySelectorAll('.button');
const janela = document.querySelector('.janelaTexto');
const botaoFechar = document.querySelector('.botaoClose');
const overlay = document.querySelector('.overlay');

const abrir = function(){
    janela.classList.remove('hidden');
    overlay.classList.remove('hidden');
}

const fechar = function (){
    janela.classList.add('hidden');
    overlay.classList.add('hidden');
}


for(let i = 0 ; i < botaoAbrir.length; i++){
    botaoAbrir[i].addEventListener('click', abrir )
}

botaoFechar.addEventListener('click', fechar)

overlay.addEventListener('click', fechar )

document.addEventListener('keydown',function(e){
    if(e.key === 'Escape' && !janela.classList.contains('hidden')){
        fechar();
    }
})
