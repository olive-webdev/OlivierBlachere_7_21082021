<template>
  <div>
    <Header />
    <div class="container h d-flex bg-light px-4">
      <Menu />
      <ProfilInfo />
    </div>
  </div>
</template>

<script>
// @ is an alias to /src
import Menu from "@/components/Menu.vue";
import Header from "@/components/Header.vue";
import ProfilInfo from "@/components/ProfilInfo.vue"

import { ref } from "@vue/reactivity";

const axios = require("axios").default;

export default {
  name: "Profil",
  components: {
    Menu,
    Header,
    ProfilInfo
  },
  data: function() {
    return {
      list:
        "list-group-item d-flex justify-content-between align-items-center py-3",
    };
  },
  setup() {
    let utilisateur = ref({});
    let modifierNomKey = ref(Boolean);
    let modifierPrenomKey = ref(Boolean);
    let modifierServiceKey = ref(Boolean);
    let modifierEmailKey = ref(Boolean);
    let nouveauNom = ref("");
    let nouveauPrenom = ref("");
    let nouveauService = ref("");
    let nouveauEmail = ref("");
    const getUserProfil = () => {
      const token = localStorage.getItem("userToken");
      const user = localStorage.getItem("userId");
      axios.get("http://localhost:3000/users/" + user, {headers: { Authorization: 'bearer ' + token }})
           .then((res) => {utilisateur.value = {admin: res.data.admin,id: res.data.id,
            nom: res.data.surname,prenom: res.data.name,service: res.data.service,
            email: res.data.email,photo: res.data.Ppicture,creation: res.data.createdAt,};})
           .catch((json) => console.log(json));
    };
    const modifyNom = () =>{
      modifierNomKey.value = true;
    }
    const modifyPrenom = () =>{
      modifierPrenomKey.value = true;
    }
    const modifyService = () =>{
      modifierServiceKey.value = true;
    }
    const modifyEmail = () =>{
      modifierEmailKey.value = true;
    }
    const validMofifierNom= () =>{
      const token = localStorage.getItem("userToken");
      const user = localStorage.getItem("userId");
      axios.put("http://localhost:3000/users/" + user, {surname: nouveauNom.value}, {headers: { Authorization: 'bearer ' + token }})
           .then(() => {console.log('modification du nom enregistrée');
                 modifierNomKey.value = false;
                getUserProfil();
            })
           .catch((json) => console.log(json))
    }
    const validMofifierPrenom= () =>{
      const token = localStorage.getItem("userToken");
      const user = localStorage.getItem("userId");
      console.log(nouveauPrenom.value)
      axios.put("http://localhost:3000/users/" + user, {name: nouveauPrenom.value}, {headers: { Authorization: 'bearer ' + token }})
           .then(() => {console.log('modification enregistrée');
                 modifierPrenomKey.value = false;
                  getUserProfil();
            })
           .catch((json) => console.log(json));
    }
    const validMofifierService= () =>{
      const token = localStorage.getItem("userToken");
      const user = localStorage.getItem("userId");
      axios.put("http://localhost:3000/users/" + user, {service: nouveauService.value}, {headers: { Authorization: 'bearer ' + token }})
           .then(() => {console.log('modification enregistrée');
                  modifierServiceKey.value = false;
                  console.log("service modifié")
                  getUserProfil();
            })
           .catch((json) => console.log(json));
    }
    const validMofifierEmail= () =>{
      const token = localStorage.getItem("userToken");
      const user = localStorage.getItem("userId");
      axios.put("http://localhost:3000/users/" + user, {email: nouveauEmail.value}, {headers: { Authorization: 'bearer ' + token }})
           .then(() => {console.log('modification enregistrée');
                 modifierEmailKey.value = false;
                  getUserProfil();
            })
           .catch((json) => console.log(json));
    }
    return { getUserProfil, utilisateur, modifyNom, modifyPrenom, modifyService, modifyEmail, modifierNomKey, modifierPrenomKey, modifierServiceKey, modifierEmailKey, validMofifierNom, validMofifierPrenom, validMofifierService, validMofifierEmail, nouveauNom, nouveauPrenom, nouveauService, nouveauEmail };
  },
  beforeMount() {
    this.getUserProfil();
  },
};
</script>

<style lang="scss">
.h {
  height: calc(100vh - 90px);
}
.inputfile {
	opacity: 0;
	position: absolute;
	z-index: -1;
}

.inputfile:hover + label,
.inputfile + label:hover {
    color: rgb(233, 68, 38);
}
.rounded-g-top {
  border-radius                        : 0.75rem 0.75rem 0 0;
}
.rounded-g-bottom {
  border-radius                        : 0 0 0.75rem 0.75rem;
}
</style>
