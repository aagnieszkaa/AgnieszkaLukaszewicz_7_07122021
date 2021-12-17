import { createStore } from 'vuex'

const axios = require('axios');
const instance = axios.create({
  baseURL: 'http://localhost:3000/api/'
});

export default createStore({
  state: {
  },
  mutations: {
  },
  actions: {
    signup: ({commit}, utilisateurInfo) => {
      commit;
      instance.post('/auth/signup', utilisateurInfo)
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    }
  },
  modules: {
  }
})
