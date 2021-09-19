<template>
  <h2>Liste des signalements des utilisateurs</h2>
  <hr>
  <div v-if="reports.length == 0" class="mt-5 text-center">Aucun signalement.</div>
    <div class="alert bg-secondary d-flex align-items-center justify-content-between py-0 text-black shadow mb-4 position-relative"
      v-for="report in reports" :key="report.id">
      <div v-if="report.Posting != null" class="d-flex flex-column justify-content-between align-items-center py-3 w-100">
        <strong>{{ report.User.name }} {{ report.User.surname }}</strong>
         a signalé un post de 
        <strong>{{ report.Posting.User.name }} {{ report.Posting.User.surname }}</strong>
        <router-link class="text-decoration-none text-danger fw-bold"  :to="{path:'/postfeed/', hash:'#post'+report.postingId}">
          <div  class="ms-3 mt-2">Voir le post sur la page</div>
        </router-link>
        <BIconXSquare @click="closeAlert(report.Posting, to[0])" class="fs-4 pointer position-absolute close"/>
      </div>
      <div v-if="report.Comment != null" class="d-flex flex-column justify-content-between align-items-center py-3 w-100">
        <span v-if="report.Comment.UserId == null" class="d-flex flex-column justify-content-between align-items-center w-100">
          <strong>{{ report.User.name }} {{ report.User.surname }}</strong>
           a signalé un commentaire d'un utilisateur supprimé
        </span>
        <span v-else class="d-flex flex-column justify-content-between align-items-center w-100">
          <strong>{{ report.User.name }} {{ report.User.surname }}</strong>
           a signalé un commentaire de 
          <strong>{{ report.Comment.User.name }} {{ report.Comment.User.surname }}</strong>
        </span>
        <router-link class="text-decoration-none text-danger fw-bold"  :to="{path:'/postfeed/', hash:'#post'+report.Comment.postingId}">
          <div  class="ms-3 mt-2">Voir le commentaire sur la page</div>
        </router-link>
        <BIconXSquare @click="closeAlert(report.Comment, to[1])" class="fs-4 pointer position-absolute close"/>
      </div>
    </div>
</template>

<script>
const axios = require("axios").default;
const instance = axios.create({baseURL: process.env.VUE_APP_SERVER})
export default {
  data(){
      return{
          reports: {},
          to: ['posting', 'comment']
      }
  },
  methods:{
    getReports(){
      this.$store.dispatch('reports')
      .then(function (){console.log('récuprération des signalements')})
      .catch(function (error){console.log(error)})
    },
    getAllReports(){
        instance.get('/reports/', { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
        .then((response)=>{this.reports = response.data})
        .catch((error) =>{console.log(error)})
    },
    closeAlert(from, to){
    instance.delete('/reports/'+to+'/'+from.id, { headers: { Authorization: 'bearer ' + localStorage.getItem('token')}})
    .then(() => {console.log('signalement supprimé');this.getReports();this.getAllReports()})
    .catch((error) =>{console.log(error)})
    },
  },
  beforeMount: function() {
  if (!this.$store.state.user.token && !localStorage.getItem("token")) {
    this.$router.push({name:'Connexion', params:{logorsign: 'login'}});
    console.log("utilisateur non authentifié");
  } else if (!this.$store.state.user.token && localStorage.getItem("token")) {
    this.$store
      .dispatch("getUser", {
        id: localStorage.getItem("userId"),
        token: localStorage.getItem("token"),
      })
      .then(() => {
        console.log("utilisateur authentifié");this.getAllReports()
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
.close{
  top: .3rem;
  right: .3rem;
}
</style>