<template>
  <div class="timeline">
    <timeline-post />
    <timeline-post />
  </div>
</template>

<script>
import TimelinePost from '../components/Posts/TimelinePost/TimelinePost.vue';

export default {
  name: 'Timeline',
  components: {
    TimelinePost,
  },
};
</script>

<style lang="scss">
.timeline {
  margin: 0 auto;
  max-width: 975px;
  padding-top: 30px;

  @media (max-width: 600px) {
    padding-top: 0;
  }
}
</style>
