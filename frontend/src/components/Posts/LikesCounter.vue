<template>
  <div class="likescounter">
    liked by <router-link to="u/kittenlover">kittenlover</router-link>,
    <router-link to="u/ilikecats">ilikecats</router-link> and
    <span class="bolder">1289371289</span> others
  </div>
</template>

<script>
export default {
  name: 'LikesCounter',
};
</script>

<style lang="scss" scoped>
.likescounter {
  font-size: smaller;
  height: 25px;
  padding: 0 10px;

  .bolder {
    font-weight: 600;
  }
}
</style>
