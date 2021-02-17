<template>
  <div class="edit-wrap">
    <nav-top title="编辑个人资料" left-arrow @click-left="onClick"></nav-top>
    <div class="info">
      <div class="avatar">
        <span>头像</span>
        <van-uploader :after-read="upload">
          <img :src="$store.state.user.avatar" alt="" v-if="avatar" />
          <div class="add" v-else>
            <i class="iconfont icon-add"></i>
          </div>
        </van-uploader>
      </div>
      <div class="uname">
        <span>用户名</span>
        <van-field v-model="username" ref="field" input-align="right" @blur="change" @keyup.enter="change" />
      </div>
    </div>
  </div>
</template>

<script>
import NavTop from '@/components/NavTop.vue'
import {uploadAvatar, updateUname} from 'network/user'
export default {
  components: { NavTop },
  data() {
    return {
      username: this.$store.state.user.username
    }
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
      this.$emit('back')
    },
    async upload(file) {
      let avatar = await uploadAvatar(file.file)
      this.$store.commit('updateAvatar', avatar)
    },
    async change() {
      if(!this.username) return
      if(this.username === this.$store.state.user.username) return
      let res = await updateUname(this.username)
      if(!res.result){
        return this.$toast.fail(res.msg)
      }
      this.$store.commit('updateUname', this.username)
      sessionStorage.token = res.token
      this.$toast.success(res.msg)
    }
  }
}
</script>

<style lang="less" scoped>
.edit-wrap {
  span {
    flex-shrink: 0;
    font-size: @font-size-lg;
    color: @color-second;
  }
}
.avatar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  border-bottom: 1px solid @border-color;
  img {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    border: 1px solid @border-color;
    object-fit: cover;
  }
}
.add {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  border: 1px dashed @border-color;
  text-align: center;
  line-height: 50px;
  i{
    color: @color-fourth;
    font-size: 20px;
  }
}
.uname {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 4px 10px 20px;
  border-bottom: 1px solid @border-color;
}
</style>
