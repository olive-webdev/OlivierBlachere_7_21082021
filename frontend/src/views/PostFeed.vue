<template>
  <div class="container bg-light px-md-4 px-1">
    <Header class="sticky-top p-1" />
    <div class="row mx-0">
      <div class="col-3 mt-3">
        <Menu class="d-none d-lg-block" />
      </div>
      <div class="col-lg-9 mt-3 col-12">
<!-- AFFICHAGE QUOI DE NEUF -->
        <div class="bg-white rounded d-flex flex-column px-md-4 py-md-3 mb-4 border">
          <form class="d-flex input-group">
            <div class="thumbnailMD">
              <img v-if="$store.state.user.Ppicture" class="thumbnailMD border-end-0 border border-primary rounded-start" :src="$store.state.user.Ppicture"/>
              <img v-else class="thumbnailMD border-end-0 border border-primary rounded-start p-1" src="@/assets/defaultProfilPicture.jpeg" alt="">
            </div>
            <div class="border-top border-bottom border-primary d-flex align-items-center px-md-3 ps-2"><BIconPencilFill class="fs-6"/></div>
            <input v-model="text" type="text" class="form-control border-start-0 border-end-0 border-primary pe-0" aria-describedby="quoi de neuf"
            :placeholder="'Quoi de neuf ' + $store.state.user.name + ' ?'"/>
            <div class="border-top border-bottom border-primary d-flex align-items-center px-md-3">
              <button @click="emoji = !emoji" class="fs-3 pointer mb-0 me-md-2 btn-none pe-0" type="button">&#128512; </button>
              <button @click="loadPhoto()" class="fs-3 pointer mb-0 btn-none" type="button">&#127748; </button>
            </div>
            <input @change="addPhoto()" type="file" id="addingPhoto" class="inputfile"/>
            <button @click="send()" type="submit"
             class="btn btn-secondary border border-primary d-flex align-items-center border-start-0"><p class="d-none d-md-block mb-0">Envoyer !</p>
             <BIconArrowRightSquare class="fs-4 ms-md-2" />
            </button>
          </form>
          <div v-if="emoji" id="emoji">
            <div class="d-flex fs-3 mb-0 p-3 pb-0 flex-wrap justify-content-between">
              <button @click="addEmoji(emojiList)" class="pointer btn-none" v-for="emojiList in emojiLists" :key="emojiList">{{emojiList}}</button>
            </div>
          </div>
          <div v-if="url" id="photo">
            <div id="preview">
              <p class="ms-2 fs-4 mt-3 mb-0 text-start"> {{ text }}</p>
              <div class="position-relative">
                <img v-if="url" :src="url" class="w-100 rounded mt-3 shadow">
                <BIconTrash v-if="url" @click="deletePhoto()" class="fs-1 pointer trash position-absolute"/>
              </div>
            </div>
            <div class="d-flex">
              <button  @click="loadPhoto()" class="btn btn-secondary border-primary w-100 mt-3 me-4" for="addingPhoto">Modifier la photo</button>
              <button @click="send()" class="btn btn-secondary border-primary w-100 mt-3" for="addingPhoto">Publier</button>
            </div>
          </div>
        </div>
        <ul id="postings">
<!-- AFFICHAGE DU POST -->
          <li v-for="posting in postings" :key="posting.id" :id='"post"+posting.id'>
            <div class="bg-white rounded d-flex pt-3 flex-column p-md-4 p-2 mb-4  border">
              <div class="d-flex justify-content-between border-bottom border-secondary pb-2">
                <div class="rounded border border-primary overflow-hidden thumbnail rounded">
                  <img v-if="posting.User.Ppicture" class="thumbnail" :src="posting.User.Ppicture" />
                  <img v-else class="thumbnail" src="@/assets/defaultProfilPicture.jpeg"/>
                </div>
                <div class="me-auto ms-3 text-primary">
                  <h3 class="m-0 text-start">{{posting.User.name}} {{posting.User.surname}}</h3>
                  <p @click="getSince()" class="text-start mb-0">publié le {{posting.createdAt.slice(8,10)}} {{posting.createdAt.slice(5,7)}} {{posting.createdAt.slice(0,4)}}</p>
                </div>
                <div v-if="posting.Reports.length > 0"><BIconExclamationSquareFill class="text-danger fs-4 me-3"/></div>
                <div class="dropdown">
                  <button type="button" class="btn-none" data-bs-toggle="dropdown" aria-expanded="false"><BIconInfoSquare class="fs-4 text-danger"/></button>
                  <ul id="menuPost" class="dropdown-menu" aria-labelledby="menuPost">
                    <li>
                      <div v-if="$store.state.user.userId != posting.User.id && !$store.state.user.admin && posting.Reports.length == 0" class="p-2 ps-3 pointer text-dark" @click="report(posting, to[0])">Signaler</div>
                    </li>
                    <li>
                      <div v-if="$store.state.user.userId != posting.User.id && !$store.state.user.admin && posting.Reports.length > 0" class="p-2 ps-3 pointer text-dark" @click="report(posting, to[0])">Annuler le signalement</div>
                    </li>
                    <li>
                      <div v-if="$store.state.user.admin && posting.Reports.length > 0" class="p-2 ps-3 pointer" @click="deleteReport(posting, to[0])">Retirer le signalement</div>
                    </li>
                    <li>
                      <div v-if="$store.state.user.userId == posting.User.id  || $store.state.user.admin" @click="modifyPost(posting)" class="p-2 ps-3 pointer">modifier</div>
                    </li>
                    <li>
                      <div v-if="$store.state.user.userId != posting.User.id" class="p-2 ps-3"><router-link class="text-decoration-none text-dark" :to="{ name: 'Profil', params: { id: posting.User.id }}">Voir le profil</router-link></div>
                    </li>
                    <li>
                      <div v-if="$store.state.user.userId == posting.User.id  || $store.state.user.admin" @click="deletePost(posting.id, posting.userId)" class="p-2 ps-3 pointer">Supprimer</div>
                    </li>
                  </ul>
                </div>
              </div>
<!-- AFFICHAGE DU POST MODIFIÉ TEXTE ET IMAGE -->
              <div class="border-bottom border-secondary mb-3">
                <p v-if="!posting.toggle" class="text-start fs-4 mb-0 mt-2">{{posting.text}}</p>
                <input v-else class="form-control ps-2 w-100 py-2 my-3 rounded" type="text" name="modifyPost" id="textModified" :value="posting.text">
                <div v-if="posting.image != null" class="position-relative">
                    <img v-if="modifiedUrl != '' && posting.toggle" class="w-100 rounded my-3 shadow" :src="modifiedUrl" alt="" />
                    <img v-if="modifiedUrl != '' && !posting.toggle" class="w-100 rounded my-3 shadow mb-2" :src="posting.image" alt="" />
                    <img v-if="modifiedUrl == '' && !posting.imageDeleted && posting.toggle" class="w-100 rounded my-3 shadow mb-2" :src="posting.image" alt=""/>
                    <img v-if="modifiedUrl == '' && !posting.imageDeleted && !posting.toggle" class="w-100 rounded my-3 shadow mb-2" :src="posting.image" alt=""/>
                    <div v-if="modifiedUrl == '' && !posting.imageDeleted"></div>
                    <BIconTrash v-if="modifiedUrl != '' && posting.toggle && posting.imageDeleted || posting.image && posting.toggle && !posting.imageDeleted" @click="deletePhoto(posting)" class="fs-1 pointer trash position-absolute"/>
                </div>
                <div v-else-if="posting.image">
                  <img class="w-100 rounded my-3 shadow" :src="modifiedUrl" alt="" />
                </div>
                <div v-else class="position-relative">
                  <img v-if="modifiedUrl != '' && posting.toggle" class="w-100 rounded my-3 shadow" :src="modifiedUrl" alt="" />
                  <BIconTrash v-if="modifiedUrl != '' && posting.toggle" @click="deletePhoto(posting)" class="fs-1 pointer trash position-absolute"/>
                </div>
                <div class="d-flex mb-3">
                  <button v-if="posting.toggle && posting.image || posting.toggle && modifiedUrl != ''" @click="modifyPhoto(posting)" class="btn btn-secondary border-primary w-100 mt-2 me-4" for="modifyPhoto">Changer l'image</button>
                  <button v-if="posting.toggle && !posting.image && modifiedUrl == ''" @click="modifyPhoto(posting)" class="btn btn-secondary border-primary w-100 mt-2 me-4" for="modifyPhoto">Ajouter une image</button>
                  <button v-if="posting.toggle" @click="modifyPosting(posting)" class="btn btn-secondary border-primary w-100 mt-2" for="modifyPhoto">Publier</button>
                  <input @change="addModifiedPhoto(posting)" type="file" :id="posting.id" class="inputfile"/>
                </div>
              </div>
<!-- AFFICHAGE DES LIKES -->
              <div class="d-flex justify-content-between align-items-center text-dark">
                <button class="btn-none" type="button" @click="like(posting, to[0])"><BIconHandThumbsUp class="fs-3 text-danger mb-2 pointer" /></button>
                <div class="me-auto ms-2 d-flex align-items-center pointer likes position-relative fs-5"> {{ posting.Likes.length}}
                  <ul class="border">
                    <li v-for="Like in posting.Likes" :key="Like.id" class="d-flex me-1"> {{ Like.User.name }} {{ Like.User.surname }} <span v-if="posting.Likes.length >1">,</span></li>
                    <li v-if="posting.Likes.length <2 && posting.Likes.length != 0">a liké ce post</li>
                    <li v-if="posting.Likes.length >1">ont liké ce post</li>
                    <li v-if="posting.Likes.length ==0">Personne n'a encore liké ce post</li>
                  </ul>
                </div>     
                <a class="text-decoration-none text-dark fs-5" data-bs-toggle="collapse" :href="'#collapse'+posting.id" role="button"
                  aria-expanded="false" :aria-controls="'collapse'+posting.id">{{ posting.Comments.length }} commentaire<span v-if="posting.Comments.length >0">s</span>
                </a>
              </div>
<!-- AFFICHAGE DES MESSAGES -->
              <div class="collapse" :id="'collapse'+posting.id"><hr>
                <!-- BOUCLE POUR LES MESSAGES -->
                <div v-for="comment in posting.Comments.slice().reverse()" :key="comment.createdAt">
                      <div  class="d-flex align-items-start" :id="'comment'+comment.id">
                              <img v-if="comment.UserId == null" class="thumbnailSM rounded border border-primary me-2" src="@/assets/defaultProfilPicture.jpeg" alt="">
                              <img v-else-if="comment.User.Ppicture == null" class="thumbnailSM rounded border border-primary me-2" src="@/assets/defaultProfilPicture.jpeg" alt="">
                              <img v-else :src="comment.User.Ppicture" alt="" class="thumbnailSM rounded border border-primary me-2">
                              <div :id="'commentText'+comment.id" class="message mb-2 text-start pb-1 pointer">
                                <div class="">
                                  <div v-if="comment.Reports.length > 0"><BIconExclamationSquareFill class="text-danger fs-6 me-3 mb-1"/></div>
                                  <span v-if="comment.UserId == null"><strong>utilisateur supprimé : </strong>{{ comment.text }}</span>
                                  <span v-else><strong>{{ comment.User.name }} {{ comment.User.surname }} :</strong>  {{ comment.text }}</span>
                                </div>
                                <!-- AFFICHAGE OPTIONS MESSAGE HOVER -->
                                <div id="message" class="justify-content-end align-items-center border-top">
                                  <div class="me-auto" @click="like(comment, to[1])">
                                    <BIconHandThumbsUp />
                                    <span v-if="comment.Likes.length > 0" class="fs-6 me-2">{{ comment.Likes.length }}</span>
                                  </div>
                                  <span v-if="$store.state.user.admin && comment.Reports.length > 0"
                                     class="ms-3 me-2" @click="deleteReport(comment, to[1])">retirer le signalement</span>
                                  <span v-else-if="comment.UserId == null || $store.state.user.userId != comment.User.id && $store.state.user.admin == false"
                                   class="ms-3 me-2" @click="report(comment, to[1])">signaler</span>
                                  <span @click="answerComment(comment, posting)" class="me-2">répondre</span>
                                  <span v-if="comment.UserId == null || $store.state.user.userId == comment.User.id || $store.state.user.admin" @click="deleteComment(comment)">supprimer</span>
                                </div>
                              </div>
                      </div>
<!-- BOUCLE POUR LES REPONSES DES MESSAGES -->
                      <div v-for="comment in comment.Comments.slice().reverse()" :key="comment.createdAt">
                        <div  class="d-flex align-items-start ms-5">
                              <img v-if="comment.UserId == null" class="thumbnailSM rounded border border-primary me-2" src="@/assets/defaultProfilPicture.jpeg" alt="">
                              <img v-else-if="comment.User.Ppicture == null" class="thumbnailSM rounded border border-primary me-2" src="@/assets/defaultProfilPicture.jpeg" alt="">
                              <img v-else :src="comment.User.Ppicture" alt="" class="thumbnailSM rounded border border-primary me-2">
                              <div :id="'comment'+comment.id" class="message mb-2 text-start pb-1 pointer">
                                <div class="d-flex">
                                  <div v-if="comment.Reports.length > 0"><BIconExclamationSquareFill class="text-danger fs-6 me-3 mb-1"/></div>
                                  <span v-if="comment.UserId == null"><strong>utilisateur supprimé : </strong>{{ comment.text }}</span>
                                  <span v-else><strong>{{ comment.User.name }} {{ comment.User.surname }} :</strong>  {{ comment.text }}</span>
                                </div>
                                <!-- AFFICHAGE OPTIONS MESSAGE HOVER -->
                                <div id="message" class="justify-content-end align-items-center border-top">
                                  <div class="me-auto" @click="like(comment, to[1])">
                                    <BIconHandThumbsUp />
                                    <span v-if="comment.Likes.length > 0" class="fs-6">{{ comment.Likes.length }}</span>
                                  </div>
                                  <span v-if="$store.state.user.admin && comment.Reports.length > 0"
                                     class="ms-3 me-2" @click="deleteReport(comment, to[1])">retirer le signalement</span>
                                  <span v-else-if="comment.UserId == null || $store.state.user.userId != comment.User.id && $store.state.user.admin == false"
                                   class="ms-3 me-2" @click="report(comment, to[1])">signaler</span>
                                  <span v-if="comment.UserId == null || $store.state.user.userId == comment.User.id || $store.state.user.admin"
                                   @click="deleteComment(comment)">supprimer</span>
                                </div>
                              </div>
                        </div>
                      </div>
                </div>
              </div>
<!-- AFFICHAGE INPUT TEXT COMMENTAIRE -->
              <div id="sendingMessage" class="d-flex position-relative mt-3">
                <div class="d-flex input-group position-relative">
                  <div class="thumbnailMD">
                    <img v-if="$store.state.user.Ppicture" class="border-end-0 border border-primary rounded-start" :src="$store.state.user.Ppicture" height="50" width="50"/>
                    <img v-else class="border-end-0 border border-primary rounded-start p-1" src="@/assets/defaultProfilPicture.jpeg" alt="" height="50" width="50">
                  </div>
                  <div class="border-top border-bottom border-primary d-flex align-items-center px-md-3 ps-2">
                    <BIconPencilFill class="fs-6"/>
                  </div>
                  <input :id="'textComment'+posting.id" type="text" class="form-control border-start-0 border-end-0 border-primary" placeholder="Écrivez un commentaire"/>
                  <div class="border-top border-bottom border-primary d-flex align-items-center px-md-3 px-1">
                    <button @click="emojiMessageToggle(posting)" class="fs-3 pointer mb-0 me-md-2 btn-none pe-1">&#128512; </button>
                  </div>
                  <button v-if="answering" @click="sendAnswer(posting)" type="button" class="btn btn-secondary border-primary d-flex align-items-center border-start-0">
                    Répondre !<BIconArrowRightSquare class="fs-4 ms-2" />
                  </button>
                  <button v-else @click="sendComment(posting)" type="button" class="btn btn-secondary border-primary d-flex align-items-center border-start-0">
                    <p class="d-none d-md-block mb-0">Envoyer !</p><BIconArrowRightSquare class="fs-4 ms-md-2" />
                  </button>
                  <div v-if="emojiMessage == posting.id" id="emojiMessage">
                    <div class="d-flex fs-3 mb-0 p-3 pb-0 flex-wrap justify-content-between">
                      <button @click="addEmojiMessage(emojiList, posting)" class="btn-none pointer" v-for="emojiList in emojiLists" :key="emojiList">{{emojiList}}</button>
                    </div>
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
const axios = require("axios").default;
const instance = axios.create({baseURL: process.env.VUE_APP_SERVER})
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
      postings: {},
      to: ['posting', 'comment'],
      answering: false,
      answeringId: Number,
      emoji: false,
      emojiMessage: false,
      emojiLists: [
        "😀","😁","😂","😃","😄","😅","😆","😇","😈","😉","😊","😋","😌","😍","😎","😏","😐",
        "😑","😒","😓","😔","😕","😖","😗","😘","😙","😚","😛","😜","😝","😞","😟","😠","😡",
        "😢","😣","😤","😥","😦","😧","😨","😩","😪","😫","😬","😭","😮","😯","😰","😱","😲",
        "😳","😴","😵","😶","😷","🙁","🙂","🙃",
        "🙄","🤐","🤑","🤒","🤓","🤔","🤕","🥰","🥱","🥳","🥴","🥵","🤠","🤡","🤢","🤣","🤤",
        "🤥","🤧","🤨","🤩","🤪","🤫","🤬","🤭","🤮","🤯","👋","👌","👍","👎","👏","👐",],
      url: '',
      modifiedUrl: '',
    }
  },
  methods:{
    send(){
      if(this.text == '' && document.getElementById('addingPhoto').value == ''){
        console.log('il faut remplir au moins le champs texte ou insérer une image')
      }
      else{
      let formData = new FormData();
      if(document.getElementById('addingPhoto').value != null){
        formData.append('image', document.getElementById('addingPhoto').files[0])}
      else{formData.append('image', null)}
        formData.append('text', this.text); formData.append('userId', localStorage.getItem('userId'))
        instance.post('/postings/', formData, { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
        .then(()=>{this.text = ''; this.image = null; this.url= ''; document.getElementById('addingPhoto').value = null; this.getAllPost()})
        .catch((error) =>{console.log(error)})
      }
    },
    modifyPosting(posting){
      let formData = new FormData();
      if(posting.imageDeleted == undefined){posting.imageDeleted = false}
      if(posting.imageDeleted == true){this.image = null}
      else{this.image = document.getElementById(posting.id).files[0]}
      formData.append('image', this.image)
      formData.append('text', document.getElementById("textModified").value)
      formData.append('userId', localStorage.getItem('userId'))
      instance.put('/postings/by/' +posting.UserId+ "/" + posting.id , formData, { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
      .then(()=>{this.getAllPost();this.emoji = false; this.photo = false; posting.imageDeleted = false})
      .catch((error) =>{console.log(error)})
    },
    getAllPost(){
      instance.get('/postings/', { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
      .then((response)=>{this.postings = response.data.slice().reverse(); this.comments = response.data.Comments; console.log(response.data)})
      .catch((error) =>{console.log(error)})
    },
    deletePost(id, user){
      instance.delete('/postings/by/' + user + "/" + id, { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
      .then(()=>{this.getAllPost()})
      .catch((error) =>{console.log(error)})
    },
    addEmoji(emoji){
      this.text = this.text.concat(' ', emoji); this.emoji = false;
    },
    emojiMessageToggle(posting){
      this.emojiMessage == posting.id ? this.emojiMessage = !posting.id : this.emojiMessage = posting.id
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
      const photoPreview = document.getElementById('addingPhoto').files[0];
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
      document.getElementById(posting.id).value = ''
    },
    modifyPost(posting){
      posting.toggle = !posting.toggle
    },
    like(from, to){
      instance.post('/likes/'+to+'/'+from.id, {userId :localStorage.getItem('userId')}, { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
      .then(() => this.getAllPost())
      .catch((error) =>{console.log(error)})
    },
    report(from, to){
      instance.post('/reports/'+to+'/'+from.id, {userId :localStorage.getItem('userId')}, { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
      .then(() => this.getAllPost())
      .catch((error) =>{console.log(error)})
    },
    deleteReport(from, to){
      instance.delete('/reports/'+to+'/'+from.id, { headers: { Authorization: 'bearer ' + localStorage.getItem('token')}})
      .then(() => {this.$store.commit('deleteReport');this.getAllPost()})
      .catch((error) =>{console.log(error)})
    },
    sendComment(posting){
      if(document.getElementById('textComment'+posting.id).value != ''){
        instance.post('/comments/',
        {text: document.getElementById('textComment'+posting.id).value, userId: localStorage.getItem('userId'), postingId: posting.id},
        {headers: {Authorization: 'bearer '+localStorage.getItem('token')}})
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
      instance.delete('/comments/by/'+comment.UserId+'/'+comment.id, { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
      .then(()=>{this.getAllPost()})
      .catch((error) =>{console.log(error)})
    },
    answerComment(comment, posting){
        document.getElementById('commentText'+comment.id).classList.replace('message', 'selectedMessageToAnswer');
        let form = document.getElementById('sendingMessage');
        let textComment = document.getElementById('textComment'+posting.id);
        textComment.focus(); textComment.setAttribute("placeholder", "Répondez au commentaire !")
        this.answering = true; this.answeringId = comment.id
        form.addEventListener("blur", ()=>{
          document.getElementById('commentText'+this.answeringId).classList.replace('selectedMessageToAnswer','message');
          textComment.setAttribute("placeholder", "Écrivez un commentaire !")
          this.answering = false;
        })
    },
    sendAnswer(posting){
      if(document.getElementById('textComment'+posting.id).value != ''){
        instance.post('/comments/',
        {text: document.getElementById('textComment'+posting.id).value, userId: localStorage.getItem('userId'),commentId: this.answeringId},
        {headers:{Authorization: 'bearer '+localStorage.getItem('token')}})
        .then(()=>{document.getElementById('textComment'+posting.id).value = '';
          document.getElementById('commentText'+this.answeringId).classList.replace('selectedMessageToAnswer','message');
          this.answering = false;this.answeringId = null
          let fileEl = document.getElementById('collapse'+posting.id);
          fileEl.classList.add('show');
          document.getElementById('textComment'+posting.id).setAttribute("placeholder", "Écrivez un commentaire !");
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
};
</script>

<style lang="scss" scoped>
.btn-none{
  border: none;
  background: none;
  outline-color: rgb(235, 204, 204);
}
.selectedMessageToAnswer{
  border: 3px solid rgb(233, 68, 38);
  border-radius: .4rem;
  padding: .5rem .5rem 0rem .5rem;
  background-color: rgba(235, 204, 204, 0.3);
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
img {
  // width: 100%;
  // height: 100%;
  object-fit: cover;
  object-position: center;
}
ul{
  list-style: none;
  padding: 0;
  border-radius: .6rem;
  overflow: hidden;
}
#menuPost li:hover > div{
  background-color: rgb(235, 204, 204);
  border-left: 2px solid rgb(233, 68, 38);
}
#menuPost li{
  width: 200px;
}
.inputfile{
  display: none;
}
.trash{
  top : 3rem;
  right: 2rem;
}
#emoji button, #emojiMessage button{
  margin: 0;
  padding: 0;
  width: 3rem;
  height: 3rem;
}
#emoji button:hover, #emojiMessage button:hover{
  width: 3rem;
  height: 3rem;
  position: relative;
  top: -1rem;
  left: -.3rem;
  font-size: 3.5rem;
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
