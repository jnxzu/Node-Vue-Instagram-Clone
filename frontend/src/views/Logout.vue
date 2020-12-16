<template>
  <p></p>
</template>

<script>
import { mapActions } from 'vuex';

export default {
  name: 'Logout',
  mounted() {
    this.logout();
  },
  methods: {
    logout() {
      this.updateUserState({
        currentUserId: '',
        currentUserName: '',
        isAdmin: false,
      });
      this.$router.push({ name: 'Login' });
    },
    ...mapActions(['updateUserState']),
  },
};
</script>
