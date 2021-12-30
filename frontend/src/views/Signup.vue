<template>
    <div>
        <Header></Header>
        <b-container class="mt-4 mb-4">
            <b-row class="form">
                <b-form class="offset-1 col-10">
                    <h2 v-if="mode == 'signup'">Créer votre compte</h2>
                    <h2 v-else>Connectez-vous</h2>
                    <p v-if="mode == 'signup'">Vous avez déjà le compte ? <span class="link" @click="switchToConnexion()">Connectez-vous</span></p>
                    <p v-else>Vous n'avez pas de compte ? <span class="link" @click="switchToCreation()">Créer votre compte</span></p>
                    <b-form-group
                    label="Nom :"
                    label-for="input-nom"
                    class="mb-2 mt-4"
                    v-if="mode == 'signup'">
                        <b-form-input
                        id="input-nom"
                        v-model="state.nom"
                        type="text">
                        </b-form-input>
                        <span class="error" v-if="vSignup$.nom.$error">
                          {{ vSignup$.nom.$errors[0].$message }}
                        </span>
                    </b-form-group>

                    <b-form-group
                    label="Prénom :"
                    label-for="input-prenom"
                    class="mb-2"
                    v-if="mode == 'signup'">
                        <b-form-input
                        id="input-prenom"
                        v-model="state.prenom"
                        type="text">
                        </b-form-input>
                        <span class="error" v-if="vSignup$.prenom.$error">
                          {{ vSignup$.prenom.$errors[0].$message }}
                        </span>
                    </b-form-group>

                    <b-form-group
                    label="E-mail :"
                    label-for="input-email"
                    class="mb-2">
                        <b-form-input
                        id="input-email"
                        v-model="state.email"
                        type="email">
                        </b-form-input>
                        <div v-if="mode == 'signup'">
                          <span class="error" v-if="vSignup$.email.$error">
                            {{ vSignup$.email.$errors[0].$message }}
                          </span>
                        </div>
                        <div v-else>
                          <span class="error" v-if="vLogin$.email.$error">
                            {{ vLogin$.email.$errors[0].$message }}
                          </span>
                        </div>
                    </b-form-group>

                    <b-form-group
                    label="Mot de passe :"
                    label-for="input-mot_de_passe"
                    class="mb-2">
                        <b-form-input
                        id="input-mot_de_passe"
                        v-model="state.mot_de_passe"
                        type="password">
                        </b-form-input>
                        <div v-if="mode == 'signup'">
                          <span class="error" v-if="vSignup$.mot_de_passe.$error">
                            {{ vSignup$.mot_de_passe.$errors[0].$message }}
                          </span>
                        </div>
                        <div v-else>
                          <span class="error" v-if="vLogin$.mot_de_passe.$error">
                            {{ vLogin$.mot_de_passe.$errors[0].$message }}
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
                        value="0"
                        v-model="state.fonction">
                        Chargé de la communication
                        </b-form-radio>

                        <b-form-radio 
                        name="input-radio" 
                        value="1"
                        v-model="state.fonction">
                        Employée
                        </b-form-radio>
                      <span class="error" v-if="vSignup$.fonction.$error">
                          {{ vSignup$.fonction.$errors[0].$message }}
                      </span>
                    </b-form-group>
                    
                    <b-form-group
                    label="Mot de passe fourni par les RH :"
                    label-for="input-mot_de_passe_RH"
                    class="mb-2"
                    v-if="mode == 'signup' && optionCommunication">
                        <b-form-input
                        id="input-mot_de_passe_RH"
                        v-model="mot_de_passe_RH"
                        type="password"
                        :required="optionCommunication">
                        </b-form-input>
                    </b-form-group>

                    <b-button 
                    variant="primary"
                    v-if="mode == 'signup'"
                    @click="signup">Créez votre compte</b-button>

                    <b-button 
                    variant="primary"
                    v-else
                    @click="login()">Connectez-vous</b-button>
                </b-form>
                <span>{{ error }}</span>
            </b-row>
        </b-container>
        
        <!--<span v-if="state == 'connexionEnCours'">Connexion en cours</span>-->
    </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';
import Header from '@/components/Header.vue'
import useVuelidate from '@vuelidate/core'
import { required, email } from '@vuelidate/validators'
import { reactive } from 'vue'

export default {
  name: 'Signup',
  components: {
    Header
  },
setup () {
    const state = reactive({
      nom: '',
      prenom: '',
      email: '',
      mot_de_passe: '',
      /*image_chemin: '',*/
      fonction: '',
      profil_image: null
    })
    const rulesSignup = {
      nom: { required },
      prenom: { required },
      email: { required, email },
      mot_de_passe: { required },
      /*image_chemin: { required },*/
      fonction: { required },
      profil_image: { required }
    }
    const rulesLogin = {
      email: { required, email },
      mot_de_passe: { required },
    }

    const vSignup$ = useVuelidate(rulesSignup, state)
    const vLogin$ = useVuelidate(rulesLogin, state)

    return { state, vSignup$, vLogin$ }
  },
  data: function () {
    return {
        mode: 'signup',
        /*fonction: 1,
        image_chemin: '',*/
        error: '',
    }
  },
    mounted: function () {
    if (this.$store.state.utilisateur.utilisateurId != -1) {
      this.$router.push('/profil');
      return ;
    }
  },
computed: {
    optionCommunication: function () {
      const value = this.state.fonction;
      if (this.mode == 'signup' && value == 0) {
          return true;
      } else {
          return false;
      }
    },
    ...mapState(['status'])   
  },
  methods: {
      switchToConnexion: function () {
          this.mode = 'login';
      },
      switchToCreation: function () {
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
          let utilisateurObj = {
            nom: this.state.nom,
            prenom: this.state.prenom,
            email: this.state.email,
            mot_de_passe: this.state.mot_de_passe,
            fonction: this.state.fonction
          }
          const fd = new FormData();
          fd.append('profil_image', this.state.profil_image);
          fd.append('utilisateur', JSON.stringify(utilisateurObj));
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
          email: this.state.email,
          mot_de_passe: this.state.mot_de_passe,
        }).then(function () {
          self.$router.push('/profil');
        }, function (error) {
          self.error = error.response.data.error;
        })
      }
    },
  }
}
</script>

<style lang="scss" scoped>
body{
    background-color: #fd2d01;
}
.link
{
    color: blue;
}
</style>




