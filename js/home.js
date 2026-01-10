const mouseImg = document.getElementById('mouse-image');
const items = document.querySelectorAll('.secciones a');

document.addEventListener('mousemove', (e) => {
  // Esto mueve el div rojo a la posición del ratón
  mouseImg.style.left = e.clientX + 'px';
  mouseImg.style.top = e.clientY + 'px';
});

items.forEach(item => {
  item.addEventListener('mouseenter', () => {
    console.log("Ratón entró en:", item.className); // Mira la consola (F12)
    
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