<template>
  <div
    class="
      bg-white
      rounded-g
      d-flex
      justify-content-center
      shadow
      text-decoration-none
      ms-3
    "
  >
    <div id="nav2" class="p-0 my-0 rounded-g w-100">
      <router-link class="black" to="/">
        <div
          class="
            d-flex
            justify-content-between
            align-items-center
            py-3
            bckg
            rounded-g-top
          "
        >
          <BIconJournalText class="ms-3 fs-2" />
          <div class="me-auto ms-3 d-none d-lg-block">Fil d'actualité</div>
        </div>
      </router-link>
      <router-link class="black" to="/profil">
        <div
          class="d-flex justify-content-between align-items-center py-3 bckg"
        >
          <BIconPersonSquare class="ms-3 fs-2" />
          <div class="me-auto ms-3 d-none d-lg-block">Profil</div>
        </div>
      </router-link>
      <router-link class="black" to="/admin">
        <div
          class="
            d-flex
            justify-content-between
            align-items-center
            py-3
            bckg
          "
        >
          <BIconShieldLockFill class="fs-2 ms-3" />
          <div class="me-auto ms-3 d-none d-lg-block">Administration</div>
        </div>
      </router-link>
      <router-link class="black" to="/connex">
        <div
          class="
            d-flex
            justify-content-between
            align-items-center
            py-3
            bckg
            rounded-g-bottom
          "
        >
          <BIconXCircle class="fs-2 ms-3" />
          <div class="me-auto ms-3 d-none d-lg-block">Se déconnecter</div>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  name: "Menu",
  props: {
    msg: String,
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
#nav2 a:hover {
    color: rgb(233, 68, 38);
  }

</style>
