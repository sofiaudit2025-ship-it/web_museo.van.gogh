// en vez de hacer la galeria con html dejo la estructura cruda ahi y el interior lo hago con js ya que va a ser dinámico

const IMGSPAGINA = 8;
const SEARCHVANGOGH ='https://collectionapi.metmuseum.org/public/collection/v1/search?artistOrCulture=true&hasImages=true&q=Vicent+van+Gogh'
const SEARCHPORTRAIT='https://collectionapi.metmuseum.org/public/collection/v1/search?q=artistDisplayName=Vincent%20van%20Gogh+portrait&hasImages=true'
const SEARCHLANDSCAPE='https://collectionapi.metmuseum.org/public/collection/v1/search?q=artistDisplayName=Vincent%20van%20Gogh+landscape&hasImages=true'
const SEARCHFLOWERS='https://collectionapi.metmuseum.org/public/collection/v1/search?q=artistDisplayName=Vincent%20van%20Gogh+flowers&hasImages=true'

// como algunos titulos son muy largos, a partir de 15 caracteres que ponga puntos suspensivos
function truncarTexto(texto, maxLength = 15) {
    if (texto.length > maxLength) {
        return texto.slice(0, maxLength) + '...';
    }
    return texto;
}

function obtenerImagenesMET() {
    console.log("API")
    // llama a la página y obtiene el array
    return fetch(SEARCHVANGOGH)
    // esa respuesta que ha obtenido, la transforma a formato json y eso que de será data
        .then(res => res.json())
        .then(data => {
            if (data.objectIDs.length >70) {
                data.objectIDs = data.objectIDs.slice(0,70)
            }
            return data.objectIDs;
            
        })

        .catch(error => {
            console.error('Error al obtener las imágenes del MET:', error);
            // En caso de error, devolver un array vacío o con imágenes por defecto
            return [];
        });
}


function rellenarGaleria(array, desde = 0) {
    console.log("rellenando la galeria")
    // antes de insertar nuevas imágenes limpiamos
    $("#gallery").empty();


    //el for recorre el array y va sumando 1 a la variable i hasta que sea igual a 30 que es el numero que quiero que se muestre en cada página (i++ es lo mismo que i=i+1) 
    for (let i = 0; i < IMGSPAGINA; i++) {
        let index = desde + i;
        if (index >= array.length) break;
        let objeto = array[index];

        fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${objeto}`).
        then(res => res.json())
        .then(data => {
            console.log("data", data);
            
            $("#gallery").append(`
                <figure class="info-obra">
                    <img src="${data.primaryImageSmall || data.primaryImage || null}" alt="${data.title || 'N/A'}">
                    <figcaption>
                        <h3>${truncarTexto(data.title) || 'N/A'}</h3>
                        <p>${data.objectEndDate || 'N/A'}</p>
                    </figcaption>
                </figure>
            `);
        // TODO || scr hacer una imagen para cuando no cargue la de la api
        })
        .catch(error => {
            console.error('Error al obtener las imágenes del MET:', error);
            $("#gallery").append(`<h2><i class="fa-solid fa-triangle-exclamation"></i> Servidor sobrecargado. Por favor, inténtelo más tarde.</h2>`);
        });
    }
}




// cuando la página haya cargado llama a la funcion obtenerImagenesAPI
$(document).ready(function() {
    obtenerImagenesMET().then(imagenes => {
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
                rellenarGaleria(imagenes, indice);

                // Marcar botón activo
                $(".btn-pagina").removeClass('activo');
                $(this).addClass('activo');
            });
            $paginacion.append($btn);
        }
        rellenarGaleria(imagenes, indice);
    });
});



// A veces la función obtenerImagenesMET si que funciona y recoge todos los ids, pero a la hora de ejecutar la función rellenarGaleria falla, por eso sale el indice pero no las imágenes. 
// Otras veces directamente falla la funcion obtenerImagenesMET, por eso sale un unico mensaje de error
// si alguna de estas falla, esperar y recargar



// Ventana modal api
