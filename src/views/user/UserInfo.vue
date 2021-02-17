<template>
  <div class="container">
    <nav-top title="主页"></nav-top>
    <div class="user-wrap">
      <div class="info">
        <img :src="$store.state.user.avatar" alt="" v-if="avatar" />
        <div class="avatar" v-else>
          <i class="iconfont icon-Serviceusers"></i>
        </div>
        <span class="username">{{ $store.state.user.username }}</span>
      </div>
      <div class="edit" @click="onClick">编辑个人资料</div>
    </div>
    <div class="logout" @click="logout">退出登录</div>
  </div>
</template>

<script>
import NavTop from '@/components/NavTop.vue'
export default {
  components: {NavTop},
  data() {
    return {}
  },
  computed: {
    avatar() {
      if (!this.$store.state.user.avatar) {
        return false
      }
      return true
    }
  },
  methods: {
    onClick() {
      this.$emit('edit')
    },
    logout() {
      sessionStorage.removeItem('token')
      this.$router.go(0)
    }
  }
}
</script>

<style lang="less" scoped>
.container{
  height: calc(100vh - 55px);
  background-color: @background-color;
}
.user-wrap {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px;
}
.info {
  display: flex;
  align-items: center;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid @border-color;
    object-fit: cover;
  }
}
.avatar {
  width: 50px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  border-radius: 50%;
  border: 1px solid @border-color;
  background-color: @background-color;
  i {
    color: @color-fourth;
    font-size: 30px;
  }
}
.username {
  margin-left: 15px;
  font-size: 23px;
  font-weight: bold;
  color: @color-second;
}
.edit {
  font-size: @font-size-sm;
  color: @color-third;
}
.logout{
  margin: 15px 20px;
  height: 50px;
  text-align: center;
  line-height: 50px;
  font-size: @font-size-lg;
  color: #ee0a24;
  border-radius: 15px;
  background-color: #fff;
}
</style>
