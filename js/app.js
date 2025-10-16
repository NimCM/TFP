/*
const app = Vue.createApp({
  data() {
    return {
      llocs_interes: null, //JSON Cargado
      card: null //Ficha seleccionada
    }
  },
  async mounted() {
    try {
      // Carga el JSON
      const response = await fetch('js/llocs_interes.json')
      if (!response.ok) throw new Error('No s’ha pogut carregar el JSON')
      this.llocs_interes = await response.json()

      // Mira el id de la url
      const params = new URLSearchParams(window.location.search)
      const id = parseInt(params.get('id'))

      // Busca la info que corresponde segun el id
      if (!isNaN(id)) {
        this.card = this.llocs_interes.locations.find(c => c.id === id) || null
      }

      // espera a que el DOM esté cargado
      this.$nextTick(() => {
        this.syncHeroHeight()
      })

      // Vuelve a cargar si se redimensiona la página
      window.addEventListener('resize', this.syncHeroHeight) //Mira el tamaño de una sección para sincronizar el tamaño de la imagen de fondo
    } catch (err) {
      console.error('Error carregant el JSON:', err)
    }
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.syncHeroHeight)
  },
  methods: {
    syncHeroHeight() {
      const hero = document.querySelector('.hero-bg')
      const section = document.querySelector('.upper-section-ficha')
      if (hero && section) {
        hero.style.height = section.offsetHeight + 'px'
      }
    }
  },
  updated() {
    this.$nextTick(() => this.syncHeroHeight())
  }
})

app.mount('#app')
*/

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

      // Esperem que Vue hagi renderitzat

      this.$nextTick(() => {
        this.initGlobalScript() // inicialitza el teu JS global aquí
      })

      window.addEventListener('resize', this.syncHeroHeight)
    } catch (err) {
      console.error('Error carregant el JSON:', err)
    }
    document.dispatchEvent(new Event("vue-ready"));
  },
  methods: {
    syncHeroHeight() {
      const hero = document.querySelector('.hero-bg')
      const section = document.querySelector('.upper-section-ficha')
      if (hero && section) hero.style.height = section.offsetHeight + 'px'
    },

    initGlobalScript() {
      // =======================
      // MENU IDIOMA
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

      // =======================
      // ICONA FLETXA ANTERIOR
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

        // posar inicialment la imatge correcta
        updateButtonIcon(mediaQuery)
      }
    }
  },
    computed: {
        prevId() {
            if (!this.card || !this.totalCards) return null;
            // Si estem a la primera, torna a l'última
            return this.card.id === 1 ? this.totalCards : this.card.id - 1;
        },
        nextId() {
            if (!this.card || !this.totalCards) return null;
            // Si estem a l'última, torna a la primera
            return this.card.id === this.totalCards ? 1 : this.card.id + 1;
        }
    },
  updated() {
    this.$nextTick(() => this.syncHeroHeight())
  }
})

app.mount("#app")
