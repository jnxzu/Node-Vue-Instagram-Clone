<template>
  <div class="message">
    <div :class="{ message__content: true, mine: this.mine }">{{ content }}</div>
  </div>
</template>

<script>
export default {
  name: 'Message',
  props: {
    content: String,
    mine: Boolean,
  },
};
</script>

<style lang="scss" scoped>
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
