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
        },{
          path: '/secondDivision',
          name: 'secondDivision',
          component: () => import('@/views/organization/second-division/second-division'),
          meta: { title: '第二事业部'},
          hidden: true
        },{
          path: '/salesroom',
          name: 'salesroom',
          component: () => import('@/views/organization/salesroom/salesroom'),
          meta: { title: '门店'},
          hidden: true
        },{
          path: '/research',
          name: 'research',
          component: () => import('@/views/organization/research/research'),
          meta: { title: '门店'},
          hidden: true
        }]
      }]
    },
    {
      path: '/404',
      component: () => import('@/views/404'),
      hidden: true
    },
  
    // 404 page must be placed at the end !!!
    { path: '*', redirect: '/404', hidden: true }
  ]
})
export default router
