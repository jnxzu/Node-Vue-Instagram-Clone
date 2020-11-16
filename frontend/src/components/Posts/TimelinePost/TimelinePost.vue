<template>
  <div class="timelinepost">
    <timeline-post-top />
    <div class="timelinepost__image">
      <img src="https://placekitten.com/614/640" />
    </div>
    <div class="timelinepost__bottom">
      <timeline-post-buttons />
      <timeline-post-desc />
      <timeline-post-comments />
      <timeline-post-date />
    </div>
  </div>
</template>

<script>
import TimelinePostTop from './TimelinePostTop.vue';
import TimelinePostButtons from './TimelinePostButtons.vue';
import TimelinePostDesc from './TimelinePostDesc.vue';
import TimelinePostComments from './TimelinePostComments.vue';
import TimelinePostDate from './TimelinePostDate.vue';

export default {
  name: 'TimelinePost',
  components: {
    TimelinePostTop,
    TimelinePostButtons,
    TimelinePostDesc,
    TimelinePostComments,
    TimelinePostDate,
  },
};
</script>

<style lang="scss" scoped>
.timelinepost {
  background: #fff;
  max-width: 615px;
  margin: 0 auto 60px auto;
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;

  &__image {
    width: 100%;
    img {
      max-width: 100%;
      max-height: 100%;
      object-fit: cover;
    }
  }
}
</style>
