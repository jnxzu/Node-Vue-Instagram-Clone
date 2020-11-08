<template>
  <div :class="{ navicon: !profile, navprofile: profile, active: isActive }" v-if="isRoute">
    <router-link :to="routeTarget">
      <img :src="'img/' + imgSrc" :alt="imgAlt" />
      <div class="navicon__selection"></div>
    </router-link>
  </div>
  <div :class="{ navicon: !profile, navprofile: profile }" v-else>
    <img :src="'img/' + imgSrc" :alt="imgAlt" />
    <div class="navicon__selection"></div>
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

<style lang="scss">
.navicon {
  display: flex;
  flex-direction: column;
  margin-right: 15px;
  cursor: pointer;

  img {
    height: 30px;
  }

  &__selection {
    background: var(--accent);
  }

  &.active,
  &:hover {
    .navicon__selection {
      height: 3px;
    }
  }
}

.navprofile {
  display: flex;
  flex-direction: column;
  margin-right: 15px;

  img {
    height: 36px;
    border-radius: 50%;
    border: 1px solid var(--border);
  }

  &__selection {
    background: var(--accent);
  }

  &.active,
  &:hover {
    .navicon__selection {
      height: 3px;
    }
  }
}
</style>
