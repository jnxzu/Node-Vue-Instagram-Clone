<template>
  <div class="reportedpost">
    <div class="reportedpost__image">
      <img src="https://placekitten.com/600/600" />
    </div>
    <div class="reportedpost__controls">
      <button class="ok">Approve</button>
      <button class="nah">Delete</button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ReportedPost',
};
</script>

<style lang="scss" scoped>
.reportedpost {
  max-width: 975px;
  display: flex;
  margin-bottom: 50px;

  @media (max-width: 975px) {
    flex-direction: column;
    max-width: 600px;
    margin: 20px 20px 50px 20px;
    border: 1px solid var(--border);
  }

  &__image {
    display: flex;
    flex-direction: column;

    @media (min-width: 976px) {
      width: 66%;

      img {
        align-self: flex-start;
      }
    }
  }

  &__controls {
    flex-grow: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 975px) {
      flex-direction: row;
    }

    button {
      margin: 30px;
      height: 50px;
      font-size: larger;
      border: 1px solid var(--border);
      cursor: pointer;
      transition: 0.25s ease-out all;

      @media (max-width: 975px) {
        margin: 0;
        flex-grow: 1;
      }

      @media (min-width: 976px) {
        &:hover {
          scale: 1.1;
        }
      }

      &.ok {
        background: lightgreen;
      }

      &.nah {
        background: lightcoral;
      }
    }
  }
}
</style>
