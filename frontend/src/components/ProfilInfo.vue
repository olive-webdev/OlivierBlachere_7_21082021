<template>
      <div class="col-9">
        <div class="bg-white rounded-g d-flex pt-3 flex-column p-3 shadow">
          <div class="d-flex">
            <div class="d-flex flex-column">
              <img
                class="rounded-g-top borderG border-bottom-0"
                src="@/assets/defaultProfilPicture.jpeg"
                alt=""
                width="200"
                height="200"
              />
              <input type="file" id="modifyPhoto" class="inputfile" />
              <label class="rounded-g-bottom btn-gp btn-g-warning py-1" for="modifyPhoto">Modifier la photo</label>
            </div>

            <ul class="list-group-flush p-0 mb-0 w-100">
              <li v-if="utilisateur.admin" :class="list">
                <div class="me-auto red">ADMINISTRATEUR</div>
              </li>
                <li :class="list">
                <div  v-if="modifierNomKey == true"
                class="me-auto w-100 d-flex align-items-center">
                Nom:<input v-model="nouveauNom" type="text" name="" id="" class="ms-2 w-100" placeholder="">
                <BIconCheckSquare class="red fs-2 ms-3" @click="validMofifierNom()"/>
                </div>
                <div v-else class="d-flex justify-content-between w-100">
                  Nom : {{ utilisateur.nom }}
                  <BIconPencilFill class="red" @click="modifyNom()" />
                </div>
              </li>
                <li :class="list">
                <div  v-if="modifierPrenomKey == true"
                class="me-auto w-100 d-flex align-items-center">
                Prénom:<input v-model="nouveauPrenom" type="text" name="" id="" class="ms-2 w-100" placeholder="">
                <BIconCheckSquare class="red fs-2 ms-3" @click="validMofifierPrenom()"/>
                </div>
                <div v-else class="d-flex justify-content-between w-100">
                  Prénom : {{ utilisateur.prenom }}
                  <BIconPencilFill class="red" @click="modifyPrenom()" />
                </div>
              </li>
              <li :class="list">
                <div  v-if="modifierServiceKey == true"
                class="me-auto w-100 d-flex align-items-center">
                Service:<input v-model="nouveauService" type="text" name="" id="" class="ms-2 w-100" placeholder="">
                <BIconCheckSquare class="red fs-2 ms-3" @click="validMofifierService()"/>
                </div>
                <div v-else class="d-flex justify-content-between w-100">
                  Service : {{ utilisateur.service }}
                  <BIconPencilFill class="red" @click="modifyService()" />
                </div>
              </li>
                <li :class="list">
                <div  v-if="modifierEmailKey == true"
                class="me-auto w-100 d-flex align-items-center">
                Adresse Mail:<input v-model="nouveauEmail" type="text" name="" id="" class="ms-2 w-100" placeholder="">
                <BIconCheckSquare class="red fs-2 ms-3" @click="validMofifierEmail()"/>
                </div>
                <div v-else class="d-flex justify-content-between w-100">
                  Adresse Mail : {{ utilisateur.email }}
                  <BIconPencilFill class="red" @click="modifyEmail()" />
                </div>
              </li>
              <li :class="list">
                <div class="ms-auto">
                  Compte créé le : {{ utilisateur.creation }}
                </div>
              </li>
              <li
                class="list-group-item d-flex justify-content-end align-items-center py-3">
                <div class="btn-gp btn-g-warning me-3 " data-bs-toggle="modal" data-bs-target="#passwordChange">Changer le mot de passe</div>
                
                <div class="modal fade" id="passwordChange" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                  <div class="modal-dialog">
                    <div class="modal-content">
                      <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">Changement du mot de passe</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                      </div>
                      <div class="modal-body">
                        ...
                      </div>
                      <div class="modal-footer">
                        <button type="button" class="btn-gp btn-g-danger" data-bs-dismiss="modal">Annuler</button>
                        <button type="button" class="btn-gp btn-g-danger">Enregistrer</button>
                      </div>
                    </div>
                  </div>
                </div>

                <div class="btn-gp btn-g-danger">Supprimer le compte</div>
              </li>
            </ul>
          </div>
        </div>
      </div>
</template>

<script>

import { ref } from "@vue/reactivity";

const axios = require("axios").default;

export default {
  name: "ProfilInfo",

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

<style>

</style>