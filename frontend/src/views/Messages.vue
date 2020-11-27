<template>
  <div class="messenger">
    <div class="messenger__left">
      <div class="messenger__left__top">
        <div class="messenger__left__top__center">Chat</div>
      </div>
      <div class="messenger__left__bottom">
        <div class="contact active">
          <img src="https://placekitten.com/150/150" />
          <div>
            <h3>osoba</h3>
            <span>costam co napisala ostatnio</span>
          </div>
        </div>
        <div class="contact">
          <img src="https://placekitten.com/150/150" />
          <div>
            <h3>osoba</h3>
            <span>costam co napisala ostatnio</span>
          </div>
        </div>
      </div>
    </div>
    <div class="messenger__right">
      <div class="messenger__right__top">
        <div class="messenger__right__top__avatar">
          <img src="https://placekitten.com/150/150" />
        </div>
        <router-link to="/u/osoba">osoba</router-link>
      </div>
      <div class="messenger__right__messages">
        <div class="message">
          <div class="message__content mine">hej</div>
        </div>
        <div class="message">
          <div class="message__content">hej</div>
        </div>
      </div>
      <div class="messenger__right__input">
        <form @submit.prevent="">
          <input type="text" maxlength="280" placeholder="submit only active if valid" />
          <input type="submit" value="Send" />
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Messages',
};
</script>

<style lang="scss">
.messenger {
  max-width: 975px;
  height: calc(100vh - 100px);
  margin: 20px auto;
  border: 1px solid var(--border);
  background: #fff;
  display: flex;

  @media (max-width: 975px) {
    margin: 0 auto;
    height: calc(100vh - 55px);
  }

  @media (max-width: 700px) {
    flex-direction: column;
  }

  &__left {
    border-right: 1px solid var(--border);
    display: flex;
    flex-direction: column;

    @media (min-width: 701px) {
      width: 350px;
    }

    &__top {
      height: 60px;
      border-bottom: 1px solid var(--border);
      display: flex;
      justify-content: center;
      align-items: center;
      padding: 0 15px;

      @media (max-width: 700px) {
        display: none;
      }

      &__side {
        width: 25px;
        height: 25px;

        img {
          height: 100%;
          cursor: pointer;
        }
      }

      &__center {
        flex-grow: 1;
        text-align: center;
        font-family: 'Amatic SC', cursive;
        font-size: xx-large;
        letter-spacing: 2px;
        font-weight: 700;
      }
    }

    &__bottom {
      flex-grow: 1;
      padding-top: 15px;
      overflow: auto;

      @media (max-width: 700px) {
        display: flex;
        padding: 0;
      }
    }
  }

  &__right {
    flex-grow: 1;
    display: flex;
    flex-direction: column;

    &__top {
      height: 60px;
      border-bottom: 1px solid var(--border);
      display: flex;
      align-items: center;
      padding: 10px 20px;

      &__avatar {
        height: 25px;
        width: 25px;
        margin-right: 20px;

        img {
          height: 100%;
          border-radius: 50%;
        }
      }

      a {
        font-size: larger;
      }
    }

    &__messages {
      flex-grow: 1;
      overflow: auto;
    }

    &__input {
      height: 70px;

      form {
        width: calc(100% - 40px);
        height: calc(100% - 20px);
        border: 1px solid var(--border);
        margin: 10px 20px;
        border-radius: 25px;
        display: flex;
        padding: 0 15px;

        input {
          border: none;
          background: none;

          &:focus {
            outline: none;
          }

          &:first-of-type {
            flex-grow: 1;
            padding: 0 10px;
          }

          &:last-of-type {
            color: var(--accent);
            font-weight: 700;
            letter-spacing: 3px;
            cursor: pointer;
            opacity: 0.5;
            transition: 0.2s ease all;

            &.valid {
              opacity: 1;
            }
          }
        }
      }
    }
  }
}

.contact {
  display: flex;
  height: 75px;
  margin-bottom: 15px;
  align-items: center;
  cursor: pointer;
  padding: 0 10px;

  @media (max-width: 700px) {
    flex-direction: column;
    margin: 0;
    height: 90px;
  }

  img {
    width: 65px;
    margin: 0 10px;
    border-radius: 50%;

    @media (max-width: 700px) {
      width: 50px;
      margin-top: 10px;
    }
  }

  div {
    flex-grow: 1;

    h3 {
      white-space: nowrap;
    }

    span {
      font-size: small;
      color: #888;

      @media (max-width: 700px) {
        display: none;
      }
    }
  }

  &:hover {
    background: var(--bg);
  }

  &.active {
    background: #ddd;
  }
}

.message {
  width: 100%;
  padding: 10px;
  display: flex;
  flex-direction: column;

  &__content {
    border-radius: 25px;
    width: fit-content;
    padding: 10px 20px;
    background: #ddd;

    &.mine {
      align-self: flex-end;
      background: var(--accent);
    }
  }
}
</style>
