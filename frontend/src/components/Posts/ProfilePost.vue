<template>
  <div class="post" @click="goToPost('test')">
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
  methods: {
    goToPost(id) {
      this.$router.push({ name: 'Post', id });
    },
  },
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
    display: flex;
    align-items: center;
    justify-content: center;

    i,
    span {
      opacity: 1;
      font-size: x-large;
      color: white;
    }

    span {
      margin-left: 5px;
    }

    i ~ i {
      margin-left: 10%;
    }

    &:hover {
      opacity: 0.5;
    }
  }

  img {
    object-fit: cover;
    width: 100%;
    height: 100%;
  }
}
</style>
