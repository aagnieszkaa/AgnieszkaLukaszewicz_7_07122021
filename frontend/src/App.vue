
<template>
  <router-view :key="$route.fullPath"></router-view>
</template>

<style lang="scss">

@mixin tablette {
  @media screen and (min-width: 577px) and (max-width: 992px) {
    @content;
  }
}
@mixin desktop {
  @media screen and (min-width: 993px){
    @content;
  }
}
@mixin tablette_and_desktop
{
    @media screen and (min-width: 577px)
    {
        @content;
    }
}
li {
  list-style-type: none;
}
* {
  box-sizing: border-box;
}
</style>
