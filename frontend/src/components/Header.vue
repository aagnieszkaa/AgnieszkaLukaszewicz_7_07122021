<template>
  <header class="header">
    <div class="container">
      <div class="row">
        <img src="../assets/images/logo/icon-left-font-monochrome-white.svg" alt="logo Groupomania" 
        class="header__logo offset-3 col-6"/>
      </div>
    </div>
  </header>
</template>

<script>
export default {
  name: 'Header'
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$color-primary: #2c9586;

  .header{
    padding: 10px 0;
    background-color: $color-primary;
    width: 100%;
  }
</style>
