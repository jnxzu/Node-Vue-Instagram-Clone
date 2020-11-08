<template>
  <i @click="() => (this.liked = !this.liked)" :class="classObj"></i>
</template>

<script>
export default {
  name: 'LikedIcon',
  props: {
    liked: Boolean,
  },
  computed: {
    classObj() {
      return {
        'fa-heart': true,
        'fa-2x': true,
        far: !this.liked,
        fas: this.liked,
        colored: this.liked,
      };
    },
  },
};
</script>

<style lang="scss" scoped>
i {
  cursor: pointer;
  transition: 0.5s ease color;
  margin-right: 10px;
}

.colored {
  color: var(--accent);
}
</style>
