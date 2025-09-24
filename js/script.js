// Activar la classe scrolled para el header

window.addEventListener("scroll", function() { //el navegador esta pendiente de cuando hay scroll
    const header = document.querySelector("header"); //se guarda el elemento header en una constante, se usa querySelector porque solo elije el primer elemento y de header solo hay uno
    if (window.scrollY > 250) {  // cuantos pixeles tiene que haber bajado el header para cambiar
      header.classList.add("scrolled"); //añade la classe scrolled al header, si se cumple la parte anterior de la función
    } else {
      header.classList.remove("scrolled"); //si no ha bajado más de los pixeles, elimina la clase. Al volver a la parte superior el fondo desaparece
    }
  });


//Swiper para carroussel
const swiper = new Swiper('.swiper', {
  // Optional parameters
  direction: 'horizontal',
  loop: true,
  autoplay: {
  delay: 5000,     // tiempo entre slides: 5s
  disableOnInteraction: false, // si el usuario hace clic, el autoplay continua
  },
  // If we need pagination
  pagination: {
    el: '.swiper-pagination',
  },

  // Navigation arrows
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  }
});