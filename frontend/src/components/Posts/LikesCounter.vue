<template>
  <div class="likescounter">
    <span>
      <span class="bolder">{{ likesCount }}</span> {{ likesCount !== 1 ? 'likes' : 'like' }}
    </span>
  </div>
</template>

<script>
export default {
  name: 'LikesCounter',
  props: {
    likesCount: Number,
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
