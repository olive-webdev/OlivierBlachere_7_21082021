<template>
  <div class="container px-4 bg-light vh-100">
    <Header class="p-1 sticky-top"/>
    <div class="row">
      <div class="col-12">
        <div class="bg-groupomania shadow py-5 my-5">
          <h1>Groupomania a désormais son réseau social</h1>
          <h2 class="text-center mt-3 mx-2">Partagez avec vos collègues !</h2>
          <div class="d-flex flex-column flex-lg-row align-items-center">
            <img src="@/assets/screenshot.png" alt="" class="shadow rounded m-5 mb-2 imageSize mx-3">
            <div class="d-flex flex-column m-lg-5 ms-0">
              <p class="my-3 fs-5 text-dark">Postez des messages, agrémentez en incluant des images</p>
              <p class="my-3 fs-5 text-dark">Commentez, likez les posts de vos collègues</p>
              <p class="my-3 fs-5 text-dark">Personnalisez votre profil, ajoutez une photo, précisez votre service</p>
              <p class="my-3 fs-5 text-dark">Inscrivez-vous simplement, votre nom, prénom, un email et un mot de passe suffisent.</p>
              <router-link to="/connexion" class="fs-4 btn btn-secondary border-primary mx-5 mt-5">Je m'inscris !</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
    
  </div>
</template>

<script>
import Header from '../components/Header.vue';
export default {
  name: "Home",
  components: {Header},
};
</script>

<style lang="scss" scoped>
.bg-groupomania{
  background: url('~@/assets/wickedbackground.svg'), no-repeat;
  background-size: cover;
}
.h{
  height: calc( 90vh - 96px);
}
.imageSize{
  min-width: 300px;
  width: 90%;
  max-width: 80vw;
}
</style>