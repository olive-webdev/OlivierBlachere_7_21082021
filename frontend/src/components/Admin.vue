<template>
  <h2>Liste des signalements des utilisateurs</h2>
  <hr>
  <div v-if="reports.length == 0" class="mt-5">Aucun signalement.</div>
  <div class="alert alert-danger d-flex align-items-center justify-content-between py-0 text-black"
      v-for="report in reports" :key="report.id">{{ report.User.name }} {{ report.User.surname }}
      a signalé un post de {{ report.Posting.User.name }} {{ report.Posting.User.surname }}
      <router-link class="text-decoration-none text-danger fw-bold"  :to="{path:'/postfeed/', hash:'#post'+report.postingId}">
        <div class="d-flex justify-content-between align-items-center py-3" >
          <div  class="me-auto ms-3 d-none d-lg-block">Voir le post sur la page</div>
        </div>
      </router-link>
      <BIconXSquare @click="closeAlert()" class="fs-4 pointer"/>
  </div>

</template>

<script>
const axios = require("axios").default;
export default {
    data(){
        return{
            reports: {}
        }
    },
    methods:{
      getAllReports(){
          axios.get('http://localhost:3000/reports/', { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
          .then((response)=>{this.reports = response.data; console.log(this.reports)})
          .catch((error) =>{console.log(error)})
      },
      closeAlert(){

      },
    },
    beforeMount: function() {
    if (!this.$store.state.user.token && !localStorage.getItem("token")) {
      this.$router.push("/connexion");
      console.log("utilisateur non connecté");
    } else if (!this.$store.state.user.token && localStorage.getItem("token")) {
      this.$store
        .dispatch("getUser", {
          id: localStorage.getItem("userId"),
          token: localStorage.getItem("token"),
        })
        .then(() => {
          console.log("utilisateur connecté");this.getAllReports()
        })
        .catch();
    } else {
      return;
    }
    },
    mounted(){
        this.getAllReports()
    },
}
</script>

<style>

</style>