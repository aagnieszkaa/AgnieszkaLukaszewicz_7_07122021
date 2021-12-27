import { createStore } from 'vuex'

const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
});


let utilisateur = localStorage.getItem('utilisateur');
if (!utilisateur) {
  utilisateur = {
    utilisateurId: -1,
    token: '',
  }; 
} else {
  try {
    utilisateur = JSON.parse(utilisateur);
    instance.defaults.headers.common['Authorization'] = utilisateur.token;
  } catch (ex) {
    utilisateur = {
      utilisateurId: -1,
      token: '',
    };
  }
}



export default createStore({
  state: {
    status: '',
    utilisateur: utilisateur,
  utilisateurInfo: {
      nom:'',
      prenom: '',
      email: '',
      mot_de_passe: '',
      image_chemin: '',
      fonction: '',
    },
  },
  mutations: {
    changeStatus: function(state, status) {
      state.status = status;
    },
    login: function (state, utilisateur){
      instance.defaults.headers.common['Authorization'] = utilisateur.token;
      localStorage.setItem('utilisateur', JSON.stringify(utilisateur));
      state.utilisateur = utilisateur;
    },
    utilisateurInfo: function (state, utilisateurInfo) {
      state.utilisateurInfo = utilisateurInfo;
    },
    logout: function (state) {
      state.utilisateur = {
        utilisateurId: -1,
        token: '',
      }
      localStorage.removeItem('utilisateur');
    }
  },
  actions: {
    signup: ({commit}, utilisateurInfo) => {
      commit('changeStatus', 'loading');
      return new Promise((resolve, reject) => {
        commit;
        instance.post('/auth/signup', utilisateurInfo)
        .then(function (response) {
          commit('changeStatus', 'created');
          resolve(response);
        })
        .catch(function (error) {
          commit('changeStatus', 'error_signup');
          reject(error);
        })
      });
    },
    login: ({commit}, utilisateurInfo) => {
      commit('changeStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/login', utilisateurInfo)
        .then(function (response) {
          commit('changeStatus', '');
          commit('login', response.data);
          resolve(response);
        })
        .catch(function (error) {
          commit('changeStatus', 'error_login');
          reject(error);
        })
      });
    },
    utilisateurInfo: ({commit}) => {
      instance.get('/auth/infos')
      .then(function (response) {
        commit('utilisateurInfo', response.data);
      })
      .catch(function () {
      });
    }
  },
  modules: {
  }
})
