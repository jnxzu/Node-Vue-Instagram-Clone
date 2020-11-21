<template>
  <div class="comment">
    <div class="comment__avatar"><img src="https://placekitten.com/150/150" /></div>
    <div class="comment__content">
      <p>
        <router-link to="/u/test">user </router-link>Lorem ipsum dolor sit amet consectetur
        adipisicing elit. Debitis, sit quam suscipit minus saepe quisquam assumenda voluptatum et?
        Odit voluptate impedit a aperiam dolores dolorum consequatur cumque iusto eaque rerum.
      </p>
      <span>10h ago</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'PostComment',
};
</script>

<style lang="scss" scoped>
.comment {
  margin: 5px 15px 10px 15px;
  display: flex;

  &__avatar {
    width: 30px;
    margin: 10px 10px 10px 0;

    img {
      height: 30px;
      border-radius: 50%;
    }
  }

  &__content {
    flex-grow: 1;

    span {
      font-size: smaller;
      color: #888;
    }
  }
}
</style>
