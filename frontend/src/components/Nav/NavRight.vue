<template>
  <div class="navright">
    <transition name="fade" mode="out-in">
      <nav-icon
        :profile="false"
        :routeTarget="'/'"
        :imgSrc="'/img/home-icon.png'"
        :imgAlt="'Timeline'"
        v-tooltip="'Timeline'"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <nav-icon
        v-if="auth"
        :profile="false"
        :routeTarget="'/new'"
        :imgSrc="'/img/new-post-icon.png'"
        :imgAlt="'New Post'"
        v-tooltip="'New Post'"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <nav-icon
        v-if="auth"
        :profile="false"
        :routeTarget="'/messages'"
        :imgSrc="'/img/messages-icon.png'"
        :imgAlt="'Messages'"
        v-tooltip="'Messages'"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <nav-icon
        v-if="auth"
        :profile="true"
        :routeTarget="`/u/${user}`"
        :imgSrc="avatar"
        :imgAlt="'Profile'"
        v-tooltip="'My Profile'"
        ref="profile"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <nav-icon
        v-if="admin"
        :profile="false"
        :routeTarget="'/admin'"
        :imgSrc="'/img/admin-icon.png'"
        :imgAlt="'Admin'"
        v-tooltip="'Admin Panel'"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <nav-icon
        v-if="auth"
        :profile="false"
        :routeTarget="'/logout'"
        :imgSrc="'/img/logout-icon.png'"
        :imgAlt="'Logout'"
        v-tooltip="'Logout'"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <nav-icon
        v-if="!auth"
        :profile="false"
        :routeTarget="'/login'"
        :imgSrc="'/img/login-icon.png'"
        :imgAlt="'Login'"
        v-tooltip="'Sign In'"
      />
    </transition>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NavIcon from './NavIcon.vue';

export default {
  name: 'NavRight',
  components: {
    NavIcon,
  },
  computed: {
    ...mapState({
      auth: (state) => state.isAuth || false,
      user: (state) => state.user.currentUserName,
      avatar: (state) => state.user.avatarUrl,
      admin: (state) => state.user.isAdmin || false,
    }),
  },
  methods: {
    reloadAvatarIcon() {
      this.$refs.profile.reloadAvatar();
    },
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

  @media (max-width: 700px) {
    margin: 0;
  }
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
