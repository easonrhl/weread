<template>
  <div class="wrap">
    <nav-top left-arrow :title="title" :border="isRise && !tab" @click-left="onClickLeft" />
    <van-search
      v-model="search"
      shape="round"
      placeholder="搜索"
      class="search"
      :clearable="false"
      :class="{ 'search-move': isRise }"
      @focus="onFocus"
      @search="onSearch"
      @input="onInput"
    />
    <div class="container" :class="{ 'container-move': isRise }">
      <category-nav-tab :data="tabData" @toggle="toggle"></category-nav-tab>
      <scroll
        class="wrapper"
        ref="scroll"
        :pullup="pullup"
        listenScroll
        :probeType="3"
        @scrollToEnd="getData(index)"
        @scroll="onScroll"
      >
        <book-item
          v-for="(v, i) in data"
          :key="i"
          serial
          :data="v"
          :index="i + 1"
          :class="{ book: !isFix }"
        ></book-item>
      </scroll>
    </div>
    <span class="not-find" v-show="!isFind">没有找到相关书籍</span>
  </div>
</template>

<script>
import Scroll from 'components/Scroll'
import BookItem from 'components/BookItem'
import NavTop from 'components/NavTop'
import CategoryNavTab from './CategoryNavTab'
import { getSubCategory, getBooks, getTitle, getSearchBooks } from 'network/category'
export default {
  name: 'CategoryRank',
  components: {
    Scroll,
    BookItem,
    CategoryNavTab,
    NavTop
  },
  data() {
    return {
      search: '',
      params: {
        id: this.$route.params.id,
        sid: 0
      },
      title: '',
      tab: null,
      books: [],
      data: [],
      index: 0,
      pullup: true,
      isRise: false,
      isFix: false,
      pos: 0,
      isFind: true
    }
  },
  computed: {
    tabData() {
      this.tab && this.tab.unshift({ sid: 0, sname: '全部' })
      return this.tab
    }
  },
  watch: {
    data() {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },
    tab() {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    },
    isFix() {
      this.$nextTick(() => {
        this.$refs.scroll.refresh()
      })
    }
  },
  async created() {
    this.getData(this.index)
    let title = getTitle(this.params.id)
    let tab = getSubCategory(this.params.id)
    this.title = await title
    this.tab = await tab
  },
  methods: {
    async getData(index) {
      this.books[index] || (this.books[index] = { data: [], page: 1 })
      let res = await getBooks(this.params, this.books[index].page++)
      if (res) {
        this.books[index].data.push(...res)
      }
      this.data = this.books[index].data
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    toggle({ sid, index }) {
      this.isRise &&
        this.$nextTick(() => {
          this.isRise = true
        })
      this.data = []
      this.params.sid = sid
      this.index = index
      this.isRise && (this.isFix = true)
      this.pos = 0
      if (this.search) {
        return this.onSearch()
      }
      this.getData(index)
    },
    onScroll({ x, y }) {
      if (y > -50) {
        if (this.isFix) {
          if (y > this.pos) {
            this.isRise = this.isFix = false
          }
          this.pos = y
        } else {
          this.isRise = false
        }
      } else {
        this.isRise = true
      }
    },
    onFocus() {
      this.isRise || (this.isFix = true)
      this.isRise = true
    },
    async onSearch() {
      if (!this.search) return
      this.pos = 0
      this.isRise && (this.isFix = true)
      this.pullup = false
      this.data = []
      let res = await getSearchBooks(this.params, this.search)
      res && (this.data = res)
      this.isFind = true
      if (!this.data) this.isFind = false
      for (let v of this.data) {
        let regexp = new RegExp(this.search.replace(/[^\u4E00-\u9FA5A-Za-z0-9\s]/g, ''))
        if (regexp.test(v.author)) {
          v.author = v.author.replace(regexp, '<span style="color: #409eff">$&</span>')
        }
        if (regexp.test(v.title)) {
          v.title = v.title.replace(regexp, '<span style="color: #409eff">$&</span>')
        }
      }
    },
    onInput() {
      if (this.search === '') {
        this.data = []
        this.pullup = true
        this.getData(this.index)
      }
    }
  }
}
</script>
<style lang="less" scoped>
.wrap {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.container {
  display: flex;
  flex-direction: column;
  height: calc(100vh - 92px);
}
.container-move {
  height: calc(100vh - 46px);
  & .book:first-child {
    margin-top: 66px;
  }
}
.wrapper {
  flex: 1;
  overflow: hidden;
}
.search {
  padding: 6px 12px;
  transition: 0.1s;
  background-color: transparent;
}
.search-move {
  position: absolute;
  transform: translate3d(0, -46px, 0);
  z-index: 2;
  left: 40px;
  right: 0;
}
.not-find {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  font-size: @font-size-sm;
  color: @color-third;
}
</style>
