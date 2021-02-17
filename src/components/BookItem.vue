<template>
  <div class="book-wrap" @click="onClick">
    <div class="index" v-if="serial">{{ index }}</div>
    <img v-lazy="data.cover" alt="" :class="{ 'img-pos': !serial }" />
    <div class="info">
      <h2 v-html="data.title"></h2>
      <div class="author" v-html="data.author"></div>
      <div class="read">
        <span>{{ data.star }}</span>
        <van-rate v-model="star" disabled allow-half size="12px" gutter="2px" class="rate" />
        <span>{{ reading }}</span>
      </div>
    </div>
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
    },
    serial: {
      type: Boolean,
      default: false
    },
    index: Number
  },
  data() {
    return {
      star: this.data.star && this.data.star / 2
    }
  },
  computed: {
    reading() {
      let number = this.data.reading_number
      let unit = number > 10 || this.data.star < 5 ? '人' : '万人'
      return number + unit + '今日阅读'
    }
  },
  methods: {
    onClick() {
      if (this.data.category) {
        this.$router.push({ name: 'bookinfo', params: { id: this.data.bookid } })
      } else {
        this.$router.push({ name: 'bookinfo', params: { id: 'top_' + this.data.bookid } })
      }
    }
  }
}
</script>
<style lang="less" scoped>
.book-wrap {
  display: flex;
  height: 93px;
  margin: 20px 0;
  box-sizing: border-box;
  img {
    width: 64px;
    height: 100%;
    border: 1px solid @border-color;
    box-sizing: border-box;
    object-fit: cover;
  }
  .img-pos {
    margin-left: 24px;
  }
  h2 {
    margin: 0;
    font-size: @font-size-lg;
    color: @color-first;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
}
.book-small {
  height: 69px;
}
.index {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 100%;
  font-size: @font-size-lg;
  color: @color-second;
}
.info {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 100%;
  padding: 0 16px;
  overflow: hidden;
}
.author {
  margin: 10px 0;
  font-size: @font-size-md;
  color: @color-second;
}
.read {
  font-size: @font-size-sm;
  color: @color-third;
}
.rate {
  margin: 0 5px;
}
</style>
