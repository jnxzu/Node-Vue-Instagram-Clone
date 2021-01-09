<template>
  <div class="newpost" v-if="ready">
    <div class="image-container">
      <img ref="image" :class="{ uploaded: uploaded }" :src="imageUrl" />
    </div>
    <form @submit.prevent="">
      <input ref="browse" type="file" @change="fileChange" hidden />
      <transition name="fade" mode="out-in">
        <button :key="uploaded" class="browse" @click="() => $refs.browse.click()">
          {{ uploaded ? '📂' : '📁' }}
        </button>
      </transition>
      <textarea rows="5" cols="25" v-model="desc" placeholder="Description..."></textarea>
    </form>
    <button class="post-submit" @click="send">Post</button>
  </div>
  <img class="loading-gif" src="/img/loading.gif" v-else />
</template>

<script>
import { mapState } from 'vuex';
import ShortUniqueId from 'short-unique-id';
import axios from 'axios';

export default {
  name: 'NewPost',
  data() {
    return {
      desc: '',
      uploaded: false,
      imageUrl: '',
      imageFile: {},
      timeout: null,
      ready: false,
    };
  },
  computed: {
    ...mapState({
      auth: (state) => state.isAuth,
      currentUserId: (state) => state.user.currentUserId,
    }),
  },
  methods: {
    checkAuth() {
      if (!this.auth) this.$router.push({ name: 'Timeline' });
      else this.ready = true;
    },
    fileChange(e) {
      this.uploaded = true;
      const file = e.target.files[0];
      this.imageFile = file;
      this.imageUrl = URL.createObjectURL(file);
    },
    send() {
      this.ready = false;
      const uid = new ShortUniqueId({ length: 10 });
      const data = new FormData();
      data.set('image', this.imageFile, this.imageFile.name.replace(/.*\./, `${uid()}.`));

      const url = `${
        process.env.NODE_ENV === 'production'
          ? process.env.VUE_APP_API_PROD
          : process.env.VUE_APP_API_DEV
      }/post`;

      axios({
        method: 'post',
        url,
        data,
        headers: { 'Content-Type': 'multipart/form-data' },
      }).then(() => this.$router.push({ name: 'Timeline' }));
    },
  },
  created() {
    this.timeout = setTimeout(this.checkAuth, 500);
  },
  destroyed() {
    clearTimeout(this.timeout);
  },
};
</script>

<style lang="scss">
.newpost {
  height: calc(100vh - 55px);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;

  .image-container {
    max-width: 975px;
    margin: 25px;

    img {
      max-height: 500px;
      width: 100%;
      visibility: hidden;
      border: 1px solid var(--border);

      @media (max-width: 700px) {
        max-height: 50vh;
      }

      &.uploaded {
        visibility: visible;
      }
    }
  }

  form {
    transition: transform 0.25s ease-out;
    display: flex;
    align-items: center;

    .browse {
      border-radius: 0.25rem;
      border: 1px solid var(--border);
      cursor: pointer;
      padding: 0.25rem;
      margin: 25px;
      width: fit-content;
      font-size: x-large;
    }

    textarea {
      resize: none;
      border: 1px solid var(--border);
      padding: 5px;
      font-size: small;
    }
  }

  .post-submit {
    border-radius: 0.25rem;
    border: 1px solid var(--border);
    cursor: pointer;
    padding: 0.25rem;
    margin: 25px;
    font-size: larger;
    width: 150px;
    background: var(--accent);
  }
}
</style>
