<template>
  <div class="cart">
    <nav-bar class="nav-bar">
      <div slot="center">购物车({{cartLength}})</div>
    </nav-bar>
    <cart-list></cart-list>
    <cart-bottom-bar></cart-bottom-bar>
  </div>
</template>

<script>
  import {
    mapGetters
  } from 'vuex'
  import NavBar from '../../components/common/navbar/Navbar.vue'
  import CartList from './childComps/CartList'
  import CartBottomBar from './childComps/CartBottomBar'
  export default {
    name: "Carts",
    components: {
      NavBar,
      CartList,
      CartBottomBar,
    },
    computed: {
      ...mapGetters(['cartLength'])
    }
  }
</script>

<style scoped>
  .nav-bar {
    background-color: var(--color-tint);
    color: #fff;
  }
</style>