<template>
  <div class="container">
    <div class="toggle" @click="onClick">注册</div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.username"
        name="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="user.password"
        type="password"
        name="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">登录</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import {login} from 'network/user'
export default {
  components: {},
  data() {
    return {
      user: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      let res = await login(this.user)
      if(!res.result) {
        return this.$toast.fail(res.msg)
      }
      this.$toast.success('登录成功')
      sessionStorage.token = res.token
      this.$store.commit('updateUser', res.data)
      this.$emit('login')
    },
    onClick() {
      this.$emit('toggle', 2)
    }
  }
}
</script>

<style lang="less" scoped>
.container {
  padding: 10px 20px;
}
.toggle {
  float: right;
  font-size: @font-size-md;
  color: @color-second;
  margin-bottom: 10px;
}
</style>
