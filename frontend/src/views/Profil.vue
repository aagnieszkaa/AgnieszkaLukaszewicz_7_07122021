<template>
    <div>
        <Header></Header>
        <b-container class="mt-4">
            <b-row>
                <b-card
                    img-src="https://picsum.photos/600/300/?image=25"
                    img-alt="Photo de profil"
                    img-top
                    class="mb-2 offset-3 col-6">
                    <b-card-title>{{utilisateur.prenom}} {{utilisateur.nom}}</b-card-title>
                    <b-card-text>{{utilisateur.fonction}}</b-card-text>
                    <b-card-text>{{utilisateur.email}}</b-card-text>
                    <b-row>
                        <b-button 
                        variant="primary"
                        class="col-5"
                        >Supprimer le compte</b-button>

                        <b-button 
                        variant="primary"
                        class="offset-2 col-5"
                        >Modifier le compte</b-button>
                    </b-row>
                </b-card>
            </b-row>
        </b-container>
    </div> 
</template>

<script>
// @ is an alias to /src
import Header from '@/components/Header.vue'
import { mapState } from 'vuex';

export default {
  name: 'Profil',
  components: {
    Header
  },
  mounted: function (){
      console.log(this.$store.state.utilisateur);
    if (this.$store.state.utilisateur.utilisateurId == -1) {
      this.$router.push('/');
      return;
    }
    this.$store.dispatch('utilisateurInfo');
  },
  computed: {
    ...mapState({
      utilisateur: 'utilisateurInfo',
    })
  },
}
</script>

<style lang="scss" scoped>

</style>