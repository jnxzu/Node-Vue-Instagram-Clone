<template>
  <div :class="{ navicon: !profile, navprofile: profile, active: isActive }" v-if="isRoute">
    <router-link :to="routeTarget">
      <img :src="'/img/' + imgSrc" :alt="imgAlt" />
      <div class="navicon__selection"></div>
    </router-link>
  </div>
  <div :class="{ navicon: !profile, navprofile: profile }" v-else>
    <img :src="'/img/' + imgSrc" :alt="imgAlt" />
  </div>
</template>

<script>
export default {
  name: 'NavIcon',
  props: {
    profile: Boolean,
    imgSrc: String,
    imgAlt: String,
    routeTarget: String,
    isRoute: Boolean,
  },
  computed: {
    isActive() {
      return this.$route.name === this.imgAlt;
    },
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

  img {
    height: 30px;
  }

  &__selection {
    height: 3px;
    background: var(--accent);
    opacity: 0;
    transition: 0.25s ease-out;
    width: 100%;
  }

  &.active,
  &:hover {
    .navicon__selection {
      opacity: 1;
    }
  }
}

.navprofile {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-right: 15px;
  height: 100%;

  img {
    height: 30px;
    border-radius: 50%;
    border: 1px solid var(--border);
  }

  &__selection {
    height: 3px;
    background: var(--accent);
    opacity: 0;
    transition: 0.25s ease-out;
  }

  &.active,
  &:hover {
    .navicon__selection {
      opacity: 1;
    }
  }
}
</style>
