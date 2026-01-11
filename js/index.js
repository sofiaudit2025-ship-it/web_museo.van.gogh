const slides = document.querySelectorAll('.slide');
const btnLeft = document.querySelector('.gallery-arrow.left');
const btnRight = document.querySelector('.gallery-arrow.right');

let index = 0;

function updateSlides() {
  slides.forEach((slide, i) => {
    slide.classList.remove('active', 'prev', 'next');

    if (i === index) {
      slide.classList.add('active');
    } else if (i === index - 1 || (index === 0 && i === slides.length - 1)) {
      slide.classList.add('prev');
    } else if (i === index + 1 || (index === slides.length - 1 && i === 0)) {
      slide.classList.add('next');
    }
  });
}
btnRight.addEventListener('click', () => {
  index = (index + 1) % slides.length;
  updateSlides();
});

btnLeft.addEventListener('click', () => {
  index = (index - 1 + slides.length) % slides.length;
  updateSlides();
});

// Inicializar
updateSlides();
