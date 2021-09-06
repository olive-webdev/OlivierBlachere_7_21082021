<template>
    <div class="bg-white d-flex justify-content-center shadow round">
      <div id="navigation" class="p-0 my-0 w-100">
        <router-link class="" to="/postfeed">
          <div class="d-flex justify-content-between align-items-center py-3 round-top" >
            <div class="me-auto ms-3 d-none d-lg-block">Fil d'actualité</div>
          </div>
        </router-link>
        <router-link class="" :to="{ name: 'Profil', params: { id: userId }}">
          <div class="d-flex justify-content-between align-items-center py-3" >
            <div class="me-auto ms-3 d-none d-lg-block">Profil</div>
          </div>
        </router-link>
        <router-link v-if="$store.state.user.admin == true" class="" to="/administration">
          <div class=" d-flex justify-content-between align-items-center py-3" >
            <div class="me-auto ms-3 d-none d-lg-block">Administration</div>
          </div>
        </router-link>
        <router-link @click="disconnect()" class="" to="/connexion">
          <div class="d-flex justify-content-between align-items-center py-3" >
            <div  class="me-auto ms-3 d-none d-lg-block">Se déconnecter</div>
          </div>
        </router-link>
  </div>

  </div>
</template>

<script>
export default {
  name: "Menu",
  data(){
    return{
      userId: localStorage.getItem('userId'),
    }
  },
  methods:{
    disconnect(){
      console.log("deconnexion en cours")
      localStorage.removeItem('token');
      localStorage.removeItem('userId');
      this.$store.dispatch('logout')
      .then(() => { console.log(this.$store.state.user) })
      .catch()
    }
  }
}
</script>

<style scoped lang="scss">
a{
  text-decoration: none;
  color: #232323;
}
a:hover {
    color: rgb(233, 68, 38);
}
#navigation .router-link-exact-active > div{
  background-color: rgb(235, 204, 204);
  border-left: 3px solid rgb(233, 68, 38);
}

.round-top{
    border-radius: .6rem .6rem 0 0;
}

</style>
