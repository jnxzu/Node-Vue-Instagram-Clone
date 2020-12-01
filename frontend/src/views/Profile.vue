<template>
  <div class="profile">
    <div class="info">
      <img class="info__avatar" src="https://placekitten.com/150/150" />
      <div class="info__contents">
        <div class="ts-mobile-helper">
          <img class="mobile-img" src="https://placekitten.com/150/150" />
          <div class="ts-mobile-helper-right">
            <div class="info__contents__top">
              <h2>{{ $route.params.username }}</h2>
              <button>Follow</button>
              <button>Message</button>
            </div>
            <div class="info__contents__stats">
              <div class="info__contents__stats__group">
                <h3>10</h3>
                <h5>posts</h5>
              </div>
              <div class="info__contents__stats__group">
                <h3>100</h3>
                <h5>followers</h5>
              </div>
              <div class="info__contents__stats__group">
                <h3>1000</h3>
                <h5>following</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="info__contents__desc">
          <h3>{{ $route.params.username }}</h3>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Excepturi maiores, recusandae
            similique architecto labore velit quaerat facere deserunt ut, officia tempora,
            accusantium ad sapiente? Eius reprehenderit libero qui voluptatibus voluptate!
          </p>
        </div>
        <div class="info__contents__followed">
          <span>followed by <router-link to="/u/test">test</router-link> + 33 others</span>
        </div>
      </div>
    </div>
    <div class="posts">
      <div class="posts__row">
        <profile-post />
        <profile-post />
        <profile-post />
      </div>
      <div class="posts__row">
        <profile-post />
        <profile-post />
        <profile-post />
      </div>
      <div class="posts__row">
        <profile-post />
        <profile-post />
      </div>
    </div>
  </div>
</template>

<script>
import ProfilePost from '../components/Posts/ProfilePost.vue';

export default {
  name: 'Profile',
  components: {
    ProfilePost,
  },
};
</script>

<style lang="scss">
.profile {
  margin: 0 auto;
  max-width: 975px;
  padding: 30px 20px;

  @media (max-width: 600px) {
    padding: 0 0 30px 0;
  }

  .info {
    display: flex;

    @media (max-width: 600px) {
      padding: 20px;
    }

    .ts-mobile-helper {
      display: flex;
      align-items: center;
      margin-bottom: 20px;

      img {
        display: none;
        border-radius: 50%;
        margin-right: 20px;

        @media (max-width: 600px) {
          display: inline-block;
        }
      }
    }

    &__avatar {
      border-radius: 50%;
      width: 150px;
      height: 150px;
      margin: 10px 50px;

      @media (max-width: 600px) {
        display: none;
      }
    }

    &__contents {
      display: flex;
      flex-direction: column;

      &__top {
        display: flex;
        align-items: center;
        flex-wrap: wrap;
        gap: 10px;

        button {
          background: #fff;
          border: 1px solid var(--border);
          border-radius: 4px;
          padding: 4px 8px;
          font-weight: 700;
          cursor: pointer;
          transition: 0.25s all;

          &:hover {
            padding: 4px 10px;
            background: var(--accent);
          }

          &:focus {
            outline: none;
          }
        }
      }

      &__stats {
        margin: 15px 0;
        display: flex;
        gap: min(50px, 5vw);

        &__group {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;

          h5 {
            font-weight: 500;
          }
        }
      }

      &__desc {
        max-width: 500px;
      }

      &__followed {
        color: #555;
        margin-top: 10px;
        font-weight: 500;
      }
    }
  }

  .posts {
    margin-top: 50px;
    padding-top: 25px;
    border-top: 1px solid var(--border);
    display: flex;
    flex-direction: column;
    gap: 25px;

    @media (max-width: 600px) {
      gap: 3px;
      border: none;
      padding-top: 0;
      margin-top: 25px;
    }

    &__row {
      display: flex;
      justify-content: center;
      gap: 25px;

      @media (max-width: 600px) {
        gap: 3px;
      }
    }
  }
}
</style>
