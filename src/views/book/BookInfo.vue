<template>
  <div class="bookinfo-wrap">
    <nav-top left-arrow @click-left="onClickLeft" />
    <div class="info-top">
      <img :src="data.cover" alt="" />
      <div class="info-right">
        <h2 class="title">{{ data.title }}</h2>
        <div class="author">{{ data.author }}</div>
        <p class="desc" @click="more">{{ data.desc }}</p>
      </div>
    </div>
    <div class="info-bottom">
      <div class="rate">
        <div>
          {{ data.star }}
          <van-rate v-model="star" disabled size="12"></van-rate>
        </div>
        <span>{{ data.more_rating }}</span>
      </div>
      <div class="read-number">
        <div>
          {{ data.more_number }} <span>{{ unit }}</span>
        </div>
        <span>阅读此书</span>
      </div>
    </div>
    <van-popup class="popup" v-model="show" round>
      <h3>简介</h3>
      <p>{{ this.data.desc }}</p>
    </van-popup>
    <book-bottom-btn :data="data"></book-bottom-btn>
  </div>
</template>

<script>
import NavTop from 'components/NavTop'
import BookBottomBtn from './BookBottomBtn'
import { getBook } from 'network/book'
export default {
  name: 'BookInfo',
  components: { NavTop, BookBottomBtn },
  data() {
    return {
      data: {},
      id: this.$route.params.id,
      show: false
    }
  },
  computed: {
    unit() {
      let number = this.data.more_number
      let unit = number > 70 ? '人' : '万人'
      return unit
    },
    star() {
      return this.data.star / 2
    }
  },
  async created() {
    this.data = await getBook(this.id)
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1)
    },
    more() {
      this.show = true
    }
  }
}
</script>

<style lang="less" scoped>
.bookinfo-wrap {
  position: relative;
  z-index: 9;
  height: 100vh;
  background-color: #fff;
}
.info-top {
  display: flex;
  margin: 0 20px;
  padding: 20px 0;
  box-sizing: border-box;
  img {
    width: 108px;
    height: 155px;
  }
}
.info-right {
  flex: 1;
  padding: 0 15px;
  box-sizing: border-box;
  h2 {
    margin: 0;
    font-size: 17px;
    color: @color-first;
    line-height: 23px;
  }
  p {
    height: 34px;
    margin: 0;
    font-size: @font-size-sm;
    color: @color-second;
    line-height: 17px;
    text-overflow: -o-ellipsis-lastline;
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    line-clamp: 2;
    -webkit-box-orient: vertical;
  }
}
.author {
  margin: 10px 0;
  font-size: @font-size-md;
  color: @active-color;
}
.info-bottom {
  display: flex;
  margin: 0 20px;
  padding: 10px 0 20px;
  box-sizing: border-box;
  font-size: 18px;
  font-weight: bold;
  color: @color-second;
  border-bottom: 1px solid @border-color;
  span {
    font-size: @font-size-sm;
    font-weight: normal;
    color: @color-third;
  }
}
.rate,
.read-number {
  flex: 1;
}
.popup{
  width: 75vw;
  padding: 0 20px;
  h3{
    font-weight: normal;
    font-size: 17px;
    color: @color-second;
  }
  p{
    font-size: 15px;
    line-height: 23px;
    color: @color-third;
  }
}
</style>
