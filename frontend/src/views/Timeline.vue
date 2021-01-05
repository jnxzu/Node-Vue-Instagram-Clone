<template>
  <div class="timeline" v-if="ready">
    <timeline-post
      v-for="post in posts"
      :key="post._id"
      :id="post._id"
      :poster="post.poster.username"
      :avatar="post.poster.avatarUrl || '/img/profile-default.png'"
      :imageUrl="post.imageUrl"
      :likes="post.likes"
      :comments="post.comments"
      :liked="post.likes.map((l) => l._id).includes(currentUserId)"
      :desc="post.description"
      :date="post.date"
    />
  </div>
  <img class="loading-gif" src="/img/loading.gif" v-else />
</template>

<script>
/* eslint-disable no-return-assign */
/* eslint-disable no-param-reassign */
import axios from 'axios';
import moment from 'moment';
import { mapState } from 'vuex';
import TimelinePost from '../components/Posts/TimelinePost.vue';

export default {
  name: 'Timeline',
  components: {
    TimelinePost,
  },
  data() {
    return {
      posts: [],
      ready: false,
      currentPage: 1,
    };
  },
  computed: {
    ...mapState({
      currentUserId: (state) => state.user.currentUserId,
    }),
  },
  methods: {
    getPosts() {
      const url = `${
        process.env.NODE_ENV === 'production'
          ? process.env.VUE_APP_API_PROD
          : process.env.VUE_APP_API_DEV
      }/PostRoutes/timeline`;

      axios
        .get(url, { params: { userId: this.currentUserId, currentPage: this.currentPage } })
        .then((res) => {
          this.currentPage += 1;
          this.posts = res.data;
          this.posts.forEach((post) => (post.date = moment(post.date).format('Do MMMM YYYY')));
          this.ready = true;
        });
    },
  },
  mounted() {
    this.getPosts();
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
