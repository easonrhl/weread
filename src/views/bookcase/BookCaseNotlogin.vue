<template>
  <div class="not-login">
    <div class="login" @click="onClick">未登录</div>
  </div>
</template>

<script>
export default {
  methods: {
    onClick() {
      this.$router.replace('/user')
    }
  }
}
</script>

<style lang="less" scoped>
.not-login {
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 147px);
}
.login{
  width: 200px;
  height: 40px;
  border-radius: 15px;
  font-size: @font-size-lg;
  line-height: 40px;
  text-align: center;
  color: #fff;
  background: linear-gradient(90deg, #0087fc, #28b7ff);
}
</style>
