<template>
      <div class="bg-light">
        <div class="d-flex justify-content-between align-items-center py-3">
        <router-link to="/">
        <img class="logo" src="../assets/icon-left-font-corrected.svg" alt="" />
        </router-link>
        <div v-if="user.userId != -1" class="d-flex flex-column align-items-center">
          <div class="dropdown">
            <div class="d-flex" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
              <div class="me-3 text-end text-primary fs-5 d-none d-md-block">
                <h3 class="m-0">{{user.name}} {{user.surname}}</h3>
                <p v-if="user.service !== null" class="mb-0">@ {{user.service}}</p>
              </div>
              <div class="thumbnail border border-primary shadow rounded overflow-hidden">
                <img v-if="user.Ppicture != null" :src="$store.state.user.Ppicture" height="60" width="60" alt="" />
                <img v-else class="rounded border shadow" src="@/assets/defaultProfilPicture.jpeg" height="60" width="60" alt="" />
              </div>
            </div>
            <div id="nav" class="p-0 my-0 dropdown-menu dropdown-menu-end" aria-labelledby="dropdownMenuButton1">
              <router-link class="text-dark" to="/postfeed">
                <div class=" d-flex dropdown-item justify-content-between align-items-center py-3 bckg rounded-top ">
                  <div class="me-auto ms-3 d-none d-lg-block">Fil d'actualité</div>
                </div>
              </router-link>
              <router-link class="text-dark" :to="{name: 'Profil', params: {id : 2}}" >
                <div class=" d-flex dropdown-item justify-content-between align-items-center py-3 bckg " >
                  <div class="me-auto ms-3 d-none d-lg-block">Profil</div>
                </div>
              </router-link>
              <router-link v-if="user.admin == true" class="text-dark" to="/administration">
                <div class=" d-flex dropdown-item justify-content-between align-items-center py-3 bckg rounded-bottom " >
                  <div class="me-auto ms-3 d-none d-lg-block">Administration</div>
                </div>
              </router-link>
              <router-link class="text-dark" to="/connexion" >
                <div class="d-flex dropdown-item justify-content-between align-items-center py-3 bckg " >
                  <div class="me-auto ms-3 d-none d-lg-block">Se déconnecter</div>
                </div>
              </router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { mapState } from 'vuex';
export default {
name: "Header",
  computed:{
    ...mapState(['user'])
  },
}
</script>

<style lang="scss" scoped>

.logo{
  min-width: 200px;
  max-width: 30vw;
  // max-width: 200px;
}
// img{
//   width: 100%;
//   height: 100%;
//   object-fit: cover;
//   object-position: center;
// }
</style>