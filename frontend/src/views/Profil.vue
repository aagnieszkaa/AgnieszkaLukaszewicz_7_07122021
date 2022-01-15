<template>
  <div>
    <Header></Header>
    <Menu></Menu>
    <div class="container">
      <b-container class="my-4">
        <b-row>
          <b-card
          no-body
          class="profil-card 
          mb-2 
          offset-1 col-10
          offset-md-3 col-md-6
          offset-lg-4 col-lg-4">
            <b-card-img 
            :src="utilisateur.image_chemin" 
            alt="Photo de profil" 
            top 
            class="mb-2 profil-card__photo">
            </b-card-img>
            <b-card-body class="d-flex flex-column justify-content-center align-items-center">
              <b-card-title>{{utilisateur.prenom}} {{utilisateur.nom}}</b-card-title>
              <b-card-text v-if="chargeCommunication">Chargé de la communication</b-card-text>
              <b-card-text v-else>Employée</b-card-text>
              <b-card-text>{{utilisateur.email}}</b-card-text>
              <b-button 
              v-if="this.utilisateur_token_id.utilisateurId == this.urlId"
              variant="primary"
              class="col-8"
              @click="editUser()"
              >Modifier le compte</b-button><br>
              <b-button 
              variant="primary"
              v-if="this.utilisateur_token_id.utilisateurId == this.urlId"
              class="col-8"
              @click="deleteUser()">
                <span v-if="status == 'loading'">En cours...</span>
                <span v-else>Supprimer le compte</span>
              </b-button><br>
              <b-button 
              variant="secondary"
              v-if="this.utilisateur_token_id.utilisateurId == this.urlId"
              class="col-8 mt-4"
              @click="logout()">Déconnexion</b-button>
            </b-card-body>
          </b-card>
        </b-row>
      </b-container>
    </div> 
  </div>
</template>

<script>
import Header from '@/components/Header.vue'
import Menu from '@/components/Menu.vue'
import { mapState } from 'vuex';

export default {
  name: 'Profil',
  components: {
    Header,
    Menu,
  },
  data: function () {
    return {
      urlId: this.$route.params.id,
    }
  },
  mounted: function (){
    const self = this;
    if (this.utilisateur_token_id.utilisateurId == -1) {
      this.$router.push('/');
      return;
    }
    self.$store.dispatch('utilisateurInfo', self.$route.params.id);
  },
  computed: {
    chargeCommunication: function () {
      if (this.utilisateur.fonction == false) {
        return false;
      } else {
        return true;
      }
    },
    ...mapState({
    utilisateur: 'utilisateurInfo',
    utilisateur_token_id: 'utilisateur',
    status: 'status',
    })
  },
  methods: {
    logout: function () {
      this.$store.commit('LOGOUT');
      this.$router.push('/');
    },
    editUser: function () {
      this.$router.push('/editUser');
    },
    deleteUser: function () {
      const self = this;
      this.$store.dispatch('suppressionUtilisateur', this.utilisateur_token_id.utilisateurId)
      .then(function () {
        self.logout();
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.profil-card {
  overflow: hidden;
  border-radius: 2%;
  padding: 0;
  border: 1px solid #bdc7d0;
  &__photo {
    height: 250px;
    width: 100%;
    object-fit: cover;
  }
}
</style>