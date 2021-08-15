<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
    <main-tab-bar />
  </div>
</template>

<script>
  import MainTabBar from "./components/content/mainTabber/MainTabBar.vue";
  export default {
    name: "App",
    components: {
      MainTabBar
    },
  };
</script>

<style>
  /* style中引用css 必须要用@import */
  @import "./assets/css/base.css";
</style>