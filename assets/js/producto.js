$(document).ready(function () {
    const contenedor = $(".row.justify-content-center");
  
    $.getJSON("https://gaeldd2.github.io/API-Stacy-s-Salon/json/productos.json", function (productos) {
      contenedor.empty(); // Limpiar contenido
  
      productos.forEach(producto => {
        const card = `
          <div class="col-md-4">
            <div class="card card-producto shadow-sm">
              <div class="position-relative overflow-hidden">
                <img src="${producto.imagen}" class="img-fluid" alt="${producto.nombre}">
              </div>
              <div class="p-3">
                <h5 class="mb-1">${producto.nombre}</h5>
                <small class="text-muted d-block">${producto.marca}</small>
                <span class="fw-bold text-danger precioP">₡${producto.precio.toLocaleString()}</span>
              </div>
              <div class="DescripcionExtra bg-danger text-white fw-bold">
                ${producto.descripcion}
              </div>
            </div>
          </div>
        `;
  
        contenedor.append(card);
      });
  
      $(".DescripcionExtra").hide();
      $(".card-producto").hover(
        function () {
          $(this).find(".DescripcionExtra").fadeIn("slow");
        },
        function () {
          $(this).find(".DescripcionExtra").fadeOut("fast");
        }
      );
    })
  });
  