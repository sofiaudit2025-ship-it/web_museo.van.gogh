// en vez de hacer la galeria con html dejo la estructura cruda ahi y el interior lo hago con js ya que va a ser dinámico

// esta funcion llama a la api y obtiene un array de 187 items (187 porq filtrando en la api por que tuvieran imagenes y su autor fuera van gogh daba un total de 187)

const IMGSPAGINA = 30;
function obtenerImagenesMET() {
    console.log("API")
    // llama a la página y obtiene el array
    return fetch('https://collectionapi.metmuseum.org/public/collection/v1/search?q=artistDisplayName=Vincent%20van%20Gogh&hasImages=true')
    // esa respuesta que ha obtenido, la transforma a formato json y eso que de será data
        .then(res => res.json())
        .then(data => {
            const ids = data.objectIDs;
            console.log(ids)
            // obtengo los detalles de cada uno de esos 30 objetos, que serán promesas y esas respuestas las paso a formato json
            const promesas = ids.map(id => 
                fetch(`https://collectionapi.metmuseum.org/public/collection/v1/objects/${id}`)
                    .then(res => res.json())
            );
            
            // hago que me devuelva esas promesas
            return Promise.all(promesas);
        })
        // poner => es igual que hacer una funcion
        .then(objetos => {
            const filtrados = objetos.filter(objeto => objeto.artistDisplayName === "Vincent van Gogh");
            // transformo los objetos al formato en el que quiero que se muestren
            return filtrados.map((objeto, index) => ({
                // como algunos tienen primaryImageSmall y otros primaryImage, pongo que se muestre una o la otra
                url: objeto.primaryImageSmall || objeto.primaryImage,
                texto: objeto.title || `Imagen ${index + 1}`
            }));
        })

        .catch(error => {
            console.error('Error al obtener las imágenes del MET:', error);
            // En caso de error, devolver un array vacío o con imágenes por defecto
            return [];
        });
}

// function obtenerImagenesPICSUM(cantidad = 150) {
//     const imagenes = [];
//     for (let i = 1; i <= cantidad; i++) {
//         const alto = Math.floor(Math.random() * (500 - 200) + 200);
//         imagenes.push({
//             url: `https://picsum.photos/300/${alto}?random=${i}`,
//             descripcion: `Foto ${i}`
//         });
//     }
//     console.log(imagenes);
//     return imagenes;
// }


function rellenarGaleria(array, desde = 0) {
    console.log("rellenando la galeria")
    // antes de insertar nuevas imágenes limpiamos
    $("#gallery").empty();
    //el for recorre el array y va sumando 1 a la variable i hasta que sea igual a 30 que es el numero que quiero que se muestre en cada página (i++ es lo mismo que i=i+1) 
    for (let i = 0; i < IMGSPAGINA; i++) {
        let index = desde + i;
        if (index >= array.length) break;
        let objeto = array[index];
        if (!objeto || !objeto.url) {
            continue;
        }
        $("#gallery").append(`<img src="${objeto.url}" alt="${objeto.texto || ''}">`);
        // TODO || scr hacer una imagen para cuando no cargue la de la api

    }
}




// cuando la página haya cargado llama a la funcion obtenerImagenesAPI
$(document).ready(function() {
    obtenerImagenesMET().then(imagenes => {
        console.log("imagenes", imagenes.length);
        let indice = 0;
        // crea los botones de paginación para mostrar hasta 30 fotos por página

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
