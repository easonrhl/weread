<template>
  <div class="top-wrap" :class="{ border: border }">
    <div class="left" @click="onClickLeft">
      <slot name="left"><i class="iconfont icon-left" v-if="leftArrow"></i></slot>
    </div>
    <div class="center">{{ title }}</div>
  </div>
</template>

<script>
export default {
  props: {
    title: String,
    border: {
      type: Boolean,
      default: false
    },
    'left-arrow': {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {}
  },
  methods: {
    onClickLeft() {
      this.$emit('click-left')
    }
  }
}
</script>
<style lang="less" scoped>
.top-wrap {
  display: flex;
  height: 46px;
  box-sizing: border-box;
  font-size: @font-size-lg;
}
.border {
  border-bottom: 1px solid @border-color;
}
.left {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 52px;
  height: 100%;
}
.center {
  display: flex;
  justify-content: center;
  align-items: center;
  flex: 1;
  height: 100%;
  padding-right: 52px;
  box-sizing: border-box;
  font-weight: bold;
  color: @color-first;
}
</style>
