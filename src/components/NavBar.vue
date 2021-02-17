<template>
  <div class="nav-wrap">
    <span v-for="(v, i) in data" :key="v" @click="change(i)" :class="{ active: currentIndex === i }">{{ v }}</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default() {
        return []
      }
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    change(index) {
      this.currentIndex = index
      this.$emit('toggle', index)
    }
  }
}
</script>
<style lang="less" scoped>
.nav-wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 40px;
  font-size: @font-size-lg;
  color: @color-second;
  background-color: #fff;
}
.active {
  color: @active-color;
}
</style>
