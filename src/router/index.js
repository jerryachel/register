import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import register from '@/views/register/register'
import register_form from '@/views/register_form/register_form'

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
    },{
      path: '/register_form',
      name: 'register_form',
      component: register_form
    }
  ]
})
