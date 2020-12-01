<template>
  <div class="timelinepost">
    <div class="timelinepost__top">
      <router-link :to="'/u/' + this.poster">
        <img :src="this.avatar" />
      </router-link>
      <router-link :to="'/u/' + this.poster"> {{ poster }} </router-link>
    </div>
    <div class="timelinepost__image">
      <img :src="this.imageUrl" />
    </div>
    <div class="timelinepost__bottom">
      <div class="timelinepost__bottom__buttons">
        <liked-icon :liked="this.liked" />
        <i class="far fa-comment fa-2x"></i>
        <i class="far fa-flag fa-2x"></i>
      </div>
      <likes-counter :liked="this.likes" />
      <div class="timelinepost__bottom__desc">
        <p>
          <router-link :to="'/u/' + this.poster">{{ poster }}</router-link> {{ desc }}
        </p>
      </div>
      <timeline-post-comments :comments="this.comments" />
      <div class="timelinepost__bottom__date">
        <span>{{ date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import TimelinePostComments from './TimelinePostComments.vue';
import LikesCounter from './LikesCounter.vue';
import LikedIcon from './LikedIcon.vue';

export default {
  name: 'TimelinePost',
  components: {
    TimelinePostComments,
    LikesCounter,
    LikedIcon,
  },
  props: {
    poster: String,
    avatar: String,
    imageUrl: String,
    likes: Array,
    comments: Array,
    liked: Boolean,
    desc: String,
    date: String,
  },
};
</script>

<style lang="scss" scoped>
.timelinepost {
  background: #fff;
  max-width: 615px;
  margin: 0 auto 60px auto;
  border: 1px solid var(--border);
  display: flex;
  flex-direction: column;

  &__top {
    height: 60px;
    display: flex;
    align-items: center;
    padding-left: 15px;

    a {
      margin-right: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
    }

    img {
      width: 40px;
      height: 40px;
      border-radius: 50%;
    }
  }

  &__image {
    background: var(--bg);
    display: flex;
    align-items: center;
    justify-content: center;

    img {
      width: 100%;
    }
  }

  &__bottom {
    &__buttons {
      height: 45px;
      display: flex;
      align-items: center;
      padding: 5px 10px;
      > i {
        cursor: pointer;
      }
      .fa-comment {
        margin-left: 5px;
      }
      .fa-flag {
        margin-left: auto;
      }
    }

    &__desc {
      padding: 0 10px;

      a {
        display: inline;
      }
    }

    &__date {
      padding: 5px 10px;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      font-size: smaller;
      color: #aaa;
    }
  }
}
</style>
