// 用户模块
export default {
  namespaced: true,
  state () {
    return {
      token: localStorage.getItem('jikeyuan-token')
    }
  },
  getters: {},
  mutations: {
    setToken (state, token) {
      state.token = token
      localStorage.setItem('jikeyuan-token', token)
    }
  },
  actions: {}
}
