
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

input[type=text], input[type=email], input[type=password], textarea, #input-description {
  border: 1px solid #ffd7d7;
}

.h1 {
    font-size: 1.5em !important;
    color: #d02539;
    text-align: center;
    font-weight: bold;
}


</style>
