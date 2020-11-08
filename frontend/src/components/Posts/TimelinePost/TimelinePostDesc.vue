<template>
  <div class="timelinepostdesc">
    <p>
      <router-link to="u/placekitten">placekitten</router-link> Lorem ipsum dolor sit amet
      consectetur adipisicing elit. Quibusdam ad aspernatur perspiciatis corrupti eius ea quaerat
      fugit facilis ex doloremque in ipsa fuga vitae, perferendis soluta non natus neque maiores.
    </p>
  </div>
</template>

<script>
export default {
  name: 'TimelineDesc',
};
</script>

<style lang="scss" scoped>
.timelinepostdesc {
  padding: 0 10px;

  a {
    font-weight: 600;
    display: inline;
  }
}
</style>
