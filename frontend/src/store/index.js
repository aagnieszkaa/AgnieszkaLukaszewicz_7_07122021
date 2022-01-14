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
    },
    publications: [],
    publicationInfo: {
    },
    comments: [],
    commentInfo: {
    }
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
    },
    DELETE_USER: function (state) {
      state.utilisateurInfo = { ...state.utilisateurInfo, enabled: 0 };
    },
    SET_PUBLICATIONS: function (state, publications) {
      state.publications = publications;
    },
    SET_ONE_PUBLICATION: function (state, publicationInfo) {
      state.publicationInfo = publicationInfo;
    },
    SET_COMMENTS: function (state, comments) {
      state.comments = comments;
    },
    SET_ONE_COMMENT: function (state, commentInfo) {
      state.commentInfo = commentInfo;
    },
  },
  actions: {
    signup: ({commit}, utilisateurInfo) => {
      commit('changeStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/signup', utilisateurInfo)
        .then(function (response) {
          commit('changeStatus', '');
          resolve(response);
        })
        .catch(function (error) {
          commit('changeStatus', '');
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
          commit('changeStatus', '');
          reject(error);
        })
      });
    },
    utilisateurInfo: ({commit}, utilisateurId) => {
      return new Promise((resolve, reject) => {
        instance.get('/auth/infos/'+utilisateurId)
        .then(function (response) {
          commit('utilisateurInfo', response.data);
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        }); 
      })
    },
    suppressionUtilisateur: ({commit}, utilisateurId) => {
      return new Promise((resolve, reject) => {
        instance.put('/auth/deleteUser/'+utilisateurId)
        .then(function (response) {
          commit('DELETE_USER', response.data);
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        }); 
      })
    },
    modificationUtilisateur: ({commit}, utilisateur) => {
      return new Promise((resolve, reject) => {
        instance.put('/auth/modifyUser/'+utilisateur.utilisateurId, utilisateur.utilisateurAll)
        .then(function (response) {
          commit('utilisateurInfo', response.data);
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        }); 
      })
    },
    publicationContent: ({commit}, publicationInfo) => {
      commit('changeStatus', 'loading');
      console.log(publicationInfo);
      return new Promise((resolve, reject) => {
        instance.post('/publications/savePublication', publicationInfo)
        .then(function (response) {
          commit('changeStatus', '');
          resolve(response);
        })
        .catch(function (error) {
          commit('changeStatus', '');
          reject(error);
        })
      });
    },
    showPublications: ({commit}) => {
      commit('changeStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.get('/publications/getListOfMemes')
        .then(function (response) {
          commit('changeStatus', '');
          commit('SET_PUBLICATIONS', response.data);
          resolve(response);
        })
        .catch(function (error) {
          commit('changeStatus', '');
          reject(error);
        })
      });
    },
    suppressionPublication: ({commit}, publicationId) => {
      return new Promise((resolve, reject) => {
        instance.delete('/publications/deletePublication/'+publicationId)
        .then(function (response) {
          commit('changeStatus', '');
          resolve(response);
        })
        .catch(function (error) {
          commit('changeStatus', '');
          reject(error);
        }); 
      })
    },
    modificationPublication: ({commit}, publication) => {
      return new Promise((resolve, reject) => {
        instance.put('/publications/modifyPublication/'+publication.publicationId, publication.publicationAll)
        .then(function (response) {
          commit('changeStatus', '');
          resolve(response);
        })
        .catch(function (error) {
          commit('changeStatus', '');
          reject(error);
        }); 
      })
    },
    oneMemeInfo: ({commit}, memeId) => {
      return new Promise((resolve, reject) => {
        instance.get('/publications/getOneMeme/'+memeId)
        .then(function (response) {
          commit('SET_ONE_PUBLICATION', response.data);
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        }); 
      })
    },
    oneCommentInfo: ({commit}, commentId) => {
      return new Promise((resolve, reject) => {
        instance.get('/comments/getOneComment/'+commentId)
        .then(function (response) {
          commit('SET_ONE_COMMENT', response.data);
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        }); 
      })
    },
    commentContent: ({commit}, commentInfo) => {
      commit('changeStatus', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/comments/saveComment', commentInfo)
        .then(function (response) {
          commit('changeStatus', '');
          resolve(response);
        })
        .catch(function (error) {
          commit('changeStatus', '');
          reject(error);
        })
      });
    },
    suppressionComment: ({commit}, commentId) => {
      return new Promise((resolve, reject) => {
        instance.delete('/comments/deleteComment/'+commentId)
        .then(function (response) {
          commit('changeStatus', '');
          resolve(response);
        })
        .catch(function (error) {
          commit('changeStatus', '');
          reject(error);
        }); 
      })
    },
    modificationComment: ({commit}, comment) => {
      return new Promise((resolve, reject) => {
        instance.put('/comments/modifyComment/'+comment.commentId, comment.commentAll)
        .then(function (response) {
          commit('changeStatus', '');
          resolve(response);
        })
        .catch(function (error) {
          commit('changeStatus', '');
          reject(error);
        }); 
      })
    },
  },

  modules: {
  }
})