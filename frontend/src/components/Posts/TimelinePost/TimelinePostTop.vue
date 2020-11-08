<template>
  <div class="timelineposttop">
    <router-link to="u/placekitten">
      <img src="https://placekitten.com/150/150" />
    </router-link>
    <router-link to="u/placekitten"> placekitten </router-link>
  </div>
</template>

<script>
export default {
  name: 'TimelinePostTop',
};
</script>

<style lang="scss" scoped>
.timelineposttop {
  height: 60px;
  display: flex;
  align-items: center;
  padding-left: 15px;

  a {
    font-weight: 600;
    margin-right: 15px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  img {
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }
}
</style>
