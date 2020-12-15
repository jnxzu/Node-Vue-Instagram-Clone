<template>
  <div class="navright">
    <transition name="fade" mode="out-in">
      <nav-icon
        :profile="false"
        :routeTarget="'/'"
        :imgSrc="'home-icon.png'"
        :imgAlt="'Timeline'"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <nav-icon
        v-if="auth"
        :profile="false"
        :routeTarget="'/messages'"
        :imgSrc="'messages-icon.png'"
        :imgAlt="'Messages'"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <nav-icon
        v-if="auth"
        :profile="true"
        :routeTarget="`/u/${user}`"
        :imgSrc="avatar"
        :imgAlt="'Profile'"
      />
    </transition>
    <transition name="fade" mode="out-in">
      <nav-icon
        v-if="auth"
        :profile="false"
        :routeTarget="'/logout'"
        :imgSrc="'logout-icon.png'"
        :imgAlt="'Logout'"
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
      auth: (state) => state.isAuth,
      user: (state) => state.user.currentUserName,
      avatar: (state) => state.user.avatarUrl,
    }),
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

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease-out;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
