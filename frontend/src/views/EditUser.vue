<template>
  <div>
    <Header></Header>
    <Menu></Menu>
    <h1 class="h1">Bienvenue sur le réseau social de Groupomania !</h1>
    <b-container class="mt-4 mb-4">
      <b-row class="form">
        <b-form class="offset-1 col-10 formulaire bg-light">
          <h2 class="font-weight-bold">Modifier votre profil</h2>
          <b-form-group
          label="Nom :"
          label-for="input-nom"
          class="mb-2 mt-4">
            <b-form-input
            id="input-nom"
            v-model="state.input.nom"
            type="text"> 
            </b-form-input>
            <span class="error" v-if="vModification$.input.nom.$error">
                {{ vModification$.input.nom.$errors[0].$message }}
            </span>
          </b-form-group>
          <b-form-group
          label="Prénom :"
          label-for="input-prenom"
          class="mb-2">
            <b-form-input
            id="input-prenom"
            v-model="state.input.prenom"
            type="text">
            </b-form-input>
            <span class="error" v-if="vModification$.input.prenom.$error">
                {{ vModification$.input.prenom.$errors[0].$message }}
            </span>
          </b-form-group>
          <b-row>
            <img
            class="col-5"
            ref="photoProfil"
            alt="photo de profil"
            :src="utilisateurInfo.image_chemin" />
            <img
            alt="photo de profil preview"
            class="col-5"
            ref="preview"
            src="" />
          </b-row>
          <b-form-group
          label="Photo :"
          label-for="input-photo"
          class="mb-2">
            <input type="file" 
            id="input-photo"
            accept="image/*"
            @change="photoChange">
          </b-form-group>
          <b-button 
          variant="danger"
          class="m-3"
          @click="modifyUser()">
            
            <span v-if="status == 'loading'">En cours...</span>
            <span v-else>Enregistrer</span>
          </b-button>
          <b-button 
          variant="danger"
          class="m-3"
          @click="abandon()">Abandonner</b-button>
        </b-form>
        <span>{{ error }}</span>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'
import useVuelidate from '@vuelidate/core'
import { required, helpers } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

export default {
  name: 'EditUser',
  components: {
    Header,
    Menu
  },
  computed: {
    ...mapState({
    utilisateur_token_id: 'utilisateur',
    utilisateurInfo: 'utilisateurInfo',
    status: 'status'
    })
  },
  mounted: function (){
    this.$refs.preview.style.display = "none";
    const self = this;
    this.$store.dispatch('utilisateurInfo', this.utilisateur_token_id.utilisateurId)
    .then(function () {
      self.state.input.prenom = self.utilisateurInfo.prenom;
      self.state.input.nom = self.utilisateurInfo.nom;
    }, function () {
    self.logout();
    })
  },
  setup () {
    const state = reactive({
      input: {
        nom: '',
        prenom: '',
      },
    })
    const rulesModification = computed(() => {
      return {
        input: {
          nom: { required: helpers.withMessage('Veuillez renseigner ce champ !', required) },
          prenom: { required: helpers.withMessage('Veuillez renseigner ce champ !', required) },
        }
      }
    })
    const vModification$ = useVuelidate(rulesModification, state)
    return { state, vModification$ }
  },
  data: function () {
    return {
      error: '',
      profil_image: null,
    }
  },
  methods: {  
    submitFormModification() {
      this.vModification$.$validate();
      if(!this.vModification$.$error) {
        return true;
      } else {
        this.error = '';
        return false;
      }
    },
    photoChange: function (event) {
      this.profil_image = event.target.files[0];
      let reader = new FileReader();
      reader.onload = () => {
        this.$refs.preview.src = reader.result;
        this.$refs.preview.style.display = "";
        this.$refs.photoProfil.style.display = "none";
      }
      reader.readAsDataURL(this.profil_image);
    },
    modifyUser: function () {
      if(this.submitFormModification()) {   
        const self = this;
        const fd = new FormData();
        fd.append('profil_image', this.profil_image);
        fd.append('utilisateur', JSON.stringify(this.state.input));
        this.$store.dispatch('modificationUtilisateur', {utilisateurAll: fd, utilisateurId: self.utilisateur_token_id.utilisateurId})
        .then(function () {
          self.$router.push(`/profil/${self.utilisateur_token_id.utilisateurId}`);
        }, function (error) {
            self.error = error.response.data.error;
        })
      }
    }, 
    abandon: function () {
      const self = this;
      self.$router.push(`/profil/${self.utilisateur_token_id.utilisateurId}`);
    },      
  },
}
</script>

<style lang="scss" scoped>
.formulaire  {
  padding: 10px;
  border-radius: 2%;
  @include border;
}
</style>




