// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/index'
import resource from 'vue-resource'
import { store } from './store/index.js'
import config from '@/config/config.js'
import VueClip from 'vue-clip'
import './assets/styles/main.scss';

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

Vue.filter('removeExtensions', (value) => {
  let extensions = ['mov', 'avi', 'mkv', 'mp4', '3gp', 'wmv', 'flv', 'vob', 'ogv']
  extensions.forEach(function (ele) {
    if (value.indexOf(`.${ele}`) > -1) {
      value = value.replace(`.${ele}`, '');
    }
  });
  return value;
});
Vue.filter('convertTime', (value) => {
  value = (Math.floor(value) / 60).toFixed(2);
  return value
});
Vue.filter('dateParser', (value) => {
  let date = new Date(value.toString());
  let today = new Date();
  let response = '';
  let diff = 0;
  if (today > date) {
    if (today.getMonth() > date.getMonth()) {
      diff = today.getMonth() - date.getMonth();
      return response = `${diff} months ago`;
    }
    if (today.getFullYear() > date.getFullYear()) {
      diff = today.getFullYear() - date.getFullYear();
      return response = `${diff} years ago`;
    }
    if (today.getDate() > date.getDate()) {
      diff = today.getDate() - date.getDate();
      return response = `${diff} days ago`;
    }
    if (today.getDate() === date.getDate()) {
      if (today.getHours() > date.getHours()) {
        diff = today.getHours() - date.getHours();
        return response = `${diff} hours ago`;
      } else if (today.getMinutes() > date.getMinutes()) {
        diff = today.getMinutes() - date.getMinutes();
        return response = `${diff} minutes ago`;
      }
    }
  }
})
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
