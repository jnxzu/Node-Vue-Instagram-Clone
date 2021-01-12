<template>
  <div class="navsearch">
    <input
      v-model="phrase"
      class="navsearch__input"
      @keydown="search"
      @focus="
        () => {
          results = [];
          search;
        }
      "
    />
    <div :class="{ navsearch__results: true, notempty: hasResults }">
      <div @click="redirect(result.username)" v-for="(result, index) in results" :key="index">
        <img :src="result.avatarUrl || '/img/profile-default.png'" />
        <span> {{ result.username }}</span>
      </div>
    </div>
    <img class="navsearch__icon" src="/img/search-icon.png" alt="Search" />
  </div>
</template>

<script>
/* eslint-disable prefer-arrow-callback */

import _ from 'lodash';
import axios from 'axios';

export default {
  name: 'NavSearch',
  data() {
    return {
      phrase: '',
      results: [],
    };
  },
  computed: {
    hasResults() {
      return this.results.length > 0;
    },
  },
  methods: {
    search: _.debounce(function searchUser() {
      if (this.phrase.length === 0) return;
      const url = `${
        process.env.NODE_ENV === 'production'
          ? process.env.VUE_APP_API_PROD
          : process.env.VUE_APP_API_DEV
      }/search`;

      axios.post(url, { phrase: this.phrase }).then((res) => (this.results = res.data));
    }, 250),
    redirect(u) {
      this.results = [];
      this.phrase = '';
      this.$router.push(`/u/${u}`);
    },
  },
};
</script>

<style lang="scss" scoped>
.navsearch {
  @media (max-width: 780px) {
    display: none;
  }
  max-height: 55px;
  width: 40%;
  display: flex;
  justify-content: center;
  align-items: center;

  &__results {
    position: absolute;
    top: 40px;
    left: calc(50% - 99px);
    width: 175px;

    &.notempty {
      border: 1px solid var(--border);
    }

    a {
      text-decoration: none;
    }

    div {
      display: flex;
      align-items: center;
      width: 173px;
      height: 40px;
      cursor: pointer;
      background: white;
      padding: 0 10px;

      img {
        height: 30px;
        border-radius: 50%;
        margin-right: 10px;
      }

      span {
        margin-right: auto;
        font-weight: 700;
      }

      &:hover {
        background: var(--bg);
      }
    }
  }

  &__input {
    width: 175px;
    height: 25px;
    border: 1px solid var(--border);
    background: var(--bg);
    text-align: center;
    padding: 3px;

    &:focus + div {
      display: block;
    }
  }

  &__icon {
    margin-left: 5px;
  }
}
</style>
