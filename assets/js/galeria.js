function filtrarGaleria(categoria) {
    const items = document.querySelectorAll('.galeria-item');

    items.forEach(item => {
      if (categoria === 'todos') {
        item.style.display = 'block';
      } else {
        if (item.classList.contains(categoria)) {
          item.style.display = 'block';
        } else {
          item.style.display = 'none';
        }
      }
    });
}

function reproducirAudio() {
    const audio = document.getElementById('backgroundMusic');
    audio.volume = 0.3;
    audio.play().catch(err => {
      console.warn("El navegador bloqueó la reproducción automática");
    });

    document.getElementById('musicButton').style.display = 'none';
   }

   const urlGaleria="https://gaeldd2.github.io/API-Stacy-s-Salon/json/galeria.json";
   $.getJSON(urlGaleria, function (data) {
    let html = "";

    data.imagenes.forEach(function (imagen) {
      html += `
        <div class="col-6 col-md-4 galeria-item ${imagen.clase}">
          <div class="galeria-thumb" data-bs-toggle="modal" data-bs-target="#modalImagen" data-img="${imagen.src}">
            <img src="${imagen.src}" class="img-fluid rounded shadow-sm" alt="${imagen.alt}">
          </div>
        </div>
      `;
    });

    $("#contenedorGaleria").html(html);
  });