// en vez de hacer la galeria con html dejo la estructura cruda ahi y el interior lo hago con js ya que va a ser dinámico

// esta funcion llama a la api y obtiene un array de 200 items

const IMGSPAGINA = 30;

function obtenerImagenesPICSUM(cantidad = 150) {
    const imagenes = [];
    for (let i = 1; i <= cantidad; i++) {
        const alto = Math.floor(Math.random() * (500 - 200) + 200);
        imagenes.push({
            url: `https://picsum.photos/300/${alto}?random=${i}`,
            descripcion: `Foto ${i}`
        });
    }
    console.log(imagenes);
    return imagenes;
}


function rellenarGaleria(array, desde = 0) {
    // antes de insertar nuevas imágenes limpiamos
    $("#gallery").empty();
    //el for recorre el array y va sumando 1 a la variable i hasta que sea igual a 30 que es el numero que quiero que se muestre en cada página (i++ es lo mismo que i=i+1) 
    for (let i = 0; i < IMGSPAGINA; i++) {
        let index = desde + i;
        if (index >= array.length) break;
        let imagen = array[index];
        $("#gallery").append(`<img src="${imagen.url}" alt="${imagen.descripcion}">`);
        // TODO || scr hacer una imagen para cuando no cargue la de la api
    }
}




// cuando la página haya cargado llama a la funcion obtenerImagenesAPI
$(document).ready(function() {
    const imagenes = obtenerImagenesPICSUM();
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
            indice = (p - 1)*IMGSPAGINA;
            console.log("indice", indice);
            rellenarGaleria(imagenes, indice);

            // Marcar botón activo
            $(".btn-pagina").removeClass('activo');
            $(this).addClass('activo');
        });
        $paginacion.append($btn);
    }
    rellenarGaleria(imagenes,indice);
    
});