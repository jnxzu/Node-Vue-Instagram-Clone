<template>
  <img class="loading-gif" src="/img/loading.gif" />
</template>

<script>
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Logout',
  data() {
    return {
      timeout: null,
    };
  },
  computed: { ...mapState({ auth: (state) => state.isAuth }) },
  methods: {
    ...mapActions(['updateUserState']),
    logout() {
      if (this.auth) {
        this.updateUserState({
          currentUserId: '',
          currentUserName: '',
          isAdmin: false,
        });
      }
      this.$router.push({ name: 'Login' });
    },
  },
  created() {
    this.timeout = setTimeout(this.logout, 500);
  },
  destroyed() {
    clearTimeout(this.timeout);
  },
};
</script>
