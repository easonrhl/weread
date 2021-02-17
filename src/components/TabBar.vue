<template>
  <div class="tb-wrap">
    <div
      class="item"
      v-for="(item, i) in data"
      :key="i"
      :class="{ active: currentIndex === i }"
      @click="change(i, item.path)"
    >
      <i :class="item.icon"></i>
      <span>{{ item.text }}</span>
    </div>
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
  watch: {
    $route(to) {
      if (to.path === '/home') {
        this.currentIndex = 0
      } else if (to.path === '/bookcase') {
        this.currentIndex = 1
      } else if (to.path === '/user') {
        this.currentIndex = 2
      }
    }
  },
  methods: {
    change(index, path) {
      if (this.$route.path === path) return
      this.currentIndex = index
      this.$router.replace(path)
    }
  }
}
</script>

<style lang="less" scoped>
.tb-wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  z-index: 1;
  bottom: 0;
  width: 100vw;
  height: 55px;
  border-top: 1px solid @border-color;
  box-sizing: border-box;
  background-color: #fff;
}
.item {
  display: flex;
  flex-direction: column;
  align-items: center;
  font-size: @font-size-sm;
  color: @color-second;
  i {
    margin-bottom: 5px;
    font-size: 20px;
  }
}
.active {
  color: @active-color;
}
</style>
