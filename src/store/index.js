import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: {
      token: ''
    }
  },

  mutations: {
    setToken(state, token) {
      state.user.token = token
    }
  },

  getters: {
    getToken: state=> { return state.user.token }
  }
})
