<template>
  <div class="likescounter">
    <img src="https://placekitten.com/50/50" />
    <span>
      Liked by
      <router-link to="/u/kittenlover">kittenlover</router-link>
      and
      <span class="bolder">1234</span> others
    </span>
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
  display: flex;
  align-items: center;

  .bolder {
    font-weight: 600;
  }

  img {
    height: 100%;
    border-radius: 50%;
    margin-right: 3px;
  }

  > span {
    margin-left: 5px;
  }
}
</style>
