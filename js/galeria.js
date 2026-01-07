// en vez de hacer la galeria con html dejo la estructura cruda ahi y el interior lo hago con js ya que va a ser dinámico

const IMGSPAGINA = 8;
const SEARCHARTIC ="https://api.artic.edu/api/v1/artworks/search?query[term][artist_id]=40610&limit=100&fields=artist_titles,title,date_display,description,dimensions,medium_display,artwork_type_title,image_id"

// como algunos titulos son muy largos, a partir de 15 caracteres que ponga puntos suspensivos
function truncarTexto(texto, maxLength = 15) {
    if (texto.length > maxLength) {
        return texto.slice(0, maxLength) + '...';
    }
    return texto;
}

function obtenerImagenesARTIC() {
    console.log("API")
    // llama a la página y obtiene el array
    return fetch(SEARCHARTIC)
    // esa respuesta que ha obtenido, la transforma a formato json y eso que de será data
        .then(res => res.json())
        .then(data => {
            console.log("ARTIC data", data.data);
            return data.data;
        })
        .catch(error => {
            console.error('Error al obtener las imágenes del ARTIC:', error);
            return [];
        });
}

function rellenarGaleriaARTIC(array, desde = 0) {
    console.log("rellenando la galeria:",array)
    // antes de insertar nuevas imágenes limpiamos
    $("#gallery").empty();
    imagenes = array.slice(desde, desde + IMGSPAGINA);
    
    imagenes.map(imagen => {
            const url = `https://www.artic.edu/iiif/2/${imagen.image_id}/full/843,/0/default.jpg`;
            
            const $figure = $(`
                <figure class="info-obra">
                    <img src="${url || null}" alt="${imagen.title || 'N/A'}">
                    <figcaption>
                        <h3>${truncarTexto(imagen.title) || 'N/A'}</h3>
                        <p>${imagen.date_display || 'N/A'}</p>
                    </figcaption>
                </figure>
            `);
            $figure.on('click',function(event) {
                openModal(imagen)
            });
            
            $("#gallery").append($figure)
            
        });
}


$(document).ready(function() {
    obtenerImagenesARTIC().then(imagenes => {
        console.log("imagenes", imagenes.length);

        // como la api del met a veces falla y no deja cargar los objetos, cuando falle hacer que salte un mensaje de error para que el usuario espere y recargue la página
        if (imagenes.length === 0) {    
            console.log("no hay imágenes");
            $("#gallery").append(`<h2><i class="fa-solid fa-triangle-exclamation"></i> Servidor sobrecargado. <br> Por favor, inténtelo más tarde.</h2>`);
            return;
        }
        let indice = 0;
        // crea los botones de paginación para mostrar hasta 8 fotos por página

        // calculo el total de páginas dividiendo por el numero d imágenes que quiero por cada una
        const totalPaginas = Math.ceil(imagenes.length / IMGSPAGINA);

        // creo un contenedor para los botones de paginación
        let $paginacion = $("#paginacion");
        if ($paginacion.length === 0) {
            $paginacion = $('<div id="paginacion" style="margin:20px 0; text-align:center;"></div>');
            $("#gallery").before($paginacion);
        }
        // Limpiamos botones antes de generarlos de nuevo
        $paginacion.empty();

        // Generamos los botones de página
        for (let p = 1; p <= totalPaginas; p++) {
            const $btn = $(`<button type="button" class="btn-pagina">${p}</button>`);
            if (p === 1) $btn.addClass('activo');
            $btn.on('click', function() {
                indice = (p - 1) * IMGSPAGINA;
                console.log("indice", indice);
                rellenarGaleriaARTIC(imagenes, indice);

                // Marcar botón activo
                $(".btn-pagina").removeClass('activo');
                $(this).addClass('activo');
            });
            $paginacion.append($btn);
        }
        rellenarGaleriaARTIC(imagenes, indice);
    });
});






// abre la ventana modal
// pongo un parametro (figura) que sera el figure sobre el que yo le he hecho clic, y más tarde trabajare con ese parametro figura
function openModal(img) {
    console.log("Funcion openModal:",img);
    // buscamos la ventana modal y la guardamos en una variable, ya que trabajaremos con ella
    var modal = document.getElementById("modal");
    // tiene el display none asi que lo cambiamos a display flex, para que al darle a ese figure se abra esa ventana modal
    modal.style.display = "flex";

    // con esto encuentra el valor del atributo src dentro del primer figure
    const rutaImagen = `https://www.artic.edu/iiif/2/${img.image_id}/full/843,/0/default.jpg`;
    console.log("Valor de la ruta de la imagen: " + rutaImagen);


    // OPCIÓN 1 PARA CALCULAR EL ATRIBUTO SRC DE LA IMAGEN DE LA VENTANA MODAL 
    // esto busca el primer img que encuentre dentro de cualquier hijo dentro de esa ventana modal
    modal.querySelector("img").src = rutaImagen;


    // OPCIÓN 2 PARA CAMBIAR EL ATRIBUTO: MOVERNOS POR LOS HIJOS
    // modal.firstElementChild.firstElementChild.setAttribute("src", rutaImagen)

    // cambiamos el valor del figcaption con la primera opción
    modal.querySelector("figcaption").innerHTML = `
        <p><h4>${img.title}<\h4><\p>
    `;
    modal.querySelector(".fechaAPI").innerHTML = `${img.date_display}`;
    modal.querySelector(".autorAPI").innerHTML = `${img.artist_titles}`;
    modal.querySelector(".dimensionAPI").innerHTML = `${img.dimensions}`;
    modal.querySelector(".tecnicaAPI").innerHTML = `${img.medium_display}`;
    modal.querySelector(".generoAPI").innerHTML = `${img.artwork_type_title}`;
    
}


// cerramos la ventana modal al darle clic a la x
function closeModal() {
    console.log("Funcion closeModal");
    modal.style.display = "none";
}
