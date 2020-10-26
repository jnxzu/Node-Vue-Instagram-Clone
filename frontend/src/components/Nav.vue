<template>
  <nav class="nav">
    <div class="nav__inner">
      <div class="nav__inner__left">
        <router-link to="/">
          <img class="nav__inner__left__logo" src="@/assets/logo.png" alt="Camra" />
        </router-link>
        <router-link to="/">
          <h1 class="nav__inner__left__name">Camra</h1>
        </router-link>
      </div>
      <div class="nav__inner__center">
        <input class="nav__inner__center__input" />
        <img class="nav__inner__center__icon" src="@/assets/search-icon.png" alt="Search" />
      </div>
      <div class="nav__inner__right">
        <div class="nav__inner__right__icon active">
          <router-link to="/">
            <img src="@/assets/home-icon.png" alt="Home" />
            <div class="nav-selection"></div>
          </router-link>
        </div>
        <div class="nav__inner__right__icon">
          <router-link to="/messages">
            <img src="@/assets/messages-icon.png" alt="Messages" />
            <div class="nav-selection"></div>
          </router-link>
        </div>
        <div class="nav__inner__right__profile">
          <router-link to="/u/me">
            <img src="@/assets/profile.jpg" alt="Profile" />
            <div class="nav-selection"></div>
          </router-link>
        </div>
        <div class="nav__inner__right__icon">
          <img src="@/assets/logout-icon.png" alt="Logout" />
          <div class="nav-selection"></div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'Nav',
};
</script>

<style lang="scss">
@import url('https://fonts.googleapis.com/css2?family=Amatic+SC:wght@700&display=swap');

.nav {
  height: 55px;
  display: flex;
  position: fixed;
  top: 0;
  width: 100%;
  justify-content: center;
  border-bottom: 1px solid var(--border);

  &__inner {
    height: 100%;
    width: 100%;
    max-width: 975px;
    display: flex;
    justify-content: center;
    align-items: center;

    @media (max-width: 600px) {
      justify-content: space-between;
    }

    &__left {
      max-height: 55px;
      width: 30%;
      display: flex;
      justify-content: flex-start;
      align-items: center;
      margin-left: 10px;

      &__logo {
        font-family: 'Amatic SC', cursive;
        cursor: pointer;
        height: 50px;
      }

      &__name {
        font-family: 'Amatic SC', cursive;
        cursor: pointer;
        font-size: xx-large;
      }
    }

    &__center {
      @media (max-width: 600px) {
        display: none;
      }
      max-height: 55px;
      width: 40%;
      display: flex;
      justify-content: center;
      align-items: center;

      &__input {
        border: 1px solid var(--border);
        background: var(--bg);
        text-align: center;
        padding: 3px;
      }

      &__icon {
        margin-left: 5px;
      }
    }

    &__right {
      height: 100%;
      width: 30%;
      display: flex;
      justify-content: flex-end;
      align-items: center;
      margin-right: 10px;

      &__icon {
        display: flex;
        flex-direction: column;
        margin-right: 15px;
        cursor: pointer;

        img {
          height: 30px;
        }

        .nav-selection {
          background: var(--accent);
        }

        &.active,
        &:hover {
          .nav-selection {
            height: 5px;
          }
        }
      }

      &__profile {
        display: flex;
        flex-direction: column;
        margin-right: 15px;

        img {
          height: 36px;
          border-radius: 50%;
          border: 1px solid var(--border);
        }

        .nav-selection {
          background: var(--accent);
        }

        &.active,
        &:hover {
          .nav-selection {
            height: 5px;
          }
        }
      }
    }
  }
}
</style>
