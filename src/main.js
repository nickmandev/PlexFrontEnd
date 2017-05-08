// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/index'
import resource from 'vue-resource'
import { store } from './store/index.js'

// Components
import Home from './home.vue'
import Register from './components/register'
import Login from './components/login'

Vue.config.productionTip = false
Vue.use(resource)
Vue.url.options.root = "http://localhost:3000"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  template: '<Home/>',
  router,
  http: {
    headers:{
      Authorization: 'Basic YXBpOnBhc3N3b3Jk',
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000'
    },
    origin: 'http://localhost:3000'
  },
  components: { Home, Register, Login },
  store,
})
