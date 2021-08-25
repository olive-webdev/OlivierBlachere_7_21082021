<template>
  <div class="container">
    <div class="home bg-light row h">
      <div class="bg-light col-3">
        <Menu />
      </div>
      <div class="col-9">
        <div class="bg-white rounded-g d-flex pt-3 flex-column p-3 mb-3 shadow">
          <div class="d-flex">
            <img
              class="rounded-g borderG h-100"
              src="https://i.pravatar.cc/300"
              alt=""
            />
            <ul class="list-group-flush p-0 mb-0 w-100">
              <li
                class="
                  list-group-item
                  d-flex
                  justify-content-between
                  align-items-center
                  py-3
                "
              >
                <div class="me-auto">Nom :  {{ utilisateur.nom }}</div>
                <i class="bi bi-pencil-fill red"></i>
              </li>
              <li
                class="
                  list-group-item
                  d-flex
                  justify-content-between
                  align-items-center
                  py-3
                "
              >
                <div class="">Prénom : {{ utilisateur.prenom }}</div>
                <i class="bi bi-pencil-fill red"></i>
              </li>
              <li
                class="
                  list-group-item
                  d-flex
                  justify-content-between
                  align-items-center
                  py-3
                "
              >
                <div class="me-auto">Service : {{ utilisateur.service }}</div>
                <i class="bi bi-pencil-fill red"></i>
              </li>
              <li
                class="
                  list-group-item
                  d-flex
                  justify-content-between
                  align-items-center
                  py-3
                "
              >
                <div class="me-auto">
                  Adresse Mail : {{ utilisateur.email }}
                </div>
                <i class="bi bi-pencil-fill red"></i>
              </li>
              <li
                class="
                  list-group-item
                  d-flex
                  justify-content-between
                  align-items-center
                  py-3
                "
              >
                <div class="me-auto">Photo de profil : {{ utilisateur.Ppicture }}</div>
                <i class="bi bi-pencil-fill red"></i>
              </li>
              <li
                class="
                  list-group-item
                  d-flex
                  justify-content-between
                  align-items-center
                  py-3
                "
              >
                <div class="me-auto">Compte créé le : {{ utilisateur.creation }}</div>
                <i class="bi bi-pencil-fill red"></i>
              </li>
              <li
                class="
                  list-group-item
                  d-flex
                  justify-content-end
                  align-items-center
                  py-3
                "
              >
                <div class="btn-gp btn-g-warning me-3">
                  Changer le mot de passe
                </div>
                <div class="btn-gp btn-g-danger">Supprimer le compte</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Menu.vue";
import { ref } from '@vue/reactivity';
const axios = require('axios').default;
export default {
  name: "Profil",
  components: {
    Menu,
  },
  setup() {
    let utilisateur = ref({});
    const getUserProfil = () => {
      const token = localStorage.getItem('userToken');
      const user = localStorage.getItem('userId');     
      axios.get("http://localhost:3000/users/"+user , {headers: {Authorization: token}})
        .then((res) => {utilisateur.value = {admin: res.data.admin, id: res.data.id, nom: res.data.surname, prenom: res.data.name,
         service: res.data.service, email: res.data.email, photo: res.data.Ppicture, creation: res.data.createdAt}})
      
        .catch((json) => console.log(json));
    };
    return {getUserProfil, utilisateur};
  },
  beforeMount(){
    this.getUserProfil()
  },

};
</script>

<style lang="scss">
.h {
  height: calc(100vh - 86px);
}
</style>
