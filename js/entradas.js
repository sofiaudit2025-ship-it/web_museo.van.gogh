let ticketData = { adulto: 0, estudiante: 0, gratis: 0 };

function abrirModal() {
    document.getElementById('modal-entradas').style.display = 'flex';
    document.body.style.overflow = 'hidden';
}

function cerrarModal() {
    document.getElementById('modal-entradas').style.display = 'none';
    document.body.style.overflow = 'auto';
}



function irAPaso(n) {
    const pasos = document.querySelectorAll('.modal-paso');
    pasos.forEach(p => p.style.display = 'none');
    
    
    document.getElementById('step-' + n).style.display = 'block';
}

function cambiarCant(tipo, val) {
    ticketData[tipo] = Math.max(0, ticketData[tipo] + val);
    document.getElementById(`cant-${tipo}`).innerText = ticketData[tipo];
    
    // Cálculo: 15€ adultos, 7.5€ estudiantes
    let total = (ticketData.adulto * 15) + (ticketData.estudiante * 7.5);
    document.getElementById('total-compra').innerText = total.toFixed(2) + "€";

    
}

function finalizarCompra() {
    const nombre = document.getElementById('nombre-cliente').value.trim();
    const email = document.getElementById('email-cliente').value.trim();

    if (!nombre || !email) {
        alert("Por favor, rellena todos los campos.");
        return;
    }

    // Validación básica de correo (que contenga @) como pide el estándar
    if (!email.includes("@")) {
        alert("Por favor, introduce un correo electrónico válido.");
        return;
    }

    alert("¡Compra realizada con éxito! Recibirás tus entradas en " + email);
    cerrarModal();
}