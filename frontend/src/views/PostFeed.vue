<template>
  <div class="container bg-light px-4">
    <Header />
    <div class="row">
      <div class="col-3 mt-3">
        <Menu class="sticky-top" />
      </div>
      <div class="col-9 mt-3">
        <div class="bg-white round d-flex flex-column px-4 py-3 mb-4 shadow mx-2 sticky-top">
          <div class="d-flex input-group position-relative">
            <div class="thumbnailright">
              <img v-if="$store.state.user.Ppicture" class="border-end-0" :src="$store.state.user.Ppicture"/>
              <img v-else src="@/assets/defaultProfilPicture.jpeg" alt="">
            </div>
            <input v-model="text" type="text" class="form-controlled border-start-0 ps-5 w" :placeholder="'Quoi de neuf ' + $store.state.user.name + ' ?'"/>
            <BIconPencilFill class="position-absolute pen fs-4"/>
            <p @click="emojiToggle()" class="position-absolute smiley fs-3 pointer">&#128512; </p>
            <p @click="loadPhoto()" class="position-absolute image fs-3 pointer">&#127748; </p>
            <input @change="addPhoto()" type="file" ref="photoToSend" id="addingPhoto" class="inputfile"/>
            <div @click="send()" type="button" class="btn btng d-flex align-items-center border-start-0">
              Envoyer !<BIconArrowRightSquare class="fs-4 ms-2" /></div>
          </div>
          <div v-if="emoji" id="emoji">
            <ul class="d-flex fs-3 mb-0 mt-2 flex-wrap">
              <li @click="addEmoji(emojiList)" class="mx-1 pointer" v-for="emojiList in emojiLists" :key="emojiList">{{emojiList}}</li>
            </ul>
          </div>
          <div v-if="url" id="photo">
            <div id="preview">
              <p class="ms-2 fs-4 mt-3 mb-0 text-start"> {{ text }}</p>
              <div class="position-relative">
                <img v-if="url" :src="url" class="round mt-3">
                <BIconTrash v-if="url" @click="deletePhoto()" class="fs-1 pointer trash position-absolute"/>
              </div>
            </div>
            <div class="d-flex">
              <button  @click="loadPhoto()" class="btn btng w-100 mt-3 me-4" for="addingPhoto">Modifier la photo</button>
              <button @click="send()" class="btn btng w-100 mt-3" for="addingPhoto">Publier</button>
            </div>
          </div>
        </div>
        
        <ul id="postings">
          <li v-for="posting in postings" :key="posting.image">
            <div class="bg-white round d-flex pt-3 flex-column p-4 mb-4 shadow mx-2">
              <div class="d-flex justify-content-between">
                <div class="thumbnail shadow">
                  <img v-if="posting.User.Ppicture" :src="posting.User.Ppicture" />
                  <img v-else class="round border shadow" src="@/assets/defaultProfilPicture.jpeg"/>
                </div>
                <div class="me-auto ms-3 text-secondary">
                  <h3 class="m-0 text-start">{{posting.User.name}} {{posting.User.surname}}</h3>
                  <p @click="getSince()" class="text-start">publié le {{posting.createdAt.slice(8,10)}} {{posting.createdAt.slice(5,7)}} {{posting.createdAt.slice(0,4)}}</p>
                </div>
                <div class="dropdown">
                  <div class="" type="button" data-bs-toggle="dropdown" aria-expanded="false"><BIconInfoSquare class="fs-4 text-danger"/></div>
                  <ul id="menuPost" class="dropdown-menu" aria-labelledby="menuPost">
                    <li>
                      <div v-if="$store.state.user.userId != posting.User.id && !$store.state.user.admin" class="p-2 ps-3">Signaler</div>
                    </li>
                    <li>
                      <div v-if="$store.state.user.userId == posting.User.id  || $store.state.user.admin" @click="modifyPost(posting)" class="p-2 ps-3 pointer">modifier</div>
                    </li>
                    <li>
                      <div v-if="$store.state.user.userId != posting.User.id" class="p-2 ps-3"><router-link class="" :to="{ name: 'Profil', params: { id: posting.User.id }}">Voir le profil</router-link></div>
                    </li>
                    <li>
                      <div v-if="$store.state.user.userId == posting.User.id  || $store.state.user.admin" @click="deletePost(posting.id, posting.userId)" class="p-2 ps-3 pointer">Supprimer</div>
                    </li>
                  </ul>
                </div>
              </div>
              <hr>
              <div class="">
                <p v-if="!posting.toggle" class="text-start fs-4 mb-0">{{posting.text}}</p>
                <input v-else class="ps-2 w-100 py-2 mb-3 round" type="text" name="modifyPost" id="textModified" :value="posting.text">

                <div v-if="posting.image != null" class="position-relative">
                    <img v-if="modifiedUrl != '' && posting.toggle" class="w-100 round my-3 " :src="modifiedUrl" alt="" />
                    <img v-if="modifiedUrl != '' && !posting.toggle" class="w-100 round my-3 " :src="posting.image" alt="" />
                    <img v-if="modifiedUrl == '' && !posting.imageDeleted && posting.toggle" class="w-100 round my-3" :src="posting.image" alt=""/>
                    <img v-if="modifiedUrl == '' && !posting.imageDeleted && !posting.toggle" class="w-100 round my-3" :src="posting.image" alt=""/>
                    <div v-if="modifiedUrl == '' && !posting.imageDeleted"></div>
                    <BIconTrash v-if="modifiedUrl != '' && posting.toggle && posting.imageDeleted || posting.image && posting.toggle && !posting.imageDeleted" @click="deletePhoto(posting)" class="fs-1 pointer trash position-absolute"/>
                </div>
                <div v-else-if="posting.image">
                  <img class="w-100 round my-3" :src="modifiedUrl" alt="" />
                </div>

                <div v-else class="position-relative">
                  <img v-if="modifiedUrl != '' && posting.toggle" class="w-100 round my-3" :src="modifiedUrl" alt="" />
                  <BIconTrash v-if="modifiedUrl != '' && posting.toggle" @click="deletePhoto(posting)" class="fs-1 pointer trash position-absolute"/>
                </div>

                <div class="d-flex">
                  <button v-if="posting.toggle && posting.image || posting.toggle && modifiedUrl != ''" @click="modifyPhoto(posting)" class="btn btng w-100 mt-2 me-4" for="modifyPhoto">Changer l'image</button>
                  <button v-if="posting.toggle && !posting.image && modifiedUrl == ''" @click="modifyPhoto(posting)" class="btn btng w-100 mt-2 me-4" for="modifyPhoto">Ajouter une image</button>
                  <button v-if="posting.toggle" @click="modifyProfil(posting)" class="btn btng w-100 mt-2" for="modifyPhoto">Publier</button>
                  <input @change="addModifiedPhoto(posting)" type="file" :id="posting.id" class="inputfile"/>
                </div>
              </div>
              <hr>
              
              <div class="d-flex justify-content-between text-secondary">
                <BIconHandThumbsUp @click="like(posting)" class="fs-3 text-danger mb-3 pointer" />
                <!-- <span @click="getLikes(posting)">getLike</span> -->
                <a class="text-decoration-none text-secondary fs-5" data-bs-toggle="collapse" href="#collapseExample" role="button"
                  aria-expanded="false" aria-controls="collapseExample">x commentaires todo
                </a>
              </div>
              <div class="collapse" id="collapseExample">messages</div>
              <div class="d-flex position-relative">
                <div class="d-flex input-group position-relative">
                  <div class="thumbnailright">
                    <img v-if="$store.state.user.Ppicture" class="border-end-0" :src="$store.state.user.Ppicture" height="50" width="50"/>
                    <img v-else src="@/assets/defaultProfilPicture.jpeg" alt="">
                  </div>
                  <input v-model="textcomment" type="text" class="form-controlled border-start-0 ps-5 w" placeholder="Écrivez un commentaire"/>
                  <BIconPencilFill class="position-absolute pen fs-4"/>
                    <p class="position-absolute smiley fs-3 pointer">&#128512; </p>
                    <div @click="send()" type="button" class="btn btng d-flex align-items-center border-start-0">
                    Envoyer !<BIconArrowRightSquare class="fs-4 ms-2" />
                  </div>
                </div>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>
<script>
import Header from "../components/Header.vue";
import Menu from "../components/Menu.vue";
import { useRouter } from "vue-router";
import { ref } from '@vue/reactivity';
const axios = require("axios").default;
export default {
  name: "PostFeed",
  components: {
    Header,
    Menu,
  },
  data() {
    return {
      router: useRouter(),
      text: '',
      image: '',
      postings: {},
      textcomment: '',
      emoji: false,
      emojiLists: [
        "😀","😁","😂","😃","😄","😅","😆","😇","😈","😉","😊","😋","😌","😍","😎","😏","😐",
        "😑","😒","😓","😔","😕","😖","😗","😘","😙","😚","😛","😜","😝","😞","😟","😠","😡",
        "😢","😣","😤","😥","😦","😧","😨","😩","😪","😫","😬","😭","😮","😯","😰","😱","😲",
        "😳","😴","😵","😶","😷","😸","😹","😺","😻","😼","😽","😾","😿","🙀","🙁","🙂","🙃",
        "🙄","🤐","🤑","🤒","🤓","🤔","🤕","🥰","🥱","🥳","🥴","🥵","🤠","🤡","🤢","🤣","🤤",
        "🤥","🤧","🤨","🤩","🤪","🤫","🤬","🤭","🤮","🤯","👋","👌","👍","👎","👏","👐",],
      // photo: false,
      url: '',
      modifiedUrl: '',
      photoToSend: ref(''),
    }
  },
  methods:{
    send(){
      let formData = new FormData();
      if(this.$refs.photoToSend != null || this.$refs.photoToSend != undefined){
        this.image = this.$refs.photoToSend.files[0];
        formData.append('image', this.image)}
        formData.append('text', this.text)
        formData.append('userId', localStorage.getItem('userId'))
        axios.post('http://localhost:3000/postings/', formData, { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
        .then(()=>{this.text = ''; this.image = null; this.url= ''; this.getAllPost()})
        .catch((error) =>{console.log(error)})
    },
    modifyProfil(posting){
      let formData = new FormData();
      if(document.getElementById(posting.id).files[0] != null || document.getElementById(posting.id).files[0] != undefined){
        console.log("with image")
        this.image = document.getElementById(posting.id).files[0];
        formData.append('image', this.image)
        formData.append('text', document.getElementById("textModified").value)
        formData.append('userId', localStorage.getItem('userId'))
        axios.put('http://localhost:3000/postings/by/' +posting.UserId+ "/" + posting.id , formData, { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
        .then(()=>{this.getAllPost()})
        .catch((error) =>{console.log(error)})}
      else {
        console.log("image delete")
        if(posting.imageDeleted){
          formData.append('text', document.getElementById("textModified").value)
          formData.append('userId', localStorage.getItem('userId'))
          axios.put('http://localhost:3000/postings/by/' +posting.UserId+ "/" + posting.id , formData, { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
          .then(()=>{this.getAllPost();this.emoji = false; this.photo = false;})
          .catch((error) =>{console.log(error)})}
        else{
        console.log("same image")
          formData.append('image', 'noChange')
          formData.append('text', document.getElementById("textModified").value)
          formData.append('userId', localStorage.getItem('userId'))
          axios.put('http://localhost:3000/postings/by/' +posting.UserId+ "/" + posting.id , formData, { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
          .then(()=>{this.getAllPost();this.emoji = false; this.photo = false;})
          .catch((error) =>{console.log(error)})}
      }
    },
    getAllPost(){
      axios.get('http://localhost:3000/postings/', { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
      .then((response)=>{this.postings = response.data; console.log(this.postings)})
      .catch((error) =>{console.log(error)})
    },
    deletePost(id, user){
      axios.delete('http://localhost:3000/postings/by/' + user + "/" + id, { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
      .then(()=>{this.getAllPost()})
      .catch((error) =>{console.log(error)})
    },
    emojiToggle(){
      this.emoji = !this.emoji
    },
    addEmoji(emoji){
      this.text = this.text.concat(' ', emoji); this.emoji = false;
    },
    loadPhoto(){
      let fileEl = document.getElementById("addingPhoto");
      fileEl.click();
      this.emoji = false
    },
    modifyPhoto(posting){
      let fileEl = document.getElementById(posting.id);
      fileEl.click()
    },
    addPhoto(){
      const photoPreview = this.$refs.photoToSend.files[0];
      this.url = URL.createObjectURL(photoPreview);
    },
    addModifiedPhoto(posting){
      let photoToChange = document.getElementById(posting.id).files[0]
      this.modifiedUrl = URL.createObjectURL(photoToChange);
      posting.imageDeleted = false
    },
    deletePhoto(posting){
      this.url = '';
      this.modifiedUrl= '',
      posting.imageDeleted = true
      this.photo = !this.photo;
      console.log(this.modifiedUrl , posting.imageDeleted)
    },
    modifyPost(posting){
      posting.toggle = !posting.toggle
      console.log(posting)
    },
    like(posting){
      console.log("un ptit like")
      axios.post('http://localhost:3000/likes/posting/'+posting.id, {userId :localStorage.getItem('userId')}, { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
      .then(()=>{this.getAllPost()})
      .catch((error) =>{console.log(error)})
    },
    getLikes(posting){
      axios.get('http://localhost:3000/likes/posting/'+posting.id, { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
      .then(()=>{this.getAllPost()})
      .catch((error) =>{console.log(error)})
    }
  },
  beforeMount: function() {
    if (!this.$store.state.user.token && !localStorage.getItem("token")) {
      this.$router.push("/connexion");
      console.log("utilisateur non connecté");
    } else if (!this.$store.state.user.token && localStorage.getItem("token")) {
      this.$store
        .dispatch("getUser", {
          id: localStorage.getItem("userId"),
          token: localStorage.getItem("token"),
        })
        .then(() => {
          console.log(this.$store.state.user);
        })
        .catch();
    } else {
      return;
    }
  },
  mounted() {
    this.getAllPost()
  },
  created(){
    this.getAllPost()
  }
  
};
</script>

<style lang="scss" scoped>
a{
  text-decoration: none;
  color: black;
}

.thumbnail {
  width: 60px;
  height: 60px;
  border: rgb(233, 68, 38) 1px solid;
  border-radius: 0.6rem;
  overflow: hidden;
}
.thumbnailright{
  width: 50px;
  height: 50px;
  border: rgb(233, 68, 38) 1px solid;
  border-right: none;
  border-radius: .6rem 0 0 .6rem;
  overflow: hidden;
}
img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
}
.w {
  width: calc(100% - 50px - 122px);
  border: 1px solid rgb(233, 68, 38);
}
.smiley {
  top: .5rem;
  right: 9.5rem;
}
.image{
  top: .5rem;
  right: 12rem
}
.pen{
  top: .6rem;
  left: 3.6rem
}
ul{
  list-style: none;
  padding: 0;
}
#menuPost li:hover > div{
  background-color: rgb(235, 204, 204);
  border-left: 2px solid rgb(233, 68, 38);
}
ul{
  border-radius: .6rem;
  overflow: hidden;
}
.inputfile{
  display: none;
}
.trash{
  top : 3rem;
  right: 2rem;
}
#emoji li:hover{
  font-size: 3rem
}
</style>
