import { createStore } from 'vuex'

const store = createStore({
  state:{
      admin   : false,
      id      : Number,
      nom     : "nom",
      prenom  : "prénom",
      service : "service",
      email   : "email",
      photo   : "",
      creation:  "",
      isConnected: true,
  },
  mutations: {
    changeAdmin(state, value){
      state.admin = value;
    },
    changeId(state, value){
      state.id = value;
    },
    changeSurname(state, value){
      state.nom = value;
    },
    changeName(state, value){
      state.prenom = value;
    },
    changeService(state, value){
      state.service = value;
    },
    changeEmail(state, value){
      state.email = value;
    },
    changePhoto(state, value){
      state.photo = value;
    },
    changeCreation(state, value){
      state.creation = value;
    },
  }
})

export default store;