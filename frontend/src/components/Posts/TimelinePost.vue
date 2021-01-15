<template>
  <div class="timelinepost">
    <div class="timelinepost__top">
      <router-link :to="'/u/' + poster.username">
        <img
          :src="foundAvatar ? avatarSource : defaultAvatar"
          @error="() => (this.foundAvatar = false)"
        />
      </router-link>
      <router-link :to="'/u/' + poster.username"> {{ poster.username }} </router-link>
    </div>
    <div class="timelinepost__image">
      <img :src="imageUrl" />
    </div>
    <div class="timelinepost__bottom">
      <div class="timelinepost__bottom__buttons">
        <liked-icon :liked="liked" :postId="id" @like-toggle="catchLikeToggle" />
        <i
          class="far fa-comment fa-2x"
          v-tooltip="'Comment'"
          @click="() => $router.push(`/p/${id}`)"
        ></i>
        <transition name="fade">
          <img
            v-if="!hideReport"
            src="/img/report-icon.png"
            v-tooltip="{ content: 'Report' }"
            @click="report"
          />
        </transition>
      </div>
      <likes-counter :likesCount="likesArray.length" />
      <div class="timelinepost__bottom__desc">
        <p>
          <router-link :to="'/u/' + poster.username">{{ poster.username }}</router-link> {{ desc }}
        </p>
      </div>
      <timeline-post-comments v-if="comments.length > 0" :comments="comments" />
      <div class="timelinepost__bottom__date">
        <span>{{ date }}</span>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable no-prototype-builtins */
import { mapState } from 'vuex';
import axios from 'axios';
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
      foundAvatar: true,
      defaultAvatar: '/img/profile-default.png',
      likesArray: this.likes.map((l) => l._id),
    };
  },
  props: {
    id: String,
    poster: Object,
    imageUrl: String,
    likes: Array,
    comments: Array,
    desc: String,
    date: String,
  },
  computed: {
    ...mapState({
      currentUserId: (state) => state.user.currentUserId,
    }),
    avatarSource() {
      return `https://firebasestorage.googleapis.com/v0/b/camra-4feb8.appspot.com/o/${this.poster.username}_avatar?alt=media`;
    },
    liked() {
      return this.likesArray.includes(this.currentUserId);
    },
  },
  methods: {
    report() {
      if (this.currentUserId) {
        const url = `${
          process.env.NODE_ENV === 'production'
            ? process.env.VUE_APP_API_PROD
            : process.env.VUE_APP_API_DEV
        }/post/${this.id}/flag`;

        this.hideReport = true;

        axios.patch(url, { reported: false });
      } else {
        this.$router.push({ name: 'Login' });
      }
    },
    catchLikeToggle(val) {
      if (val) {
        this.likesArray.push(this.currentUserId);
      } else {
        this.likesArray = this.likesArray.filter((id) => id !== this.currentUserId);
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

  @media (max-width: 700px) {
    margin: 0 auto 30px auto;
  }

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
    background: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid var(--border);
    border-top: 1px solid var(--border);

    img {
      max-width: 100%;
      max-height: 65vh;
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
