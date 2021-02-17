import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
  state: {
    user: {
      username: '',
      avatar: '',
      bookcase: ''
    }
  },
  getters: {},
  mutations: {
    updateUser(state, payload) {
      state.user = payload
    },
    updateAvatar(state, payload) {
      state.user.avatar = payload
    },
    updateUname(state, payload) {
      state.user.username = payload
    },
    updateBookcase(state, payload) {
      state.user.bookcase = payload
    }
  },
  actions: {},
  modules: {}
})

export default store
