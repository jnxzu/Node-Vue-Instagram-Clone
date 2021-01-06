<template>
  <div class="comment">
    <div class="comment__avatar"><img :src="avatar || '/img/profile-default.png'" /></div>
    <div class="comment__content">
      <p>
        <router-link :to="`/u/${poster}`">{{ poster }} </router-link>{{ content }}
      </p>
      <span>{{ formatDate }}</span>
    </div>
  </div>
</template>

<script>
import moment from 'moment';

export default {
  name: 'PostComment',
  props: {
    avatar: String,
    poster: String,
    content: String,
    date: Date,
  },
  computed: {
    formatDate() {
      return moment(this.date).fromNow();
    },
  },
};
</script>

<style lang="scss" scoped>
.comment {
  margin: 5px 15px 10px 15px;
  display: flex;

  &__avatar {
    width: 30px;
    margin: 10px 10px 10px 0;

    img {
      height: 30px;
      border-radius: 50%;
    }
  }

  &__content {
    flex-grow: 1;

    span {
      font-size: smaller;
      color: #888;
    }
  }
}
</style>
