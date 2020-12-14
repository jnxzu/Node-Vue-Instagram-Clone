import Vue from 'vue';
import Vuex from 'vuex';
import axios from 'axios';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuth: false,
    isAdmin: false,
    currentUserId: '',
    currentUserName: '',
  },
  mutations: {},
  actions: {
    register({ commit }, data) {},
    login({ commit }, data) {
      axios
        .post('https://europe-west1-camra-4feb8.cloudfunctions.net/api/UserRoutes/login', {
          username: data.username,
          password: data.password,
        })
        .then((res) => console.log(res));
    },
  },
});
