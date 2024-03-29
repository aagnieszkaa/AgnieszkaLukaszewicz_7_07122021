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
    CHANGE_STATUS: function(state, status) {
      state.status = status;
    },
    LOGIN: function (state, utilisateur){
      instance.defaults.headers.common['Authorization'] = utilisateur.token;
      localStorage.setItem('utilisateur', JSON.stringify(utilisateur));
      state.utilisateur = utilisateur;
    },
    UTILISATEUR_INFO: function (state, utilisateurInfo) {
      state.utilisateurInfo = utilisateurInfo;
    },
    LOGOUT: function (state) {
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
      commit('CHANGE_STATUS', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/signup', utilisateurInfo)
        .then(function (response) {
          commit('CHANGE_STATUS', '');
          resolve(response);
        })
        .catch(function (error) {
          commit('CHANGE_STATUS', '');
          reject(error);
        })
      });
    },
    login: ({commit}, utilisateurInfo) => {
      commit('CHANGE_STATUS', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/auth/login', utilisateurInfo)
        .then(function (response) {
          commit('CHANGE_STATUS', '');
          commit('LOGIN', response.data);
          resolve(response);
        })
        .catch(function (error) {
          commit('CHANGE_STATUS', '');
          reject(error);
        })
      });
    },
    utilisateurInfo: ({commit}, utilisateurId) => {
      return new Promise((resolve, reject) => {
        instance.get('/auth/infos/'+utilisateurId)
        .then(function (response) {
          commit('UTILISATEUR_INFO', response.data);
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        }); 
      })
    },
    suppressionUtilisateur: ({commit}, utilisateurId) => {
      commit('CHANGE_STATUS', 'loading');
      return new Promise((resolve, reject) => {
        instance.put('/auth/deleteUser/'+utilisateurId)
        .then(function (response) {
          commit('CHANGE_STATUS', '');
          commit('DELETE_USER', response.data);
          resolve(response);
        })
        .catch(function (error) {
          commit('CHANGE_STATUS', '');
          reject(error);
        }); 
      })
    },
    modificationUtilisateur: ({commit}, utilisateur) => {
      commit('CHANGE_STATUS', 'loading');
      return new Promise((resolve, reject) => {
        instance.put('/auth/modifyUser/'+utilisateur.utilisateurId, utilisateur.utilisateurAll)
        .then(function (response) {
          commit('CHANGE_STATUS', '');
          commit('UTILISATEUR_INFO', response.data);
          resolve(response);
        })
        .catch(function (error) {
          commit('CHANGE_STATUS', '');
          reject(error);
        }); 
      })
    },
    publicationContent: ({commit}, publicationInfo) => {
      commit('CHANGE_STATUS', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/publications/savePublication', publicationInfo)
        .then(function (response) {
          commit('CHANGE_STATUS', '');
          resolve(response);
        })
        .catch(function (error) {
          commit('CHANGE_STATUS', '');
          reject(error);
        })
      });
    },
    showPublications: ({commit}) => {
      return new Promise((resolve, reject) => {
        instance.get('/publications/getListOfMemes')
        .then(function (response) {
          commit('SET_PUBLICATIONS', response.data);
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        })
      });
    },
    suppressionPublication: ({commit}, publicationId) => {
      commit;
      return new Promise((resolve, reject) => {
        instance.delete('/publications/deletePublication/'+publicationId)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        }); 
      })
    },
    modificationPublication: ({commit}, publication) => {
      commit('CHANGE_STATUS', 'loading');
      return new Promise((resolve, reject) => {
        instance.put('/publications/modifyPublication/'+publication.publicationId, publication.publicationAll)
        .then(function (response) {
          commit('CHANGE_STATUS', '');
          resolve(response);
        })
        .catch(function (error) {
          commit('CHANGE_STATUS', '');
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
      commit('CHANGE_STATUS', 'loading');
      return new Promise((resolve, reject) => {
        instance.post('/comments/saveComment', commentInfo)
        .then(function (response) {
          commit('CHANGE_STATUS', '');
          commit('SET_COMMENTS', response.data);
          resolve(response);
        })
        .catch(function (error) {
          commit('CHANGE_STATUS', '');
          reject(error);
        })
      });
    },
    suppressionComment: ({commit}, commentId) => {
      commit;
      return new Promise((resolve, reject) => {
        instance.delete('/comments/deleteComment/'+commentId)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        }); 
      })
    },
    showComments: ({commit}, postId) => {
      commit;
      return new Promise((resolve, reject) => {
        instance.get('/comments/getListOfComments/'+postId)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        })
      });
    },
    modificationComment: ({commit}, comment) => {
      commit('CHANGE_STATUS', 'loading');
      return new Promise((resolve, reject) => {
        instance.put('/comments/modifyComment/'+comment.commentId, comment.commentAll)
        .then(function (response) {
          commit('CHANGE_STATUS', '');
          resolve(response);
        })
        .catch(function (error) {
          commit('CHANGE_STATUS', '');
          reject(error);
        }); 
      })
    },
    publicationLike: ({commit}, publicationInfo) => {
      commit;
      return new Promise((resolve, reject) => {
        instance.post('/likes/likePublication/'+publicationInfo.publicationId+'/'+publicationInfo.utilisateurId)
        .then(function (response) {
          resolve(response);
        })
        .catch(function (error) {
          reject(error);
        })
      });
    },
  },

  modules: {
  }
})