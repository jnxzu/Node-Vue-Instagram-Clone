<template>
  <div id="app">
    <Nav />
    <div class="main">
      <router-view />
    </div>
  </div>
</template>

<script>
import Nav from './components/Nav.vue';

export default {
  name: 'App',
  components: {
    Nav,
  },
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;700&display=swap');

* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  font-family: 'Open Sans', sans-serif;
  --bg: #fafafa;
  --accent: rgb(247, 142, 88);
  --border: #dbdbdb;
}

a {
  color: black;
  text-decoration: none;
}

#app {
  width: 100vw;
}

.main {
  background: var(--bg);
  margin-top: 55px;
}
</style>
