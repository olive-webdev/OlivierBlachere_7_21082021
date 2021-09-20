<template>
      <div class="bg-light">
        <div class="d-flex justify-content-between align-items-center py-3">
        <router-link to="/">
        <img class="logo" src="../assets/icon-left-font-corrected.svg" alt="logo de groupomania" />
        </router-link>
        <div v-if="user.userId != -1" class="d-flex flex-column align-items-center position-relative">
            <div @click="menu = !menu" class="d-flex pointer">
              <div class="me-3 text-end text-primary fs-5 d-none d-md-block">
                <h3 class="m-0">{{user.name}} {{user.surname}}</h3>
                <p v-if="user.service !== null" class="mb-0">@ {{user.service}}</p>
              </div>
              <div class="thumbnail border border-primary rounded overflow-hidden">
                <img v-if="user.Ppicture != null" 
                :src="$store.state.user.Ppicture" height="60" width="60" alt="photo de profil" />
                <img v-else class="rounded border" 
                src="@/assets/defaultProfilPicture.jpeg" height="60" width="60" alt="photo de profil par défaut" />
              </div>
            </div>
        </div>
      </div>
          <Menu v-if="menu" class="position-absolute position z d-lg-none"/>
    </div>

</template>

<script>
import { mapState } from 'vuex';
import Menu from "../components/Menu.vue";
export default {
name: "Header",
components: {
    Menu,
  },
  computed:{
    ...mapState(['user'])
  },
  data(){
    return{
      menu : false
    }
  }
}
</script>

<style lang="scss" scoped>
.position{
  top: 5rem;
  right: 0rem;
}
.z{
  width: 200px;
  z-index: 2000;
}
</style>