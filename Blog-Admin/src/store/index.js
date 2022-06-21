import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    needToLogin: true,
    token: '',
    userInfo: JSON.parse(sessionStorage.getItem('userInfo'))
  },
  mutations: {
    // set
    SET_TOKEN: (state, token) => {
      state.token = token
      localStorage.setItem('token', token)
    },
    SET_USERINFO: (state, userInfo) => {
      state.userInfo = userInfo
      sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
    },
    REMOVE_INFO: (state) => {
      state.needToLogin = true
      state.token = ''
      state.userInfo = {}
      localStorage.setItem('token', '')
      sessionStorage.setItem('userInfo', JSON.stringify(''))
    },
    LOGIN: (state) => {
      state.needToLogin = false
    }
  },
  getters: {
    // get
    getUserInfo: state => {
      return state.userInfo
    },

    getToken: state => {
      return state.token
    },

    getNeedtoLogin: state => {
      return state.needToLogin
    }

  },
  actions: {
  },
  modules: {
  }
})
