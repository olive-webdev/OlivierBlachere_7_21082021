<template>
  <div class="container bg-light px-md-4 px-1 vh-100">
    <Header class="p-1 sticky-top" />
    <div class="row mx-0">
      <div class="col-3 mt-3">
        <Menu class="d-none d-lg-block"/>
      </div>
      <div v-if="$store.state.user.admin" 
      class="col-lg-9 col-12 mt-3">
        <Admin />
      </div>
      <div v-else 
      class="col-lg-9 col-12 mt-5 fs-3 text-center px-5">
      Vous devez être administrateur pour accéder à cette page</div>
    </div>
  </div>
</template>
<script>
import Header from '../components/Header.vue';
import Menu from '../components/Menu.vue';
import { useRouter } from "vue-router";
import Admin from '../components/Admin.vue'
export default {
  name: "Profil",
  components: {Header, Menu, Admin},
  data(){
    return{
      router: useRouter(),
    }
  },
  beforeMount: function(){ // VÉRIFIE SI L'UTILISATEUR EST BIEN AUTHENTIFIÉ
    if(!this.$store.state.user.token && !localStorage.getItem('token')){
      this.$router.push({name:'Connexion', params:{logorsign: 'login'}})
      console.log("utilisateur non authentifié")
    }
    else if(!this.$store.state.user.token && localStorage.getItem('token')){
      this.$store.dispatch('getUser', {
      id: localStorage.getItem('userId'),
      token: localStorage.getItem('token')})
      .then(() => { console.log(this.$store.state.user) })
      .catch()
    }
    else{
      return;
    }
  }
};
</script>