<template>
    <div class="detail">
        <detail-nav-bar class="detail-bar" @titleClick="titleClick"></detail-nav-bar>
        <scroll class="content" ref="scroll" :probe-type="3">
            <detail-swiper :top-images="topImages" class="detail-set-scroll"></detail-swiper>
            <detail-base-info :goods="goods"></detail-base-info>
            <detail-shop-info :shop="shop"></detail-shop-info>
            <detail-goods-info :detailInfo="detailInfo"></detail-goods-info>
            <detail-param-info :param-info="paramInfo" class="detail-set-scroll"></detail-param-info>
            <detail-comment-info :comment-info="commentInfo" class="detail-set-scroll"></detail-comment-info>
            <goods-list :goods="recommends" class="detail-set-scroll"></goods-list>
        </scroll>
        <detail-bottom-bar @addCart='addToCart'></detail-bottom-bar>
        <toast message="22" ></toast>
    </div>
</template>

<script>
    import DetailNavBar from './childComps/DetailNavBar.vue'
    import DetailSwiper from './childComps/DetailSwiper.vue'
    import DetailBaseInfo from './childComps/DetailBaseInfo.vue'
    import Scroll from '../../components/common/scroll/Scroll.vue'
    import DetailShopInfo from './childComps/DetailShopInfo.vue'
    import DetailGoodsInfo from './childComps/DetailGoodsInfo.vue'
    import DetailParamInfo from './childComps/DetailParamInfo.vue'
    import DetailCommentInfo from './childComps/DetailCommentInfo.vue'
    import DetailBottomBar from './childComps/DetailBottomBar.vue'
    import GoodsList from 'components/content/goods/GoodsList.vue'
    import Toast from '../../components/common/toast/Toast.vue'
    import {
        itemListenerMixin
    } from 'common/mixin.js'
    import {
        getDetail,
        Goods,
        Shop,
        GoodsParam,
        getRecommend,

    } from "../../network/details"
    export default {
        name: 'Detail',
        mixins: [itemListenerMixin],
        components: {
            DetailNavBar,
            DetailSwiper,
            DetailBaseInfo,
            Scroll,
            DetailShopInfo,
            DetailGoodsInfo,
            DetailParamInfo,
            DetailCommentInfo,
            DetailBottomBar,
            Toast,
            GoodsList,

        },
        data() {
            return {
                iid: null,
                topImages: [],
                goods: {},
                shop: {},
                detailInfo: {},
                paramInfo: {},
                commentInfo: {},
                recommends: [],
                themeTopYs: [],
                themeTopY: null
            }
        },
        created() {
            // 保存传入的iid
            this.iid = this.$route.params.iid
            // 根据iid请求详情数据
            getDetail(this.iid).then(res => {
                // 1.获取顶部的图片轮播数据
                const data = res.result;
                this.topImages = data.itemInfo.topImages
                //2.获取商品信息
                this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services);
                //3.创建店铺信息
                this.shop = new Shop(data.shopInfo)
                //4.保存商品的详情数据
                this.detailInfo = data.detailInfo;
                //5.获取参数信息 
                this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
                // 6.取出评论信息
                if (data.rate.cRate !== 0) {
                    this.commentInfo = data.rate.list[0]
                }
            })
            //请求推荐数据
            getRecommend().then(res => {
                this.recommends = res.data.list
            })
        },
        mounted() {},
        methods: {
            imageLoad() {
                this.$refs.scroll.refresh()

            },
            titleClick(index) {
                // 根据数组下标滚动到对应的元素内容位置
                this.$nextTick(() => {
                    let el = document.getElementsByClassName("detail-set-scroll");
                    this.$refs.scroll.scrollToElement(el[index], 300);
                });
            },
            addToCart() {
                // 1.获取购物车需要展示的信息
                const product = {};
                product.image = this.topImages[0]
                product.title = this.goods.title
                product.desc = this.goods.desc;
                product.price = this.goods.realPrice;
                product.iid = this.iid;
                // 2.将商品添加到购物车里
                this.$store.commit('addCart', product)

                //3.添加到购物车成功

            }
        }
    }
</script>

<style scoped>
    .detail {
        height: 100vh;
        position: relative;
        background: #fff;
        z-index: 9;
    }

    .detail-nav {
        position: relative;
    }

    .content {
        position: absolute;
        overflow: hidden;
        top: 44px;
        left: 0;
        right: 0;
        bottom: 58px;
        /* overflow: hidden; */
        /* height: 400px; */
        /* height: calc(100% - 44px - 58px);  */
    }
</style>