import Vue from 'vue';
import Vuex from 'vuex';

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
    login({ commit }, data) {},
  },
});
