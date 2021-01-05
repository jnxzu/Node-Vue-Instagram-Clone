<template>
  <div class="notfound">
    <h1 class="fourohfour">404</h1>
    <h3 class="sorry">...sorry</h3>
  </div>
</template>

<script>
export default {
  name: 'NotFound',
};
</script>

<style lang="scss">
.notfound {
  width: 100%;
  height: calc(100vh - 55px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}
.fourohfour {
  font-family: 'Amatic SC', cursive;
  font-size: 5em;
}
.sorry {
  font-family: 'Amatic SC', cursive;
}
</style>
