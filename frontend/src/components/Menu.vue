<template>
  <div class="col-3">
    <div class="bg-white rounded-g d-flex justify-content-center shadow text-decoration-none me-4">
      <div id="navigation" class="p-0 my-0 rounded-g w-100">
        <router-link class="black" to="/">
          <div class=" d-flex justify-content-between align-items-center py-3 bckg rounded-g-top " >
            <BIconJournalText class="ms-3 fs-2" />
            <div class="me-auto ms-3 d-none d-lg-block">Fil d'actualité</div>
          </div>
        </router-link>
        <router-link class="black" to="/profil">
          <div class="d-flex justify-content-between align-items-center py-3 bckg" >
            <BIconPersonSquare class="ms-3 fs-2" />
            <div class="me-auto ms-3 d-none d-lg-block">Profil</div>
          </div>
        </router-link>
        <router-link v-if="$store.state.admin" class="black" to="/admin">
          <div class=" d-flex justify-content-between align-items-center py-3 bckg " >
            <BIconShieldLockFill class="fs-2 ms-3" />
            <div class="me-auto ms-3 d-none d-lg-block">Administration</div>
          </div>
        </router-link>
        <router-link class="black" to="/connex">
          <div class=" d-flex justify-content-between align-items-center py-3 bckg rounded-g-bottom " >
            <BIconXCircle class="fs-2 ms-3" />
            <div class="me-auto ms-3 d-none d-lg-block">Se déconnecter</div>
          </div>
        </router-link>
      </div>
  </div>

  </div>
</template>

<script>
export default {
  name: "Menu",
}
</script>

<style scoped lang="scss">
a{
  text-decoration: none;
}
a:hover {
    color: rgb(233, 68, 38);
  }
#navigation .router-link-exact-active > div{
  background-color: rgb(235, 204, 204);
  border-left: 3px solid rgb(233, 68, 38);
}
</style>
