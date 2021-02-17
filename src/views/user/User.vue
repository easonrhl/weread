<template>
  <div class="user">
    <component :is="components[currentIndex]" @toggle="toggle" @login="login" @edit="edit" @back="back"></component>
  </div>
</template>

<script>
import UserInfo from './UserInfo'
import UserInfoEdit from './UserInfoEdit'
import UserLogin from './UserLogin'
import UserRegister from './UserRegister'
export default {
  name: 'User',
  components: { UserInfo, UserLogin, UserRegister, UserInfoEdit },
  data() {
    return {
      components: ['UserInfo', 'UserLogin', 'UserRegister', 'UserInfoEdit'],
      currentIndex: 1
    }
  },
  created() {
    if (sessionStorage.token) {
      this.currentIndex = 0
    }
  },
  methods: {
    toggle(i) {
      this.currentIndex = i
    },
    login() {
      this.currentIndex = 0
    },
    edit() {
      this.currentIndex = 3
    },
    back() {
      this.currentIndex = 0
    }
  }
}
</script>

<style lang="less" scoped></style>
