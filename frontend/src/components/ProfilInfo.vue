<template>
  <div class="col-9">

    <div class="bg-white rounded-g d-flex pt-3 flex-column p-3 shadow">
      <div class="d-flex">
        <div class="d-flex flex-column position-relative">
          <div class="photo rounded-g-top borderG border-bottom-0">
            <img v-if="$store.state.photo" class="" :src="$store.state.photo"/>
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
            <div v-if="modifierKey.nom == true" class="me-auto w-100 d-flex align-items-center">
              Nom:<input v-model="modified.nom" type="text" name="" id="" class="ms-2 w-100" placeholder="">
              <BIconCheckSquare class="red fs-2 ms-3" @click="validMofifierNom()" />
            </div>
            <div v-else class="d-flex justify-content-between w-100">
              Nom : {{ $store.state.nom }}
              <BIconPencilFill class="red" @click="modifyNom()" />
            </div>
          </li>
          <li :class="list">
            <div v-if="modifierKey.prenom == true" class="me-auto w-100 d-flex align-items-center">
              Prénom:<input v-model="modified.prenom" type="text" name="" id="" class="ms-2 w-100" placeholder="">
              <BIconCheckSquare class="red fs-2 ms-3" @click="validMofifierPrenom()" />
            </div>
            <div v-else class="d-flex justify-content-between w-100">
              Prénom : {{ $store.state.prenom }}
              <BIconPencilFill class="red" @click="modifyPrenom()" />
            </div>
          </li>
          <li :class="list">
            <div v-if="modifierKey.service == true" class="me-auto w-100 d-flex align-items-center">
              Service:<input v-model="modified.service" type="text" name="" id="" class="ms-2 w-100" placeholder="">
              <BIconCheckSquare class="red fs-2 ms-3" @click="validMofifierService()" />
            </div>
            <div v-else class="d-flex justify-content-between w-100">
              Service : {{ $store.state.service }}
              <BIconPencilFill class="red" @click="modifyService()" />
            </div>
          </li>
          <li :class="list">
            <div v-if="modifierKey.email == true" class="me-auto w-100 d-flex align-items-center">
              Adresse Mail:<input v-model="modified.email" type="text" name="" id="" class="ms-2 w-100" placeholder="">
              <BIconCheckSquare class="red fs-2 ms-3" @click="validMofifierEmail()" />
            </div>
            <div v-else class="d-flex justify-content-between w-100">
              Adresse Mail : {{ $store.state.email }}
              <BIconPencilFill class="red" @click="modifyEmail()" />
            </div>
          </li>
          <li :class="list">
            <div class="ms-auto">Compte créé le : {{ $store.state.creation }}</div>
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

            <div @click="deleteAccount" class="btn-gp btn-g-danger">Supprimer le compte</div>
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
        usertest: this.$store.state.usertest,
        modifierKey: {nom: false, prenom: false, service: false, email: false},
        modified: {nom: "", prenom: "", service: "", email: "", Ppicture: "",},
        user: localStorage.getItem("userId"),
        token: localStorage.getItem("userToken"),
        utilisateur: ref({}),
      };
    },
    methods:{
      modifyNom() {
      this.modifierKey.nom = true;
      },
      modifyPrenom(){
        this.modifierKey.prenom = true;
      },
      modifyService(){
        this.modifierKey.service = true;
      },
      modifyEmail(){
        this.modifierKey.email = true;
      },
      validMofifierNom() {
      axios.put("http://localhost:3000/users/" + this.user, {surname: this.modified.nom}, {headers: {Authorization: 'bearer ' + this.token}})
        .then(() => {
          console.log('modification du nom enregistrée');
          this.modifierKey.nom = false;
          this.$store.commit('changeSurname', this.utilisateur.nom);
          this.getUserProfil();
        })
        .catch((json) => console.log(json))
      },
      validMofifierPrenom() {
      axios.put("http://localhost:3000/users/" + this.user, {name: this.modified.prenom}, {headers: {Authorization: 'bearer ' + this.token}})
        .then(() => {
          console.log('modification du nom enregistrée');
          this.modifierKey.prenom = false;
          this.$store.commit('changeName', this.utilisateur.prenom);
          this.getUserProfil();
        })
        .catch((json) => console.log(json))
      },
      validMofifierService() {
        axios.put("http://localhost:3000/users/" + this.user, {service: this.modified.service}, {headers: {Authorization: 'bearer ' + this.token}})
          .then(() => {
            this.modifierKey.service = false;
            console.log("service modifié");
            this.$store.commit('changeService', this.utilisateur.service);
            this.getUserProfil();
          })
          .catch((json) => console.log(json));
      },
      validMofifierEmail() {
        axios.put("http://localhost:3000/users/" + this.user, {email: this.modified.email}, {headers: {Authorization: 'bearer ' + this.token}})
          .then(() => {
            console.log('modification enregistrée');
            this.modifierKey.email = false;
            this.$store.commit('changeEmail', this.utilisateur.email);
            this.getUserProfil();
          })
          .catch((json) => console.log(json));
      },
      modifyPhoto() {
        this.modified.Ppicture = this.$refs.Ppicture.files[0];
        let formData = new FormData();
        formData.append('image', this.modified.Ppicture)
        axios.put("http://localhost:3000/users/" + this.user + "/photo", formData, { headers: {  Authorization: 'bearer ' + this.token }})
          .then(() => {
            this.$store.commit('changePhoto', this.utilisateur.photo);
            this.getUserProfil();
          })
          .catch((json) => console.log(json));
      },
      deletePhoto() {
        axios.delete("http://localhost:3000/users/" + this.user + "/photo", { headers: {  Authorization: 'bearer ' + this.token }})
          .then(() => {
            console.log("photo supprimée");
            this.getUserProfil();
          })
          .catch((json) => console.log(json));
      },
      getUserProfil() {
        axios.get("http://localhost:3000/users/" + this.user, { headers: { Authorization: 'bearer ' + this.token}})
        .then((res) => {
          this.utilisateur = { admin: res.data.admin, id: res.data.id, nom: res.data.surname,
            prenom: res.data.name, service: res.data.service, email: res.data.email,
            photo: res.data.Ppicture, creation: res.data.createdAt,
          };
          this.UserInState();
        })
        .catch((json) => console.log(json));
      },
      UserInState(){
        console.log(this.utilisateur);
        // modifier le state
        this.$store.commit('changeAdmin', this.utilisateur.admin);
        this.$store.commit('changeId', this.utilisateur.id);
        this.$store.commit('changeName', this.utilisateur.prenom);
        this.$store.commit('changeSurname', this.utilisateur.nom);
        this.$store.commit('changeService', this.utilisateur.service);
        this.$store.commit('changeEmail', this.utilisateur.email);
        this.$store.commit('changePhoto', this.utilisateur.photo);
        this.$store.commit('changeCreation', this.utilisateur.creation);
        console.log("done !")
      },
      deleteAccount(){
        axios.delete("http://localhost:3000/users/" + this.user,{ headers: {  Authorization: 'bearer ' + this.token }})
          .then(() => {
            localStorage.removeItem("userId");
            localStorage.removeItem("userToken");
            this.$router.push("Connex");
          })
          .catch((json) => console.log(json));
      }
    },
    beforeMount(){
    this.$store.state.isConnected = true;
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