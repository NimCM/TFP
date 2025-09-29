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

  // MAPA con LEAFLET

  //Inicializamos el mapa y elegimos las coordenadas del sitio que se ve y el zoom
  setTimeout(function() { //función para esperar un poco más en cargar a ver si carga el mapa
  var map = L.map('map').setView([41.70220603341134, 2.8357029478855527], 13); //Coordenadas Museu del Mar, inicio de la ruta

  setTimeout(function() { //Se hace esperar la inicialización a que el mapa este renderizado
    map.invalidateSize();
  }, 200);

  //Se añade la URL del OpenStreetMaps para poder usar sus tiles (imagenes fragmentadas) y tener la visualización del mapa. Aquí también se define la atribución a OpenStreetMaps y el máximo nivel de zoom
  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    crossOrigin: true // Ayuda con problemas de CORS, Crossed Origin Resource Shring, contenido que proviene de paginas con un URL distinto, como el mapa
  }).addTo(map);

  //Leaflet Routing Machine, plug in para hacer la rutas
/*  L.Routing.control({
    waypoints: [
        L.latLng(41.70227158359876, 2.8480277285532756),
        L.latLng(41.700814, 2.841623)
    ],
    show: false, //esconder panel de indicaciones de ruta
    addWaypoints: false //esconder opción de busqueda de puntos
  }).addTo(map);
*/
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
        
        waypoints.push(L.latLng(ubicacio.coordinates.lat, ubicacio.coordinates.lng)); //añadimos los waypoints al control de rutas
      
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
     //console.error('Error detallat:', error);
    });


    }, 100); // Esperar 300ms antes de inicializar para que pueda cargar el mapa entero


  //POP UPS PARA EL MAPA

  //CARDS para FILTROS (Ayuda de AI: https://claude.ai/share/ebfcb39a-b793-4749-88ea-0fefef5d6ec6)
              
/*  function generateCards() {
    const container = document.getElementById('cards-container'); // Contenedor de las cards
    
    data.locations.forEach(location => {
        // Crear section principal
        const section = document.createElement('section');
        section.className = 'card-llocs';
        section.dataset.locationId = location.id;

        // Crear zona del texto
        const textArticle = document.createElement('article');
        textArticle.className = 'text-list';

        // H2 - Nombre del sitio
        const h2 = document.createElement('h2'); //Seleccion del elemento
        h2.className = 'nom-lloc-list text-ultralight'; //Seleccion de la class de HTML
        h2.textContent = location.name; //Seleccion del tag asociado en JSON

        // H3 - Nom de la dona
        const h3 = document.createElement('h3');
        h3.className = 'nom-dona-list text-light';
        h3.textContent = location.woman;

        // UL - Característiques
        const ul = document.createElement('ul');
        ul.className = 'caracteristiques-lloc-list text-ultralight';

        // LI - Tipus
        const liTipus = document.createElement('li');
        liTipus.className = 'li-mapa mini tipus';
        liTipus.textContent = location.tipus.join(', ');

        // LI - Temps
        const liTemps = document.createElement('li');
        liTemps.className = 'li-mapa mini temps';
        liTemps.textContent = location.temps;

        ul.appendChild(liTipus);
        ul.appendChild(liTemps);

        // Div - Icones
        const iconesDiv = document.createElement('div');
        iconesDiv.className = 'icones-list';

        // Section access - Condicional para definir si es accesible o no y que icono toca poner
        const accessSection = document.createElement('section');
        accessSection.className = 'access';
        const accessFilter = data.filters.access.find(a => a.value === location.access);
        if (accessFilter && accessFilter.icon) {
            const accessImg = document.createElement('img');
            accessImg.src = accessFilter.icon;
            accessImg.className = 'icona-list-map';
            accessImg.alt = `Icona ${accessFilter.label}`;
            accessSection.appendChild(accessImg);
        }

        // Section price - Condicional para definir si es gratuito o no y que icono toca poner
        const priceSection = document.createElement('section');
        priceSection.className = 'price';
        const priceFilter = data.filters.price.find(p => p.value === location.price);
        if (priceFilter && priceFilter.icon) {
            const priceImg = document.createElement('img');
            priceImg.src = priceFilter.icon;
            priceImg.className = 'icona-list-map';
            priceImg.alt = `Icona ${priceFilter.label}`;
            priceSection.appendChild(priceImg);
        }

        iconesDiv.appendChild(accessSection);
        iconesDiv.appendChild(priceSection);

        // Añadir todo al article de texto
        textArticle.appendChild(h2);
        textArticle.appendChild(h3);
        textArticle.appendChild(ul);
        textArticle.appendChild(iconesDiv);

        // Crear article de imagen
        const imatgeArticle = document.createElement('article');
        imatgeArticle.className = 'imatge-list-container';

        const img = document.createElement('img');
        img.src = location.image;
        img.className = 'imatge-list';
        img.alt = `Imatge de ${location.name}`;

        imatgeArticle.appendChild(img);

        // Añadir articles a la section
        section.appendChild(textArticle);
        section.appendChild(imatgeArticle);

        // Añadir section al contenedor
        container.appendChild(section);
    });
  }  */



let data = dataLocations; // Canvia això
let activeFilters = { tipus: [], price: [], access: [] };

// Elimina la funció loadData() completament

function generateCards() {
    if (!data || !data.locations) {
        console.error('❌ No hi ha dades');
        return;
    }
    
    console.log('=== GENERANT CARDS ===');
    
    const container = document.getElementById('cards-container');
    
    
    if (!container) {
        console.error('❌ No es troba #cards-container');
        return;
    }
    
    container.innerHTML = '';
    
    data.locations.forEach((location) => {
        const section = document.createElement('section');
        section.className = 'card-llocs';
        section.dataset.locationId = location.id;

        const textArticle = document.createElement('article');
        textArticle.className = 'text-list';

        const h2 = document.createElement('h2');
        h2.className = 'nom-lloc-list';
        h2.textContent = location.name;

        h2.style.cssText = 'color: black !important; font-size: 24px !important; display: block !important; visibility: visible !important; opacity: 1 !important;';


        const h3 = document.createElement('h3');
        h3.className = 'nom-dona-list';
        h3.textContent = location.woman;

        const ul = document.createElement('ul');
        ul.className = 'caracteristiques-lloc-list';

        const liTipus = document.createElement('li');
        liTipus.className = 'li-mapa mini tipus';
        liTipus.textContent = location.tipus.join(', ');

        const liTemps = document.createElement('li');
        liTipus.className = 'li-mapa mini temps';
        liTemps.textContent = location.temps;

        ul.appendChild(liTipus);
        ul.appendChild(liTemps);

        const iconesDiv = document.createElement('div');
        iconesDiv.className = 'icones-list';

        const accessSection = document.createElement('section');
        accessSection.className = 'access';
        const accessFilter = data.filters.access.find(a => a.value === location.access);
        if (accessFilter && accessFilter.icon) {
            const accessImg = document.createElement('img');
            accessImg.src = accessFilter.icon;
            accessImg.className = 'icona-list-map';
            accessImg.alt = accessFilter.label;
            accessSection.appendChild(accessImg);
        }

        const priceSection = document.createElement('section');
        priceSection.className = 'price';
        const priceFilter = data.filters.price.find(p => p.value === location.price);
        if (priceFilter && priceFilter.icon) {
            const priceImg = document.createElement('img');
            priceImg.src = priceFilter.icon;
            priceImg.className = 'icona-list-map';
            priceImg.alt = priceFilter.label;
            priceSection.appendChild(priceImg);
        }

        iconesDiv.appendChild(accessSection);
        iconesDiv.appendChild(priceSection);

        textArticle.appendChild(h2);
        textArticle.appendChild(h3);
        textArticle.appendChild(ul);
        textArticle.appendChild(iconesDiv);

        const imatgeArticle = document.createElement('article');
        imatgeArticle.className = 'imatge-list-container';

        const img = document.createElement('img');
        img.src = location.image;
        img.className = 'imatge-list';
        img.alt = `Imatge de ${location.name}`;

        imatgeArticle.appendChild(img);

        section.appendChild(textArticle);
        section.appendChild(imatgeArticle);

        container.appendChild(section);
    });
    
    console.log(`✓ ${data.locations.length} cards generades`);
}

function generateFilters() {
    if (!data || !data.filters) {
        console.error('❌ No hi ha filtres');
        return;
    }
    
    console.log('=== GENERANT FILTRES ===');
    
    const tipusContainer = document.getElementById('tipus-filters');
    if (tipusContainer) {
        data.filters.tipus.forEach(filter => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.textContent = filter.label;
            btn.onclick = () => toggleFilter('tipus', filter.value, btn);
            tipusContainer.appendChild(btn);
        });
    }

    const priceContainer = document.getElementById('price-filters');
    if (priceContainer) {
        data.filters.price.forEach(filter => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.textContent = filter.label;
            btn.onclick = () => toggleFilter('price', filter.value, btn);
            priceContainer.appendChild(btn);
        });
    }

    const accessContainer = document.getElementById('access-filters');
    if (accessContainer) {
        data.filters.access.forEach(filter => {
            const btn = document.createElement('button');
            btn.className = 'filter-btn';
            btn.textContent = filter.label;
            btn.onclick = () => toggleFilter('access', filter.value, btn);
            accessContainer.appendChild(btn);
        });
    }
}

function toggleFilter(category, value, btnElement) {
    const index = activeFilters[category].indexOf(value);
    
    if (index > -1) {
        activeFilters[category].splice(index, 1);
        btnElement.classList.remove('active');
    } else {
        activeFilters[category].push(value);
        btnElement.classList.add('active');
    }
    
    applyFilters();
}

function clearFilters() {
    activeFilters = { tipus: [], price: [], access: [] };
    document.querySelectorAll('.filter-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    applyFilters();
}

function applyFilters() {
    if (!data) return;
    
    const cards = document.querySelectorAll('.card-llocs');
    let visibleCount = 0;

    cards.forEach(card => {
        const locationId = parseInt(card.dataset.locationId);
        const location = data.locations.find(loc => loc.id === locationId);
        let show = true;

        if (activeFilters.tipus.length > 0) {
            show = activeFilters.tipus.some(filter => location.tipus.includes(filter));
        }

        if (show && activeFilters.price.length > 0) {
            show = activeFilters.price.includes(location.price);
        }

        if (show && activeFilters.access.length > 0) {
            show = activeFilters.access.includes(location.access);
        }

        card.style.display = show ? '' : 'none';
        if (show) visibleCount++;
    });

    console.log(`Filtrat: ${visibleCount} de ${cards.length} visibles`);
}

// INICIALITZAR
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
        console.log('Iniciant...');
        generateFilters();
        generateCards();
    });
} else {
    console.log('Iniciant...');
    generateFilters();
    generateCards();
}





});


