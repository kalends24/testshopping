<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control"
      v-show="isTabFixed">
    </tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentscroll" :pull-up-load="true"
      @pullingUp="loadMore">
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control :titles="['流行', '新款', '精选']" @tabClick="tabClick" ref="tabControl2">
      </tab-control>
      <goods-list :goods="showGoods" />
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop"></back-top>
  </div>
</template>

<script>
  import HomeSwiper from "../home/childComps/HomeSwiper.vue";
  import RecommendView from "../home/childComps/RecommendView.vue";
  import FeatureView from "./childComps/FeatureView.vue";

  import NavBar from "../../components/common/navbar/Navbar.vue";
  import TabControl from "../../components/content/tabControl/TabControl.vue";
  import {
    getHomeMultidata,
    getHomeGoods
  } from "../../network/home";
  import GoodsList from "../../components/content/goods/GoodsList.vue";
  import Scroll from "../../components/common/scroll/Scroll.vue";
  import BackTop from '../../components/content/backTop/BackTop.vue'
  import {
    itemListenerMixin
  } from 'common/mixin.js'

  export default {
    name: "Home",
    mixins: [itemListenerMixin],
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods: {
          pop: {
            page: 0,
            list: []
          },
          new: {
            page: 0,
            list: []
          },
          sell: {
            page: 0,
            list: []
          },
        },
        currentType: 'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed: false,
        saveY: 0,
        itemImgListener: null
      };
    },
    computed: {
      showGoods() {
        return this.goods[this.currentType].list
      },
    },

    activated() {
      this.$refs.scroll.refresh()
      this.$refs.scroll.scrollTo(0, this.saveY, 1)
    },
    deactivated() {
      this.saveY = this.$refs.scroll.getScrollY()

      // 取消全局事件的监听
      this.$bus.$off('itemImgLoad', this.itemImgListener)

    },

    created() {
      //1.请求多个数据
      this.getHomeMultidata();
      // 请求商品数据
      this.getHomeGoods("pop");
      this.getHomeGoods("new");
      this.getHomeGoods("sell");


    },
    mounted() {},
    methods: {
      /**
       * 事件监听的方法
       */
      tabClick(index) {
        switch (index) {
          case 0:
            this.currentType = 'pop'
            break;
          case 1:
            this.currentType = 'new'
            break;
          case 2:
            this.currentType = 'sell'
            break;
          default:
            break;
        }
        this.$refs.tabControl1.currentIndex = index
        this.$refs.tabControl2.currentIndex = index
      },
      backClick() {
        this.$refs.scroll.scrollTo(0, 0)
      },

      contentscroll(position) {

        //判断backtop是否显示
        this.isShowBackTop = (-position.y) > 1000
        //决定tabControl是否吸顶(position:fixed)
        this.isTabFixed = (-position.y) > this.tabOffsetTop

      },

      loadMore() {
        this.getHomeGoods(this.currentType)
      },
      //获取tabcontrol的offsetTop
      //所有组件都有一个属性$el:用于获取组件中的元素
      swiperImageLoad() {
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      /**
       * 网络请求的方法
       */
      getHomeMultidata() {
        getHomeMultidata().then((res) => {
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        });
      },
      getHomeGoods(type) {
        // 先取出原来的页码然后+1
        const page = this.goods[type].page + 1;
        getHomeGoods(type, page).then((res) => {
          this.goods[type].list.push(...res.data.list);
          this.goods[type].page += 1;

          // 完成下拉加载更多
          this.$refs.scroll.finishPullUp()
        });
      },
    },
  };
</script>

<style scoped>
  #home {
    height: 100vh;
    position: relative;
  }

  .home-nav {
    background-color: var(--color-tint);
    color: white;
    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }

  .tab-control {
    position: relative;
    z-index: 9;
  }

  .content {
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
  }
</style>