// Activar la classe scrolled para el header

window.addEventListener("scroll", function() { //el navegador esta pendiente de cuando hay scroll
  const header = document.querySelector("header"); //se guarda el elemento header en una constante, se usa querySelector porque solo elije el primer elemento y de header solo hay uno
  
  if (window.scrollY > 250) {  // cuantos pixeles tiene que haber bajado el header para cambiar
      header.classList.add("scrolled"); //añade la classe scrolled al header, si se cumple la parte anterior de la función
  } else {
      header.classList.remove("scrolled"); //si no ha bajado más de los pixeles, elimina la clase. Al volver a la parte superior el fondo desaparece
  }
});

//Menú idiomas, base creada con IA: https://chatgpt.com/share/68d4396a-7424-8000-bfa8-84cd4a347561

// Llamamos al botón que hace la acción y la lista de menú de idiomas
const idiomaBtn = document.getElementById("idioma-btn");
const menuIdioma = document.getElementById("menu-idioma");

// Añadimos un 'listener' para ver cuando el usuario hace click en el boton
idiomaBtn.addEventListener("click", function (event) {
  event.preventDefault(); //evitamos que la pàgina recargue al hacer click

  // Miramos si el menú esta oculto o visible
  const isHidden = menuIdioma.hasAttribute("hidden");

  // Si esta oculto, lo mostramos, cambiamos el valor de la boolean de aria-expanded a true
  if (isHidden) {
    menuIdioma.removeAttribute("hidden"); // se elimina el atributo hidden
    idiomaBtn.setAttribute("aria-expanded", "true"); // definimos que esta desplegado
  } 
  // Si  el menú ya esta visible lo ocultamos
  else {
    menuIdioma.setAttribute("hidden", ""); // añadimos otra vez el atrobuto hidden
    idiomaBtn.setAttribute("aria-expanded", "false"); // definimos que esta plegado
  }
});

// Cerramos el menú si el click se hace fuera de este
document.addEventListener("click", function (event) {
  // Comproveamos si el clic se ha hecho dentro del menú
  if (!event.target.closest(".menu-idioma-desplegable")) { //realmente solo funciona encima del primer icono ya que la altura del menú esta definida como la del header
    menuIdioma.setAttribute("hidden", ""); // menu se esconde
    idiomaBtn.setAttribute("aria-expanded", "false"); // aactualizamos estado
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