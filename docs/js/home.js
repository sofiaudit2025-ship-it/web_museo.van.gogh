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
    if (item.classList.contains('item-galeria')) url = "../Resources/noche_estrellada_cursor.png";
    if (item.classList.contains('item-visita')) url = "../Resources/planificatuvisita-cursor.png";
    if (item.classList.contains('item-tienda')) url = "../Resources/tienda-cursor.png";

    mouseImg.style.backgroundImage = `url('${url}')`;
    mouseImg.style.display = 'block'; // Aquí se vuelve visible
  });

  item.addEventListener('mouseleave', () => {
    mouseImg.style.display = 'none';
  });
});



//  DESPLEGAR DATOS CURIOSOS
function toggleFaq(el) {
const answer = el.nextElementSibling;
const arrow = el.querySelector(".arrow");

if (answer.style.maxHeight) {
    answer.style.maxHeight = null;
    arrow.style.transform = "rotate(0deg)";
    el.classList.remove("active");
} else {
    el.classList.add("active");
    answer.style.maxHeight = answer.scrollHeight + "px";
    arrow.style.transform = "rotate(90deg)";
}
}



// NUEVO SLIDESHOW
class Carousel3D {
  constructor(container, images, options = {}) {
      this.container = container;
      this.images = images;
      this.currentIndex = 0;
      this.options = {
          autoplay: options.autoplay || false,
          autoplayInterval: options.autoplayInterval || 3000,
          visibleItems: options.visibleItems || 3
      };
      
      this.init();
  }
  
  init() {
      this.render();
      this.attachEvents();
      this.updateCarousel();
      
      if (this.options.autoplay) {
          this.startAutoplay();
      }
  }
  
  render() {
      const carousel = document.getElementById('carousel');
      
      // Limpiar contenido previo
      carousel.innerHTML = '';
      
      // Crear items del carrusel
      this.images.forEach((image, index) => {
          const item = document.createElement('div');
          item.className = 'carousel-item';
          item.dataset.index = index;
          
          const img = document.createElement('img');
          img.src = image.url || image;
          img.alt = image.alt || `Imagen ${index + 1}`;
          img.loading = 'lazy';
          
          const caption = document.createElement('div');
          caption.className = 'carousel-caption';
          caption.textContent = image.caption || image.alt || `Imagen ${index + 1}`;
          
          item.appendChild(img);
          item.appendChild(caption);
          carousel.appendChild(item);
      });
  }
  
  updateCarousel() {
      const items = document.querySelectorAll('.carousel-item');
      const total = items.length;
      
      items.forEach((item, index) => {
          // Calcular la distancia más corta en el círculo
          let diff = index - this.currentIndex;
          
          // Normalizar la diferencia para el carrusel circular
          if (diff > total / 2) {
              diff = diff - total;
          } else if (diff < -total / 2) {
              diff = diff + total;
          }
          
          // Remover todas las clases de posición y estilos inline
          item.className = 'carousel-item';
          item.style.opacity = '';
          item.style.pointerEvents = '';
          
          // Aplicar clases según la posición
          if (diff === 0) {
              item.classList.add('active');
          } else if (diff === -1) {
              item.classList.add('prev-1');
          } else if (diff === -2) {
              item.classList.add('prev-2');
          } else if (diff === -3) {
              item.classList.add('prev-3');
          } else if (diff === 1) {
              item.classList.add('next-1');
          } else if (diff === 2) {
              item.classList.add('next-2');
          } else if (diff === 3) {
              item.classList.add('next-3');
          } else {
              // Para imágenes más lejanas, ocultarlas suavemente
              item.style.opacity = '0';
              item.style.pointerEvents = 'none';
          }
      });
  }
  
  next() {
      this.currentIndex = (this.currentIndex + 1) % this.images.length;
      this.updateCarousel();
  }
  
  prev() {
      this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
      this.updateCarousel();
  }
  
  goTo(index) {
      this.currentIndex = index;
      this.updateCarousel();
  }
  
  attachEvents() {
      document.getElementById('prevBtn').addEventListener('click', () => this.prev());
      document.getElementById('nextBtn').addEventListener('click', () => this.next());
      
      // Navegación con teclado
      document.addEventListener('keydown', (e) => {
          if (e.key === 'ArrowLeft') this.prev();
          if (e.key === 'ArrowRight') this.next();
      });
      
      // Navegación con swipe (touch)
      let startX = 0;
      let endX = 0;
      
      this.container.addEventListener('touchstart', (e) => {
          startX = e.touches[0].clientX;
      });
      
      this.container.addEventListener('touchend', (e) => {
          endX = e.changedTouches[0].clientX;
          const diff = startX - endX;
          
          if (Math.abs(diff) > 50) {
              if (diff > 0) {
                  this.next();
              } else {
                  this.prev();
              }
          }
      });
  }
  
  startAutoplay() {
      if (this.autoplayInterval) {
          clearInterval(this.autoplayInterval);
      }
      
      this.autoplayInterval = setInterval(() => {
          this.next();
      }, this.options.autoplayInterval);
      
      // Pausar autoplay al hacer hover
      this.container.addEventListener('mouseenter', () => {
          if (this.autoplayInterval) {
              clearInterval(this.autoplayInterval);
          }
      });
      
      this.container.addEventListener('mouseleave', () => {
          this.startAutoplay();
      });
  }
  }
  
  // imágenes del carrusel 
  const images = [
  { url: '../Resources/retrato-obra.webp', alt: '', caption: 'Una de las pocas fotografías reales de Van Gogh. Tomada cuando era joven.' },
  { url: '../Resources/foto-antigua-retrato.webp', alt: '', caption: 'Sus padres le llamaron Vicent en honor a su hermano, que falleció al nacer, un año antes que él' },
  { url: '../Resources/foto-antigua-adulto.webp', alt: '', caption: 'Imagen histórica del artista adulto.' },
  { url: '../Resources/noche-estrellada.webp', alt: '', caption: 'Pintó La Noche Estrellada mientras estaba internado en un manicomio' },
  { url: '../Resources/Paris-sXIX.webp', alt: '', caption: 'París siglo XIX, inspiración clave.' },
  { url: '../Resources/Cartas-a-Theo.webp', alt: '', caption: 'Cartas a Theo, fundamentales para entender su vida.' },
  { url: '../Resources/vista-estudio.webp', alt: '', caption: 'Vista desde su estudio en Saint-Rémy.' },
  { url: '../Resources/girasoles-obra.webp', alt: ' salvaje', caption: 'La serie de los girasoles está formada por siete cuadros.' },
  { url: '../Resources/vangogh-sinoreja.webp', alt: '', caption: 'Vincent van Gogh se mutiló parte de la oreja izquierda tras una crisis emocional' },
  { url: '../Resources/almendro_en_flor.webp', alt: '', caption: 'Vicent van Gogh podría haber pintado un total de 900 cuadros a lo largo de toda su vida' },
  { url: '../Resources/HeroIntroGaleria.webp', alt: '', caption: 'La obra más cara de Van Gogh se ha vendido por 82,4 millones de dólares' },
  { url: '../Resources/retrato-curiosidades.webp', alt: '', caption: 'Vincent Van Gogh murió considerándose un fracaso tanto como artista como ser humano, solo vendió una obra en vida.' }
  ];
  
  




  // FIRMA CON VIVUS

  let vivusInstance = null;
  let svgLoaded = false;

  async function loadSVG() {
      try {
          const response = await fetch('../Resources/firma-vangogh.svg');
          const svgText = await response.text();
          const svgContainer = document.getElementById('svg-container');
          svgContainer.innerHTML = svgText;
          
          // Obtener el SVG del contenedor
          const svg = svgContainer.querySelector('svg');
          if (svg) {
              svg.id = 'firma-svg';
              svgLoaded = true;
              // Aplicar estilos al SVG cargado
              applySVGStyles();
              // Inicializar Vivus después de cargar el SVG
              console.log("InitVivus...")
              initVivus();
          }
      } catch (error) {
          console.error('Error al cargar el SVG:', error);
      }
  }

  function applySVGStyles() {
      const paths = document.querySelectorAll('#firma-svg path');
      paths.forEach(path => {
          path.style.fill = 'none';
          path.style.stroke = '#ffffff';
          path.style.strokeWidth = '3';
          path.style.strokeLinecap = 'round';
          path.style.strokeLinejoin = 'round';
          path.style.opacity = '0';
      });
  }

  function orderPathsLeftToRight() {
      const svg = document.getElementById('firma-svg');
      if (!svg) return;
      
      const paths = Array.from(svg.querySelectorAll('path'));
      
      paths.sort((a, b) => {
          const aBox = a.getBBox();
          const bBox = b.getBBox();
          return aBox.x - bBox.x;
      });
      
      if (paths.length > 0) {
          const parent = paths[0].parentNode;
          paths.forEach(path => {
              parent.appendChild(path);
          });
      }
  }

  function hideSignature() {
      // Ocultar todos los paths del SVG
      const paths = document.querySelectorAll('#firma-svg path');
      paths.forEach(path => {
          path.style.opacity = '0';
          path.style.fill = 'none';
      });
  }

  function initVivus() {
      if (!svgLoaded) return;
      
      // Ordenar paths de izquierda a derecha
      orderPathsLeftToRight();
      
      // Destruir instancia anterior si existe
      if (vivusInstance) {
          vivusInstance.destroy();
      }
      console.log("new Vivus")
      // Crear nueva instancia de Vivus con animación secuencial
      vivusInstance = new Vivus('firma-svg', {
          type: 'oneByOne',
          duration: 200,
          delay: 80,
          animTimingFunction: Vivus.EASE_IN_OUT,
          start: 'manual', // No iniciar automáticamente
          pathTimingFunction: Vivus.EASE_IN_OUT
      }, function(obj) {
          console.log('Animación completada');
          // Aplicar el relleno después de que termine la animación
          setTimeout(function() {
              const paths = document.querySelectorAll('#firma-svg path');
              paths.forEach(path => {
                  path.style.fill = '#ffffff';
                  path.style.opacity = '1';
              });
          }, 100);
      });
      
      // Mostrar trazos y reproducir la animación una vez creado el SVG
      const paths = document.querySelectorAll('#firma-svg path');
      paths.forEach(path => {
          path.style.fill = 'none';
          path.style.stroke = '#ffffff';
          path.style.strokeWidth = '3';
          path.style.opacity = '1';
      });
      vivusInstance.reset().play();
  }




  // Esperar a que el DOM esté listo
  document.addEventListener('DOMContentLoaded', () => {
    
    //Firma
    loadSVG();
    console.log("svg loaded")
    
    
    //Carousel
    const container = document.querySelector('.carousel-container');
    const carousel = new Carousel3D(container, images, {
        autoplay: true,
        autoplayInterval: 3000
    });
  });
