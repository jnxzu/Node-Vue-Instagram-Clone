<template>
  <div class="navsearch">
    <input class="navsearch__input" />
    <img class="navsearch__icon" src="img/search-icon.png" alt="Search" />
  </div>
</template>

<script>
export default {
  name: 'NavSearch',
};
</script>

<style lang="scss">
.navsearch {
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
</style>
