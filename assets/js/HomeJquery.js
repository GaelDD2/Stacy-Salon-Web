$(document).ready(function(){
    // Efecto en Promos

    $(".cardPromo").hover(
        function () {
          // Mouse entra
          $(this).find(".card-text").append('<p class="extraInfo">Reservá tu promo ya</p>');
          $(this).find(".card-text").append('<a href="Cabello.html" class="btn btn-danger px-4 py-2 mt-2 shadow-sm btnTemp">Ver más</a>');
          
        },
        function () {
          // Mouse sale
          $(this).find(".card-text").find(".extraInfo").remove();
          $(this).find(".btnTemp").remove();

        }
      );
    // Efecto en Comentarios
    let total = $(".comentario").length;
    let visibleCount = 3;
    let currentIndex = 0;

    function mostrarGrupo() {
      $(".comentario").hide();
      for (let i = 0; i < visibleCount; i++) {
        let index = (currentIndex + i) % total;
        $(".comentario").eq(index).fadeIn(400);
      }
      currentIndex = (currentIndex + visibleCount) % total;
    }

    mostrarGrupo(); 

    setInterval(mostrarGrupo, 4000); 
    // Efecto en Comentarios

    function animarAlScroll() {
        $(".fade-on-scroll").each(function () {
          const topElemento = $(this).offset().top;
          const bottomVentana = $(window).scrollTop() + $(window).height();
    
          if (topElemento < bottomVentana - 100) {
            $(this).addClass("visible");
          }
        });
      }
    
      $(window).on("scroll", animarAlScroll);
      $(document).ready(animarAlScroll);





})