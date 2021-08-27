<template>
  <div class="col-9">

    <div class="bg-white rounded-g d-flex pt-3 flex-column p-3 shadow">
      <div class="d-flex">
        <div class="d-flex flex-column position-relative">
          <div class="photo rounded-g-top borderG border-bottom-0">
            <img v-if="utilisateur.photo" class="" :src="utilisateur.photo"/>
            <img v-else class="" src="@/assets/defaultProfilPicture.jpeg"/>
            <BIconTrash class="fs-4 red delete position-absolute" @click="deletePhoto"/>
            <!-- <BIconPencilFill class="fs-4 red edit position-absolute"/> -->
          </div>
          <input type="file" ref="Ppicture" id="modifyPhoto" class="inputfile" @change="modifyPhoto" />
          <label class="rounded-g-bottom btn-gp btn-g-warning py-1" for="modifyPhoto">Modifier la photo</label>
        </div>

        <ul class="list-group-flush p-0 mb-0 w-100">
          <li v-if="utilisateur.admin" :class="list">
            <div class="me-auto red fw-bold">ADMINISTRATEUR</div>
          </li>
          <li :class="list">
            <div v-if="modifierNomKey == true" class="me-auto w-100 d-flex align-items-center">
              Nom:<input v-model="nouveauNom" type="text" name="" id="" class="ms-2 w-100" placeholder="">
              <BIconCheckSquare class="red fs-2 ms-3" @click="validMofifierNom()" />
            </div>
            <div v-else class="d-flex justify-content-between w-100">
              Nom : {{ utilisateur.nom }}
              <BIconPencilFill class="red" @click="modifyNom()" />
            </div>
          </li>
          <li :class="list">
            <div v-if="modifierPrenomKey == true" class="me-auto w-100 d-flex align-items-center">
              Prénom:<input v-model="nouveauPrenom" type="text" name="" id="" class="ms-2 w-100" placeholder="">
              <BIconCheckSquare class="red fs-2 ms-3" @click="validMofifierPrenom()" />
            </div>
            <div v-else class="d-flex justify-content-between w-100">
              Prénom : {{ utilisateur.prenom }}
              <BIconPencilFill class="red" @click="modifyPrenom()" />
            </div>
          </li>
          <li :class="list">
            <div v-if="modifierServiceKey == true" class="me-auto w-100 d-flex align-items-center">
              Service:<input v-model="nouveauService" type="text" name="" id="" class="ms-2 w-100" placeholder="">
              <BIconCheckSquare class="red fs-2 ms-3" @click="validMofifierService()" />
            </div>
            <div v-else class="d-flex justify-content-between w-100">
              Service : {{ utilisateur.service }}
              <BIconPencilFill class="red" @click="modifyService()" />
            </div>
          </li>
          <li :class="list">
            <div v-if="modifierEmailKey == true" class="me-auto w-100 d-flex align-items-center">
              Adresse Mail:<input v-model="nouveauEmail" type="text" name="" id="" class="ms-2 w-100" placeholder="">
              <BIconCheckSquare class="red fs-2 ms-3" @click="validMofifierEmail()" />
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
          <li class="list-group-item d-flex justify-content-end align-items-center py-3">
            <div class="btn-gp btn-g-warning me-3 " data-bs-toggle="modal" data-bs-target="#passwordChange">Changer le
              mot de passe</div>

            <div class="modal fade" id="passwordChange" tabindex="-1" aria-labelledby="exampleModalLabel"
              aria-hidden="true">
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title red" id="exampleModalLabel">Changement du mot de passe</h5>
                    <button type="button" class="btn-close red" data-bs-dismiss="modal" aria-label="Close"></button>
                  </div>
                  <div class="modal-body d-flex flex-column align-items-center">
                    <label class="mb-2" for="newPassord">Entrez votre nouveau mot de passe</label>
                    <input type="password" id="newPassword" class="mb-4">
                    <label class="mb-2" for="newPassordConfirm">Confirmez votre nouveau mot de passe</label>
                    <input type="password" id="newPasswordConfirm">
                  </div>
                  <div class="modal-footer">
                    <button type="button" class="btn-gp btn-g-danger" data-bs-dismiss="modal">Annuler</button>
                    <button type="button" class="btn-gp btn-g-danger">Valider</button>
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

    data() {
      return {
        list: "list-group-item d-flex justify-content-between align-items-center py-3",
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
      let Ppicture = ref("");
      const token = localStorage.getItem("userToken");
      const user = localStorage.getItem("userId");
      const getUserProfil = () => {
        axios.get("http://localhost:3000/users/" + user, { headers: { Authorization: 'bearer ' + token}})
          .then((res) => {
            utilisateur.value = { admin: res.data.admin, id: res.data.id, nom: res.data.surname,
              prenom: res.data.name, service: res.data.service, email: res.data.email,
              photo: res.data.Ppicture, creation: res.data.createdAt,
            };
            console.log(res.data.Ppicture)
          })
          .catch((json) => console.log(json));
      };
      const modifyNom = () => {
        modifierNomKey.value = true;
      }
      const modifyPrenom = () => {
        modifierPrenomKey.value = true;
      }
      const modifyService = () => {
        modifierServiceKey.value = true;
      }
      const modifyEmail = () => {
        modifierEmailKey.value = true;
      }
      const validMofifierNom = () => {
        const token = localStorage.getItem("userToken");
        const user = localStorage.getItem("userId");
        axios.put("http://localhost:3000/users/" + user, {surname: nouveauNom.value}, {headers: {Authorization: 'bearer ' + token}})
          .then(() => {
            console.log('modification du nom enregistrée');
            modifierNomKey.value = false;
            getUserProfil();
          })
          .catch((json) => console.log(json))
      }
      const validMofifierPrenom = () => {
        const token = localStorage.getItem("userToken");
        const user = localStorage.getItem("userId");
        console.log(nouveauPrenom.value)
        axios.put("http://localhost:3000/users/" + user, {name: nouveauPrenom.value}, {headers: {Authorization: 'bearer ' + token}})
          .then(() => {
            console.log('modification enregistrée');
            modifierPrenomKey.value = false;
            getUserProfil();
          })
          .catch((json) => console.log(json));
      }
      const validMofifierService = () => {
        const token = localStorage.getItem("userToken");
        const user = localStorage.getItem("userId");
        axios.put("http://localhost:3000/users/" + user, {service: nouveauService.value}, {headers: {Authorization: 'bearer ' + token}})
          .then(() => {
            console.log('modification enregistrée');
            modifierServiceKey.value = false;
            console.log("service modifié")
            getUserProfil();
          })
          .catch((json) => console.log(json));
      }
      const validMofifierEmail = () => {
        const token = localStorage.getItem("userToken");
        const user = localStorage.getItem("userId");
        axios.put("http://localhost:3000/users/" + user, {email: nouveauEmail.value}, {headers: {Authorization: 'bearer ' + token}})
          .then(() => {
            console.log('modification enregistrée');
            modifierEmailKey.value = false;
            getUserProfil();
          })
          .catch((json) => console.log(json));
      }
      const modifyPhoto = function() {
        Ppicture = Ppicture.value.files[0];
        let formData = new FormData();
        formData.append('image', Ppicture)
        console.log(Ppicture);
        axios.put("http://localhost:3000/users/" + user + "/photo", formData, { headers: {  Authorization: 'bearer ' + token }})
          .then(() => {
            console.log("photo ajoutée");
            getUserProfil();
          })
          .catch((json) => console.log(json));
      };
      const deletePhoto = function() {
        axios.delete("http://localhost:3000/users/" + user + "/photo", { headers: {  Authorization: 'bearer ' + token }})
          .then(() => {
            console.log("photo supprimée");
            getUserProfil();
          })
          .catch((json) => console.log(json));
      }
      return {
        getUserProfil,
        utilisateur,
        modifyNom, modifyPrenom, modifyService, modifyEmail,
        modifierNomKey, modifierPrenomKey, modifierServiceKey, modifierEmailKey,
        validMofifierNom, validMofifierPrenom, validMofifierService, validMofifierEmail,
        nouveauNom, nouveauPrenom, nouveauService, nouveauEmail,
        modifyPhoto, Ppicture,
        deletePhoto,
      };
    },
    beforeMount(){
    this.getUserProfil()
  },
  }
</script>

<style lang="scss" scoped>
.photo{
  width: 200px;
  height: 200px;
  padding: .3rem;
}
.photo:hover > .delete, .photo:hover > .edit{
  display: block;
}
img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: .6rem;
}

.delete{
  z-index: 10;
  right : 1rem;
  top : 1rem;
  display: none;
  cursor: pointer;
}
.edit{
  z-index: 10;
  left : 1rem;
  top : 1rem;
  display: none;
}
</style>