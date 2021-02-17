<template>
  <scroll class="wrapper" ref="scroll">
    <home-category-item v-for="(v, i) in data" :key="i" :data="v" @click.native="onClick(v.id)"></home-category-item>
  </scroll>
</template>

<script>
import HomeCategoryItem from './HomeCategoryItem'
import Scroll from 'components/Scroll'
import { getCategory } from 'network/home'
export default {
  components: {
    HomeCategoryItem,
    Scroll
  },
  data() {
    return {
      data: []
    }
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    }
  },
  async created() {
    this.data = await getCategory()
  },
  methods: {
    onClick(id) {
      this.$router.push({ name: 'category', params: { id } })
    }
  }
}
</script>
<style lang="less" scoped>
.wrapper {
  height: calc(100vh - 187px);
  overflow: hidden;
}
</style>
