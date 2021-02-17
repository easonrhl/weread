<template>
  <div class="wrap">
    <nav-top title="微信读书" />
    <van-search shape="round" placeholder="搜索" @focus="onFocus" class="search" />
    <nav-bar :data="nav" @toggle="toggle" ref="navBar" />
    <van-swipe
      :show-indicators="false"
      :loop="false"
      lazy-render
      @change="onChange"
      ref="swipe"
      :stop-propagation="false"
      :initial-swipe="index"
    >
      <van-swipe-item><home-recommend /></van-swipe-item>
      <van-swipe-item><home-category /></van-swipe-item>
      <van-swipe-item><home-rank /></van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import NavBar from 'components/NavBar'
import NavTop from 'components/NavTop'
import HomeRecommend from './HomeRecommend'
import HomeCategory from './HomeCategory'
import HomeRank from './HomeRank'
export default {
  components: {
    NavBar,
    NavTop,
    HomeRecommend,
    HomeCategory,
    HomeRank
  },
  data() {
    return {
      nav: ['推荐', '分类', '排行'],
      index: 0
    }
  },
  deactivated() {
    this.index = this.$refs.navBar.currentIndex
  },
  methods: {
    toggle(index) {
      this.$refs.swipe.swipeTo(index)
    },
    onChange(index) {
      this.$refs.navBar.currentIndex = index
    },
    onFocus(){
      this.$router.push('/search')
    }
  }
}
</script>
<style lang="less" scoped>
.search{
  padding: 6px 12px;
}
</style>
