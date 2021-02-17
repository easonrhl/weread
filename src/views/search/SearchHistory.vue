<template>
  <div class="tag-wrap" v-if="data.length">
    <div class="btn-wrap">
      <span>搜索历史</span>
      <span class="btn" @click="deleteAll">清空</span>
    </div>
    <div class="tag" v-for="(v, i) in data" :key="i" @click="onClick(v)">{{ v }}</div>
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
  methods: {
    deleteAll() {
      localStorage.removeItem('searchHistory')
      this.$emit('deleteHis')
    },
    onClick(v) {
      this.$emit('getHis', v)
    }
  }
}
</script>

<style lang="less" scoped>
.tag-wrap {
  display: felx;
  flex-wrap: wrap;
  justify-content: space-between;
  position: absolute;
  z-index: 9;
  width: 100vw;
  padding: 0 20px;
  box-sizing: border-box;
  color: @color-second;
  background-color: #fff;
}
.btn-wrap {
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
  margin: 15px 0;
  font-size: @font-size-md;
  .btn {
    color: @active-color;
  }
}
.tag {
  display: inline-block;
  min-width: 60px;
  max-width: 160px;
  height: 30px;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
  padding: 0 10px;
  box-sizing: border-box;
  border: 1px solid @border-color;
  border-radius: 30px;
  font-size: @font-size-sm;
  line-height: 30px;
  text-align: center;
  margin: 0 5px 10px 0;
}
</style>
