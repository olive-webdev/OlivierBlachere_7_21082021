<template>
  <div class="container">
      <div class="row h">
        <div class="bg-light vh d-flex justify-content-center align-items-start">
          <div v-if="toggler" id="login" class="bg-white rounded-g px-5 shadow mt-5">
            <img src="@/assets/icon.svg" alt="" />
            <form @submit.prevent="login">
              <div class="mb-3">
                <label for="exampleInputEmail1" class="form-label red" >Adresse Email</label >
                <input type="email" class="form-control borderG" id="exampleInputEmail1" aria-describedby="emailHelp"
                  placeholder="Entrer votre email..." v-model="email" />
                <div id="emailHelp" class="form-text"></div>
              </div>
              <div class="mb-3">
                <label for="exampleInputPassword1" class="form-label red" >Mot de passe</label>
                <input type="password" class="form-control borderG" id="exampleInputPassword1"
                  v-model="password" placeholder="{{ errorMessage }}" />
              </div>
              <button type="submit" class="btn btn-groupomania borderG my-3" > Se connecter
              </button>
              <p class="mt-3 red pointer" @click="toggle">Pas encore de compte ?</p>
            </form>
          </div>
          <div v-else id="signup" class="bg-white rounded-g px-5 shadow mt-5">
            <img src="@/assets/icon.svg" alt="" />
            <form @submit.prevent="signup">
                <div class="mb-3">
                <label for="surname" class="form-label red" >Nom</label >
                <input type="text" class="form-control borderG" id="surname" aria-describedby="surnameHelp"
                  placeholder="Entrer votre nom..." v-model="surname" />
                <div id="surnameHelp" class="form-text"></div>
              </div>
              <div class="mb-3">
                <label for="name" class="form-label red" >prénom</label >
                <input type="text" class="form-control borderG" id="name" aria-describedby="nameHelp"
                  placeholder="Entrer votre prénom..." v-model="name" />
                <div id="nameHelp" class="form-text"></div>
              </div>
              <div class="mb-3">
                <label for="email" class="form-label red" >Adresse Email</label >
                <input type="email" class="form-control borderG" id="email" aria-describedby="emailHelp"
                  placeholder="Entrer votre email..." v-model="email" />
                <div id="emailHelp" class="form-text"></div>
              </div>
              <div class="mb-3">
                <label for="password" class="form-label red" >Mot de passe</label>
                <input type="password" class="form-control borderG" id="password" aria-describedby="passwordHelp"
                  v-model="password" placeholder="{{ errorMessage }}" />
                <div id="passwordHelp" class="form-text"></div>

              </div>
              <button type="submit" class="btn btn-groupomania borderG my-3 mb-4"> S'inscrire
              </button>
              <p class="mt-3 red pointer" @click="toggle">Déjà inscrit ?</p>
            </form>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
import { ref } from '@vue/reactivity';
import { useRouter } from "vue-router";
import axios from 'axios';

export default {
    name: "Login",
    setup(){
        let toggler = ref(true)
        const toggle = () => {
            toggler.value = !toggler.value;
        }
        const router = useRouter();
        const email = ref("");
        const password = ref("");
        const name  = ref("");
        const surname = ref("");
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
        const signup = function() {
          axios.post("http://localhost:3000/users/signup", { name: name.value, surname: surname.value, email: email.value, password: password.value })
          .then((email, password) => { login(email, password); router.push("Profil"); })
          .catch(() => {localStorage.removeItem('userId');
                        localStorage.removeItem('userToken')})
        };
        return {
            login, signup,
            name, surname,
            email, password,
            toggle, toggler,
        };
}
}
</script>

<style>
.h{
    height: calc(100vh - 90px);
}
.pointer{
    cursor: pointer;
}
</style>