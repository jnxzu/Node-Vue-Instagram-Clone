<template>
  <div id="app">
    <Nav />
    <main>
      <transition name="fade" mode="out-in">
        <router-view />
      </transition>
    </main>
  </div>
</template>

<script>
import Nav from './components/Nav/Nav.vue';

export default {
  name: 'App',
  components: {
    Nav,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;700&display=swap');
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
  --bg: #fafafa;
  --accent: rgb(247, 142, 88);
  --border: #dbdbdb;
}

body {
  overflow-x: hidden;
  font-size: 14px;
}

a {
  font-weight: 700;
  color: black;
  text-decoration: none;
  &:active,
  &:focus {
    outline: none;
  }
  &:hover {
    text-decoration: underline;
  }
}

#app {
  width: 100vw;
}

main {
  background: var(--bg);
  margin-top: 55px;
  min-height: calc(100vh - 55px);
  overflow: hidden;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
