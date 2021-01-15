<template>
  <div class="timeline" v-if="ready">
    <timeline-post
      v-for="post in posts"
      :key="post._id"
      :id="post._id"
      :poster="post.poster"
      :imageUrl="post.imageUrl"
      :likes="post.likes"
      :comments="post.comments"
      :desc="post.description"
      :date="post.date"
    />
    <span v-observe-visibility="handleScroll" />
  </div>
  <img class="loading-gif" src="/img/loading.gif" v-else />
</template>

<script>
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
      pageToRequest: 1,
      timeout: null,
      nextPage: true,
    };
  },
  computed: {
    ...mapState({
      currentUserId: (state) => state.user.currentUserId,
    }),
  },
  methods: {
    handleScroll(visible, _) {
      if (visible && this.nextPage) {
        this.getPosts();
      }
    },
    getPosts() {
      const url = `${
        process.env.NODE_ENV === 'production'
          ? process.env.VUE_APP_API_PROD
          : process.env.VUE_APP_API_DEV
      }/timeline`;

      axios
        .get(url, { params: { userId: this.currentUserId, currentPage: this.pageToRequest } })
        .then((res) => {
          this.pageToRequest += 1;
          const newPosts = res.data.docs;
          this.nextPage = res.data.np;
          newPosts.forEach((post) => (post.date = moment(post.date).format('Do MMMM YYYY')));
          this.posts = [...this.posts, ...newPosts];
          this.timeout = setTimeout(this.makeReady, 500);
        });
    },
    makeReady() {
      this.ready = true;
    },
  },
  mounted() {
    this.getPosts();
  },
  destroyed() {
    clearTimeout(this.timeout);
  },
};
</script>

<style lang="scss">
.timeline {
  margin: 0 auto;
  max-width: 975px;
  padding-top: 30px;

  @media (max-width: 700px) {
    padding-top: 0;
  }
}
</style>
