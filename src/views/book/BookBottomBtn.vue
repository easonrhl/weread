<template>
  <div class="btn-wrap">
    <div class="bookcity" @click="toBookCity">
      <i class="iconfont icon-icon_home"></i>
      <span>书城</span>
    </div>
    <div class="bookcase-add" v-if="!isAdd" @click="add">
      <i class="iconfont icon-bookcaseadd"></i>
      <span>加入书架</span>
    </div>
    <div class="bookcase-added" v-else @click="add">
      <i class="btn-icon"></i>
      <span>已加入书架</span>
    </div>
  </div>
</template>

<script>
import { updateBookcase } from 'network/book'
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
    return {
      key: this.data.category ? 'book' : 'top'
    }
  },
  computed: {
    isAdd() {
      let bookcase = this.$store.state.user.bookcase
      if (bookcase) {
        for (let v of bookcase) {
          if (v.bookid === this.data.bookid && v.type === this.key) {
            return true
          }
        }
      }
      return false
    }
  },
  watch: {
    data() {
      this.key = this.data.category ? 'book' : 'top'
    }
  },
  methods: {
    async add() {
      if (!sessionStorage.token) {
        return this.$toast.fail('请先登录')
      }
      if (this.isAdd) {
        return this.$dialog
          .confirm({
            title: '移出书架',
            message: `是否将《${this.data.title}》移出书架`
          })
          .then(async () => {
            let res = await updateBookcase(this.data.bookid, this.key)
            this.$store.commit('updateBookcase', res)
          })
          .catch(() => {})
      }
      let res = await updateBookcase(this.data.bookid, this.key)
      this.$store.commit('updateBookcase', res)
    },
    toBookCity() {
      this.$router.replace('/home')
    }
  }
}
</script>

<style lang="less" scoped>
.btn-wrap {
  display: flex;
  justify-content: space-around;
  align-items: center;
  position: absolute;
  bottom: 0;
  width: 100vw;
  height: 55px;
  box-shadow: 0 -0.3px 20px rgba(0, 0, 0, 0.1);
}
.bookcity {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: @font-size-sm;
  color: @color-second;
  i {
    margin-bottom: 4px;
    font-size: 23px;
  }
}
.bookcase-add {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 146px;
  height: 40px;
  font-size: 14px;
  color: #fff;
  border-radius: 30px;
  background: linear-gradient(90deg, #0087fc, #28b7ff);
  i {
    font-size: 18px;
    margin-right: 10px;
  }
}
.bookcase-added {
  display: flex;
  justify-content: center;
  align-items: center;
  width: 146px;
  height: 40px;
  font-size: 14px;
  color: @color-second;
  border-radius: 30px;
  background: rgba(0, 0, 0, 0.03);
  .btn-icon {
    display: inline-block;
    width: 24px;
    height: 24px;
    vertical-align: top;
    margin-right: 6px;
    background-repeat: no-repeat;
    background-size: 100%;
    background-image: url(https://weread-1258476243.file.myqcloud.com/web/wrwebnjlogic/image/reader_bottom_bookshelf_added_white_2x.58c07219.png);
  }
}
</style>
