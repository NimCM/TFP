const app = Vue.createApp({
  data() {
    return {
      llocs_interes: null,
      card: null,
      totalCards: 13,
    }
  },
  async mounted() {
    try {
      const response = await fetch('js/llocs_interes.json')
      this.llocs_interes = await response.json()

        if(this.llocs_interes) {
          this.totalCards = this.llocs_interes.locations.length
        }

      const params = new URLSearchParams(window.location.search)
      const id = parseInt(params.get('id'))
      if (!isNaN(id)) {
        this.card = this.llocs_interes.locations.find(c => c.id === id) || null
      }

      // Esperamos que Vue haya renderizado


      window.addEventListener('resize', this.syncHeroHeight)
    

      await this.$nextTick();

     window.initGeneralScripts = this.initGlobalScript.bind(this)

      setTimeout(() => {
        if (window.initGeneralScripts) {
          window.initGeneralScripts();
          console.log("Executant initGeneralScripts després del render complet");
        }
      }, 50);
      document.dispatchEvent(new Event("vue-ready"));
    } catch (err) {
      console.error('Error carregant el JSON:', err)
    }
    

  },
  methods: {
    syncHeroHeight() {
      const hero = document.querySelector('.hero-bg')
      const section = document.querySelector('.upper-section-ficha')
      if (hero && section) hero.style.height = section.offsetHeight + 'px'
    },

    initGlobalScript() {
      // Codigo repetido del script.js para que funcione
      //MENU IDIOMA
      const idiomaBtn = document.getElementById("idioma-btn")
      const menuIdioma = document.getElementById("menu-idioma")
      if (idiomaBtn && menuIdioma) {
        idiomaBtn.addEventListener("click", function(event){
          event.preventDefault()
          const isHidden = menuIdioma.hasAttribute("hidden")
          if (isHidden) {
            menuIdioma.removeAttribute("hidden")
            idiomaBtn.setAttribute("aria-expanded","true")
            idiomaBtn.classList.add("desplegado")
          } else {
            menuIdioma.setAttribute("hidden","")
            idiomaBtn.setAttribute("aria-expanded","false")
            idiomaBtn.classList.remove("desplegado")
          }
        })

        document.addEventListener("click", function(event){
          if (!event.target.closest(".menu-idioma-desplegable")) {
            menuIdioma.setAttribute("hidden","")
            idiomaBtn.setAttribute("aria-expanded","false")
          }
        })
      }

      //MENU NAVEGACIÓN
      const navBtn = document.getElementById("nav-btn");
      const menuNav = document.getElementById("menu-navegacion");
      const navBtnBg = document.getElementById("nav-btn");
      function checkScreenSize() {
        if (window.innerWidth >= 770) {
          menuNav.removeAttribute("hidden");
          navBtn.setAttribute("aria-expanded", "true");
        } else {
          menuNav.setAttribute("hidden", "");
          navBtn.setAttribute("aria-expanded", "false");
        }
      }
      navBtn.addEventListener("click", function (event) {
        if (window.innerWidth < 770) {
          event.preventDefault(); 
          const isHidden = menuNav.hasAttribute("hidden");
          if (isHidden) { 
            menuNav.removeAttribute("hidden");
            navBtn.setAttribute("aria-expanded", "true");
            navBtn.classList.add("desplegado");
          } else {
            menuNav.setAttribute("hidden", "");
            navBtn.setAttribute("aria-expanded", "false");
            navBtn.classList.remove("desplegado");
          }
        }
      });
      document.addEventListener("click", function (event) {
        if (window.innerWidth < 770) {
          if (!event.target.closest(".menu-nav-desplegable") && !event.target.closest("#nav-btn")) {
            menuNav.setAttribute("hidden", "");
            navBtn.setAttribute("aria-expanded", "false");
          }
        }
      });
      checkScreenSize();
      window.addEventListener("resize", checkScreenSize);

      // ICONO FLECHA ANTERIOR
      const imgElement = document.getElementById("btnAntChange")
      const imgDark = "css/icons/btn/fletxa-ant-dark.png"
      const imgLight = "css/icons/btn/fletxa-ant-light.png"

      if (imgElement) {
        function updateButtonIcon(e){
          const isMatch = e.matches ?? window.matchMedia("(max-width: 769px)").matches;
          imgElement.src = e.matches ? imgLight : imgDark
        }

        const mediaQuery = window.matchMedia("(max-width: 769px)")
        mediaQuery.addEventListener("change", updateButtonIcon)
        updateButtonIcon(mediaQuery)
      }

      //CHECK FORMULARIO ANTES DE ENVIAR
      const feedbackformulari = document.getElementById('feedbackform');
      document.querySelectorAll('.form-comentari').forEach(function(form){
        form.addEventListener('submit', function(event){ 
        event.preventDefault(); 
        let valido=true;
        const elements = form.querySelectorAll('input, textarea'); 
        elements.forEach(function(el){ 
          if(el.value.trim()===''){ 
            valido = false;
            el.style.border = '2px solid red' 
          }
          if (!el.dataset.listenerAdded) {
            el.addEventListener('input', function(){
              el.style.border = '';
              feedbackformulari.innerText = ''; 
            });
          el.dataset.listenerAdded = true;
          }
        });
        
        if(valido){ 
          console.log('si'); 
          feedbackformulari.innerText="✅ Comentari enviat correctament, en breus serà publicat!"; 
          } else { 
          console.log('no');
          feedbackformulari.innerText="❌ Siusplau, emplena tots els camps";
        }
      });
  });


    },
  },
    computed: {
        prevId() {
            if (!this.card || !this.totalCards) return null;
            // va a la ficha anterior, si estamos a la primera ficha, vuelve a la última
            return this.card.id === 1 ? this.totalCards : this.card.id - 1;
        },
        nextId() {
            if (!this.card || !this.totalCards) return null;
            //va a la ficha siguiente, si estamos en la última va a la primera
            return this.card.id === this.totalCards ? 1 : this.card.id + 1;
        }
    },
  updated() {
    this.$nextTick(() => this.syncHeroHeight())
  }
})

app.mount("#app")
