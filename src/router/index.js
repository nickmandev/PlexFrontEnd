import Vue from 'vue'
import Router from 'vue-router'
import register from '@/components/register'
import home from '@/components/home'

Vue.use(Router)
const API_URL =  'http://localhost:3000'
export default new Router({
  routes: [
    {
      path: 'sign-up',
      name: 'Sign-up',
      component: register
    },
    {
      path: '/',
      name: 'Home',
      component: home
    }
  ]
})
