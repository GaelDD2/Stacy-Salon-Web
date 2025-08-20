const LAT = 9.994176679744903;
const LON = -84.1665924348646;
const API_KEY = '5a562bc1af9f812590e98db6e80cb961';

const urlOW = `https://api.openweathermap.org/data/2.5/weather?lat=${LAT}&lon=${LON}&appid=${API_KEY}&units=metric&lang=es`;

const $texto = document.getElementById('climaTexto');
const $lugar = document.getElementById('climaLugar');
const $icono = document.getElementById('climaIcono');

fetch(urlOW)
  .then(res => res.json())
  .then(data => {
    const nombre = data.name || 'Salón';
    const temp = Math.round(data.main.temp);
    const desc = data.weather[0]?.description || '';
    const sens = Math.round(data.main.feels_like);
    const icon = data.weather[0]?.icon || null;

    // Hora local usando timezone
    const fecha = new Date((data.dt + data.timezone) * 1000);
    const horaLocal = fecha.getUTCHours().toString().padStart(2,'0') + ':' + fecha.getUTCMinutes().toString().padStart(2,'0');

    $lugar.textContent = `Clima en ${nombre}`;
    $texto.textContent = `${temp}°C · ${desc} (sensación ${sens}°) · ${horaLocal}`;

    if (icon) {
      $icono.src = `https://openweathermap.org/img/wn/${icon}@2x.png`;
      $icono.style.display = 'block';
    }
  })
  .catch(err => {
    console.error(err);
    $texto.textContent = 'No se pudo cargar el clima ahora.';
  });