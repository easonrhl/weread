<template>
  <div ref="wrapper">
    <div class="content clearfix">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from '@better-scroll/core'
export default {
  props: {
    probeType: {
      type: Number,
      default: 1
    },
    click: {
      type: Boolean,
      default: true
    },
    listenScroll: {
      type: Boolean,
      default: false
    },
    pullup: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    this.$nextTick(() => {
      this.initScroll()
    })
  },
  data() {
    return {}
  },
  methods: {
    initScroll() {
      if (!this.$refs.wrapper) {
        return
      }
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: this.click
      })
      if (this.listenScroll) {
        this.scroll.on('scroll', position => {
          this.$emit('scroll', position)
        })
      }
      if (this.pullup) {
        this.scroll.on('scrollEnd', () => {
          // + 50 可提前加载数据
          if(!this.pullup) return
          if (this.scroll.y <= this.scroll.maxScrollY + 50) {
            this.$emit('scrollToEnd')
          }
        })
      }
    },
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    scrollTo() {
      this.scroll && this.scroll.scrollTo(...arguments)
    }
  }
}
</script>

<style lang="less" scoped>
.content{
  padding-bottom: 10px;
}
</style>