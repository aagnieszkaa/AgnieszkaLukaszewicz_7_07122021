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

<style scoped lang="scss">
  .header{
    padding: 10px 0;
    background-color: $color-strong;
    width: 100%;
  }
</style>
