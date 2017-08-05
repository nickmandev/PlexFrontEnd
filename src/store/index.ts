import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: {
      token: String,
      username: String,
      video: Object
    },
    upload: {
      uploadFile: false
    }
  },

  mutations: {
    setToken(state, token) {
      state.user.token = token
    },
    setUsername(state, username) {
      state.user.username = username
    },
    currentVideo(state, video) {
      state.user.video = video
    },
    setUploadFile(state, value) {
      state.upload.uploadFile = value
    }
  },

  getters: {
    getToken: state => { return state.user.token },
    getUsername: state => { return state.user.username },
    getVideo: state => { return state.user.video },
    getUploadFile: state => { return state.upload.uploadFile }
  }
})
