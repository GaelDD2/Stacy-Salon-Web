document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("formContacto");
  const fechaNacimiento = document.getElementById("fechaNacimiento");
  const edadInput = document.getElementById("edad");
  const mensajeEdad = document.getElementById("mensajeEdad");
  const btn = document.getElementById("button");

  // --- Prellenar el campo mensaje si llega con ?servicio= en la URL ---
  const params = new URLSearchParams(window.location.search);
  const servicio = params.get("servicio");
  if (servicio) {
    const campoMensaje = document.getElementById("mensaje");
    if (campoMensaje) {
      campoMensaje.value = decodeURIComponent(servicio);
    }
  }

  // --- Manejo de submit ---
  form.addEventListener("submit", function (e) {
    e.preventDefault(); // Evita envío por defecto

    // Calcular edad
    const fecha = new Date(fechaNacimiento.value);
    const hoy = new Date();
    let edad = hoy.getFullYear() - fecha.getFullYear();
    const mes = hoy.getMonth() - fecha.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fecha.getDate())) {
      edad--;
    }
    edadInput.value = edad;

    
    // Preparar botón
    btn.value = "Enviando...";

    // --- Envío con EmailJS ---
    const serviceID = "default_service";
    const templateID = "template_27m6vxx";

    emailjs.sendForm(serviceID, templateID, form)
      .then(() => {
        btn.value = "Enviar Correo";
        alert("✅ Formulario enviado exitosamente.");
        form.reset(); // Limpia el formulario
      })
      .catch((err) => {
        btn.value = "Enviar Correo";
        alert("❌ Error: " + JSON.stringify(err));
      });
  });
});


  
