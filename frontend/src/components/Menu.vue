<template>
    <b-nav tabs align="center">
        <b-nav-item @click="profilPush()">Profil</b-nav-item>
        <b-nav-item @click="memesPush()">Memes</b-nav-item>
    </b-nav>
</template>

<script>
export default {
  name: 'Menu',
  methods: {
    memesPush: function () {
      this.$router.push('/memes');
    },
    profilPush: function () {
      this.$router.push('/profil');
    }
  }
}
</script>


<style scoped lang="scss">

</style>