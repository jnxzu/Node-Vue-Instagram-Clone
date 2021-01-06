<template>
  <i @click="toggleLike" :class="classObj" v-tooltip="likedVal ? 'Unlike' : 'Like'"></i>
</template>

<script>
import axios from 'axios';
import _ from 'lodash';
import { mapState } from 'vuex';

export default {
  name: 'LikedIcon',
  props: {
    liked: Boolean,
    postId: String,
  },
  data() {
    return {
      likedVal: this.liked,
    };
  },
  computed: {
    classObj() {
      return {
        'fa-heart': true,
        'fa-2x': true,
        far: !this.likedVal,
        fas: this.likedVal,
        colored: this.likedVal,
      };
    },
    ...mapState({ currentUserId: (state) => state.user.currentUserId }),
  },
  methods: {
    toggleLike: _.debounce(function tL() {
      if (this.currentUserId) {
        const url = `${
          process.env.NODE_ENV === 'production'
            ? process.env.VUE_APP_API_PROD
            : process.env.VUE_APP_API_DEV
        }//post/${this.postId}`;

        axios.patch(url, { userId: this.currentUserId, liked: this.likedVal });
        this.likedVal = !this.likedVal;
        this.$emit('like-toggle', this.likedVal);
      } else {
        this.$router.push({ name: 'Login' });
      }
    }, 300),
  },
};
</script>

<style lang="scss" scoped>
i {
  cursor: pointer;
  transition: color 0.25s ease-out;
}

.colored {
  color: var(--accent);
}
</style>
