<template>
  <div v-if="userProfil.id != null" class="bg-white round d-flex pt-3 flex-column p-3 shadow">
      <div class="d-flex flex-column">
          <div class="d-flex">
              <div class="d-flex position-relative me-3">
          <div class="photo round">
            <img v-if="userProfil.Ppicture" class=" shadow" :src="userProfil.Ppicture"/>
            <img v-else class="" src="@/assets/defaultProfilPicture.jpeg"/>
            <BIconTrash @click="deletePhoto()" class="fs-2 pointer trash position-absolute"/>
            <BIconPencilSquare class="fs-2 change position-absolute"/>
          </div>
          
        </div>
        
        <ul class="list-group-flush p-0 mb-0 w-100">
          <li v-if="userProfil.admin == true" :class="list">
            <div class="me-auto red fw-bold">ADMINISTRATEUR</div>
          </li>
          <li :class="list">
            <div class="d-flex justify-content-start align-items-center w-100">
              Nom : <div v-if="modifyToggle == false" class="ms-1">{{ userProfil.surname }}</div> <input v-if="modifyToggle == true"  type="text" name="" v-model="userProfil.surname">
            </div>
          </li>
          <li :class="list">
            <div class="d-flex justify-content-start align-items-center w-100">
              Prénom : <div v-if="modifyToggle == false" class="ms-1">{{ userProfil.name }}</div> <input v-if="modifyToggle == true"  type="text" name="" v-model="userProfil.name">
            </div>
          </li>
          <li :class="list">
            <div class="d-flex justify-content-start align-items-center w-100">
              Service : <div v-if="modifyToggle == false" class="ms-1">{{ userProfil.service }}</div>
                <select v-if="modifyToggle == true" class="form-select w" v-model="userProfil.service" aria-label="Default select example">
                    <option selected>{{ userProfil.service }}</option>
                    <option value="Administration">Administration</option>
                    <option value="Commercial">Commercial</option>
                    <option value="Restauration">Restauration</option>
                    <option value="Marketing">Marketing</option>
                    <option value="Ressources Humaines">Ressources Humaines</option>
                    <option value="Logistique">Logistique</option>
                </select>
            </div>
          </li>
          <li :class="list">
            <div  class="d-flex justify-content-start align-items-center w-100">
              Adresse Mail : <div v-if="modifyToggle == false" class="ms-1">{{ userProfil.email }}</div> <input v-if="modifyToggle == true"  type="text" name=""  v-model="userProfil.email">
            </div>
          </li>
          <li :class="list">
            <div class="ms-auto">Compte créé le : {{ userProfil.creation }}</div>
          </li>
        </ul>
          </div>
        
        <div v-if="userProfil.id == user || $store.state.user.admin == true" class="d-flex justify-content-end align-items-center py-3">
            <button v-if="modifyToggle == false" @click="modifyProfil()" class="btn btng me-3 w-100">Modifier le profil</button>
            <button v-if="modifyToggle == true" @click="saveNewProfil()" class="btn btng me-3 w-100 text-nowrap">Enregistrer les modifications</button>
            <input @change="addPhoto()" type="file" ref="Ppicture" id="modifyPhoto" class="inputfile"/>
            <button @click="modifyPhoto()" v-if="userProfil.id == user || $store.state.user.admin == true" class="btn btng me-3 w-100" for="modifyPhoto">Modifier la photo</button>
            <button class="btn btng me-3 w-100" role="button" @click="modifyPassword()">Changer le mot de passe</button>
            <button class="btn btng w-100" role="button" @click="deleteAccount()">Supprimer le compte</button>
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
          <button @click="saveNewPassword" type="button" class="btn btng">Changer le mot de passe</button>
        </form>
        <div v-if="deleteToggle" class="mt-5 d-flex flex-column">
          <p class="fs-4">La suppression du compte est définitive et irréversible.</p>
          <button type="button" @click="deleteAccount()" class="btn btng mb-3">Annuler</button>
          <button type="button" @click="deletingAccount()" class="btn btngw mb-3">J'ai bien compris, je souhaite supprimer mon compte</button>
        </div>
            
      </div>
  </div>
  <div v-if="userProfil.id == null" class="fs-1 mt-5">Utilisateur inexistant</div>
</template>

<script>
import { ref } from '@vue/reactivity';
const axios = require("axios").default;
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
        userProfil: ref({}),
        modifyToggle: false,
        passwordToggle: false,
        deleteToggle: false,
        newPassword: '',
        newPasswordVerif: '',
        password: {},
      };
    },
    methods:{
        getUserInfo(){
            axios.get("http://localhost:3000/users/" + this.userProfilId, { headers: { Authorization: 'bearer ' + this.token}})
            .then((res) => {
                this.userProfil = { admin: res.data.admin, id: res.data.id, surname: res.data.surname,
                name: res.data.name, service: res.data.service, email: res.data.email,
                Ppicture: res.data.Ppicture, creation: res.data.createdAt.slice(0,10),
                };
                console.log(this.userProfil)
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
            if(this.userProfilId != this.user && this.$store.state.user.admin == true){
              axios.put('http://localhost:3000/users/' + this.userProfil.id, {email: this.userProfil.email, surname: this.userProfil.surname, name: this.userProfil.name, service: this.userProfil.service, Ppicture: this.userProfil.photo, password: this.userProfil.password}, { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
              .then(this.getUserInfo())
              .catch((error) =>{console.log(error)})
              this.modifyToggle = !this.modifyToggle}
            else{
              this.$store.dispatch('modifyProfil', this.userProfil)
              .then(this.getUserInfo())
              .catch(function (error){console.log(error)})
              this.modifyToggle = !this.modifyToggle}
        },
        saveNewPassword(){
          if(schema.validate(this.newPassword) && this.newPassword == this.newPasswordVerif){
            this.userProfil.password = this.newPassword;
            this.$store.dispatch('modifyProfil', this.userProfil)
            .then()
            .catch(function (error){console.log(error)})
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
          axios.put("http://localhost:3000/users/" + this.userProfil.id + "/photo", formData, { headers: {  Authorization: 'bearer ' + localStorage.getItem('token') }})
          .then(() => {
            this.$store.dispatch('getUser', {
            id: localStorage.getItem('userId'),
            token: localStorage.getItem('token')})
            .then(() => { this.getUserInfo() })
            .catch()
          })
          .catch((json) => console.log(json));
        },
        deletePhoto(){
          axios.delete("http://localhost:3000/users/" + this.userProfil.id + "/photo", { headers: {  Authorization: 'bearer ' + localStorage.getItem('token') }})
          .then(() => {
            this.$store.dispatch('getUser', {
            id: localStorage.getItem('userId'),
            token: localStorage.getItem('token')})
            .then(() => { this.getUserInfo() })
            .catch()
          })
          .catch((json) => console.log(json));
        },
        deletingAccount(){
          axios.delete("http://localhost:3000/users/" + this.userProfil.id,{ headers: {  Authorization: 'bearer ' + localStorage.getItem('token') }})
          .then(() => {
            localStorage.removeItem("userId");
            localStorage.removeItem("userToken");
            if(this.$store.state.user.admin == true){
              this.$router.push("/administration");
            }
            else{
              this.$router.push("/connexion");
            }
            //supprimer dans le state
          })
          .catch((json) => console.log(json));
        }
    },
    beforeMount(){this.getUserInfo()},
    beforeUpdated(){this.getUserInfo()}
  //   created() {
  //   this.$watch(
  //     () => this.$route.params,
  //     () => {this.getUserInfo();console.log(this.userProfil.admin)}
  //   )
  // },
    
}
</script>

<style lang="scss" scoped>
.button{
    border: none;
    background: none;
}
.photo{
  width: 300px;
  height: 300px;
  border: 2px rgb(233, 68, 38) solid;
}
.photo:hover > .trash{
  visibility: visible;
}
img{
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  border-radius: .6rem;
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
.w{
    width: 200px;
}
.btn{
  height: 50px;
}
.inputfile{
  display: none;
}

.btngw{
  background-color: none;
  border-radius: .6rem;
  border: 1px solid rgb(233, 68, 38);
  color: rgb(233, 68, 38);
}
</style>