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
      idiomaBtn.id = "idioma-btn-desplegado";

      // Si  el menú ya esta visible lo ocultamos
    }else {
      menuIdioma.setAttribute("hidden", ""); // añadimos otra vez el atrobuto hidden
      idiomaBtn.setAttribute("aria-expanded", "false"); // definimos que esta plegado
      idiomaBtn.id = "idioma-btn";
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
        navBtnBg.id = "nav-btn-desplegado";


      } else {
        menuNav.setAttribute("hidden", ""); // añadimos otra vez el atrobuto hidden
        navBtn.setAttribute("aria-expanded", "false");// definimos que esta plegado
        navBtnBg.id = "nav-btn";
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

  /*
  // MAPA con LEAFLET

  
  let markers = [];
  let map;

  setTimeout(function() { //función para esperar un poco más en cargar a ver si carga el mapa
  var map = L.map('map').setView([41.70220603341134, 2.8357029478855527], 13); 
  console.log('✓ Mapa carregat correctament');  // <-- AQUÍ VA AQUESTA LÍNIA

  setTimeout(function() { //Se hace esperar la inicialización a que el mapa este renderizado
    map.invalidateSize();
  }, 200);

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

  //Añadimos los marcadores des de un archivo JSON con ayuda de la IA: https://claude.ai/share/06ccc0c3-a1e0-413f-b433-081a6a3578b2

  //console.log('Iniciant càrrega de marcadors...');

  fetch('js/llocs_interes.json') //link con el archivo JSON
    .then(response => {
      //console.log('Resposta rebuda:', response.status);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      //console.log('Dades carregades:', data);
      //console.log('Número d\'ubicacions:', data.locations.length);
      
      if (!Array.isArray(data.locations)) {
        throw new Error('Les dades no són un array');
      }

      let waypoints = []; //crear un array a partir de los puntos del JSON

      data.locations.forEach((ubicacio, index) => { 
        //console.log(`Ubicació ${index + 1}:`, ubicacio.name, ubicacio.coordinates);
        
        if (!ubicacio.coordinates || !ubicacio.coordinates.lat || !ubicacio.coordinates.lng) {
          //console.error('Coordenades incorrectes per:', ubicacio.name);
          return;
        }        
        
        var marker = L.marker([ubicacio.coordinates.lat, ubicacio.coordinates.lng],{icon: ubiLight}).addTo(map); //recopilación de las coordenadas para ponerlas con un marcador
        
        marker.properties = { //guardar propiedades de los markers
          id: ubicacio.id,
          category: ubicacio.tipus,
          access: ubicacio.access,
          price: ubicacio.price    
        };
      
        markers.push(marker); // Guardar el marker a l'array
        waypoints.push(L.latLng(ubicacio.coordinates.lat, ubicacio.coordinates.lng)); //añadimos los waypoints al control de rutas
        
        console.log('✓ Tots els markers carregats'); // AFEGIT: Confirmar que tots els markers estan al mapa
        mapaCarregat = true; // AFEGIT: Indicar que el mapa ja està llest per filtrar
        //console.log('Marcador creat per:', ubicacio.name);
      });

      //console.log('Waypoints preparats:', waypoints);

      //console.log('Tots els marcadors processats');

      setTimeout(function() {
        var routingControl =L.Routing.control({
          waypoints: waypoints,
          router: L.Routing.osrmv1({
            serviceUrl: 'https://router.project-osrm.org/route/v1'
          }),
          show: false,         // amaga panell lateral
          addWaypoints: false, // evita que l’usuari afegeixi punts nous
          routeWhileDragging: true,
          lineOptions: {
          styles: [{color: '#260936', weight: 4}] //estilo de la ruta
          },
          createMarker: function() { return null; }//no crear marcadores automáticos
        }).addTo(map);

        routingControl.on('routesfound', function(e) { //Ajuste para asegurar que la ruta se carga y se ve centrada
          //console.log('Ruta trobada correctament!');
          var bounds = L.latLngBounds(waypoints);
          map.fitBounds(bounds, {padding: [50, 50]});
        });
        routingControl.on('routingerror', function(e) {
          //console.error('✗ Error en la ruta:', e);
        });

        setTimeout(function() {
          map.invalidateSize();
        }, 500);

        //console.log('Control de rutes afegit');
      }, 200);

    })

    .catch(error => {
      console.error('Error detallat:', error);
    });


    }, 100); // Esperar 300ms antes de inicializar para que pueda cargar el mapa entero


  //POP UPS PARA EL MAPA


  // DESPLEGABLE FILTROS  con AI para los filtros: https://claude.ai/share/b6af483b-6a22-4ec5-972c-677cce4de038
    const filtreGrup = document.getElementById('contenidor-filtres');

    const customSelect = document.createElement('div');//Crear el elemento div en el html
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
        { value: 'ruines', text: 'Ruines' },
        { value: 'natural', text: 'Espai Natural' },
        { value: 'religios', text: 'Espai Religios' },
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

  //Funcionamiento del desplegado, soporte AI (mismo link que la seccion anterior)

  let tipusSeleccionat = 'tots'; //variable que guarda la seleccion del desplegable
  let mapaCarregat = false;

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
          if (mapaCarregat) { 
          aplicarFiltres();
        } //llamra al filtro cuando cambia la seleccion del desplegable y el mapa este cargado
      });
  });

  // Cerrar si clicas fuera
  document.addEventListener('click', function() {
      selectItems.classList.add('select-hide');
  });

  //Marcar las dos checkboxes del filtro

  const checkboxes = document.querySelectorAll('.filtre-check');

  checkboxes.forEach(cb => {
      cb.addEventListener('change', aplicarFiltres);
    if (mapaCarregat) { 
        aplicarFiltres();
    }
  });



  //FILTROS MAPA soposrte Ai mismo link que el anterior
  
  function aplicarFiltres() {
    
    if (!map) {
      console.warn('El mapa encara no està carregat');
    return;
  }
    const volAccessible = document.querySelector('[data-filter="accessible"]')?.checked || false;
    const volGratuit = document.querySelector('[data-filter="gratuit"]')?.checked || false;
    
    // Filtrar CARDS
    const cards = document.querySelectorAll('.card-llocs');
    cards.forEach(card => {
      const categoryData = card.dataset.category || '';
      const passaTipus = tipusSeleccionat === 'tots' || categoryData.includes(tipusSeleccionat); // Comprobar si pasa el filtro de tipo
      const passaAccess = !volAccessible || card.dataset.access === 'accessible';// Comprobar si pasa el filtro de accessibilidad
      const passaPreu = !volGratuit || card.dataset.price === 'gratuit'; // Comprobar si pasa el filtro de gratuito

      if (passaTipus && passaAccess && passaPreu) {
        card.classList.remove('hidden');
        card.style.display = '';
      } else {
        card.classList.add('hidden');
        card.style.display = 'none';
      }
    });
    
  // Filtrar MARKERS
    markers.forEach(marker => {
      if (!marker.properties) return;
      
      const categoryArray = marker.properties.category || [];
      const passaTipus = tipusSeleccionat === 'tots' || categoryArray.includes(tipusSeleccionat); // Comprobar si pasa el filtro de tipo
      const passaAccess = !volAccessible || marker.properties.access === 'accessible';// Comprobar si pasa el filtro de accessibilidad
      const passaPreu = !volGratuit || marker.properties.price === 'gratuit'; // Comprobar si pasa el filtro de gratuito

    // Mostrar o amagar el marker
    if (passaTipus && passaAccess && passaPreu) {
      if (!map.hasLayer(marker)) {
        marker.addTo(map);
      }
    } else {
      if (map.hasLayer(marker)) {
        map.removeLayer(marker);
      }
    }
    });
    console.log('✓ Filtres aplicats correctament al mapa i les cards');
  }
  
  */

// MAPA con LEAFLET (con filtros y depslegable, AI:  https://claude.ai/share/35d57a74-0b43-457e-8c57-a7fdcd718f39)

let map;
let allLocations = []; // Guardar todass las ubicaciones del JSON
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
      
      // Generar markers i ruta inicial (amb tots els punts)
      generarMapaIRuta(ubiLight);
      
      // Inicialitzar els filtres DESPRÉS de carregar les dades
      inicialitzarFiltres();
    })
    .catch(error => {
      console.error('Error detallat:', error);
    });
}, 100); 


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
  
  // FILTRAR les ubicacions segons els criteris
  const ubicacionsFiltrades = allLocations.filter(ubicacio => {
    const passaTipus = tipusSeleccionat === 'tots' || ubicacio.tipus.includes(tipusSeleccionat);
    const passaAccess = !volAccessible || ubicacio.access === 'accessible';
    const passaPreu = !volGratuit || ubicacio.price === 'gratuit';
    
    return passaTipus && passaAccess && passaPreu;
  });
  
  console.log('✓ Ubicacions filtrades:', ubicacionsFiltrades.length, 'de', allLocations.length);
  
  // Si no hi ha ubicacions filtrades, no fer res
  if (ubicacionsFiltrades.length === 0) {
    console.warn('⚠️ No hi ha ubicacions que compleixin els filtres');
    return;
  }
  
  let waypoints = []; //crear un array a partir de los puntos del JSON
  
  // Crear només els markers de les ubicacions filtrades
  ubicacionsFiltrades.forEach((ubicacio) => {
    if (!ubicacio.coordinates || !ubicacio.coordinates.lat || !ubicacio.coordinates.lng) {
      return;
    }
    
    var marker = L.marker([ubicacio.coordinates.lat, ubicacio.coordinates.lng], {icon: iconMarker}).addTo(map); //recopilación de las coordenadas para ponerlas con un marcador
    
    const popupContent = `
      <div class="popup-marker">
        <h3>${ubicacio.name}</h3>
        <p><strong>${ubicacio.woman}</strong></p>
        <p>${ubicacio.temps}</p>
      </div>
    `;
    
    marker.bindPopup(popupContent); //Abrir pop up al pasar el ratón por encima
    
    marker.on('mouseover', function() {
      this.openPopup();
    });
    
    marker.on('mouseout', function() {//cerrar el popup al quitar el ratón
      this.closePopup();
    });

    waypoints.push(L.latLng(ubicacio.coordinates.lat, ubicacio.coordinates.lng)); //añadimos los waypoints al control de rutas
  });
  
  console.log('✓ Markers creats:', waypoints.length);
  
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
        styles: [{color: '#260936', weight: 4}] //estilo de la ruta
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


    
});


