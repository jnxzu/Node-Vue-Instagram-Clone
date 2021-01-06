<template>
  <div class="timelinepostcomments">
    <span class="view">View all {{ comments.length }} comments</span>
    <div class="comment" v-for="(comment, idx) in displayComments" :key="idx">
      <router-link :to="`/u/${comment.author.username}`">{{ comment.author.username }}</router-link>
      {{ comment.content }}
    </div>
  </div>
</template>

<script>
export default {
  name: 'TimelinePostComments',
  props: {
    comments: Array,
  },
  computed: {
    displayComments() {
      if (this.comments.length < 2) return this.comments;
      return this.comments.slice(this.comments.length - 2).reverse();
    },
  },
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
}
</style>
