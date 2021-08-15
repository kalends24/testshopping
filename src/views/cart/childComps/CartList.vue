<template>
    <div class="cart-list">
        <scroll class="content">
            <cart-list-item v-for="(product, index) in cartList" :key="index" :product="product"></cart-list-item>
        </scroll>
    </div>
</template>

<script>
    import Scroll from '../../../components/common/scroll/Scroll.vue'
    import {
        mapGetters
    } from 'vuex'
    import CartListItem from './CartListItem.vue'
    export default {
        name: "CartList",
        components: {
            Scroll,
            CartListItem,
        },
        computed: {
            ...mapGetters(['cartList'])
        },
    }
</script>

<style scoped>
    .cart-list {
        width: 100%;
        height: 100%;
    }

    .content {
        position: absolute;
        top: 44px;
        right: 0;
        bottom: 99px;
        left: 0;
        overflow: hidden;
        width: 100%;
        background-color: #ffffff;
    }
</style>