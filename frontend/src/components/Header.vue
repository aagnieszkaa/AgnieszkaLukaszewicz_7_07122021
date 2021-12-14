<template>
  <header class="header">
      <img src="../assets/images/logo/icon-left-font-monochrome-white.svg" alt="logo Groupomania" class="header__logo"/>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
  .header{
    height: 200px;
    background-color: red;
    display: flex;
    justify-content: center;
    &__logo{
      height: 100%;
      object-fit: cover;
    }  
  }
</style>
