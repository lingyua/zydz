import Vue from 'vue'
import Router from 'vue-router'
import Home from './views/Home.vue'
import Login from './views/login.vue'
import register from './views/register.vue'
import submit from './views/submit.vue'
import admin from './views/admin.vue'
import serve from './views/serve.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/submit',
      name: 'submit',
      component: submit
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin
    },
    {
      path: '/serve',
      name: 'serve',
      component: serve
    },
  ]
})
