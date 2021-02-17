<template>
  <div class="search-wrap">
    <nav-top left-arrow title="搜索" :border="isRise" @click-left="onClickLeft" />
    <van-search
      v-model="search"
      shape="round"
      placeholder="搜索"
      class="search"
      :class="{ 'search-move': isRise }"
      ref="search"
      clear-trigger="always"
      @search="onSearch"
      @clear="onClear"
      @input="onInput"
    />
    <search-history v-show="showHis" :data="hisData" @getHis="getHis" @deleteHis="deleteHis"></search-history>
    <scroll
      ref="scroll"
      class="wrapper"
      :class="{ 'wrapper-move': isRise }"
      pullup
      listenScroll
      :probeType="3"
      @scrollToEnd="getData"
      @scroll="onScroll"
    >
      <template v-if="!inputing">
        <book-item v-for="(v, i) in data" :key="i" :data="v" :class="{ book: !isFix }"></book-item>
      </template>
      <template v-else>
        <search-info-item
          v-for="(v, i) in prompt"
          :key="i"
          :data="v"
          :class="{ info: !isFix }"
          @chose="onChose"
        ></search-info-item>
      </template>
    </scroll>
    <span class="not-find" v-show="!isFind">没有找到相关书籍</span>
  </div>
</template>

<script>
import Scroll from 'components/Scroll'
import BookItem from 'components/BookItem'
import NavTop from 'components/NavTop'
import SearchInfoItem from './SearchInfoItem'
import SearchHistory from './SearchHistory'
import { getSearchInfo } from 'network/search'
export default {
  name: 'SearchInfo',
  components: { Scroll, BookItem, NavTop, SearchInfoItem, SearchHistory },
  data() {
    return {
      search: '',
      data: [],
      prompt: [],
      page: 1,
      isRise: false,
      isFix: false,
      isFind: true,
      inputing: true,
      pos: 0,
      showHis: true,
      hisData: []
    }
  },
  watch: {
    data() {
      this.inputing ||
        this.$nextTick(() => {
          this.$refs.scroll.refresh()
        })
    },
    prompt() {
      this.inputing &&
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
  created() {
    if(localStorage.searchHistory){
      this.hisData = JSON.parse(localStorage.searchHistory)
    }
  },
  mounted() {
    this.$refs.search.querySelector('input').focus()
  },
  methods: {
    async getData() {
      if (!this.search) return
      let res = await getSearchInfo(this.search, this.page++)
      if (res && !this.inputing) this.highLight(res)
      res && this.data.push(...res)
      this.inputing && this.promptData()
    },
    initData() {
      this.isRise && (this.isFix = true)
      this.pos = 0
      this.data = []
      this.prompt = []
      this.page = 1
      this.isFind = true
    },
    highLight(data) {
      for (let v of data) {
        let regexp = new RegExp(this.search.replace(/[^\u4E00-\u9FA5A-Za-z0-9\s]/g, ''))
        if (regexp.test(v.author)) {
          v.author = v.author.replace(regexp, '<span style="color: #409eff">$&</span>')
        }
        if (regexp.test(v.title)) {
          v.title = v.title.replace(regexp, '<span style="color: #409eff">$&</span>')
        }
      }
    },
    promptData() {
      for (let v of this.data) {
        let regexp = new RegExp(this.search.replace(/[^\u4E00-\u9FA5A-Za-z0-9\s]/g, ''))
        if (regexp.test(v.author)) {
          this.prompt.push(v.author.replace(regexp, '<span style="color: #409eff">$&</span>'))
        }
        if (regexp.test(v.title)) {
          this.prompt.push(v.title.replace(regexp, '<span style="color: #409eff">$&</span>'))
        }
      }
      this.prompt = [...new Set(this.prompt)]
    },
    onClickLeft() {
      this.$router.go(-1)
    },
    onScroll({ x, y }) {
      if (!this.data.length && !this.prompt.length) return
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
    async onSearch() {
      if(!this.search) return
      let history = localStorage.searchHistory
      if(history) {
        history = JSON.parse(history)
        history.push(this.search)
      } else{
        history = []
        history.push(this.search)
      }
      this.hisData = history
      localStorage.searchHistory = JSON.stringify(history)
      this.initData()
      this.inputing = false
      await this.getData()
      this.isFind = true
      this.data.length || (this.isFind = false)
      this.highLight(this.data)
    },
    onClear() {
      this.initData()
      this.$refs.search.querySelector('input').focus()
      this.isRise &&
        this.$nextTick(() => {
          this.isRise = true
        })
    },
    onInput() {
      this.initData()
      if (this.search === '') {
        this.initData()
        return this.showHis = true
      }
      this.showHis = false
      this.isFind || (this.isFind = true)
      this.inputing = true
      this.getData()
    },
    onChose(value) {
      this.search = value
      this.initData()
      this.onSearch()
    },
    getHis(v) {
      this.search = v
      this.showHis = false
      this.onSearch()
    },
    deleteHis() {
      this.hisData = []
    }
  }
}
</script>
<style lang="less" scoped>
.search-wrap {
  position: relative;
  z-index: 9;
  background-color: #fff;
}
.search {
  padding: 6px 12px;
  transition: 0.1s;
  background-color: transparent;
}
.search-move {
  position: absolute;
  z-index: 2;
  transform: translate3d(0, -46px, 0);
  left: 40px;
  right: 0;
}
.wrapper {
  height: calc(100vh - 92px);
  overflow: hidden;
}
.wrapper-move {
  height: calc(100vh - 46px);
  & .book:first-child {
    margin-top: 66px;
  }
  & .info:first-child {
    margin-top: 46px;
  }
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
