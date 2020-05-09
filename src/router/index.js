import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

// /* Layout */
import Layout from '@/layout'
const router=new Router({
  mode:"history",
  routes:[
    {
      path: '/',
      component: Layout,
      redirect: '/organization',
      children: [{
        path: '/organization',
        name: 'organization',
        component: () => import('@/views/organization/organization'),
        meta: { title: '组织架构'},
        hidden: true,
        redirect:'/firstDivision',
        children:[{
          path: '/firstDivision',
          name: 'firstDivision',
          component: () => import('@/views/organization/first-division/first-division'),
          meta: { title: '第一事业部'},
          hidden: true
        }]
      }]
    },
    {
      path: '/404',
      component: () => import('@/views/404'),
      hidden: true
    },
    //乐播平台注册
    {
      path: '/register',
      component: () => import('@/views/Register/register'),
      hidden:true
    },
    //权限组
    {
      path: '/',
      component: Layout,
      redirect: '/PermissionGroup',
      children: [{
      path: 'PermissionGroup',
      name: 'PermissionGroup',
      component: () => import('@/views/PermissionGroup/index'),
        meta: { title: '权限组'}
      }]
    },
     //权限管理
    {
      path: '/',
      component: Layout,
      redirect: '/PermissionManager',
      children: [{
        path: 'PermissionManager',
        name: 'PermissionManager',
        component: () => import('@/views/PermissionManager/index'),
        meta: {
          title: '权限'
        }
      }]
    },
    {
      path: '/',
      component: Layout,
      redirect: '/power',
      children: [{
        path: 'power',
        name: 'power',
        component: () => import('@/views/power/power'),
        meta: {
          title: '权限'
        }
      }]
    },
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
  ]
})
export default router
