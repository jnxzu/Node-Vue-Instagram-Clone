<template>
  <div class="timelinepostcomments">
    <span class="view">View all 10 comments</span>
    <div class="comment">
      <router-link to="/u/catman">catman</router-link>
      thats so cool
    </div>
    <div class="comment">
      <router-link to="/u/catwoman">catwoman</router-link>
      wow
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimelinePostComments',
};
</script>

<style lang="scss" scoped>
.timelinepostcomments {
  margin-top: 5px;
  padding: 0 10px;

  .view {
    font-size: smaller;
    color: #888;
    cursor: pointer;
  }

  .comment {
    a {
      font-weight: 600;
    }
  }
}
</style>
