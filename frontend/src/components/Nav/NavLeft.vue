<template>
  <div class="navleft">
    <router-link to="/">
      <img class="navleft__logo" src="/img/logo.png" alt="Camra" />
    </router-link>
    <router-link to="/">
      <h1 class="navleft__name">Camra</h1>
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'NavLeft',
};
</script>

<style lang="scss" scoped>
.navleft {
  max-height: 55px;
  width: 30%;
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-left: 10px;

  @media (max-width: 700px) {
    margin: 0;
  }

  a:hover {
    text-decoration: none;
  }

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
</style>
