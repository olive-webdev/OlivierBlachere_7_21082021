<template>
  <div class="bg-light container">
    <Header />
    <div class="container h d-flex bg-light px-4">
      <Menu />
      <ProfilInfo />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Menu.vue";
import Header from "@/components/Header.vue";
import ProfilInfo from "@/components/ProfilInfo.vue"

export default {
  name: "Profil",
  components: {
    Menu,
    Header,
    ProfilInfo
  },
};
</script>

<style lang="scss">
.h {
  height: calc(100vh - 90px);
}
.inputfile {
	opacity: 0;
	position: absolute;
	z-index: -1;
}

.inputfile:hover + label,
.inputfile + label:hover {
    color: rgb(233, 68, 38);
}
.rounded-g-top {
  border-radius: 0.75rem 0.75rem 0 0;
}
.rounded-g-bottom {
  border-radius: 0 0 0.75rem 0.75rem;
}
</style>
