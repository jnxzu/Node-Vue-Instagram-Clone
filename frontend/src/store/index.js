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
      avatarUrl: '',
    },
  },
  mutations: {
    CHANGE_USER_STATE(state, payload) {
      state.user = { ...state.user, ...payload };
      state.isAuth = !state.isAuth;
    },
    CHANGE_AVATAR(state, payload) {
      state.user.avatarUrl = payload;
    },
  },
  actions: {
    updateUserState({ commit }, data) {
      commit('CHANGE_USER_STATE', data);
    },
    setAvatar({ commit }, url) {
      commit('CHANGE_AVATAR', url);
    },
  },
});
