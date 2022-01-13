<template>
    <b-nav tabs align="center">
        <b-nav-item @click="profilPush()">Profil</b-nav-item>
        <b-nav-item @click="memesPush()">Memes</b-nav-item>
        <b-nav-item @click="logout()">Déconnexion</b-nav-item>
    </b-nav>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Menu',
  computed: {
    ...mapState({
      utilisateur_token_id: 'utilisateur',
    })
  },
  methods: {
    logout: function () {
      this.$store.commit('logout');
      this.$router.push('/');
    },
    memesPush: function () {
      this.$router.push('/memes');
    },
    profilPush: function () {
      const self = this;
      self.$router.push(`/profil/${self.utilisateur_token_id.utilisateurId}`);
    }
  }
}
</script>


<style scoped lang="scss">

</style>