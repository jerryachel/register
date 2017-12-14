import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views/index'
import register from '@/views/register/register'
import register_form from '@/views/register_form/register_form'
import register_result from '@/views/register_result/register_result'
import register_search from '@/views/register_search/register_search'
import manage from '@/views/appointment_manage/manage'
import add from '@/views/appointment_manage/add'
Vue.use(Router)

export default new Router({
  //mode: 'history',
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
    },{
      path: '/register_result',
      name: 'register_result',
      component: register_result
    },{
      path: '/register_search',
      name: 'register_search',
      component: register_search
    },{
      path: '/manage',
      name: 'manage',
      component: manage
    },{
        path: '/add',
        name: 'add',
        component: add,
      }
  ]
})
