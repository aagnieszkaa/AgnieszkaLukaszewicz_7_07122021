<template>
  <div>
    <Header></Header>
    <b-container class="mt-4 mb-4">
      <b-row class="form">
        <b-form class="
        offset-1 col-10 
        offset-md-2 col-md-8
        offset-lg-4 col-lg-4
        formulaire bg-light">
          <h2 v-if="mode == 'signup'">Créer votre compte</h2>
          <h2 v-else>Connectez-vous</h2>
          <p v-if="mode == 'signup'">Vous avez déjà le compte ? <span class="formulaire__link" @click="switchToConnexion()">Connectez-vous</span></p>
          <p v-else>Vous n'avez pas de compte ? <span class="formulaire__link" @click="switchToCreation()">Créer votre compte</span></p>
          <b-form-group
          label="Nom :"
          label-for="input-nom"
          class="mb-2 mt-4"
          v-if="mode == 'signup'">
            <b-form-input
            id="input-nom"
            v-model="state.input.nom"
            type="text">
            </b-form-input>
            <span class="error" v-if="vSignup$.input.nom.$error">
              {{ vSignup$.input.nom.$errors[0].$message }}
            </span>
          </b-form-group>
          <b-form-group
          label="Prénom :"
          label-for="input-prenom"
          class="mb-2"
          v-if="mode == 'signup'">
            <b-form-input
            id="input-prenom"
            v-model="state.input.prenom"
            type="text">
            </b-form-input>
            <span class="error" v-if="vSignup$.input.prenom.$error">
              {{ vSignup$.input.prenom.$errors[0].$message }}
            </span>
          </b-form-group>
          <b-form-group
          label="E-mail :"
          label-for="input-email"
          class="mb-2">
            <b-form-input
            id="input-email"
            v-model="state.input.email"
            type="email">
            </b-form-input>
            <div v-if="mode == 'signup'">
              <span class="error" v-if="vSignup$.input.email.$error">
                {{ vSignup$.input.email.$errors[0].$message }}
              </span>
            </div>
            <div v-else>
              <span class="error" v-if="vLogin$.input.email.$error">
                {{ vLogin$.input.email.$errors[0].$message }}
              </span>
            </div>
          </b-form-group>
          <b-form-group
          label="Mot de passe :"
          label-for="input-mot_de_passe"
          class="mb-2">
            <b-form-input
            id="input-mot_de_passe"
            v-model="state.input.mot_de_passe"
            type="password">
            </b-form-input>
            <div v-if="mode == 'signup'">
              <span class="error" v-if="vSignup$.input.mot_de_passe.$error">
                {{ vSignup$.input.mot_de_passe.$errors[0].$message }}
              </span>
            </div>
            <div v-else>
              <span class="error" v-if="vLogin$.input.mot_de_passe.$error">
                {{ vLogin$.input.mot_de_passe.$errors[0].$message }}
              </span>
            </div>
          </b-form-group>
          <b-form-group
          label="Photo :"
          label-for="input-photo"
          class="mb-2"
          v-if="mode == 'signup'">
            <input type="file" 
            id="input-photo"
            class="formulaire__input--photo"
            accept="image/*"
            @change="photoChange">
            <span class="error" v-if="vSignup$.profil_image.$error">
              {{ vSignup$.profil_image.$errors[0].$message }}
            </span>
          </b-form-group>
          <b-form-group
          label="Fonction :"
          class="mb-2"
          v-if="mode == 'signup'">
            <b-form-radio 
            name="input-radio" 
            value="1"
            v-model="state.input.fonction">
            Chargé de la communication
            </b-form-radio>

            <b-form-radio 
            name="input-radio" 
            value="0"
            v-model="state.input.fonction">
            Employée
            </b-form-radio>
            <span class="error" v-if="vSignup$.input.fonction.$error">
                {{ vSignup$.input.fonction.$errors[0].$message }}
            </span>
          </b-form-group>
          <b-form-group
          label="Mot de passe fourni par les RH :"
          label-for="input-mot_de_passe_RH"
          class="mb-2"
          v-if="mode == 'signup' && optionCommunication">
            <b-form-input
            id="input-mot_de_passe_RH"
            v-model="state.input.mot_de_passe_RH"
            type="password">
            </b-form-input>
            <span class="error" v-if="vSignup$.input.mot_de_passe_RH.$error">
              {{ vSignup$.input.mot_de_passe_RH.$errors[0].$message }}
            </span>
          </b-form-group>
          <b-button 
          variant="primary"
          v-if="mode == 'signup'"
          @click="signup">
            <span v-if="status == 'loading'">En cours...</span>
            <span v-else>Créez votre compte</span>
          </b-button>
          <b-button 
          variant="primary"
          v-else
          @click="login()">
            <span v-if="status == 'loading'">En cours...</span>
            <span v-else>Connectez-vous</span>
          </b-button><br>  
          <span class="error">
            {{ error }}
          </span>
        </b-form>
      </b-row>
    </b-container>  
  </div>
</template>

<script>
import { mapState } from 'vuex';
import Header from '@/components/Header.vue'
import useVuelidate from '@vuelidate/core'
import { required, email, requiredIf, helpers } from '@vuelidate/validators'
import { reactive, computed } from 'vue'

export default {
  name: 'Signup',
  components: {
    Header
  },
  setup () {
    const state = reactive({
      input: {
        nom: '',
        prenom: '',
        email: '',
        mot_de_passe: '',
        fonction: '',
        mot_de_passe_RH: '',
      },
      profil_image: null
    })
    const rulesSignup = computed(() => {
      return {
        input: {
          nom: { required: helpers.withMessage('Veuillez renseigner ce champ !', required) },
          prenom: { required: helpers.withMessage('Veuillez renseigner ce champ !', required) },
          email: { required: helpers.withMessage('Veuillez renseigner ce champ !', required), email: helpers.withMessage('Veuillez saisir une adresse mail valide !', email) },
          mot_de_passe: { required: helpers.withMessage('Veuillez renseigner ce champ !', required) },
          fonction: { required: helpers.withMessage('Veuillez renseigner ce champ !', required) },
          mot_de_passe_RH: { required: helpers.withMessage('Veuillez renseigner ce champ !', requiredIf(state.input.fonction == 1)) }
        },
        profil_image: { required: helpers.withMessage('Veuillez renseigner ce champ !', required) }
      }
    })
    const rulesLogin = computed(() => {
      return {
        input: {
          email: { required: helpers.withMessage('Veuillez renseigner ce champ !', required), email: helpers.withMessage('Veuillez saisir une adresse mail valide !', email) },
          mot_de_passe: { required: helpers.withMessage('Veuillez renseigner ce champ !', required) },
        }
      }
    })
    const vSignup$ = useVuelidate(rulesSignup, state)
    const vLogin$ = useVuelidate(rulesLogin, state)
    return { state, vSignup$, vLogin$ }
  },
  data: function () {
    return {
      mode: 'signup',
      error: '',
    }
  },
  mounted: function () {
    if (this.$store.state.utilisateur.utilisateurId != -1) {
      this.$router.push(`/profil/${this.utilisateur_token_id.utilisateurId}`);
      return ;
    }
  },
  computed: {
    optionCommunication: function () {
      const value = this.state.input.fonction;
      if (this.mode == 'signup' && value == 0) {
        return false;
      } else {
        return true;
      }
    },
    ...mapState({
    utilisateurInfo: 'utilisateurInfo',
    utilisateur_token_id: 'utilisateur',
    status: 'status'
    }) 
  },
  methods: {
    switchToConnexion: function () {
      this.error = '';
      this.mode = 'login';
    },
    switchToCreation: function () {
      this.error = '';
      this.mode = 'signup';   
    },
    photoChange: function (event) {
      this.state.profil_image = event.target.files[0];
    },
    submitFormSignup() {
      this.vSignup$.$validate();
      if(!this.vSignup$.$error) {
        return true;
      } else {
        this.error = '';
        return false;
      }
    },
    submitFormLogin() {
      this.vLogin$.$validate();
      if(!this.vLogin$.$error) {
        return true;
      } else {
        this.error = '';
        return false;
      }
    },
    signup: function () {
      if(this.submitFormSignup()) {
        const self = this;
        const fd = new FormData();
        fd.append('profil_image', this.state.profil_image);
        fd.append('utilisateur', JSON.stringify(this.state.input));
        this.$store.dispatch('signup', fd)
        .then(function () {
          self.login();
        }, function (error) {
          self.error = error.response.data.error;
        })
      }
    },
    login: function () {
      if(this.submitFormLogin()) {
        const self = this;
        this.$store.dispatch('login', {
          email: this.state.input.email,
          mot_de_passe: this.state.input.mot_de_passe,
        }).then(function () {
          self.$router.push(`/profil/${self.utilisateur_token_id.utilisateurId}`);
        }, function (error) {
          self.error = error.response.data.error;
        })
      }
    },
  }
}
</script>

<style lang="scss" scoped>
.formulaire  {
  padding: 10px;
  border-radius: 2%;
  @include border;
  &__link {
    color: blue;
  }
  &__input--photo {
  width: 100%;
  }
}
input {
  width: 70%;
}
</style>




