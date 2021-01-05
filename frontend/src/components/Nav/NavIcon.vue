<template>
  <div :class="{ navicon: true, active: isActive }">
    <router-link :to="routeTarget">
      <img :src="'/img/' + imgSrc" :alt="imgAlt" :class="{ 'profile-pic': profile }" />
      <div class="navicon__selection"></div>
    </router-link>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'NavIcon',
  props: {
    profile: Boolean,
    imgSrc: String,
    imgAlt: String,
    routeTarget: String,
  },
  computed: {
    isActive() {
      if (this.profile) return this.$route.params.username === this.currentUser;
      return this.$route.name === this.imgAlt;
    },
    ...mapState({
      currentUser: (state) => state.user.currentUserName,
    }),
  },
};
</script>

<style lang="scss" scoped>
.navicon {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  cursor: pointer;
  height: 100%;

  transition: transform 0.25s ease-out;

  img {
    height: 30px;
  }

  &__selection {
    height: 3px;
    background: var(--accent);
    opacity: 0;
    transition: opacity 0.25s ease-out;
    width: 100%;
  }

  &.active,
  &:hover {
    .navicon__selection {
      opacity: 1;
    }
  }
}

.profile-pic {
  height: 30px;
  border-radius: 50%;
  border: 1px solid var(--border);
}
</style>
