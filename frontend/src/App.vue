
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

input[type=text], input[type=email], input[type=password], textarea {
  border: 1px solid #ffd7d7;
}
</style>
