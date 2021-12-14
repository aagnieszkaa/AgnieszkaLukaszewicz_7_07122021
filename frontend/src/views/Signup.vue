<template>
    <Header></Header>
        <div class="container mt-4">
            <div class="row form">
                <form class="offset-1 col-10">
                    <h2 v-if="mode == 'signup'">Créer votre compte</h2>
                    <h2 v-else>Connectez-vous</h2>
                    <p v-if="mode == 'signup'">Vous avez déjà le compte ? <span class="link" @click="switchToConnexion()">Connectez-vous</span></p>
                    <p v-else>Vous n'avez pas de compte ? <span class="link" @click="switchToCreation()">Créer votre compte</span></p>
                    <div class="form-group row mb-2 mt-4" v-if="mode == 'signup'">
                        <label for="nom" class="col-sm-2 col-form-label">Nom : </label>
                        <div class="col-sm-10">
                            <input type="text" id="nom" name="nom" class="form-control" v-model="nom">
                        </div>
                    </div>
                    <div class="form-group row mb-2" v-if="mode == 'signup'">
                        <label for="prenom" class="col-sm-2 col-form-label">Prénom : </label>
                        <div class="col-sm-10">
                            <input type="text" id="prenom" name="prenom" class="form-control" v-model="prenom">
                        </div>
                    </div>
                    <div class="form-group row mb-2">
                        <label for="email" class="col-sm-2 col-form-label">E-mail : </label>
                        <div class="col-sm-10">
                            <input type="email" id="email" name="email" class="form-control" v-model="email">
                        </div>
                    </div>
                    <div class="form-group row mb-2">
                        <label for="mot_de_passe" class="col-sm-2 col-form-label">Mot de passe : </label>
                        <div class="col-sm-10">
                            <input type="password" id="mot_de_passe" name="mot_de_passe" class="form-control" v-model="mot_de_passe">
                        </div>
                    </div>
                    <div class="form-group row mb-2" v-if="mode == 'signup'">
                        <label for="image_chemin" class="col-sm-2 col-form-label">Photo : </label>
                        <div class="col-sm-10">
                            <input type="file">
                        </div>
                    </div>
                    <fieldset class="form-group mb-2" v-if="mode == 'signup'">
                        <legend class="col-form-label col-sm-2 pt-0">Fonction</legend>
                            <div class="col-sm-10">
                                <div class="form-check">
                                    <input type="radio" id="employee" name="fonction" value="employee" class="form-check-input" v-model="employee">
                                    <label for="employee" class="form-check-label">Employée</label>
                                </div>
                                <div class="form-check">
                                    <input type="radio" id="charge_com" name="fonction" value="charge_com" class="form-check-input" v-model="charge">   
                                    <label for="charge_com" class="form-check-label">Chargé de la communication</label> 
                                </div>
                            </div>      
                    </fieldset>
                    <div class="form-group row mb-2" v-if="mode == 'signup'">
                        <label for="mdpRh" class="col-sm-2 col-form-label">Mot de passe fourni par les RH : </label><br>
                        <div class="col-sm-10">
                            <input type="password" id="mdpRh" name="mdpRh" class="form-control" v-model="mdpRh">
                        </div>
                    </div>
                    <button @click="creerCompte()" type="submit" class="btn btn-primary mb-4" v-if="mode == 'signup'" :disabled="!validated">Créer mon compte</button>
                    <button type="submit" class="btn btn-primary mb-4" v-else :disabled="!validated">Connectez-vous</button>
                </form>
            </div>
        </div>
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'

export default {
  name: 'Signup',
  components: {
    Header
  },
  data: function () {
    return {
        mode: 'signup',
        email: '',
        prenom: '',
        nom: '',
        mot_de_passe: '',
        employee: '',
        charge: '',
    }
  },
computed: {
    validated: function () {
      if (this.mode == 'signup') {
        if (this.email != "" && this.prenom != "" && this.nom != "" && this.mot_de_passe != "" && this.employee || this.charge != "") {
          return true;
        } else {
          return false;
        }
      } else {
        if (this.email != "" && this.mot_de_passe != "") {
          return true;
        } else {
          return false;
        }
      }
    }
  },
  methods: {
      switchToConnexion: function () {
          this.mode = 'login';
      },
      switchToCreation: function () {
          this.mode = 'signup';
      },
      creerCompte: function () {
          console.log(this.email);
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