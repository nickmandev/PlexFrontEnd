import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    user: {
      token: '',
      video: Object
    },
    upload: {
      file: new FormData()
    }
  },

  mutations: {
    setToken(state, token) {
      state.user.token = token
    },
    currentVideo(state, video) {
      state.user.video = video
    },
    uploadFile(state, file) {
      state.upload.file.append('item', file)
    }
  },

  getters: {
    getToken: state => { return state.user.token },
    getVideo: state => { return state.user.video },
    getItem: state => {return state.upload.file}
  }
})
