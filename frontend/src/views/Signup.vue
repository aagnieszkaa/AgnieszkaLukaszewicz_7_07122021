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
                        v-model="nom"
                        type="text"
                        required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group
                    label="Prénom :"
                    label-for="input-prenom"
                    class="mb-2"
                    v-if="mode == 'signup'">
                        <b-form-input
                        id="input-prenom"
                        v-model="prenom"
                        type="text"
                        required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group
                    label="E-mail :"
                    label-for="input-prenom"
                    class="mb-2">
                        <b-form-input
                        id="input-email"
                        v-model="email"
                        type="email"
                        required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group
                    label="Mot de passe :"
                    label-for="input-mot_de_passe"
                    class="mb-2">
                        <b-form-input
                        id="input-mot_de_passe"
                        v-model="mot_de_passe"
                        type="password"
                        required>
                        </b-form-input>
                    </b-form-group>

                    <b-form-group
                    label="Photo :"
                    label-for="input-photo"
                    class="mb-2"
                    v-if="mode == 'signup'">
                        <input type="file" 
                        id="input-photo"
                        @change="photoChange"
                        required>
                    </b-form-group>

                    <b-form-group
                    label="Fonction :"
                    class="mb-2"
                    v-if="mode == 'signup'">
                        <b-form-radio 
                        name="input-radio" 
                        value="0"
                        v-model="fonction">
                        Chargé de la communication
                        </b-form-radio>

                        <b-form-radio 
                        name="input-radio" 
                        value="1"
                        v-model="fonction">
                        Employée
                        </b-form-radio>

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
                    type="submit" 
                    variant="primary"
                    v-if="mode == 'signup'"
                    @click="signup()">Créez votre compte</b-button>

                    <b-button 
                    type="submit" 
                    variant="primary"
                    v-else
                    @click="login()">Connectez-vous</b-button>
                </b-form>
                <p v-if="mode == 'login' && status == 'error_login'">Identifiants incorrects</p>
                <p v-if="mode == 'signup' && status == 'error_signup'">Choisissez une autre adresse e-mail</p>
            </b-row>
        </b-container>
        
        <!--<span v-if="state == 'connexionEnCours'">Connexion en cours</span>-->
    </div>
</template>

<script>
// @ is an alias to /src
import { mapState } from 'vuex';
import Header from '@/components/Header.vue'

export default {
  name: 'Signup',
  components: {
    Header
  },
  data: function () {
    return {
        mode: 'signup',
        fonction: 1,
        image_chemin: '',
    }
  },
computed: {
    optionCommunication: function () {
      if (this.mode == 'signup' && this.fonction == 0) {
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
          const files = event.target.files;
          let filename = files[0].name;
          this.image_chemin = filename;
      },
      signup: function (){
          const self = this;
        this.$store.dispatch('signup', {
            nom: this.nom,
            prenom: this.prenom,
            email: this.email,
            mot_de_passe: this.mot_de_passe,
            image_chemin: this.image_chemin,
            fonction: this.fonction,
        }).then(function (){
            self.login();
        }), function (error){
            console.log(error);
        }
      },
    login: function () {
      const self = this;
      this.$store.dispatch('login', {
        email: this.email,
        mot_de_passe: this.mot_de_passe,
      }).then(function () {
        self.$router.push('/profil');
      }, function (error) {
        console.log(error);
      })
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