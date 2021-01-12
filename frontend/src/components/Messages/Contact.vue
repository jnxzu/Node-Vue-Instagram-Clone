<template>
  <div :class="{ contact: true, active: this.active }" @click="changeChat">
    <img :src="this.avatar" />
    <div>
      <h3>{{ name }}</h3>
      <span>{{ lastMsg }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Contact',
  props: {
    id: String,
    name: String,
    msgs: Array,
    avatar: String,
    selected: String,
  },
  computed: {
    lastMsg() {
      return this.msgs[this.msgs.length - 1].content;
    },
    active() {
      return this.selected === this.id;
    },
  },
  methods: {
    changeChat() {
      this.$emit('change-selected', this.id);
    },
  },
};
</script>

<style lang="scss" scoped>
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
</style>
