<template>
  <div class="post">
    <router-link to="/p/test">
      <div class="post__overlay"></div>
      <img src="https://placekitten.com/215/215" />
    </router-link>
  </div>
</template>

<script>
export default {
  name: 'ProfilePost',
};
</script>

<style lang="scss" scoped>
.post {
  // z-index: -1;
  flex-grow: 1;
  max-width: 31%;
  position: relative;
  cursor: pointer;

  a {
    height: 100%;
    width: 100%;

    div {
      background: black;
      height: 100%;
      width: 100%;
      position: absolute;
      top: 0;
      left: 0;
      opacity: 0;

      &:hover {
        opacity: 0.3;
      }
    }

    img {
      width: 100%;
    }
  }
}
</style>
