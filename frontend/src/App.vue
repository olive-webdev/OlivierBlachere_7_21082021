<template>
  <router-view :key="$route.fullPath" />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
body::-webkit-scrollbar {
  display: none;
}
.pointer{
    cursor: pointer;
}
.thumbnailSM {
  width: 30px;
  height: 30px;
}
.thumbnailMD{
  width: 50px;
  height: 50px;
}
.thumbnail{
  width: 60px;
  height: 60px;
}
.logo{
  min-width: 200px;
  max-width: 30vw;
}
// PERSONNALISATION BOOTSTRAP
$primary : #e94426;
$secondary : #ebcccc;
$border-radius: .3rem;
$dark: rgb(40,40,40);
$input-focus-bg: rgba(0, 0, 0, 0);
@import "../node_modules/bootstrap/scss/bootstrap.scss";
</style>
