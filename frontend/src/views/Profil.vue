<template>
  <div class="container bg-light px-1 px-md-4 vh-100">
    <Header class="sticky-top p-1" />
    <div class="row mx-0">
      <div class="col-3 mt-3">
        <Menu class="d-none d-lg-block"/>
      </div>
      <div class="col-lg-9 mt-3 col-12">
        <InfoUser />
      </div>
    </div>
  </div>
</template>
<script>
import Header from '../components/Header.vue';
import Menu from '../components/Menu.vue';
import InfoUser from '../components/InfoUser.vue';
import { useRouter } from "vue-router";

export default {
  name: "Profil",
  components: {Header, Menu, InfoUser},
  data(){
    return{
      router: useRouter(),
    }
  },

   beforeMount: function(){
    if(!this.$store.state.user.token && !localStorage.getItem('token')){
      this.$router.push("/connexion")
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