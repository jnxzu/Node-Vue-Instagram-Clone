<template>
  <nav class="nav">
    <div class="nav__inner">
      <nav-left />
      <nav-search />
      <nav-right />
    </div>
  </nav>
</template>

<script>
import NavLeft from './NavLeft.vue';
import NavSearch from './NavSearch.vue';
import NavRight from './NavRight.vue';

export default {
  name: 'Nav',
  components: {
    NavLeft,
    NavSearch,
    NavRight,
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
  width: 100vw;
  justify-content: center;
  border-bottom: 1px solid var(--border);
  background-color: #fff;

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
  }
}
</style>
