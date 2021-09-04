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

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
.round{
    border-radius: .6rem;
}
body::-webkit-scrollbar {
  display: none;
}
.pointer{
    cursor: pointer;
}
.btng{
  background-color: rgb(235, 204, 204);
  border-radius: .6rem;
  border: 1px solid rgb(233, 68, 38);
}
@import "~bootstrap/dist/css/bootstrap.css";
@import "../node_modules/bootstrap/scss/functions";

// Default variable overrides
// $body-bg: #000;
// $body-color: #111;


// Required
@import "../node_modules/bootstrap/scss/variables";
@import "../node_modules/bootstrap/scss/mixins";
// Optional Bootstrap components here
@import "../node_modules/bootstrap/scss/root";
@import "../node_modules/bootstrap/scss/reboot";
@import "../node_modules/bootstrap/scss/type";


</style>
