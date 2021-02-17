<template>
  <div class="case-item" @click="onClick">
    <img :src="data.cover" alt="" />
    <span>{{data.title}}</span>
  </div>
</template>

<script>
export default {
  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  methods: {
    onClick() {
      if(this.data.type === 'top') {
        return this.$router.push({name: 'bookinfo', params: {id: `top_${this.data.bookid}`}})
      }
      this.$router.push({name: 'bookinfo', params: {id: this.data.bookid}})
    }
  }
}
</script>

<style lang="less" scoped>
.case-item {
  width: 88px;
  margin: 15px calc((100vw - 284px) / 6);
  overflow: hidden;
  img{
    width: 88px;
    height: 130px;
    object-fit: cover;
  }
  span{
    display: block;
    margin-top: 10px;
    font-size: @font-size-sm;
    font-weight: bold;
    color: @color-first;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
</style>
