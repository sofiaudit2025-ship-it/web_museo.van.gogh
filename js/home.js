const mouseImg = document.getElementById('mouse-image');
const items = document.querySelectorAll('.secciones a');

document.addEventListener('mousemove', (e) => {
  // Esto mueve el div rojo a la posición del ratón
  mouseImg.style.left = e.clientX + 'px';
  mouseImg.style.top = e.clientY + 'px';
});

items.forEach(item => {
  item.addEventListener('mouseenter', () => {
    console.log("Ratón entró en:", item.className); 
    
    let url = "";
    if (item.classList.contains('item-galeria')) url = "../css/media/img/noche_estrellada_cursor.png";
    if (item.classList.contains('item-visita')) url = "../css/media/img/planificatuvisita-cursor.png";
    if (item.classList.contains('item-tienda')) url = "../css/media/img/tienda-cursor.png";

    mouseImg.style.backgroundImage = `url('${url}')`;
    mouseImg.style.display = 'block'; // Aquí se vuelve visible
  });

  item.addEventListener('mouseleave', () => {
    mouseImg.style.display = 'none';
  });
});



// CARRUSEL 
const imgs = document.querySelectorAll('.track img');
const captions = document.querySelectorAll('.track .track-caption');
let index = 1;
function update() {
    imgs.forEach(img => img.className = '');
    captions.forEach(caption => caption.className = 'track-caption');

    imgs[index].classList.add('active');
    if (imgs[index - 1]) imgs[index - 1].classList.add('prev');
    if (imgs[index + 1]) imgs[index + 1].classList.add('next');

    captions[index].classList.add('active');
    if (captions[index - 1]) captions[index - 1].classList.add('prev');
    if (captions[index + 1]) captions[index + 1].classList.add('next');
}

document.querySelector('.gallery-arrow.right').onclick = () => {
    index = (index + 1) % imgs.length;
    update();
};

document.querySelector('.gallery-arrow.left').onclick = () => {
    index = (index - 1 + imgs.length) % imgs.length;
    update();
};

update();



//  DESPLEGAR DATOS CURIOSOS
function toggleFaq(el) {
const answer = el.nextElementSibling;
const arrow = el.querySelector(".arrow");

if (answer.style.maxHeight) {
    answer.style.maxHeight = null;
    arrow.style.transform = "rotate(0deg)";
} else {
    answer.style.maxHeight = answer.scrollHeight + "px";
    arrow.style.transform = "rotate(90deg)";
}
}

