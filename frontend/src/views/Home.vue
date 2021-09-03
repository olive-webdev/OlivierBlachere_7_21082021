<template>
  <div class="container bg-light">
    <Header />
    page d'accueil
    <div id="nav">
    <router-link to="/">Accueil</router-link> |
    <router-link to="/connexion">S'inscrire ou se connecter</router-link>
    </div>
    Lorem ipsum dolor sit, amet consectetur adipisicing elit. Architecto optio qui
    repudiandae a, dicta distinctio dolor illum veritatis quos ullam voluptate est
    ea laudantium deserunt doloremque, veniam quod. Aspernatur reiciendis eveniet
    voluptatum atque corrupti debitis impedit architecto omnis. Sint obcaecati,
    numquam praesentium assumenda, saepe tempora molestias quis iusto consectetur
    reiciendis voluptatem adipisci deleniti ab aspernatur quod, aperiam eligendi
    pariatur deserunt.
  </div>
</template>

<script>
import Header from '../components/Header.vue';
export default {
  name: "Home",
  components: {Header},
};
</script>
