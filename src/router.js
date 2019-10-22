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
      component: Login,
      meta:{
        // 页面标题title
        title: '登陆'
    }
    },
    {
      path: '/register',
      name: 'register',
      component: register,
      meta:{
        // 页面标题title
        title: '录入'
    }
    },
    {
      path: '/submit',
      name: 'submit',
      component: submit,
      meta:{
        // 页面标题title
        title: '主页'
    }
    },
    {
      path: '/admin',
      name: 'admin',
      component: admin,
      meta:{
        // 页面标题title
        title: '后台登陆'
    }
    },
    {
      path: '/serve',
      name: 'serve',
      component: serve,
      meta:{
        // 页面标题title
        title: '后台'
    }
    },
  ]
})
