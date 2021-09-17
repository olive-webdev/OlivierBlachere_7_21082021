<template>
  <div v-if="userProfil.id != null" class="bg-white d-flex pt-3 flex-column p-3 border rounded">
    <div class="d-flex flex-column">
      <div class="d-flex flex-column flex-lg-row align-items-center">
        <div class="d-flex position-relative me-lg-3">
          <div class="photo border border-primary rounded">
            <img alt="photo de profil" v-if="userProfil.Ppicture"  :src="userProfil.Ppicture"/>
            <img alt="photo de profil par défaut" v-else class="" src="@/assets/defaultProfilPicture.jpeg"/>
            <BIconTrash v-if="$store.state.user.admin == true || $store.state.user.userId == userProfil.id"
             @click="deletePhoto()" class="fs-2 pointer trash position-absolute"/>
            <BIconPencilSquare class="fs-2 change position-absolute"/>
          </div>
        </div>
        <ul class="list-group-flush p-0 mb-0 w-100">
          <li v-if="userProfil.admin == true" :class="list">
            <div class="me-auto red fw-bold">ADMINISTRATEUR</div>
          </li>
          <li :class="list">
            <div class="d-flex justify-content-start align-items-center w-100">
              <div class="flex-shrink-0 me-2">Nom :</div> <div v-if="modifyToggle == false" class="ms-1">{{ userProfil.surname }}</div>
              <input v-if="modifyToggle == true" type="text" class="form-control" name="nom" v-model="userProfil.surname">
            </div>
          </li>
          <li :class="list">
            <div class="d-flex justify-content-start align-items-center w-100">
              <div class="flex-shrink-0 me-2">Prénom :</div> <div v-if="modifyToggle == false" class="ms-1">{{ userProfil.name }}</div>
              <input v-if="modifyToggle == true" type="text" class="form-control" name="prénom" v-model="userProfil.name">
            </div>
          </li>
          <li :class="list">
            <div class="d-flex justify-content-start align-items-center w-100">
              <div class="flex-shrink-0 me-2">Service :</div><div v-if="modifyToggle == false" class="ms-1">{{ userProfil.service }}</div>
                <select v-if="modifyToggle == true" class="form-select" v-model="userProfil.service" aria-label="Default select example">
                    <option selected>{{ userProfil.service }}</option>
                    <option class="bg-primary" value="Administration">Administration</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Restauration">Restauration</option>
                    <option value="Informatique">Informatique</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Ressources Humaines">Ressources Humaines</option>
                    <option value="Logistique">Logistique</option>
                </select>
            </div>
          </li>
          <li :class="list">
            <div  class="d-flex justify-content-start align-items-center w-100">
              <div class="flex-shrink-0 me-2">Adresse Mail :</div> <div v-if="modifyToggle == false" class="ms-1">{{ userProfil.email }}</div>
              <input v-if="modifyToggle == true"  type="text" class="form-control" name="email"  v-model="userProfil.email">
            </div>
          </li>
          <li :class="list">
            <div class="ms-auto">Compte créé le : {{ userProfil.creation }}</div>
          </li>
        </ul>
      </div>
      <div v-if="userProfil.id == user || $store.state.user.admin == true" class="d-flex flex-column flex-lg-row justify-content-end align-items-center py-3">
        <button v-if="modifyToggle == false" @click="modifyProfil()" class="btn btn-secondary border border-primary w-100 my-2 me-lg-2">Modifier le profil</button>
        <button v-if="modifyToggle == true" @click="saveNewProfil()" class="btn btn-secondary border border-primary w-100 text-nowrap my-2 me-lg-2">Enregistrer les modifications</button>
        <input @change="addPhoto()" type="file" ref="Ppicture" id="modifyPhoto" class="inputfile"/>
        <button @click="modifyPhoto()" v-if="userProfil.id == user || $store.state.user.admin == true" class="btn btn-secondary border border-primary w-100 my-2 me-lg-2" for="modifyPhoto">Modifier la photo</button>
        <button class="btn btn-secondary border border-primary w-100 my-2 me-lg-2" role="button" @click="modifyPassword()">Changer le mot de passe</button>
        <button class="btn btn-secondary border border-primary w-100 my-2" role="button" @click="deleteAccount()">Supprimer le compte</button>
      </div >
      <form v-if="passwordToggle == true" class="mt-4 w-50 align-self-center">
        <div class="my-3">
          <label for="Password" class="form-label">Entrer votre nouveau mot de passe</label>
          <input v-model="newPassword" type="password" class="form-control" id="Password">
        </div>
        <div class="mb-3">
          <label for="PasswordVerif" class="form-label">Confirmer votre nouveau mot de passe</label>
          <input v-model="newPasswordVerif" type="password" class="form-control" id="PasswordVerif">
        </div>
        <p v-if="password.invalid" class="text-danger">Le mot de passe est invalide, il doit contenir au moins 8 caractères, des chiffres, des majuscules et minuscules.</p>
        <p v-if="password.nonEqual" class="text-danger">Les mots de passe ne correspondent pas. Vérifier votre saisie.</p>
        <button @click="saveNewPassword" type="button" class="btn btn-secondary border border-primary">Changer le mot de passe</button>
      </form>
      <div v-if="deleteToggle" class="mt-5 d-flex flex-column">
        <p class="fs-4">La suppression du compte est définitive et irréversible.</p>
        <button type="button" @click="deleteAccount()" class="btn btn-secondary border border-primary mb-3">Annuler</button>
        <button type="button" @click="deletingAccount()" class="btn btn-light border border-primary mb-3">J'ai bien compris, je souhaite supprimer mon compte</button>
      </div>   
    </div>
    <div v-if="userMessage" class="userMessage justify-content-center align-items-center">
      <div class="fs-4 px-3 py-3 border border-primary rounded bg-light position-relative size text-wrap">
        {{userMessageText}}
        <button @click="userMessage = !userMessage" type="button" class="btn-close fs-6 position-absolute close" aria-label="Close"></button>
      </div>
    </div>
  </div>
  <div v-if="userProfil.id == null" class="fs-1 mt-5 text-center">Utilisateur inexistant</div>
</template>

<script>
// import { ref } from '@vue/reactivity';
const axios = require("axios").default;
const instance = axios.create({baseURL: process.env.VUE_APP_SERVER})
var passwordValidator = require('password-validator');
var schema = new passwordValidator();
schema
.is().min(8).is().max(20).has().uppercase().has().lowercase().has().digits(1).has().not().spaces()


export default {
  data() {
    return {
      list: "list-group-item d-flex justify-content-between align-items-center py-3",
      user: localStorage.getItem('userId'),
      token: localStorage.getItem('token'),
      userProfilId : this.$route.params.id,
      userProfil: {},
      modifyToggle: false,
      passwordToggle: false,
      deleteToggle: false,
      newPassword: '',
      newPasswordVerif: '',
      password: {},
      userMessage: false,
      userMessageText : ''
    };
  },
  methods:{
    getUserInfo(){
        instance.get("/users/" + this.userProfilId, { headers: { Authorization: 'bearer ' + this.token}})
        .then((res) => {
            this.userProfil = { admin: res.data.admin, id: res.data.id, surname: res.data.surname,
            name: res.data.name, service: res.data.service, email: res.data.email,
            Ppicture: res.data.Ppicture, creation: res.data.createdAt.slice(0,10),
            };
        })
        .catch((json) => console.log(json));
    },
    modifyProfil(){
        this.modifyToggle = !this.modifyToggle
    },
    modifyPassword(){
      this.passwordToggle = !this.passwordToggle
    },
    deleteAccount(){
      this.deleteToggle = !this.deleteToggle
    },
    saveNewProfil(){
       let message = "✅ Profil modifié avec succès"
      if(this.userProfilId != this.user && this.$store.state.user.admin == true){
        instance.put('/users/' + this.userProfil.id, {email: this.userProfil.email, surname: this.userProfil.surname, name: this.userProfil.name, service: this.userProfil.service, Ppicture: this.userProfil.photo, password: this.userProfil.password}, { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
        .then(() => this.getUserInfo())
        .catch((error) =>{console.log(error)})
        this.modifyToggle = !this.modifyToggle;
        this.modal()}
      else{
        this.$store.dispatch('modifyProfil', this.userProfil)
        .then(() => this.getUserInfo())
        .catch(function (error){console.log(error)})
        this.modifyToggle = !this.modifyToggle;
        this.modal(message)}
    },
    saveNewPassword(){
      if((schema.validate(this.newPassword) && this.newPassword == this.newPasswordVerif) && (this.userProfilId == this.user || this.$store.state.user.admin == true)){
        instance.put('/users/' + this.userProfil.id, {password: this.newPassword}, { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
        .then(() => {
          this.getUserInfo();
          let message = "✅ Mot de passe changé avec succès"
          this.modal(message)})
        .catch((error) =>{console.log(error)})
        this.passwordToggle = false
      }
      else if(schema.validate(this.newPassword) && this.newPassword != this.newPasswordVerif){
        this.password.nonEqual = true
      }
      else if(!schema.validate(this.newPassword)){
        this.password.invalid = true
      }
    },
    modifyPhoto(){
      let fileEl = document.getElementById("modifyPhoto");
      fileEl.click()
    },
    addPhoto(){
      this.userProfil.Ppicture = this.$refs.Ppicture.files[0];
      let formData = new FormData();
      formData.append('image', this.userProfil.Ppicture)
      instance.put("/users/" + this.userProfil.id + "/photo", formData, { headers: {  Authorization: 'bearer ' + localStorage.getItem('token') }})
      .then(() => {
        this.$store.dispatch('getUser', {
        id: localStorage.getItem('userId'),
        token: localStorage.getItem('token')})
        .then(() => {
          this.getUserInfo();
          let message = "✅ Photo de profil modifiée avec succès"
          this.modal(message)})
        .catch()
      })
      .catch((json) => console.log(json));
    },
    deletePhoto(){
      if(this.userProfil.Ppicture){
        instance.delete("/users/" + this.userProfil.id + "/photo", { headers: {  Authorization: 'bearer ' + localStorage.getItem('token') }})
        .then(() => {
          this.$store.dispatch('getUser', {id: localStorage.getItem('userId'),token: localStorage.getItem('token')})
          .then(() => { this.getUserInfo(); let message = "✅ Photo de profil supprimée avec succès"; this.modal(message) })
          .catch((error) => console.log(error))
        })
        .catch((json) => console.log(json));
      }
      else{
        let message = "❌ il n'y a pas de photo à supprimer"
        this.modal(message)
      }
      
    },
    deletingAccount(){
      instance.delete("/users/" + this.userProfil.id,{ headers: {  Authorization: 'bearer ' + localStorage.getItem('token') }})
      .then(() => {
        if(this.$store.state.user.admin == true){
          this.$router.push("/administration");
        }
        else{
        this.$store.state.user.userId = -1;
        localStorage.removeItem("userId");
        localStorage.removeItem("token");
        this.$router.push("/connexion");
        }
      })
      .catch((json) => console.log(json));
    },
    modal(message){
      this.userMessage = true;
      this.userMessageText = message
    }
  },
  beforeMount(){this.getUserInfo()},
}
</script>

<style lang="scss" scoped>
.button{
    border: none;
    background: none;
}
.photo{
  min-width: 270px;
  min-height: 270px;
}
.photo:hover > .trash{
  visibility: visible;
}
img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: .3rem;
}
.trash, .change{
    top: 1rem;
    visibility: hidden;
    z-index: 10;
}
.trash{
    right:1rem;
}
.change{
    left:1rem;
}
li{
    height: 4rem;;
}
.btn{
  height: 60px;
}
.inputfile{
  display: none;
}
.dropdown-item.active {
    background-color: red;
}
select option[selected]{
    background-color: rgb(235, 204, 204)
}
.userMessage{
  display: flex;
  position: fixed;
  z-index: 10000;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}
.close{
  top:.2rem;
  right:.2rem;
}
.size{
  max-width: 300px;
}
</style>