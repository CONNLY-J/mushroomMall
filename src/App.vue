<template>
  <div id="app">
    <!-- 填充插槽，实现底部TabBar的效果 -->
    <!-- 使用keep-alive，让home不要随意销毁 -->
    <keep-alive exclude="Detail">
      <router-view></router-view>
    </keep-alive>
    <main-tab-bar></main-tab-bar>
    <icon></icon>
    <svg-icon></svg-icon>
  </div>
</template>

<script>
import MainTabBar from 'components/content/mainTabBar/MainTabBar'
import Icon from 'components/content/Icon/Icon.vue'
import SvgIcon from 'components/content/Icon/svg.vue'

export default {
  name: 'App',
  components: {
    MainTabBar,
    Icon,
    SvgIcon,
  },
  data() { 
    return {

    }
  }
}
</script>

<style>
@import "./assets/css/base.css";
</style>
