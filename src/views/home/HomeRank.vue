<template>
  <scroll class="wrapper" ref="scroll" pullup @scrollToEnd="getData">
    <book-item v-for="(book, i) in data" :key="i" serial :data="book" :index="i+1"></book-item>
  </scroll>
</template>

<script>
import BookItem from 'components/BookItem'
import Scroll from 'components/Scroll'
import {getTop} from 'network/home.js'
export default {
  components: {
    BookItem,
    Scroll
  },
  data() {
    return {
      data: [],
      page: 1
    }
  },
  watch: {
    data(){
      this.$nextTick(()=> {
        this.$refs.scroll.refresh()
      })
    }
  },
  created () {
    this.getData()
  },
  methods: {
    async getData(){
      let res = await getTop(this.page++)
      res && this.data.push(...res)
    }
  }
}
</script>
<style lang="less" scoped>
.wrapper{
  height: calc(100vh - 187px) ;
  overflow: hidden;
}
</style>
