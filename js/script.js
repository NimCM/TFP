// Activar la classe scrolled para el header

window.addEventListener("scroll", function() { //el navegador esta pendiente de cuando hay scroll
    const header = document.querySelector("header"); //se guarda el elemento header en una constante, se usa querySelector porque solo elije el primer elemento y de header solo hay uno
    if (window.scrollY > 350) {  // cuantos pixeles tiene que haber bajado el header para cambiar
      header.classList.add("scrolled"); //añade la classe scrolled al header, si se cumple la parte anterior de la función
    } else {
      header.classList.remove("scrolled"); //si no ha bajado más de los pixeles, elimina la clase. Al volver a la parte superior el fondo desaparece
    }
  });