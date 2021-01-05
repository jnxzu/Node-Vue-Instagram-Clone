<template>
  <div class="timelinepost">
    <div class="timelinepost__top">
      <router-link :to="'/u/' + poster">
        <img :src="avatar" />
      </router-link>
      <router-link :to="'/u/' + poster"> {{ poster }} </router-link>
    </div>
    <div class="timelinepost__image">
      <img :src="imageUrl" />
    </div>
    <div class="timelinepost__bottom">
      <div class="timelinepost__bottom__buttons">
        <liked-icon :liked="liked" :postId="id" />
        <i
          class="far fa-comment fa-2x"
          v-tooltip="'Comment'"
          @click="() => $router.push(`/p/${id}`)"
        ></i>
        <img
          src="/img/report-icon.png"
          :class="{ hideReport: hideReport }"
          v-tooltip="{ content: 'Report', classes: { hideReport: hideReport } }"
          @click="report"
        />
      </div>
      <likes-counter :liked="likes" />
      <div class="timelinepost__bottom__desc">
        <p>
          <router-link :to="'/u/' + poster">{{ poster }}</router-link> {{ desc }}
        </p>
      </div>
      <timeline-post-comments :comments="comments" />
      <div class="timelinepost__bottom__date">
        <span>{{ date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import { mapState } from 'vuex';
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
  data() {
    return {
      hideReport: false,
    };
  },
  props: {
    id: String,
    poster: String,
    avatar: String,
    imageUrl: String,
    likes: Array,
    comments: Array,
    liked: Boolean,
    desc: String,
    date: String,
  },
  computed: {
    ...mapState({
      currentUserId: (state) => state.user.currentUserId,
    }),
  },
  methods: {
    report() {
      if (this.currentUserId) {
        const url = `${
          process.env.NODE_ENV === 'production'
            ? process.env.VUE_APP_API_PROD
            : process.env.VUE_APP_API_DEV
        }/PostRoutes/post/${this.id}/flag`;

        this.hideReport = true;

        axios.patch(url, { reported: false });
      } else {
        this.$router.push({ name: 'Login' });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.hideReport {
  opacity: 0;
}

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
        margin-left: 10px;
      }
      img {
        margin-left: auto;
        cursor: pointer;
        height: 30px;
        transition: all 0.25s ease-out;
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
