document.addEventListener("DOMContentLoaded", () => {
    const contenedor = document.querySelector(".row.g-4");
  
    fetch("https://gaeldd2.github.io/API-Stacy-s-Salon/json/historia.json")
      .then(response => {
        if (!response.ok) throw new Error("Error al obtener el JSON");
        return response.json();
      })
      .then(data => {
        contenedor.innerHTML = ""; 
  
        data.imagenes.forEach(item => {
          const col = document.createElement("div");
          col.classList.add("col-md-6");
  
          if (item.src.endsWith(".mp4")) {
            // Caso especial: video
            col.innerHTML = `
              <div class="ratio ratio-16x9 rounded shadow-sm">
                <iframe src="${item.src}" 
                        title="Video de presentación"
                        allowfullscreen>
                </iframe>
              </div>
            `;
          } else {
            col.innerHTML = `
              <img src="${item.src}" class="${item.clase}" alt="${item.alt}">
            `;
          }
  
          contenedor.appendChild(col);
        });
      })
      .catch(error => {
        console.error(error);
        contenedor.innerHTML = '<p class="text-danger">No se pudieron cargar las imágenes.</p>';
      });
  });
  