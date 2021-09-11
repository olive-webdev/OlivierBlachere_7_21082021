<template>
  <router-view :key="$route.fullPath" />
</template>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body::-webkit-scrollbar {
  display: none;
}
.pointer{
    cursor: pointer;
}

.thumbnail{
  width: 60px;
  height: 60px;
}
.thumbnailSM {
  width: 30px;
  height: 30px;
}
.thumbnailMD{
  width: 50px;
  height: 50px;
}
// BOOTSTRAP PERSONNALISATION
$primary : rgb(233, 68, 38);
$secondary : rgb(235, 204, 204);
$border-radius: .6rem;
$dark: rgb(40,40,40);
$input-focus-bg: rgba(0, 0, 0, 0);
@import "../node_modules/bootstrap/scss/bootstrap.scss";


</style>
