<template>
  <div class="tab-wrap" v-if="data">
    <span v-for="(v, i) in data" :key="i" :class="{ active: currentIndex === i }" @click="onClick(v.sid, i)">{{ v.sname }}</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Array,
      default: null
    }
  },
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    onClick(sid, index) {
      if(this.currentIndex === index) return
      this.currentIndex = index
      this.$emit('toggle', {sid, index})
    }
  }
}
</script>
<style lang="less" scoped>
.tab-wrap {
  display: flex;
  flex-wrap: wrap;
  margin: 0 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid @border-color;
  color: @color-third;
  background-color: #fff;
  span {
    width: calc(100% / 4);
    display: block;
    margin: 5px 0;
    font-size: @font-size-md;
    white-space: nowrap;
  }
}
.active {
  font-weight: bold;
  color: @active-color;
}
</style>
