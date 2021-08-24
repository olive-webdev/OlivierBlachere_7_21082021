<template>
  <div class="container">
    <div class="home bg-light row h">
      <div class="bg-light col-3">
        <Menu msg="Welcome to Your Vue.js App" />
      </div>
      <div class="col-9">
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Menu.vue";

export default {
  name: "Home",
  components: {
    Menu,
  },
};
</script>

<style lang="scss">
.h {
  height: calc(100vh - 86px);
}
</style>
