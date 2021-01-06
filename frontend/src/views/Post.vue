<template>
  <div class="post-container" v-if="ready">
    <div class="post">
      <div class="post__image">
        <img :src="image" />
      </div>
      <div class="post__info">
        <div class="post__info__top">
          <img src="/img/profile-default.png" />
          <div class="post__info__top__text">
            <router-link :to="`/u/${poster.username}`">{{ poster.username }}</router-link>
            <span>{{ formattedDate }}</span>
          </div>
          <transition name="fade">
            <img
              class="post__info__top__report"
              v-if="!hideReport"
              src="/img/report-icon.png"
              v-tooltip="{ content: 'Report' }"
              @click="report"
            />
          </transition>
        </div>
        <div class="post__info__comments">
          <post-comment
            v-for="(comment, idx) in comments"
            :key="idx"
            :avatar="comment.author.avatarUrl"
            :poster="comment.author.username"
            :content="comment.content"
          />
        </div>
        <div class="post__info__controls">
          <liked-icon :liked="liked" :postId="id" @like-toggle="catchLikeToggle" />
          <likes-counter :likes="likes" />
        </div>
        <div class="post__info__input">
          <form @submit.prevent="() => {}">
            <textarea v-model="newComment" placeholder="Your comment..."></textarea>
            <button :class="{ valid: validInput }" @click="postComment">Post</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  <img class="loading-gif" src="/img/loading.gif" v-else />
</template>

<script>
/* eslint-disable no-underscore-dangle */
/* eslint-disable no-prototype-builtins */
import axios from 'axios';
import moment from 'moment';
import { mapState } from 'vuex';
import LikedIcon from '../components/Posts/LikedIcon.vue';
import LikesCounter from '../components/Posts/LikesCounter.vue';
import PostComment from '../components/Posts/PostComment.vue';

export default {
  name: 'Post',
  components: {
    LikedIcon,
    LikesCounter,
    PostComment,
  },
  data() {
    return {
      id: '',
      ready: false,
      image: '',
      date: '',
      desc: '',
      poster: {},
      comments: [],
      likes: [],
      hideReport: false,
      newComment: '',
    };
  },
  computed: {
    formattedDate() {
      return moment(this.date).format('Do MMMM YYYY');
    },
    validInput() {
      return this.newComment.length > 0 && this.newComment.length < 150;
    },
    liked() {
      return (
        this.likes.filter((l) => l._id === this.currentUserId || l.hasOwnProperty('currentUserId'))
          .length > 0
      );
    },
    ...mapState({
      currentUserId: (state) => state.user.currentUserId,
      fullUser: (state) => state.user,
    }),
  },
  methods: {
    loadPost() {
      const url = `${
        process.env.NODE_ENV === 'production'
          ? process.env.VUE_APP_API_PROD
          : process.env.VUE_APP_API_DEV
      }/post/${this.$route.params.id}`;

      axios.get(url).then((res) => {
        this.id = res.data._id;
        this.image = res.data.imageUrl;
        this.date = res.data.date;
        this.desc = res.data.description;
        this.likes = res.data.likes;
        this.comments = res.data.comments;
        this.poster = res.data.poster;
        this.ready = true;
      });
    },
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
        this.likes.push(this.fullUser);
      } else {
        this.likes = this.likes.filter(
          // eslint-disable-next-line comma-dangle
          (o) => !o.hasOwnProperty('currentUserId') && o._id === this.currentUserId
        );
      }
    },
    postComment() {
      if (this.currentUserId) {
        const url = `${
          process.env.NODE_ENV === 'production'
            ? process.env.VUE_APP_API_PROD
            : process.env.VUE_APP_API_DEV
        }/post/${this.id}/comment`;

        axios.post(url, { userId: this.currentUserId, content: this.newComment }).then(() => {
          this.comments.push({
            author: { username: this.fullUser.currentUserName, avatarUrl: this.fullUser.avatarUrl },
            content: this.newComment,
            date: new Date(),
          });
        });
      } else {
        this.$router.push({ name: 'Login' });
      }
    },
  },
  mounted() {
    this.loadPost();
  },
};
</script>

<style lang="scss" scoped>
.post-container {
  margin: 30px auto 0 auto;
  max-height: 85vh;
  max-width: 975px;

  @media (max-width: 700px) {
    margin: 0;
    height: calc(100vh - 55px);
    max-height: 100%;
  }
}

.post {
  min-height: 450px;
  border: 1px solid var(--border);
  display: flex;

  @media (max-width: 1000px) {
    flex-direction: column;
    width: 650px;
    margin: 0 auto;
  }

  @media (max-width: 700px) {
    width: 100%;
    height: 100%;
  }

  &__image {
    width: 675px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #fff;
    border-bottom: 1px solid var(--border);

    @media (max-width: 1000px) {
      width: 100%;
    }

    img {
      max-height: 70vh;
      max-width: 100%;

      @media (max-width: 1000px) {
        max-height: 50vh;
      }
    }
  }

  &__info {
    width: 300px;
    background: #fff;
    border-left: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    overflow: hidden;

    @media (max-width: 1000px) {
      width: 100%;
    }

    @media (max-width: 700px) {
      flex-grow: 1;
    }

    &__top {
      height: 75px;
      display: flex;
      align-items: center;
      padding: 15px;
      border-bottom: 1px solid var(--border);

      img {
        height: 35px;
        border-radius: 50%;

        &.report {
          cursor: pointer;
          height: 20px;
        }
      }

      &__text {
        margin-left: 15px;
        display: flex;
        flex-direction: column;
        justify-content: center;
        flex-grow: 1;

        a {
          width: fit-content;
        }

        span {
          font-size: smaller;
        }
      }

      &__report {
        cursor: pointer;
      }
    }

    &__comments {
      flex-grow: 1;
      max-height: 500px;
      overflow: auto;
      box-sizing: content-box;

      @media (max-width: 1000px) {
        max-height: 200px;
      }
    }

    &__controls {
      height: 40px;
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
      padding: 6px;
      display: flex;
      align-items: center;
    }

    &__input {
      min-height: 50px;
      form {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow-y: auto;

        textarea {
          flex-grow: 0.7;
          border: none;
          resize: none;
          padding: 10px;

          &:focus {
            outline: none;
          }
        }

        button {
          flex-grow: 0.3;
          height: 100%;
          letter-spacing: 3px;
          color: var(--accent);
          background: none;
          border: none;
          opacity: 0.5;
          transition: all 0.25s ease-out;
          font-weight: 700;

          &:focus {
            outline: none;
          }

          &.valid {
            cursor: pointer;
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
