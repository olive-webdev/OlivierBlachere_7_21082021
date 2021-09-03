<template>
  <div class="container bg-light px-4">
    <Header  />
    <SignupLogin class="mt-5" />
  </div>
</template>

<script>
import Header from '../components/Header.vue';
import SignupLogin from '../components/SignupLogin.vue';
export default {
  name: "Connexion",
  components: {Header, SignupLogin},
};
</script>