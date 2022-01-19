<template>
  <div>
    <b-nav tabs align="center" class="menu bg-light">
        <b-nav-item class="menu__item" @click="profilPush()">Profil</b-nav-item>
        <b-nav-item class="menu__item" @click="memesPush()">Publication</b-nav-item>
        <b-nav-item class="menu__item" id="deconnexion" @click="logout()">Déconnexion</b-nav-item>
    </b-nav>
  </div>
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
      this.$store.commit('LOGOUT');
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

<style lang="scss">

.nav-link {
  color: black!important;
  cursor: pointer;
  &:hover {
    color: #df4759!important;
  }
}
.menu {
  @include border;
  &__item {
    font-weight: bold;
  }
}
#deconnexion {
  font-weight: normal;
  &:hover {
    font-weight: bold;
    background-color: #ffd7d7;
  }
}

</style>