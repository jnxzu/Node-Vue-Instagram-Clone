<template>
  <div class="post" @click="goToPost(postId)">
    <div class="post__overlay">
      <i class="fas fa-heart"></i>
      <span>{{ likes.length }}</span>
      <i class="fas fa-comment"></i>
      <span>{{ comments.length }}</span>
    </div>
    <img :src="image" />
  </div>
</template>

<script>
export default {
  name: 'ProfilePost',
  props: {
    postId: String,
    image: String,
    likes: Array,
    comments: Array,
  },
  methods: {
    goToPost(id) {
      this.$router.push({ name: 'Post', params: { id } });
    },
  },
};
</script>

<style lang="scss" scoped>
.post {
  position: relative;
  cursor: pointer;
  height: 30vw;
  max-height: 250px;
  width: 30vw;
  max-width: 250px;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid var(--border);
  background: #fff;

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
    object-fit: contain;
    max-width: 100%;
    max-height: 100%;
  }
}
</style>
