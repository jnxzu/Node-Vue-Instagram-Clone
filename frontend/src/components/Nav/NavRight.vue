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
</template>

<script>
import NavIcon from './NavIcon.vue';

export default {
  name: 'NavRight',
  components: {
    NavIcon,
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
