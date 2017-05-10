import Vue from 'vue'
import Router from 'vue-router'
import RegisterComponent from '@/components/Register'
import HomeComponent from '@/components/Home'
import LoginComponent from '@/components/Login'
import UploadComponent from '@/components/Upload'
import App from '@/App'
import config from '@/config/config.js'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/home',
      meta: {requiresAuth: false}
    },
    {
      path: '/sign-up',
      name: 'Sign-up',
      component: RegisterComponent,
      meta: {requiresAuth: false}
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeComponent,
      meta: {requiresAuth: false}
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginComponent,
      meta: {requiresAuth: false}
    },
    {
      path: '/upload',
      name: 'Upload',
      component: UploadComponent,
      meta: {requiresAuth: true}
    }
  ],
  mode: 'history'
})
