'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal'); // quando usas querySelectorALL crias um nodelist , um nodelist é parecido com um array mas tem menos metodos,, o metodo forEach dá para usar em nodelist

const openModal = function (e) {
  e.preventDefault()
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal))


btnCloseModal.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});


//Scroll Botão "learn More" para secção 1

const btnScrollTo = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1')

btnScrollTo.addEventListener('click', function (e) {
  section1.scrollIntoView({ behavior: 'smooth' })
})


// tab component botao vermelho , verde e amarelo 



const tabs = document.querySelectorAll('.operations__tab')

const tabsContainer = document.querySelector('.operations__tab-container')

const tabsContent = document.querySelectorAll('.operations__content')


tabsContainer.addEventListener('click', function (e) {
  const clicked = e.target.closest('.operations__tab')
  console.log(e)

  if (clicked) {
    tabs.forEach(el => el.classList.remove('operations__tab--active'))
    clicked.classList.add('operations__tab--active')

    tabsContent.forEach(el => el.classList.remove('operations__content--active'))

    document.querySelector(`.operations__content--${clicked.getAttribute('num')} `).classList.add('operations__content--active')

  }
})


// MENU FADING 


const nav = document.querySelector('.nav')


const handlerHover = function (e, opacity) {
  if (e.target.classList.contains('nav__link')) {
    const link = e.target
    const siblings = document.querySelectorAll('.nav__link')
    const logo = document.querySelector('img')

    siblings.forEach(function (el) {

      if (el !== link) {
        el.style.opacity = opacity
      }
      logo.style.opacity = opacity
    })
  }
}

nav.addEventListener('mouseover', function (e) { handlerHover(e, 0.5) })
nav.addEventListener('mouseout', function (e) { handlerHover(e, 1) })


/*
const nav = document.querySelector('.nav__links')

const handleHover = function (e,opacity) {
 
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;
    const siblings = link.closest('.nav').querySelectorAll('.nav__link');
    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(function (el) {
      if (el !== link) {
        el.style.opacity = opacity;
      }
    });
 
    logo.style.opacity = opacity;
  }
};

nav.addEventListener('mouseover', event=>handleHover(event,0.5))
nav.addEventListener('mouseout', event=>handleHover(event,1))

*/


// STICKY MENU NAV 


const header = document.querySelector('.header');
const navHeight = nav.getBoundingClientRect().height
console.log(navHeight)

const stickyNav = function (entries) {
  const entry = entries[0]




  if (entry.isIntersecting === false) { // se false é igual a false logo of if é verdadeiro e executa este primeiro comando
    console.log('log-true do if - não está a interceptar')
    nav.classList.add('sticky')


  } else {

    console.log('log-false do if - está a interceptar')

    nav.classList.remove('sticky')
  }

}

const headerObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`
})

headerObserver.observe(header)


// revelar as sections à medida que fazemos scroll down 

const allSections = document.querySelectorAll('.section')

const revealSection = function (entries, observer) {

  const [entry] = entries

  if (!entry.isIntersecting) return; 

  entry.target.classList.remove('section--hidden')
  observer.unobserve(entry.target)

}

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,

});


allSections.forEach(function (section) {
  sectionObserver.observe(section)
  section.classList.add('section--hidden')
})



const imgTargets = document.querySelectorAll('img[data-src]')


const loadImg = function (entries, observer) {

  const [entry] = entries
  console.log(entry)
  if (!entry.isIntersecting) return

  // replace src with data-src 

  entry.target.src = entry.target.dataset.src; 

  entry.target.addEventListener('load', function () {
    entry.target.classList.remove('lazy-img')
  })

  observer.unobserve(entry.target)
}


const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '-200px'
})


imgTargets.forEach(function (imgtarget) {
  imgObserver.observe(imgtarget)
})


// como fazer um slider carrosel///////////////////////////////////

const slides = document.querySelectorAll('.slide')
const btnLeft = document.querySelector('.slider__btn--left')
const btnRight = document.querySelector('.slider__btn--right')
const dotContainer = document.querySelector('.dots')

let curSlide = 0; // currentSlide começa no 0



// criar uma função para criar os pontos no html 
const createDots = function () {
  slides.forEach(function (_, i) {
    dotContainer.insertAdjacentHTML('beforeend', `<button class="dots__dot" data-slide="${i}"></button>`)
  })
}

createDots();


// função do ponto que está activo correspondente ao slide activo
const activateDot = function (slide) {
  document.querySelectorAll('.dots__dot').forEach(dot => dot.classList.remove('dots__dot--active'));

  document.querySelector(`.dots__dot[data-slide="${slide}"]`).classList.add('dots__dot--active');
}



// função ir para slide escolhido
const goToSlide = function (slide) {
  slides.forEach(function (s, i) {
    s.style.transform = `translateX(${100 * (i - slide)}%)`
    activateDot(slide)
  })
}

goToSlide(0);//começamos no slide 0 


// função proximo slide
const nextSlide = function () {
  if (curSlide === slides.length - 1) {
    curSlide = 0
  } else {
    curSlide++
  }
  goToSlide(curSlide)
}


// função slide anterior
const prevSlide = function () {
  if (curSlide === 0) {
    curSlide = slides.length - 1
  } else {
    curSlide--
  }
  goToSlide(curSlide)

}


btnRight.addEventListener('click', nextSlide)

btnLeft.addEventListener('click', prevSlide)

document.addEventListener('keydown', function (e) {
  console.log(e)
  if (e.key === 'ArrowRight') {
    nextSlide()
  } else if (e.key === 'ArrowLeft') {
    prevSlide()
  }
})

//event listener para qnd carregamos nos pontos ir para o slide correspondente 
dotContainer.addEventListener('click', function (e) {
  if (e.target.classList.contains('dots__dot')) {
    const slide = e.target.dataset.slide
    goToSlide(slide)

  }
})

