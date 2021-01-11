<template>
  <div class="reportedpost">
    <div class="reportedpost__image">
      <img :src="image" />
    </div>
    <div class="reportedpost__controls">
      <button class="ok" @click="approvePost(id)">Approve</button>
      <button class="nah" @click="deletePost(id)">Delete</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ReportedPost',
  props: {
    id: String,
    image: String,
  },
  methods: {
    approvePost(postId) {
      const url = `${
        process.env.NODE_ENV === 'production'
          ? process.env.VUE_APP_API_PROD
          : process.env.VUE_APP_API_DEV
      }/post/${postId}/flag`;

      axios.patch(url, { reported: true }).then(() => this.$emit('delete-post-from-list', postId));
    },
    deletePost(postId) {
      const url = `${
        process.env.NODE_ENV === 'production'
          ? process.env.VUE_APP_API_PROD
          : process.env.VUE_APP_API_DEV
      }/delete/${postId}`;

      axios.delete(url).then(() => this.$emit('delete-post-from-list', postId));
    },
  },
};
</script>

<style lang="scss" scoped>
.reportedpost {
  max-width: 975px;
  display: flex;
  margin-bottom: 50px;

  @media (max-width: 975px) {
    flex-direction: column;
    max-width: 600px;
    margin: 20px auto 50px auto;
    border: 1px solid var(--border);
  }

  &__image {
    display: flex;
    flex-direction: column;

    @media (min-width: 976px) {
      width: 66%;

      img {
        max-width: 100%;
        max-height: 400px;
        align-self: center;
      }
    }
  }

  &__controls {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 975px) {
      flex-direction: row;
    }

    button {
      margin: 30px;
      height: 50px;
      font-size: larger;
      border: 1px solid var(--border);
      cursor: pointer;
      transition: all 0.25s ease-out;

      @media (max-width: 975px) {
        margin: 0;
        flex-grow: 1;
      }

      @media (min-width: 976px) {
        &:hover {
          scale: 1.1;
        }
      }

      &.ok {
        background: lightgreen;
      }

      &.nah {
        background: lightcoral;
      }
    }
  }
}
</style>
