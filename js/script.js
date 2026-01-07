// MENU DE HAMBURGUESA DESPLEGABLE
/**
 * Abre el menú
 */
function openMenu() {
    console.log("Función openMenu");
    // Busca el elemento con id "menu", accede a su primer hijo y luego al último hijo de ese elemento
    // Cambia left a 0 para que se despace hacia la derecha y sea visible
    document.getElementById("menu").style.right = "0";
    document.body.classList.add("menu-open");
    var menuBar = document.querySelector(".menu");
    if (menuBar) {
        menuBar.classList.add("is-visible");
    }
}


/**
 * Cierra el menú
 */
function closeMenu() {
    console.log("Función closeMenu");
    // Busca el elemento con id "menu", accede a su primer hijo y luego al último hijo de ese elemento
    // Cambia left a -100% para que se desplace hacia la izquierda y no sea visible
    document.getElementById("menu").style.right = "-100%";
    document.body.classList.remove("menu-open");
}






// para que el garabato se coloque debajo de la página seleccionada
function setActiveMenuLink() {
    // busca todos los enlaces del menú (que tienen la clase .menu-cta)
    var links = document.querySelectorAll(".menu-cta");
    
    
    // obtiene el nombre del archivo actual en la URL (ej "galeria.html") para que el garabato solo se ponga debajo de esa pagina
    // window.location.pathname es la ruta de la url
    // split separa la url en partes por donde hay un / y pop coge lo que haya despues del ultimo / y eso sería la pagina actual
    var path = window.location.pathname.split("/").pop();
    // guarda el enlace de la página actual, pongo null porq la variable activeLink estará vacía hasta que se ejecute lo anterior, una vez se ejecute se pondra como valor en activeLink
    var activeLink = null;
    
    // links es la lista de enlaces del menu, esta funcion recorre esa lista hasta encontrar en el que estamos
    links.forEach(function (link) {
        // busca el enlace que tenia el garabato para quitar esa clase para que ya no aparezca y asi no lo tengan dos a la vez
        // primero quita el estilo y luego la forma
        link.classList.remove("is-active");
        var shape = link.querySelector(".shape");
        // Si existe la forma, la elimina para evitar duplicados
        if (shape) {
            shape.remove();
        }
        
        // si el href del enlace coincide con la página actual, lo marca como activo
        if (link.getAttribute("href") === path) {
            activeLink = link;
        }
    });
    
    // Si encontró un enlace activo, aplica la clase y agrega la forma
    if (activeLink) {
        // Activa el estilo del enlace
        activeLink.classList.add("is-active");
        // crea un elemento nuevo (span) en el html en el enlace activo para aplicarle la clase shape para mostar el garabato
        var activeShape = document.createElement("span");
        activeShape.className = "shape";
        // inserta la forma dentro del enlace activo
        activeLink.appendChild(activeShape);
    }
}


// el garabato solo se coloca una vez haya cargado el menú (DOMContentLoaded) para que no se coloque sin que haya nada encima
document.addEventListener("DOMContentLoaded", function () {
    setActiveMenuLink();
    changeOpacity();
    window.addEventListener("scroll", changeOpacity, { passive: true });
});






// funcion de cambiar la opacidad del fondo del menu
function changeOpacity() {
    //console.log("changeOpacity");

    // posicion del scroll en la que estoy
    var scroll = window.scrollY;
    //console.log("scroll: " + scroll);

    // posicion de scroll en la que el menu alcanza opacidad 1
    var menuBar = document.querySelector(".menu");
    if (!menuBar) {
        return;
    }

    // *1.5 para que tarde más en cambiar de opacidad 0 a 1
    var maxScroll = window.innerHeight;
    //console.log("max_scroll: " + maxScroll);

    if (scroll <= maxScroll) {
        // calculo del valor del alpha
        var opacity = scroll / maxScroll;
        //console.log("opacidad: " + opacity);
        menuBar.style.backgroundColor = "rgba(12, 22, 37, " + opacity + ")";
    }
}
// 12, 22, 37 es el valor del color primario en rgb 



document.addEventListener('DOMContentLoaded', function() {
    const newsletterForm = document.querySelector('.newsletter-form');
    
    if (newsletterForm) { 
        newsletterForm.onsubmit = function(e) {
            e.preventDefault();
            
            const emailInput = newsletterForm.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value.trim() !== '') {
                alert("¡Te damos la bienvenida al universo de Vincent!\n\nGracias por unirte a nuestra comunidad. Pronto recibirás historias, colores e inspiración directamente desde el museo para iluminar tu día a día.");
                this.reset();
            } else {
                alert("Por favor, introduce tu correo electrónico para suscribirte.");
                if(emailInput) {
                    emailInput.focus();
                }
            }
        };
    }
});

function actualizarContadores() {

    const carrito = JSON.parse(localStorage.getItem('miCarrito')) || [];

    const contadores = document.querySelectorAll('.cuenta-carrito');

    contadores.forEach(function(contador) {
        contador.innerText = carrito.length;
    });
}

window.addEventListener('load', actualizarContadores);

document.addEventListener('DOMContentLoaded', actualizarContadores);