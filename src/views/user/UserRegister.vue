<template>
  <div class="container">
    <div class="toggle" @click="onClick">登录</div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="user.username"
        name="用户名"
        placeholder="用户名"
        :rules="[{ validator: username }]"
      />
      <van-field
        v-model="user.password"
        type="password"
        name="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="user.confirm"
        type="password"
        name="确认密码"
        placeholder="确认密码"
        :rules="[{ validator: confirm }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">注册</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { register, validateUname } from 'network/user'
export default {
  components: {},
  data() {
    return {
      user: {
        username: '',
        password: '',
        confirm: ''
      }
    }
  },
  methods: {
    async onSubmit() {
      let res = await register(this.user)
      if (!res.result) {
        return this.$toast.fail(res.msg)
      }
      this.$toast.success(res.msg)
      sessionStorage.token = res.token
      this.$store.commit('updataUser', res.data)
      this.$emit('login')
    },
    onClick() {
      this.$emit('toggle', 1)
    },
    async username(val, rule) {
      if(!this.user.username){
        rule.message= '请填写用户名'
        return false
      }
      let res = await validateUname(val)
      rule.message = res.msg
      return res.result
    },
    confirm(val, rule) {
      if (!this.user.confirm) {
        rule.message = '请再次填写密码'
        return false
      }
      if (this.user.password !== this.user.confirm) {
        rule.message = '两次密码不一致'
        return false
      }
      return true
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
