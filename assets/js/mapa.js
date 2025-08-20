let map;
let directionsService;
let directionsRenderer;

const salonCoords = {
    lat: 9.994176679744903,
    lng: -84.1665924348646
  };
  

async function initMap() {
  const { Map } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement } = await google.maps.importLibrary("marker");

  map = new Map(document.getElementById("map"), {
    center: salonCoords,
    zoom: 15,
    mapId: "DEMO_MAP_ID",
  });

  new AdvancedMarkerElement({
    map: map,
    position: salonCoords,
    title: "Stacy's Salon",
  });

  directionsService = new google.maps.DirectionsService();
  directionsRenderer = new google.maps.DirectionsRenderer();
  directionsRenderer.setMap(map);

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };

        new google.maps.Marker({
          position: userLocation,
          map: map,
          title: "Tu ubicación",
        });

        map.setCenter(userLocation);
        calcularDistancia(userLocation);
        trazarRuta(userLocation, salonCoords);
      },
      () => {
        alert("No se pudo obtener tu ubicación.");
      }
    );
  } else {
    alert("Tu navegador no soporta geolocalización.");
  }
}

function calcularDistancia(origen) {
  const servicio = new google.maps.DistanceMatrixService();
  servicio.getDistanceMatrix(
    {
      origins: [origen],
      destinations: [salonCoords],
      travelMode: google.maps.TravelMode.DRIVING,
    },
    (response, status) => {
      if (status === "OK") {
        const distancia = response.rows[0].elements[0].distance.text;
        const duracion = response.rows[0].elements[0].duration.text;
        document.getElementById("distancia").innerText =
          `Distancia: ${distancia}, Duración estimada: ${duracion}`;
      } else {
        document.getElementById("distancia").innerText =
          "No se pudo calcular la distancia.";
      }
    }
  );
}

function trazarRuta(origen, destino) {
  const request = {
    origin: origen,
    destination: destino,
    travelMode: google.maps.TravelMode.DRIVING,
  };

  directionsService.route(request, (result, status) => {
    if (status === "OK") {
      directionsRenderer.setDirections(result);
    } else {
      alert("No se pudo trazar la ruta.");
    }
  });
}

window.initMap = initMap;
