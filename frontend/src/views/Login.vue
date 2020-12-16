<template>
  <div class="login">
    <img src="/img/logo.png" />
    <h1 class="login__title">Camra</h1>
    <form @submit.prevent="login">
      <div>
        <input
          v-model="username"
          type="text"
          name="login/email"
          minlength="3"
          required
          autocomplete="off"
          ref="usernameInput"
        />
        <label for="login/email">login/email</label>
      </div>
      <div>
        <input
          v-model="password"
          type="password"
          name="password"
          minlength="3"
          required
          autocomplete="off"
          ref="passwordInput"
        />
        <label for="password">password</label>
      </div>
      <input class="submit" type="submit" value="Sign in" />
    </form>
    <span>Don't have an account? <router-link to="/register">Sign up</router-link> instead.</span>
  </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'vuex';

export default {
  name: 'Login',
  data() {
    return {
      username: '',
      password: '',
    };
  },
  methods: {
    login() {
      this.$refs.usernameInput.classList.remove('wrong');
      this.$refs.passwordInput.classList.remove('wrong');

      const url = `${
        process.env.NODE_ENV === 'production'
          ? process.env.VUE_APP_API_PROD
          : process.env.VUE_APP_API_DEV
      }/UserRoutes/login`;

      axios
        .post(url, {
          username: this.username,
          password: this.password,
        })
        .then((res) => {
          this.updateUserState(res.data);
          this.$router.push({ name: 'Timeline' });
        })
        .catch(() => {
          this.$refs.usernameInput.classList.add('wrong');
          this.$refs.passwordInput.classList.add('wrong');
        });
    },
    ...mapActions(['updateUserState']),
  },
};
</script>

<style lang="scss">
.login {
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

      @media (max-width: 600px) {
        margin: 20px;
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
      background: #fff;
      color: #000;
      border: 1px solid var(--border);
      font-size: larger;
      width: 100px;
      padding: 5px 15px;
      cursor: pointer;
      transition: all 0.25s ease-out;
    }
  }

  span {
    margin: 25px 0;
  }
}
</style>
