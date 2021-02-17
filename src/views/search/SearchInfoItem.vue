<template>
  <div class="info-item" @click="onClick">
    <i class="iconfont icon-search"></i>
    <div class="content" v-html="data"></div>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: String,
      default: ''
    }
  },
  methods: {
    onClick() {
      this.$emit('chose', this.data.replace(/<span style="color: #409eff">|<\/span>/g, ''))
    }
  }
}
</script>

<style lang="less" scoped>
.info-item {
  display: flex;
  align-items: center;
  height: 50px;
  overflow: hidden;
  font-size: @font-size-md;
  color: @color-second;
  i {
    margin: 0 18px;
  }
  .content {
    flex: 1;
    padding-right: 18px;
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
}
</style>
