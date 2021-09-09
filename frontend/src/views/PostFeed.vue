<template>
  <div class="container bg-light px-4">
    <Header />
    <div class="row">
      <div class="col-3 mt-3">
        <Menu class="sticky-top" />
      </div>
      <div class="col-9 mt-3">
        <div class="bg-white round d-flex flex-column px-4 py-3 mb-4 shadow mx-2">
          <div class="d-flex input-group position-relative">
            <div class="thumbnailright">
              <img v-if="$store.state.user.Ppicture" class="border-end-0" :src="$store.state.user.Ppicture"/>
              <img v-else src="@/assets/defaultProfilPicture.jpeg" alt="">
            </div>
            <input v-model="text" type="text" class="form-controlled border-start-0 ps-5 w" :placeholder="'Quoi de neuf ' + $store.state.user.name + ' ?'"/>
            <BIconPencilFill class="position-absolute pen fs-4"/>
            <p @click="emoji = !emoji" class="position-absolute smiley fs-3 pointer">&#128512; </p>
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
          <li v-for="posting in postings" :key="posting.id" :id='"post"+posting.id'>
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
                <div v-if="posting.Reports.length > 0"><BIconExclamationSquareFill class="text-danger fs-4 me-3"/></div>
                <div class="dropdown">
                  <div type="button" data-bs-toggle="dropdown" aria-expanded="false"><BIconInfoSquare class="fs-4 text-danger"/></div>
                  <ul id="menuPost" class="dropdown-menu" aria-labelledby="menuPost">
                    <li>
                      <div v-if="$store.state.user.userId != posting.User.id && !$store.state.user.admin" class="p-2 ps-3 pointer" @click="report(posting)">Signaler</div>
                    </li>
                    <li>
                      <div v-if="$store.state.user.admin" class="p-2 ps-3 pointer" @click="deleteReport(posting)">Retirer le signalement</div>
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
<!-- AFFICHAGE DU POST MODIFIÉ TEXTE ET IMAGE -->
              <div>
                <p v-if="!posting.toggle" class="text-start fs-4 mb-0">{{posting.text}}</p>
                <input v-else class="ps-2 w-100 py-2 mb-3 round" type="text" name="modifyPost" id="textModified" :value="posting.text">
                  <div v-if="posting.image != null" class="position-relative">
                      <img v-if="modifiedUrl != '' && posting.toggle" class="w-100 round my-3 shadow" :src="modifiedUrl" alt="" />
                      <img v-if="modifiedUrl != '' && !posting.toggle" class="w-100 round my-3 shadow" :src="posting.image" alt="" />
                      <img v-if="modifiedUrl == '' && !posting.imageDeleted && posting.toggle" class="w-100 round my-3 shadow" :src="posting.image" alt=""/>
                      <img v-if="modifiedUrl == '' && !posting.imageDeleted && !posting.toggle" class="w-100 round my-3 shadow" :src="posting.image" alt=""/>
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
<!-- AFFICHAGE DES LIKES -->
              <div class="d-flex justify-content-between align-items-center text-secondary">
                <BIconHandThumbsUp @click="like(posting)" class="fs-3 text-danger pointer" />
                <div class="me-auto ms-2 mt-2 d-flex align-items-center pointer likes position-relative"> {{ posting.Likes.length}}
                  <ul class="border">
                    <li v-for="Like in posting.Likes" :key="Like.id" class="d-flex me-1"> {{ Like.User.name }} {{ Like.User.surname }} <span v-if="posting.Likes.length >1">,</span></li>
                    <li v-if="posting.Likes.length <2 && posting.Likes.length != 0">a liké ce post</li>
                    <li v-if="posting.Likes.length >1">ont liké ce post</li>
                    <li v-if="posting.Likes.length ==0">Personne n'a encore liké ce post</li>
                  </ul>
                </div>
                
                <a class="text-decoration-none text-secondary fs-5" data-bs-toggle="collapse" :href="'#collapse'+posting.id" role="button"
                  aria-expanded="false" :aria-controls="'collapse'+posting.id">{{ posting.Comments.length }} commentaire<span v-if="posting.Comments.length >0">s</span>
                </a>
              </div>
<!-- AFFICHAGE DES MESSAGES -->
              <div class="collapse" :id="'collapse'+posting.id"><hr>
                <!-- BOUCLE POUR LES MESSAGES -->
                <div v-for="comment in posting.Comments.slice().reverse()" :key="comment.createdAt">
                      <div  class="d-flex align-items-start">
                              <img v-if="comment.User.Ppicture == null" class="thumbnailMessage me-2" src="@/assets/defaultProfilPicture.jpeg" alt="">
                              <img v-else :src="comment.User.Ppicture" alt="" class="thumbnailMessage me-2">
                              <div :id="'comment'+comment.id" class="message mb-2 text-start pb-1 pointer">
                                <span class="fw-bold">{{ comment.User.name }} {{ comment.User.surname }} : </span>
                                <span class="text-start"> {{ comment.text }}</span>
                                <!-- AFFICHAGE OPTIONS MESSAGE HOVER -->
                                <div id="message" class="justify-content-end align-items-center border-top">
                                  <BIconHandThumbsUp /><span class="me-auto"></span>
                                  <span class="ms-3 me-2">signaler</span>
                                  <span @click="answerComment(comment, posting)" class="me-2">répondre</span>
                                  <span v-if="$store.state.user.userId == comment.User.id || $store.state.user.admin" @click="deleteComment(comment)">supprimer</span>
                                </div>
                              </div>
                      </div>
                      <!-- BOUCLE POUR LES REPONSES DES MESSAGES -->
                      <div v-for="comment in comment.Comments.slice().reverse()" :key="comment.createdAt">
                        <div  class="d-flex align-items-start ms-5">
                              <img v-if="comment.User.Ppicture == null" class="thumbnailMessage me-2" src="@/assets/defaultProfilPicture.jpeg" alt="">
                              <img v-else :src="comment.User.Ppicture" alt="" class="thumbnailMessage me-2">
                              <div :id="'comment'+comment.id" class="message mb-2 text-start pb-1 pointer">
                                <span class="fw-bold">{{ comment.User.name }} {{ comment.User.surname }} : </span>
                                <span class="text-start"> {{ comment.text }}</span>
                                <!-- AFFICHAGE OPTIONS MESSAGE HOVER -->
                                <div id="message" class="justify-content-end align-items-center border-top">
                                  <BIconHandThumbsUp /><span class="me-auto"></span>
                                  <span class="ms-3 me-2">signaler</span>
                                  <span v-if="$store.state.user.userId == comment.User.id || $store.state.user.admin" @click="deleteComment(comment)">supprimer</span>
                                </div>
                              </div>
                        </div>
                      </div>
                </div>
              </div>
<!-- AFFICHAGE INPUT TEXT COMMENTAIRE -->
              <div id="sendingMessage" class="d-flex position-relative mt-3">
                <div class="d-flex input-group position-relative ">
                  <div class="thumbnailright">
                    <img v-if="$store.state.user.Ppicture" class="border-end-0" :src="$store.state.user.Ppicture" height="50" width="50"/>
                    <img v-else src="@/assets/defaultProfilPicture.jpeg" alt="">
                  </div>
                  <input :id="'textComment'+posting.id" type="text" class="form-controlled border-start-0 ps-5 w" placeholder="Écrivez un commentaire"/>
                  <BIconPencilFill class="position-absolute pen fs-4"/>
                  <p @click="emojiMessage = !emojiMessage" class="position-absolute smiley fs-3 pointer">&#128512; </p>
                  <div v-if="answering" @click="sendAnswer(posting)" type="button" class="btn btng d-flex align-items-center border-start-0">
                    Répondre !<BIconArrowRightSquare class="fs-4 ms-2" />
                  </div>
                  <div v-else @click="sendComment(posting)" type="button" class="btn btng d-flex align-items-center border-start-0">
                    Envoyer !<BIconArrowRightSquare class="fs-4 ms-2" />
                  </div>
                  <div v-if="emojiMessage" id="emojiMessage">
                    <ul class="d-flex fs-3 mb-0 mt-2 flex-wrap">
                      <li @click="addEmojiMessage(emojiList, posting)" class="mx-1 pointer" v-for="emojiList in emojiLists" :key="emojiList">{{emojiList}}</li>
                    </ul>
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
      answering: false,
      answeringId: Number,
      emoji: false,
      emojiMessage: false,
      emojiLists: [
        "😀","😁","😂","😃","😄","😅","😆","😇","😈","😉","😊","😋","😌","😍","😎","😏","😐",
        "😑","😒","😓","😔","😕","😖","😗","😘","😙","😚","😛","😜","😝","😞","😟","😠","😡",
        "😢","😣","😤","😥","😦","😧","😨","😩","😪","😫","😬","😭","😮","😯","😰","😱","😲",
        "😳","😴","😵","😶","😷","😸","😹","😺","😻","😼","😽","😾","😿","🙀","🙁","🙂","🙃",
        "🙄","🤐","🤑","🤒","🤓","🤔","🤕","🥰","🥱","🥳","🥴","🥵","🤠","🤡","🤢","🤣","🤤",
        "🤥","🤧","🤨","🤩","🤪","🤫","🤬","🤭","🤮","🤯","👋","👌","👍","👎","👏","👐",],
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
      .then((response)=>{this.postings = response.data.slice().reverse(); this.comments = response.data.Comments; console.log(response.data)})
      .catch((error) =>{console.log(error)})
    },
    deletePost(id, user){
      axios.delete('http://localhost:3000/postings/by/' + user + "/" + id, { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
      .then(()=>{this.getAllPost()})
      .catch((error) =>{console.log(error)})
    },
    addEmoji(emoji){
      this.text = this.text.concat(' ', emoji); this.emoji = false;
    },
    addEmojiMessage(emoji, posting){
      document.getElementById('textComment'+posting.id).value = document.getElementById('textComment'+posting.id).value.concat(' ', emoji); this.emojiMessage = false;
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
      .then(() => this.getAllPost())
      .catch((error) =>{console.log(error)})
    },
    report(posting){
      console.log("signalement du post")
      axios.post('http://localhost:3000/reports/posting/'+posting.id, {userId :localStorage.getItem('userId')}, { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
      .then(() => this.getAllPost())
      .catch((error) =>{console.log(error)})
    },
    deleteReport(posting){
      axios.delete('http://localhost:3000/reports/posting/'+posting.id, { headers: { Authorization: 'bearer ' + localStorage.getItem('token')}})
      .then(() => this.getAllPost())
      .catch((error) =>{console.log(error)})
    },
    sendComment(posting){
      if(document.getElementById('textComment'+posting.id).value != ''){
        console.log('sending message');
        axios.post('http://localhost:3000/comments/', {text: document.getElementById('textComment'+posting.id).value, userId: localStorage.getItem('userId'),
         postingId: posting.id}, { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
        .then(()=>{document.getElementById('textComment'+posting.id).value = '';
                  let fileEl = document.getElementById('collapse'+posting.id);
                  fileEl.classList.add('show');
                  this.getAllPost()})
        .catch((error) =>{console.log(error)})
      }
      else{
        return;
      }
    },
    deleteComment(comment){
      axios.delete('http://localhost:3000/comments/by/'+comment.User.id+'/'+comment.id, { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
      .then(()=>{this.getAllPost()})
      .catch((error) =>{console.log(error)})
    },
    answerComment(comment, posting){
        document.getElementById('comment'+comment.id).classList.replace('message', 'selectedMessageToAnswer');
        document.getElementById('textComment'+posting.id).focus()
        document.getElementById('textComment'+posting.id).setAttribute("placeholder", "Répondez au commentaire !")
        this.answering = true;
        this.answeringId = comment.id
        console.log('answering message', this.answeringId);
        document.getElementById('sendingMessage').addEventListener("blur", ()=>{
          document.getElementById('comment'+this.answeringId).classList.replace('selectedMessageToAnswer','message');
          document.getElementById('textComment'+posting.id).setAttribute("placeholder", "Écrivez un commentaire !")
          this.answering = false;
          this.answeringId = null
        })
    },
    sendAnswer(posting){
            if(document.getElementById('textComment'+posting.id).value != ''){
        axios.post('http://localhost:3000/comments/', {text: document.getElementById('textComment'+posting.id).value, userId: localStorage.getItem('userId'),
         commentId: this.answeringId}, { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
        .then(()=>{document.getElementById('textComment'+posting.id).value = '';
          document.getElementById('comment'+this.answeringId).classList.replace('selectedMessageToAnswer','message');
          this.answering = false;
          this.answeringId = null
          let fileEl = document.getElementById('collapse'+posting.id);
          fileEl.classList.add('show');
          this.getAllPost()})
        .catch((error) =>{console.log(error)})
              }
      else{
        return;
      }
    },
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
          console.log("utilisateur connecté");
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
.selectedMessageToAnswer{
  border: 3px solid rgb(233, 68, 38);
  border-radius: .4rem;
  padding: .5rem .5rem 0rem .5rem;
  background-color: rgba(235, 204, 204, 0.3);
}
.thumbnail {
  width: 60px;
  height: 60px;
  border: rgb(233, 68, 38) 1px solid;
  border-radius: 0.6rem;
  overflow: hidden;
}
.thumbnailMessage {
  width: 30px;
  height: 30px;
  border: rgb(233, 68, 38) 1px solid;
  border-radius: 0.6rem;
  overflow: hidden;
}

.message{
  border: rgba(233, 67, 38, 0.3) 1px solid;
  border-radius: .4rem;
  padding: .5rem .5rem 0rem .5rem;
  background-color: rgba(235, 204, 204, 0.3);
}
.message #message{
  display: none;
}
.message:hover #message{
  display: flex;
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
  width: calc(100% - 50px - 140px);
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
#menuPost li{
  width: 200px;
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
.likes  ul{
  display: none;
}
.likes:hover  ul{
  position: absolute;
  display: flex;
  min-width: 300px;
  flex-wrap: wrap;
  z-index: 20;
  top: -1rem;
  left:2rem;
  padding: .5rem;
  background-color: white;
}
</style>
