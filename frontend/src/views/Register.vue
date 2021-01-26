<template>
  <div class="register" v-if="ready">
    <img src="/img/logo.png" />
    <h1 class="register__title">Camra</h1>
    <form @submit.prevent="register">
      <div>
        <input v-model="username" type="text" name="login" placeholder="user" ref="usernameInput" />
        <label for="login">login</label>
      </div>
      <div>
        <input
          v-model="email"
          type="email"
          name="email"
          placeholder="user@email.com"
          ref="emailInput"
        />
        <label for="email">email</label>
      </div>
      <div>
        <input v-model="password" type="password" name="password" ref="passwordInput" />
        <label for="password">password</label>
      </div>
      <input class="submit" type="submit" value="Sign up" />
    </form>
    <span>Already have an account? <router-link to="/login">Sign in</router-link> instead.</span>
  </div>
  <img class="loading-gif" src="/img/loading.gif" v-else />
</template>

<script>
import axios from 'axios';
import { mapActions, mapState } from 'vuex';

export default {
  name: 'Register',
  data() {
    return {
      username: '',
      email: '',
      password: '',
      timeout: null,
      ready: false,
    };
  },
  computed: { ...mapState({ auth: (state) => state.isAuth }) },
  methods: {
    ...mapActions(['updateUserState', 'setAvatar']),
    checkAuth() {
      if (this.auth) this.$router.push({ name: 'Timeline' });
      else this.ready = true;
    },
    register() {
      this.$refs.usernameInput.classList.remove('wrong');
      this.$refs.emailInput.classList.remove('wrong');
      this.$refs.passwordInput.classList.remove('wrong');

      const url = `${
        process.env.NODE_ENV === 'production'
          ? process.env.VUE_APP_API_PROD
          : process.env.VUE_APP_API_DEV
      }/register`;

      this.ready = false;

      axios
        .post(url, {
          username: this.username,
          email: this.email,
          password: this.password,
        })
        .then((res) => {
          this.updateUserState(res.data);
          this.setAvatar('');
          this.$emit('reload-avatar');
          this.$router.push({ name: 'Timeline' });
        })
        .catch(() => {
          this.ready = true;

          this.$refs.usernameInput.classList.add('wrong');
          this.$refs.emailInput.classList.add('wrong');
          this.$refs.passwordInput.classList.add('wrong');
        });
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
.register {
  margin: 55px auto;
  width: 500px;
  height: 600px;
  border: 1px solid var(--border);
  background: radial-gradient(circle at top left, var(--accent) 10%, #fff);
  display: flex;
  flex-direction: column;
  align-items: center;

  @media (max-width: 600px) {
    margin: 0 auto;
    width: 100vw;
    height: calc(100vh - 55px);
    background: radial-gradient(circle at bottom right, var(--accent) 10%, #fff);
  }

  img {
    margin-top: -20px;
    width: 250px;
  }

  &__title {
    margin-top: -25px;
    font-family: 'Amatic SC', cursive;
  }

  form {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;

    @media (min-width: 601px) {
      flex-grow: 1;
    }

    @media (max-width: 600px) {
      margin: 25px 0;
    }

    div {
      display: flex;
      flex-direction: column-reverse;

      @media (max-width: 700px) {
        margin: 5px;
      }

      input {
        border: 1px solid var(--border);
        padding: 5px 10px;
        width: 200px;

        &.wrong {
          border: 1px solid red;
        }

        &:focus {
          outline: none;
        }
      }

      label {
        font-family: 'Amatic SC', cursive;
        font-size: x-large;
        transition: all 0.25s ease-out;
      }

      input:focus ~ label,
      input:hover ~ label {
        opacity: 0.25;
      }
    }

    .submit {
      background: var(--accent);
      border: 1px solid var(--border);
      border-radius: 0.25rem;
      font-size: larger;
      width: 100px;
      padding: 0.25rem;
      cursor: pointer;
      transition: all 0.25s ease-out;
    }
  }

  span {
    margin: 25px 0;
  }
}
</style>
