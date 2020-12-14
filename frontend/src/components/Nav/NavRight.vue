<template>
  <div class="navright">
    <nav-icon
      :profile="false"
      :isRoute="true"
      :routeTarget="'/'"
      :imgSrc="'home-icon.png'"
      :imgAlt="'Timeline'"
    />
    <nav-icon
      v-if="auth"
      :profile="false"
      :isRoute="true"
      :routeTarget="'/messages'"
      :imgSrc="'messages-icon.png'"
      :imgAlt="'Messages'"
    />
    <nav-icon
      v-if="auth"
      :profile="true"
      :isRoute="true"
      :routeTarget="`/u/${user}`"
      :imgSrc="'profile-default.png'"
      :imgAlt="'Profile'"
    />
    <nav-icon
      v-if="auth"
      @click.native="logout"
      :profile="false"
      :isRoute="false"
      :routeTarget="''"
      :imgSrc="'logout-icon.png'"
      :imgAlt="'Logout'"
    />
  </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import NavIcon from './NavIcon.vue';

export default {
  name: 'NavRight',
  components: {
    NavIcon,
  },
  computed: {
    ...mapState({
      auth: (state) => state.isAuth,
      user: (state) => state.user.currentUserName,
    }),
  },
  methods: {
    logout() {
      this.updateUserState({
        currentUserId: '',
        currentUserName: '',
        isAdmin: false,
      });
      this.$router.push({ name: 'Login' });
    },
    ...mapActions(['updateUserState']),
  },
};
</script>

<style lang="scss" scoped>
.navright {
  height: 100%;
  width: 30%;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  margin-right: 10px;
}
</style>
