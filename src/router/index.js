import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '@/layout'

/**
 * Note: sub-menu only appear when route children.length >= 1
 * Detail see: https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   if set true, item will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu
 *                                if not set alwaysShow, when item has more than one children route,
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noRedirect           if set noRedirect will no redirect in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    roles: ['admin','editor']    control the page roles (you can set multiple roles)
    title: 'title'               the name show in sidebar and breadcrumb (recommend set)
    icon: 'svg-name'/'el-icon-x' the icon show in the sidebar
    noCache: true                if set true, the page will no be cached(default is false)
    affix: true                  if set true, the tag will affix in the tags-view
    breadcrumb: false            if set false, the item will hidden in breadcrumb(default is true)
    activeMenu: '/example/list'  if set path, the sidebar will highlight the path you set
  }
 */

/**
 * constantRoutes
 * a base page that does not have permission requirements
 * all roles can be accessed
 */
export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    children: [
      {
        path: '/redirect/:path(.*)',
        component: () => import('@/views/redirect/index')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },
  {
    path: '/auth-redirect',
    component: () => import('@/views/login/auth-redirect'),
    hidden: true
  },
  {
    path: '/404',
    component: () => import('@/views/error-page/404'),
    hidden: true
  },
  {
    path: '/401',
    component: () => import('@/views/error-page/401'),
    hidden: true
  },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        component: () => import('@/views/dashboard/index'),
        name: 'Dashboard',
        meta: { title: '首页', icon: 'el-icon-s-home', affix: true }
      }
    ]
  },
  {
    path: '/users', component: Layout, redirect: '/users',
    meta: { title: '用户管理', icon: 'el-icon-user', roles: ['admin'] },
    children: [
      { path: '/users',
        name: 'users',
        component: () => import('../views/users/index')
      },
      { path: '/users/list',
        component: () => import('../views/users/list/index'),
        name: 'List',
        meta: { title: '用户列表', icon: 'el-icon-user-solid',
          roles: ['admin'] }},
      {
        path: '/users/review',
        component: () => import('../views/users/review/index'), name: 'Add', meta: { title: '用户审核', icon: 'el-icon-check', roles: ['admin'] }}
    ]
  },
  {
    path: '/goods', component: Layout, redirect: '/goods',
    meta: { title: '商品管理', icon: 'el-icon-shopping-bag-1', roles: ['admin'] },
    children: [
      { path: '/goods',
        name: 'goods',
        component: () => import('../views/order/index')
      },
      { path: '/goods/list',
        component: () => import('../views/product/list/index'),
        name: 'List',
        meta: { title: '商品列表', icon: 'el-icon-s-unfold',
          roles: ['admin'] }},
      {
        path: '/goods/category',
        component: () => import('../views/product/category/index'), name: 'Add', meta: { title: '商品类别', icon: 'el-icon-menu', roles: ['admin'] }},
      {
        path: '/goods/review',
        component: () => import('../views/product/review/index'), name: 'Add', meta: { title: '商品审核', icon: 'el-icon-check', roles: ['admin'] }}
    ]
  },
  {
    path: '/orders', component: Layout, redirect: '/orders',
    meta: { title: '订单管理', icon: 'el-icon-s-order', roles: ['admin'] },
    children: [
      { path: '/orders',
        component: () => import('../views/order/index'),
        name: 'order'
      },
      { path: '/orders/list',
        component: () => import('../views/order/list/index'),
        name: 'List',
        meta: { title: '订单列表', icon: 'el-icon-s-unfold',
          roles: ['admin'] }},
      {
        path: '/order/refund',
        component: () => import('../views/order/refund/index'), name: 'Add', meta: { title: '退货处理', icon: 'el-icon-s-release', roles: ['admin'] }},
      {
        path: '/order/settings',
        component: () => import('../views/order/setting/index'), name: 'Add', meta: { title: '订单设置', icon: 'el-icon-setting', roles: ['admin'] }}
    ]
  }
]

/**
 * asyncRoutes
 * the routes that need to be dynamically loaded based on user roles
 */
export const asyncRoutes = [
  // 404 page must be placed at the end !!!
  { path: '*', redirect: '/404', hidden: true }
]

const createRouter = () => new Router({
  // mode: 'history', // require service support
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

const router = createRouter()

// Detail see: https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // reset router
}

export default router
