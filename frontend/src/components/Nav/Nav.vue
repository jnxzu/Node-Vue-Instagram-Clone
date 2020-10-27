<template>
  <nav class="nav">
    <div class="nav__inner">
      <div class="nav__inner__left">
        <router-link to="/">
          <img class="nav__inner__left__logo" src="img/logo.png" alt="Camra" />
        </router-link>
        <router-link to="/">
          <h1 class="nav__inner__left__name">Camra</h1>
        </router-link>
      </div>
      <nav-search />
      <div class="nav__inner__right">
        <nav-icon
          :profile="false"
          :isRoute="true"
          :routeTarget="'/'"
          :imgSrc="'home-icon.png'"
          :imgAlt="'Timeline'"
        />
        <nav-icon
          :profile="false"
          :isRoute="true"
          :routeTarget="'/messages'"
          :imgSrc="'messages-icon.png'"
          :imgAlt="'Messages'"
        />
        <nav-icon
          :profile="true"
          :isRoute="true"
          :routeTarget="'/u/me'"
          :imgSrc="'profile.jpg'"
          :imgAlt="'Profile'"
        />
        <nav-icon
          :profile="false"
          :isRoute="false"
          :routeTarget="''"
          :imgSrc="'logout-icon.png'"
          :imgAlt="'Logout'"
        />
      </div>
    </div>
  </nav>
</template>

<script>
import NavSearch from './NavSearch.vue';
import NavIcon from './NavIcon.vue';

export default {
  name: 'Nav',
  components: {
    NavSearch,
    NavIcon,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&display=swap');

.nav {
  height: 55px;
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  justify-content: center;
  border-bottom: 1px solid var(--border);

  &__inner {
    height: 100%;
    width: 100%;
    max-width: 975px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 600px) {
      justify-content: space-between;
    }

    &__left {
      max-height: 55px;
      width: 30%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-left: 10px;

      &__logo {
        font-family: 'Amatic SC', cursive;
        cursor: pointer;
        height: 50px;
      }

      &__name {
        font-family: 'Amatic SC', cursive;
        cursor: pointer;
        font-size: xx-large;
      }
    }

    &__right {
      height: 100%;
      width: 30%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-right: 10px;
    }
  }
}
</style>
