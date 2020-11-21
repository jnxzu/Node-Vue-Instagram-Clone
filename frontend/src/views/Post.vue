<template>
  <div class="post-container">
    <div class="post">
      <div class="post__image">
        <!-- <img src="https://placekitten.com/600/300" /> -->
        <img src="https://placekitten.com/600/1200" />
        <!-- <img src="https://placekitten.com/600/600" /> -->
      </div>
      <div class="post__info">
        <div class="post__info__top">
          <img src="/img/profile.jpg" />
          <div class="post__info__top__text">
            <router-link to="/u/user">user</router-link>
            <span>October 25, 2019</span>
          </div>
          <i class="far fa-flag"></i>
        </div>
        <div class="post__info__comments">
          <post-comment />
          <post-comment />
          <post-comment />
        </div>
        <div class="post__info__controls">
          <liked-icon :liked="false" />
          <likes-counter />
        </div>
        <div class="post__info__input">
          <form>
            <textarea placeholder="submit only active if valid"></textarea>
            <button>Post</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
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
};
</script>

<style lang="scss" scoped>
.post-container {
  margin: 30px auto 0 auto;
  display: flex;
  justify-content: center;
  max-height: 85vh;

  @media (min-width: 975px) {
    max-width: 975px;
  }

  @media (max-width: 600px) {
    width: 100%;
  }
}

.post {
  min-height: 450px;
  border: 1px solid var(--border);
  display: inline-flex;

  @media (max-width: 600px) {
    padding-top: 0;
  }

  @media (max-width: 974px) {
    flex-direction: column;
    align-items: center;
  }

  &__image {
    display: flex;
    justify-content: center;
    align-items: center;

    img {
      max-height: 100%;
      max-width: 100%;
    }
  }

  &__info {
    max-width: 600px;
    background: #fff;
    border-left: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    overflow: hidden;

    @media (min-width: 975px) {
      max-width: 335px;
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
    }

    &__comments {
      flex-grow: 1;
      height: 0px;
      overflow: auto;
      box-sizing: content-box;
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
      height: 75px;
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
          padding: 5px 15px;

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
          transition: 0.2s ease all;
          font-weight: 600;
          cursor: pointer;

          &.valid {
            opacity: 1;
          }
        }
      }
    }
  }
}
</style>
