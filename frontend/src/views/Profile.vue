<template>
  <div class="profile" v-if="ready">
    <div class="info">
      <input ref="browse" type="file" @change="fileChange" hidden v-if="editing" />
      <img
        :class="{ info__avatar: true, change: avatarHover }"
        :src="
          avatarHover ? '/img/new-avatar.png' : userdata.avatarUrl || '/img/profile-default.png'
        "
        @mouseover="hoverHandler('enter')"
        @mouseleave="hoverHandler('leave')"
        @click="() => $refs.browse.click()"
      />
      <div class="info__contents">
        <div class="ts-mobile-helper">
          <img class="mobile-img" :src="userdata.avatarUrl || '/img/profile-default.png'" />
          <div class="ts-mobile-helper-right">
            <div class="info__contents__top">
              <h2>{{ username }}</h2>
              <button v-if="currentUserName !== username && isAuth" @click="follow">
                {{ followedByMe ? 'Unfollow' : 'Follow' }}
              </button>
              <button v-if="currentUserName !== username && isAuth" @click="newChat">
                Message
              </button>
              <button v-if="currentUserName === username" @click="editBioAndAvatar()">
                {{ editing ? 'Save' : 'Edit' }}
              </button>
            </div>
            <div class="info__contents__stats">
              <div class="info__contents__stats__group">
                <h3>{{ userdata.posts.length }}</h3>
                <h5>posts</h5>
              </div>
              <div class="info__contents__stats__group">
                <h3>{{ userdata.followers.length }}</h3>
                <h5>followers</h5>
              </div>
              <div class="info__contents__stats__group">
                <h3>{{ userdata.following.length }}</h3>
                <h5>following</h5>
              </div>
            </div>
          </div>
        </div>
        <div class="info__contents__desc">
          <h3>{{ username }}</h3>
          <textarea v-if="editing" v-model="userdata.bio"></textarea>
          <p v-else>
            {{ userdata.bio }}
          </p>
        </div>
      </div>
    </div>
    <div class="posts">
      <div class="posts__row" v-for="(chunk, index) in slicedPosts" :key="index">
        <profile-post
          v-for="post in chunk"
          :key="post._id"
          :postId="post._id"
          :image="post.imageUrl"
          :likes="post.likes"
          :comments="post.comments"
        />
      </div>
    </div>
  </div>
  <img class="loading-gif" src="/img/loading.gif" v-else />
</template>

<script>
/* eslint-disable comma-dangle */
import axios from 'axios';
import _ from 'lodash';
import { mapActions, mapState } from 'vuex';

import db from '../firebase';

import ProfilePost from '../components/Posts/ProfilePost.vue';

export default {
  name: 'Profile',
  components: {
    ProfilePost,
  },
  data() {
    return {
      username: this.$route.params.username,
      userdata: {
        id: '',
        bio: '',
        avatarUrl: '',
        posts: [],
        followers: [],
        following: [],
      },
      ready: false,
      editing: false,
      lastBio: '',
      avatarHover: false,
      avatarChanged: false,
      imageFile: null,
    };
  },
  computed: {
    ...mapState({
      currentUserName: (state) => state.user.currentUserName,
      currentUserId: (state) => state.user.currentUserId,
      isAuth: (state) => state.isAuth,
      currentUserAvatar: (state) => state.user.avatarUrl,
    }),
    followedByMe() {
      return this.userdata.followers.map((u) => u.username).indexOf(this.currentUserName) > -1;
    },
    slicedPosts() {
      return _.chunk(this.userdata.posts, 3);
    },
    bioChanged() {
      return this.userdata.bio !== this.lastBio;
    },
  },
  methods: {
    ...mapActions({ uploadAvatar: 'setAvatar' }),
    follow() {
      this.ready = false;
      const url = `${
        process.env.NODE_ENV === 'production'
          ? process.env.VUE_APP_API_PROD
          : process.env.VUE_APP_API_DEV
      }/profile/${this.userdata.id}/f`;

      axios
        .patch(url, { sender: this.currentUserId, alreadyFollowing: this.followedByMe })
        .then((res) => {
          if (res.data.add) {
            this.userdata.followers.push(res.data.new);
          } else {
            const i = this.userdata.followers.indexOf(res.data.new);
            this.userdata.followers.splice(i, 1);
          }
          this.ready = true;
        });
    },
    editBioAndAvatar() {
      this.editing = !this.editing;
      if (this.editing) {
        this.lastBio = this.userdata.bio;
      } else if (this.bioChanged && !this.avatarChanged) {
        this.ready = false;
        this.editBio(() => (this.ready = true));
      } else if (!this.bioChanged && this.avatarChanged) {
        this.ready = false;
        this.editAvatar((res) => {
          this.uploadAvatar(res.data);
          this.$emit('reload-avatar');
          this.editing = false;
          this.ready = true;
        });
      } else if (this.bioChanged && this.avatarChanged) {
        this.ready = false;
        this.editBio(this.editAvatar(() => (this.ready = true)));
      }
    },
    editBio(callback) {
      const url = `${
        process.env.NODE_ENV === 'production'
          ? process.env.VUE_APP_API_PROD
          : process.env.VUE_APP_API_DEV
      }/profile/${this.userdata.id}/editBio`;

      axios.patch(url, { newBio: this.userdata.bio }).then(callback);
    },
    editAvatar(callback) {
      const data = new FormData();
      data.set('image', this.imageFile, `${this.username}_avatar`);
      const url = `${
        process.env.NODE_ENV === 'production'
          ? process.env.VUE_APP_API_PROD
          : process.env.VUE_APP_API_DEV
      }/profile/${this.userdata.id}/changeAvatar`;

      axios({
        method: 'post',
        url,
        data,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then(callback);
    },
    hoverHandler(dir) {
      if (dir === 'enter' && this.editing) this.avatarHover = true;
      if (dir === 'leave' && this.editing) this.avatarHover = false;
    },
    fileChange(e) {
      const file = e.target.files[0];
      this.imageFile = file;
      this.userdata.avatarUrl = URL.createObjectURL(file);
      this.avatarChanged = true;
    },
    newChat() {
      let chatAlreadyExists = false;
      db.collection('chatrooms')
        .where('ids', 'array-contains', this.currentUserId)
        .get()
        .then((qs) => {
          qs.forEach((doc) => {
            if (doc.data().ids.includes(this.userdata.id)) {
              chatAlreadyExists = true;
            }
          });
          if (chatAlreadyExists) this.$router.push({ name: 'Messages' });
          else {
            db.collection('chatrooms')
              .add({
                ids: [this.currentUserId, this.userdata.id],
                messages: [],
                users: [
                  { avatarUrl: this.userdata.avatarUrl, username: this.username },
                  { avatarUrl: this.currentUserAvatar, username: this.currentUserName },
                ],
              })
              .then(() => {
                this.$router.push({ name: 'Messages' });
              });
          }
        });
    },
  },
  mounted() {
    const url = `${
      process.env.NODE_ENV === 'production'
        ? process.env.VUE_APP_API_PROD
        : process.env.VUE_APP_API_DEV
    }/profile/${this.username}`;

    axios
      .get(url)
      .then((res) => {
        this.userdata = res.data;
        this.ready = true;
      })
      .catch(() => this.$router.push('/404'));
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

      &.change {
        cursor: pointer;
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
          transition: all 0.25s ease-out;

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

        p {
          padding: 10px 0;
          height: 90px;
          width: 300px;
          word-wrap: break-word;
        }

        textarea {
          padding: 10px 0;
          height: 90px;
          width: 300px;
          resize: none;
          font-size: 14px;
          border: none;
        }
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
      padding: 0 50px;
      gap: 5px;
      margin-bottom: 5px;

      @media (max-width: 600px) {
        gap: 5px;
        padding: 0 20px;
        justify-content: space-between;
      }
    }
  }
}
</style>
