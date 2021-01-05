<template>
  <div class="timeline">
    <timeline-post
      :poster="'catfan'"
      :avatar="'https://placekitten.com/150/150'"
      :imageUrl="'https://placekitten.com/600/900'"
      :likes="[]"
      :comments="[]"
      :liked="true"
      :desc="'how YOU doin'"
      :date="'25 Nov 2020'"
    />
    <timeline-post
      :poster="'cattt'"
      :avatar="'https://placekitten.com/150/150'"
      :imageUrl="'https://placekitten.com/600/600'"
      :likes="[]"
      :comments="[]"
      :liked="false"
      :desc="'my desc bla bla bla'"
      :date="'24 Nov 2020'"
    />
    <timeline-post
      :poster="'fuckdogs'"
      :avatar="'https://placekitten.com/150/150'"
      :imageUrl="'https://placekitten.com/600/300'"
      :likes="[]"
      :comments="[]"
      :liked="false"
      :desc="' consequatur itaque esse iste, cumque delectus at sequi deserunt in.'"
      :date="'23 Nov 2020'"
    />
  </div>
</template>

<script>
import axios from 'axios';
import TimelinePost from '../components/Posts/TimelinePost.vue';

export default {
  name: 'Timeline',
  components: {
    TimelinePost,
  },
  mounted() {
    const url = `${
      process.env.NODE_ENV === 'production'
        ? process.env.VUE_APP_API_PROD
        : process.env.VUE_APP_API_DEV
    }/PostRoutes/timeline`;

    axios.get(url, { userId: '', currentPage: 1 }).then((res) => console.log(res));
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
