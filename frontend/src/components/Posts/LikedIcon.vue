<template>
  <i @click="() => (this.likedVal = !this.likedVal)" :class="classObj"></i>
</template>

<script>
export default {
  name: 'LikedIcon',
  props: {
    liked: Boolean,
  },
  data() {
    return {
      likedVal: this.liked,
    };
  },
  computed: {
    classObj() {
      return {
        'fa-heart': true,
        'fa-2x': true,
        far: !this.likedVal,
        fas: this.likedVal,
        colored: this.likedVal,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
i {
  cursor: pointer;
  transition: 0.5s ease-out color;
}

.colored {
  color: var(--accent);
}
</style>
