import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import register from '@/views/register/register'
Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'index',
      component: index
    },{
      path: '/register',
      name: 'register',
      component: register
    }
  ]
})
