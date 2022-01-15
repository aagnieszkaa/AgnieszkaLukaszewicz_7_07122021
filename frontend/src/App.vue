
<template>
  <router-view :key="$route.fullPath"></router-view>
</template>

<style lang="scss">
li {
  list-style-type: none;
}
* {
  box-sizing: border-box;
}
.error {
  color: red;
}
</style>
