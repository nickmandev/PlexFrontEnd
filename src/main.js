// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import register from './components/register.vue'
import resource from 'vue-resource'


Vue.config.productionTip = false
Vue.use(resource)
Vue.url.options.root = "http://localhost:3000"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  http: {
    headers:{
      Authorization: 'Basic YXBpOnBhc3N3b3Jk',
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000'
    },
    origin: 'http://localhost:3000'
  },
  components: { App, register }
})
