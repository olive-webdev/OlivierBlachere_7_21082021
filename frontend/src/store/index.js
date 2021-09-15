import { createStore } from 'vuex'
const axios = require('axios').default;
const instance = axios.create({
  baseURL: 'http://localhost:3000'
})

export default createStore({
  state: {
    status: '',
    user: {
      userId: '-1',
      token: '',
      name: '',
      surname: '',
      email: '',
      service: null,
      Ppicture: null,
      admin: Boolean,
      creation: null,
      auth: true,
    },
    reports: 0,
  },
  mutations: {
    setStatus: function(state, status){state.status = status},
    loginUser: function(state, user){state.user = user},
    getUser: function(state, user){state.user = user, state.user.token = user.token, state.user.userId = user.id, state.user.Ppicture = user.Ppicture},
    connected: function(state, userInfos){state.user.userId = userInfos.id, state.user.token = userInfos.token},
    logout: function(state, value){state.user.userId = value},
    modifyProfil: function(state, value){state.user = value},
    changePhoto: function(state, userProfil){state.user.Ppicture = userProfil.Ppicture},
    reports: function(state, value){state.reports = value},
    deleteReport: function(state){state.reports--},
  },
  actions: {
    signup: ({commit}, userInfos) =>  {
      commit('setStatus', 'connecting...')
      return new Promise((resolve, reject) => {
        instance.post('/users/signup', {email: userInfos.email, surname: userInfos.surname, name: userInfos.name, password: userInfos.password})
        .then(function(response){commit('setStatus', 'created');resolve(response)})
        .catch(function(error){commit('setStatus', 'errorSignup');reject(error)})
      })
    },
    login: ({commit}, userInfos) =>  {
      commit('setStatus', 'connecting...')
      return new Promise((resolve, reject) => {
        instance.post('/users/login', {email: userInfos.email, password: userInfos.password})
        .then(function(response)
          {commit('setStatus', 'connected');
          commit('loginUser', response.data);
          localStorage.setItem('userId', response.data.userId);
          localStorage.setItem('token', response.data.token);
          resolve(response)})
        .catch(function(error){commit('setStatus', 'errorLogin');reject(error)})
      })
    },
    getUser: ({commit}, userInfos) => {
      return new Promise((resolve, reject) => {
        instance.get('/users/' + userInfos.id, { headers: { Authorization: 'bearer ' + userInfos.token } })
        .then(function(response)
          {commit('getUser', response.data);
          commit('connected', userInfos); resolve(response)})
        .catch(function(error){commit('setStatus', 'errorGetUser');reject(error)})
      });
    },
    logout: ({commit}) => {
      commit("logout", -1)
    },
    modifyProfil: ({commit}, userProfil) => {
      commit('setStatus', 'modifying Profil...')
      return new Promise((resolve, reject) => {
        instance.put('/users/' + userProfil.id, {email: userProfil.email, surname: userProfil.surname, name: userProfil.name, service: userProfil.service, Ppicture: userProfil.photo, password: userProfil.password}, { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
        .then(function(response){commit('modifyProfil', userProfil);resolve(response)})
        .catch(function(error){commit('setStatus', 'errorModifyingProfil');reject(error)})
      })
    },
    reports: ({commit}) => {
      return new Promise((resolve, reject) => {
        instance.get('/reports/', { headers: { Authorization: 'bearer ' + localStorage.getItem('token') } })
        .then(function(response){commit('reports', response.data.length); resolve(response)})
        .catch(function(error){commit('reports', 'errorGetReports');reject(error)})
      })
    },
    deleteReport: ({commit}) => {
      commit('deleteReport')
    }
  },
})
