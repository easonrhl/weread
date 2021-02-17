<template>
  <div class="box">
    <div class="info">
      <h2>{{ data.name }}</h2>
      <ul>
        <li v-for="(v, i) in data.books" :key="i">
          <h3><span>{{ i+1 }}</span>{{ v.title }}</h3>
        </li>
      </ul>
    </div>
    <img :src="imgSrc" alt="" />
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
  data() {
    return {}
  },
  computed: {
    imgSrc(){
      return this.data.books[0].cover
    }
  }
}
</script>
<style lang="less" scoped>
.box {
  display: flex;
  height: 130px;
  overflow: hidden;
  margin: 18px;
  border-radius: 10px;
  img {
    width: 88px;
    height: 100%;
    object-fit: cover;
  }
}
.info {
  flex: 1;
  padding: 16px;
  overflow: hidden;
  background-color: @background-color;
  li {
    margin: 10px 0;
    font-size: @font-size-sm;
    color: @color-third;
    span::after{
      content: '. ';
    }
  }
  h2{
    margin: 0;
    font-size: @font-size-lg;
    color: @color-first; 
  }
  h3 {
    margin: 0;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    font-weight: normal;
  }
}
</style>
