// 用户模块
export default {
  namespaced: true,
  state () {
    return {
      token: localStorage.getItem('geek-store-token')
    }
  },
  getters: {},
  mutations: {
    setToken (state, token) {
      state.token = token
      localStorage.setItem('geek-store-token', token)
    }
  },
  actions: {}
}
