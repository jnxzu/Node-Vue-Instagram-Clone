<template>
  <div id="app">
    <Nav />
    <main>
      <router-view />
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
  font-weight: 600;
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
</style>
