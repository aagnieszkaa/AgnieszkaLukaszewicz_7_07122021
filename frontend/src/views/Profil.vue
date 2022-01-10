<template>
    <div>
        <Header></Header>
        <Menu></Menu>
        <b-container class="mt-4">
            <b-row>
                <b-card
                    :img-src="utilisateur.image_chemin"
                    img-alt="Photo de profil"
                    img-top
                    class="mb-2 offset-3 col-6">
                    <b-card-title>{{utilisateur.prenom}} {{utilisateur.nom}}</b-card-title>
                    <b-card-text v-if="chargeCommunication">Chargé de la communication</b-card-text>
                    <b-card-text v-else>Employée</b-card-text>
                    <b-card-text>{{utilisateur.email}}</b-card-text>
                    <b-row>
                        <b-button 
                        variant="primary"
                        v-if="this.utilisateur_token_id.utilisateurId == this.urlId"
                        class="col-5"
                        @click="deleteUser()"
                        >Supprimer le compte</b-button>

                        <b-button 
                        v-if="this.utilisateur_token_id.utilisateurId == this.urlId"
                        variant="primary"
                        class="offset-2 col-5"
                        @click="editUser()"
                        >Modifier le compte</b-button>

                        <b-button 
                        v-if="this.utilisateur_token_id.utilisateurId == this.urlId"
                        class="offset-3 col-6 mt-4"
                        @click="logout()"
                        >Déconnexion</b-button>
                    </b-row>
                </b-card>
            </b-row>
        </b-container>
    </div> 
</template>

<script>
// @ is an alias to /src
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
    })
  },
  methods: {
    logout: function () {
      this.$store.commit('logout');
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

</style>