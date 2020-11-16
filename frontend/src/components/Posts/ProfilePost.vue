<template>
  <div class="post">
    <div class="post__overlay">
      <i class="fas fa-heart"></i>
      <span>5</span>
      <i class="fas fa-comment"></i>
      <span>5</span>
    </div>
    <img src="https://placekitten.com/215/215" />
  </div>
</template>

<script>
export default {
  name: 'ProfilePost',
};
</script>

<style lang="scss" scoped>
.post {
  flex-grow: 1;
  max-width: 31%;
  position: relative;
  cursor: pointer;

  &__overlay {
    background: black;
    height: 100%;
    width: 100%;
    position: absolute;
    top: 0;
    opacity: 0;

    &:hover {
      opacity: 0.33;
    }
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
</style>
