import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  user: {
    token: ''
  },

  mutations: {
    setToken(user, token) {
      user.token = token
    }
  }
})
