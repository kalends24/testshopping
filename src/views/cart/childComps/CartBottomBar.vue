<template>
    <div class="cart-bottom-bar">
        <div class="check-content">
            <check-button class="check-button" :is-checked="handleCheckedAll" @click.native="checkClick"></check-button>
            <span> 全选</span>
        </div>
        <div class="price">
            合计: ￥{{totalPrice}} 元
        </div>
        <div class="calculate">
            去计算：({{checkLength}})
        </div>
    </div>
</template>

<script>
    import CheckButton from 'components/content/checkButton/CheckButton.vue'
    import {
        mapGetters,
    } from "vuex";
    export default {
        name: "CartBottomBar",
        components: {
            CheckButton
        },
        computed: {
            ...mapGetters(["cartList"]),
            totalPrice() {
                return this.cartList
                    .filter(item => item.checked)
                    .reduce((prev, item) => prev + item.price * item.count, 0)
                    .toFixed(2);
            },
            checkLength() {
                return this.cartList.filter(item => item.checked).length
            },
            handleCheckedAll() {
                if (this.cartList.length == 0) return false
                return !this.cartList.find(item => !item.checked)

            }
        },
        methods: {
            checkClick() {
                if (this.handleCheckedAll) { //全部选中
                    this.cartList.forEach(item => item.checked = false);
                } else {
                    this.cartList.forEach(item => item.checked = true);
                }
            }
        }
    }
</script>

<style scoped>
    .cart-bottom-bar {
        font-size: 15px;
        position: fixed;
        right: 0;
        bottom: 50px;
        left: 0;
        display: flex;
        align-items: center;
        width: 100%;
        height: 50px;
        padding: 0 10px;
        border-top: 1px solid #cccccc;
    }

    .check-content {
        display: flex;
        align-items: center;
        width: 60px;
    }

    .check-button {
        widows: 20px;
        height: 20px;
        line-height: 20px;
        margin-right: 5px;
    }

    .price {
        margin-left: 30px;
        flex: 1;
    }

    .calculate {
        line-height: 50px;
        position: absolute;
        right: 0;
        bottom: 0;
        display: block;
        height: 50px;
        padding: 0 15px;
        color: white;
        border: 0;
        outline: none;
        background: linear-gradient(to right, #ff6034, #ee0a24);
    }
</style>