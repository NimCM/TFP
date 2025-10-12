// esperar a que el HTML este completamente cargado para cargar el JS
document.addEventListener('DOMContentLoaded', function() {

  // ACTIVAR CLASSE SCROLLED PARA EL HEADER

  window.addEventListener("scroll", function() { //el navegador esta pendiente de cuando hay scroll
    const headerInicio = document.querySelector(".header-inicio"); //se guarda el elemento header en una constante, se usa querySelector porque solo elije el primer elemento y de header solo hay uno
    
    if(headerInicio){
      if (window.scrollY > 100) {  // cuantos pixeles tiene que haber bajado el header para cambiar
          headerInicio.classList.add("scrolled"); //añade la classe scrolled al header, si se cumple la parte anterior de la función
      } else {
          headerInicio.classList.remove("scrolled"); //si no ha bajado más de los pixeles, elimina la clase. Al volver a la parte superior el fondo desaparece
      }
    } 
  });


  //MENU IDIOMAS, base creada con IA: https://chatgpt.com/share/68d4396a-7424-8000-bfa8-84cd4a347561

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
      idiomaBtn.classList.add("desplegado"); 

      // Si  el menú ya esta visible lo ocultamos
    }else {
      menuIdioma.setAttribute("hidden", ""); // añadimos otra vez el atrobuto hidden
      idiomaBtn.setAttribute("aria-expanded", "false"); // definimos que esta plegado
      idiomaBtn.classList.remove("desplegado");
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


  //MENU NAVEGACIÓN, misma base que menú idiomas, condicion de resolución creada con IA: https://chatgpt.com/share/68d55336-f040-8000-98de-2c509aefeeb1

  // Llamamos al botón que hace la acción y la lista de menú de navegacion
  const navBtn = document.getElementById("nav-btn");
  const menuNav = document.getElementById("menu-navegacion");
  const navBtnBg = document.getElementById("nav-btn");


  // Función que activa/desactiva el menú segun resolución de pantalla
  function checkScreenSize() {
    if (window.innerWidth >= 770) {
      // Pantallas grandes: menú visible 
      menuNav.removeAttribute("hidden");
      navBtn.setAttribute("aria-expanded", "true");
    } else {
      // Pantallas pequeñas: menú oculto por defecto
      menuNav.setAttribute("hidden", "");
      navBtn.setAttribute("aria-expanded", "false");
    }
  }

  //Mismo código que para el menñu de idiomas pero se adapta a la resolución de pantralla pequeña
  // Añadimos un 'listener' para ver cuando el usuario hace click en el boton
  navBtn.addEventListener("click", function (event) {
    if (window.innerWidth < 770) {
      event.preventDefault(); //evitamos que la pàgina recargue al hacer click

      const isHidden = menuNav.hasAttribute("hidden"); // Miramos si el menú esta oculto o visible

      if (isHidden) { // Si esta oculto, lo mostramos, cambiamos el valor de la boolean de aria-expanded a true
        menuNav.removeAttribute("hidden"); // se elimina el atributo hidden
        navBtn.setAttribute("aria-expanded", "true");  // Si  el menú ya esta visible lo ocultamos
        navBtn.classList.add("desplegado");


      } else {
        menuNav.setAttribute("hidden", ""); // añadimos otra vez el atrobuto hidden
        navBtn.setAttribute("aria-expanded", "false");// definimos que esta plegado
        navBtn.classList.remove("desplegado");
      }
    }
  });

  // Cerramos el menú si el click se hace fuera de este
  document.addEventListener("click", function (event) {
    if (window.innerWidth < 770) {
      if (!event.target.closest(".menu-nav-desplegable") && !event.target.closest("#nav-btn")) { // Comprovamos si el clic se ha hecho dentro del menú
        //realmente solo funciona encima del primer icono ya que la altura
        menuNav.setAttribute("hidden", "");  // menu se esconde
        navBtn.setAttribute("aria-expanded", "false");
      } // aactualizamos estado
    }
  });

  // Se revisa el tamaño de pantalla
  checkScreenSize();
  window.addEventListener("resize", checkScreenSize);



  //SWIPER PARA CARROUSSEL
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


// MAPA con LEAFLET (con filtros y depslegable, AI:  https://claude.ai/share/35d57a74-0b43-457e-8c57-a7fdcd718f39)

let map;
let allLocations = []; // Guardar todas las ubicaciones del JSON
let routingControl = null; // Guardar el control de rutas per poder eliminarlo
let tipusSeleccionat = 'tots';
let volAccessible = false;
let volGratuit = false;

//Inicializamos el mapa y elegimos las coordenadas del sitio que se ve y el zoom
setTimeout(function() { 
  map = L.map('map').setView([41.70220603341134, 2.8357029478855527], 13);  //Coordenadas Museu del Mar, inicio de la ruta
  console.log('✓ Mapa carregat correctament');
  
  setTimeout(function() {
    map.invalidateSize();
  }, 200);

  // SEGUIMIENTO DEL USUARIO EN PANTALLAS PEQUEÑAS, dentro del set timeout del mapa para que funcione

  // Activa el código con una pantalla menor a 865px, como el media queries del SCSS
  console.log("Amplada actual:", window.innerWidth);
  if (window.innerWidth < 3000 && "geolocation" in navigator) { //ideal poner a 865, ahora mismo cambiado para poder ver des de el ordenador
    console.log("Activant seguiment d'ubicació...");

    // Icono para el usuario
    const userIcon = L.icon({
      iconUrl: 'data:image/svg+xml;base64,' + btoa(`
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24">
          <circle cx="12" cy="12" r="8" fill="#c8e28b" stroke="#693c82" stroke-width="2"/>
        </svg>
      `),
      iconSize: [24, 24], //#dec7eb  #c8e28b 
      iconAnchor: [12, 12]
    });

    let userMarker = null;

    // Activa el watchPosition para seguir la ubicación del usuario
    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        console.log("Nova posició:", position.coords);
        const lat = position.coords.latitude;
        const lng = position.coords.longitude;

        if (!userMarker) {
          // Si no existe, se crea el marcador inicial
          userMarker = L.marker([lat, lng], { icon: userIcon }).addTo(map);
        } else {
          // Actualitza su posición
          userMarker.setLatLng([lat, lng]);
        }

        // Centrar mapa sobre la posición del usuario, por ahora desconectado ya que el mapa a veces falla
        // map.setView([lat, lng]);
      },
      (error) => {
        console.error("Error al seguir la posició:", error);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 10000,
        timeout: 10000
      }
    );
  }

  //Se añade la URL del OpenStreetMaps para poder usar sus tiles (imagenes fragmentadas) y tener la visualización del mapa. Aquí también se define la atribución a OpenStreetMaps y el máximo nivel de zoom
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    crossOrigin: true // Ayuda con problemas de CORS, Crossed Origin Resource Shring, contenido que proviene de paginas con un URL distinto, como el mapa
  }).addTo(map);

  //Cambiamos el marcador predeterminado por un icono
  var ubiLight = L.icon({
      iconUrl: '../css/icons/btn/ubi-light.webp',
      iconSize:     [36.94, 38.52], // tamaño del icono
      iconAnchor:   [18.47, 38.52], // punto de la ubicación
      popupAnchor:  [0, -38] // point from which the popup should open relative to the iconAnchor
  });

  L.Icon.Default.mergeOptions({
    shadowUrl: null
  });

  L.Marker.prototype.options.icon = ubiLight; //cambiar los markers predefinidos por mi icono

  // Cargar el JSON
  fetch('js/llocs_interes.json') //link con el archivo JSON
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      if (!Array.isArray(data.locations)) {
        throw new Error('Les dades no són un array');
      }

      allLocations = data.locations; // Guardar totes les ubicacions
      console.log('✓ Dades carregades:', allLocations.length, 'ubicacions');
      
      // Generar markers y ruta inicial (con todos los puntos)
      generarMapaIRuta(ubiLight);
      
      // Inicializar los filtros  despues de cragar los datos
      inicialitzarFiltres();
    })
    .catch(error => {
      console.error('Error detallat:', error);
    });

}, 100); 

//Comprovamos tamaño del dispositivo

    function isMobile() {
      return window.innerWidth <= 865; 
    }


// FUNCIÓ PER GENERAR MARKERS I RUTA segons els filtres actius
function generarMapaIRuta(iconMarker) {
  console.log('🔄 Regenerant mapa amb filtres...');
  
  // Eliminar tots els markers actuals
  map.eachLayer(function(layer) {
    if (layer instanceof L.Marker) {
      map.removeLayer(layer);
    }
  });
  
  // Eliminar la ruta anterior si existeix
  if (routingControl) {
    map.removeControl(routingControl);
    routingControl = null;
  }
  
  // FILTRAR las ubicaciones segun los criterios
  const ubicacionsFiltrades = allLocations.filter(ubicacio => {
    const passaTipus = tipusSeleccionat === 'tots' || ubicacio.tipus.includes(tipusSeleccionat);
    const passaAccess = !volAccessible || ubicacio.access === 'accessible';
    const passaPreu = !volGratuit || ubicacio.price === 'gratuit';
    
    return passaTipus && passaAccess && passaPreu;
  });
  
  console.log('✓ Ubicacions filtrades:', ubicacionsFiltrades.length, 'de', allLocations.length);
  
  // Si no hay ubicaciones filtradas, no hacer nada
  if (ubicacionsFiltrades.length === 0) {
    console.warn('⚠️ No hi ha ubicacions que compleixin els filtres');
    return;
  }
  
  let waypoints = []; //crear un array a partir de los puntos del JSON
  
  // Crear solo markers de las ubicaciones filtradas

  const markersMap = {}; //Constante para que el mouseover en las cards reslate los markers

  ubicacionsFiltrades.forEach((ubicacio) => {
    if (!ubicacio.coordinates?.lat || !ubicacio.coordinates?.lng) return;

    const marker = L.marker(
      [ubicacio.coordinates.lat, ubicacio.coordinates.lng], //recopilación de las coordenadas para ponerlas con un marcador
      { icon: iconMarker, idLloc: ubicacio.id } // guardar id del marcador
    ).addTo(map);

    const popupContent = ` 
      <div class="popup-marker">
        <h3>${ubicacio.name}</h3>
        <p><strong>${ubicacio.woman}</strong></p>
        <p>${ubicacio.temps}</p>
      </div>
    `; //Contenido del pop-up

    const popup = L.popup({
      closeButton: true, //que el pop-up fijo tenga la cruz para cerrar
      autoClose: false, // no cierra automáticamente cuando se abren  pop-ups con mouseover
    }).setContent(popupContent);

    marker.bindPopup(popup);

    // Abrir el pop-up temporalmente con mouseover
    marker.on('mouseover', function () {
      if (isMobile()) return; //Si es dispositivo móvil no aplicar
      if (!this.isPopupOpen()) {
        this.openPopup();
        // esconder la cruz en los pop-ups temporales
        if (this._popup._closeButton) this._popup._closeButton.style.display = 'none';
      }
    });

    // Cerrar el pop-up cuando el mouse no está encima
    marker.on('mouseout', function () {
      if (isMobile()) return;  //Si es dispositivo móvil no aplicar
      if (!this._popup.options.permanent) {
        this.closePopup();
      }
    });

    // Abrir pop-up con click permanente
    marker.on('click', function () {
      // cerrar otros pop-ups permanentes
      map.eachLayer(layer => {
        if (layer instanceof L.Marker && layer._popup && layer.isPopupOpen()) {
          layer.closePopup(); 
          // desmarcar la card seleccionada anteriormente
          const prevId = layer.options.idLloc;
          if (prevId) {
            document.getElementById(prevId)?.classList.remove('card-highlighted'); //elimina la classe highlighted de la card
          }
          layer._popup.options.permanent = false;
        }
      });

      // abrir popup actual como permanente
      this._popup.options.permanent = true;
      this._popup.options.closeOnClick = true; // el pop-up permanente se cierra al tocar fuera del popup
      this.openPopup();
      if (this._popup._closeButton)
        this._popup._closeButton.style.display = ''; // muestra la cruz de cerrar

      gestionarClicMarcador(ubicacio.id);
    });

    //Quitar la classe highlighted de las cards cuando se des-selecciona el pop-up permanente
    marker.on('popupclose', function () {
      this._popup.options.permanent = false;
      const card = document.getElementById(ubicacio.id);
      if (card) card.classList.remove('card-highlighted');
    });

    markersMap[ubicacio.id] = marker; //Guardar el marker para el id
    waypoints.push(L.latLng(ubicacio.coordinates.lat, ubicacio.coordinates.lng));
  });

  //Mouseover en las cards aplica trasnformacion en los markers

  document.querySelectorAll('.card-llocs').forEach(card => {
    const idLloc = card.id;
    const marker = markersMap[idLloc];
    if (!marker) return;

    card.addEventListener('mouseenter', () => {
      const iconMarkerHover = L.icon({
      iconUrl: '../css/icons/altres/ubi-ultralight.png',
      iconSize: [50, 50],      // tamaño nuevo
      iconAnchor: [20, 40]     // punto de anclaje, des de donde sale el marker 
    });
      marker.setIcon(iconMarkerHover);
    });

    card.addEventListener('mouseleave', () => { //Cuando el mouse deja la card, el marker vuelve a su tamaño real
      marker.setIcon(iconMarker);
    });
  });

  //En modo móvil, que cuando la card este visible en pantalla se resalte el marker
  
    const iconHighlightMobile = L.icon({ //Icono de resaltar el marker, la misma que en desktop pero a parte por si la quiero cambiar
      iconUrl: '../css/icons/altres/ubi-ultralight.png',
      iconSize: [50, 50],
      iconAnchor: [20, 40]
    });

    function isMobileHighlight() { //Detectar si esta en dispositivo móvil
      return window.innerWidth <= 865;
    }

    const observer = new IntersectionObserver((entries) => { //Observar la posición de las cards para ver si estan completamente visbles
      entries.forEach(entry => {
        const card = entry.target;
        const marker = markersMap[card.id];
        if (!marker) return;

        if (isMobileHighlight()) { // solo en modo mobil
          if (entry.isIntersecting) {
            marker.setIcon(iconHighlightMobile); // Resaltar marker (cambiarlo por el icono definifo arriba)
          } else {
            marker.setIcon(iconMarker); // Volver al original
          }
        }
      });
    }, {
      root: null,
      threshold: 0.5 // ≥50% visible de la card para aplicar el cambio
    });

    // Observamos todas las cards
    document.querySelectorAll('.card-llocs').forEach(card => observer.observe(card));
  
  // Crear la ruta només amb els punts filtrats
  if (waypoints.length > 1) {
    routingControl = L.Routing.control({
      waypoints: waypoints,
      router: L.Routing.osrmv1({
        serviceUrl: 'https://router.project-osrm.org/route/v1'
      }),
      show: false, //esconder panel lateral de ruta
      addWaypoints: false, //evitar que el usuario pueda añadir puntos nuevos
      routeWhileDragging: true,
      lineOptions: {
        styles: [{color: '#9f7fb2ff', weight: 4}] //estilo de la ruta #260936
      },
      createMarker: function() { return null; } //no crear marcadores automáticos
    }).addTo(map);

    routingControl.on('routesfound', function(e) { //Ajuste para asegurar que la ruta se carga y se ve centrada
      var bounds = L.latLngBounds(waypoints);
      map.fitBounds(bounds, {padding: [50, 50]});
    });
    
    console.log('✓ Ruta generada amb', waypoints.length, 'punts');
  } else if (waypoints.length === 1) {
    // Si només hi ha un punt, centrar-lo
    map.setView(waypoints[0], 15);
    console.log('✓ Només 1 punt, sense ruta');
  }

}

//Calculo del tiempo segun posición del usuario (API: https://project-osrm.org/docs/v5.7.0/api/#responses)


// Función para obtener el tiempo caminando con la API de OSRM
async function obtenirTempsOSRM(userLat, userLng, destLat, destLng) {
  try {
    const url = `https://router.project-osrm.org/route/v1/foot/${userLng},${userLat};${destLng},${destLat}?overview=false`;
    //El tiempo no es muy preciso pero se mantiene el sistema de la Api como muestra
    const response = await fetch(url);
    if (!response.ok) throw new Error('Error OSRM: ' + response.status);

    const data = await response.json();
    if (data.routes && data.routes.length > 0) {
      const tempsSegons = data.routes[0].duration;
      const tempsMin = Math.round(tempsSegons / 60); // convertir a minutos
      return tempsMin;
    } else {
      return null;
    }
  } catch (err) {
    console.error(err);
    return null;
  }
}

// WatchPosition del usuario (solo en modo móvil)

if ("geolocation" in navigator) {
  navigator.geolocation.watchPosition(
    async (position) => {
      const userLat = position.coords.latitude;
      const userLng = position.coords.longitude;

      for (const ubicacio of allLocations) {
        if (!ubicacio.coordinates?.lat || !ubicacio.coordinates?.lng) continue;

        const tempsMin = await obtenirTempsOSRM(
          userLat,
          userLng,
          ubicacio.coordinates.lat,
          ubicacio.coordinates.lng
        );

        if (tempsMin !== null) {
          // Solo actualiza los datos en modo móvil
          if (window.innerWidth <= 865) {
            const liTempsElems = document.querySelectorAll(
              `.card-llocs[data-id='${ubicacio.id}'] .li-mapa.mini`
            );
            const liTemps = liTempsElems[1];
            if (liTemps) {
              liTemps.textContent = `${tempsMin} min caminant`;
              liTemps.dataset.id = ubicacio.id;
            }

            map.eachLayer((layer) => {
              if (layer instanceof L.Marker && layer.options.idLloc === ubicacio.id) {
                const popup = layer.getPopup();
                if (popup) {
                  popup.setContent(`
                    <div class="popup-marker">
                      <h3>${ubicacio.name}</h3>
                      <p><strong>${ubicacio.woman}</strong></p>
                      <p>Temps estimat caminant: ${tempsMin} min</p>
                    </div>
                  `);
                }
              }
            });
          }
        }
      }
    },
    (err) => console.error(err),
    { enableHighAccuracy: true, maximumAge: 10000, timeout: 10000 }
  );
}

// Listener para redimensionar la ventana y restaurar info JSON en modo desktop
window.addEventListener("resize", () => {
  allLocations.forEach((ubicacio) => {
    const liTempsElems = document.querySelectorAll(
      `.card-llocs[data-id='${ubicacio.id}'] .li-mapa.mini`
    );
    const liTemps = liTempsElems[1]; // segundo <li>

    if (!liTemps) return;

    if (window.innerWidth > 865) {
      // Desktop: volver a la info del JSON
      liTemps.textContent = `Temps: ${ubicacio.temps || "20 min"}`;
      delete liTemps.dataset.id;

      // Popup también recupera la info del JSON
      map.eachLayer((layer) => {
        if (layer instanceof L.Marker && layer.options.idLloc === ubicacio.id) {
          const popup = layer.getPopup();
          if (popup) {
            popup.setContent(`
              <div class="popup-marker">
                <h3>${ubicacio.name}</h3>
                <p><strong>${ubicacio.woman}</strong></p>
                <p>${ubicacio.temps}</p>
              </div>
            `);
          }
        }
      });
    }
  });
});





//HIGHLIGHT EN LAS CARDS CUANDO SE SELECCIONA EL MARKER (AI: https://claude.ai/share/fdae29c0-6a77-4323-a448-f155343b5914)

//Función para ver el click en el marcador
function gestionarClicMarcador(idLloc) {
  console.log('🎯 Marcador clicat - ID:', idLloc);
  
  // Encontrar la card que toca
  const card = document.getElementById(idLloc);
  
  if (!card) {
    console.warn('⚠️ No s\'ha trobat la card amb ID:', idLloc);
    return;
  }
  
  // Quitar la classe highlight de todas las cards
  document.querySelectorAll('.card-llocs').forEach(c => {
    c.classList.remove('card-highlighted');
  });
  
  // Añadir la classe highlight a la card seleccionada
  card.classList.add('card-highlighted');
  
  // Hacer scroll segun dipositivo
  scrollCapACard(card);
}

// FUNCIÓ PARA HACER SCROLL Y CENTRAR LA CARD
function scrollCapACard(card) {
  const llocsList = document.querySelector('.llocs-list');
  const isMobile = window.matchMedia('(max-width: 865px)').matches;
  
  if (isMobile) {
    // MÒBIL: Scroll horizontal per centrar la card
    const containerWidth = llocsList.offsetWidth;
    const cardLeft = card.offsetLeft;
    const cardWidth = card.offsetWidth;
    
    // Calcular la posicióN per centrar la card
    const scrollPosition = cardLeft - (containerWidth / 2) + (cardWidth / 2);
    
    llocsList.scrollTo({
      left: scrollPosition,
      behavior: 'smooth'
    });
    
    console.log('📱 Scroll horitzontal a la card');
  } else {
    // DESKTOP: Scroll vertical para asegurar que la card está visible
    card.scrollIntoView({
      behavior: 'smooth',
      block: 'center', // Centrar verticalmente
      inline: 'nearest'
    });
    
    console.log('🖥️ Scroll vertical a la card');
  }
}


// DESPLEGABLE FILTROS
function inicialitzarFiltres() {
  console.log('✓ Inicialitzant filtres...');
  
  const filtreGrup = document.getElementById('contenidor-filtres');
 
  const customSelect = document.createElement('div'); //Crear el elemento div en el html
  customSelect.className = 'custom-select'; // da una classe
  customSelect.id = 'tipus-lloc'; //associa un id

  const selectSelected = document.createElement('div');
  selectSelected.className = 'select-selected';
  selectSelected.textContent = 'Tots';

  const selectItems = document.createElement('div');
  selectItems.className = 'select-items select-hide';

  const opcions = [ //opciones en el desplegable segun las caracteristicas que se pueden encontrar en el json y html
      { value: 'tots', text: 'Tots' },
      { value: 'escultura', text: 'Escultura' },
      { value: 'edifici', text: 'Edifici' },
      { value: 'museu', text: 'Museu' },
      { value: 'ruines', text: 'Ruïnes' },
      { value: 'natural', text: 'Espai Natural' },
      { value: 'religios', text: 'Espai Religiós' },
      { value: 'urba', text: 'Espai Urbà' },
      { value: 'exterior', text: 'Exterior' },
      { value: 'interior', text: 'Interior' }
  ];

  opcions.forEach(opcio => {
      const item = document.createElement('div');
      item.dataset.value = opcio.value;
      item.textContent = opcio.text;
      selectItems.appendChild(item);
  });

  customSelect.appendChild(selectSelected);
  customSelect.appendChild(selectItems);
  filtreGrup.appendChild(customSelect);

  // Abrir/cerrar desplegable
  selectSelected.addEventListener('click', function(e) {
      e.stopPropagation();
      selectItems.classList.toggle('select-hide');
  });

  // Seleccionar opción
  selectItems.querySelectorAll('div').forEach(item => {
      item.addEventListener('click', function(e) {
          e.stopPropagation();
          tipusSeleccionat = this.dataset.value;
          selectSelected.textContent = this.textContent;
          selectItems.classList.add('select-hide');
          aplicarFiltres(); // Aplicar filtros cuando cambia
      });
  });

  // Cerrar si clicas fuera
  document.addEventListener('click', function() {
      selectItems.classList.add('select-hide');
  });

  //Filtros de las checkboxes
  const checkboxAccessible = document.querySelector('.filtre-access');
  const checkboxGratuit = document.querySelector('.filtre-preu');

  if (checkboxAccessible) {
      checkboxAccessible.addEventListener('change', function() {
          volAccessible = this.checked;
          console.log('Checkbox Accessible:', volAccessible); // Debug
          aplicarFiltres();
      });
  }

  if (checkboxGratuit) {
      checkboxGratuit.addEventListener('change', function() {
          volGratuit = this.checked;
          console.log('Checkbox Gratuït:', volGratuit); // Debug
          aplicarFiltres();
      });
  }
  
  console.log('✓ Filtres inicialitzats correctament');
}


// APLICAR FILTROS (regenerar mapa, ruta y cards)
function aplicarFiltres() {
  if (!map) {
    console.warn('El mapa encara no està carregat');
    return;
  }
  
  console.log('📋 Aplicant filtres - Tipus:', tipusSeleccionat, '| Accessible:', volAccessible, '| Gratuït:', volGratuit);
  
  // Obtener el icono 
  var ubiLight = L.icon({
      iconUrl: '../css/icons/btn/ubi-light.webp',
      iconSize: [36.94, 38.52],
      iconAnchor: [18.47, 38.52],
      popupAnchor: [0, -38]
  });
  
  // Regenerar mapa y ruta con los datos filtrados
  generarMapaIRuta(ubiLight);
  
  // Filtrar CARDS
  const cards = document.querySelectorAll('.card-llocs');
  let cardsVisibles = 0;
  
  cards.forEach(card => {
    const categoryData = card.dataset.category || '';
    
    const passaTipus = tipusSeleccionat === 'tots' || categoryData.includes(tipusSeleccionat);
    const passaAccess = !volAccessible || card.dataset.access === 'accessible';
    const passaPreu = !volGratuit || card.dataset.price === 'gratuit';

    if (passaTipus && passaAccess && passaPreu) {
      card.classList.remove('hidden');
      card.style.display = '';
      cardsVisibles++;
    } else {
      card.classList.add('hidden');
      card.style.display = 'none';
    }
  });
  
  console.log('✓ Filtres aplicats -', cardsVisibles, 'cards visibles');
}

//PAGINAS FICHAS MUJERES INFO DES DE JSON (AI: https://chatgpt.com/share/68e50646-4868-8000-9fd6-6b17553b7e20)

fetch('./js/llocs_interes.json') //buscar archivo json
  .then(response => response.json())
  .then(data => {
    data.locations.forEach(location => { //buscar en el documento cada elemento a rellenar 
      const hero = document.querySelector('.hero-bg');
      const h1 = document.querySelector(`h1[data-id='${location.id}']`);
      const h2 = document.querySelector(`h2[data-id='${location.id}']`);
      const p = document.querySelector(`p[data-id='${location.id}']`);
      const ul = document.querySelector(`ul[data-id='${location.id}']`);
      const tempsP = document.querySelector(`.temps-ficha p[data-id-temps='${location.id}']`);
      const div = document.querySelector(`.hero-bg[data-id='${location.id}']`);
      const iconesDiv = document.querySelector(`.icones-ficha-json[data-id='${location.id}']`);
      const heroDiv = document.querySelector(`.hero-bg[data-id='${location.id}']`);

      //rellenar la info con los datos que hay en el JSON
      if(h1) h1.textContent = location.name;
      if(h2) h2.textContent = location.woman;
      if(p) p.textContent = location.info; 
      if(tempsP) tempsP.textContent = location.temps; 
      if (ul) { //ul con datos del sitio
        // se vacía ul por seguridad
        ul.innerHTML = '';
        location.tipus.forEach(t => {
          const li = document.createElement('li');
          li.textContent = t;
          ul.appendChild(li);
      });

      if(div) { //imagens fondo
        div.style.backgroundImage = `url(${location.image})`;
        div.style.backgroundSize = 'auto';
        div.style.backgroundPosition = 'top-left';
      }

      if(iconesDiv) {
        // Icono accesibilidat
        const iconAccess = iconesDiv.querySelector('.icona-access');
        const accessInfo = data.filters.access.find(a => a.value === location.access);
        if(iconAccess && accessInfo) {
          iconAccess.src = accessInfo.icon;
          iconAccess.alt = accessInfo.label; // opcional, posar text descriptiu
        }
        //Icono precio
        const iconPrice = iconesDiv.querySelector('.icona-preu');
        const priceInfo = data.filters.price.find(p => p.value === location.price);
        if(iconPrice && priceInfo) {
          iconPrice.src = priceInfo.icon;
          iconPrice.alt = priceInfo.label; // opcional
        }

      }
      
      if(heroDiv) {
        heroDiv.style.backgroundImage = `url(${location.image})`;
        heroDiv.style.backgroundSize = 'cover';
        heroDiv.style.backgroundPosition = 'top left';
      }

    }
  });
    
});

//CHECK FORMULARIO ANTES DE ENVIAR
const feedbackformulari = document.getElementById('feedbackform'); //selecciona el párrafo donde se mostrará el mensaje de feedback, se guarda feedbackformulari dentro de una variable constante 

document.querySelectorAll('.form-comentari').forEach(function(form){
    //llama a todos los elementos de clase form-comentari, en este caso, los formularios; forEach recorre todos los elementos que encuentre para aplicar la función
    form.addEventListener('submit', function(event){ //addEventListener se fija en el elemento submit para llevar a cabo la función evento
        event.preventDefault(); //evitar el envio de manera directa
        
        let valido=true; // se asume que los campos son validos
        const elements = form.querySelectorAll('input, textarea'); //se crea una constante elements con los elementos que se van a comprobar

        elements.forEach(function(el){ //recorre todos los elementos para aplicar la funcion el, que se define en el bucle de abajo

            if(el.value.trim()===''){ //si el es igual a vacío, valido pasa a ser falso
                valido = false;
                el.style.border = '2px solid red' //cambio de color del borde del elemento que no se ha rellenado a color rojo
            }

             el.addEventListener('input', function(){ //añadimir event listener para que cuando el usuario escriba en los campos se limpie el estilo aplicado con el error
                el.style.border = '';
                feedbackformulari.innerText = ''; //borrar el mensaje de feedback
            });
        });
        
        if(valido){ //si los campos estan rellenos, valido=true, manda mensaje de exito
            console.log('si'); //para comprobar que funciona en consola
            feedbackformulari.innerText="✅ Comentari enviat correctament, en breus serà publicat!"; //cambio del texto dentro del párrafo <p> con el id feedbackform
        } else { //si uno de los campos esta vacio manda mensaje de error
             console.log('no'); //para comprobar que funciona en consola
             feedbackformulari.innerText="❌ Siusplau, emplena tots els camps";
        }
    });
  });

  // CAMBIO IMAGEN FLECHA ANTERIOR MEDIAQUERIES

  const imgDark = "css/icons/btn/fletxa-ant-dark.png";
  const imgLight = "css/icons/btn/fletxa-ant-light.png";

  const imgElement = document.getElementById("btnAntChange");

  // Función que actualiza la imagen segun media queries
  function updateButtonIcon(e) {
    if (e.matches) {
      imgElement.src = imgLight; // si el media queries se cumple se pone la imagen Light
    } else {
      imgElement.src = imgDark; // si no, la versión dark
    }
  }

  // Definición del breakpoint
  const mediaQuery = window.matchMedia("(max-width: 769px)");

  mediaQuery.addEventListener("change", updateButtonIcon);

  // Executar al cargar la página
  updateButtonIcon(mediaQuery);

});

