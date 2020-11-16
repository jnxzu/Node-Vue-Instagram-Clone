<template>
  <div class="timelinepostbuttons">
    <liked-icon :liked="false" />
    <likes-counter />
    <i class="far fa-comment fa-2x"></i>
    <i class="far fa-flag fa-2x"></i>
  </div>
</template>

<script>
import LikedIcon from '../LikedIcon.vue';
import LikesCounter from '../LikesCounter.vue';

export default {
  name: 'TimelinePostButtons',
  components: {
    LikedIcon,
    LikesCounter,
  },
};
</script>

<style lang="scss" scoped>
.timelinepostbuttons {
  height: 45px;
  display: flex;
  align-items: center;
  padding: 5px 10px;
  > i {
    cursor: pointer;
  }
  .fa-flag {
    margin-left: auto;
  }
}
</style>
