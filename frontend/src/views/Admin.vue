<template>
  <div class="admin" v-if="ready">
    <reported-post />
    <reported-post />
  </div>
  <img class="loading-gif" src="/img/loading.gif" v-else />
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
import ReportedPost from '../components/Posts/ReportedPost.vue';

export default {
  name: 'Admin',
  components: {
    ReportedPost,
  },
  data() {
    return {
      ready: false,
      posts: [],
    };
  },
  computed: {
    ...mapState({ admin: (state) => state.user.isAdmin }),
  },
  methods: {
    getPosts() {
      if (this.admin) {
        const url = `${
          process.env.NODE_ENV === 'production'
            ? process.env.VUE_APP_API_PROD
            : process.env.VUE_APP_API_DEV
        }/login`;
      } else this.$router.push('404');
    },
  },
};
</script>

<style lang="scss">
.admin {
  margin: 0 auto;
  max-width: 975px;
  padding-top: 30px;

  @media (max-width: 600px) {
    padding-top: 0;
  }
}
</style>
