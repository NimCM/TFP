const comentarisApp = Vue.createApp({
  data() {
    return {
      comments: [],
      nouNom: '',
      nouText: ''
    }
  },
  mounted() {
        const saved = localStorage.getItem('comentaris')
        if (saved) {
            try {
                this.comments = JSON.parse(saved);
            } catch(e) {
                console.warn("LocalStorage té dades corruptes. Es neteja.");
                localStorage.removeItem('comentaris');
                this.comments = [];
            }
        }
    },
  methods: {
    afegirComentario() {
      if (!this.nouNom.trim() || !this.nouText.trim()) {
        alert("Omple els camps abans d'enviar!");
        return;
      }
      const nou = {
        id: Date.now(), // id únic
        nom: this.nouNom,
        text: this.nouText
      };
      this.comments.push(nou);
      localStorage.setItem('comentaris', JSON.stringify(this.comments));
      this.nouNom = '';
      this.nouText = '';
    },
  }
})

comentarisApp.mount('#comentaris-app')