const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');

    // Alternar la visibilidad del menú al hacer clic en el botón hamburguesa
    menuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });

    // Cerrar el menú automáticamente al hacer clic en cualquier enlace
    mobileLinks.forEach(link => {
      link.addEventListener('click', () => {
        mobileMenu.classList.add('hidden');
      });
    });


// Lógica de la Calculadora de Envíos en Quetzales (Q)
const radioServicios = document.querySelectorAll('input[name="tipo_servicio"]');
const inputsMaritimo = document.getElementById('inputs-maritimo');
const inputsAereo = document.getElementById('inputs-aereo');
const precioResultado = document.getElementById('precio-resultado');
const btnCotizarWA = document.getElementById('btn-cotizar-wa');

// Inputs de cálculo
const inputAlto = document.getElementById('alto');
const inputAncho = document.getElementById('ancho');
const inputLargo = document.getElementById('largo');
const inputLibras = document.getElementById('libras');

// Alternar entre tipo Marítimo y Aéreo
radioServicios.forEach(radio => {
  radio.addEventListener('change', (e) => {
    if (e.target.value === 'maritimo') {
      inputsMaritimo.classList.remove('hidden');
      inputsAereo.classList.add('hidden');
    } else {
      inputsMaritimo.classList.add('hidden');
      inputsAereo.classList.remove('hidden');
    }
    calcularTotal();
  });
});

// Función para calcular tarifas en Quetzales
function calcularTotal() {
  const tipo = document.querySelector('input[name="tipo_servicio"]:checked').value;
  let total = 0;

  if (tipo === 'maritimo') {
    const alto = parseFloat(inputAlto.value) || 0;
    const ancho = parseFloat(inputAncho.value) || 0;
    const largo = parseFloat(inputLargo.value) || 0;
    
    // Tarifa marítima estimada en Quetzales por pulgada cúbica
    // (Ajusta el 0.18 según tu tarifa real por caja)
    const volumen = alto * ancho * largo;
    total = volumen * 0.18; 
  } else {
    const libras = parseFloat(inputLibras.value) || 0;
    // Tarifa aérea estimada: Q35.00 por libra
    total = libras * 35.00;
  }

  // Formato en Quetzales con 2 decimales
  precioResultado.textContent = `Q ${total.toFixed(2)}`;
}

// Escuchar cambios en los inputs para actualizar en tiempo real
[inputAlto, inputAncho, inputLargo, inputLibras].forEach(input => {
  if (input) input.addEventListener('input', calcularTotal);
});

// Redirigir a WhatsApp con el monto en Quetzales
if (btnCotizarWA) {
  btnCotizarWA.addEventListener('click', () => {
    const total = precioResultado.textContent;
    const mensaje = encodeURIComponent(`Hola, calculé mi envío en la página web con un estimado de ${total}. Quisiera confirmar los detalles.`);
    window.open(`https://wa.me/50233878279?text=${mensaje}`, '_blank');
  });
}

// Lógica para el Acordeón de Preguntas Frecuentes (FAQ)
const faqButtons = document.querySelectorAll('.faq-btn');

faqButtons.forEach(btn => {
  btn.addEventListener('click', () => {
    const content = btn.nextElementSibling;
    const icon = btn.querySelector('.faq-icon');

    // Alternar la visibilidad de la respuesta
    content.classList.toggle('hidden');

    // Rotar el icono de flecha
    if (content.classList.contains('hidden')) {
      icon.style.transform = 'rotate(0deg)';
    } else {
      icon.style.transform = 'rotate(180deg)';
    }
  });
});

// Enviar formulario de contacto a WhatsApp
const btnEnviarContacto = document.getElementById('btn-enviar-contacto');

if (btnEnviarContacto) {
  btnEnviarContacto.addEventListener('click', () => {
    const nombre = document.getElementById('contact-nombre').value.trim();
    const telefono = document.getElementById('contact-telefono').value.trim();
    const mensaje = document.getElementById('contact-mensaje').value.trim();

    if (!nombre || !telefono) {
      alert('Por favor ingresa tu nombre y número de teléfono.');
      return;
    }

    const textoWhatsApp = encodeURIComponent(
      `Hola, mi nombre es ${nombre} (Tel: ${telefono}).\nConsulta: ${mensaje || 'Quisiera más información sobre los servicios.'}`
    );

    window.open(`https://wa.me/50233878279?text=${textoWhatsApp}`, '_blank');
  });
}