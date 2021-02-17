<template>
  <div class="case-wrap">
    <nav-top title="书架"></nav-top>
    <van-search shape="round" placeholder="搜索" @focus="onFocus" class="search" />
    <component :is="components[currentIndex]"></component>
  </div>
</template>

<script>
import NavTop from 'components/NavTop'
import BookCaseNotlogin from './BookCaseNotlogin'
import BookCaseInfo from './BookCaseInfo'
export default {
  name: 'BookCase',
  components: {NavTop, BookCaseNotlogin, BookCaseInfo},
  data () {
    return {
      components: ['BookCaseNotlogin', 'BookCaseInfo'],
      currentIndex: 0
    }
  },
  created() {
    if(sessionStorage.token){
      this.currentIndex = 1
    }
  },
  methods: {
    onFocus() {
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
