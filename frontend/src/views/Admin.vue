<template>
  <div class="admin" v-if="ready">
    <reported-post />
    <reported-post />
  </div>
  <img class="loading-gif" src="/img/loading.gif" v-else />
</template>

<script>
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
      timeout: null,
    };
  },
  computed: {
    ...mapState({ admin: (state) => state.user.isAdmin }),
  },
  methods: {
    checkReady() {
      if (this.admin) this.ready = true;
      else this.$router.push('404');
    },
  },
  created() {
    this.timeout = setTimeout(this.checkReady, 500);
  },
  destroyed() {
    clearTimeout(this.timeout);
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
