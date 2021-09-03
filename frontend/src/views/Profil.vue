<template>
  <div class="container bg-light px-4">
    <Header  />
    <div class="row">
      <div class="col-3 mt-3">
        <Menu />
      </div>
      <div class="col-9 mt-3">
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
      console.log("utilisateur non connecté")
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