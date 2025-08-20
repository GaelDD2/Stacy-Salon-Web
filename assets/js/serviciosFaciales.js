$(document).ready(function () {
    const contenedor = $("#contenedor-servicios-cabello");
  
    $.getJSON("assets/json/serviciosFaciales.json", function (servicios) {
      servicios.forEach(servicio => {
        const card = `
        <div class="col-md-4">
        <div class="card h-100 shadow border-0 rounded-4 overflow-hidden card-servicio position-relative">
          <img src="${servicio.imagen}" class="img-fluid object-fit-cover" style="height: 450px; width: 100%;" alt="${servicio.servicio}">
          <div class="card-body bg-danger text-white">
            <h5 class="card-title">${servicio.servicio}</h5>
            <p class="card-text">${servicio.descripcion}</p>
            <p class="fw-bold text-dark mb-2">₡${servicio.precio.toLocaleString()}</p>
            <a href="contacto.html?servicio=${encodeURIComponent(servicio.servicio)}" class="btn btn-dark mt-2 boton-reservar" style="display: none;">Reservar</a>
          </div>
        </div>
      </div>
        `;
        contenedor.append(card);
      });
  
      $(".card-servicio").hover(
        function () {
          $(this).find(".boton-reservar").fadeIn("fast");
        },
        function () {
          $(this).find(".boton-reservar").fadeOut("fast");
        }
      );
    }).fail(function () {
      contenedor.html('<p class="text-danger">No se pudieron cargar los servicios.</p>');
      console.error("No se pudo cargar el JSON de serviciosCabello.");
    });
  });