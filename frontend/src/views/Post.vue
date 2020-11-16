<template>
  <div class="post-container">
    <div class="post">
      <div class="post__image">
        <img src="https://placekitten.com/600/350" />
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
          <div class="comment"></div>
        </div>
        <div class="post__info__controls">
          <liked-icon :liked="false" />
          <likes-counter />
        </div>
        <div class="post__info__input"></div>
      </div>
    </div>
  </div>
</template>

<script>
import LikedIcon from '../components/Posts/LikedIcon.vue';
import LikesCounter from '../components/Posts/LikesCounter.vue';

export default {
  name: 'Post',
  components: {
    LikedIcon,
    LikesCounter,
  },
};
</script>

<style lang="scss" scoped>
.post-container {
  margin: 30px auto 0 auto;
  max-width: 975px;
  display: flex;
  justify-content: center;
}

.post {
  min-height: 450px;
  border: 1px solid var(--border);
  display: flex;

  @media (max-width: 600px) {
    padding-top: 0;
  }

  &__image {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__info {
    min-width: 335px;
    background: #fff;
    border-left: 1px solid var(--border);
    display: flex;
    flex-direction: column;

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
    }

    &__controls {
      border-top: 1px solid var(--border);
      border-bottom: 1px solid var(--border);
      padding: 6px;
      display: flex;
      align-items: center;
    }

    &__input {
      height: 60px;
    }
  }
}
</style>
