let cantidades = { adulto: 0, nino: 0 };

function abrirModal() {
    document.getElementById('modal-entradas').style.display = 'flex';
    irAPaso(1);
}

function cerrarModal() {
    document.getElementById('modal-entradas').style.display = 'none';
}

function cambiarCantidad(tipo, valor) {
    cantidades[tipo] = Math.max(0, cantidades[tipo] + valor);
    document.getElementById(`qty-${tipo}`).innerText = cantidades[tipo];
}

function irAPaso(n) {
    // Ocultar pasos
    document.querySelectorAll('.modal-paso-v').forEach(p => p.style.display = 'none');
    // Mostrar actual
    document.getElementById('paso-' + n).style.display = 'block';
    
    // Actualizar progreso visual
    document.querySelectorAll('.paso').forEach((p, i) => {
        if(i < n) p.classList.add('active');
        else p.classList.remove('active');
    });

    if(n === 3) {
        document.getElementById('resumen-qty').innerText = `${cantidades.adulto} Adultos, ${cantidades.nino} Niños`;
        document.getElementById('resumen-total').innerText = (cantidades.adulto * 22).toFixed(2) + " €";
    }
}