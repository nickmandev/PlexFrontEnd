import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: {
      token: '',
      video: Object
    }
  },

  mutations: {
    setToken(state, token) {
      state.user.token = token
    },
    currentVideo(state, video) {
      state.user.video = video
    }
  },

  getters: {
    getToken: state => { return state.user.token },
    getVideo: state => { return state.user.video }
  }
})
