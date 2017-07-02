// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/index'
import resource from 'vue-resource'
import { store } from './store/index'
import config from './config/config.js'
import VueClip from 'vue-clip'
import './assets/styles/main.scss';
import './filters/index.ts';

// Components
import App from './App'
import Videos from './components/Videos.vue';
Vue.component('videos', Videos)

Vue.use(VueClip)
Vue.use(resource)

Vue.config.productionTip = false
Vue.url.options.root = "http://localhost:3000"

/* eslint-disable no-new */
router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!config.loggedIn()) {
      next({
        path: '/login',
        query: { redirect: to.fullPath }
      })
    } else {
      next()
    }
  } else {
    next() // make sure to always call next()!
  }
});
Vue.http.interceptors.push((request, next) => {
  request.headers.set('Authorization', `${localStorage.getItem('token')}`);
  next((response) => {
    if (response.status === 401) {
      localStorage.removeItem('token');
      store.commit('setToken', '')
      console.log('dont');
      router.push('/login');
    }
  })
});
new Vue({
  el: '#app',
  template: '<App/>',
  router,
  http: {
    headers: {
      'Content-type': 'application/json',
      'Access-Control-Allow-Origin': 'http://localhost:3000'
    },
    origin: 'http://localhost:3000'
  },
  components: { App, Videos },
  store
})
