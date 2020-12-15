/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    isAuth: false,
    user: {
      isAdmin: false,
      currentUserId: '',
      currentUserName: '',
      avatarUrl: 'profile-default.png',
    },
  },
  mutations: {
    CHANGE_USER_STATE(state, payload) {
      state.user = { ...state.user, ...payload };
      state.isAuth = !state.isAuth;
    },
  },
  actions: {
    updateUserState({ commit }, data) {
      commit('CHANGE_USER_STATE', data);
    },
  },
});
