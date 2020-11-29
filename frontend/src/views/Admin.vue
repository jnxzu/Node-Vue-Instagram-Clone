<template>
  <div class="admin">
    <reported-post />
    <reported-post />
  </div>
</template>

<script>
import ReportedPost from '../components/Posts/ReportedPost.vue';

export default {
  name: 'Admin',
  components: {
    ReportedPost,
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
