<template>
  <scroll class="wrapper" ref="scroll">
    <div class="container">
      <book-case-item v-for="(v, i) in data" :key="i" :data="v"></book-case-item>
    </div>
  </scroll>
</template>

<script>
import Scroll from '@/components/Scroll.vue'
import BookCaseItem from './BookCaseItem'
export default {
  components: { BookCaseItem, Scroll },
  data() {
    return {
      data: this.$store.state.user.bookcase
    }
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    }
  },
}
</script>

<style lang="less" scoped>
.wrapper {
  height: calc(100vh - 147px);
  padding: 0 10px;
  overflow: hidden;
}
.container{
  display: flex;
  flex-wrap: wrap;
}
</style>
