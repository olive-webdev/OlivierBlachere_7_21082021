<template>
  <div class="container">
    <div class="row">
      <div class="bg-light vh d-flex justify-content-center align-items-start">
        <div class="bg-white rounded-g p-5 shadow mt-5">
          <img src="@/assets/icon.svg" alt="" />
          <form @submit.prevent="login">
            <div class="mb-3">
              <label for="exampleInputEmail1" class="form-label red"
                >Adresse Email</label
              >
              <input
                type="email"
                class="form-control borderG"
                id="exampleInputEmail1"
                aria-describedby="emailHelp"
                placeholder="Entrer votre email..."
                v-model="email"
              />
              <div id="emailHelp" class="form-text"></div>
            </div>
            <div class="mb-3">
              <label for="exampleInputPassword1" class="form-label red"
                >Mot de passe</label
              >
              <input
                type="password"
                class="form-control borderG"
                id="exampleInputPassword1"
                v-model="password"
                placeholder="{{ errorMessage }}"
              />
            </div>
            <button
              type="submit"
              class="btn btn-groupomania borderG"
            >
              Se connecter
            </button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import { ref } from "vue";

import { useRouter } from "vue-router";
const axios = require('axios').default;
export default {
  name: "Connex",
  setup() {

    const router = useRouter();
    // const route = useRoute();
    const email = ref("");
    const password = ref("");
    const login = function() {
      axios.post("http://localhost:3000/users/login", { email: email.value, password: password.value })
        .then((res) => {
          const token = res.data.token;
          const userId = res.data.userId;
          localStorage.setItem('userId', userId);
          localStorage.setItem('userToken', token);
          router.push("Profil");
          })
        .catch(() => {localStorage.removeItem('userId');
                      localStorage.removeItem('userToken')})
    };
    return {
      email,
      login,
      password,
    };
  },
};
</script>

<style scoped lang="scss">
.vh {
  height: calc(100vh - 111px);
}

</style>
