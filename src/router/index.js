import Vue from 'vue'
import Router from 'vue-router'
import register from '@/components/register'
import home from '@/components/home'
import login from '@/components/login'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/sign-up',
      name: 'Sign-up',
      component: register
    },
    {
      path: '/',
      name: 'Home',
      component: home
    },
    {
      path: '/login',
      name: 'Login',
      component: login
    }
  ],
  mode: 'history'
})
