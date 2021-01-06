<template>
  <div class="likescounter">
    <span>
      <span class="bolder">{{ likes.length }}</span> like(s)
    </span>
  </div>
</template>

<script>
export default {
  name: 'LikesCounter',
  props: {
    likes: Array,
  },
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
    font-weight: 700;
  }

  img {
    height: 100%;
    border-radius: 50%;
    margin-right: 3px;
  }
}
</style>
