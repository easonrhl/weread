<template>
  <div id="app">
    <keep-alive :exclude="['CategoryRank', 'SearchInfo', 'BookInfo', 'BookCase', 'User']">
      <router-view />
    </keep-alive>
    <tab-bar :data="tabBar" />
  </div>
</template>

<script>
import TabBar from 'components/TabBar'
import {getUserinfo} from 'network/user'
export default {
  components: {
    TabBar
  },
  data() {
    return {
      tabBar: [
        {
          icon: 'iconfont icon-book',
          text: '书城',
          path: '/home'
        },
        {
          icon: 'iconfont icon-bookcase-fill',
          text: '书架',
          path: '/bookcase'
        },
        {
          icon: 'iconfont icon-user',
          text: '我',
          path: '/user'
        }
      ]
    }
  },
  async created() {
    if (!sessionStorage.token) return
    let user = await getUserinfo()
    this.$store.commit('updateUser', user)
  }
}
</script>

