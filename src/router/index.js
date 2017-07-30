import Vue from 'vue'
import Router from 'vue-router'
import RegisterComponent from '@/components/Register'
import HomeComponent from '@/components/Home'
import LoginComponent from '@/components/Login'
import UploadComponent from '@/components/Upload'
import VideosComponent from '@/global-components/videos/Videos'
import VideoComponent from '@/components/Video'
import UserComponent from '@/components/User'
import ProfileComponent from '@/components/Profile'
import App from '@/App'
import config from '@/config/config.js'

Vue.use(Router)
export default new Router({
  routes: [
    {
      path: '*',
      redirect: '/home',
      meta: { requiresAuth: false }
    },
    {
      path: '/sign-up',
      name: 'Sign-up',
      component: RegisterComponent,
      meta: { requiresAuth: false }
    },
    {
      path: '/home',
      name: 'Home',
      component: HomeComponent,
      meta: { requiresAuth: false }
    },
    {
      path: '/login',
      name: 'Login',
      component: LoginComponent,
      meta: { requiresAuth: false }
    },
    {
      path: '/upload',
      name: 'Upload',
      component: UploadComponent,
      meta: { requiresAuth: true }
    },
    {
      path: '/videos/',
      name: 'Videos',
      component: VideosComponent,
      meta: { requiresAuth: false },
    },
    {
      path: '/videos/:id',
      name: 'Video',
      component: VideoComponent,
      meta: { requiresAuth: false }
    },
    {
      path: '/user/:name',
      name: 'User',
      component: UserComponent,
      meta: { requiresAuth: false }
    },
    {
      path: '/profile',
      name: 'Profile',
      component: ProfileComponent,
      meta: { requiresAuth: true }
    }

  ],
  mode: 'history'
})
