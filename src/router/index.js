import Vue from 'vue'
import Router from 'vue-router'
import register from '@/components/register'
import home from '@/components/home'

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
    }
  ],
  mode: 'history'
})
